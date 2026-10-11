// Procedural Web Audio Weather Soundscape Generator
// Generates realistic rain, wind, and thunder sounds entirely through mathematical synthesis.
// Zero external files, zero bandwidth, zero latency.

export class WeatherAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.4;

    this.masterGain = null;
    this.rainGain = null;
    this.windGain = null;

    this.rainNode = null;
    this.windNode = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle(condition = "sunny") {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(condition);
      return true;
    }
  }

  start(condition = "rain") {
    this.ensureContext();
    this.stop(); // Clear previous nodes

    this.isPlaying = true;

    // Build Rain Sound (Pink Noise filtered with high-frequency droplets)
    this.createRainGenerator(condition);

    // Build Wind Breeze Sound (Resonant low-pass swept noise)
    this.createWindGenerator(condition);
  }

  createRainGenerator(condition) {
    if (condition !== "rain" && condition !== "thunderstorm") return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate Pink Noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter for gentle rain patter
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(condition === "thunderstorm" ? 1800 : 1200, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(condition === "thunderstorm" ? 0.6 : 0.35, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  createWindGenerator(condition) {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // LFO for slow atmospheric wind swell
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(condition === "thunderstorm" ? 0.5 : 0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    noise.start();
    this.windNode = noise;
  }

  stop() {
    this.isPlaying = false;
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch (e) {}
      this.rainNode.disconnect();
      this.rainNode = null;
    }
    if (this.windNode) {
      try { this.windNode.stop(); } catch (e) {}
      this.windNode.disconnect();
      this.windNode = null;
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}
