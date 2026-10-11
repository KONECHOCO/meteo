// 3D globe built from NASA imagery (public domain, via NASA GIBS / EOSDIS):
// - day side: today's VIIRS true-colour satellite mosaic (real clouds), or the Blue Marble relief
// - night side: Black Marble city lights, with the day/night terminator at the real sun position
// - optional overlay: IMERG satellite precipitation estimate (latest 30-minute frame)
// Bundled textures in public/textures are used when the network is unavailable.

import * as THREE from "three";

const GIBS_WMS = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
const GIBS_WMTS = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi";
const TEXTURES = `${import.meta.env.BASE_URL}textures/`;

function gibsMapUrl(layer, { time, width, height, format = "image/jpeg", transparent = false }) {
  const params = new URLSearchParams({
    SERVICE: "WMS",
    REQUEST: "GetMap",
    VERSION: "1.3.0",
    LAYERS: layer,
    CRS: "EPSG:4326",
    BBOX: "-90,-180,90,180",
    WIDTH: String(width),
    HEIGHT: String(height),
    FORMAT: format
  });
  if (transparent) params.set("TRANSPARENT", "TRUE");
  if (time) params.set("TIME", time);
  return `${GIBS_WMS}?${params}`;
}

// Latest available time of a GIBS layer (e.g. "2026-10-11T10:30:00Z"), or null
async function latestGibsTime(layer, tileMatrixSet) {
  const now = new Date();
  const from = new Date(now.getTime() - 3 * 86400000).toISOString().slice(0, 10);
  const to = new Date(now.getTime() + 86400000).toISOString().slice(0, 10);
  const url = `${GIBS_WMTS}?SERVICE=WMTS&REQUEST=DescribeDomains&LAYER=${layer}&TILEMATRIXSET=${tileMatrixSet}&TIME=${from}/${to}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const xml = await res.text();
  const domain = (xml.match(/<Domain>([^<]+)<\/Domain>/) || [])[1];
  if (!domain) return null;
  // "start/end/period" or a comma-separated list of those: the last end is the newest time
  const last = domain.split(",").pop().split("/");
  return last.length >= 2 ? last[1] : last[0];
}

// Sub-solar point for a given time (accurate to well under a degree)
export function subSolarPoint(date = new Date()) {
  const dayMs = 86400000;
  const n = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / dayMs; // days since J2000
  const L = (280.46 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
  const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * Math.PI / 180;
  const epsilon = (23.439 - 0.0000004 * n) * Math.PI / 180;
  const decl = Math.asin(Math.sin(epsilon) * Math.sin(lambda));
  const ra = Math.atan2(Math.cos(epsilon) * Math.sin(lambda), Math.cos(lambda));
  // Equation of time (minutes) from mean longitude and right ascension
  let eot = (L * Math.PI / 180 - ra) * 180 / Math.PI;
  eot = ((eot + 540) % 360 - 180) * 4;
  const utcMinutes = date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
  const lon = -((utcMinutes + eot) / 4 - 180);
  return { lat: decl * 180 / Math.PI, lon: ((lon + 540) % 360) - 180 };
}

export class GlobeScene {
  constructor(container, { onInfo } = {}) {
    this.container = container;
    this.width = container.clientWidth || 800;
    this.height = container.clientHeight || 600;
    this.onInfo = onInfo || (() => {});

    this.baseLayer = "today"; // "today" (real clouds) | "relief" (Blue Marble, no clouds)
    this.rainVisible = false;
    this.info = { cloudsDate: null, rainTime: null, usingFallback: false };

    this.autoRotate = true;
    this.isDragging = false;
    this.previousPointer = { x: 0, y: 0 };
    this.pinchDistance = null;
    this.targetRotation = { x: 0.2, y: 0 };
    this.currentRotation = { x: 0.2, y: 0 };
    this.animationFrameId = null;
    this.events = new AbortController();
    this.loader = new THREE.TextureLoader();
    this.loader.setCrossOrigin("anonymous");
    this.disposed = false;

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 2.8;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);

    this.buildEarth();
    this.buildRainLayer();
    this.buildAtmosphere();

    this.markerGroup = new THREE.Group();
    this.globeGroup.add(this.markerGroup);

    this.updateSun();
    this.sunTimer = setInterval(() => this.updateSun(), 60000);

    this.bindEvents();
    this.animate();

    this.loadBaseTexture();
  }

  // Texture size: full detail on large screens, lighter on phones
  get textureWidth() {
    return Math.min(window.innerWidth, window.innerHeight) < 700 ? 2048 : 4096;
  }

  buildEarth() {
    const placeholder = new THREE.DataTexture(new Uint8Array([10, 30, 60, 255]), 1, 1);
    placeholder.needsUpdate = true;

    this.earthUniforms = {
      dayMap: { value: placeholder },
      nightMap: { value: placeholder },
      sunDirection: { value: new THREE.Vector3(1, 0, 0) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: this.earthUniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalObj;
        void main() {
          vUv = uv;
          vNormalObj = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayMap;
        uniform sampler2D nightMap;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vNormalObj;
        void main() {
          float sun = dot(normalize(vNormalObj), normalize(sunDirection));
          float daylight = smoothstep(-0.08, 0.18, sun);
          vec3 day = texture2D(dayMap, vUv).rgb * (0.25 + 0.95 * clamp(sun * 1.2 + 0.2, 0.0, 1.0));
          vec3 night = texture2D(nightMap, vUv).rgb * 1.6;
          gl_FragColor = vec4(mix(night, day, daylight), 1.0);
        }
      `
    });

    this.earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), material);
    this.globeGroup.add(this.earthMesh);

    this.loader.load(`${TEXTURES}earth-night.jpg`, (tex) => this.setTexture("nightMap", tex));
  }

  setTexture(uniform, texture) {
    if (this.disposed) {
      texture.dispose();
      return;
    }
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    const old = this.earthUniforms[uniform].value;
    this.earthUniforms[uniform].value = texture;
    if (old && old !== texture && old.image && old.image.width > 1) old.dispose();
  }

  buildRainLayer() {
    this.rainMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.004, 96, 96),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, depthWrite: false })
    );
    this.rainMesh.visible = false;
    this.globeGroup.add(this.rainMesh);
  }

  buildAtmosphere() {
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.3, 0.65, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    this.atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1.15, 64, 64), material);
    this.scene.add(this.atmosphereMesh);
  }

  updateSun() {
    const { lat, lon } = subSolarPoint(new Date());
    this.earthUniforms.sunDirection.value.copy(this.latLonToVector3(lat, lon, 1));
  }

  async loadBaseTexture() {
    const layer = this.baseLayer;
    const fallback = () => new Promise(resolve => this.loader.load(`${TEXTURES}earth-day.jpg`, resolve, undefined, () => resolve(null)));

    let texture = null;
    let cloudsDate = null;
    if (layer === "today") {
      // Yesterday's mosaic (UTC) is complete; today's still has gaps between satellite passes
      cloudsDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const url = gibsMapUrl("VIIRS_NOAA20_CorrectedReflectance_TrueColor", { time: cloudsDate, width: this.textureWidth, height: this.textureWidth / 2 });
      texture = await new Promise(resolve => this.loader.load(url, resolve, undefined, () => resolve(null)));
    }
    const usingFallback = layer === "today" && !texture;
    if (!texture) {
      texture = await fallback();
      cloudsDate = null;
    }
    // The user may have switched layer while this one was loading
    if (this.baseLayer !== layer || !texture) return;
    this.setTexture("dayMap", texture);
    this.info = { ...this.info, cloudsDate, usingFallback };
    this.onInfo(this.info);
  }

  async loadRain() {
    try {
      const time = await latestGibsTime("IMERG_Precipitation_Rate_30min", "2km");
      const url = gibsMapUrl("IMERG_Precipitation_Rate_30min", { time, width: 2048, height: 1024, format: "image/png", transparent: true });
      const texture = await new Promise((resolve, reject) => this.loader.load(url, resolve, undefined, reject));
      if (this.disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      if (this.rainMesh.material.map) this.rainMesh.material.map.dispose();
      this.rainMesh.material.map = texture;
      this.rainMesh.material.needsUpdate = true;
      this.rainLoaded = true;
      this.info = { ...this.info, rainTime: time };
    } catch (err) {
      console.warn("Precipitation layer unavailable:", err);
      this.info = { ...this.info, rainTime: null, rainError: true };
    }
    this.onInfo(this.info);
  }

  setBaseLayer(layer) {
    if (layer === this.baseLayer) return;
    this.baseLayer = layer;
    this.loadBaseTexture();
  }

  setRainVisible(visible) {
    this.rainVisible = visible;
    this.rainMesh.visible = visible;
    if (visible && !this.rainLoaded) this.loadRain();
  }

  latLonToVector3(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Pin with a pulsing ring on the selected place, then rotate the globe to it
  setLocation(lat, lon) {
    if (this.activeMarker) {
      this.markerGroup.remove(this.activeMarker);
      this.activeMarker.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      this.activeMarker = null;
    }

    const marker = new THREE.Group();
    marker.position.copy(this.latLonToVector3(lat, lon, 1.012));
    marker.lookAt(new THREE.Vector3(0, 0, 0));

    marker.add(new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00f0ff })));
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.045, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
    );
    ring.name = "radarRing";
    marker.add(ring);

    this.activeMarker = marker;
    this.markerGroup.add(marker);
    this.flyTo(lat, lon);
  }

  flyTo(lat, lon) {
    this.autoRotate = false;
    this.targetRotation.x = (lat * Math.PI / 180) * 0.6;
    this.targetRotation.y = -((lon + 90) * Math.PI / 180);
  }

  bindEvents() {
    const el = this.renderer.domElement;
    const opts = { signal: this.events.signal };
    const rotateBy = (dx, dy, speed) => {
      this.targetRotation.y += dx * speed;
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x + dy * speed));
    };

    el.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousPointer = { x: e.clientX, y: e.clientY };
    }, opts);
    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      rotateBy(e.clientX - this.previousPointer.x, e.clientY - this.previousPointer.y, 0.005);
      this.previousPointer = { x: e.clientX, y: e.clientY };
    }, opts);
    window.addEventListener("mouseup", () => { this.isDragging = false; }, opts);

    el.addEventListener("touchstart", (e) => {
      this.autoRotate = false;
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        this.pinchDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      }
    }, { ...opts, passive: true });
    el.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && this.pinchDistance) {
        // Pinch to zoom
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        this.camera.position.z = Math.max(1.5, Math.min(4.5, this.camera.position.z * (this.pinchDistance / d)));
        this.pinchDistance = d;
        e.preventDefault();
      } else if (this.isDragging && e.touches.length === 1) {
        rotateBy(e.touches[0].clientX - this.previousPointer.x, e.touches[0].clientY - this.previousPointer.y, 0.006);
        this.previousPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
      }
    }, { ...opts, passive: false });
    el.addEventListener("touchend", () => {
      this.isDragging = false;
      this.pinchDistance = null;
    }, opts);

    // Wheel zoom only with Ctrl/Cmd so normal page scrolling still works
    el.addEventListener("wheel", (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        this.camera.position.z = Math.max(1.5, Math.min(4.5, this.camera.position.z + e.deltaY * 0.0015));
      }
    }, { ...opts, passive: false });

    window.addEventListener("resize", () => this.onResize(), opts);
  }

  zoomIn() {
    this.camera.position.z = Math.max(1.5, this.camera.position.z - 0.35);
  }

  zoomOut() {
    this.camera.position.z = Math.min(4.5, this.camera.position.z + 0.35);
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    if (!this.width || !this.height) return;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.autoRotate) this.targetRotation.y += 0.0012;
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;
    this.globeGroup.rotation.x = this.currentRotation.x;
    this.globeGroup.rotation.y = this.currentRotation.y;

    if (this.activeMarker) {
      const ring = this.activeMarker.getObjectByName("radarRing");
      const scale = 1 + (Math.sin(performance.now() * 0.003) * 0.5 + 0.5) * 0.8;
      ring.scale.set(scale, scale, scale);
      ring.material.opacity = 1 - (scale - 1) / 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.animationFrameId);
    clearInterval(this.sunTimer);
    this.events.abort();
    this.scene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (o.material.map) o.material.map.dispose();
        o.material.dispose();
      }
    });
    Object.values(this.earthUniforms).forEach(u => u.value && u.value.dispose && u.value.dispose());
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
  }
}
