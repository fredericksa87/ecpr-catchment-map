// =========================================
// ECPR Catchment Analysis — Interactive Map
// Medical City Healthcare
// =========================================

// === HOSPITAL DATA ===
const hospitals = [
  {
    id: 'plano',
    name: 'Medical City Plano',
    shortName: 'Plano',
    address: '3901 W 15th St, Plano, TX 75075',
    lat: 33.0218,
    lng: -96.7667,
    color: '#1a6bb5',
    beds: 624,
    active: true
  },
  {
    id: 'frisco',
    name: 'Medical City Frisco',
    shortName: 'Frisco',
    address: '5500 Frisco Square Blvd, Frisco, TX 75034',
    lat: 33.1510,
    lng: -96.8390,
    color: '#e85d26',
    beds: 98,
    active: true
  },
  {
    id: 'mckinney',
    name: 'Medical City McKinney',
    shortName: 'McKinney',
    address: '4500 Medical Center Dr, McKinney, TX 75069',
    lat: 33.1600,
    lng: -96.6381,
    color: '#2ca05a',
    beds: 311,
    active: true
  },
  {
    id: 'sachse',
    name: 'Medical City Sachse',
    shortName: 'Sachse',
    address: '4750 President George Bush Hwy, Sachse, TX 75048',
    lat: 32.9527,
    lng: -96.5793,
    color: '#9b59b6',
    beds: 32,
    active: true
  },
  {
    id: 'lascolinas',
    name: 'Medical City Las Colinas',
    shortName: 'Las Colinas',
    address: '6800 N MacArthur Blvd, Irving, TX 75039',
    lat: 32.9022,
    lng: -96.9570,
    color: '#e6a817',
    beds: 80,
    active: true
  },
  {
    id: 'lewisville',
    name: 'Medical City Lewisville',
    shortName: 'Lewisville',
    address: '500 W Main St, Lewisville, TX 75057',
    lat: 33.0445,
    lng: -97.0050,
    color: '#14a098',
    beds: 191,
    active: true
  }
];

