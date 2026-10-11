// 3D Realistic Atmospheric Sky & Weather Simulator using Three.js
// Features: Sun & Moon celestial trajectories, Rayleigh atmospheric sky dome,
// procedural cloud clusters, rain streaks with wind vector tilt, thunderstorm lightning flashes,
// snowflake flutter physics, and interactive 24-hour time scrubbing.

import * as THREE from "three";

export class SkyScene {
  constructor(container) {
    this.container = container;
    this.width = container.clientWidth || 800;
    this.height = container.clientHeight || 500;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.skyDome = null;
    this.sunMesh = null;
    this.sunLight = null;
    this.moonMesh = null;
    this.starsMesh = null;
    this.groundMesh = null;
    this.cloudGroup = null;

    // Particle systems
    this.rainParticles = null;
    this.snowParticles = null;
    this.fogParticles = null;

    // Weather state
    this.currentCondition = "sunny"; // "sunny" | "cloudy" | "rain" | "thunderstorm" | "snow" | "fog"
    this.currentHour = 14; // 0 - 24
    this.windSpeed = 15; // km/h
    this.lightningTimer = 0;

    this.animationFrameId = null;

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera: angled up towards sky and sun trajectory
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 2.5, 12);
    this.camera.lookAt(0, 16, -35);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Ambient and Sun Directional Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    this.sunLight.position.set(0, 20, -20);
    this.scene.add(this.sunLight);

    // 5. Build Environment Elements
    this.buildSkyDome();
    this.buildSunAndMoon();
    this.buildStars();
    this.buildGround();
    this.buildClouds();
    this.buildRain();
    this.buildSnow();

    // 6. Set initial state based on current hour
    this.setTimeOfDay(new Date().getHours());

    // 7. Event listeners
    window.addEventListener("resize", () => this.onResize());

