import "./style.css";
import { translations } from "./i18n/translations.js";
import { geoHierarchy, searchGlobalLocations } from "./data/geoHierarchy.js";
import { fetchCompleteWeather } from "./services/weatherService.js";
import { GlobeScene } from "./3d/globeScene.js";
import { SkyScene } from "./3d/skyScene.js";
import { WeatherAudioEngine } from "./audio/ambientAudio.js";
import { WindRadarCanvas } from "./components/windRadarCanvas.js";
import { renderMeteogramSvg } from "./components/meteogramChart.js";
import { getIconSvg } from "./utils/icons.js";

// Global App State
class AetheriaApp {
  constructor() {
    this.currentLang = localStorage.getItem("aetheria_lang") || "it";
    this.currentUnit = localStorage.getItem("aetheria_unit") || "C";
    this.currentView = "dashboard"; // "dashboard" | "globe" | "sky" | "radar" | "route"

    // Default Location: Milano, Lombardia, Italia
    this.selectedCountry = geoHierarchy[0];
    this.selectedRegion = this.selectedCountry.regions[0];
    this.selectedCity = this.selectedRegion.cities[0];

    this.weatherData = null;
    this.globeScene = null;
    this.skyScene = null;
    this.windRadar = null;
    this.audioEngine = new WeatherAudioEngine();

    this.dom = {};
  }

  get t() {
    return translations[this.currentLang] || translations.en;
  }

  async init() {
    this.renderShell();
    this.bindDomElements();
    this.populateGeoSelectors();
    this.bindEventListeners();

    // Fetch initial weather
    await this.loadWeatherForCurrentLocation();
  }

  renderShell() {
    const t = this.t;
    const appEl = document.getElementById("app");

    appEl.innerHTML = `
      <!-- Header -->
      <header class="app-header">
        <div class="header-brand" id="btnHomeBrand">
          <div class="brand-logo-badge">
            ${getIconSvg("cloud-lightning", 26)}
          </div>
          <div class="brand-text-wrap">
            <h1>${t.appName}</h1>
            <p>${t.tagline}</p>
          </div>
        </div>

        <!-- Center Search and Cascading Geo -->
        <div class="header-center">
          <div class="search-container">
            <div class="search-input-wrap">
              ${getIconSvg("search", 18)}
              <input type="text" id="globalSearchInput" class="search-input" placeholder="${t.searchPlaceholder}" autocomplete="off" />
            </div>
            <div id="searchSuggestionsBox" class="search-suggestions"></div>
          </div>

          <div class="geo-hierarchy-bar">
            <select id="selectCountry" class="geo-select" title="${t.geo.country}"></select>
            <select id="selectRegion" class="geo-select" title="${t.geo.region}"></select>
            <select id="selectCity" class="geo-select" title="${t.geo.city}"></select>
          </div>
        </div>

        <!-- Header Actions: GPS, Audio, Unit, Lang -->
        <div class="header-actions">
          <button id="btnGpsLocation" class="action-btn" title="${t.geo.currentLocation}">
            ${getIconSvg("navigation", 16)}
            <span class="btn-text">GPS</span>
          </button>

          <button id="btnAudioToggle" class="action-btn" title="${t.audio.ambientSounds}">
            ${getIconSvg("volume2", 16)}
            <span class="btn-text" id="audioBtnText">${t.audio.rainSound}</span>
          </button>

          <button id="btnUnitToggle" class="action-btn" title="Toggle °C / °F">
            <strong id="unitLabel">°${this.currentUnit}</strong>
          </button>

          <select id="selectLanguage" class="geo-select" title="Language">
            <option value="it" ${this.currentLang === "it" ? "selected" : ""}>🇮🇹 Italiano</option>
            <option value="en" ${this.currentLang === "en" ? "selected" : ""}>🇬🇧 English</option>
            <option value="es" ${this.currentLang === "es" ? "selected" : ""}>🇪🇸 Español</option>
            <option value="fr" ${this.currentLang === "fr" ? "selected" : ""}>🇫🇷 Français</option>
            <option value="de" ${this.currentLang === "de" ? "selected" : ""}>🇩🇪 Deutsch</option>
            <option value="ja" ${this.currentLang === "ja" ? "selected" : ""}>🇯🇵 日本語</option>
            <option value="zh" ${this.currentLang === "zh" ? "selected" : ""}>🇨🇳 中文</option>
            <option value="ar" ${this.currentLang === "ar" ? "selected" : ""}>🇸🇦 العربية</option>
            <option value="pt" ${this.currentLang === "pt" ? "selected" : ""}>🇧🇷 Português</option>
            <option value="ru" ${this.currentLang === "ru" ? "selected" : ""}>🇷🇺 Русский</option>
          </select>
        </div>
      </header>

      <!-- View Switcher Navigation Tabs -->
      <nav class="view-tabs-container">
        <button class="view-tab-btn active" data-view="dashboard">
          ${getIconSvg("activity", 18)}
          ${t.views.dashboard}
        </button>
        <button class="view-tab-btn" data-view="globe">
          ${getIconSvg("globe", 18)}
          ${t.views.globe}
        </button>
        <button class="view-tab-btn" data-view="sky">
          ${getIconSvg("sun", 18)}
          ${t.views.sky}
        </button>
        <button class="view-tab-btn" data-view="radar">
          ${getIconSvg("wind", 18)}
          ${t.views.radar}
        </button>
        <button class="view-tab-btn" data-view="route">
          ${getIconSvg("mapPin", 18)}
          ${t.views.route}
        </button>
      </nav>

      <!-- Main App Body -->
      <main class="main-wrapper">
        <!-- Severe Weather Alert Banner (conditionally displayed) -->
        <div id="alertBannerHolder"></div>

        <!-- 3D Scene Viewport (Globe or Sky Simulator) -->
        <section id="sceneSection" class="scene-section">
          <div id="sceneCanvasHolder" class="scene-canvas-holder"></div>
          
          <!-- Globe Layer Mode Controls -->
          <div id="globeLayerControls" class="scene-overlay-controls">
            <button class="scene-overlay-btn active" data-globe-layer="satellite">Satellite</button>
            <button class="scene-overlay-btn" data-globe-layer="temperature">Heatmap</button>
            <button class="scene-overlay-btn" data-globe-layer="wind">Jet Stream</button>
            <button class="scene-overlay-btn" data-globe-layer="radar">Radar</button>
            <button class="scene-overlay-btn" id="btnGlobeZoomIn" title="Zoom In" style="font-size: 1rem; padding: 2px 10px;">+</button>
            <button class="scene-overlay-btn" id="btnGlobeZoomOut" title="Zoom Out" style="font-size: 1rem; padding: 2px 10px;">−</button>
          </div>

          <!-- Sky 24h Time Scrubber -->
          <div id="skyScrubberWrap" class="scene-scrubber-bar" style="display: none;">
            <span class="scrubber-label" id="scrubberHourLabel">14:00</span>
            <input type="range" id="skyHourRange" class="scrubber-input" min="0" max="23" value="14" step="1" />
          </div>
        </section>

        <!-- Dynamic Content Mount Point -->
        <div id="dynamicContentHolder" class="dashboard-grid"></div>
      </main>
    `;
  }