// === CITY POPULATION DATA ===
// Source: NCTCOG 2025 Population Estimates Publication (January 1, 2025)
// Cross-verified against US Census Bureau Vintage 2024 estimates
// 63 cities across Collin, Denton, Dallas, Tarrant, Rockwall, and Kaufman counties
// within potential 45-min EMS lights-and-sirens reach of any of the 5 hospitals
const cities = [
  // Collin County (NCTCOG 2025)
  { name: 'Plano', lat: 33.0198, lng: -96.6989, pop: 299262, county: 'Collin' },
  { name: 'Frisco', lat: 33.1507, lng: -96.8236, pop: 235615, county: 'Collin' },
  { name: 'McKinney', lat: 33.1972, lng: -96.6397, pop: 226181, county: 'Collin' },
  { name: 'Allen', lat: 33.1032, lng: -96.6706, pop: 107328, county: 'Collin' },
  { name: 'Wylie', lat: 33.0151, lng: -96.5389, pop: 62918, county: 'Collin' },
  { name: 'Prosper', lat: 33.2362, lng: -96.8011, pop: 46087, county: 'Collin' },
  { name: 'Princeton', lat: 33.1801, lng: -96.4981, pop: 43126, county: 'Collin' },
  { name: 'Anna', lat: 33.3490, lng: -96.5486, pop: 34100, county: 'Collin' },
  { name: 'Sachse', lat: 32.9762, lng: -96.5953, pop: 30491, county: 'Collin/Dallas' },
  { name: 'Melissa', lat: 33.2860, lng: -96.5727, pop: 26234, county: 'Collin' },
  { name: 'Murphy', lat: 33.0151, lng: -96.6131, pop: 21172, county: 'Collin' },
  { name: 'Celina', lat: 33.3248, lng: -96.7847, pop: 61834, county: 'Collin' },
  { name: 'Fairview', lat: 33.1580, lng: -96.6320, pop: 11282, county: 'Collin' },
  { name: 'Lucas', lat: 33.0840, lng: -96.5770, pop: 8378, county: 'Collin' },
  { name: 'Lavon', lat: 33.0270, lng: -96.4340, pop: 11396, county: 'Collin' },
  // Denton County (NCTCOG 2025)
  { name: 'Denton', lat: 33.2148, lng: -97.1331, pop: 159518, county: 'Denton' },
  { name: 'Lewisville', lat: 33.0462, lng: -96.9942, pop: 140880, county: 'Denton' },
  { name: 'Flower Mound', lat: 33.0146, lng: -97.0970, pop: 82344, county: 'Denton' },
  { name: 'Little Elm', lat: 33.1626, lng: -96.9376, pop: 61343, county: 'Denton' },
  { name: 'The Colony', lat: 33.0884, lng: -96.8916, pop: 47308, county: 'Denton' },
  { name: 'Corinth', lat: 33.1543, lng: -97.0658, pop: 24204, county: 'Denton' },
  { name: 'Highland Village', lat: 33.0918, lng: -97.0467, pop: 16150, county: 'Denton' },
  { name: 'Northlake', lat: 33.1249, lng: -97.1658, pop: 14448, county: 'Denton' },
  { name: 'Trophy Club', lat: 33.0017, lng: -97.1836, pop: 14420, county: 'Denton' },
  { name: 'Providence Village', lat: 33.2333, lng: -96.9667, pop: 10358, county: 'Denton' },
  { name: 'Aubrey', lat: 33.3040, lng: -96.9862, pop: 9801, county: 'Denton' },
  { name: 'Lake Dallas', lat: 33.1190, lng: -97.0253, pop: 7843, county: 'Denton' },
  { name: 'Argyle', lat: 33.1210, lng: -97.1833, pop: 6869, county: 'Denton' },
  { name: 'Oak Point', lat: 33.1905, lng: -96.9933, pop: 6248, county: 'Denton' },
  // Dallas County (NCTCOG 2025)
  { name: 'Dallas (N)', lat: 32.8503, lng: -96.8543, pop: 692995, county: 'Dallas' }, // North half — full city 1,385,989
  { name: 'Irving', lat: 32.8140, lng: -96.9489, pop: 266162, county: 'Dallas' },
  { name: 'Garland', lat: 32.9126, lng: -96.6389, pop: 251932, county: 'Dallas' },
  { name: 'Grand Prairie', lat: 32.7460, lng: -96.9978, pop: 215210, county: 'Dallas' },
  { name: 'Mesquite', lat: 32.7668, lng: -96.5992, pop: 157436, county: 'Dallas' },
  { name: 'Carrollton', lat: 32.9537, lng: -96.8903, pop: 136543, county: 'Dallas' },
  { name: 'Richardson', lat: 32.9483, lng: -96.7298, pop: 122745, county: 'Dallas' },
  { name: 'Rowlett', lat: 32.9029, lng: -96.5639, pop: 67519, county: 'Dallas' },
  { name: 'DeSoto', lat: 32.5899, lng: -96.8570, pop: 58271, county: 'Dallas' },
  { name: 'Cedar Hill', lat: 32.5885, lng: -96.9563, pop: 51784, county: 'Dallas' },
  { name: 'Coppell', lat: 32.9546, lng: -97.0150, pop: 43196, county: 'Dallas/Denton' },
  { name: 'Lancaster', lat: 32.5921, lng: -96.7561, pop: 42394, county: 'Dallas' },
  { name: 'Duncanville', lat: 32.6518, lng: -96.9086, pop: 40779, county: 'Dallas' },
  { name: 'Farmers Branch', lat: 32.9263, lng: -96.8961, pop: 40246, county: 'Dallas' },
  { name: 'Balch Springs', lat: 32.7290, lng: -96.6226, pop: 28581, county: 'Dallas' },
  { name: 'University Park', lat: 32.8504, lng: -96.8001, pop: 25574, county: 'Dallas' },
  { name: 'Seagoville', lat: 32.6394, lng: -96.5378, pop: 20866, county: 'Dallas' },
  { name: 'Glenn Heights', lat: 32.5488, lng: -96.8561, pop: 19883, county: 'Dallas' },
  { name: 'Addison', lat: 32.9612, lng: -96.8292, pop: 17837, county: 'Dallas' },
  { name: 'Sunnyvale', lat: 32.7966, lng: -96.5607, pop: 9491, county: 'Dallas' },
  { name: 'Highland Park', lat: 32.8335, lng: -96.7920, pop: 8793, county: 'Dallas' },
  // Tarrant County — Las Colinas catchment (NCTCOG 2025)
  { name: 'North Richland Hills', lat: 32.8343, lng: -97.2289, pop: 74859, county: 'Tarrant' },
  { name: 'Euless', lat: 32.8370, lng: -97.0820, pop: 61601, county: 'Tarrant' },
  { name: 'Grapevine', lat: 32.9343, lng: -97.0781, pop: 52346, county: 'Tarrant' },
  { name: 'Bedford', lat: 32.8440, lng: -97.1430, pop: 49941, county: 'Tarrant' },
  { name: 'Hurst', lat: 32.8234, lng: -97.1706, pop: 40454, county: 'Tarrant' },
  { name: 'Southlake', lat: 32.9412, lng: -97.1341, pop: 32320, county: 'Tarrant/Denton' },
  { name: 'Colleyville', lat: 32.8810, lng: -97.1550, pop: 26599, county: 'Tarrant' },
  // Rockwall County (NCTCOG 2025)
  { name: 'Rockwall', lat: 32.9313, lng: -96.4597, pop: 53390, county: 'Rockwall' },
  { name: 'Fate', lat: 32.9413, lng: -96.3814, pop: 28772, county: 'Rockwall' },
  { name: 'Royse City', lat: 32.9751, lng: -96.3323, pop: 24313, county: 'Rockwall' },
  { name: 'Heath', lat: 32.8369, lng: -96.4720, pop: 10464, county: 'Rockwall' },
  // Kaufman County (NCTCOG 2025)
  { name: 'Forney', lat: 32.7481, lng: -96.4719, pop: 31224, county: 'Kaufman' },
  { name: 'Terrell', lat: 32.7360, lng: -96.2753, pop: 22977, county: 'Kaufman' },
];

