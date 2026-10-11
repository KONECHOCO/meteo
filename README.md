# AETHERIA 3D 🌍⛅

> **Piattaforma meteorologica globale di nuova generazione con globo 3D interattivo, simulatore atmosferico del cielo, pioggia a 15 minuti, confronto reale tra modelli ECMWF/GFS/ICON, qualità dell'aria e bio-meteo.**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Funzionalità Principali

### 1. 🌍 Distribuzione Globale & Navigazione Territoriale
- **Albero Geografico Gerarchico**: Navigazione a cascata **Paese $\rightarrow$ Regione / Stato $\rightarrow$ Città / Località** (Italia, Francia, Spagna, Germania, USA, Giappone, Cina, Brasile, Australia, Svizzera, UAE, ecc.).
- **225.000 località in 246 paesi** (GeoNames, CC BY 4.0) incluse nell'app: ricerca e menu Paese → Regione → Città funzionano anche offline, con i nomi tradotti nelle 10 lingue per città e regioni principali. Rigenera i dati con `node scripts/build-geo.mjs`.
- **Geolocalizzazione GPS**: meteo del punto esatto con il nome della località più vicina.

### 2. 🗣️ Supporto Multi-Lingue (10 Lingue)
Switch istantaneo senza ricaricamento pagina tra:
- 🇮🇹 **Italiano**
- 🇬🇧 **English**
- 🇪🇸 **Español**
- 🇫🇷 **Français**
- 🇩🇪 **Deutsch**
- 🇯🇵 **日本語**
- 🇨🇳 **中文**
- 🇸🇦 **العربية**
- 🇧🇷 **Português**
- 🇷🇺 **Русский**

### 3. 🎮 Grafica 3D Realistica (WebGL & Three.js a 60 FPS)
- **Globo Terrestre 3D con immagini NASA** (pubblico dominio, NASA GIBS / EOSDIS):
  - **Satellite di oggi**: le nuvole reali del mosaico VIIRS del giorno prima (completo).
  - **Senza nuvole**: Blue Marble con rilievi e fondali; luci delle città (Black Marble) sul lato notturno.
  - Giorno e notte calcolati sulla **posizione reale del Sole**, aggiornata ogni minuto.
  - **Pioggia**: ultima stima satellitare delle precipitazioni (IMERG, ogni 30 minuti, ~8 h di ritardo).
  - Senza connessione usa le immagini incluse nell'app (`public/textures`).
- **Simulatore Cielo & Atmosfera 3D**:
  - Volta celeste con scattering solare e skyline montuoso all'orizzonte.
  - Simulazione orbita del Sole e della Luna con fasi lunari realistiche.
  - Slider orario 24h interattivo (dall'alba al tramonto Golden Hour fino alla notte stellata).
  - Sistemi particellari dinamici per **pioggia** (con angolo del vento e riflessi sull'asfalto), **neve**, **nebbia** e **lampi temporaleschi**.

### 4. 📡 Dati Meteo Reali (nessun valore simulato)
- **Pioggia nelle prossime 2 ore**: previsione a intervalli di 15 minuti (Open-Meteo `minutely_15`).
- **Confronto tra modelli reali**: ECMWF IFS, NOAA GFS, DWD ICON, Météo-France, UK Met Office, con media e grado di accordo.
- **Meteogramma 24 ore**: temperatura, punto di rugiada, pressione e pioggia.
- **Pollini reali** (Europa, dati CAMS): ontano, betulla, graminacee, artemisia, olivo, ambrosia.
- **Vento & Mare**: scala Beaufort, altezza/periodo onde e temperatura del mare (Open-Meteo Marine).
- **Meteo sul percorso**: condizioni attuali in 5 punti tra partenza e arrivo.
- **Confronto con ieri** alla stessa ora e **cache offline** con indicazione dell'ultimo aggiornamento.

---

## 🚀 Avvio Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Compila la build di produzione
npm run build
```

---

## 🛠️ Stack Tecnologico

- **Core**: Vanilla JavaScript (ES Modules), HTML5 Semantic.
- **3D Graphics & WebGL**: [Three.js](https://threejs.org/).
- **Icons**: [Lucide](https://lucide.dev/).
- **CSS Styling**: Vanilla CSS con architettura Dark Glassmorphism, CSS Custom Properties e animazioni responsive.
- **Audio**: Web Audio API (procedural synthesis).
- **APIs**: [Open-Meteo](https://open-meteo.com/) (Forecast, Multi-Model, Air Quality/Pollen, Marine, Geocoding). Dati CC BY 4.0, località GeoNames.

## 🖥️ Server meteo (obbligatorio in produzione)

L'API pubblica di Open-Meteo è solo per uso **non commerciale**. Per la versione negli store l'app usa un
server Open-Meteo proprio (circa 7–10 €/mese, dati CC BY 4.0): istruzioni in [server/README.md](server/README.md).
Poi imposta `VITE_WEATHER_API_BASE` in `.env.production` (vedi `.env.example`).