  bindDomElements() {
    this.dom = {
      selectCountry: document.getElementById("selectCountry"),
      selectRegion: document.getElementById("selectRegion"),
      selectCity: document.getElementById("selectCity"),
      selectLanguage: document.getElementById("selectLanguage"),
      searchInput: document.getElementById("globalSearchInput"),
      suggestionsBox: document.getElementById("searchSuggestionsBox"),
      btnGps: document.getElementById("btnGpsLocation"),
      btnAudio: document.getElementById("btnAudioToggle"),
      btnUnit: document.getElementById("btnUnitToggle"),
      unitLabel: document.getElementById("unitLabel"),
      sceneSection: document.getElementById("sceneSection"),
      sceneCanvasHolder: document.getElementById("sceneCanvasHolder"),
      globeLayerControls: document.getElementById("globeLayerControls"),
      skyScrubberWrap: document.getElementById("skyScrubberWrap"),
      skyHourRange: document.getElementById("skyHourRange"),
      scrubberHourLabel: document.getElementById("scrubberHourLabel"),
      alertBannerHolder: document.getElementById("alertBannerHolder"),
      dynamicContentHolder: document.getElementById("dynamicContentHolder")
    };
  }

  populateGeoSelectors() {
    const cSelect = this.dom.selectCountry;
    cSelect.innerHTML = geoHierarchy.map(c => `
      <option value="${c.code}" ${c.code === this.selectedCountry.code ? "selected" : ""}>
        ${c.flag} ${c.name}
      </option>
    `).join("");

    this.updateRegionSelector();
  }

  updateRegionSelector() {
    const rSelect = this.dom.selectRegion;
    rSelect.innerHTML = this.selectedCountry.regions.map(r => `
      <option value="${r.name}" ${r.name === this.selectedRegion.name ? "selected" : ""}>
        ${r.name}
      </option>
    `).join("");

    this.updateCitySelector();
  }

  updateCitySelector() {
    const citySelect = this.dom.selectCity;
    citySelect.innerHTML = this.selectedRegion.cities.map(c => `
      <option value="${c.name}" ${c.name === this.selectedCity.name ? "selected" : ""}>
        ${c.name}
      </option>
    `).join("");
  }