// === EPIDEMIOLOGICAL CONSTANTS ===
// OHCA incidence: 110/100k per year (EMS-assessed, non-traumatic)
// Source: Nature (2026) doi:10.1038/s44325-026-00108-7; AHA Heart Stats 2019
// Note: EMS-treated subset is ~57/100k (CARES). Using 110 to capture full burden.
const OHCA_INCIDENCE_PER_100K = 110;
// CARES 2024: 18.1% present with shockable rhythm (VF/pVT)
const SHOCKABLE_RHYTHM_RATE = 0.181;
// ~83% of shockable OHCA are age 18-75 (based on median age 63, distribution modeling)
const AGE_18_75_RATE = 0.83;
// ECPR eligibility as % of total OHCA (already includes shockable + age filter):
// Reference: 1.65M pop → 1,815 OHCA → 270-315 ECPR eligible
// 270/1815 = 14.9%, 315/1815 = 17.4% of TOTAL OHCA
// This rate already accounts for: shockable rhythm, age 18-75, witnessed, bystander CPR
const ECPR_ELIGIBLE_PCT_OF_OHCA_LOW = 0.149;
const ECPR_ELIGIBLE_PCT_OF_OHCA_HIGH = 0.174;
// Conservative activation: ~15-19% of eligible meet full refractory criteria
// Reference: 40-60 activations from 270-315 eligible = 14.8-19.0%
const ACTIVATION_PCT_OF_ELIGIBLE_LOW = 0.148;
const ACTIVATION_PCT_OF_ELIGIBLE_HIGH = 0.190;

// 45-minute EMS transport radius (straight-line / Haversine)
// Research basis: Houston ECPR geospatial study (PEC 2024) used 10–15 mi drive distances;
// EROCA trial targeted 911-to-ED ≤30 min; ARREST trial estimated transport <30 min.
// DFW suburban roads add ~1.35× over straight-line distance.
// 27 km crow-flies ≈ 36.5 km driving ≈ 22.7 mi at ~35-40 mph = ~34–39 min transport.
// Calibrated against reference data: Frisco-only → ~1.64M pop, ~1,803 OHCA,
// 269–314 ECPR eligible, 40–60 activations — matches published ECPR catchment modeling.
const CATCHMENT_RADIUS_KM = 27;

// === HELPER FUNCTIONS ===
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return '~' + Math.round(n).toLocaleString();
  return '~' + Math.round(n).toString();
}

function formatRange(low, high) {
  return Math.round(low).toLocaleString() + ' – ' + Math.round(high).toLocaleString();
}

// Get cities within a hospital's catchment
function getCitiesInCatchment(hospital) {
  return cities.filter(city => {
    const dist = haversineDistance(hospital.lat, hospital.lng, city.lat, city.lng);
    return dist <= CATCHMENT_RADIUS_KM;
  });
}

