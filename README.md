# AETHERIA 3D 🌍⛅

> **Piattaforma meteorologica globale di nuova generazione con globo 3D interattivo, simulatore atmosferico cielo, MinuteCast, confronto supercomputer ECMWF/GFS, qualità dell'aria e bio-meteo.**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Funzionalità Principali

### 1. 🌍 Distribuzione Globale & Navigazione Territoriale
- **Albero Geografico Gerarchico**: Navigazione a cascata **Paese $\rightarrow$ Regione / Stato $\rightarrow$ Città / Località** (Italia, Francia, Spagna, Germania, USA, Giappone, Cina, Brasile, Australia, Svizzera, UAE, ecc.).
- **Geocoding Globale Istantaneo**: Ricerca su oltre 200.000 località mondiali tramite Open-Meteo Geocoding.
- **Geolocalizzazione GPS**: Rilevamento istantaneo della posizione con un solo clic.

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
- **Globo Terrestre 3D Interattivo**:
  - Shader atmosferico con scattering di **Rayleigh** (bagliore celeste/ambra).
  - Ciclo giorno/notte dinamico con mappe delle luci notturne delle città.
  - Nuvole volumetriche 3D rotanti.
  - Layer selezionabili: **Satellite**, **Heatmap** termica, **Jet Stream** (corrente a getto) e **Radar**.
  - Transizioni di volo camera (*Fly-To*) morbide con puntatore radar pulsante sulla città selezionata.
- **Simulatore Cielo & Atmosfera 3D**:
  - Volta celeste con scattering solare e skyline montuoso all'orizzonte.
  - Simulazione orbita del Sole e della Luna con fasi lunari realistiche.
  - Slider orario 24h interattivo (dall'alba al tramonto Golden Hour fino alla notte stellata).
  - Sistemi particellari dinamici per **pioggia** (con angolo del vento e riflessi sull'asfalto), **neve**, **nebbia** e **lampi temporaleschi**.

### 4. 🏆 Integrazione Funzioni Top-Tier Weather App
- **AccuWeather MinuteCast®**: Precipitazioni minuto per minuto sui 120 minuti con barre di intensità e stima inizio/cessazione.
- **RealFeel® & RealFeel Shade**: Temperatura percepita al sole e all'ombra.
- **Windy & Ventusky Streamlines**: Flussi vettoriali del vento animati, nodi, scala Beaufort e moto ondoso marino.
- **Confronto Multi-Modello Supercomputer**: Analisi comparativa tra **ECMWF IFS (Europa)**, **GFS NOAA (USA)**, **ICON DWD (Germania)** e **MeteoBlue NEMS (Svizzera)** con indice di consenso e dispersione termica.
- **Yr.no Meteogramma HD**: Curve continue di temperatura, punto di rugiada, pressione e precipitazioni.
- **Weather Underground PWS**: Rete stazioni meteo personali, altitudine e confronto climatico con la media trentennale.

### 5. 💡 Bio-Meteo & Bisogni Reali degli Utenti
- **"Cosa mi metto oggi?" (Smart AI Outfit Advisor)**: Consigli su abbigliamento, accessori e protezione termica/pioggia.
- **Allarme Emicrania Barometrica**: Monitoraggio rapido del calo di pressione ($\Delta P > 3\text{ hPa}/3\text{h}$) per soggetti meteopatici.
- **Tempo Massimo Sicuro al Sole**: Calcolato per fototipo cutaneo di Fitzpatrick (I–V) e indice UV attuale.
- **Monitoraggio Pollini & Allergeni**: Graminacee, Betulla, Ambrosia e Olivo.
- **Lifestyle Scores (0–100%)**: Stendere il bucato, Running/Sport, Lavaggio auto, Fotografia Golden Hour, Astronomia, Barbecue.
- **Meteo Percorso / Viaggio**: Analisi delle condizioni climatiche lungo l'itinerario tra partenza, tappe e arrivo.
- **Audio Atmosferico 3D**: Sintesi procedurale tramite Web Audio API per suoni di pioggia, vento e tuoni.

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
- **APIs**: [Open-Meteo](https://open-meteo.com/) (Forecast, Air Quality, Geocoding).