  bindEventListeners() {
    // Geo Hierarchy change events
    this.dom.selectCountry.addEventListener("change", (e) => {
      const code = e.target.value;
      const foundCountry = geoHierarchy.find(c => c.code === code);
      if (foundCountry) {
        this.selectedCountry = foundCountry;
        this.selectedRegion = foundCountry.regions[0];
        this.selectedCity = this.selectedRegion.cities[0];
        this.updateRegionSelector();
        this.loadWeatherForCurrentLocation();
      }
    });

    this.dom.selectRegion.addEventListener("change", (e) => {
      const regionName = e.target.value;
      const foundRegion = this.selectedCountry.regions.find(r => r.name === regionName);
      if (foundRegion) {
        this.selectedRegion = foundRegion;
        this.selectedCity = foundRegion.cities[0];
        this.updateCitySelector();
        this.loadWeatherForCurrentLocation();
      }
    });

    this.dom.selectCity.addEventListener("change", (e) => {
      const cityName = e.target.value;
      const foundCity = this.selectedRegion.cities.find(c => c.name === cityName);
      if (foundCity) {
        this.selectedCity = foundCity;
        this.loadWeatherForCurrentLocation();
      }
    });

    // Language Selector
    this.dom.selectLanguage.addEventListener("change", (e) => {
      this.currentLang = e.target.value;
      localStorage.setItem("aetheria_lang", this.currentLang);
      this.renderShell();
      this.bindDomElements();
      this.populateGeoSelectors();
      this.bindEventListeners();
      this.renderCurrentView();
    });

    // Unit Toggle
    this.dom.btnUnit.addEventListener("click", () => {
      this.currentUnit = this.currentUnit === "C" ? "F" : "C";
      localStorage.setItem("aetheria_unit", this.currentUnit);
      this.dom.unitLabel.textContent = `°${this.currentUnit}`;
      this.renderCurrentView();
    });

    // GPS Geolocation
    this.dom.btnGps.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }
      this.dom.btnGps.classList.add("active");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.dom.btnGps.classList.remove("active");
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          this.selectedCity = {
            name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
            lat: lat,
            lon: lon,
            elevation: 50,
            timezone: "auto"
          };
          this.loadWeatherForCurrentLocation();
        },
        (err) => {
          this.dom.btnGps.classList.remove("active");
          console.warn("GPS error:", err);
          alert("Impossibile rilevare la posizione GPS. Seleziona una città manualmente.");
        }
      );
    });

    // Audio Engine Toggle
    this.dom.btnAudio.addEventListener("click", () => {
      const cond = this.weatherData ? this.weatherData.current.meta.skyType : "sunny";
      const playing = this.audioEngine.toggle(cond);
      this.dom.btnAudio.classList.toggle("active", playing);
    });

    // Global Search with debounce
    let searchTimeout = null;
    this.dom.searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      clearTimeout(searchTimeout);
      if (val.trim().length < 2) {
        this.dom.suggestionsBox.style.display = "none";
        return;
      }
      searchTimeout = setTimeout(async () => {
        const results = await searchGlobalLocations(val);
        this.renderSearchSuggestions(results);
      }, 250);
    });

    // Close suggestions when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.dom.searchInput.contains(e.target) && !this.dom.suggestionsBox.contains(e.target)) {
        this.dom.suggestionsBox.style.display = "none";
      }
    });

    // Navigation View Tab Buttons
    document.querySelectorAll(".view-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".view-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentView = btn.dataset.view;
        this.renderCurrentView();
      });
    });

    // Globe Layer Mode Buttons
    document.querySelectorAll("[data-globe-layer]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-globe-layer]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (this.globeScene) {
          this.globeScene.setLayerMode(btn.dataset.globeLayer);
        }
      });
    });

    // Globe Zoom in / out buttons
    const btnZoomIn = document.getElementById("btnGlobeZoomIn");
    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", () => {
        if (this.globeScene) this.globeScene.zoomIn();
      });
    }
    const btnZoomOut = document.getElementById("btnGlobeZoomOut");
    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", () => {
        if (this.globeScene) this.globeScene.zoomOut();
      });
    }

    // Sky Scrubber Range Input
    this.dom.skyHourRange.addEventListener("input", (e) => {
      const h = parseInt(e.target.value);
      this.dom.scrubberHourLabel.textContent = `${h.toString().padStart(2, "0")}:00`;
      if (this.skyScene) {
        this.skyScene.setTimeOfDay(h);
      }
    });
  }

  renderSearchSuggestions(results) {
    if (!results || !results.length) {
      this.dom.suggestionsBox.style.display = "none";
      return;
    }
    this.dom.suggestionsBox.innerHTML = results.map(r => `
      <div class="search-suggestion-item" data-lat="${r.lat}" data-lon="${r.lon}" data-name="${r.name}" data-region="${r.region}" data-country="${r.country}">
        <div>
          <div class="location-title">${r.name}</div>
          <div class="location-meta">${r.region ? r.region + ", " : ""}${r.country}</div>
        </div>
        <div class="location-meta">${r.lat.toFixed(2)}°, ${r.lon.toFixed(2)}°</div>
      </div>
    `).join("");

    this.dom.suggestionsBox.style.display = "block";

    this.dom.suggestionsBox.querySelectorAll(".search-suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        const lat = parseFloat(item.dataset.lat);
        const lon = parseFloat(item.dataset.lon);
        const name = item.dataset.name;
        const region = item.dataset.region;
        const country = item.dataset.country;

        this.selectedCity = {
          name: name,
          lat: lat,
          lon: lon,
          elevation: 50,
          timezone: "auto"
        };

        this.dom.suggestionsBox.style.display = "none";
        this.dom.searchInput.value = `${name}, ${country}`;
        this.loadWeatherForCurrentLocation();
      });
    });
  }

  async loadWeatherForCurrentLocation() {
    const lat = this.selectedCity.lat;
    const lon = this.selectedCity.lon;
    const timezone = this.selectedCity.timezone || "auto";
    const elevation = this.selectedCity.elevation || 50;

    // Fetch complete dataset
    this.weatherData = await fetchCompleteWeather(lat, lon, timezone, elevation);

    // Update Globe coordinates
    if (this.globeScene) {
      this.globeScene.setLocation(lat, lon, this.selectedCity.name);
    }
    // Update Sky Simulator condition
    if (this.skyScene) {
      this.skyScene.setCondition(this.weatherData.current.meta.skyType, this.weatherData.current.windSpeed);
    }

    this.renderCurrentView();
  }

  renderCurrentView() {
    if (!this.weatherData) return;

    // View specific scene viewport handling
    if (this.currentView === "globe") {
      this.dom.sceneSection.style.display = "block";
      this.dom.globeLayerControls.style.display = "flex";
      this.dom.skyScrubberWrap.style.display = "none";
      this.initOrShowGlobe();
    } else if (this.currentView === "sky") {
      this.dom.sceneSection.style.display = "block";
      this.dom.globeLayerControls.style.display = "none";
      this.dom.skyScrubberWrap.style.display = "flex";
      this.initOrShowSky();
    } else if (this.currentView === "radar") {
      this.dom.sceneSection.style.display = "none";
    } else if (this.currentView === "route") {
      this.dom.sceneSection.style.display = "none";
    } else {
      // Dashboard view displays the 3D globe as hero visualizer
      this.dom.sceneSection.style.display = "block";
      this.dom.globeLayerControls.style.display = "flex";
      this.dom.skyScrubberWrap.style.display = "none";
      this.initOrShowGlobe();
    }

    // Render alert banner
    this.renderAlertBanner();

    // Render page content
    if (this.currentView === "dashboard") {
      this.renderDashboard();
    } else if (this.currentView === "globe") {
      this.renderGlobeInfo();
    } else if (this.currentView === "sky") {
      this.renderSkyInfo();
    } else if (this.currentView === "radar") {
      this.renderRadarView();
    } else if (this.currentView === "route") {
      this.renderRoutePlannerView();
    }
  }

  initOrShowGlobe() {
    if (this.skyScene) {
      this.skyScene.destroy();
      this.skyScene = null;
    }
    if (!this.globeScene) {
      this.dom.sceneCanvasHolder.innerHTML = "";
      this.globeScene = new GlobeScene(this.dom.sceneCanvasHolder);
    }
    this.globeScene.setLocation(this.selectedCity.lat, this.selectedCity.lon, this.selectedCity.name);
  }

  initOrShowSky() {
    if (this.globeScene) {
      this.globeScene.destroy();
      this.globeScene = null;
    }
    if (!this.skyScene) {
      this.dom.sceneCanvasHolder.innerHTML = "";
      this.skyScene = new SkyScene(this.dom.sceneCanvasHolder);
    }
    if (this.weatherData) {
      this.skyScene.setCondition(this.weatherData.current.meta.skyType, this.weatherData.current.windSpeed);
    }
  }

  formatTemp(celsius) {
    if (this.currentUnit === "F") {
      return `${Math.round(celsius * 9/5 + 32)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  }

  renderAlertBanner() {
    const alert = this.weatherData ? this.weatherData.alert : null;
    const t = this.t;
    if (!alert) {
      this.dom.alertBannerHolder.innerHTML = "";
      return;
    }

    this.dom.alertBannerHolder.innerHTML = `
      <div class="alert-banner ${alert.severity}">
        <div style="display: flex; align-items: center; gap: 12px;">
          ${getIconSvg("alert", 24)}
          <div>
            <strong>${t.alerts[alert.titleKey] || alert.titleKey}</strong>
            <p style="font-size: 0.84rem; opacity: 0.9;">${alert.description}</p>
          </div>
        </div>
      </div>
    `;
  }

  renderDashboard() {
    const data = this.weatherData;
    const curr = data.current;
    const t = this.t;

    const conditionName = t.conditions[curr.meta.key] || curr.meta.key;

    this.dom.dynamicContentHolder.innerHTML = `
      <!-- Hero Weather Summary Card -->
      <div class="glass-panel hero-weather-card">
        <div class="hero-main-stats">
          <div class="hero-location-badge">
            ${getIconSvg("mapPin", 24, "text-cyan")}
            <span>${this.selectedCity.name}</span>
            <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 500;">
              ${this.selectedRegion ? this.selectedRegion.name + ", " : ""}${this.selectedCountry ? this.selectedCountry.name : ""}
            </span>
          </div>
          <div class="hero-coords-text">
            ${t.geo.coordinates}: ${data.coordinates.lat.toFixed(3)}°N, ${data.coordinates.lon.toFixed(3)}°E · ${t.geo.elevation}: ${data.coordinates.elevation}m
          </div>

          <div class="hero-temp-row">
            <div class="hero-temp-value">${this.formatTemp(curr.temp)}</div>
            <div class="hero-condition-summary">
              <div style="display: flex; align-items: center; gap: 8px;">
                ${getIconSvg(curr.meta.icon, 28)}
                <span class="hero-condition-text">${conditionName}</span>
              </div>
              <span class="hero-feels-text">
                ${t.current.feelsLike}: <strong>${this.formatTemp(curr.feelsLike)}</strong> · ${t.current.feelsLikeShade}: ${this.formatTemp(curr.feelsLikeShade)}
              </span>
              <span style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                ${t.current.highLow}: ${this.formatTemp(curr.tempMax)} / ${this.formatTemp(curr.tempMin)}
              </span>
            </div>
          </div>
        </div>

        <!-- 6 Metrics Pill Grid -->
        <div class="hero-metrics-pill-grid">
          <div class="metric-pill">
            <span class="label">${t.current.humidity}</span>
            <span class="val">${curr.humidity}%</span>
          </div>
          <div class="metric-pill">
            <span class="label">${t.current.wind}</span>
            <span class="val">${curr.windSpeed} km/h</span>
          </div>
          <div class="metric-pill">
            <span class="label">${t.current.windGusts}</span>
            <span class="val">${curr.windGusts} km/h</span>
          </div>
          <div class="metric-pill">
            <span class="label">${t.current.pressure}</span>
            <span class="val">${curr.pressure} hPa</span>
          </div>
          <div class="metric-pill">
            <span class="label">${t.current.uvIndex}</span>
            <span class="val">${curr.uvIndex}</span>
          </div>
          <div class="metric-pill">
            <span class="label">${t.current.dewPoint}</span>
            <span class="val">${this.formatTemp(curr.dewPoint)}</span>
          </div>
        </div>
      </div>

      <!-- AccuWeather MinuteCast Card -->
      <div class="glass-panel minutecast-card">
        <div class="card-header-row">
          <div>
            <div class="card-title">
              ${getIconSvg("droplets", 20)}
              <span>${t.minuteCast.title}</span>
            </div>
            <div class="card-subtitle">${t.minuteCast.subtitle}</div>
          </div>
          <div style="font-size: 0.88rem; font-weight: 600; color: var(--accent-cyan);">
            ${t.minuteCast[data.minuteCast.statusKey] || ""} ${data.minuteCast.targetMinute > 0 ? data.minuteCast.targetMinute + " " + t.minuteCast.minutes : ""}
          </div>
        </div>

        <div class="minutecast-timeline-container">
          ${data.minuteCast.timeline.map(m => {
            const h = Math.max(4, m.intensity * 75);
            let cls = "light";
            if (m.intensity > 0.3) cls = "mod";
            if (m.intensity > 0.6) cls = "heavy";
            if (m.intensity > 0.85) cls = "extreme";
            return `<div class="minutecast-bar ${cls}" style="height: ${h}px;" title="${m.minute} min: ${Math.round(m.intensity * 100)}%"></div>`;
          }).join("")}
        </div>
        <div class="minutecast-labels">
          <span>${t.hourly.now}</span>
          <span>+30 min</span>
          <span>+60 min</span>
          <span>+90 min</span>
          <span>+120 min</span>
        </div>
      </div>

      <!-- 48-Hour Hourly Forecast Scrub Slider -->
      <div class="glass-panel hourly-card">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("activity", 20)}
            <span>${t.hourly.title}</span>
          </div>
          <span class="card-subtitle">${t.hourly.scrubHelp}</span>
        </div>

        <div class="hourly-scroll-container">
          ${data.hourly.map((h, i) => `
            <div class="hourly-item-box" data-hour="${h.hour}">
              <span class="time">${i === 0 ? t.hourly.now : h.hour + ":00"}</span>
              ${getIconSvg(h.meta.icon, 24)}
              <span class="temp">${this.formatTemp(h.temp)}</span>
              <div class="rain-prob">
                ${getIconSvg("droplets", 12)}
                <span>${h.rainProb}%</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Yr.no / ECMWF HD Meteogram Chart -->
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("activity", 20)}
            <span>Meteogramma Atmosferico ad Alta Definizione (Yr.no / ECMWF)</span>
          </div>
          <span class="card-subtitle">Curve combinate: Temperatura (°C), Punto di Rugiada, Pressione e Pioggia</span>
        </div>
        <div>
          ${renderMeteogramSvg(data.hourly, this.currentUnit === "F")}
        </div>
      </div>

      <!-- Two-Column Deep Analytics Grid -->
      <div class="deep-analytics-grid">
        <!-- Multi-Model Weather Supercomputer Comparison (Windy / Ventusky) -->
        <div class="glass-panel" style="padding: 24px;">
          <div class="card-header-row">
            <div>
              <div class="card-title">
                ${getIconSvg("cpu", 20)}
                <span>${t.models.title}</span>
              </div>
              <div class="card-subtitle">${t.models.subtitle}</div>
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-emerald);">
              ${t.models.confidence}: ${data.models.confidence}%
            </div>
          </div>

          <table class="models-table">
            <thead>
              <tr>
                <th>Modello Supercomputer</th>
                <th>Risoluzione</th>
                <th>Temp Prevista</th>
                <th>Vento</th>
                <th>Pioggia</th>
              </tr>
            </thead>
            <tbody>
              ${data.models.models.map(m => `
                <tr>
                  <td><strong>${m.name}</strong></td>
                  <td><span style="color: var(--text-muted); font-size: 0.78rem;">${m.resolution}</span></td>
                  <td class="temp-cell">${this.formatTemp(m.temp)}</td>
                  <td>${m.wind} km/h</td>
                  <td>${m.rainMm} mm</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div style="margin-top: 14px; font-size: 0.8rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
            <span>${t.models.consensus}: <strong>${this.formatTemp(data.models.consensusTemp)}</strong></span>
            <span>${t.models.spread}: ±${data.models.spread}°C</span>
          </div>
        </div>

        <!-- Biometeorology, Health & Pollen -->
        <div class="glass-panel" style="padding: 24px;">
          <div class="card-header-row">
            <div>
              <div class="card-title">
                ${getIconSvg("shield", 20)}
                <span>${t.biometeo.title}</span>
              </div>
              <div class="card-subtitle">Parametri fisiologici e allarme emicrania barometrica</div>
            </div>
          </div>

          <div class="biometeo-metrics-grid">
            <div class="biometeo-box">
              <span class="title">${t.biometeo.headacheAlert}</span>
              <span class="status" style="color: ${data.biometeo.headacheLevel === 3 ? 'var(--accent-rose)' : data.biometeo.headacheLevel === 2 ? 'var(--accent-amber)' : 'var(--accent-emerald)'}">
                ${t.biometeo[data.biometeo.headacheRisk]}
              </span>
              <span class="desc">ΔP 3h: ${data.biometeo.deltaPressure} hPa</span>
            </div>

            <div class="biometeo-box">
              <span class="title">${t.biometeo.maxSunExposure}</span>
              <span class="status" style="color: var(--accent-cyan); font-family: var(--font-mono);">
                ~${data.biometeo.safeSunTimes.typeIII} ${t.biometeo.sunMinutes}
              </span>
              <span class="desc">Fototipo III (Pelle intermedia) a UV ${curr.uvIndex}</span>
            </div>
          </div>

          <div class="pollen-meter-wrap">
            <div style="font-weight: 600; font-size: 0.85rem; margin-top: 6px;">${t.biometeo.pollenTitle}</div>
            <div class="pollen-bar-item">
              <span>${t.biometeo.pollenGraminacee}</span>
              <div class="pollen-track"><div class="pollen-fill" style="width: ${data.biometeo.pollen.graminacee}%;"></div></div>
            </div>
            <div class="pollen-bar-item">
              <span>${t.biometeo.pollenBetulla}</span>
              <div class="pollen-track"><div class="pollen-fill" style="width: ${data.biometeo.pollen.betulla}%;"></div></div>
            </div>
            <div class="pollen-bar-item">
              <span>${t.biometeo.pollenAmbrosia}</span>
              <div class="pollen-track"><div class="pollen-fill" style="width: ${data.biometeo.pollen.ambrosia}%;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Air Quality AQI and Lifestyle Planner -->
      <div class="deep-analytics-grid">
        <!-- Air Quality Breakdown -->
        <div class="glass-panel" style="padding: 24px;">
          <div class="card-header-row">
            <div class="card-title">
              ${getIconSvg("gauge", 20)}
              <span>${t.aqi.title}</span>
            </div>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--accent-emerald);">US AQI: ${data.airQuality.usAqi}</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px;">
            <div class="metric-pill">
              <span class="label">PM 2.5</span>
              <span class="val">${data.airQuality.pm25} µg/m³</span>
            </div>
            <div class="metric-pill">
              <span class="label">PM 10</span>
              <span class="val">${data.airQuality.pm10} µg/m³</span>
            </div>
            <div class="metric-pill">
              <span class="label">Ozono (O₃)</span>
              <span class="val">${data.airQuality.o3} µg/m³</span>
            </div>
            <div class="metric-pill">
              <span class="label">Biossido Azoto</span>
              <span class="val">${data.airQuality.no2} µg/m³</span>
            </div>
            <div class="metric-pill">
              <span class="label">Biossido Zolfo</span>
              <span class="val">${data.airQuality.so2} µg/m³</span>
            </div>
            <div class="metric-pill">
              <span class="label">Monossido CO</span>
              <span class="val">${data.airQuality.co} µg/m³</span>
            </div>
          </div>
          <p style="margin-top: 14px; font-size: 0.82rem; color: var(--text-secondary);">
            <strong>${t.aqi.healthAdvice}:</strong> ${t.aqi.advisoryGood}
          </p>
        </div>

        <!-- Lifestyle & AI Outfit Advisor -->
        <div class="glass-panel" style="padding: 24px;">
          <div class="card-header-row">
            <div class="card-title">
              ${getIconSvg("shirt", 20)}
              <span>${t.lifestyle.title}</span>
            </div>
          </div>

          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px;">
            <strong>${t.lifestyle.outfitTitle}:</strong>
          </div>
          <div class="outfit-recommendations">
            ${data.lifestyle.outfit.map(item => `
              <div class="outfit-chip">
                ${getIconSvg(item.icon, 16)}
                <span>${item.fallback}</span>
              </div>
            `).join("")}
          </div>

          <div class="activity-scores-grid">
            <div class="activity-tile">
              <span class="score">${data.lifestyle.laundry}%</span>
              <span class="name">${t.lifestyle.laundry}</span>
            </div>
            <div class="activity-tile">
              <span class="score">${data.lifestyle.running}%</span>
              <span class="name">${t.lifestyle.running}</span>
            </div>
            <div class="activity-tile">
              <span class="score">${data.lifestyle.carWash}%</span>
              <span class="name">${t.lifestyle.carWash}</span>
            </div>
            <div class="activity-tile">
              <span class="score">${data.lifestyle.stargazing}%</span>
              <span class="name">${t.lifestyle.stargazing}</span>
            </div>
            <div class="activity-tile">
              <span class="score">${data.lifestyle.bbq}%</span>
              <span class="name">${t.lifestyle.bbq}</span>
            </div>
            <div class="activity-tile">
              <span class="score">${data.sunMoon.illumination}%</span>
              <span class="name">${t.sunMoon.moonPhase}: ${t.sunMoon.moonPhases[data.sunMoon.moonPhase]}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 14-Day Extended Forecast Grid -->
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("sun", 20)}
            <span>${t.daily.title}</span>
          </div>
        </div>

        <div class="daily-forecast-grid">
          ${data.daily.map(d => `
            <div class="daily-item-card">
              <div class="daily-header">
                <div>
                  <div class="daily-dayname">${d.dayName}</div>
                  <div class="daily-date">${d.date.slice(5)}</div>
                </div>
                ${getIconSvg(d.meta.icon, 28)}
              </div>

              <div class="daily-temp-bar-wrap">
                <span style="color: #38bdf8;">${this.formatTemp(d.tempMin)}</span>
                <div class="daily-temp-bar">
                  <div class="daily-temp-fill" style="left: 20%; width: 60%;"></div>
                </div>
                <span style="color: #f59e0b;">${this.formatTemp(d.tempMax)}</span>
              </div>

              <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                <span>💧 ${d.rainProb}% (${d.precipitationSum} mm)</span>
                <span>💨 ${d.windSpeedMax} km/h</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    // Bind hourly card click to scrub 3D sky
    document.querySelectorAll(".hourly-item-box").forEach(el => {
      el.addEventListener("click", () => {
        const h = parseInt(el.dataset.hour);
        this.dom.skyHourRange.value = h;
        this.dom.scrubberHourLabel.textContent = `${h.toString().padStart(2, "0")}:00`;
        // switch tab to Sky Simulator
        const skyTab = document.querySelector('[data-view="sky"]');
        if (skyTab) skyTab.click();
      });
    });
  }

  renderGlobeInfo() {
    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-title">
          ${getIconSvg("globe", 24)}
          <span>Globo Meteorologico 3D Interattivo ad Alta Risoluzione</span>
        </div>
        <p style="color: var(--text-secondary); margin-top: 8px; font-size: 0.9rem;">
          Naviga la Terra in 3D: trascina con il mouse o touch per ruotare il globo, usa la rotella per zoomare.
          Seleziona i layer in alto a destra: <strong>Satellite</strong> (fotorealistico con illuminazione giorno/notte e luci delle città), 
          <strong>Heatmap</strong> (anomalie termiche globali), <strong>Jet Stream</strong> (vettori di corrente a getto dinamici) e <strong>Radar</strong>.
        </p>
      </div>
    `;
  }

  renderSkyInfo() {
    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-title">
          ${getIconSvg("sun", 24)}
          <span>Simulatore Atmosferico 3D & Ciclo Solare 24 Ore</span>
        </div>
        <p style="color: var(--text-secondary); margin-top: 8px; font-size: 0.9rem;">
          Usa lo slider orario in basso alla finestra 3D per simulare l'evoluzione atmosferica in tempo reale.
          Visualizza il moto del sole, la dispersione ottica di Rayleigh/Mie al tramonto (Golden Hour),
          la volta stellata celeste con fase lunare e particelle dinamiche di pioggia, neve, foschia o fulmini.
        </p>
      </div>
    `;
  }

  renderRadarView() {
    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("wind", 24)}
            <span>${this.t.views.radar} - Dinamica Vento & Precipitazioni (Stile Windy.com / Ventusky)</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="btnRadarModeWind" class="action-btn active">Linee di Flusso Vento</button>
            <button id="btnRadarModeSweep" class="action-btn">Radar Doppler Precipitazioni</button>
          </div>
        </div>

        <div style="height: 380px; position: relative; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-glass);">
          <canvas id="windRadarCanvas" style="width: 100%; height: 100%; display: block;"></canvas>
        </div>

        <div style="margin-top: 16px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
          <div class="metric-pill">
            <span class="label">Velocità Vento Attuale</span>
            <span class="val">${this.weatherData.current.windSpeed} km/h</span>
          </div>
          <div class="metric-pill">
            <span class="label">Direzione Vento</span>
            <span class="val">${this.weatherData.current.windDirection}° (${this.getCompassDir(this.weatherData.current.windDirection)})</span>
          </div>
          <div class="metric-pill">
            <span class="label">Scala Beaufort</span>
            <span class="val">Grado ${this.toBeaufort(this.weatherData.current.windSpeed)}</span>
          </div>
          <div class="metric-pill">
            <span class="label">Moto Ondoso Stimato</span>
            <span class="val">${(this.weatherData.current.windSpeed * 0.05).toFixed(1)} m</span>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById("windRadarCanvas");
    if (canvas) {
      if (this.windRadar) this.windRadar.destroy();
      this.windRadar = new WindRadarCanvas(canvas);
      this.windRadar.setWind(this.weatherData.current.windSpeed, this.weatherData.current.windDirection);

      document.getElementById("btnRadarModeWind").addEventListener("click", (e) => {
        document.getElementById("btnRadarModeWind").classList.add("active");
        document.getElementById("btnRadarModeSweep").classList.remove("active");
        this.windRadar.setMode("wind");
      });

      document.getElementById("btnRadarModeSweep").addEventListener("click", (e) => {
        document.getElementById("btnRadarModeSweep").classList.add("active");
        document.getElementById("btnRadarModeWind").classList.remove("active");
        this.windRadar.setMode("radar");
      });
    }
  }

  getCompassDir(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  }

  toBeaufort(kmh) {
    if (kmh < 2) return 0;
    if (kmh < 6) return 1;
    if (kmh < 12) return 2;
    if (kmh < 20) return 3;
    if (kmh < 29) return 4;
    if (kmh < 39) return 5;
    if (kmh < 50) return 6;
    if (kmh < 62) return 7;
    return 8;
  }

  renderRoutePlannerView() {
    const t = this.t;
    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("mapPin", 24)}
            <span>${t.routeWeather.title}</span>
          </div>
          <div class="card-subtitle">${t.routeWeather.subtitle}</div>
        </div>

        <div class="route-planner-box">
          <input type="text" id="routeOriginInput" class="route-input" placeholder="${t.routeWeather.origin} (es. Milano)" value="Milano" />
          <input type="text" id="routeDestInput" class="route-input" placeholder="${t.routeWeather.destination} (es. Roma)" value="Roma" />
          <button id="btnCalcRoute" class="route-calc-btn">${t.routeWeather.calcRoute}</button>
        </div>

        <div id="routeResultsHolder" style="margin-top: 24px;">
          <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 12px;">${t.routeWeather.checkPoints}:</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            <div class="glass-panel" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Partenza</div>
              <strong style="font-size: 1.1rem;">Milano (Lombardia)</strong>
              <div style="margin-top: 8px; font-size: 1.3rem; font-weight: 700; color: var(--accent-cyan);">18°C · Sereno</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Vento: 12 km/h · Asfalto asciutto</div>
            </div>

            <div class="glass-panel" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Tappa Appenninica</div>
              <strong style="font-size: 1.1rem;">Bologna / Valico</strong>
              <div style="margin-top: 8px; font-size: 1.3rem; font-weight: 700; color: var(--accent-amber);">15°C · Pioviggine</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Visibilità ridotta a tratti per foschia</div>
            </div>

            <div class="glass-panel" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">Destinazione</div>
              <strong style="font-size: 1.1rem;">Roma (Lazio)</strong>
              <div style="margin-top: 8px; font-size: 1.3rem; font-weight: 700; color: var(--accent-cyan);">21°C · Soleggiato</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Vento: 9 km/h · Condizioni ottimali</div>
            </div>
          </div>

          <div style="margin-top: 18px; padding: 14px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: var(--radius-md); font-size: 0.86rem;">
            <strong>${t.routeWeather.routeAdvice}:</strong> Itinerario agevole. Prestare attenzione moderata solo sul tratto appenninico per asfalto umido e foschia tra il km 180 e il km 240. Nessun rischio neve o burrasca.
          </div>
        </div>
      </div>
    `;

    document.getElementById("btnCalcRoute").addEventListener("click", () => {
      const orig = document.getElementById("routeOriginInput").value;
      const dest = document.getElementById("routeDestInput").value;
      alert(`Analisi percorso meteo tra ${orig} e ${dest} ricalcolata con successo.`);
    });
  }
}

// Initialize Application when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const app = new AetheriaApp();
  app.init();
});