// Calculate stats for a single hospital
function calcHospitalStats(hospital) {
  const catchmentCities = getCitiesInCatchment(hospital);
  const population = catchmentCities.reduce((sum, c) => sum + c.pop, 0);
  const ohca = population * OHCA_INCIDENCE_PER_100K / 100000;
  const ecprEligibleLow = ohca * ECPR_ELIGIBLE_PCT_OF_OHCA_LOW;
  const ecprEligibleHigh = ohca * ECPR_ELIGIBLE_PCT_OF_OHCA_HIGH;

  return {
    population,
    ohca: Math.round(ohca),
    shockableOHCA: Math.round(ohca * SHOCKABLE_RHYTHM_RATE),
    ecprEligibleLow: Math.round(ecprEligibleLow),
    ecprEligibleHigh: Math.round(ecprEligibleHigh),
    activationLow: Math.round(ecprEligibleLow * ACTIVATION_PCT_OF_ELIGIBLE_LOW),
    activationHigh: Math.round(ecprEligibleHigh * ACTIVATION_PCT_OF_ELIGIBLE_HIGH),
    cityCount: catchmentCities.length,
    cities: catchmentCities
  };
}

// Calculate combined stats (deduplicated cities)
function calcCombinedStats() {
  const activeHospitals = hospitals.filter(h => h.active);
  if (activeHospitals.length === 0) {
    return { population: 0, ohca: 0, shockableOHCA: 0, ecprEligibleLow: 0, ecprEligibleHigh: 0, activationLow: 0, activationHigh: 0 };
  }

  // Deduplicate cities across all active catchments
  const coveredCities = new Set();
  activeHospitals.forEach(h => {
    getCitiesInCatchment(h).forEach(c => coveredCities.add(c.name));
  });

  const uniqueCities = cities.filter(c => coveredCities.has(c.name));
  const population = uniqueCities.reduce((sum, c) => sum + c.pop, 0);
  const ohca = population * OHCA_INCIDENCE_PER_100K / 100000;
  const ecprEligibleLow = ohca * ECPR_ELIGIBLE_PCT_OF_OHCA_LOW;
  const ecprEligibleHigh = ohca * ECPR_ELIGIBLE_PCT_OF_OHCA_HIGH;

  return {
    population,
    ohca: Math.round(ohca),
    shockableOHCA: Math.round(ohca * SHOCKABLE_RHYTHM_RATE),
    ecprEligibleLow: Math.round(ecprEligibleLow),
    ecprEligibleHigh: Math.round(ecprEligibleHigh),
    activationLow: Math.round(ecprEligibleLow * ACTIVATION_PCT_OF_ELIGIBLE_LOW),
    activationHigh: Math.round(ecprEligibleHigh * ACTIVATION_PCT_OF_ELIGIBLE_HIGH)
  };
}


// === INITIALIZE MAP ===
const map = L.map('map', {
  center: [33.02, -96.75],
  zoom: 10,
  zoomControl: true,
  attributionControl: true
});

// Use CartoDB Positron for a clean, executive-friendly basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com" target="_blank" rel="noopener noreferrer">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);


// === MAP LAYERS ===
const catchmentLayers = {};
const markerLayers = {};
const cityMarkerLayers = [];

// Create circle for catchment area
function createCatchment(hospital) {
  return L.circle([hospital.lat, hospital.lng], {
    radius: CATCHMENT_RADIUS_KM * 1000,
    color: hospital.color,
    weight: 2.5,
    opacity: 0.85,
    fillColor: hospital.color,
    fillOpacity: 0.10,
    dashArray: null
  });
}

