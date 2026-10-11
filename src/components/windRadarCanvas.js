// Live Wind Vector Streamlines & Radar Simulation Canvas (Windy.com / Ventusky Style)
// Renders flowing animated wind particles that trace vectors based on wind speed and direction.

export class WindRadarCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.numParticles = 240;
    this.windSpeed = 22; // km/h
    this.windDirection = 225; // degrees
    this.mode = "wind"; // "wind" | "radar"

    this.animationId = null;
    this.resize();
    this.initParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight || 300;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        age: Math.random() * 80,
        maxAge: 60 + Math.random() * 40,
        speedFactor: 0.8 + Math.random() * 0.4
      });
    }
  }

  setWind(speed, direction) {
    this.windSpeed = speed;
    this.windDirection = direction;
  }

  setMode(mode) {
    this.mode = mode;
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Semi-transparent fade trail
    this.ctx.fillStyle = "rgba(7, 11, 22, 0.22)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    if (this.mode === "radar") {
      this.drawRadarSweep();
    } else {
      this.drawWindStreamlines();
    }
  }

  drawWindStreamlines() {
    // Convert direction angle to radian velocity
    const rad = ((this.windDirection - 90) * Math.PI) / 180;
    const speed = Math.max(1.2, (this.windSpeed / 15) * 1.5);
    const vx = Math.cos(rad) * speed;
    const vy = Math.sin(rad) * speed;

    this.ctx.lineWidth = 1.8;

    for (let p of this.particles) {
      // Calculate color based on wind velocity
      const alpha = Math.sin((p.age / p.maxAge) * Math.PI);
      let col = `rgba(56, 189, 248, ${alpha * 0.85})`; // Cyan for gentle breeze
      if (this.windSpeed > 35) col = `rgba(245, 158, 11, ${alpha * 0.9})`; // Amber
      if (this.windSpeed > 60) col = `rgba(244, 63, 94, ${alpha * 0.95})`; // Red gale

      this.ctx.strokeStyle = col;
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);

      // Advance particle with curl turbulence
      const curl = Math.sin(p.y * 0.015) * 0.5;
      const nextX = p.x + (vx + curl) * p.speedFactor;
      const nextY = p.y + vy * p.speedFactor;

      this.ctx.lineTo(nextX, nextY);
      this.ctx.stroke();

      p.x = nextX;
      p.y = nextY;
      p.age++;

      // Reset when expired or out of bounds
      if (p.age >= p.maxAge || p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.height) {
        p.x = Math.random() * this.width;
        p.y = Math.random() * this.height;
        p.age = 0;
      }
    }
  }

  drawRadarSweep() {
    const time = performance.now() * 0.001;
    const cx = this.width / 2;
    const cy = this.height / 2;

    // Concentric radar distance rings
    this.ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
    this.ctx.lineWidth = 1;
    for (let r = 50; r < Math.max(this.width, this.height); r += 60) {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // Rotating sweep ray
    const sweepAngle = time * 1.5;
    this.ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(cx + Math.cos(sweepAngle) * 400, cy + Math.sin(sweepAngle) * 400);
    this.ctx.stroke();

    // Simulated storm precipitation echo blobs
    this.ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
    this.ctx.beginPath();
    this.ctx.ellipse(cx + 80, cy - 60, 50, 35, 0.4, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "rgba(99, 102, 241, 0.35)";
    this.ctx.beginPath();
    this.ctx.ellipse(cx + 85, cy - 65, 25, 18, 0.4, 0, Math.PI * 2);
    this.ctx.fill();
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}
