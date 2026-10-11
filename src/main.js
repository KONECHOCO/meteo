import "./style.css";
import { translations } from "./i18n/translations.js";
import { geoHierarchy, searchGlobalLocations } from "./data/geoHierarchy.js";
import { fetchCompleteWeather, fetchPointsWeather, pollenLevel, aqiBand } from "./services/weatherService.js";
import { GlobeScene } from "./3d/globeScene.js";
import { SkyScene } from "./3d/skyScene.js";
import { WeatherAudioEngine } from "./audio/ambientAudio.js";
import { WindRadarCanvas } from "./components/windRadarCanvas.js";
import { renderMeteogramSvg } from "./components/meteogramChart.js";
import { getIconSvg } from "./utils/icons.js";

const LOCALES = { it: "it-IT", en: "en-GB", es: "es-ES", fr: "fr-FR", de: "de-DE", ja: "ja-JP", zh: "zh-CN", ar: "ar", pt: "pt-BR", ru: "ru-RU" };
const CACHE_PREFIX = "aetheria_wx_";

// Escape text coming from APIs or user input before putting it into innerHTML
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

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
    this.locationLabel = { region: this.selectedRegion.name, country: this.selectedCountry.name };

    this.weatherData = null;
    this.isOfflineData = false;
    this.loadError = false;
    this.globeScene = null;
    this.skyScene = null;
    this.windRadar = null;
    this.audioEngine = new WeatherAudioEngine();

    this.dom = {};
  }

  get t() {
    return translations[this.currentLang] || translations.en;
  }

  get locale() {
    return LOCALES[this.currentLang] || "en-GB";
  }

  async init() {
    this.renderShell();
    this.bindDomElements();
    this.populateGeoSelectors();
    this.bindEventListeners();

    await this.loadWeatherForCurrentLocation();
  }

  renderShell() {
    const t = this.t;
    const appEl = document.getElementById("app");
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === "ar" ? "rtl" : "ltr";

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
              <input type="text" id="globalSearchInput" class="search-input" placeholder="${esc(t.searchPlaceholder)}" autocomplete="off" />
            </div>
            <div id="searchSuggestionsBox" class="search-suggestions"></div>
          </div>

          <div class="geo-hierarchy-bar">
            <select id="selectCountry" class="geo-select" title="${esc(t.geo.country)}"></select>
            <select id="selectRegion" class="geo-select" title="${esc(t.geo.region)}"></select>
            <select id="selectCity" class="geo-select" title="${esc(t.geo.city)}"></select>
          </div>
        </div>

        <!-- Header Actions: GPS, Audio, Unit, Lang -->
        <div class="header-actions">
          <button id="btnGpsLocation" class="action-btn" title="${esc(t.geo.currentLocation)}">
            ${getIconSvg("navigation", 16)}
            <span class="btn-text">GPS</span>
          </button>

          <button id="btnAudioToggle" class="action-btn" title="${esc(t.audio.ambientSounds)}">
            ${getIconSvg("volume2", 16)}
            <span class="btn-text" id="audioBtnText">${t.audio.rainSound}</span>
          </button>

          <button id="btnUnitToggle" class="action-btn" title="°C / °F">
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
        ${[
          ["dashboard", "activity"],
          ["globe", "globe"],
          ["sky", "sun"],
          ["radar", "wind"],
          ["route", "mapPin"]
        ].map(([view, icon]) => `
          <button class="view-tab-btn ${this.currentView === view ? "active" : ""}" data-view="${view}">
            ${getIconSvg(icon, 18)}
            ${t.views[view]}
          </button>
        `).join("")}
      </nav>

      <!-- Main App Body -->
      <main class="main-wrapper">
        <div id="statusBannerHolder"></div>
        <div id="alertBannerHolder"></div>

        <!-- 3D Scene Viewport (Globe or Sky Simulator) -->
        <section id="sceneSection" class="scene-section">
          <div id="sceneCanvasHolder" class="scene-canvas-holder"></div>

          <div id="globeLayerControls" class="scene-overlay-controls">
            <button class="scene-overlay-btn" id="btnGlobeZoomIn" title="Zoom +" style="font-size: 1rem; padding: 2px 10px;">+</button>
            <button class="scene-overlay-btn" id="btnGlobeZoomOut" title="Zoom −" style="font-size: 1rem; padding: 2px 10px;">−</button>
          </div>

          <!-- Sky 24h Time Scrubber -->
          <div id="skyScrubberWrap" class="scene-scrubber-bar" style="display: none;">
            <span class="scrubber-label" id="scrubberHourLabel">14:00</span>
            <input type="range" id="skyHourRange" class="scrubber-input" min="0" max="23" value="14" step="1" />
          </div>
        </section>

        <!-- Dynamic Content Mount Point -->
        <div id="dynamicContentHolder" class="dashboard-grid"></div>

        <footer style="text-align: center; font-size: 0.75rem; color: var(--text-muted); padding: 16px 0 24px;">
          <a href="https://open-meteo.com/" target="_blank" rel="noopener" style="color: inherit;">${t.status.dataSource}</a>
        </footer>
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
      statusBannerHolder: document.getElementById("statusBannerHolder"),
      alertBannerHolder: document.getElementById("alertBannerHolder"),
      dynamicContentHolder: document.getElementById("dynamicContentHolder")
    };
  }

  populateGeoSelectors() {
    const cSelect = this.dom.selectCountry;
    cSelect.innerHTML = geoHierarchy.map(c => `
      <option value="${c.code}" ${c.code === this.selectedCountry.code ? "selected" : ""}>
        ${c.flag} ${esc(c.name)}
      </option>
    `).join("");

    this.updateRegionSelector();
  }

  updateRegionSelector() {
    const rSelect = this.dom.selectRegion;
    rSelect.innerHTML = this.selectedCountry.regions.map(r => `
      <option value="${esc(r.name)}" ${this.selectedRegion && r.name === this.selectedRegion.name ? "selected" : ""}>
        ${esc(r.name)}
      </option>
    `).join("");

    this.updateCitySelector();
  }

  updateCitySelector() {
    const citySelect = this.dom.selectCity;
    citySelect.innerHTML = this.selectedRegion.cities.map(c => `
      <option value="${esc(c.name)}" ${c.name === this.selectedCity.name ? "selected" : ""}>
        ${esc(c.name)}
      </option>
    `).join("");
  }

  setHierarchyLocation() {
    this.locationLabel = { region: this.selectedRegion.name, country: this.selectedCountry.name };
  }

  bindEventListeners() {
    // Geo Hierarchy change events
    this.dom.selectCountry.addEventListener("change", (e) => {
      const foundCountry = geoHierarchy.find(c => c.code === e.target.value);
      if (foundCountry) {
        this.selectedCountry = foundCountry;
        this.selectedRegion = foundCountry.regions[0];
        this.selectedCity = this.selectedRegion.cities[0];
        this.setHierarchyLocation();
        this.updateRegionSelector();
        this.loadWeatherForCurrentLocation();
      }
    });

    this.dom.selectRegion.addEventListener("change", (e) => {
      const foundRegion = this.selectedCountry.regions.find(r => r.name === e.target.value);
      if (foundRegion) {
        this.selectedRegion = foundRegion;
        this.selectedCity = foundRegion.cities[0];
        this.setHierarchyLocation();
        this.updateCitySelector();
        this.loadWeatherForCurrentLocation();
      }
    });

    this.dom.selectCity.addEventListener("change", (e) => {
      const foundCity = this.selectedRegion.cities.find(c => c.name === e.target.value);
      if (foundCity) {
        this.selectedCity = foundCity;
        this.setHierarchyLocation();
        this.loadWeatherForCurrentLocation();
      }
    });

    // Language Selector
    this.dom.selectLanguage.addEventListener("change", (e) => {
      this.currentLang = e.target.value;
      localStorage.setItem("aetheria_lang", this.currentLang);
      this.destroyScenes();
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
        alert(this.t.status.gpsUnsupported);
        return;
      }
      this.dom.btnGps.classList.add("active");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.dom.btnGps.classList.remove("active");
          this.selectedCity = {
            name: this.t.status.myLocation,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            timezone: "auto",
            isGps: true
          };
          this.locationLabel = null;
          this.loadWeatherForCurrentLocation();
        },
        (err) => {
          this.dom.btnGps.classList.remove("active");
          console.warn("GPS error:", err);
          alert(this.t.status.gpsError);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 }
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
        const results = await searchGlobalLocations(val, this.currentLang);
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

    document.getElementById("btnGlobeZoomIn").addEventListener("click", () => {
      if (this.globeScene) this.globeScene.zoomIn();
    });
    document.getElementById("btnGlobeZoomOut").addEventListener("click", () => {
      if (this.globeScene) this.globeScene.zoomOut();
    });

    // Sky Scrubber Range Input
    this.dom.skyHourRange.addEventListener("input", (e) => {
      const h = parseInt(e.target.value, 10);
      this.dom.scrubberHourLabel.textContent = `${h.toString().padStart(2, "0")}:00`;
      if (this.skyScene) this.skyScene.setTimeOfDay(h);
    });
  }

  renderSearchSuggestions(results) {
    if (!results || !results.length) {
      this.dom.suggestionsBox.style.display = "none";
      return;
    }
    this.dom.suggestionsBox.innerHTML = results.map((r, i) => `
      <div class="search-suggestion-item" data-index="${i}">
        <div>
          <div class="location-title">${esc(r.name)}</div>
          <div class="location-meta">${r.region ? esc(r.region) + ", " : ""}${esc(r.country)}</div>
        </div>
        <div class="location-meta">${this.formatCoords(r.lat, r.lon)}</div>
      </div>
    `).join("");

    this.dom.suggestionsBox.style.display = "block";

    this.dom.suggestionsBox.querySelectorAll(".search-suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        const r = results[parseInt(item.dataset.index, 10)];
        this.selectedCity = { name: r.name, lat: r.lat, lon: r.lon, timezone: r.timezone || "auto" };
        this.locationLabel = { region: r.region, country: r.country };
        this.dom.suggestionsBox.style.display = "none";
        this.dom.searchInput.value = `${r.name}, ${r.country}`;
        this.loadWeatherForCurrentLocation();
      });
    });
  }

  cacheKey(lat, lon) {
    return `${CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}`;
  }

  async loadWeatherForCurrentLocation() {
    const { lat, lon } = this.selectedCity;
    const timezone = this.selectedCity.timezone || "auto";
    const requestId = (this.requestId = (this.requestId || 0) + 1);

    if (!this.weatherData) {
      this.dom.dynamicContentHolder.innerHTML = `<div class="glass-panel" style="padding: 24px;">${this.t.status.loading}</div>`;
    }

    let data = null;
    let offline = false;
    try {
      data = await fetchCompleteWeather(lat, lon, timezone);
      try {
        localStorage.setItem(this.cacheKey(lat, lon), JSON.stringify(data));
      } catch (e) {
        // Storage full or unavailable: caching is best effort
      }
    } catch (err) {
      console.warn("Weather fetch failed:", err);
      try {
        const cached = localStorage.getItem(this.cacheKey(lat, lon));
        if (cached) {
          data = JSON.parse(cached);
          offline = true;
        }
      } catch (e) {
        data = null;
      }
    }

    // A newer request was started while this one was in flight
    if (requestId !== this.requestId) return;

    this.isOfflineData = offline;
    this.loadError = !data;
    if (data) this.weatherData = data;

    if (this.loadError) {
      this.weatherData = null;
      this.renderLoadError();
      return;
    }

    if (this.globeScene) this.globeScene.setLocation(lat, lon, this.selectedCity.name);
    if (this.skyScene) this.skyScene.setCondition(this.weatherData.current.meta.skyType, this.weatherData.current.windSpeed);

    this.renderCurrentView();
  }

  renderLoadError() {
    const t = this.t;
    this.dom.alertBannerHolder.innerHTML = "";
    this.dom.statusBannerHolder.innerHTML = "";
    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px; text-align: center;">
        <p style="margin-bottom: 14px;">${t.status.loadError}</p>
        <button id="btnRetryLoad" class="route-calc-btn">${t.status.retry}</button>
      </div>
    `;
    document.getElementById("btnRetryLoad").addEventListener("click", () => this.loadWeatherForCurrentLocation());
  }

  renderStatusBanner() {
    const t = this.t;
    const data = this.weatherData;
    const time = new Date(data.updatedAt).toLocaleTimeString(this.locale, { hour: "2-digit", minute: "2-digit" });
    this.dom.statusBannerHolder.innerHTML = this.isOfflineData ? `
      <div class="alert-banner yellow">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          ${getIconSvg("alert", 20)}
          <span>${t.status.offlineCached} (${t.status.updatedAt} ${time})</span>
          <button id="btnRetryOffline" class="action-btn">${t.status.retry}</button>
        </div>
      </div>
    ` : "";
    const retry = document.getElementById("btnRetryOffline");
    if (retry) retry.addEventListener("click", () => this.loadWeatherForCurrentLocation());
  }

  renderCurrentView() {
    if (this.loadError) {
      this.renderLoadError();
      return;
    }
    if (!this.weatherData) return;

    if (this.currentView === "sky") {
      this.dom.sceneSection.style.display = "block";
      this.dom.globeLayerControls.style.display = "none";
      this.dom.skyScrubberWrap.style.display = "flex";
      this.initOrShowSky();
    } else if (this.currentView === "radar" || this.currentView === "route") {
      this.dom.sceneSection.style.display = "none";
    } else {
      // Dashboard and globe views show the 3D globe
      this.dom.sceneSection.style.display = "block";
      this.dom.globeLayerControls.style.display = "flex";
      this.dom.skyScrubberWrap.style.display = "none";
      this.initOrShowGlobe();
    }

    if (this.currentView !== "radar" && this.windRadar) {
      this.windRadar.destroy();
      this.windRadar = null;
    }

    this.renderStatusBanner();
    this.renderAlertBanner();

    if (this.currentView === "dashboard") this.renderDashboard();
    else if (this.currentView === "globe") this.renderInfoPanel("globe");
    else if (this.currentView === "sky") this.renderInfoPanel("sky");
    else if (this.currentView === "radar") this.renderWindSeaView();
    else if (this.currentView === "route") this.renderRoutePlannerView();
  }

  destroyScenes() {
    if (this.globeScene) {
      this.globeScene.destroy();
      this.globeScene = null;
    }
    if (this.skyScene) {
      this.skyScene.destroy();
      this.skyScene = null;
    }
    if (this.windRadar) {
      this.windRadar.destroy();
      this.windRadar = null;
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
    this.skyScene.setCondition(this.weatherData.current.meta.skyType, this.weatherData.current.windSpeed);
  }

  formatTemp(celsius) {
    if (celsius == null) return "–";
    if (this.currentUnit === "F") return `${Math.round(celsius * 9 / 5 + 32)}°F`;
    return `${Math.round(celsius)}°C`;
  }

  formatTempDelta(deltaC) {
    const v = this.currentUnit === "F" ? deltaC * 9 / 5 : deltaC;
    return `${Math.abs(Math.round(v * 10) / 10)}°`;
  }

  formatCoords(lat, lon) {
    return `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
  }

  formatDayName(dateStr, index) {
    if (index === 0) return this.t.daily.today;
    if (index === 1) return this.t.daily.tomorrow;
    // Noon avoids the date shifting across time zones
    return new Date(`${dateStr}T12:00:00`).toLocaleDateString(this.locale, { weekday: "short" });
  }

  formatShortDate(dateStr) {
    return new Date(`${dateStr}T12:00:00`).toLocaleDateString(this.locale, { day: "numeric", month: "short" });
  }

  renderAlertBanner() {
    const alert = this.weatherData.alert;
    const t = this.t;
    if (!alert) {
      this.dom.alertBannerHolder.innerHTML = "";
      return;
    }
    const reasons = alert.reasons.map(r => t.alerts.reasons[r]).join(", ");
    this.dom.alertBannerHolder.innerHTML = `
      <div class="alert-banner ${alert.severity}">
        <div style="display: flex; align-items: center; gap: 12px;">
          ${getIconSvg("alert", 24)}
          <div>
            <strong>${t.alerts[alert.titleKey]}${reasons ? ": " + reasons : ""}</strong>
            <p style="font-size: 0.84rem; opacity: 0.9;">
              ${t.alerts.maxGust}: ${alert.maxGust} km/h · ${t.alerts.totalRain}: ${alert.totalRain} mm
            </p>
            <p style="font-size: 0.76rem; opacity: 0.8; margin-top: 4px;">${t.alerts.notOfficial}</p>
          </div>
        </div>
      </div>
    `;
  }

  renderNowcastCard(data, t) {
    const nc = data.nowcast;
    if (!nc) {
      return `
        <div class="glass-panel minutecast-card">
          <div class="card-title">${getIconSvg("droplets", 20)}<span>${t.minuteCast.title}</span></div>
          <div class="card-subtitle">${t.minuteCast.unavailable}</div>
        </div>
      `;
    }
    const maxMm = Math.max(2, ...nc.timeline.map(s => s.mm));
    const status = t.minuteCast[nc.statusKey] || "";
    const target = nc.targetMinute != null ? ` ${nc.targetMinute} ${t.minuteCast.minutes}` : "";
    return `
      <div class="glass-panel minutecast-card">
        <div class="card-header-row">
          <div>
            <div class="card-title">
              ${getIconSvg("droplets", 20)}
              <span>${t.minuteCast.title}</span>
            </div>
            <div class="card-subtitle">${t.minuteCast.subtitle}</div>
          </div>
          <div style="font-size: 0.88rem; font-weight: 600; color: var(--accent-cyan);">${status}${target}</div>
        </div>

        <div class="minutecast-timeline-container">
          ${nc.timeline.map(s => {
            const ratio = s.mm / maxMm;
            let cls = "light";
            if (s.mm >= 0.5) cls = "mod";
            if (s.mm >= 2) cls = "heavy";
            if (s.mm >= 5) cls = "extreme";
            return `<div class="minutecast-bar ${cls}" style="height: ${Math.max(4, ratio * 75)}px;" title="${s.time.slice(11, 16)}: ${s.mm} mm"></div>`;
          }).join("")}
        </div>
        <div class="minutecast-labels">
          ${nc.timeline.filter((_, i) => i % 2 === 0).map(s => `<span>${s.time.slice(11, 16)}</span>`).join("")}
        </div>
      </div>
    `;
  }

  renderModelsCard(data, t) {
    const m = data.models;
    if (!m) return "";
    return `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div>
            <div class="card-title">
              ${getIconSvg("cpu", 20)}
              <span>${t.models.title}</span>
            </div>
            <div class="card-subtitle">${t.models.subtitle}</div>
          </div>
          <div style="font-size: 0.82rem; font-weight: 700; color: ${m.agreementKey === "agreementHigh" ? "var(--accent-emerald)" : m.agreementKey === "agreementMedium" ? "var(--accent-amber)" : "var(--accent-rose)"};">
            ${t.models.agreement}: ${t.models[m.agreementKey]}
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="models-table">
            <thead>
              <tr>
                <th>${t.models.colModel}</th>
                <th>${t.models.colResolution}</th>
                <th>${t.models.colMaxMin}</th>
                <th>${t.models.colRain}</th>
                <th>${t.models.colWind}</th>
              </tr>
            </thead>
            <tbody>
              ${m.models.map(row => `
                <tr>
                  <td><strong>${row.name}</strong> <span style="color: var(--text-muted); font-size: 0.72rem;">${row.origin}</span></td>
                  <td><span style="color: var(--text-muted); font-size: 0.78rem;">${row.resolution}</span></td>
                  <td class="temp-cell">${this.formatTemp(row.tempMax)} / ${this.formatTemp(row.tempMin)}</td>
                  <td>${row.rainMm != null ? row.rainMm + " mm" : "–"}</td>
                  <td>${row.wind != null ? row.wind + " km/h" : "–"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 14px; font-size: 0.8rem; color: var(--text-secondary); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <span>${t.models.consensus}: <strong>${this.formatTemp(m.consensusTemp)}</strong></span>
          <span>${t.models.spread}: ±${this.formatTempDelta(m.spread)}</span>
        </div>
      </div>
    `;
  }

  renderHealthCard(data, t) {
    const b = data.biometeo;
    const curr = data.current;
    const pollen = data.airQuality ? data.airQuality.pollen : null;
    const levelColor = { low: "var(--accent-emerald)", medium: "var(--accent-amber)", high: "var(--accent-rose)", veryHigh: "var(--accent-rose)" };
    const pollenScale = { low: 15, medium: 45, high: 75, veryHigh: 100 };

    return `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div>
            <div class="card-title">
              ${getIconSvg("shield", 20)}
              <span>${t.biometeo.title}</span>
            </div>
            <div class="card-subtitle">${t.biometeo.subtitle}</div>
          </div>
        </div>

        <div class="biometeo-metrics-grid">
          <div class="biometeo-box">
            <span class="title">${t.biometeo.headacheAlert}</span>
            <span class="status" style="color: ${b.headacheLevel === 3 ? "var(--accent-rose)" : b.headacheLevel === 2 ? "var(--accent-amber)" : "var(--accent-emerald)"}">
              ${t.biometeo[b.headacheRisk]}
            </span>
            <span class="desc">ΔP 3h: ${b.deltaPressure} hPa</span>
          </div>

          <div class="biometeo-box">
            <span class="title">${t.biometeo.maxSunExposure}</span>
            ${b.safeSunTimes.typeIII != null ? `
              <span class="status" style="color: var(--accent-cyan); font-family: var(--font-mono);">~${b.safeSunTimes.typeIII} ${t.biometeo.sunMinutes}</span>
              <span class="desc">${t.biometeo.skinTypeIII} · UV ${curr.uvIndex}</span>
            ` : `<span class="status" style="color: var(--accent-emerald);">${t.biometeo.noUv}</span>`}
          </div>
        </div>

        <div class="pollen-meter-wrap">
          <div style="font-weight: 600; font-size: 0.85rem; margin-top: 6px;">${t.biometeo.pollenTitle}</div>
          ${pollen ? Object.entries(pollen).filter(([, v]) => v != null).map(([type, value]) => {
            const level = pollenLevel(type, value);
            return `
              <div class="pollen-bar-item">
                <span>${t.biometeo.pollenNames[type]}</span>
                <div class="pollen-track"><div class="pollen-fill" style="width: ${pollenScale[level]}%; background: ${levelColor[level]};"></div></div>
                <span style="font-size: 0.72rem; color: var(--text-muted); min-width: 90px; text-align: end;">${t.biometeo.pollenLevels[level]} · ${value}</span>
              </div>
            `;
          }).join("") : `<div class="card-subtitle">${t.biometeo.pollenUnavailable}</div>`}
        </div>
      </div>
    `;
  }

  renderAirQualityCard(data, t) {
    const a = data.airQuality;
    if (!a) {
      return `
        <div class="glass-panel" style="padding: 24px;">
          <div class="card-title">${getIconSvg("gauge", 20)}<span>${t.aqi.title}</span></div>
          <p class="card-subtitle" style="margin-top: 8px;">${t.aqi.noData}</p>
        </div>
      `;
    }
    const band = aqiBand(a.europeanAqi, a.usAqi);
    const bandColor = { good: "var(--accent-emerald)", fair: "var(--accent-emerald)", moderate: "var(--accent-amber)", poor: "var(--accent-rose)", veryPoor: "var(--accent-rose)", hazardous: "var(--accent-rose)" }[band];
    const pill = (label, value) => `
      <div class="metric-pill">
        <span class="label">${label}</span>
        <span class="val">${value != null ? value + " µg/m³" : "–"}</span>
      </div>
    `;
    return `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("gauge", 20)}
            <span>${t.aqi.title}</span>
          </div>
          <span style="font-size: 0.85rem; font-weight: 700; color: ${bandColor};">
            ${band ? t.aqi[band] : ""}${a.europeanAqi != null ? ` · EAQI ${a.europeanAqi}` : ""}${a.usAqi != null ? ` · US AQI ${a.usAqi}` : ""}
          </span>
        </div>

        <div class="aqi-pills-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-top: 10px;">
          ${pill("PM 2.5", a.pm25)}
          ${pill("PM 10", a.pm10)}
          ${pill(t.aqi.pollutants.o3, a.o3)}
          ${pill(t.aqi.pollutants.no2, a.no2)}
          ${pill(t.aqi.pollutants.so2, a.so2)}
          ${pill(t.aqi.pollutants.co, a.co)}
        </div>
        ${band ? `
          <p style="margin-top: 14px; font-size: 0.82rem; color: var(--text-secondary);">
            <strong>${t.aqi.healthAdvice}:</strong> ${t.aqi.advice[band]}
          </p>
        ` : ""}
      </div>
    `;
  }

  renderDashboard() {
    const data = this.weatherData;
    const curr = data.current;
    const t = this.t;
    const conditionName = t.conditions[curr.meta.key] || curr.meta.key;
    const label = this.locationLabel ? [this.locationLabel.region, this.locationLabel.country].filter(Boolean).join(", ") : "";
    const updated = new Date(data.updatedAt).toLocaleTimeString(this.locale, { hour: "2-digit", minute: "2-digit" });

    let comparisonHtml = "";
    if (data.comparison) {
      const d = data.comparison.vsYesterdayTemp;
      const word = Math.abs(d) < 0.5 ? t.comparison.same : `${this.formatTempDelta(d)} ${d > 0 ? t.comparison.warmer : t.comparison.colder}`;
      comparisonHtml = `<span style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${t.comparison.vsYesterday}: <strong>${word}</strong></span>`;
    }

    // 14-day temperature scale for the range bars
    const allMin = Math.min(...data.daily.map(d => d.tempMin));
    const allMax = Math.max(...data.daily.map(d => d.tempMax));
    const span = Math.max(1, allMax - allMin);

    this.dom.dynamicContentHolder.innerHTML = `
      <!-- Hero Weather Summary Card -->
      <div class="glass-panel hero-weather-card">
        <div class="hero-main-stats">
          <div class="hero-location-badge">
            ${getIconSvg("mapPin", 24, "text-cyan")}
            <span>${esc(this.selectedCity.name)}</span>
            <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 500;">${esc(label)}</span>
          </div>
          <div class="hero-coords-text">
            ${this.formatCoords(data.coordinates.lat, data.coordinates.lon)} · ${t.geo.elevation}: ${data.coordinates.elevation} m · ${t.status.updatedAt} ${updated}
          </div>

          <div class="hero-temp-row">
            <div class="hero-temp-value">${this.formatTemp(curr.temp)}</div>
            <div class="hero-condition-summary">
              <div style="display: flex; align-items: center; gap: 8px;">
                ${getIconSvg(curr.meta.icon, 28)}
                <span class="hero-condition-text">${conditionName}</span>
              </div>
              <span class="hero-feels-text">
                ${t.current.feelsLike}: <strong>${this.formatTemp(curr.feelsLike)}</strong>
              </span>
              <span style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                ${t.current.highLow}: ${this.formatTemp(curr.tempMax)} / ${this.formatTemp(curr.tempMin)}
              </span>
              ${comparisonHtml}
            </div>
          </div>
        </div>

        <div class="hero-metrics-pill-grid">
          <div class="metric-pill"><span class="label">${t.current.humidity}</span><span class="val">${curr.humidity}%</span></div>
          <div class="metric-pill"><span class="label">${t.current.wind}</span><span class="val">${curr.windSpeed} km/h ${this.getCompassDir(curr.windDirection)}</span></div>
          <div class="metric-pill"><span class="label">${t.current.windGusts}</span><span class="val">${curr.windGusts} km/h</span></div>
          <div class="metric-pill"><span class="label">${t.current.pressure}</span><span class="val">${curr.pressure} hPa</span></div>
          <div class="metric-pill"><span class="label">${t.current.uvIndex}</span><span class="val">${curr.uvIndex}</span></div>
          <div class="metric-pill"><span class="label">${t.current.dewPoint}</span><span class="val">${this.formatTemp(curr.dewPoint)}</span></div>
          <div class="metric-pill"><span class="label">${t.current.cloudCover}</span><span class="val">${curr.cloudCover}%</span></div>
          <div class="metric-pill"><span class="label">${t.current.visibility}</span><span class="val">${curr.visibility != null ? curr.visibility + " km" : "–"}</span></div>
        </div>
      </div>

      ${this.renderNowcastCard(data, t)}

      <!-- 48-Hour Hourly Forecast -->
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
              <span class="time">${i === 0 ? t.hourly.now : String(h.hour).padStart(2, "0") + ":00"}</span>
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

      <!-- Meteogram -->
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("activity", 20)}
            <span>${t.meteogram.title}</span>
          </div>
          <span class="card-subtitle">${t.meteogram.subtitle}</span>
        </div>
        <div style="overflow-x: auto;">
          ${renderMeteogramSvg(data.hourly, this.currentUnit === "F")}
        </div>
      </div>

      <div class="deep-analytics-grid">
        ${this.renderModelsCard(data, t)}
        ${this.renderHealthCard(data, t)}
      </div>

      <div class="deep-analytics-grid">
        ${this.renderAirQualityCard(data, t)}

        <!-- Lifestyle & Outfit -->
        <div class="glass-panel" style="padding: 24px;">
          <div class="card-header-row">
            <div class="card-title">
              ${getIconSvg("shirt", 20)}
              <span>${t.lifestyle.title}</span>
            </div>
          </div>

          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 6px;">
            <strong>${t.lifestyle.outfitTitle}</strong>
          </div>
          <div class="outfit-recommendations">
            ${data.lifestyle.outfit.map(item => `
              <div class="outfit-chip">
                ${getIconSvg(item.icon, 16)}
                <span>${t.lifestyle.outfit[item.textKey]}</span>
              </div>
            `).join("")}
          </div>

          <div class="activity-scores-grid">
            <div class="activity-tile"><span class="score">${data.lifestyle.laundry}%</span><span class="name">${t.lifestyle.laundry}</span></div>
            <div class="activity-tile"><span class="score">${data.lifestyle.running}%</span><span class="name">${t.lifestyle.running}</span></div>
            <div class="activity-tile"><span class="score">${data.lifestyle.carWash}%</span><span class="name">${t.lifestyle.carWash}</span></div>
            <div class="activity-tile"><span class="score">${data.lifestyle.stargazing}%</span><span class="name">${t.lifestyle.stargazing}</span></div>
            <div class="activity-tile"><span class="score">${data.lifestyle.bbq}%</span><span class="name">${t.lifestyle.bbq}</span></div>
            <div class="activity-tile"><span class="score">${data.sunMoon.illumination}%</span><span class="name">${t.sunMoon.moonPhase}: ${t.sunMoon.moonPhases[data.sunMoon.moonPhase]}</span></div>
          </div>
          ${data.sunMoon.sunrise ? `
            <div style="margin-top: 12px; font-size: 0.82rem; color: var(--text-secondary); display: flex; gap: 16px; flex-wrap: wrap;">
              <span>${t.sunMoon.sunrise}: <strong>${data.sunMoon.sunrise}</strong></span>
              <span>${t.sunMoon.sunset}: <strong>${data.sunMoon.sunset}</strong></span>
              ${data.sunMoon.daylightHours != null ? `<span>${t.sunMoon.daylight}: <strong>${data.sunMoon.daylightHours} h</strong></span>` : ""}
            </div>
          ` : ""}
        </div>
      </div>

      <!-- 14-Day Forecast -->
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("sun", 20)}
            <span>${t.daily.title}</span>
          </div>
        </div>

        <div class="daily-forecast-grid">
          ${data.daily.map((d, i) => `
            <div class="daily-item-card">
              <div class="daily-header">
                <div>
                  <div class="daily-dayname">${this.formatDayName(d.date, i)}</div>
                  <div class="daily-date">${this.formatShortDate(d.date)}</div>
                </div>
                ${getIconSvg(d.meta.icon, 28)}
              </div>

              <div class="daily-temp-bar-wrap">
                <span style="color: #38bdf8;">${this.formatTemp(d.tempMin)}</span>
                <div class="daily-temp-bar">
                  <div class="daily-temp-fill" style="inset-inline-start: ${((d.tempMin - allMin) / span) * 100}%; width: ${Math.max(4, ((d.tempMax - d.tempMin) / span) * 100)}%;"></div>
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

    // Hourly card click scrubs the 3D sky
    document.querySelectorAll(".hourly-item-box").forEach(el => {
      el.addEventListener("click", () => {
        const h = parseInt(el.dataset.hour, 10);
        this.dom.skyHourRange.value = h;
        this.dom.scrubberHourLabel.textContent = `${h.toString().padStart(2, "0")}:00`;
        const skyTab = document.querySelector('[data-view="sky"]');
        if (skyTab) skyTab.click();
        if (this.skyScene) this.skyScene.setTimeOfDay(h);
      });
    });
  }

  renderInfoPanel(kind) {
    const t = this.t;
    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-title">
          ${getIconSvg(kind === "globe" ? "globe" : "sun", 24)}
          <span>${kind === "globe" ? t.info.globeTitle : t.info.skyTitle}</span>
        </div>
        <p style="color: var(--text-secondary); margin-top: 8px; font-size: 0.9rem;">
          ${kind === "globe" ? t.info.globeText : t.info.skyText}
        </p>
      </div>
    `;
  }

  renderWindSeaView() {
    const t = this.t;
    const curr = this.weatherData.current;
    const marine = this.weatherData.marine;
    const beaufort = this.toBeaufort(curr.windSpeed);

    this.dom.dynamicContentHolder.innerHTML = `
      <div class="glass-panel" style="padding: 24px;">
        <div class="card-header-row">
          <div class="card-title">
            ${getIconSvg("wind", 24)}
            <span>${t.windSea.title} – ${esc(this.selectedCity.name)}</span>
          </div>
          <span class="card-subtitle">${t.windSea.animationNote}</span>
        </div>

        <div style="height: 320px; position: relative; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-glass);">
          <canvas id="windRadarCanvas" style="width: 100%; height: 100%; display: block;"></canvas>
        </div>

        <div style="margin-top: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
          <div class="metric-pill"><span class="label">${t.windSea.currentWind}</span><span class="val">${curr.windSpeed} km/h</span></div>
          <div class="metric-pill"><span class="label">${t.current.windGusts}</span><span class="val">${curr.windGusts} km/h</span></div>
          <div class="metric-pill"><span class="label">${t.windSea.direction}</span><span class="val">${curr.windDirection}° (${this.getCompassDir(curr.windDirection)})</span></div>
          <div class="metric-pill"><span class="label">${t.windSea.beaufort}</span><span class="val">${t.windSea.force} ${beaufort}</span></div>
          ${marine ? `
            <div class="metric-pill"><span class="label">${t.windSea.waveHeight}</span><span class="val">${marine.waveHeight} m</span></div>
            ${marine.wavePeriod != null ? `<div class="metric-pill"><span class="label">${t.windSea.wavePeriod}</span><span class="val">${marine.wavePeriod} s</span></div>` : ""}
            ${marine.seaTemp != null ? `<div class="metric-pill"><span class="label">${t.windSea.seaTemp}</span><span class="val">${this.formatTemp(marine.seaTemp)}</span></div>` : ""}
          ` : ""}
        </div>
        ${marine ? "" : `<p class="card-subtitle" style="margin-top: 12px;">${t.windSea.noMarine}</p>`}
      </div>
    `;

    const canvas = document.getElementById("windRadarCanvas");
    if (this.windRadar) this.windRadar.destroy();
    this.windRadar = new WindRadarCanvas(canvas);
    this.windRadar.setMode("wind");
    this.windRadar.setWind(curr.windSpeed, curr.windDirection);
  }

  getCompassDir(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  }

  toBeaufort(kmh) {
    const limits = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
    const idx = limits.findIndex(l => kmh < l);
    return idx === -1 ? 12 : idx;
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

        <form class="route-planner-box" id="routeForm">
          <input type="text" id="routeOriginInput" class="route-input" placeholder="${esc(t.route.originPlaceholder)}" value="${esc(this.routeOrigin || "")}" required />
          <input type="text" id="routeDestInput" class="route-input" placeholder="${esc(t.route.destPlaceholder)}" value="${esc(this.routeDest || "")}" required />
          <button type="submit" id="btnCalcRoute" class="route-calc-btn">${t.routeWeather.calcRoute}</button>
        </form>

        <div id="routeResultsHolder" style="margin-top: 24px;"></div>
      </div>
    `;

    document.getElementById("routeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.routeOrigin = document.getElementById("routeOriginInput").value.trim();
      this.routeDest = document.getElementById("routeDestInput").value.trim();
      this.calculateRouteWeather();
    });

    if (this.lastRouteResult) this.renderRouteResult(this.lastRouteResult);
  }

  async calculateRouteWeather() {
    const t = this.t;
    const holder = document.getElementById("routeResultsHolder");
    holder.innerHTML = `<p class="card-subtitle">${t.route.calculating}</p>`;

    try {
      const [origins, dests] = await Promise.all([
        searchGlobalLocations(this.routeOrigin, this.currentLang),
        searchGlobalLocations(this.routeDest, this.currentLang)
      ]);
      if (!origins.length) throw { notFound: this.routeOrigin };
      if (!dests.length) throw { notFound: this.routeDest };
      const a = origins[0];
      const b = dests[0];

      // 5 points along the great circle between the two places
      const points = [0, 0.25, 0.5, 0.75, 1].map(f => ({ ...this.interpolateGreatCircle(a, b, f), fraction: f }));
      const weather = await fetchPointsWeather(points);
      const distanceKm = Math.round(this.haversineKm(a, b));

      this.lastRouteResult = { a, b, points, weather, distanceKm };
      this.renderRouteResult(this.lastRouteResult);
    } catch (err) {
      console.warn("Route weather error:", err);
      holder.innerHTML = `<p style="color: var(--accent-rose);">${err && err.notFound ? `${t.route.notFound} ${esc(err.notFound)}` : t.route.error}</p>`;
    }
  }

  renderRouteResult({ a, b, points, weather, distanceKm }) {
    const t = this.t;
    const holder = document.getElementById("routeResultsHolder");
    if (!holder) return;

    const titleFor = (i) => {
      if (i === 0) return { label: t.route.start, name: `${a.name}${a.region ? " (" + a.region + ")" : ""}` };
      if (i === points.length - 1) return { label: t.route.end, name: `${b.name}${b.region ? " (" + b.region + ")" : ""}` };
      return { label: `${t.route.waypoint} · ${Math.round(distanceKm * points[i].fraction)} km`, name: this.formatCoords(points[i].lat, points[i].lon) };
    };

    const advice = [];
    const skyTypes = weather.map(w => w.meta.skyType);
    if (skyTypes.includes("thunderstorm")) advice.push(t.route.advice.storm);
    if (skyTypes.includes("snow")) advice.push(t.route.advice.snow);
    if (skyTypes.includes("rain")) advice.push(t.route.advice.rain);
    if (skyTypes.includes("fog") || weather.some(w => w.visibilityKm != null && w.visibilityKm < 2)) advice.push(t.route.advice.fog);
    if (weather.some(w => w.windGusts > 60)) advice.push(t.route.advice.wind);
    if (!advice.length) advice.push(t.route.advice.good);

    holder.innerHTML = `
      <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">${t.routeWeather.checkPoints} · ${distanceKm} km</div>
      <p class="card-subtitle" style="margin-bottom: 12px;">${t.route.straightLineNote}</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px;">
        ${weather.map((w, i) => {
          const head = titleFor(i);
          return `
            <div class="glass-panel" style="padding: 16px;">
              <div style="font-size: 0.8rem; color: var(--text-muted);">${esc(head.label)}</div>
              <strong style="font-size: 1rem;">${esc(head.name)}</strong>
              <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px; font-size: 1.2rem; font-weight: 700; color: var(--accent-cyan);">
                ${getIconSvg(w.meta.icon, 22)} ${this.formatTemp(w.temp)}
              </div>
              <div style="font-size: 0.82rem; margin-top: 2px;">${t.conditions[w.meta.key] || ""}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 4px;">
                ${t.current.wind}: ${w.windSpeed} km/h · ${t.current.windGusts} ${w.windGusts} km/h
                ${w.visibilityKm != null ? `<br>${t.route.visibility}: ${w.visibilityKm} km` : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="margin-top: 18px; padding: 14px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: var(--radius-md); font-size: 0.86rem;">
        <strong>${t.routeWeather.routeAdvice}:</strong> ${advice.join(" ")}
      </div>
    `;
  }

  interpolateGreatCircle(a, b, f) {
    const toRad = (d) => d * Math.PI / 180;
    const toDeg = (r) => r * 180 / Math.PI;
    const lat1 = toRad(a.lat), lon1 = toRad(a.lon), lat2 = toRad(b.lat), lon2 = toRad(b.lon);
    const d = 2 * Math.asin(Math.sqrt(Math.sin((lat2 - lat1) / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2));
    if (d === 0) return { lat: a.lat, lon: a.lon };
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    return { lat: toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), lon: toDeg(Math.atan2(y, x)) };
  }

  haversineKm(a, b) {
    const toRad = (d) => d * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(h));
  }
}

// Initialize Application when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const app = new AetheriaApp();
  app.init();
});