// Create hospital marker
function createMarker(hospital) {
  const icon = L.divIcon({
    className: 'hospital-marker',
    html: `<div class="hospital-marker-inner" style="background:${hospital.color}"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const stats = calcHospitalStats(hospital);
  const popupContent = `
    <div class="hospital-popup">
      <h3>${hospital.name}</h3>
      <p class="popup-address">${hospital.address}</p>
      <div class="popup-stats">
        <div class="popup-stat">
          <span class="popup-stat-label">Licensed Beds</span>
          <span class="popup-stat-value">${hospital.beds}</span>
        </div>
        <div class="popup-stat">
          <span class="popup-stat-label">Catchment Pop.</span>
          <span class="popup-stat-value">${formatNumber(stats.population)}</span>
        </div>
        <div class="popup-stat">
          <span class="popup-stat-label">Annual OHCA</span>
          <span class="popup-stat-value">~${stats.ohca.toLocaleString()}</span>
        </div>
        <div class="popup-stat">
          <span class="popup-stat-label">Shockable OHCA</span>
          <span class="popup-stat-value">~${stats.shockableOHCA.toLocaleString()}</span>
        </div>
        <div class="popup-stat">
          <span class="popup-stat-label">ECPR Eligible (18-75)</span>
          <span class="popup-stat-value">${stats.ecprEligibleLow} – ${stats.ecprEligibleHigh}</span>
        </div>
        <div class="popup-stat">
          <span class="popup-stat-label">Activation Goal/yr</span>
          <span class="popup-stat-value">${stats.activationLow} – ${stats.activationHigh}</span>
        </div>
        <div class="popup-stat">
          <span class="popup-stat-label">Cities Covered</span>
          <span class="popup-stat-value">${stats.cityCount}</span>
        </div>
      </div>
    </div>
  `;

  const marker = L.marker([hospital.lat, hospital.lng], { icon, zIndexOffset: 1000 });
  marker.bindPopup(popupContent, { maxWidth: 280, className: 'hospital-popup-wrapper' });
  return marker;
}

// Initialize all layers
hospitals.forEach(h => {
  catchmentLayers[h.id] = createCatchment(h);
  markerLayers[h.id] = createMarker(h);
});


// === SIDEBAR CONTROLS ===
function buildToggles() {
  const container = document.getElementById('hospitalToggles');
  container.innerHTML = '';

  hospitals.forEach(h => {
    const el = document.createElement('div');
    el.className = `hospital-toggle${h.active ? ' active' : ''}`;
    el.innerHTML = `
      <div class="toggle-color" style="background:${h.color}; color:${h.color}"></div>
      <div class="toggle-info">
        <div class="toggle-name">${h.name}</div>
        <div class="toggle-address">${h.address}</div>
      </div>
      <div class="toggle-switch"></div>
    `;
    el.addEventListener('click', () => {
      h.active = !h.active;
      updateMap();
      buildToggles();
      clearActivePreset();
    });
    container.appendChild(el);
  });
}

function buildLegend() {
  const container = document.getElementById('legendItems');
  container.innerHTML = '';
  hospitals.forEach(h => {
    if (!h.active) return;
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-swatch" style="background:${h.color}; opacity:0.5"></span>
      <span>${h.shortName}</span>
    `;
    container.appendChild(item);
  });
}

// Track previous stat values for change highlighting
let prevStats = { population: 0, ohca: 0, ecprEligibleLow: 0, ecprEligibleHigh: 0, activationLow: 0, activationHigh: 0 };

// Generate scenario label from active hospitals
function getScenarioLabel() {
  const active = hospitals.filter(h => h.active);
  if (active.length === 0) return 'No Centers Selected';
  if (active.length === hospitals.length) return `All ${hospitals.length} Centers Active`;
  if (active.length === 1) return active[0].shortName + ' Only';
  return active.map(h => h.shortName).join(' + ');
}

// Animate stat value change
function updateStatWithHighlight(elementId, newValue) {
  const el = document.getElementById(elementId);
  const oldValue = el.textContent;
  el.textContent = newValue;
  if (oldValue !== newValue && oldValue !== '—') {
    el.classList.add('value-changed');
    setTimeout(() => el.classList.remove('value-changed'), 800);
  }
}