    // 8. Start Loop
    this.animate();
  }

  buildSkyDome() {
    const geometry = new THREE.SphereGeometry(250, 32, 16);
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 512;
    this.skyCanvas = canvas;
    this.skyCtx = canvas.getContext("2d");
    this.skyTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.MeshBasicMaterial({
      map: this.skyTexture,
      side: THREE.BackSide
    });

    this.skyDome = new THREE.Mesh(geometry, material);
    this.scene.add(this.skyDome);
    this.updateSkyGradient(14);
  }

  updateSkyGradient(hour) {
    const ctx = this.skyCtx;
    const grad = ctx.createLinearGradient(0, 0, 0, 512);

    if (hour >= 6 && hour < 8) {
      // Dawn / Sunrise
      grad.addColorStop(0, "#1f2a44");
      grad.addColorStop(0.4, "#5d435d");
      grad.addColorStop(0.7, "#f77f00");
      grad.addColorStop(1, "#fcbf49");
    } else if (hour >= 8 && hour < 17) {
      // Daytime Clear Blue
      grad.addColorStop(0, "#0b4f8a");
      grad.addColorStop(0.4, "#1982c4");
      grad.addColorStop(0.8, "#64b5f6");
      grad.addColorStop(1, "#b3e5fc");
    } else if (hour >= 17 && hour < 19.5) {
      // Golden Hour & Sunset
      grad.addColorStop(0, "#2b2d42");
      grad.addColorStop(0.3, "#8d0801");
      grad.addColorStop(0.6, "#d90429");
      grad.addColorStop(0.85, "#f77f00");
      grad.addColorStop(1, "#fcbf49");
    } else if (hour >= 19.5 && hour < 21) {
      // Dusk / Twilight
      grad.addColorStop(0, "#0d1b2a");
      grad.addColorStop(0.4, "#1b263b");
      grad.addColorStop(0.8, "#415a77");
      grad.addColorStop(1, "#778da9");
    } else {
      // Deep Starry Night
      grad.addColorStop(0, "#02040a");
      grad.addColorStop(0.5, "#060d1f");
      grad.addColorStop(1, "#0a1931");
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 512);
    this.skyTexture.needsUpdate = true;
  }

  buildSunAndMoon() {
    // 3D Sun
    const sunGeom = new THREE.SphereGeometry(3.5, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff4cc });
    this.sunMesh = new THREE.Mesh(sunGeom, sunMat);
    this.scene.add(this.sunMesh);

    // 3D Moon
    const moonGeom = new THREE.SphereGeometry(2.5, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xe0e6ed });
    this.moonMesh = new THREE.Mesh(moonGeom, moonMat);
    this.scene.add(this.moonMesh);
  }

  buildStars() {
    const count = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 220;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = Math.abs(r * Math.sin(phi) * Math.sin(theta)); // above horizon
      const z = r * Math.cos(phi);

      positions.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.0
    });

    this.starsMesh = new THREE.Points(geometry, material);
    this.scene.add(this.starsMesh);
  }

  buildGround() {
    // Ground landscape with wet reflection look
    const geometry = new THREE.PlaneGeometry(300, 300, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x141e28,
      roughness: 0.35,
      metalness: 0.3
    });

    this.groundMesh = new THREE.Mesh(geometry, material);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = -0.5;
    this.scene.add(this.groundMesh);

    // Distant mountain silhouette range for scenic horizon
    const mountainGeom = new THREE.ConeGeometry(12, 18, 5);
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9
    });

    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(mountainGeom, mountainMat);
      m.position.set((i - 7) * 16 + (Math.random() - 0.5) * 8, 4 + Math.random() * 3, -65 - Math.random() * 15);
      const sc = 1.2 + Math.random() * 1.0;
      m.scale.set(sc, sc, sc);
      this.scene.add(m);
    }
  }

  buildClouds() {
    this.cloudGroup = new THREE.Group();
    const cloudGeom = new THREE.DodecahedronGeometry(5, 1);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.75
    });

    for (let i = 0; i < 22; i++) {
      const cloudPuff = new THREE.Mesh(cloudGeom, cloudMat.clone());
      cloudPuff.position.set(
        (Math.random() - 0.5) * 110,
        14 + Math.random() * 10,
        -25 - Math.random() * 40
      );
      const scaleX = 2.2 + Math.random() * 2.5;
      const scaleY = 1.2 + Math.random() * 1.2;
      const scaleZ = 1.8 + Math.random() * 2;
      cloudPuff.scale.set(scaleX, scaleY, scaleZ);
      this.cloudGroup.add(cloudPuff);
    }

    this.scene.add(this.cloudGroup);
  }

  buildRain() {
    const count = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = Math.random() * 40;
      const z = (Math.random() - 0.5) * 60;
      positions.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x90caf9,
      size: 0.25,
      transparent: true,
      opacity: 0.0
    });

    this.rainParticles = new THREE.Points(geometry, material);
    this.scene.add(this.rainParticles);
  }

  buildSnow() {
    const count = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 70;
      const y = Math.random() * 40;
      const z = (Math.random() - 0.5) * 70;
      positions.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.45,
      transparent: true,
      opacity: 0.0
    });

    this.snowParticles = new THREE.Points(geometry, material);
    this.scene.add(this.snowParticles);
  }

  setTimeOfDay(hour) {
    this.currentHour = hour;
    this.updateSkyGradient(hour);

    // Calculate solar trajectory centered in viewport
    const progress = Math.max(0, Math.min(1, (hour - 5.5) / 14)); // 0 at dawn, 0.5 at noon, 1 at sunset
    const sunX = (progress - 0.5) * 70; // left to right across horizon
    const sunY = Math.sin(progress * Math.PI) * 25 + 4; // arcs gracefully above mountain horizon
    const sunZ = -48;

    this.sunMesh.position.set(sunX, sunY, sunZ);
    this.sunLight.position.set(sunX * 0.5, Math.max(2, sunY), sunZ * 0.5);

    // Moon trajectory across night hours
    const nightProgress = hour >= 19.5 ? (hour - 19.5) / 10.5 : (hour + 4.5) / 10.5;
    const moonX = (nightProgress - 0.5) * 70;
    const moonY = Math.sin(Math.max(0, Math.min(1, nightProgress)) * Math.PI) * 24 + 5;
    this.moonMesh.position.set(moonX, moonY, -48);

    const isDay = hour >= 6 && hour < 20;

    // Adjust light intensities
    if (isDay) {
      const heightFactor = Math.sin((hour - 6) / 12 * Math.PI);
      this.sunLight.intensity = Math.max(0.2, heightFactor * 2.2);
      this.ambientLight.intensity = Math.max(0.3, heightFactor * 1.0);
      this.starsMesh.material.opacity = 0.0;
      this.sunMesh.visible = true;
      this.moonMesh.visible = false;
    } else {
      this.sunLight.intensity = 0.1;
      this.ambientLight.intensity = 0.25;
      this.starsMesh.material.opacity = 0.9;
      this.sunMesh.visible = false;
      this.moonMesh.visible = true;
    }

    this.updateWeatherVisuals();
  }

  setCondition(condition, wind = 15) {
    this.currentCondition = condition;
    this.windSpeed = wind;
    this.updateWeatherVisuals();
  }

  updateWeatherVisuals() {
    const cond = this.currentCondition;
    const isDay = this.currentHour >= 6 && this.currentHour <= 19;

    // Rain
    if (cond === "rain" || cond === "thunderstorm") {
      this.rainParticles.material.opacity = 0.8;
      this.groundMesh.material.roughness = 0.1; // wet ground puddle reflection
    } else {
      this.rainParticles.material.opacity = 0.0;
      this.groundMesh.material.roughness = 0.5;
    }

    // Snow
    if (cond === "snow") {
      this.snowParticles.material.opacity = 0.9;
      this.groundMesh.material.color.setHex(0xdce7f0); // snowy dusting
    } else {
      this.snowParticles.material.opacity = 0.0;
      this.groundMesh.material.color.setHex(0x1a242f);
    }

    // Cloud tint & opacity
    if (this.cloudGroup) {
      const isOvercast = cond === "cloudy" || cond === "overcast" || cond === "rain" || cond === "thunderstorm" || cond === "snow";
      this.cloudGroup.children.forEach(puff => {
        puff.visible = isOvercast || cond === "partly_cloudy";
        if (cond === "thunderstorm") {
          puff.material.color.setHex(0x37474f); // dark storm anvil clouds
          puff.material.opacity = 0.95;
        } else if (cond === "rain") {
          puff.material.color.setHex(0x607d8b);
          puff.material.opacity = 0.85;
        } else {
          puff.material.color.setHex(isDay ? 0xffffff : 0x90a4ae);
          puff.material.opacity = 0.75;
        }
      });
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Animate clouds drifting
    if (this.cloudGroup) {
      const windDrift = (this.windSpeed / 100) * 0.05 + 0.01;
      this.cloudGroup.children.forEach(puff => {
        puff.position.x += windDrift;
        if (puff.position.x > 80) puff.position.x = -80;
      });
    }

    // Animate falling rain streaks with wind vector slant
    if (this.rainParticles && this.rainParticles.material.opacity > 0) {
      const positions = this.rainParticles.geometry.attributes.position.array;
      const count = positions.length / 3;
      const slant = (this.windSpeed / 100) * 0.2;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 1.2; // fall speed
        positions[i * 3] += slant; // wind drift

        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 40;
          positions[i * 3] = (Math.random() - 0.5) * 60;
        }
      }
      this.rainParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate falling snow with flutter turbulence
    if (this.snowParticles && this.snowParticles.material.opacity > 0) {
      const positions = this.snowParticles.geometry.attributes.position.array;
      const count = positions.length / 3;
      const time = performance.now() * 0.001;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.15; // slow graceful fall
        positions[i * 3] += Math.sin(time + i) * 0.03 + (this.windSpeed / 200) * 0.05;

        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 40;
          positions[i * 3] = (Math.random() - 0.5) * 70;
        }
      }
      this.snowParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Thunderstorm Lightning Flash Strobe
    if (this.currentCondition === "thunderstorm") {
      this.lightningTimer += 1;
      if (this.lightningTimer > 180 && Math.random() < 0.04) {
        // Trigger lightning flash
        this.ambientLight.intensity = 3.5;
        this.sunLight.color.setHex(0xaae8ff);
        setTimeout(() => {
          this.ambientLight.intensity = 0.3;
          this.sunLight.color.setHex(0xfffaed);
        }, 80);
        this.lightningTimer = 0;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    if (!this.container) return;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix;
    this.renderer.setSize(this.width, this.height);
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
