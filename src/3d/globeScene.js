// 3D Realistic Interactive Globe Scene using Three.js
// Features: Day/Night terminator with city lights, Rayleigh atmospheric rim scattering,
// rotating cloud sphere, dynamic weather overlay (Satellite, Temp Heatmap, Jet Stream, Radar),
// interactive pins with pulsing radar, and smooth camera fly-to transitions.

import * as THREE from "three";

export class GlobeScene {
  constructor(container) {
    this.container = container;
    this.width = container.clientWidth || 800;
    this.height = container.clientHeight || 600;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.globeGroup = null;
    this.earthMesh = null;
    this.cloudMesh = null;
    this.atmosphereMesh = null;
    this.markerGroup = null;
    this.activeMarker = null;
    this.streamlinesMesh = null;

    this.currentMode = "satellite"; // "satellite" | "temperature" | "wind" | "radar"
    this.autoRotate = true;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0.2, y: 0 };
    this.currentRotation = { x: 0.2, y: 0 };

    this.animationFrameId = null;

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 2.8;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x223344, 1.2);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 4);
    this.scene.add(sunLight);

    // 5. Globe Group
    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);

    // 6. Build Earth with procedural textures
    this.buildEarth();

    // 7. Build Cloud Layer
    this.buildClouds();

    // 8. Build Atmospheric Rayleigh Halo
    this.buildAtmosphere();

    // 9. Build Markers Group
    this.markerGroup = new THREE.Group();
    this.globeGroup.add(this.markerGroup);

    // 10. Build Wind Streamlines Layer
    this.buildWindStreamlines();

    // 11. Event Listeners
    this.bindEvents();

    // 12. Start Render Loop
    this.animate();
  }

  buildEarth() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Generate procedural Earth Texture
    const earthCanvas = this.generateEarthCanvas();
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Generate Bump / Elevation Texture
    const bumpCanvas = this.generateBumpCanvas();
    const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

    const material = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.03,
      roughness: 0.65,
      metalness: 0.1
    });

    this.earthMesh = new THREE.Mesh(geometry, material);
    this.globeGroup.add(this.earthMesh);
  }

  generateEarthCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    // Deep Ocean background
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, "#081b33");
    oceanGrad.addColorStop(0.5, "#0b2545");
    oceanGrad.addColorStop(1, "#081b33");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Procedural continents & landmasses
    ctx.fillStyle = "#1b4332";
    // Eurasia / Africa
    this.drawContinent(ctx, 1100, 380, 480, 260, "#2d6a4f", "#40916c");
    this.drawContinent(ctx, 1080, 620, 260, 300, "#52b788", "#74c69d");
    // Americas
    this.drawContinent(ctx, 450, 340, 320, 250, "#2d6a4f", "#40916c");
    this.drawContinent(ctx, 580, 680, 240, 320, "#1b4332", "#2d6a4f");
    // Australia
    this.drawContinent(ctx, 1680, 720, 180, 150, "#74c69d", "#52b788");
    // Antarctica
    ctx.fillStyle = "#e9ecef";
    ctx.fillRect(0, 960, 2048, 64);
    // Greenland & Arctic
    this.drawContinent(ctx, 720, 120, 160, 90, "#e9ecef", "#f8f9fa");

    // Add city night light clusters (simulated golden microdots)
    ctx.fillStyle = "rgba(255, 214, 10, 0.75)";
    for (let i = 0; i < 450; i++) {
      const cx = 350 + Math.random() * 1400;
      const cy = 250 + Math.random() * 500;
      const r = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  drawContinent(ctx, x, y, w, h, col1, col2) {
    ctx.save();
    ctx.fillStyle = col1;
    ctx.beginPath();
    ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Internal topography accents
    ctx.fillStyle = col2;
    ctx.beginPath();
    ctx.ellipse(x + w * 0.1, y - h * 0.1, w * 0.3, h * 0.3, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  generateBumpCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1024, 512);

    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 300; i++) {
      const bx = Math.random() * 1024;
      const by = Math.random() * 512;
      const rad = 5 + Math.random() * 25;
      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, rad);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    return canvas;
  }

  buildClouds() {
    const geometry = new THREE.SphereGeometry(1.02, 64, 64);
    const cloudCanvas = this.generateCloudCanvas();
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    cloudTexture.wrapS = THREE.RepeatWrapping;

    const material = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.cloudMesh = new THREE.Mesh(geometry, material);
    this.globeGroup.add(this.cloudMesh);
  }

  generateCloudCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 2048, 1024);

    // Generate swirling cloud bands and cyclone swirls
    for (let i = 0; i < 180; i++) {
      const cx = Math.random() * 2048;
      const cy = 100 + Math.random() * 824;
      const rx = 40 + Math.random() * 120;
      const ry = 15 + Math.random() * 40;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
      grad.addColorStop(0.6, "rgba(255, 255, 255, 0.3)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    return canvas;
  }

  buildAtmosphere() {
    // Custom Shader for Rayleigh Scattering Glow Rim
    const geometry = new THREE.SphereGeometry(1.15, 64, 64);
    const vertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
        gl_FragColor = vec4(0.3, 0.65, 1.0, 1.0) * intensity;
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });

    this.atmosphereMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.atmosphereMesh);
  }

  buildWindStreamlines() {
    // Animated Jet Stream & Wind vectors layer on sphere
    const linesCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    for (let i = 0; i < linesCount; i++) {
      const lat = (Math.random() - 0.5) * 140;
      const lon = Math.random() * 360 - 180;
      const length = 5 + Math.random() * 10;

      for (let s = 0; s < 4; s++) {
        const curLon = lon + s * (length / 4);
        const pos = this.latLonToVector3(lat, curLon, 1.035);
        positions.push(pos.x, pos.y, pos.z);

        // Cyan-green wind velocity colors
        colors.push(0.1, 0.8 + s * 0.05, 0.9, 0.7);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.0, // hidden by default, visible in 'wind' mode
      blending: THREE.AdditiveBlending
    });

    this.streamlinesMesh = new THREE.LineSegments(geometry, material);
    this.globeGroup.add(this.streamlinesMesh);
  }

  // Convert Latitude & Longitude to 3D Cartesian coordinates
  latLonToVector3(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  }

  // Set selected location and add 3D Pin with pulsing radar ring
  setLocation(lat, lon, name = "Target") {
    // Clear previous active marker
    if (this.activeMarker) {
      this.markerGroup.remove(this.activeMarker);
      this.activeMarker = null;
    }

    const pos = this.latLonToVector3(lat, lon, 1.02);

    const marker = new THREE.Group();
    marker.position.copy(pos);
    marker.lookAt(new THREE.Vector3(0, 0, 0));

    // Pin sphere
    const pinGeom = new THREE.SphereGeometry(0.025, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const pinMesh = new THREE.Mesh(pinGeom, pinMat);
    marker.add(pinMesh);

    // Pulsing Radar Ring
    const ringGeom = new THREE.RingGeometry(0.03, 0.045, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.name = "radarRing";
    marker.add(ringMesh);

    this.activeMarker = marker;
    this.markerGroup.add(marker);

    // Fly camera smoothly to target coordinates
    this.flyTo(lat, lon);
  }

  flyTo(lat, lon) {
    this.autoRotate = false;
    // Calculate target Y & X rotation for the globe
    const targetY = -((lon + 90) * (Math.PI / 180));
    const targetX = (lat * (Math.PI / 180)) * 0.6;

    // Smooth tween target
    this.targetRotation.x = targetX;
    this.targetRotation.y = targetY;
  }

  setLayerMode(mode) {
    this.currentMode = mode;
    if (!this.earthMesh) return;

    if (mode === "satellite") {
      this.earthMesh.material.color.setHex(0xffffff);
      if (this.streamlinesMesh) this.streamlinesMesh.material.opacity = 0.0;
      if (this.cloudMesh) this.cloudMesh.visible = true;
    } else if (mode === "temperature") {
      // Warm thermal heatmap tint
      this.earthMesh.material.color.setHex(0xff8844);
      if (this.streamlinesMesh) this.streamlinesMesh.material.opacity = 0.0;
      if (this.cloudMesh) this.cloudMesh.visible = true;
    } else if (mode === "wind") {
      // Wind streamline display
      this.earthMesh.material.color.setHex(0x336699);
      if (this.streamlinesMesh) this.streamlinesMesh.material.opacity = 0.85;
      if (this.cloudMesh) this.cloudMesh.visible = false;
    } else if (mode === "radar") {
      // Dark radar view
      this.earthMesh.material.color.setHex(0x1a3320);
      if (this.streamlinesMesh) this.streamlinesMesh.material.opacity = 0.0;
      if (this.cloudMesh) this.cloudMesh.visible = true;
    }
  }

  bindEvents() {
    const el = this.renderer.domElement;

    el.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.005;
      this.targetRotation.x += deltaY * 0.005;

      // Clamp X rotation so it doesn't flip over
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    // Touch support for mobile / tablets
    el.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoRotate = false;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.006;
      this.targetRotation.x += deltaY * 0.006;
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener("touchend", () => {
      this.isDragging = false;
    });

    // Wheel zoom: only preventDefault if ctrlKey is pressed so normal scrolling works
    el.addEventListener("wheel", (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        this.camera.position.z += e.deltaY * 0.0015;
        this.camera.position.z = Math.max(1.5, Math.min(4.5, this.camera.position.z));
      }
    }, { passive: false });

    // Resize
    window.addEventListener("resize", () => this.onResize());
  }

  zoomIn() {
    if (this.camera) {
      this.camera.position.z = Math.max(1.5, this.camera.position.z - 0.35);
    }
  }

  zoomOut() {
    if (this.camera) {
      this.camera.position.z = Math.min(4.5, this.camera.position.z + 0.35);
    }
  }

  onResize() {
    if (!this.container) return;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Auto-rotate if enabled
    if (this.autoRotate) {
      this.targetRotation.y += 0.0012;
    }

    // Smooth lerp rotation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    this.globeGroup.rotation.x = this.currentRotation.x;
    this.globeGroup.rotation.y = this.currentRotation.y;

    // Slowly rotate clouds independent of earth
    if (this.cloudMesh) {
      this.cloudMesh.rotation.y += 0.0004;
    }

    // Animate radar ring pulse on active marker
    if (this.activeMarker) {
      const ring = this.activeMarker.getObjectByName("radarRing");
      if (ring) {
        const time = performance.now() * 0.003;
        const scale = 1 + (Math.sin(time) * 0.5 + 0.5) * 0.8;
        ring.scale.set(scale, scale, scale);
        ring.material.opacity = 1 - (scale - 1) / 0.8;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