// Build per-hospital breakdown table
function buildBreakdown() {
  const container = document.getElementById('hospitalBreakdown');
  const activeHospitals = hospitals.filter(h => h.active);

  if (activeHospitals.length === 0) {
    container.innerHTML = '';
    return;
  }

  const rows = activeHospitals.map(h => {
    const stats = calcHospitalStats(h);
    return { hospital: h, stats };
  });

  // Combined (deduplicated)
  const combined = calcCombinedStats();

  let html = `
    <div class="breakdown-heading">Per-Center Breakdown</div>
    <table class="breakdown-table">
      <thead>
        <tr>
          <th>Center</th>
          <th>Pop.</th>
          <th>OHCA</th>
          <th>Eligible</th>
          <th>Goal</th>
        </tr>
      </thead>
      <tbody>
  `;

  rows.forEach(r => {
    html += `
      <tr>
        <td>
          <div class="hospital-name-cell">
            <span class="breakdown-dot" style="background:${r.hospital.color}"></span>
            ${r.hospital.shortName}
          </div>
        </td>
        <td>${(r.stats.population / 1e6).toFixed(2)}M</td>
        <td>${r.stats.ohca.toLocaleString()}</td>
        <td>${r.stats.ecprEligibleLow}–${r.stats.ecprEligibleHigh}</td>
        <td>${r.stats.activationLow}–${r.stats.activationHigh}</td>
      </tr>
    `;
  });

  // Add combined total row if more than one active
  if (activeHospitals.length > 1) {
    html += `
      <tr class="total-row">
        <td><strong>Combined*</strong></td>
        <td>${(combined.population / 1e6).toFixed(2)}M</td>
        <td>${combined.ohca.toLocaleString()}</td>
        <td>${combined.ecprEligibleLow}–${combined.ecprEligibleHigh}</td>
        <td>${combined.activationLow}–${combined.activationHigh}</td>
      </tr>
    `;
  }

  html += `</tbody></table>`;

  if (activeHospitals.length > 1) {
    html += `<div class="breakdown-note">*Combined totals de-duplicate overlapping cities across catchment areas.</div>`;
  }

  container.innerHTML = html;
}

// === UPDATE MAP ===
function updateMap() {
  // Remove all layers
  hospitals.forEach(h => {
    if (map.hasLayer(catchmentLayers[h.id])) map.removeLayer(catchmentLayers[h.id]);
    if (map.hasLayer(markerLayers[h.id])) map.removeLayer(markerLayers[h.id]);
  });

  // Re-add active ones
  hospitals.forEach(h => {
    if (h.active) {
      // Recreate to update popup stats
      catchmentLayers[h.id] = createCatchment(h);
      markerLayers[h.id] = createMarker(h);
      catchmentLayers[h.id].addTo(map);
      markerLayers[h.id].addTo(map);
    }
  });

  // Update scenario label
  const scenarioEl = document.getElementById('scenarioLabel');
  const newLabel = getScenarioLabel();
  if (scenarioEl.textContent !== newLabel) {
    scenarioEl.textContent = newLabel;
    scenarioEl.classList.add('scenario-changed');
    setTimeout(() => scenarioEl.classList.remove('scenario-changed'), 600);
  }

  // Update stats panel with highlight animation
  const combined = calcCombinedStats();
  updateStatWithHighlight('statPop', formatNumber(combined.population));
  updateStatWithHighlight('statOHCA', '~' + combined.ohca.toLocaleString());
  updateStatWithHighlight('statECPR', formatRange(combined.ecprEligibleLow, combined.ecprEligibleHigh));
  updateStatWithHighlight('statGoal', formatRange(combined.activationLow, combined.activationHigh));

  prevStats = combined;

  // Build breakdown table
  buildBreakdown();

  buildLegend();

  // Fit map to active catchments
  const activeHospitals = hospitals.filter(h => h.active);
  if (activeHospitals.length > 0) {
    const group = L.featureGroup(activeHospitals.map(h => catchmentLayers[h.id]));
    map.fitBounds(group.getBounds().pad(0.05), { animate: true, duration: 0.5 });
  }
}


// === PRESET SCENARIOS ===
const presets = {
  'all': ['plano', 'frisco', 'mckinney', 'sachse', 'lascolinas', 'lewisville'],
  'plano-only': ['plano'],
  'frisco-only': ['frisco'],
  'plano-frisco': ['plano', 'frisco'],
  'north': ['plano', 'frisco', 'mckinney'],
  'east-west': ['sachse', 'lascolinas']
};

function applyPreset(presetId) {
  const activeIds = presets[presetId] || [];
  hospitals.forEach(h => {
    h.active = activeIds.includes(h.id);
  });
  updateMap();
  buildToggles();

  // Highlight active preset button
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active-preset', btn.dataset.preset === presetId);
  });
}

function clearActivePreset() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.remove('active-preset');
  });
}

document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
});


// County and city labels removed - basemap tiles already contain these labels


// === INIT ===
buildToggles();
applyPreset('all');

// Set "All Centers" as the initial active preset
document.querySelector('[data-preset="all"]').classList.add('active-preset');
