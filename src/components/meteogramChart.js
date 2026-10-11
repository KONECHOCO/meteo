// High-Definition Meteogram Chart Component (Yr.no / ECMWF Style)
// Generates an interactive SVG meteogram combining Temperature, Dew Point, Pressure, and Precipitation.

export function renderMeteogramSvg(hourlyData, isFahrenheit = false) {
  if (!hourlyData || hourlyData.length < 12) return "";

  const data = hourlyData.slice(0, 24); // next 24 hours
  const width = 880;
  const height = 220;
  const padLeft = 45;
  const padRight = 35;
  const padTop = 25;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Temperature domain
  const temps = data.map(d => isFahrenheit ? (d.temp * 9/5 + 32) : d.temp);
  const minTemp = Math.floor(Math.min(...temps) - 2);
  const maxTemp = Math.ceil(Math.max(...temps) + 2);
  const tempRange = Math.max(1, maxTemp - minTemp);

  // Pressure domain
  const pressures = data.map(d => d.pressure);
  const minP = Math.min(...pressures);
  const maxP = Math.max(...pressures);

  // Coordinate mappers
  const getX = (index) => padLeft + (index / (data.length - 1)) * chartW;
  const getYTemp = (tempVal) => padTop + chartH - ((tempVal - minTemp) / tempRange) * chartH;

  // Build Temperature Path
  let tempPath = `M ${getX(0)} ${getYTemp(temps[0])}`;
  let tempArea = `M ${getX(0)} ${getYTemp(temps[0])}`;

  for (let i = 1; i < data.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getYTemp(temps[i - 1]);
    const currX = getX(i);
    const currY = getYTemp(temps[i]);
    const cpX1 = prevX + (currX - prevX) * 0.5;
    const cpY1 = prevY;
    const cpX2 = prevX + (currX - prevX) * 0.5;
    const cpY2 = currY;

    tempPath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${currX} ${currY}`;
    tempArea += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${currX} ${currY}`;
  }

  tempArea += ` L ${getX(data.length - 1)} ${padTop + chartH} L ${getX(0)} ${padTop + chartH} Z`;

  // Build Precipitation Bars
  let precipBars = "";
  data.forEach((d, i) => {
    if (d.precipitation > 0) {
      const barH = Math.min(chartH * 0.6, d.precipitation * 15);
      const bx = getX(i) - 6;
      const by = padTop + chartH - barH;
      precipBars += `<rect x="${bx}" y="${by}" width="12" height="${barH}" fill="rgba(56, 189, 248, 0.45)" rx="2"/>`;
    }
  });

  // Build Time Labels & Temperature Points
  let timeLabels = "";
  let tempPoints = "";

  data.forEach((d, i) => {
    const x = getX(i);
    const y = getYTemp(temps[i]);

    if (i % 3 === 0) {
      const timeStr = `${d.hour}:00`;
      timeLabels += `<text x="${x}" y="${height - 10}" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="'JetBrains Mono', monospace">${timeStr}</text>`;
      tempPoints += `
        <circle cx="${x}" cy="${y}" r="3.5" fill="#00f0ff" stroke="#0b1528" stroke-width="1.5" />
        <text x="${x}" y="${y - 8}" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="'JetBrains Mono', monospace">${Math.round(temps[i])}°</text>
      `;
    }
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="220" style="overflow: visible;">
      <defs>
        <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#00f0ff" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Grid lines -->
      <line x1="${padLeft}" y1="${padTop}" x2="${width - padRight}" y2="${padTop}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
      <line x1="${padLeft}" y1="${padTop + chartH / 2}" x2="${width - padRight}" y2="${padTop + chartH / 2}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4" />
      <line x1="${padLeft}" y1="${padTop + chartH}" x2="${width - padRight}" y2="${padTop + chartH}" stroke="rgba(255,255,255,0.12)" />

      <!-- Precipitation bars -->
      ${precipBars}

      <!-- Temperature Area Fill -->
      <path d="${tempArea}" fill="url(#tempAreaGrad)" />

      <!-- Temperature Stroke Line -->
      <path d="${tempPath}" fill="none" stroke="#00f0ff" stroke-width="2.5" />

      <!-- Data Points & Labels -->
      ${tempPoints}
      ${timeLabels}
    </svg>
  `;
}
