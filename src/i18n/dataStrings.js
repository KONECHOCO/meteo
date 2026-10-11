// Strings for the real-data sections (nowcast, model comparison, pollen, marine, route, status).
// Deep-merged into `translations` so every language overrides the old placeholder labels.

export const dataStrings = {
  it: {
    views: { radar: "Vento & Mare" },
    geo: { otherPlaces: "Altre località" },
    minuteCast: {
      title: "Pioggia nelle prossime 2 ore",
      subtitle: "Previsione a intervalli di 15 minuti",
      continuing: "Precipitazioni per almeno 2 ore",
      unavailable: "Previsione a breve termine non disponibile per questa località"
    },
    models: {
      title: "Confronto tra modelli meteo",
      subtitle: "Previsione di oggi secondo i principali centri meteorologici",
      agreement: "Accordo tra modelli",
      agreementHigh: "Alto",
      agreementMedium: "Medio",
      agreementLow: "Basso",
      colModel: "Modello",
      colResolution: "Risoluzione",
      colMaxMin: "Max / Min",
      colRain: "Pioggia",
      colWind: "Vento max",
      consensus: "Media dei modelli",
      spread: "Differenza tra modelli"
    },
    biometeo: {
      title: "Salute e benessere",
      subtitle: "Variazione di pressione, esposizione al sole e pollini",
      headacheAlert: "Sensibilità barometrica",
      headacheHigh: "Variazione rapida di pressione (>3 hPa in 3 ore)",
      maxSunExposure: "Tempo indicativo prima di scottarsi",
      skinTypeIII: "Pelle chiara-media (fototipo III)",
      noUv: "UV assente: nessun rischio di scottature",
      pollenTitle: "Pollini (granuli/m³)",
      pollenNames: { alder: "Ontano", birch: "Betulla", grass: "Graminacee", mugwort: "Artemisia", olive: "Olivo", ragweed: "Ambrosia" },
      pollenLevels: { low: "Basso", medium: "Moderato", high: "Alto", veryHigh: "Molto alto" },
      pollenUnavailable: "Dati sui pollini disponibili solo per l'Europa"
    },
    aqi: {
      title: "Qualità dell'aria",
      noData: "Dati sulla qualità dell'aria non disponibili",
      pollutants: { o3: "Ozono (O₃)", no2: "Biossido di azoto (NO₂)", so2: "Biossido di zolfo (SO₂)", co: "Monossido di carbonio (CO)" },
      advice: {
        good: "Aria pulita: ideale per tutte le attività all'aperto.",
        fair: "Qualità buona: nessuna precauzione particolare.",
        moderate: "Le persone sensibili dovrebbero limitare gli sforzi prolungati all'aperto.",
        poor: "Evita attività sportive intense all'aperto.",
        veryPoor: "Limita il tempo all'aperto, soprattutto bambini, anziani e asmatici.",
        hazardous: "Resta al chiuso il più possibile e tieni le finestre chiuse."
      }
    },
    lifestyle: {
      title: "Attività e abbigliamento",
      outfitTitle: "Cosa mi metto oggi?",
      outfit: {
        umbrellaNeeded: "Porta l'ombrello o un impermeabile",
        heavyCoat: "Cappotto pesante, sciarpa e guanti",
        jacketSweater: "Giacca di mezza stagione e maglione",
        lightLayers: "Strati leggeri: camicia o felpa",
        summerClothes: "Abiti estivi leggeri e traspiranti",
        windbreaker: "Giacca antivento",
        sunglassesUv: "Occhiali da sole e crema solare"
      }
    },
    alerts: {
      notOfficial: "Avviso calcolato dalla previsione delle prossime 24 ore, non è un'allerta ufficiale. Consulta il servizio meteo nazionale.",
      yellowWarning: "Attenzione: fenomeni localmente intensi",
      orangeWarning: "Fenomeni intensi previsti",
      redWarning: "Fenomeni estremi previsti",
      reasons: { thunder: "temporali", gusts: "raffiche forti", heavyRain: "piogge abbondanti", heavySnow: "nevicate intense", fog: "nebbia" },
      maxGust: "Raffica max",
      totalRain: "Pioggia 24 h"
    },
    status: {
      updatedAt: "Aggiornato alle",
      offlineCached: "Connessione assente: stai vedendo i dati dell'ultimo aggiornamento.",
      loadError: "Impossibile caricare il meteo. Controlla la connessione.",
      retry: "Riprova",
      loading: "Caricamento del meteo…",
      myLocation: "La mia posizione",
      gpsUnsupported: "La geolocalizzazione non è supportata da questo dispositivo.",
      gpsError: "Impossibile rilevare la posizione. Cerca una città manualmente.",
      dataSource: "Dati meteo: Open-Meteo.com (CC BY 4.0) · Città: GeoNames"
    },
    comparison: { vsYesterday: "Rispetto a ieri alla stessa ora", warmer: "più caldo", colder: "più freddo", same: "come ieri" },
    meteogram: { title: "Meteogramma 24 ore", subtitle: "Temperatura, punto di rugiada, pressione e pioggia" },
    windSea: {
      title: "Vento e mare",
      currentWind: "Vento attuale",
      direction: "Direzione",
      beaufort: "Scala Beaufort",
      force: "Forza",
      waveHeight: "Altezza onde",
      wavePeriod: "Periodo onde",
      seaTemp: "Temperatura del mare",
      noMarine: "Nessun dato marino: località lontana dal mare.",
      animationNote: "Animazione basata su velocità e direzione del vento attuali in questa località."
    },
    route: {
      originPlaceholder: "Città di partenza",
      destPlaceholder: "Città di arrivo",
      start: "Partenza",
      end: "Arrivo",
      waypoint: "Punto intermedio",
      calculating: "Calcolo in corso…",
      notFound: "Località non trovata:",
      error: "Impossibile calcolare il meteo del percorso.",
      straightLineNote: "Condizioni attuali in 5 punti lungo la linea diretta tra le due città (non il percorso stradale).",
      visibility: "Visibilità",
      advice: {
        good: "Nessun fenomeno significativo lungo il tragitto.",
        rain: "Pioggia in alcuni tratti: riduci la velocità e aumenta la distanza di sicurezza.",
        snow: "Neve lungo il tragitto: verifica gli obblighi di catene o pneumatici invernali.",
        storm: "Temporali lungo il tragitto: valuta di rimandare la partenza.",
        wind: "Raffiche forti: attenzione con veicoli alti e sui viadotti.",
        fog: "Visibilità ridotta per nebbia in alcuni tratti."
      }
    },
    info: {
      globeTitle: "Globo 3D",
      globeText: "Trascina per ruotare il globo e usa la rotella o i pulsanti + e − per lo zoom. Il segnaposto indica la località selezionata.",
      skyTitle: "Simulatore del cielo",
      skyText: "Usa il cursore per vedere il cielo nelle diverse ore del giorno, con le condizioni meteo attuali della località."
    }
  },

  en: {
    views: { radar: "Wind & Sea" },
    geo: { otherPlaces: "Other places" },
    minuteCast: {
      title: "Rain in the next 2 hours",
      subtitle: "Forecast in 15-minute steps",
      continuing: "Precipitation for at least 2 hours",
      unavailable: "Short-term forecast not available for this location"
    },
    models: {
      title: "Weather model comparison",
      subtitle: "Today's forecast from the main weather centres",
      agreement: "Model agreement",
      agreementHigh: "High",
      agreementMedium: "Medium",
      agreementLow: "Low",
      colModel: "Model",
      colResolution: "Resolution",
      colMaxMin: "High / Low",
      colRain: "Rain",
      colWind: "Max wind",
      consensus: "Model average",
      spread: "Model spread"
    },
    biometeo: {
      title: "Health & wellbeing",
      subtitle: "Pressure changes, sun exposure and pollen",
      headacheAlert: "Barometric sensitivity",
      headacheHigh: "Rapid pressure change (>3 hPa in 3 hours)",
      maxSunExposure: "Approximate time to sunburn",
      skinTypeIII: "Light-medium skin (type III)",
      noUv: "No UV: no sunburn risk",
      pollenTitle: "Pollen (grains/m³)",
      pollenNames: { alder: "Alder", birch: "Birch", grass: "Grass", mugwort: "Mugwort", olive: "Olive", ragweed: "Ragweed" },
      pollenLevels: { low: "Low", medium: "Moderate", high: "High", veryHigh: "Very high" },
      pollenUnavailable: "Pollen data is only available for Europe"
    },
    aqi: {
      title: "Air quality",
      noData: "Air quality data not available",
      pollutants: { o3: "Ozone (O₃)", no2: "Nitrogen dioxide (NO₂)", so2: "Sulphur dioxide (SO₂)", co: "Carbon monoxide (CO)" },
      advice: {
        good: "Clean air: ideal for all outdoor activities.",
        fair: "Good air quality: no special precautions.",
        moderate: "Sensitive people should limit prolonged outdoor exertion.",
        poor: "Avoid intense outdoor exercise.",
        veryPoor: "Limit time outdoors, especially children, the elderly and people with asthma.",
        hazardous: "Stay indoors as much as possible and keep windows closed."
      }
    },
    lifestyle: {
      title: "Activities & clothing",
      outfitTitle: "What should I wear today?",
      outfit: {
        umbrellaNeeded: "Take an umbrella or a raincoat",
        heavyCoat: "Heavy coat, scarf and gloves",
        jacketSweater: "Light jacket and a sweater",
        lightLayers: "Light layers: shirt or hoodie",
        summerClothes: "Light, breathable summer clothes",
        windbreaker: "Windproof jacket",
        sunglassesUv: "Sunglasses and sunscreen"
      }
    },
    alerts: {
      notOfficial: "Notice computed from the next 24 hours of forecast, not an official warning. Check your national weather service.",
      yellowWarning: "Caution: locally intense weather",
      orangeWarning: "Severe weather expected",
      redWarning: "Extreme weather expected",
      reasons: { thunder: "thunderstorms", gusts: "strong gusts", heavyRain: "heavy rain", heavySnow: "heavy snow", fog: "fog" },
      maxGust: "Max gust",
      totalRain: "24 h rain"
    },
    status: {
      updatedAt: "Updated at",
      offlineCached: "No connection: showing data from the last update.",
      loadError: "Could not load the weather. Check your connection.",
      retry: "Retry",
      loading: "Loading weather…",
      myLocation: "My location",
      gpsUnsupported: "Geolocation is not supported on this device.",
      gpsError: "Could not get your location. Search for a city instead.",
      dataSource: "Weather data: Open-Meteo.com (CC BY 4.0) · Places: GeoNames"
    },
    comparison: { vsYesterday: "Compared with yesterday at this time", warmer: "warmer", colder: "colder", same: "same as yesterday" },
    meteogram: { title: "24-hour meteogram", subtitle: "Temperature, dew point, pressure and rain" },
    windSea: {
      title: "Wind & sea",
      currentWind: "Current wind",
      direction: "Direction",
      beaufort: "Beaufort scale",
      force: "Force",
      waveHeight: "Wave height",
      wavePeriod: "Wave period",
      seaTemp: "Sea temperature",
      noMarine: "No marine data: this location is far from the sea.",
      animationNote: "Animation based on the current wind speed and direction at this location."
    },
    route: {
      originPlaceholder: "Departure city",
      destPlaceholder: "Destination city",
      start: "Departure",
      end: "Arrival",
      waypoint: "Waypoint",
      calculating: "Calculating…",
      notFound: "Place not found:",
      error: "Could not calculate the route weather.",
      straightLineNote: "Current conditions at 5 points along the straight line between the two cities (not the road route).",
      visibility: "Visibility",
      advice: {
        good: "No significant weather along the way.",
        rain: "Rain on some stretches: slow down and keep a safe distance.",
        snow: "Snow along the way: check chain or winter tyre requirements.",
        storm: "Thunderstorms along the way: consider delaying your trip.",
        wind: "Strong gusts: take care with high-sided vehicles and on bridges.",
        fog: "Reduced visibility due to fog on some stretches."
      }
    },
    info: {
      globeTitle: "3D globe",
      globeText: "Drag to rotate the globe and use the mouse wheel or the + and − buttons to zoom. The pin marks the selected location.",
      skyTitle: "Sky simulator",
      skyText: "Use the slider to see the sky at different times of day, with the current weather at this location."
    }
  },

  es: {
    views: { radar: "Viento y mar" },
    geo: { otherPlaces: "Otros lugares" },
    minuteCast: {
      title: "Lluvia en las próximas 2 horas",
      subtitle: "Previsión en intervalos de 15 minutos",
      continuing: "Precipitación durante al menos 2 horas",
      unavailable: "Previsión a corto plazo no disponible para esta ubicación"
    },
    models: {
      title: "Comparación de modelos meteorológicos",
      subtitle: "Previsión de hoy según los principales centros meteorológicos",
      agreement: "Acuerdo entre modelos",
      agreementHigh: "Alto",
      agreementMedium: "Medio",
      agreementLow: "Bajo",
      colModel: "Modelo",
      colResolution: "Resolución",
      colMaxMin: "Máx / Mín",
      colRain: "Lluvia",
      colWind: "Viento máx",
      consensus: "Media de los modelos",
      spread: "Diferencia entre modelos"
    },
    biometeo: {
      title: "Salud y bienestar",
      subtitle: "Cambios de presión, exposición al sol y polen",
      headacheAlert: "Sensibilidad barométrica",
      headacheHigh: "Cambio rápido de presión (>3 hPa en 3 horas)",
      maxSunExposure: "Tiempo aproximado hasta quemarse",
      skinTypeIII: "Piel clara-media (fototipo III)",
      noUv: "Sin UV: sin riesgo de quemaduras",
      pollenTitle: "Polen (granos/m³)",
      pollenNames: { alder: "Aliso", birch: "Abedul", grass: "Gramíneas", mugwort: "Artemisa", olive: "Olivo", ragweed: "Ambrosía" },
      pollenLevels: { low: "Bajo", medium: "Moderado", high: "Alto", veryHigh: "Muy alto" },
      pollenUnavailable: "Datos de polen disponibles solo para Europa"
    },
    aqi: {
      title: "Calidad del aire",
      noData: "Datos de calidad del aire no disponibles",
      pollutants: { o3: "Ozono (O₃)", no2: "Dióxido de nitrógeno (NO₂)", so2: "Dióxido de azufre (SO₂)", co: "Monóxido de carbono (CO)" },
      advice: {
        good: "Aire limpio: ideal para cualquier actividad al aire libre.",
        fair: "Buena calidad: sin precauciones especiales.",
        moderate: "Las personas sensibles deberían limitar los esfuerzos prolongados al aire libre.",
        poor: "Evita el ejercicio intenso al aire libre.",
        veryPoor: "Limita el tiempo al aire libre, sobre todo niños, mayores y asmáticos.",
        hazardous: "Permanece en interiores lo máximo posible con las ventanas cerradas."
      }
    },
    lifestyle: {
      title: "Actividades y ropa",
      outfitTitle: "¿Qué me pongo hoy?",
      outfit: {
        umbrellaNeeded: "Lleva paraguas o chubasquero",
        heavyCoat: "Abrigo grueso, bufanda y guantes",
        jacketSweater: "Chaqueta ligera y jersey",
        lightLayers: "Capas ligeras: camisa o sudadera",
        summerClothes: "Ropa de verano ligera y transpirable",
        windbreaker: "Cortavientos",
        sunglassesUv: "Gafas de sol y protector solar"
      }
    },
    alerts: {
      notOfficial: "Aviso calculado a partir de la previsión de las próximas 24 horas, no es una alerta oficial. Consulta el servicio meteorológico nacional.",
      yellowWarning: "Atención: fenómenos localmente intensos",
      orangeWarning: "Se prevén fenómenos intensos",
      redWarning: "Se prevén fenómenos extremos",
      reasons: { thunder: "tormentas", gusts: "rachas fuertes", heavyRain: "lluvias abundantes", heavySnow: "nevadas intensas", fog: "niebla" },
      maxGust: "Racha máx",
      totalRain: "Lluvia 24 h"
    },
    status: {
      updatedAt: "Actualizado a las",
      offlineCached: "Sin conexión: se muestran los datos de la última actualización.",
      loadError: "No se pudo cargar el tiempo. Comprueba la conexión.",
      retry: "Reintentar",
      loading: "Cargando el tiempo…",
      myLocation: "Mi ubicación",
      gpsUnsupported: "La geolocalización no es compatible con este dispositivo.",
      gpsError: "No se pudo obtener tu ubicación. Busca una ciudad manualmente.",
      dataSource: "Datos meteorológicos: Open-Meteo.com (CC BY 4.0) · Lugares: GeoNames"
    },
    comparison: { vsYesterday: "Respecto a ayer a esta hora", warmer: "más cálido", colder: "más frío", same: "igual que ayer" },
    meteogram: { title: "Meteograma de 24 horas", subtitle: "Temperatura, punto de rocío, presión y lluvia" },
    windSea: {
      title: "Viento y mar",
      currentWind: "Viento actual",
      direction: "Dirección",
      beaufort: "Escala de Beaufort",
      force: "Fuerza",
      waveHeight: "Altura de las olas",
      wavePeriod: "Periodo de las olas",
      seaTemp: "Temperatura del mar",
      noMarine: "Sin datos marinos: ubicación alejada del mar.",
      animationNote: "Animación basada en la velocidad y dirección actuales del viento en esta ubicación."
    },
    route: {
      originPlaceholder: "Ciudad de salida",
      destPlaceholder: "Ciudad de llegada",
      start: "Salida",
      end: "Llegada",
      waypoint: "Punto intermedio",
      calculating: "Calculando…",
      notFound: "Lugar no encontrado:",
      error: "No se pudo calcular el tiempo de la ruta.",
      straightLineNote: "Condiciones actuales en 5 puntos de la línea recta entre las dos ciudades (no la ruta por carretera).",
      visibility: "Visibilidad",
      advice: {
        good: "Sin fenómenos significativos en el trayecto.",
        rain: "Lluvia en algunos tramos: reduce la velocidad y aumenta la distancia de seguridad.",
        snow: "Nieve en el trayecto: comprueba la obligación de cadenas o neumáticos de invierno.",
        storm: "Tormentas en el trayecto: considera retrasar la salida.",
        wind: "Rachas fuertes: precaución con vehículos altos y en viaductos.",
        fog: "Visibilidad reducida por niebla en algunos tramos."
      }
    },
    info: {
      globeTitle: "Globo 3D",
      globeText: "Arrastra para girar el globo y usa la rueda del ratón o los botones + y − para hacer zoom. El marcador indica la ubicación seleccionada.",
      skyTitle: "Simulador del cielo",
      skyText: "Usa el control deslizante para ver el cielo a distintas horas del día, con el tiempo actual de esta ubicación."
    }
  },

  fr: {
    views: { radar: "Vent et mer" },
    geo: { otherPlaces: "Autres lieux" },
    minuteCast: {
      title: "Pluie dans les 2 prochaines heures",
      subtitle: "Prévision par pas de 15 minutes",
      continuing: "Précipitations pendant au moins 2 heures",
      unavailable: "Prévision à court terme indisponible pour ce lieu"
    },
    models: {
      title: "Comparaison des modèles météo",
      subtitle: "Prévision du jour selon les principaux centres météorologiques",
      agreement: "Accord entre modèles",
      agreementHigh: "Élevé",
      agreementMedium: "Moyen",
      agreementLow: "Faible",
      colModel: "Modèle",
      colResolution: "Résolution",
      colMaxMin: "Max / Min",
      colRain: "Pluie",
      colWind: "Vent max",
      consensus: "Moyenne des modèles",
      spread: "Écart entre modèles"
    },
    biometeo: {
      title: "Santé et bien-être",
      subtitle: "Variations de pression, exposition au soleil et pollens",
      headacheAlert: "Sensibilité barométrique",
      headacheHigh: "Variation rapide de pression (>3 hPa en 3 heures)",
      maxSunExposure: "Temps indicatif avant un coup de soleil",
      skinTypeIII: "Peau claire à mate (phototype III)",
      noUv: "Pas d’UV : aucun risque de coup de soleil",
      pollenTitle: "Pollens (grains/m³)",
      pollenNames: { alder: "Aulne", birch: "Bouleau", grass: "Graminées", mugwort: "Armoise", olive: "Olivier", ragweed: "Ambroisie" },
      pollenLevels: { low: "Faible", medium: "Modéré", high: "Élevé", veryHigh: "Très élevé" },
      pollenUnavailable: "Données polliniques disponibles uniquement pour l’Europe"
    },
    aqi: {
      title: "Qualité de l’air",
      noData: "Données de qualité de l’air indisponibles",
      pollutants: { o3: "Ozone (O₃)", no2: "Dioxyde d’azote (NO₂)", so2: "Dioxyde de soufre (SO₂)", co: "Monoxyde de carbone (CO)" },
      advice: {
        good: "Air pur : idéal pour toutes les activités en plein air.",
        fair: "Bonne qualité : aucune précaution particulière.",
        moderate: "Les personnes sensibles devraient limiter les efforts prolongés en extérieur.",
        poor: "Évitez le sport intense en extérieur.",
        veryPoor: "Limitez le temps passé dehors, surtout enfants, seniors et asthmatiques.",
        hazardous: "Restez à l’intérieur autant que possible, fenêtres fermées."
      }
    },
    lifestyle: {
      title: "Activités et tenue",
      outfitTitle: "Que porter aujourd’hui ?",
      outfit: {
        umbrellaNeeded: "Prenez un parapluie ou un imperméable",
        heavyCoat: "Manteau chaud, écharpe et gants",
        jacketSweater: "Veste légère et pull",
        lightLayers: "Couches légères : chemise ou sweat",
        summerClothes: "Vêtements d’été légers et respirants",
        windbreaker: "Coupe-vent",
        sunglassesUv: "Lunettes de soleil et crème solaire"
      }
    },
    alerts: {
      notOfficial: "Avis calculé d’après la prévision des prochaines 24 heures, ce n’est pas une vigilance officielle. Consultez le service météo national.",
      yellowWarning: "Attention : phénomènes localement intenses",
      orangeWarning: "Phénomènes intenses prévus",
      redWarning: "Phénomènes extrêmes prévus",
      reasons: { thunder: "orages", gusts: "fortes rafales", heavyRain: "fortes pluies", heavySnow: "fortes chutes de neige", fog: "brouillard" },
      maxGust: "Rafale max",
      totalRain: "Pluie 24 h"
    },
    status: {
      updatedAt: "Mis à jour à",
      offlineCached: "Pas de connexion : affichage des données de la dernière mise à jour.",
      loadError: "Impossible de charger la météo. Vérifiez votre connexion.",
      retry: "Réessayer",
      loading: "Chargement de la météo…",
      myLocation: "Ma position",
      gpsUnsupported: "La géolocalisation n’est pas prise en charge sur cet appareil.",
      gpsError: "Impossible d’obtenir votre position. Recherchez une ville.",
      dataSource: "Données météo : Open-Meteo.com (CC BY 4.0) · Lieux : GeoNames"
    },
    comparison: { vsYesterday: "Par rapport à hier à la même heure", warmer: "plus chaud", colder: "plus froid", same: "comme hier" },
    meteogram: { title: "Météogramme 24 heures", subtitle: "Température, point de rosée, pression et pluie" },
    windSea: {
      title: "Vent et mer",
      currentWind: "Vent actuel",
      direction: "Direction",
      beaufort: "Échelle de Beaufort",
      force: "Force",
      waveHeight: "Hauteur des vagues",
      wavePeriod: "Période des vagues",
      seaTemp: "Température de la mer",
      noMarine: "Pas de données marines : lieu éloigné de la mer.",
      animationNote: "Animation basée sur la vitesse et la direction actuelles du vent à cet endroit."
    },
    route: {
      originPlaceholder: "Ville de départ",
      destPlaceholder: "Ville d’arrivée",
      start: "Départ",
      end: "Arrivée",
      waypoint: "Point intermédiaire",
      calculating: "Calcul en cours…",
      notFound: "Lieu introuvable :",
      error: "Impossible de calculer la météo du trajet.",
      straightLineNote: "Conditions actuelles en 5 points sur la ligne droite entre les deux villes (pas l’itinéraire routier).",
      visibility: "Visibilité",
      advice: {
        good: "Aucun phénomène notable sur le trajet.",
        rain: "Pluie sur certains tronçons : ralentissez et augmentez les distances de sécurité.",
        snow: "Neige sur le trajet : vérifiez l’obligation de chaînes ou de pneus hiver.",
        storm: "Orages sur le trajet : envisagez de reporter le départ.",
        wind: "Fortes rafales : prudence avec les véhicules hauts et sur les viaducs.",
        fog: "Visibilité réduite par le brouillard sur certains tronçons."
      }
    },
    info: {
      globeTitle: "Globe 3D",
      globeText: "Faites glisser pour tourner le globe et utilisez la molette ou les boutons + et − pour zoomer. Le repère indique le lieu sélectionné.",
      skyTitle: "Simulateur de ciel",
      skyText: "Utilisez le curseur pour voir le ciel à différentes heures, avec la météo actuelle de ce lieu."
    }
  },

  de: {
    views: { radar: "Wind & Meer" },
    geo: { otherPlaces: "Weitere Orte" },
    minuteCast: {
      title: "Regen in den nächsten 2 Stunden",
      subtitle: "Vorhersage in 15-Minuten-Schritten",
      continuing: "Niederschlag für mindestens 2 Stunden",
      unavailable: "Kurzfristvorhersage für diesen Ort nicht verfügbar"
    },
    models: {
      title: "Vergleich der Wettermodelle",
      subtitle: "Heutige Vorhersage der wichtigsten Wetterzentren",
      agreement: "Modellübereinstimmung",
      agreementHigh: "Hoch",
      agreementMedium: "Mittel",
      agreementLow: "Niedrig",
      colModel: "Modell",
      colResolution: "Auflösung",
      colMaxMin: "Max / Min",
      colRain: "Regen",
      colWind: "Max. Wind",
      consensus: "Modellmittel",
      spread: "Modellstreuung"
    },
    biometeo: {
      title: "Gesundheit & Wohlbefinden",
      subtitle: "Luftdruckänderung, Sonnenexposition und Pollen",
      headacheAlert: "Wetterfühligkeit",
      headacheHigh: "Schnelle Luftdruckänderung (>3 hPa in 3 Stunden)",
      maxSunExposure: "Ungefähre Zeit bis zum Sonnenbrand",
      skinTypeIII: "Hell-mittlere Haut (Hauttyp III)",
      noUv: "Kein UV: kein Sonnenbrandrisiko",
      pollenTitle: "Pollen (Körner/m³)",
      pollenNames: { alder: "Erle", birch: "Birke", grass: "Gräser", mugwort: "Beifuß", olive: "Olive", ragweed: "Ambrosia" },
      pollenLevels: { low: "Gering", medium: "Mäßig", high: "Hoch", veryHigh: "Sehr hoch" },
      pollenUnavailable: "Pollendaten nur für Europa verfügbar"
    },
    aqi: {
      title: "Luftqualität",
      noData: "Keine Daten zur Luftqualität verfügbar",
      pollutants: { o3: "Ozon (O₃)", no2: "Stickstoffdioxid (NO₂)", so2: "Schwefeldioxid (SO₂)", co: "Kohlenmonoxid (CO)" },
      advice: {
        good: "Saubere Luft: ideal für alle Aktivitäten im Freien.",
        fair: "Gute Luftqualität: keine besonderen Vorkehrungen nötig.",
        moderate: "Empfindliche Personen sollten längere Anstrengungen im Freien begrenzen.",
        poor: "Intensiven Sport im Freien vermeiden.",
        veryPoor: "Zeit im Freien begrenzen, besonders Kinder, Ältere und Asthmatiker.",
        hazardous: "Möglichst drinnen bleiben und Fenster geschlossen halten."
      }
    },
    lifestyle: {
      title: "Aktivitäten & Kleidung",
      outfitTitle: "Was ziehe ich heute an?",
      outfit: {
        umbrellaNeeded: "Regenschirm oder Regenjacke mitnehmen",
        heavyCoat: "Warmer Mantel, Schal und Handschuhe",
        jacketSweater: "Leichte Jacke und Pullover",
        lightLayers: "Leichte Schichten: Hemd oder Pulli",
        summerClothes: "Leichte, atmungsaktive Sommerkleidung",
        windbreaker: "Windjacke",
        sunglassesUv: "Sonnenbrille und Sonnencreme"
      }
    },
    alerts: {
      notOfficial: "Hinweis aus der Vorhersage der nächsten 24 Stunden, keine amtliche Unwetterwarnung. Bitte den nationalen Wetterdienst prüfen.",
      yellowWarning: "Achtung: örtlich intensives Wetter",
      orangeWarning: "Unwetter erwartet",
      redWarning: "Extremes Unwetter erwartet",
      reasons: { thunder: "Gewitter", gusts: "starke Böen", heavyRain: "Starkregen", heavySnow: "starker Schneefall", fog: "Nebel" },
      maxGust: "Max. Böe",
      totalRain: "Regen 24 h"
    },
    status: {
      updatedAt: "Aktualisiert um",
      offlineCached: "Keine Verbindung: Daten der letzten Aktualisierung werden angezeigt.",
      loadError: "Wetter konnte nicht geladen werden. Bitte Verbindung prüfen.",
      retry: "Erneut versuchen",
      loading: "Wetter wird geladen…",
      myLocation: "Mein Standort",
      gpsUnsupported: "Standortbestimmung wird auf diesem Gerät nicht unterstützt.",
      gpsError: "Standort nicht verfügbar. Bitte eine Stadt suchen.",
      dataSource: "Wetterdaten: Open-Meteo.com (CC BY 4.0) · Orte: GeoNames"
    },
    comparison: { vsYesterday: "Im Vergleich zu gestern um diese Zeit", warmer: "wärmer", colder: "kälter", same: "wie gestern" },
    meteogram: { title: "24-Stunden-Meteogramm", subtitle: "Temperatur, Taupunkt, Luftdruck und Regen" },
    windSea: {
      title: "Wind & Meer",
      currentWind: "Aktueller Wind",
      direction: "Richtung",
      beaufort: "Beaufort-Skala",
      force: "Stärke",
      waveHeight: "Wellenhöhe",
      wavePeriod: "Wellenperiode",
      seaTemp: "Wassertemperatur",
      noMarine: "Keine Meeresdaten: Ort liegt nicht am Meer.",
      animationNote: "Animation basierend auf aktueller Windgeschwindigkeit und -richtung an diesem Ort."
    },
    route: {
      originPlaceholder: "Abfahrtsort",
      destPlaceholder: "Zielort",
      start: "Abfahrt",
      end: "Ankunft",
      waypoint: "Zwischenpunkt",
      calculating: "Wird berechnet…",
      notFound: "Ort nicht gefunden:",
      error: "Routenwetter konnte nicht berechnet werden.",
      straightLineNote: "Aktuelle Bedingungen an 5 Punkten auf der Luftlinie zwischen beiden Städten (nicht die Straßenroute).",
      visibility: "Sichtweite",
      advice: {
        good: "Kein nennenswertes Wetter auf der Strecke.",
        rain: "Regen auf einigen Abschnitten: langsamer fahren und Abstand halten.",
        snow: "Schnee auf der Strecke: Ketten- oder Winterreifenpflicht prüfen.",
        storm: "Gewitter auf der Strecke: Abfahrt eventuell verschieben.",
        wind: "Starke Böen: Vorsicht mit hohen Fahrzeugen und auf Brücken.",
        fog: "Eingeschränkte Sicht durch Nebel auf einigen Abschnitten."
      }
    },
    info: {
      globeTitle: "3D-Globus",
      globeText: "Ziehen, um den Globus zu drehen; Mausrad oder + und − zum Zoomen. Die Markierung zeigt den gewählten Ort.",
      skyTitle: "Himmelssimulator",
      skyText: "Mit dem Regler den Himmel zu verschiedenen Tageszeiten sehen, mit dem aktuellen Wetter an diesem Ort."
    }
  },

  ja: {
    views: { radar: "風と海" },
    geo: { otherPlaces: "その他の地域" },
    minuteCast: {
      title: "今後2時間の雨",
      subtitle: "15分ごとの予報",
      continuing: "少なくとも2時間は降水が続きます",
      unavailable: "この地点の短時間予報はありません"
    },
    models: {
      title: "気象モデルの比較",
      subtitle: "主要気象機関による今日の予報",
      agreement: "モデルの一致度",
      agreementHigh: "高",
      agreementMedium: "中",
      agreementLow: "低",
      colModel: "モデル",
      colResolution: "解像度",
      colMaxMin: "最高 / 最低",
      colRain: "降水量",
      colWind: "最大風速",
      consensus: "モデル平均",
      spread: "モデル間の差"
    },
    biometeo: {
      title: "健康",
      subtitle: "気圧変化・日差し・花粉",
      headacheAlert: "気圧変化による体調への影響",
      headacheHigh: "急な気圧変化（3時間で3hPa超）",
      maxSunExposure: "日焼けまでのおおよその時間",
      skinTypeIII: "標準的な肌（スキンタイプIII）",
      noUv: "紫外線なし：日焼けの心配はありません",
      pollenTitle: "花粉（個/m³）",
      pollenNames: { alder: "ハンノキ", birch: "シラカバ", grass: "イネ科", mugwort: "ヨモギ", olive: "オリーブ", ragweed: "ブタクサ" },
      pollenLevels: { low: "少ない", medium: "やや多い", high: "多い", veryHigh: "非常に多い" },
      pollenUnavailable: "花粉データはヨーロッパのみ対応しています"
    },
    aqi: {
      title: "大気質",
      noData: "大気質データはありません",
      pollutants: { o3: "オゾン (O₃)", no2: "二酸化窒素 (NO₂)", so2: "二酸化硫黄 (SO₂)", co: "一酸化炭素 (CO)" },
      advice: {
        good: "きれいな空気：屋外活動に最適です。",
        fair: "良好：特別な注意は不要です。",
        moderate: "敏感な方は長時間の屋外での運動を控えてください。",
        poor: "屋外での激しい運動は避けてください。",
        veryPoor: "外出を控えてください。特に子ども・高齢者・ぜんそくの方。",
        hazardous: "できるだけ屋内で過ごし、窓を閉めてください。"
      }
    },
    lifestyle: {
      title: "アクティビティと服装",
      outfitTitle: "今日の服装",
      outfit: {
        umbrellaNeeded: "傘かレインコートを持って行きましょう",
        heavyCoat: "厚手のコート・マフラー・手袋",
        jacketSweater: "薄手のジャケットとセーター",
        lightLayers: "軽い重ね着：シャツやパーカー",
        summerClothes: "軽くて通気性のよい夏服",
        windbreaker: "ウインドブレーカー",
        sunglassesUv: "サングラスと日焼け止め"
      }
    },
    alerts: {
      notOfficial: "今後24時間の予報から算出した注意情報で、公式の警報ではありません。各国の気象機関の情報を確認してください。",
      yellowWarning: "注意：局地的に激しい天気",
      orangeWarning: "荒れた天気の見込み",
      redWarning: "非常に激しい天気の見込み",
      reasons: { thunder: "雷雨", gusts: "強い突風", heavyRain: "大雨", heavySnow: "大雪", fog: "霧" },
      maxGust: "最大瞬間風速",
      totalRain: "24時間降水量"
    },
    status: {
      updatedAt: "更新時刻",
      offlineCached: "オフライン：前回更新時のデータを表示しています。",
      loadError: "天気を読み込めませんでした。接続を確認してください。",
      retry: "再試行",
      loading: "天気を読み込み中…",
      myLocation: "現在地",
      gpsUnsupported: "この端末は位置情報に対応していません。",
      gpsError: "現在地を取得できません。都市を検索してください。",
      dataSource: "気象データ：Open-Meteo.com (CC BY 4.0) · 地名：GeoNames"
    },
    comparison: { vsYesterday: "昨日の同時刻との比較", warmer: "暖かい", colder: "寒い", same: "昨日と同じ" },
    meteogram: { title: "24時間メテオグラム", subtitle: "気温・露点・気圧・降水量" },
    windSea: {
      title: "風と海",
      currentWind: "現在の風",
      direction: "風向",
      beaufort: "ビューフォート風力階級",
      force: "風力",
      waveHeight: "波の高さ",
      wavePeriod: "波の周期",
      seaTemp: "海水温",
      noMarine: "海洋データなし：海から離れた地点です。",
      animationNote: "この地点の現在の風速と風向に基づくアニメーションです。"
    },
    route: {
      originPlaceholder: "出発地",
      destPlaceholder: "目的地",
      start: "出発",
      end: "到着",
      waypoint: "中間地点",
      calculating: "計算中…",
      notFound: "見つかりません：",
      error: "ルートの天気を計算できませんでした。",
      straightLineNote: "2都市間の直線上の5地点の現在の天気です（道路ルートではありません）。",
      visibility: "視程",
      advice: {
        good: "経路上に目立った気象現象はありません。",
        rain: "一部で雨：速度を落とし、車間距離を広げてください。",
        snow: "経路上で雪：チェーンや冬用タイヤの規制を確認してください。",
        storm: "経路上で雷雨：出発の延期を検討してください。",
        wind: "強い突風：背の高い車両や橋の上では注意してください。",
        fog: "一部で霧による視界不良があります。"
      }
    },
    info: {
      globeTitle: "3D地球儀",
      globeText: "ドラッグで地球儀を回転、ホイールまたは＋/−ボタンで拡大縮小できます。ピンは選択中の地点です。",
      skyTitle: "空のシミュレーター",
      skyText: "スライダーで時間帯ごとの空を表示します。この地点の現在の天気を反映しています。"
    }
  },

  zh: {
    views: { radar: "风与海" },
    geo: { otherPlaces: "其他地点" },
    minuteCast: {
      title: "未来2小时降水",
      subtitle: "每15分钟预报",
      continuing: "降水将持续至少2小时",
      unavailable: "该地点暂无短时预报"
    },
    models: {
      title: "气象模式对比",
      subtitle: "主要气象中心的今日预报",
      agreement: "模式一致性",
      agreementHigh: "高",
      agreementMedium: "中",
      agreementLow: "低",
      colModel: "模式",
      colResolution: "分辨率",
      colMaxMin: "最高 / 最低",
      colRain: "降水",
      colWind: "最大风速",
      consensus: "模式平均",
      spread: "模式差异"
    },
    biometeo: {
      title: "健康",
      subtitle: "气压变化、日晒与花粉",
      headacheAlert: "气压敏感度",
      headacheHigh: "气压快速变化（3小时内超过3百帕）",
      maxSunExposure: "大约多久会晒伤",
      skinTypeIII: "中等肤色（III型）",
      noUv: "无紫外线：没有晒伤风险",
      pollenTitle: "花粉（粒/立方米）",
      pollenNames: { alder: "桤木", birch: "桦树", grass: "禾本科", mugwort: "艾草", olive: "橄榄", ragweed: "豚草" },
      pollenLevels: { low: "低", medium: "中等", high: "高", veryHigh: "很高" },
      pollenUnavailable: "花粉数据仅覆盖欧洲"
    },
    aqi: {
      title: "空气质量",
      noData: "暂无空气质量数据",
      pollutants: { o3: "臭氧 (O₃)", no2: "二氧化氮 (NO₂)", so2: "二氧化硫 (SO₂)", co: "一氧化碳 (CO)" },
      advice: {
        good: "空气清新：适合所有户外活动。",
        fair: "空气良好：无需特别防护。",
        moderate: "敏感人群应减少长时间户外运动。",
        poor: "避免剧烈户外运动。",
        veryPoor: "减少外出，尤其是儿童、老人和哮喘患者。",
        hazardous: "尽量留在室内并关闭门窗。"
      }
    },
    lifestyle: {
      title: "活动与穿衣",
      outfitTitle: "今天穿什么？",
      outfit: {
        umbrellaNeeded: "带上雨伞或雨衣",
        heavyCoat: "厚外套、围巾和手套",
        jacketSweater: "薄外套加毛衣",
        lightLayers: "轻薄叠穿：衬衫或卫衣",
        summerClothes: "轻薄透气的夏装",
        windbreaker: "防风外套",
        sunglassesUv: "太阳镜和防晒霜"
      }
    },
    alerts: {
      notOfficial: "根据未来24小时预报计算的提示，并非官方预警。请查看本国气象部门的信息。",
      yellowWarning: "注意：局部天气较强",
      orangeWarning: "预计有强天气",
      redWarning: "预计有极端天气",
      reasons: { thunder: "雷暴", gusts: "强阵风", heavyRain: "强降雨", heavySnow: "大雪", fog: "雾" },
      maxGust: "最大阵风",
      totalRain: "24小时降水"
    },
    status: {
      updatedAt: "更新于",
      offlineCached: "无网络：显示上次更新的数据。",
      loadError: "无法加载天气，请检查网络连接。",
      retry: "重试",
      loading: "正在加载天气…",
      myLocation: "我的位置",
      gpsUnsupported: "此设备不支持定位。",
      gpsError: "无法获取位置，请手动搜索城市。",
      dataSource: "气象数据：Open-Meteo.com (CC BY 4.0) · 地名：GeoNames"
    },
    comparison: { vsYesterday: "与昨天同一时间相比", warmer: "更暖", colder: "更冷", same: "与昨天相同" },
    meteogram: { title: "24小时气象图", subtitle: "气温、露点、气压和降水" },
    windSea: {
      title: "风与海",
      currentWind: "当前风",
      direction: "风向",
      beaufort: "蒲福风级",
      force: "级",
      waveHeight: "浪高",
      wavePeriod: "波浪周期",
      seaTemp: "海水温度",
      noMarine: "无海洋数据：该地点远离海洋。",
      animationNote: "动画基于该地点当前的风速和风向。"
    },
    route: {
      originPlaceholder: "出发城市",
      destPlaceholder: "目的城市",
      start: "出发",
      end: "到达",
      waypoint: "途经点",
      calculating: "正在计算…",
      notFound: "未找到地点：",
      error: "无法计算路线天气。",
      straightLineNote: "两城市之间直线上5个点的当前天气（非道路路线）。",
      visibility: "能见度",
      advice: {
        good: "沿途无明显天气现象。",
        rain: "部分路段有雨：请减速并保持车距。",
        snow: "沿途有雪：请确认防滑链或冬季轮胎要求。",
        storm: "沿途有雷暴：建议推迟出发。",
        wind: "强阵风：高大车辆及桥梁路段请注意。",
        fog: "部分路段有雾，能见度较低。"
      }
    },
    info: {
      globeTitle: "3D地球",
      globeText: "拖动旋转地球，使用滚轮或＋/−按钮缩放。标记显示所选地点。",
      skyTitle: "天空模拟器",
      skyText: "拖动滑块查看一天中不同时间的天空，并反映该地点的当前天气。"
    }
  },

  ar: {
    views: { radar: "الرياح والبحر" },
    geo: { otherPlaces: "أماكن أخرى" },
    minuteCast: {
      title: "المطر خلال الساعتين القادمتين",
      subtitle: "توقعات كل 15 دقيقة",
      continuing: "هطول لمدة ساعتين على الأقل",
      unavailable: "التوقعات القصيرة المدى غير متاحة لهذا الموقع"
    },
    models: {
      title: "مقارنة نماذج الطقس",
      subtitle: "توقعات اليوم من أهم مراكز الأرصاد",
      agreement: "توافق النماذج",
      agreementHigh: "مرتفع",
      agreementMedium: "متوسط",
      agreementLow: "منخفض",
      colModel: "النموذج",
      colResolution: "الدقة",
      colMaxMin: "العظمى / الصغرى",
      colRain: "المطر",
      colWind: "أقصى رياح",
      consensus: "متوسط النماذج",
      spread: "الفرق بين النماذج"
    },
    biometeo: {
      title: "الصحة والعافية",
      subtitle: "تغيّر الضغط والتعرض للشمس وحبوب اللقاح",
      headacheAlert: "الحساسية لتغيّر الضغط",
      headacheHigh: "تغيّر سريع في الضغط (أكثر من 3 هكتوباسكال خلال 3 ساعات)",
      maxSunExposure: "الوقت التقريبي قبل حروق الشمس",
      skinTypeIII: "بشرة فاتحة إلى متوسطة (النوع III)",
      noUv: "لا أشعة فوق بنفسجية: لا خطر من حروق الشمس",
      pollenTitle: "حبوب اللقاح (حبة/م³)",
      pollenNames: { alder: "الجار المائي", birch: "البتولا", grass: "الأعشاب", mugwort: "الشيح", olive: "الزيتون", ragweed: "الرجيد" },
      pollenLevels: { low: "منخفض", medium: "متوسط", high: "مرتفع", veryHigh: "مرتفع جدًا" },
      pollenUnavailable: "بيانات حبوب اللقاح متاحة لأوروبا فقط"
    },
    aqi: {
      title: "جودة الهواء",
      noData: "بيانات جودة الهواء غير متاحة",
      pollutants: { o3: "الأوزون (O₃)", no2: "ثاني أكسيد النيتروجين (NO₂)", so2: "ثاني أكسيد الكبريت (SO₂)", co: "أول أكسيد الكربون (CO)" },
      advice: {
        good: "هواء نقي: مثالي لجميع الأنشطة الخارجية.",
        fair: "جودة جيدة: لا حاجة لاحتياطات خاصة.",
        moderate: "على الأشخاص الحساسين تقليل المجهود الطويل في الخارج.",
        poor: "تجنب الرياضة الشاقة في الخارج.",
        veryPoor: "قلّل الوقت في الخارج، خاصة للأطفال وكبار السن ومرضى الربو.",
        hazardous: "ابقَ في الداخل قدر الإمكان وأغلق النوافذ."
      }
    },
    lifestyle: {
      title: "الأنشطة والملابس",
      outfitTitle: "ماذا أرتدي اليوم؟",
      outfit: {
        umbrellaNeeded: "خذ مظلة أو معطفًا واقيًا من المطر",
        heavyCoat: "معطف ثقيل ووشاح وقفازات",
        jacketSweater: "سترة خفيفة وكنزة",
        lightLayers: "طبقات خفيفة: قميص أو سترة رياضية",
        summerClothes: "ملابس صيفية خفيفة ومريحة",
        windbreaker: "سترة واقية من الرياح",
        sunglassesUv: "نظارات شمسية وواقي شمس"
      }
    },
    alerts: {
      notOfficial: "تنبيه محسوب من توقعات الساعات الـ24 القادمة، وليس تحذيرًا رسميًا. راجع هيئة الأرصاد الوطنية.",
      yellowWarning: "تنبيه: ظواهر جوية قوية محليًا",
      orangeWarning: "يُتوقع طقس شديد",
      redWarning: "يُتوقع طقس متطرف",
      reasons: { thunder: "عواصف رعدية", gusts: "هبات رياح قوية", heavyRain: "أمطار غزيرة", heavySnow: "ثلوج كثيفة", fog: "ضباب" },
      maxGust: "أقصى هبة",
      totalRain: "مطر 24 ساعة"
    },
    status: {
      updatedAt: "آخر تحديث",
      offlineCached: "لا يوجد اتصال: يتم عرض بيانات آخر تحديث.",
      loadError: "تعذّر تحميل الطقس. تحقق من الاتصال.",
      retry: "إعادة المحاولة",
      loading: "جارٍ تحميل الطقس…",
      myLocation: "موقعي",
      gpsUnsupported: "تحديد الموقع غير مدعوم على هذا الجهاز.",
      gpsError: "تعذّر تحديد موقعك. ابحث عن مدينة يدويًا.",
      dataSource: "بيانات الطقس: Open-Meteo.com (CC BY 4.0) · الأماكن: GeoNames"
    },
    comparison: { vsYesterday: "مقارنة بالأمس في الوقت نفسه", warmer: "أدفأ", colder: "أبرد", same: "مثل الأمس" },
    meteogram: { title: "مخطط الطقس لـ24 ساعة", subtitle: "الحرارة ونقطة الندى والضغط والمطر" },
    windSea: {
      title: "الرياح والبحر",
      currentWind: "الرياح الحالية",
      direction: "الاتجاه",
      beaufort: "مقياس بوفورت",
      force: "القوة",
      waveHeight: "ارتفاع الموج",
      wavePeriod: "دورة الموج",
      seaTemp: "حرارة البحر",
      noMarine: "لا توجد بيانات بحرية: الموقع بعيد عن البحر.",
      animationNote: "رسوم متحركة مبنية على سرعة الرياح واتجاهها الحاليين في هذا الموقع."
    },
    route: {
      originPlaceholder: "مدينة الانطلاق",
      destPlaceholder: "مدينة الوصول",
      start: "الانطلاق",
      end: "الوصول",
      waypoint: "نقطة وسيطة",
      calculating: "جارٍ الحساب…",
      notFound: "لم يتم العثور على المكان:",
      error: "تعذّر حساب طقس المسار.",
      straightLineNote: "الأحوال الحالية في 5 نقاط على الخط المستقيم بين المدينتين (وليس الطريق البري).",
      visibility: "مدى الرؤية",
      advice: {
        good: "لا ظواهر جوية مهمة على الطريق.",
        rain: "أمطار في بعض المقاطع: خفّف السرعة وزد مسافة الأمان.",
        snow: "ثلوج على الطريق: تحقق من إلزامية السلاسل أو الإطارات الشتوية.",
        storm: "عواصف رعدية على الطريق: فكّر في تأجيل الرحلة.",
        wind: "هبات قوية: انتبه مع المركبات العالية وعلى الجسور.",
        fog: "رؤية منخفضة بسبب الضباب في بعض المقاطع."
      }
    },
    info: {
      globeTitle: "الكرة الأرضية ثلاثية الأبعاد",
      globeText: "اسحب لتدوير الكرة واستخدم عجلة الفأرة أو زرّي + و − للتكبير. يشير الدبوس إلى الموقع المحدد.",
      skyTitle: "محاكي السماء",
      skyText: "استخدم شريط التمرير لرؤية السماء في أوقات مختلفة من اليوم، مع الطقس الحالي لهذا الموقع."
    }
  },

  pt: {
    views: { radar: "Vento e mar" },
    geo: { otherPlaces: "Outros locais" },
    minuteCast: {
      title: "Chuva nas próximas 2 horas",
      subtitle: "Previsão em intervalos de 15 minutos",
      continuing: "Precipitação por pelo menos 2 horas",
      unavailable: "Previsão de curto prazo indisponível para este local"
    },
    models: {
      title: "Comparação de modelos meteorológicos",
      subtitle: "Previsão de hoje dos principais centros meteorológicos",
      agreement: "Concordância entre modelos",
      agreementHigh: "Alta",
      agreementMedium: "Média",
      agreementLow: "Baixa",
      colModel: "Modelo",
      colResolution: "Resolução",
      colMaxMin: "Máx / Mín",
      colRain: "Chuva",
      colWind: "Vento máx",
      consensus: "Média dos modelos",
      spread: "Diferença entre modelos"
    },
    biometeo: {
      title: "Saúde e bem-estar",
      subtitle: "Variação de pressão, exposição ao sol e pólen",
      headacheAlert: "Sensibilidade barométrica",
      headacheHigh: "Variação rápida de pressão (>3 hPa em 3 horas)",
      maxSunExposure: "Tempo aproximado até queimar",
      skinTypeIII: "Pele clara a média (fototipo III)",
      noUv: "Sem UV: sem risco de queimaduras",
      pollenTitle: "Pólen (grãos/m³)",
      pollenNames: { alder: "Amieiro", birch: "Bétula", grass: "Gramíneas", mugwort: "Artemísia", olive: "Oliveira", ragweed: "Ambrósia" },
      pollenLevels: { low: "Baixo", medium: "Moderado", high: "Alto", veryHigh: "Muito alto" },
      pollenUnavailable: "Dados de pólen disponíveis apenas para a Europa"
    },
    aqi: {
      title: "Qualidade do ar",
      noData: "Dados de qualidade do ar indisponíveis",
      pollutants: { o3: "Ozônio (O₃)", no2: "Dióxido de nitrogênio (NO₂)", so2: "Dióxido de enxofre (SO₂)", co: "Monóxido de carbono (CO)" },
      advice: {
        good: "Ar limpo: ideal para todas as atividades ao ar livre.",
        fair: "Boa qualidade: sem cuidados especiais.",
        moderate: "Pessoas sensíveis devem limitar esforços prolongados ao ar livre.",
        poor: "Evite exercícios intensos ao ar livre.",
        veryPoor: "Limite o tempo ao ar livre, sobretudo crianças, idosos e asmáticos.",
        hazardous: "Fique em ambientes fechados o máximo possível, com as janelas fechadas."
      }
    },
    lifestyle: {
      title: "Atividades e roupas",
      outfitTitle: "O que vestir hoje?",
      outfit: {
        umbrellaNeeded: "Leve guarda-chuva ou capa de chuva",
        heavyCoat: "Casaco pesado, cachecol e luvas",
        jacketSweater: "Jaqueta leve e suéter",
        lightLayers: "Camadas leves: camisa ou moletom",
        summerClothes: "Roupas de verão leves e respiráveis",
        windbreaker: "Corta-vento",
        sunglassesUv: "Óculos de sol e protetor solar"
      }
    },
    alerts: {
      notOfficial: "Aviso calculado a partir da previsão das próximas 24 horas, não é um alerta oficial. Consulte o serviço meteorológico nacional.",
      yellowWarning: "Atenção: fenômenos localmente intensos",
      orangeWarning: "Previsão de fenômenos intensos",
      redWarning: "Previsão de fenômenos extremos",
      reasons: { thunder: "trovoadas", gusts: "rajadas fortes", heavyRain: "chuva forte", heavySnow: "neve intensa", fog: "nevoeiro" },
      maxGust: "Rajada máx",
      totalRain: "Chuva 24 h"
    },
    status: {
      updatedAt: "Atualizado às",
      offlineCached: "Sem conexão: mostrando os dados da última atualização.",
      loadError: "Não foi possível carregar o tempo. Verifique a conexão.",
      retry: "Tentar novamente",
      loading: "Carregando o tempo…",
      myLocation: "Minha localização",
      gpsUnsupported: "A geolocalização não é compatível com este dispositivo.",
      gpsError: "Não foi possível obter sua localização. Pesquise uma cidade.",
      dataSource: "Dados meteorológicos: Open-Meteo.com (CC BY 4.0) · Locais: GeoNames"
    },
    comparison: { vsYesterday: "Em relação a ontem no mesmo horário", warmer: "mais quente", colder: "mais frio", same: "igual a ontem" },
    meteogram: { title: "Meteograma de 24 horas", subtitle: "Temperatura, ponto de orvalho, pressão e chuva" },
    windSea: {
      title: "Vento e mar",
      currentWind: "Vento atual",
      direction: "Direção",
      beaufort: "Escala de Beaufort",
      force: "Força",
      waveHeight: "Altura das ondas",
      wavePeriod: "Período das ondas",
      seaTemp: "Temperatura do mar",
      noMarine: "Sem dados marinhos: local afastado do mar.",
      animationNote: "Animação baseada na velocidade e direção atuais do vento neste local."
    },
    route: {
      originPlaceholder: "Cidade de partida",
      destPlaceholder: "Cidade de chegada",
      start: "Partida",
      end: "Chegada",
      waypoint: "Ponto intermediário",
      calculating: "Calculando…",
      notFound: "Local não encontrado:",
      error: "Não foi possível calcular o tempo da rota.",
      straightLineNote: "Condições atuais em 5 pontos na linha reta entre as duas cidades (não a rota rodoviária).",
      visibility: "Visibilidade",
      advice: {
        good: "Nenhum fenômeno significativo no trajeto.",
        rain: "Chuva em alguns trechos: reduza a velocidade e aumente a distância de segurança.",
        snow: "Neve no trajeto: verifique a obrigatoriedade de correntes ou pneus de inverno.",
        storm: "Trovoadas no trajeto: considere adiar a partida.",
        wind: "Rajadas fortes: cuidado com veículos altos e em viadutos.",
        fog: "Visibilidade reduzida por nevoeiro em alguns trechos."
      }
    },
    info: {
      globeTitle: "Globo 3D",
      globeText: "Arraste para girar o globo e use a roda do mouse ou os botões + e − para ampliar. O marcador indica o local selecionado.",
      skyTitle: "Simulador do céu",
      skyText: "Use o controle deslizante para ver o céu em diferentes horas do dia, com o tempo atual deste local."
    }
  },

  ru: {
    views: { radar: "Ветер и море" },
    geo: { otherPlaces: "Другие места" },
    minuteCast: {
      title: "Осадки в ближайшие 2 часа",
      subtitle: "Прогноз с шагом 15 минут",
      continuing: "Осадки не менее 2 часов",
      unavailable: "Краткосрочный прогноз для этого места недоступен"
    },
    models: {
      title: "Сравнение погодных моделей",
      subtitle: "Прогноз на сегодня от ведущих метеоцентров",
      agreement: "Согласованность моделей",
      agreementHigh: "Высокая",
      agreementMedium: "Средняя",
      agreementLow: "Низкая",
      colModel: "Модель",
      colResolution: "Разрешение",
      colMaxMin: "Макс / Мин",
      colRain: "Осадки",
      colWind: "Макс. ветер",
      consensus: "Среднее моделей",
      spread: "Разброс моделей"
    },
    biometeo: {
      title: "Здоровье и самочувствие",
      subtitle: "Изменение давления, солнце и пыльца",
      headacheAlert: "Метеочувствительность",
      headacheHigh: "Резкое изменение давления (>3 гПа за 3 часа)",
      maxSunExposure: "Примерное время до солнечного ожога",
      skinTypeIII: "Светлая или средняя кожа (тип III)",
      noUv: "УФ отсутствует: риска ожога нет",
      pollenTitle: "Пыльца (зёрен/м³)",
      pollenNames: { alder: "Ольха", birch: "Берёза", grass: "Злаки", mugwort: "Полынь", olive: "Олива", ragweed: "Амброзия" },
      pollenLevels: { low: "Низкий", medium: "Умеренный", high: "Высокий", veryHigh: "Очень высокий" },
      pollenUnavailable: "Данные о пыльце доступны только для Европы"
    },
    aqi: {
      title: "Качество воздуха",
      noData: "Данные о качестве воздуха недоступны",
      pollutants: { o3: "Озон (O₃)", no2: "Диоксид азота (NO₂)", so2: "Диоксид серы (SO₂)", co: "Угарный газ (CO)" },
      advice: {
        good: "Чистый воздух: идеально для любых занятий на улице.",
        fair: "Хорошее качество: особых мер не требуется.",
        moderate: "Чувствительным людям стоит ограничить длительные нагрузки на улице.",
        poor: "Избегайте интенсивных тренировок на улице.",
        veryPoor: "Сократите время на улице, особенно детям, пожилым и астматикам.",
        hazardous: "По возможности оставайтесь в помещении с закрытыми окнами."
      }
    },
    lifestyle: {
      title: "Занятия и одежда",
      outfitTitle: "Что надеть сегодня?",
      outfit: {
        umbrellaNeeded: "Возьмите зонт или дождевик",
        heavyCoat: "Тёплое пальто, шарф и перчатки",
        jacketSweater: "Лёгкая куртка и свитер",
        lightLayers: "Лёгкие слои: рубашка или толстовка",
        summerClothes: "Лёгкая дышащая летняя одежда",
        windbreaker: "Ветровка",
        sunglassesUv: "Солнцезащитные очки и крем"
      }
    },
    alerts: {
      notOfficial: "Уведомление рассчитано по прогнозу на ближайшие 24 часа и не является официальным предупреждением. Сверьтесь с национальной метеослужбой.",
      yellowWarning: "Внимание: местами сильные явления",
      orangeWarning: "Ожидается опасная погода",
      redWarning: "Ожидается чрезвычайно опасная погода",
      reasons: { thunder: "грозы", gusts: "сильные порывы", heavyRain: "сильный дождь", heavySnow: "сильный снег", fog: "туман" },
      maxGust: "Макс. порыв",
      totalRain: "Осадки 24 ч"
    },
    status: {
      updatedAt: "Обновлено в",
      offlineCached: "Нет соединения: показаны данные последнего обновления.",
      loadError: "Не удалось загрузить погоду. Проверьте подключение.",
      retry: "Повторить",
      loading: "Загрузка погоды…",
      myLocation: "Моё местоположение",
      gpsUnsupported: "Геолокация не поддерживается на этом устройстве.",
      gpsError: "Не удалось определить местоположение. Найдите город вручную.",
      dataSource: "Данные о погоде: Open-Meteo.com (CC BY 4.0) · Места: GeoNames"
    },
    comparison: { vsYesterday: "По сравнению со вчерашним днём в это же время", warmer: "теплее", colder: "холоднее", same: "как вчера" },
    meteogram: { title: "Метеограмма на 24 часа", subtitle: "Температура, точка росы, давление и осадки" },
    windSea: {
      title: "Ветер и море",
      currentWind: "Текущий ветер",
      direction: "Направление",
      beaufort: "Шкала Бофорта",
      force: "Баллы",
      waveHeight: "Высота волн",
      wavePeriod: "Период волн",
      seaTemp: "Температура моря",
      noMarine: "Нет морских данных: место далеко от моря.",
      animationNote: "Анимация основана на текущей скорости и направлении ветра в этом месте."
    },
    route: {
      originPlaceholder: "Город отправления",
      destPlaceholder: "Город прибытия",
      start: "Отправление",
      end: "Прибытие",
      waypoint: "Промежуточная точка",
      calculating: "Расчёт…",
      notFound: "Место не найдено:",
      error: "Не удалось рассчитать погоду на маршруте.",
      straightLineNote: "Текущие условия в 5 точках на прямой между двумя городами (не автомобильный маршрут).",
      visibility: "Видимость",
      advice: {
        good: "Значимых погодных явлений на пути нет.",
        rain: "Дождь на отдельных участках: снизьте скорость и увеличьте дистанцию.",
        snow: "Снег на пути: проверьте требования к цепям или зимней резине.",
        storm: "Грозы на пути: рассмотрите перенос поездки.",
        wind: "Сильные порывы: осторожно на высоких автомобилях и на мостах.",
        fog: "Ухудшение видимости из-за тумана на отдельных участках."
      }
    },
    info: {
      globeTitle: "3D-глобус",
      globeText: "Перетаскивайте, чтобы вращать глобус; колесо мыши или кнопки + и − для масштаба. Метка показывает выбранное место.",
      skyTitle: "Симулятор неба",
      skyText: "Используйте ползунок, чтобы увидеть небо в разное время суток с текущей погодой в этом месте."
    }
  }
};

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== "object") target[key] = {};
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

export function applyDataStrings(translations) {
  for (const lang of Object.keys(translations)) {
    deepMerge(translations[lang], dataStrings[lang] || dataStrings.en);
  }
  return translations;
}
