import React, { useState, useEffect, useRef, useMemo } from 'react';
import QRCode from 'qrcode';
import { 
  Sparkles, Droplets, Sun, Moon, Sunset, Zap, Layers, Sprout, 
  Sliders, Trash2, FlipHorizontal, ArrowUp, 
  ArrowDown, ZoomIn, ZoomOut, CheckCircle2, AlertTriangle, 
  Camera, RefreshCw, Eye, EyeOff, Volume2, VolumeX, Plus,
  ShieldCheck, ChevronRight, ChevronLeft, Maximize2, Minimize2,
  Undo2, Redo2, Share2, Copy, Save, Bookmark, Check, X, Download, FolderHeart, ExternalLink, FileDown, Upload,
  Play, Pause, Clock, CloudRain, Wind,
  BookOpen, ShoppingBag, ClipboardCheck, Printer, Search, RotateCcw, Info, Globe,
  Wand2, Lock, Unlock, CopyPlus, Thermometer, Grid, FileText, QrCode, Palette
} from 'lucide-react';

// ==========================================
// 1. DATA DEFINITIONS & ASSETS
// ==========================================

const VESSELS = [
  {
    id: 'apothecary',
    name: 'Apothecary Jar',
    subtitle: 'Classic closed-top cylindrical glass with cork lid',
    type: 'closed',
    humidityRetention: 1.2,
    clipPath: 'M 140 85 L 260 85 L 260 110 C 310 120 330 155 330 210 L 330 410 C 330 445 300 465 255 465 L 145 465 C 100 465 70 445 70 410 L 70 210 C 70 155 90 120 140 110 Z',
    outlinePath: 'M 140 85 L 260 85 L 260 110 C 310 120 330 155 330 210 L 330 410 C 330 445 300 465 255 465 L 145 465 C 100 465 70 445 70 410 L 70 210 C 70 155 90 120 140 110 Z',
    lidPath: 'M 144 62 L 256 62 L 250 96 L 150 96 Z',
    lidType: 'cork',
    soilBaseY: 465,
    soilMaxHeight: 165,
    highlightPath: 'M 90 210 L 90 400 C 90 425 105 440 130 445',
  },
  {
    id: 'wardian',
    name: 'Geometric Wardian',
    subtitle: 'Victorian faceted brass & glass conservatory case',
    type: 'semi-closed',
    humidityRetention: 1.0,
    clipPath: 'M 200 60 L 325 145 L 345 360 L 285 465 L 115 465 L 55 360 L 75 145 Z',
    outlinePath: 'M 200 60 L 325 145 L 345 360 L 285 465 L 115 465 L 55 360 L 75 145 Z',
    facetLines: 'M 200 60 L 200 175 M 75 145 L 200 175 L 325 145 M 200 175 L 200 385 M 55 360 L 200 385 L 345 360 M 200 385 L 115 465 M 200 385 L 285 465',
    lidType: 'brass',
    soilBaseY: 465,
    soilMaxHeight: 160,
    highlightPath: 'M 88 165 L 72 345 L 122 440',
  },
  {
    id: 'globe',
    name: 'Hanging Aerium Globe',
    subtitle: 'Suspended spherical glass with wide front opening',
    type: 'open',
    humidityRetention: 0.75,
    clipPath: 'M 200 85 C 305 85 365 165 365 275 C 365 385 305 465 200 465 C 95 465 35 385 35 275 C 35 165 95 85 200 85 Z',
    outlinePath: 'M 200 85 C 305 85 365 165 365 275 C 365 385 305 465 200 465 C 95 465 35 385 35 275 C 35 165 95 85 200 85 Z',
    rimPath: 'M 200 45 L 200 85 M 185 85 A 15 8 0 1 1 215 85',
    openingEllipse: { cx: 200, cy: 235, rx: 95, ry: 75 },
    lidType: 'open-hole',
    soilBaseY: 465,
    soilMaxHeight: 155,
    highlightPath: 'M 65 215 C 48 280 72 375 135 435',
  },
  {
    id: 'fishbowl',
    name: 'Wide Bubble Bowl',
    subtitle: 'Open-top low profile bowl ideal for succulents & moss',
    type: 'open',
    humidityRetention: 0.85,
    clipPath: 'M 105 125 L 295 125 C 355 180 370 285 345 380 C 325 440 275 465 200 465 C 125 465 75 440 55 380 C 30 285 45 180 105 125 Z',
    outlinePath: 'M 105 125 L 295 125 C 355 180 370 285 345 380 C 325 440 275 465 200 465 C 125 465 75 440 55 380 C 30 285 45 180 105 125 Z',
    topEllipse: { cx: 200, cy: 125, rx: 95, ry: 12 },
    lidType: 'none',
    soilBaseY: 465,
    soilMaxHeight: 160,
    highlightPath: 'M 68 230 C 55 300 70 390 125 440',
  },
  {
    id: 'flask',
    name: 'Conical Erlenmeyer',
    subtitle: 'Laboratory borosilicate flask for high-humidity micro-flora',
    type: 'closed',
    humidityRetention: 1.25,
    clipPath: 'M 162 75 L 238 75 L 238 155 L 352 405 C 365 440 345 465 305 465 L 95 465 C 55 465 35 440 48 405 L 162 155 Z',
    outlinePath: 'M 162 75 L 238 75 L 238 155 L 352 405 C 365 440 345 465 305 465 L 95 465 C 55 465 35 440 48 405 L 162 155 Z',
    lidPath: 'M 166 50 L 234 50 L 229 88 L 171 88 Z',
    lidType: 'cork',
    soilBaseY: 465,
    soilMaxHeight: 155,
    highlightPath: 'M 168 175 L 75 395 C 68 415 78 440 108 445',
  },
  {
    id: 'paludarium',
    name: 'Paludarium Waterfall Tank',
    subtitle: 'Half-aquatic front shelf with stone waterfall ledge & mist basin',
    type: 'semi-closed',
    humidityRetention: 1.15,
    clipPath: 'M 60 90 L 340 90 L 340 465 L 60 465 Z',
    outlinePath: 'M 60 90 L 340 90 L 340 465 L 60 465 Z',
    facetLines: 'M 60 90 L 340 90 M 60 465 L 340 465 M 60 300 L 220 300 L 220 465',
    lidType: 'open-top',
    soilBaseY: 465,
    soilMaxHeight: 165,
    highlightPath: 'M 72 105 L 72 445',
  },
  {
    id: 'horizontal_bottle',
    name: 'Horizontal Cylinder ("Ship-in-Bottle")',
    subtitle: 'Panoramic horizontal apothecary cylinder with side cork stopper',
    type: 'closed',
    humidityRetention: 1.2,
    clipPath: 'M 65 210 C 65 155 95 135 180 135 L 315 135 C 345 135 365 155 365 210 L 365 375 C 365 425 345 448 315 448 L 180 448 C 95 448 65 425 65 375 Z',
    outlinePath: 'M 65 210 C 65 155 95 135 180 135 L 315 135 C 345 135 365 155 365 210 L 365 375 C 365 425 345 448 315 448 L 180 448 C 95 448 65 425 65 375 Z',
    neckPath: 'M 365 270 L 388 270 L 388 318 L 365 318',
    lidPath: 'M 386 266 L 398 266 L 398 322 L 386 322 Z',
    lidType: 'cork-side',
    soilBaseY: 448,
    soilMaxHeight: 135,
    highlightPath: 'M 85 155 L 295 155',
  },
  {
    id: 'hex_lantern',
    name: 'Hexagonal Conservatory Lantern',
    subtitle: 'Gothic Victorian faceted brass lantern with steeple roof & hanging ring',
    type: 'semi-closed',
    humidityRetention: 1.05,
    clipPath: 'M 200 45 L 320 120 L 335 390 L 270 465 L 130 465 L 65 390 L 80 120 Z',
    outlinePath: 'M 200 45 L 320 120 L 335 390 L 270 465 L 130 465 L 65 390 L 80 120 Z',
    facetLines: 'M 200 45 L 200 150 M 80 120 L 200 150 L 320 120 M 200 150 L 200 410 M 65 390 L 200 410 L 335 390 M 200 410 L 130 465 M 200 410 L 270 465',
    lidType: 'brass-steeple',
    steepleRing: 'M 200 20 A 10 10 0 1 1 200 40 A 10 10 0 1 1 200 20',
    soilBaseY: 465,
    soilMaxHeight: 160,
    highlightPath: 'M 95 140 L 78 375',
  }
];

const GLASS_TINTS = {
  clear: {
    id: 'clear',
    name: 'Borosilicate Clear',
    sheen: 'rgba(255,255,255,0.22)',
    vesselTint: 'rgba(255,255,255,0.02)',
    filter: 'none'
  },
  amber: {
    id: 'amber',
    name: 'Apothecary Amber',
    sheen: 'rgba(251,191,36,0.32)',
    vesselTint: 'rgba(180,83,9,0.14)',
    filter: 'sepia(35%) saturate(140%) hue-rotate(-20deg)'
  },
  seaglass: {
    id: 'seaglass',
    name: 'Emerald Sea-Glass',
    sheen: 'rgba(52,211,153,0.32)',
    vesselTint: 'rgba(5,150,105,0.12)',
    filter: 'hue-rotate(55deg) saturate(125%)'
  },
  smoked: {
    id: 'smoked',
    name: 'Obsidian Noir',
    sheen: 'rgba(148,163,184,0.25)',
    vesselTint: 'rgba(15,23,42,0.26)',
    filter: 'contrast(110%) brightness(92%)'
  }
};

const PEDESTAL_BASES = {
  walnut: {
    id: 'walnut',
    name: 'Walnut Hardwood',
    rimColor: '#291d15',
    topColor: '#3d2b1f',
    stroke: '#423023'
  },
  brass: {
    id: 'brass',
    name: 'Brushed Brass',
    rimColor: '#854d0e',
    topColor: '#ca8a04',
    stroke: '#eab308'
  },
  marble: {
    id: 'marble',
    name: 'Carrara Marble',
    rimColor: '#cbd5e1',
    topColor: '#f1f5f9',
    stroke: '#94a3b8'
  },
  led_halo: {
    id: 'led_halo',
    name: 'Illuminated LED Halo',
    rimColor: '#0f172a',
    topColor: '#1e293b',
    stroke: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.6)'
  },
  none: {
    id: 'none',
    name: 'Bare Glass (No Base)',
    rimColor: 'transparent',
    topColor: 'transparent',
    stroke: 'transparent'
  }
};

const SUBSTRATE_CONFIG = [
  {
    key: 'pebbles',
    name: 'Leca & Drainage Gravel',
    role: 'False bottom to prevent root rot',
    color: '#8c7a6b',
    secondaryColor: '#6e5d4f',
    recommendedMin: 18,
    recommendedMax: 45,
    pattern: 'pebbles'
  },
  {
    key: 'charcoal',
    name: 'Activated Horticultural Charcoal',
    role: 'Filters toxins, odors & prevents mold growth',
    color: '#23272a',
    secondaryColor: '#111315',
    recommendedMin: 6,
    recommendedMax: 20,
    pattern: 'charcoal'
  },
  {
    key: 'moss',
    name: 'Sphagnum Moss Barrier',
    role: 'Stops soil from sifting into drainage layer',
    color: '#789252',
    secondaryColor: '#5c743b',
    recommendedMin: 8,
    recommendedMax: 25,
    pattern: 'moss'
  },
  {
    key: 'soil',
    name: 'ABG Nutrient Bio-Soil',
    role: 'Rich organic medium for root development',
    color: '#473121',
    secondaryColor: '#332215',
    recommendedMin: 25,
    recommendedMax: 65,
    pattern: 'soil'
  },
  {
    key: 'sand',
    name: 'Silica Desert Top-Sand',
    role: 'Decorative arid top-dressing or strata accent',
    color: '#dfc18b',
    secondaryColor: '#cda96d',
    recommendedMin: 0,
    recommendedMax: 45,
    pattern: 'sand'
  }
];

// ==========================================
// 1.5 LOCAL CURRENCY & FX REGIONAL ENGINE
// ==========================================

const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.77, flag: '🇬🇧' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5, flag: '🇮🇳' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52, flag: '🇦🇺' },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rate: 3.75, flag: '🇸🇦' },
  QAR: { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', rate: 3.64, flag: '🇶🇦' },
  KWD: { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', rate: 0.31, flag: '🇰🇼' },
  OMR: { code: 'OMR', symbol: 'OMR', name: 'Omani Rial', rate: 0.38, flag: '🇴🇲' },
  BHD: { code: 'BHD', symbol: 'BHD', name: 'Bahraini Dinar', rate: 0.38, flag: '🇧🇭' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.32, flag: '🇸🇬' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 152.0, flag: '🇯🇵' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.87, flag: '🇨🇭' },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.40, flag: '🇧🇷' }
};

const detectUserCurrency = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || '').toLowerCase();

    // 1. Timezone-based auto-detection (100% client-side, zero latency, privacy-preserving)
    if (tz.includes('Dubai') || tz.includes('Abu_Dhabi') || tz.includes('Muscat')) return 'AED';
    if (tz.includes('Riyadh')) return 'SAR';
    if (tz.includes('Qatar')) return 'QAR';
    if (tz.includes('Kuwait')) return 'KWD';
    if (tz.includes('Bahrain')) return 'BHD';
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Delhi')) return 'INR';
    if (tz.includes('London')) return 'GBP';
    if (tz.includes('Paris') || tz.includes('Berlin') || tz.includes('Rome') || tz.includes('Madrid') || tz.includes('Amsterdam') || tz.includes('Brussels') || tz.includes('Vienna') || tz.includes('Dublin')) return 'EUR';
    if (tz.includes('Tokyo')) return 'JPY';
    if (tz.includes('Singapore')) return 'SGD';
    if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal')) return 'CAD';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Perth')) return 'AUD';
    if (tz.includes('Zurich')) return 'CHF';
    if (tz.includes('Sao_Paulo')) return 'BRL';

    // 2. Browser Locale mapping fallback
    if (lang.endsWith('-ae')) return 'AED';
    if (lang.endsWith('-sa')) return 'SAR';
    if (lang.endsWith('-qa')) return 'QAR';
    if (lang.endsWith('-in')) return 'INR';
    if (lang.endsWith('-gb')) return 'GBP';
    if (lang.endsWith('-de') || lang.endsWith('-fr') || lang.endsWith('-es') || lang.endsWith('-it') || lang.endsWith('-nl')) return 'EUR';
    if (lang.endsWith('-ca')) return 'CAD';
    if (lang.endsWith('-au')) return 'AUD';
    if (lang.endsWith('-jp')) return 'JPY';
    if (lang.endsWith('-sg')) return 'SGD';

    return 'USD';
  } catch (_) {
    return 'USD';
  }
};

const formatPriceRange = (usdMin, usdMax, currencyCode) => {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const minVal = Math.round(usdMin * curr.rate);
  const maxVal = Math.round(usdMax * curr.rate);

  if (curr.code === 'USD') return `$${minVal} – $${maxVal}`;
  if (curr.code === 'EUR') return `€${minVal} – €${maxVal}`;
  if (curr.code === 'GBP') return `£${minVal} – £${maxVal}`;
  if (curr.code === 'INR') return `₹${minVal.toLocaleString()} – ₹${maxVal.toLocaleString()}`;
  if (curr.code === 'JPY') return `¥${minVal.toLocaleString()} – ¥${maxVal.toLocaleString()}`;
  return `${curr.code} ${minVal.toLocaleString()} – ${curr.code} ${maxVal.toLocaleString()}`;
};

const CATALOG_ITEMS = [
  // PLANTS
  {
    id: 'fittonia',
    name: 'Fittonia Nerve Plant',
    scientific: 'Fittonia albivenis',
    category: 'plants',
    biome: 'tropical',
    family: 'Acanthaceae',
    origin: 'Peruvian Rainforest Understory',
    light: 'Bright indirect to filtered dappled shade',
    watering: 'High moisture, keep soil evenly damp; sensitive to drought',
    soilPreference: 'ABG Tropical Bio-Soil + Sphagnum barrier',
    careDifficulty: 'Beginner Friendly',
    companionTip: 'Pairs exquisitely with cushion moss and ferns; collapses visibly when thirsty as a bio-indicator.',
    nurseryUnit: '1x 2-inch nursery pot (4-6 rooted stems)',
    usdRange: [5, 8],
    approxCost: '$5 - $8',
    idealHumidity: [65, 95],
    defaultScale: 1,
    cultivars: [
      { id: 'pink', name: 'Sakura Pink', color: '#f472b6', veinColor: '#f472b6', leafColor: '#14532d' },
      { id: 'ruby', name: 'Ruby Red', color: '#ef4444', veinColor: '#f87171', leafColor: '#14532d' },
      { id: 'white', name: 'White Anne', color: '#f8fafc', veinColor: '#f1f5f9', leafColor: '#166534' }
    ],
    description: 'Vibrant pink-veined foliage that thrives in closed humid jars.',
  },
  {
    id: 'polkadot',
    name: 'Polka Dot Plant',
    scientific: 'Hypoestes phyllostachya',
    category: 'plants',
    biome: 'tropical',
    family: 'Acanthaceae',
    origin: 'Madagascar Tropical Woodland',
    light: 'Medium to bright indirect light',
    watering: 'Moderate to high moisture; pinch growing tips to encourage bushy form',
    soilPreference: 'Moist organic bio-mix with activated charcoal',
    careDifficulty: 'Beginner Friendly',
    companionTip: 'Provides striking pink/magenta splash against dark stones and emerald mosses.',
    nurseryUnit: '1x 2-inch starter pot',
    usdRange: [4, 7],
    approxCost: '$4 - $7',
    idealHumidity: [60, 90],
    defaultScale: 1,
    description: 'Playful spotted magenta leaves adding bright canopy contrast.',
  },
  {
    id: 'cushion_moss',
    name: 'Mood Cushion Moss',
    scientific: 'Leucobryum glaucum',
    category: 'plants',
    biome: 'tropical',
    family: 'Leucobryaceae',
    origin: 'Temperate & Subtropical Ancient Forests',
    light: 'Low to medium indirect light; avoid scorching direct sun',
    watering: 'High atmospheric humidity; mist regularly with low-mineral water',
    soilPreference: 'Directly atop damp ABG soil or sphagnum bed',
    careDifficulty: 'Easy / Low Maintenance',
    companionTip: 'The quintessential terrarium groundcover; buffers humidity and protects root zones.',
    nurseryUnit: '1x live cushion pad (~50g, 3-4" diameter)',
    usdRange: [6, 10],
    approxCost: '$6 - $10',
    idealHumidity: [55, 95],
    defaultScale: 1.05,
    description: 'Lush, velvety emerald mounds that anchor hardscape edges.',
  },
  {
    id: 'fern',
    name: 'Crispy Wave Bird Fern',
    scientific: 'Nephrolepis exaltata',
    category: 'plants',
    biome: 'tropical',
    family: 'Nephrolepidaceae',
    origin: 'Humid Subtropical Canopies & Riverbanks',
    light: 'Filtered shade to dappled ambient light',
    watering: 'Consistent moisture without stagnant waterlogging',
    soilPreference: 'Loose, airy tropical peat & leaf mold with leca drainage',
    careDifficulty: 'Intermediate',
    companionTip: 'Gives vertical architecture and woodland depth; unfurls fresh chartreuse fronds over time.',
    nurseryUnit: '1x 2.5-inch mini fern starter',
    usdRange: [6, 9],
    approxCost: '$6 - $9',
    idealHumidity: [60, 95],
    defaultScale: 1.1,
    description: 'Graceful arching fronds that create classic woodland depth.',
  },
  {
    id: 'orchid',
    name: 'Mini Jewel Orchid',
    scientific: 'Phalaenopsis minima',
    category: 'plants',
    biome: 'tropical',
    family: 'Orchidaceae',
    origin: 'Southeast Asian Montane Cloud Forests',
    light: 'Gentle morning light or filtered canopy grow-lamp',
    watering: 'Mist aerial root nodes; never allow water to sit inside crown overnight',
    soilPreference: 'Pure long-fiber sphagnum moss wrapped on spiderwood',
    careDifficulty: 'Intermediate / Collector',
    companionTip: 'Mount onto spiderwood branch or lava rock; benefits greatly from gentle air ventilation.',
    nurseryUnit: '1x blooming-size miniature specimen',
    usdRange: [14, 22],
    approxCost: '$14 - $22',
    idealHumidity: [65, 90],
    defaultScale: 1.05,
    description: 'Delicate epiphyte blooms that bring vertical elegance.',
  },
  {
    id: 'echeveria',
    name: 'Rosette Echeveria',
    scientific: 'Echeveria elegans',
    category: 'plants',
    biome: 'arid',
    family: 'Crassulaceae',
    origin: 'Semi-Desert Highlands of Hidalgo, Mexico',
    light: 'High direct sunlight or 12h bright full-spectrum LED',
    watering: 'Very sparse; allow soil to dry completely for 1-2 weeks between waterings',
    soilPreference: '70% grit/pumice/coarse sand + 30% inorganic soil; requires open bowl',
    careDifficulty: 'Easy in open bowls / Fatal in closed jars',
    companionTip: 'NEVER plant in a closed apothecary jar; pair with Haworthia & desert sand in wide bubble bowls.',
    nurseryUnit: '1x 2-inch succulent plug',
    usdRange: [4, 7],
    approxCost: '$4 - $7',
    idealHumidity: [15, 45],
    defaultScale: 1,
    description: 'Sculptural blue-green succulent requiring low humidity & good drainage.',
  },
  {
    id: 'haworthia',
    name: 'Zebra Haworthia',
    scientific: 'Haworthiopsis attenuata',
    category: 'plants',
    biome: 'arid',
    family: 'Asphodelaceae',
    origin: 'Eastern Cape Province, South Africa',
    light: 'Bright indirect to partial sun; more shade-tolerant than Echeveria',
    watering: 'Deep soak once every 2-3 weeks; drench and dry cycle',
    soilPreference: 'Gritty cactus mix with activated charcoal & leca base',
    careDifficulty: 'Very Resilient / Beginner Friendly',
    companionTip: 'Ideal structural plant for open aerium bowls and desert rock arrangements.',
    nurseryUnit: '1x 2-inch zebra plant rosette',
    usdRange: [5, 8],
    approxCost: '$5 - $8',
    idealHumidity: [15, 50],
    defaultScale: 1,
    description: 'Striped architectural succulent tolerant of indirect light.',
  },
  {
    id: 'tillandsia',
    name: 'Blushing Air Plant',
    scientific: 'Tillandsia ionantha',
    category: 'plants',
    biome: 'epiphyte',
    family: 'Bromeliaceae',
    origin: 'Central America (Guatemala & Mexico) Cloud Cliffs',
    light: 'Bright filtered sunlight with good air circulation',
    watering: 'Mist 2-3x weekly or brief 10-minute water soak, shake dry upside down',
    soilPreference: 'No soil required! Mount directly on wood, stone, or crystal',
    careDifficulty: 'Easy / Zero Substrate',
    companionTip: 'Leaves blush vivid crimson prior to violet tubular flowers; perfect epiphyte accent.',
    nurseryUnit: '1x live tillandsia cluster (2-3")',
    usdRange: [5, 9],
    approxCost: '$5 - $9',
    idealHumidity: [35, 80],
    defaultScale: 0.95,
    description: 'Rootless epiphyte that perches on driftwood or stone.',
  },
  {
    id: 'venus_flytrap',
    name: 'Venus Flytrap',
    scientific: 'Dionaea muscipula',
    category: 'plants',
    biome: 'carnivorous',
    family: 'Droseraceae',
    origin: 'Coastal Bogs of North & South Carolina, USA',
    light: 'Intense bright light / direct grow lighting (14 hours daily)',
    watering: 'Pure distilled, reverse osmosis, or rainwater ONLY; keep bottom tray wet',
    soilPreference: 'Zero-nutrient 50/50 peat moss and perlite; fertilizer is lethal',
    careDifficulty: 'Specialist / Intermediate',
    companionTip: 'Sensitive cilia trigger bi-lobed traps in 100ms; avoid touching traps unnecessarily.',
    nurseryUnit: '1x live potted trap specimen (3-5 traps)',
    usdRange: [9, 15],
    approxCost: '$9 - $15',
    idealHumidity: [65, 95],
    defaultScale: 1.1,
    description: 'Fascinating carnivorous bog plant with sensitive trigger-cilia traps.',
  },
  {
    id: 'sundew',
    name: 'Cape Sundew',
    scientific: 'Drosera capensis',
    category: 'plants',
    biome: 'carnivorous',
    family: 'Droseraceae',
    origin: 'Fynbos Bogs of the Western Cape, South Africa',
    light: 'Bright indirect to direct grow light',
    watering: 'Pure distilled or RO water; tray method (keep substrate constantly soaked)',
    soilPreference: 'Unfertilized pure peat moss and horticultural quartz sand',
    careDifficulty: 'Intermediate / Vigorous Grower',
    companionTip: 'Glistening adhesive mucilage traps fungus gnats naturally, acting as biological pest control!',
    nurseryUnit: '1x 2-inch live sundew starter pot',
    usdRange: [8, 14],
    approxCost: '$8 - $14',
    idealHumidity: [70, 95],
    defaultScale: 1.05,
    description: 'Carnivorous tentacles tipped with glistening mucilage dew beads that catch the light.',
  },
  {
    id: 'peperomia',
    name: 'String of Turtles',
    scientific: 'Peperomia prostrata',
    category: 'plants',
    biome: 'tropical',
    family: 'Piperaceae',
    origin: 'Brazilian Rainforest Cloud Floor',
    light: 'Gentle medium to bright indirect light',
    watering: 'Allow top layer of sphagnum to dry slightly before misting; avoids root rot',
    soilPreference: 'Light, airy blend of sphagnum moss, perlite, and fine bark',
    careDifficulty: 'Intermediate / Trailing Beauty',
    companionTip: 'Cascades gracefully over driftwood and rock cliffs with exquisite turtle-shell patterns.',
    nurseryUnit: '1x 2-inch rooted trailing pot (several vines)',
    usdRange: [8, 13],
    approxCost: '$8 - $13',
    idealHumidity: [55, 85],
    defaultScale: 1.0,
    description: 'Charming trailing succulent vine with intricate turtle-shell leaf markings.',
  },

  // HARDSCAPE & CRITTERS
  {
    id: 'driftwood',
    name: 'Spiderwood Branch',
    scientific: 'Rhododendron root',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Natural Hardscape / Botanicals',
    origin: 'Natural dried branched root wood',
    light: 'Neutral / Non-living',
    watering: 'Boil or soak before first enclosure placement to sink and leach tannins',
    soilPreference: 'Anchored into drainage layer or wedged against glass',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Ideal climbing trellis for creeping vines and moss pad attachment.',
    nurseryUnit: '1x 4-6" curated specimen branch',
    usdRange: [7, 12],
    approxCost: '$7 - $12',
    defaultScale: 1.15,
    description: 'Twisted golden timber providing natural climbing structure.',
  },
  {
    id: 'dragon_stone',
    name: 'Ohko Dragon Stone',
    scientific: 'Argillaceous clay stone',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Aquascaping Mineral',
    origin: 'Ancient weathered river clay beds',
    light: 'Neutral / Non-living',
    watering: 'Inert; does not alter water pH or hardness',
    soilPreference: 'Resting on substrate or drainage barrier',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Natural porous crater-like pockmarks are ideal for pressing live moss plugs into.',
    nurseryUnit: '1x small hand-picked stone (200-350g)',
    usdRange: [5, 9],
    approxCost: '$5 - $9',
    defaultScale: 1.1,
    description: 'Craggy, eroded stone with cavities perfect for moss pockets.',
  },
  {
    id: 'quartz',
    name: 'Amethyst & Rose Quartz',
    scientific: 'Crystalline silica',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Crystalline Mineral',
    origin: 'Hydrothermal quartz vein geodes',
    light: 'Reflects and refracts grow light beams',
    watering: 'Completely insoluble and safe for bio-terrariums',
    soilPreference: 'Decorative focal accent',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Creates a mystical subterranean aesthetic, especially under twilight or UV lighting.',
    nurseryUnit: '1x raw mineral cluster (1.5-2.5")',
    usdRange: [6, 11],
    approxCost: '$6 - $11',
    defaultScale: 0.95,
    cultivars: [
      { id: 'amethyst', name: 'Amethyst Purple', color: '#c084fc', facetColor: '#a855f7', stroke: '#7e22ce' },
      { id: 'rose', name: 'Rose Quartz', color: '#fbcfe8', facetColor: '#f472b6', stroke: '#db2777' },
      { id: 'clear', name: 'Milky White', color: '#f8fafc', facetColor: '#e2e8f0', stroke: '#94a3b8' },
      { id: 'citrine', name: 'Citrine Gold', color: '#fef08a', facetColor: '#eab308', stroke: '#ca8a04' }
    ],
    description: 'Translucent mineral cluster that catches grow-light rays.',
  },
  {
    id: 'river_stones',
    name: 'Zen River Pebbles',
    scientific: 'Polished basalt',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Fluvial Mineral',
    origin: 'Natural riverbed tumbling',
    light: 'Neutral / Non-living',
    watering: 'Non-reactive / smooth surface',
    soilPreference: 'Substrate surface pathway',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Used to craft stepping-stone paths, retaining walls, or gravel borders.',
    nurseryUnit: '1x bag of 5-8 hand-selected pebbles',
    usdRange: [3, 5],
    approxCost: '$3 - $5',
    defaultScale: 1,
    description: 'Smooth water-worn stones for pathways and soil borders.',
  },
  {
    id: 'mushrooms',
    name: 'Canopy Forest Fungi',
    scientific: 'Mycena chlorophos',
    category: 'hardscape',
    biome: 'tropical',
    family: 'Mycenaceae',
    origin: 'Subtropical Asian rainforest rotten timber',
    light: 'Bioluminescent fruiting body; glows softly under UV blue light',
    watering: 'Requires high ambient humidity (>80%) and damp decaying wood',
    soilPreference: 'Damp ABG soil rich in decaying organic cellulose',
    careDifficulty: 'Novelty / Organic Wonder',
    companionTip: 'Symbiotic decomposer that breaks down organic matter alongside micro-fauna.',
    nurseryUnit: '1x inoculated mini-spore wood plug',
    usdRange: [8, 14],
    approxCost: '$8 - $14',
    defaultScale: 0.95,
    description: 'Whimsical fruiting bodies that glow softly under UV light.',
  },
  {
    id: 'critters',
    name: 'Bioactive Clean-Up Crew',
    scientific: 'Collembola & Dairy Cow Isopods',
    category: 'critters',
    biome: 'tropical',
    family: 'Entomobryidae & Porcellionidae',
    origin: 'Global forest floor detritus ecosystems',
    light: 'Cryptic; roam leaf litter and substrate root pockets',
    watering: 'Require continuous high moisture in drainage layer to breathe via gills/cuticle',
    soilPreference: 'Deep organic ABG bio-soil with leaf litter and wood bark',
    careDifficulty: 'Self-Sustaining Colony',
    companionTip: 'Essential ecosystem engineers! They consume decaying plant leaves and mold before it spreads.',
    nurseryUnit: '1x starter culture (~50 springtails + 10 isopods)',
    usdRange: [10, 16],
    approxCost: '$10 - $16',
    defaultScale: 1,
    description: 'Living micro-fauna that roam the substrate and consume decaying matter!',
  },
  {
    id: 'water_pool',
    name: 'Subterranean Crystal Pool',
    scientific: 'Aquifer reservoir',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Aquatic Feature',
    origin: 'Spring reservoir feature',
    light: 'Creates dynamic caustics under daylight mode',
    watering: 'Self-contained water feature; buffers humidity in open and closed containers',
    soilPreference: 'Embedded into drainage and pebble foundation',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Maintains steady atmospheric evaporation and provides an aquifer look.',
    nurseryUnit: '1x sculpted resin/glass reservoir dish',
    usdRange: [6, 10],
    approxCost: '$6 - $10',
    defaultScale: 1.2,
    description: 'Clear reflective water pocket providing natural humidity buffering and caustics.',
  },
  {
    id: 'lava_rock',
    name: 'Black Volcanic Basalt',
    scientific: 'Porous vesicular basalt',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Igneous Rock',
    origin: 'Solidified volcanic basalt lava',
    light: 'Matte dark charcoal finish; high contrast with bright moss',
    watering: 'Porous capillaries soak up moisture and wick it to plant roots',
    soilPreference: 'Anchored directly into drainage or soil base',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Its vesicular micro-pores cultivate beneficial nitrifying bio-filtration bacteria.',
    nurseryUnit: '1x porous volcanic specimen (200-300g)',
    usdRange: [4, 8],
    approxCost: '$4 - $8',
    defaultScale: 1.15,
    cultivars: [
      { id: 'basalt', name: 'Basalt Black', color: '#292524', stoneColor: '#1c1917', highlight: '#44403c' },
      { id: 'red', name: 'Scoria Red', color: '#991b1b', stoneColor: '#7f1d1d', highlight: '#b91c1c' },
      { id: 'pumice', name: 'Pumice Grey', color: '#78716c', stoneColor: '#57534e', highlight: '#a8a29e' }
    ],
    description: 'Dark, textured volcanic rock ideal for anchoring moss and beneficial bacteria.',
  },
  {
    id: 'petrified_wood',
    name: 'Ancient Petrified Wood',
    scientific: 'Silicified mineral timber',
    category: 'hardscape',
    biome: 'neutral',
    family: 'Fossilized Mineral',
    origin: 'Triassic fossilized river timber',
    light: 'Highlights striated ring textures under warm lighting',
    watering: 'Extremely dense stone; completely water-inert',
    soilPreference: 'Firmly seated into drainage or soil boundary',
    careDifficulty: 'Zero Maintenance',
    companionTip: 'Adds timeless geological antiquity and rich warm ochre banding to the landscape.',
    nurseryUnit: '1x fossilized stone specimen (250-400g)',
    usdRange: [8, 14],
    approxCost: '$8 - $14',
    defaultScale: 1.1,
    description: 'Fossilized prehistoric wood with striated rings and rich ochre grain.',
  }
];

const LIGHTING_MODES = {
  dawn: {
    id: 'dawn',
    name: 'Dawn',
    timeLabel: '06:30 Sunrise',
    icon: Sunset,
    bgGradient: 'from-stone-950 via-rose-950/60 to-amber-950/40',
    ambientGlow: 'rgba(254, 205, 211, 0.22)',
    vesselTint: 'rgba(251, 113, 133, 0.08)',
    rayColor: 'rgba(253, 164, 175, 0.22)',
    uvActive: false,
    accentText: 'text-rose-300'
  },
  day: {
    id: 'day',
    name: 'Daylight',
    timeLabel: '12:00 Solar Noon',
    icon: Sun,
    bgGradient: 'from-stone-900 via-stone-900 to-emerald-950',
    ambientGlow: 'rgba(255, 252, 235, 0.14)',
    vesselTint: 'rgba(255, 255, 255, 0.04)',
    rayColor: 'rgba(255, 250, 220, 0.16)',
    uvActive: false,
    accentText: 'text-amber-300'
  },
  golden: {
    id: 'golden',
    name: 'Golden Hour',
    timeLabel: '17:45 Sunset',
    icon: Sunset,
    bgGradient: 'from-stone-950 via-amber-950/60 to-orange-950/50',
    ambientGlow: 'rgba(251, 146, 60, 0.24)',
    vesselTint: 'rgba(251, 146, 60, 0.08)',
    rayColor: 'rgba(253, 186, 116, 0.24)',
    uvActive: false,
    accentText: 'text-orange-300'
  },
  twilight: {
    id: 'twilight',
    name: 'Twilight',
    timeLabel: '20:15 Dusk',
    icon: Moon,
    bgGradient: 'from-slate-950 via-violet-950/70 to-indigo-950/60',
    ambientGlow: 'rgba(167, 139, 250, 0.20)',
    vesselTint: 'rgba(139, 92, 246, 0.08)',
    rayColor: 'rgba(196, 181, 253, 0.18)',
    uvActive: false,
    accentText: 'text-indigo-300'
  },
  night: {
    id: 'night',
    name: 'Moonlight',
    timeLabel: '23:30 Midnight',
    icon: Moon,
    bgGradient: 'from-slate-950 via-indigo-950/70 to-slate-900',
    ambientGlow: 'rgba(96, 165, 250, 0.16)',
    vesselTint: 'rgba(59, 130, 246, 0.08)',
    rayColor: 'rgba(147, 197, 253, 0.12)',
    uvActive: false,
    accentText: 'text-blue-300'
  },
  uv: {
    id: 'uv',
    name: 'UV Bio-Glow',
    timeLabel: '02:45 Phosphor',
    icon: Zap,
    bgGradient: 'from-zinc-950 via-purple-950/75 to-fuchsia-950/50',
    ambientGlow: 'rgba(192, 132, 252, 0.25)',
    vesselTint: 'rgba(168, 85, 247, 0.1)',
    rayColor: 'rgba(216, 180, 254, 0.2)',
    uvActive: true,
    accentText: 'text-purple-300'
  }
};

const getTimeLightingMode = (hour) => {
  if (hour >= 5.5 && hour < 8.5) return 'dawn';
  if (hour >= 8.5 && hour < 16.5) return 'day';
  if (hour >= 16.5 && hour < 19.5) return 'golden';
  if (hour >= 19.5 && hour < 21.5) return 'twilight';
  if (hour >= 21.5 || hour < 2.0) return 'night';
  return 'uv';
};

const PRESETS = {
  rainforest: {
    name: 'Tropical Rainforest',
    subtitle: 'Lush closed apothecary ecosystem with bioactive fauna',
    vesselId: 'apothecary',
    humidity: 82,
    lighting: 'day',
    substrates: { pebbles: 28, charcoal: 12, moss: 14, soil: 44, sand: 0 },
    items: [
      { uid: 'p-1', type: 'dragon_stone', x: 165, y: 345, scale: 1.35, rotation: -6, flipX: false, zIndex: 1 },
      { uid: 'p-2', type: 'driftwood', x: 225, y: 315, scale: 1.3, rotation: 12, flipX: false, zIndex: 2 },
      { uid: 'p-3', type: 'fern', x: 142, y: 330, scale: 1.25, rotation: -8, flipX: false, zIndex: 3 },
      { uid: 'p-4', type: 'orchid', x: 248, y: 312, scale: 1.15, rotation: 5, flipX: true, zIndex: 4 },
      { uid: 'p-5', type: 'fittonia', x: 195, y: 355, scale: 1.1, rotation: 0, flipX: false, zIndex: 5 },
      { uid: 'p-6', type: 'cushion_moss', x: 135, y: 365, scale: 1.2, rotation: 4, flipX: false, zIndex: 6 },
      { uid: 'p-7', type: 'cushion_moss', x: 255, y: 363, scale: 1.15, rotation: -4, flipX: true, zIndex: 7 },
      { uid: 'p-8', type: 'mushrooms', x: 222, y: 358, scale: 0.95, rotation: 6, flipX: false, zIndex: 8 },
      { uid: 'p-9', type: 'critters', x: 185, y: 376, scale: 1, rotation: 0, flipX: false, zIndex: 9 }
    ]
  },
  desert: {
    name: 'Arid Desert Oasis',
    subtitle: 'Sun-drenched open bubble bowl with quartz & succulents',
    vesselId: 'fishbowl',
    humidity: 28,
    lighting: 'golden',
    substrates: { pebbles: 26, charcoal: 8, moss: 0, soil: 26, sand: 34 },
    items: [
      { uid: 'd-1', type: 'dragon_stone', x: 245, y: 350, scale: 1.25, rotation: 14, flipX: true, zIndex: 1 },
      { uid: 'd-2', type: 'quartz', x: 140, y: 355, scale: 1.1, rotation: -12, flipX: false, zIndex: 2 },
      { uid: 'd-3', type: 'haworthia', x: 215, y: 358, scale: 1.2, rotation: 4, flipX: false, zIndex: 3 },
      { uid: 'd-4', type: 'echeveria', x: 165, y: 368, scale: 1.25, rotation: -5, flipX: false, zIndex: 4 },
      { uid: 'd-5', type: 'tillandsia', x: 258, y: 325, scale: 1.0, rotation: 22, flipX: false, zIndex: 5 },
      { uid: 'd-6', type: 'river_stones', x: 205, y: 376, scale: 1.05, rotation: 0, flipX: false, zIndex: 6 }
    ]
  },
  zen: {
    name: 'Zen Moss Conservatory',
    subtitle: 'Harmonious Wardian case with crystal accents & bioluminescent fungi',
    vesselId: 'wardian',
    humidity: 76,
    lighting: 'uv',
    substrates: { pebbles: 24, charcoal: 14, moss: 16, soil: 38, sand: 8 },
    items: [
      { uid: 'z-1', type: 'driftwood', x: 195, y: 315, scale: 1.35, rotation: -5, flipX: true, zIndex: 1 },
      { uid: 'z-2', type: 'quartz', x: 235, y: 348, scale: 1.15, rotation: 8, flipX: false, zIndex: 2 },
      { uid: 'z-3', type: 'polkadot', x: 150, y: 340, scale: 1.15, rotation: -10, flipX: false, zIndex: 3 },
      { uid: 'z-4', type: 'cushion_moss', x: 195, y: 362, scale: 1.4, rotation: 0, flipX: false, zIndex: 4 },
      { uid: 'z-5', type: 'cushion_moss', x: 140, y: 366, scale: 1.1, rotation: 5, flipX: true, zIndex: 5 },
      { uid: 'z-6', type: 'mushrooms', x: 180, y: 350, scale: 1.15, rotation: -6, flipX: false, zIndex: 6 },
      { uid: 'z-7', type: 'river_stones', x: 248, y: 368, scale: 1.0, rotation: 4, flipX: false, zIndex: 7 },
      { uid: 'z-8', type: 'critters', x: 205, y: 374, scale: 1, rotation: 0, flipX: false, zIndex: 8 }
    ]
  }
};

const AUTO_SCAPES = [
  {
    id: 'amazonian_canopy',
    name: 'Amazonian Canopy',
    subtitle: 'High humidity cloud forest with lush ferns, creeping fittonia & moss',
    vesselId: 'apothecary',
    humidity: 86,
    temperature: 24,
    lighting: 'day',
    glassTint: 'clear',
    pedestalType: 'walnut',
    substrates: { pebbles: 28, charcoal: 14, moss: 18, soil: 46, sand: 0 },
    items: [
      { uid: 'as-1', type: 'driftwood', x: 210, y: 320, scale: 1.35, rotation: 10, flipX: false, zIndex: 1 },
      { uid: 'as-2', type: 'fern', x: 145, y: 330, scale: 1.25, rotation: -8, flipX: false, zIndex: 2 },
      { uid: 'as-3', type: 'orchid', x: 245, y: 315, scale: 1.2, rotation: 6, flipX: true, zIndex: 3 },
      { uid: 'as-4', type: 'fittonia', x: 190, y: 355, scale: 1.1, rotation: 0, flipX: false, zIndex: 4, cultivar: 'ruby' },
      { uid: 'as-5', type: 'cushion_moss', x: 140, y: 365, scale: 1.2, rotation: 0, flipX: false, zIndex: 5 },
      { uid: 'as-6', type: 'cushion_moss', x: 250, y: 362, scale: 1.15, rotation: 0, flipX: true, zIndex: 6 },
      { uid: 'as-7', type: 'critters', x: 190, y: 375, scale: 1, rotation: 0, flipX: false, zIndex: 7 }
    ]
  },
  {
    id: 'carnivorous_mist_bog',
    name: 'Carnivorous Mist Bog',
    subtitle: 'Acidic sphagnum bog with sundew, flytrap, and damp petrified timber',
    vesselId: 'flask',
    humidity: 90,
    temperature: 22,
    lighting: 'sunset',
    glassTint: 'seaglass',
    pedestalType: 'brass',
    substrates: { pebbles: 26, charcoal: 16, moss: 22, soil: 40, sand: 0 },
    items: [
      { uid: 'as-8', type: 'petrified_wood', x: 180, y: 340, scale: 1.2, rotation: -6, flipX: false, zIndex: 1 },
      { uid: 'as-9', type: 'venus_flytrap', x: 225, y: 345, scale: 1.15, rotation: 4, flipX: true, zIndex: 2 },
      { uid: 'as-10', type: 'sundew', x: 155, y: 355, scale: 1.1, rotation: -8, flipX: false, zIndex: 3 },
      { uid: 'as-11', type: 'cushion_moss', x: 200, y: 365, scale: 1.3, rotation: 0, flipX: false, zIndex: 4 },
      { uid: 'as-12', type: 'critters', x: 180, y: 372, scale: 0.9, rotation: 0, flipX: false, zIndex: 5 }
    ]
  },
  {
    id: 'kyoto_zen_garden',
    name: 'Kyoto Zen Moss Garden',
    subtitle: 'Minimalist Japanese sanctuary with river stones, weeping moss & bonsai lantern',
    vesselId: 'wardian',
    humidity: 74,
    temperature: 20,
    lighting: 'golden',
    glassTint: 'clear',
    pedestalType: 'walnut',
    substrates: { pebbles: 24, charcoal: 12, moss: 20, soil: 36, sand: 14 },
    items: [
      { uid: 'as-13', type: 'zen_lantern', x: 220, y: 335, scale: 1.2, rotation: 0, flipX: false, zIndex: 1 },
      { uid: 'as-14', type: 'river_stones', x: 160, y: 360, scale: 1.1, rotation: -6, flipX: false, zIndex: 2 },
      { uid: 'as-15', type: 'cushion_moss', x: 195, y: 362, scale: 1.4, rotation: 0, flipX: false, zIndex: 3 },
      { uid: 'as-16', type: 'cushion_moss', x: 140, y: 366, scale: 1.1, rotation: 0, flipX: true, zIndex: 4 },
      { uid: 'as-17', type: 'peperomia', x: 250, y: 345, scale: 1.05, rotation: 8, flipX: false, zIndex: 5 }
    ]
  },
  {
    id: 'sonoran_obsidian_canyon',
    name: 'Sonoran Obsidian Canyon',
    subtitle: 'Arid desert gulch with volcanic lava rock, rosette succulents & air plants',
    vesselId: 'fishbowl',
    humidity: 25,
    temperature: 28,
    lighting: 'day',
    glassTint: 'smoked',
    pedestalType: 'marble',
    substrates: { pebbles: 24, charcoal: 6, moss: 0, soil: 24, sand: 46 },
    items: [
      { uid: 'as-18', type: 'lava_rock', x: 230, y: 345, scale: 1.35, rotation: 12, flipX: true, zIndex: 1, cultivar: 'basalt' },
      { uid: 'as-19', type: 'echeveria', x: 165, y: 365, scale: 1.25, rotation: -4, flipX: false, zIndex: 2 },
      { uid: 'as-20', type: 'haworthia', x: 210, y: 360, scale: 1.15, rotation: 4, flipX: false, zIndex: 3 },
      { uid: 'as-21', type: 'tillandsia', x: 255, y: 320, scale: 1.05, rotation: 18, flipX: false, zIndex: 4 },
      { uid: 'as-22', type: 'river_stones', x: 195, y: 375, scale: 1.0, rotation: 0, flipX: false, zIndex: 5 }
    ]
  },
  {
    id: 'bioluminescent_cavern',
    name: 'Bioluminescent Cavern',
    subtitle: 'Nocturnal subterranean grotto with glowing quartz geode & ultraviolet mushrooms',
    vesselId: 'hex_lantern',
    humidity: 84,
    temperature: 21,
    lighting: 'uv',
    glassTint: 'clear',
    pedestalType: 'led_halo',
    substrates: { pebbles: 25, charcoal: 14, moss: 16, soil: 42, sand: 0 },
    items: [
      { uid: 'as-23', type: 'quartz', x: 200, y: 335, scale: 1.3, rotation: 0, flipX: false, zIndex: 1, cultivar: 'amethyst' },
      { uid: 'as-24', type: 'mushrooms', x: 155, y: 350, scale: 1.2, rotation: -6, flipX: false, zIndex: 2 },
      { uid: 'as-25', type: 'water_pool', x: 200, y: 368, scale: 1.15, rotation: 0, flipX: false, zIndex: 3 },
      { uid: 'as-26', type: 'cushion_moss', x: 245, y: 360, scale: 1.1, rotation: 0, flipX: true, zIndex: 4 },
      { uid: 'as-27', type: 'critters', x: 175, y: 374, scale: 0.95, rotation: 0, flipX: false, zIndex: 5 }
    ]
  },
  {
    id: 'cloud_forest_epiphyte',
    name: 'Cloud Forest Epiphyte Wall',
    subtitle: 'Cascading riparian paludarium with aquatic mist pool and trailing flora',
    vesselId: 'paludarium',
    humidity: 88,
    temperature: 23,
    lighting: 'sunset',
    glassTint: 'amber',
    pedestalType: 'walnut',
    substrates: { pebbles: 28, charcoal: 12, moss: 18, soil: 44, sand: 0 },
    items: [
      { uid: 'as-28', type: 'water_pool', x: 140, y: 370, scale: 1.3, rotation: 0, flipX: false, zIndex: 1 },
      { uid: 'as-29', type: 'lava_rock', x: 235, y: 340, scale: 1.3, rotation: -8, flipX: false, zIndex: 2, cultivar: 'red' },
      { uid: 'as-30', type: 'fern', x: 255, y: 320, scale: 1.15, rotation: 12, flipX: true, zIndex: 3 },
      { uid: 'as-31', type: 'creeping_fig', x: 185, y: 335, scale: 1.1, rotation: -5, flipX: false, zIndex: 4 },
      { uid: 'as-32', type: 'cushion_moss', x: 195, y: 365, scale: 1.2, rotation: 0, flipX: false, zIndex: 5 }
    ]
  }
];

// ==========================================
// 2. PROCEDURAL BOTANICAL & HARDSCAPE SVGs
// ==========================================

const RenderBotanicalArtwork = ({ type, uvActive, growthStage = 0, cultivar = null, isStressed = false }) => {
  switch (type) {
    case 'fittonia': {
      const vein = uvActive ? "#ff49db" : cultivar === 'ruby' ? "#ef4444" : cultivar === 'white' ? "#f8fafc" : "#f472b6";
      const leafFill1 = cultivar === 'white' ? "#166534" : "#1e4620";
      const leafFill2 = cultivar === 'white' ? "#15803d" : "#28592b";
      return (
        <g style={isStressed ? { filter: 'sepia(70%) saturate(160%) hue-rotate(-20deg)', transform: 'rotate(4deg)' } : undefined}>
          <path d="M0,0 Q-12,-18 -24,-32 M0,0 Q14,-20 26,-34 M0,0 Q-4,-25 -6,-48 M0,0 Q8,-15 18,-20" stroke="#2d5a27" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <g transform="translate(-22, -30) rotate(-32)">
            <path d="M0,0 C-14,-8 -16,-28 0,-36 C16,-28 14,-8 0,0 Z" fill={leafFill1} stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-33 M0,-10 L-8,-16 M0,-18 L-9,-24 M0,-25 L-6,-30 M0,-12 L8,-18 M0,-20 L9,-26" stroke={vein} strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <g transform="translate(22, -30) rotate(30)">
            <path d="M0,0 C-14,-8 -16,-28 0,-36 C16,-28 14,-8 0,0 Z" fill={leafFill1} stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-33 M0,-10 L-8,-16 M0,-18 L-9,-24 M0,-12 L8,-18 M0,-20 L9,-26" stroke={vein} strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <g transform="translate(-4, -42) rotate(-6)">
            <path d="M0,0 C-16,-10 -18,-32 0,-42 C18,-32 16,-10 0,0 Z" fill={leafFill2} stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-38 M0,-10 L-10,-17 M0,-20 L-11,-27 M0,-28 L-7,-34 M0,-12 L10,-19 M0,-22 L11,-29 M0,-30 L7,-35" stroke={vein} strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(8, -14) rotate(14)">
            <path d="M0,0 C-13,-7 -14,-24 0,-30 C14,-24 13,-7 0,0 Z" fill={leafFill1} stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-27 M0,-9 L-7,-14 M0,-17 L-8,-22 M0,-10 L7,-15 M0,-18 L8,-23" stroke={vein} strokeWidth="1.3" strokeLinecap="round" />
          </g>
        </g>
      );
    }

    case 'polkadot':
      return (
        <g>
          <path d="M0,0 Q-15,-20 -25,-40 M0,0 Q15,-22 22,-42 M0,0 L0,-50" stroke="#3b2f2f" strokeWidth="2.2" fill="none" />
          {[
            { x: -22, y: -35, r: -28, s: 0.9 },
            { x: 20, y: -36, r: 26, s: 0.9 },
            { x: 0, y: -46, r: -4, s: 1.05 },
            { x: -10, y: -20, r: -14, s: 0.8 },
            { x: 12, y: -18, r: 18, s: 0.8 }
          ].map((lf, idx) => (
            <g key={idx} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.r}) scale(${lf.s})`}>
              <path d="M0,0 C-14,-8 -15,-28 0,-38 C15,-28 14,-8 0,0 Z" fill="#1f3a26" stroke="#132618" strokeWidth="1" />
              <path d="M0,-2 L0,-34" stroke="#ec4899" strokeWidth="1.2" />
              <circle cx="-5" cy="-12" r="2.5" fill={uvActive ? "#f0abfc" : "#f472b6"} />
              <circle cx="5" cy="-16" r="3" fill={uvActive ? "#f0abfc" : "#f472b6"} />
              <circle cx="-4" cy="-24" r="3.2" fill={uvActive ? "#f0abfc" : "#fb7185"} />
              <circle cx="4" cy="-27" r="2.2" fill={uvActive ? "#f0abfc" : "#f472b6"} />
              <circle cx="0" cy="-31" r="1.8" fill={uvActive ? "#f0abfc" : "#f472b6"} />
            </g>
          ))}
        </g>
      );

    case 'cushion_moss':
      return (
        <g>
          <path d="M-42,4 C-46,-14 -28,-26 -10,-24 C0,-32 22,-30 30,-18 C42,-16 46,-2 40,6 Z" fill="#3b6e28" />
          <path d="M-36,4 C-38,-10 -22,-20 -6,-18 C6,-26 24,-22 28,-10 C36,-8 38,2 34,6 Z" fill="#4d8a34" />
          <path d="M-26,4 C-26,-6 -12,-14 2,-12 C12,-18 24,-12 24,-2 Z" fill="#65a346" />
          <g stroke={uvActive ? "#a3e635" : "#84cc16"} strokeWidth="1.2" strokeLinecap="round">
            <line x1="-24" y1="-14" x2="-27" y2="-22" />
            <line x1="-10" y1="-19" x2="-11" y2="-28" />
            <line x1="6" y1="-22" x2="8" y2="-31" />
            <line x1="20" y1="-15" x2="24" y2="-23" />
          </g>
          <circle cx="-27" cy="-22" r="1.5" fill="#bef264" />
          <circle cx="-11" cy="-28" r="1.5" fill="#bef264" />
          <circle cx="8" cy="-31" r="1.5" fill="#bef264" />
          <circle cx="24" cy="-23" r="1.5" fill="#bef264" />
          {growthStage >= 2 && (
            <g stroke={uvActive ? "#a3e635" : "#84cc16"} strokeWidth="1.2" strokeLinecap="round">
              <line x1="-16" y1="-18" x2="-18" y2="-34" />
              <circle cx="-18" cy="-34" r="2.2" fill={uvActive ? "#bef264" : "#a3e635"} />
              <line x1="14" y1="-20" x2="16" y2="-36" />
              <circle cx="16" cy="-36" r="2.2" fill={uvActive ? "#bef264" : "#a3e635"} />
            </g>
          )}
        </g>
      );

    case 'fern':
      return (
        <g>
          {[
            { rot: -38, len: 68, curve: -18 },
            { rot: -16, len: 78, curve: -8 },
            { rot: 6, len: 82, curve: 6 },
            { rot: 28, len: 72, curve: 16 },
            { rot: 46, len: 58, curve: 22 }
          ].map((frond, i) => (
            <g key={i} transform={`rotate(${frond.rot})`}>
              <path d={`M0,0 Q${frond.curve},${-frond.len * 0.5} ${frond.curve * 1.4},${-frond.len}`} stroke="#2f6626" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              {[0.2, 0.35, 0.5, 0.65, 0.8, 0.92].map((t, j) => {
                const px = frond.curve * t * 1.3;
                const py = -frond.len * t;
                const leafSize = (1 - t * 0.55) * 11;
                return (
                  <g key={j} transform={`translate(${px}, ${py})`}>
                    <ellipse cx={-leafSize} cy="-2" rx={leafSize} ry="4.2" transform="rotate(-18)" fill="#438a36" />
                    <ellipse cx={leafSize} cy="-2" rx={leafSize} ry="4.2" transform="rotate(18)" fill="#529e43" />
                  </g>
                );
              })}
            </g>
          ))}
          {growthStage >= 1 && (
            <g transform="translate(0, -4)">
              <path d="M0,0 Q-8,-20 -5,-30 Q-2,-36 3,-32 Q6,-28 2,-25 Q-1,-27 0,-29" stroke="#86efac" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      );

    case 'orchid':
      return (
        <g>
          <path d="M0,0 C-18,-2 -34,-12 -38,-4 C-32,8 -12,6 0,2 Z" fill="#274e2a" />
          <path d="M0,0 C18,-2 34,-12 38,-4 C32,8 12,6 0,2 Z" fill="#315e35" />
          <path d="M0,0 C-6,-35 -4,-68 18,-88 C30,-98 42,-92 46,-82" stroke="#3b5228" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <line x1="-3" y1="0" x2="-3" y2="-65" stroke="#78583a" strokeWidth="2" strokeLinecap="round" />
          {[
            { x: 14, y: -78, s: 1 },
            { x: 32, y: -88, s: 0.88 },
            { x: 45, y: -78, s: 0.72 }
          ].map((bl, idx) => (
            <g key={idx} transform={`translate(${bl.x}, ${bl.y}) scale(${bl.s})`}>
              <ellipse cx="0" cy="-9" rx="6" ry="10" fill={uvActive ? "#f5d0fe" : "#fdf4ff"} />
              <ellipse cx="-10" cy="-2" rx="10" ry="7" transform="rotate(-15)" fill={uvActive ? "#f0abfc" : "#fae8ff"} />
              <ellipse cx="10" cy="-2" rx="10" ry="7" transform="rotate(15)" fill={uvActive ? "#f0abfc" : "#fae8ff"} />
              <ellipse cx="-5" cy="8" rx="6" ry="8" transform="rotate(20)" fill="#f472b6" />
              <ellipse cx="5" cy="8" rx="6" ry="8" transform="rotate(-20)" fill="#f472b6" />
              <circle cx="0" cy="3" r="4.5" fill={uvActive ? "#ff007f" : "#db2777"} />
              <circle cx="0" cy="2" r="2" fill="#facc15" />
            </g>
          ))}
          {growthStage >= 2 && (
            <g transform="translate(52, -68) scale(0.65)">
              <ellipse cx="0" cy="-7" rx="5" ry="8" fill={uvActive ? "#f5d0fe" : "#fdf4ff"} />
              <ellipse cx="-8" cy="-2" rx="8" ry="6" transform="rotate(-15)" fill={uvActive ? "#f0abfc" : "#fae8ff"} />
              <ellipse cx="8" cy="-2" rx="8" ry="6" transform="rotate(15)" fill={uvActive ? "#f0abfc" : "#fae8ff"} />
              <circle cx="0" cy="2" r="3.5" fill="#db2777" />
              <circle cx="0" cy="1" r="1.5" fill="#facc15" />
            </g>
          )}
        </g>
      );

    case 'echeveria':
      return (
        <g transform="translate(0, -10)">
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
            <g key={`out-${deg}`} transform={`rotate(${deg})`}>
              <path d="M0,0 C-10,-8 -12,-24 0,-30 C12,-24 10,-8 0,0 Z" fill="#4f837f" stroke="#3b6965" strokeWidth="1" />
              <path d="M-4,-25 Q0,-31 4,-25" stroke="#e17088" strokeWidth="1.8" fill="none" />
            </g>
          ))}
          {[18, 63, 108, 153, 198, 243, 288, 333].map((deg) => (
            <g key={`mid-${deg}`} transform={`rotate(${deg})`}>
              <path d="M0,0 C-8,-6 -9,-18 0,-22 C9,-18 8,-6 0,0 Z" fill="#68a39e" stroke="#4f837f" strokeWidth="1" />
              <path d="M-3,-18 Q0,-23 3,-18" stroke="#f472b6" strokeWidth="1.5" fill="none" />
            </g>
          ))}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={`in-${deg}`} transform={`rotate(${deg})`}>
              <path d="M0,0 C-5,-4 -6,-10 0,-13 C6,-10 5,-4 0,0 Z" fill="#89bfb9" />
            </g>
          ))}
          <circle cx="0" cy="0" r="4" fill="#a7d7d2" />
        </g>
      );

    case 'haworthia':
      return (
        <g>
          {[
            { rot: -42, h: 44 },
            { rot: -26, h: 56 },
            { rot: -12, h: 66 },
            { rot: 0, h: 72 },
            { rot: 13, h: 64 },
            { rot: 27, h: 54 },
            { rot: 43, h: 42 }
          ].map((sp, i) => (
            <g key={i} transform={`rotate(${sp.rot})`}>
              <path d={`M-7,2 Q-5,${-sp.h * 0.5} 0,${-sp.h} Q5,${-sp.h * 0.5} 7,2 Z`} fill="#274e2e" stroke="#1b3820" strokeWidth="1" />
              {[0.22, 0.38, 0.54, 0.7, 0.84].map((t, idx) => (
                <path
                  key={idx}
                  d={`M${-5 * (1 - t * 0.7)},${-sp.h * t} Q0,${-sp.h * t - 2} ${5 * (1 - t * 0.7)},${-sp.h * t}`}
                  stroke="#d9f99d"
                  strokeWidth="1.6"
                  strokeDasharray="2 1"
                  fill="none"
                />
              ))}
            </g>
          ))}
        </g>
      );

    case 'tillandsia':
      return (
        <g>
          {[
            { d: 'M0,0 Q-25,-12 -42,-4', c: '#658c78' },
            { d: 'M0,0 Q26,-10 44,-2', c: '#658c78' },
            { d: 'M0,0 Q-22,-25 -36,-32', c: '#789e8a' },
            { d: 'M0,0 Q24,-24 38,-30', c: '#789e8a' },
            { d: 'M0,0 Q-14,-35 -20,-48', c: '#94b09d' },
            { d: 'M0,0 Q15,-34 22,-46', c: '#94b09d' },
            { d: 'M0,0 Q-6,-40 -8,-56', c: '#e07a8c' },
            { d: 'M0,0 Q6,-42 9,-55', c: '#e07a8c' },
            { d: 'M0,0 Q0,-45 0,-60', c: '#f43f5e' }
          ].map((sp, i) => (
            <path key={i} d={sp.d} stroke={sp.c} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          ))}
          <ellipse cx="0" cy="0" rx="8" ry="4" fill="#526e5e" />
        </g>
      );

    case 'driftwood':
      return (
        <g>
          <path
            d="M-35,6 C-20,-4 -12,-22 -4,-44 C2,-62 18,-78 38,-88 C24,-70 12,-54 10,-38 C24,-46 42,-48 56,-42 C38,-36 22,-30 12,-20 C8,-8 14,2 22,6 Z"
            fill="#8b623f"
            stroke="#593d25"
            strokeWidth="1.5"
          />
          <path d="M-4,-44 C-14,-56 -28,-66 -46,-68 C-30,-58 -18,-48 -10,-34" fill="#8b623f" stroke="#593d25" strokeWidth="1.5" />
          <path d="M-20,2 Q-5,-20 2,-45 M6,-12 Q10,-30 28,-42" stroke="#593d25" strokeWidth="1.2" fill="none" opacity="0.7" />
        </g>
      );

    case 'dragon_stone':
      return (
        <g>
          <polygon points="-32,8 -38,-22 -20,-58 6,-74 28,-48 36,-12 28,8" fill="#57534e" stroke="#292524" strokeWidth="1.5" />
          <polygon points="-20,-58 6,-74 12,-35 -12,-18" fill="#78716c" />
          <polygon points="6,-74 28,-48 36,-12 12,-35" fill="#44403c" />
          <ellipse cx="-14" cy="-28" rx="5" ry="9" transform="rotate(-15 -14 -28)" fill="#292524" />
          <ellipse cx="8" cy="-46" rx="4" ry="8" transform="rotate(10 8 -46)" fill="#292524" />
          <ellipse cx="14" cy="-20" rx="6" ry="7" transform="rotate(25 14 -20)" fill="#292524" />
          <ellipse cx="-4" cy="-12" rx="4" ry="5" fill="#1c1917" />
        </g>
      );

    case 'quartz': {
      const qColor1 = uvActive ? "#e879f9" : cultivar === 'rose' ? "#fbcfe8" : cultivar === 'clear' ? "#f8fafc" : cultivar === 'citrine' ? "#fef08a" : "#f472b6";
      const qColor2 = uvActive ? "#c084fc" : cultivar === 'rose' ? "#f472b6" : cultivar === 'clear' ? "#e2e8f0" : cultivar === 'citrine' ? "#eab308" : "#e879f9";
      const qColor3 = cultivar === 'rose' ? "#db2777" : cultivar === 'clear' ? "#94a3b8" : cultivar === 'citrine' ? "#ca8a04" : "#a855f7";
      const qColor4 = uvActive ? "#f0abfc" : cultivar === 'rose' ? "#fda4af" : cultivar === 'clear' ? "#f1f5f9" : cultivar === 'citrine' ? "#fde047" : "#f9a8d4";
      return (
        <g>
          <polygon points="-24,4 -32,-26 -22,-38 -10,-24 -8,4" fill={qColor1} fillOpacity="0.82" stroke="#fdf4ff" strokeWidth="1" />
          <polygon points="-12,4 -16,-46 0,-64 14,-44 10,4" fill={qColor2} fillOpacity="0.88" stroke="#ffffff" strokeWidth="1.2" />
          <polygon points="0,-64 14,-44 10,4 0,4" fill={qColor3} fillOpacity="0.45" />
          <polygon points="6,4 12,-32 26,-40 32,-22 22,4" fill={qColor4} fillOpacity="0.85" stroke="#fdf4ff" strokeWidth="1" />
          {uvActive && <circle cx="0" cy="-50" r="18" fill="#e879f9" opacity="0.25" />}
        </g>
      );
    }

    case 'river_stones':
      return (
        <g>
          <ellipse cx="-18" cy="-4" rx="18" ry="9" fill="#64748b" stroke="#334155" strokeWidth="1" />
          <ellipse cx="14" cy="-3" rx="16" ry="8" fill="#475569" stroke="#1e293b" strokeWidth="1" />
          <ellipse cx="-2" cy="-9" rx="13" ry="7" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          <ellipse cx="6" cy="2" rx="11" ry="5.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
        </g>
      );

    case 'mushrooms':
      return (
        <g>
          {uvActive && (
            <circle cx="0" cy="-24" r="32" fill="#22d3ee" opacity="0.22" />
          )}
          <path d="M-2,2 Q-4,-18 2,-36" stroke="#fef3c7" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M-16,-34 C-16,-48 20,-48 20,-34 Z" fill={uvActive ? "#06b6d4" : "#ef4444"} stroke={uvActive ? "#67e8f9" : "#991b1b"} strokeWidth="1" />
          <circle cx="-4" cy="-40" r="2.2" fill="#ffffff" />
          <circle cx="6" cy="-41" r="1.8" fill="#ffffff" />
          <circle cx="11" cy="-36" r="1.5" fill="#ffffff" />

          <path d="M-16,2 Q-20,-8 -18,-18" stroke="#fef3c7" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M-28,-17 C-28,-27 -8,-27 -8,-17 Z" fill={uvActive ? "#22d3ee" : "#f97316"} />
          <circle cx="-18" cy="-22" r="1.6" fill="#ffffff" />

          <path d="M14,2 Q18,-10 16,-22" stroke="#fef3c7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M6,-20 C6,-30 26,-30 26,-20 Z" fill={uvActive ? "#38bdf8" : "#dc2626"} />
          <circle cx="16" cy="-25" r="1.8" fill="#ffffff" />
        </g>
      );

    case 'critters':
      return (
        <g>
          <g className="terrarium-critter-1">
            <ellipse cx="0" cy="-3" rx="9" ry="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
            <circle cx="-3" cy="-4" r="2.2" fill="#1e293b" />
            <circle cx="3" cy="-2" r="2" fill="#1e293b" />
            <path d="M-9,-3 L-13,-6 M-9,-2 L-13,0" stroke="#475569" strokeWidth="1" />
          </g>
          <g className="terrarium-critter-2" transform="translate(22, 2)">
            <ellipse cx="0" cy="-2" rx="5" ry="2.5" fill={uvActive ? "#a5f3fc" : "#f8fafc"} />
            <path d="M-5,-2 L-8,-4" stroke="#94a3b8" strokeWidth="0.9" />
          </g>
        </g>
      );

    case 'venus_flytrap':
      return (
        <g>
          <ellipse cx="0" cy="2" rx="10" ry="4" fill="#14532d" />
          {/* Trap 1: Left arching trap */}
          <g transform="translate(-18, -26) rotate(-28)">
            <path d="M18,26 Q10,12 0,0" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M-10,-12 C-16,-6 -14,6 0,8 C14,6 16,-6 10,-12 Z" fill="#15803d" stroke="#14532d" strokeWidth="1" />
            <path d="M-8,-8 C-12,-4 -10,4 0,6 C10,4 12,-4 8,-8 Z" fill={uvActive ? "#f43f5e" : "#b91c1c"} />
            <g stroke={uvActive ? "#fecdd3" : "#86efac"} strokeWidth="1.2" strokeLinecap="round">
              <line x1="-9" y1="-10" x2="-12" y2="-17" />
              <line x1="-5" y1="-12" x2="-6" y2="-19" />
              <line x1="0" y1="-13" x2="0" y2="-20" />
              <line x1="5" y1="-12" x2="6" y2="-19" />
              <line x1="9" y1="-10" x2="12" y2="-17" />
            </g>
          </g>
          {/* Trap 2: Right arching trap */}
          <g transform="translate(18, -24) rotate(32)">
            <path d="M-18,24 Q-8,12 0,0" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M-10,-12 C-16,-6 -14,6 0,8 C14,6 16,-6 10,-12 Z" fill="#15803d" stroke="#14532d" strokeWidth="1" />
            <path d="M-8,-8 C-12,-4 -10,4 0,6 C10,4 12,-4 8,-8 Z" fill={uvActive ? "#f43f5e" : "#b91c1c"} />
            <g stroke={uvActive ? "#fecdd3" : "#86efac"} strokeWidth="1.2" strokeLinecap="round">
              <line x1="-9" y1="-10" x2="-12" y2="-17" />
              <line x1="-5" y1="-12" x2="-6" y2="-19" />
              <line x1="0" y1="-13" x2="0" y2="-20" />
              <line x1="5" y1="-12" x2="6" y2="-19" />
              <line x1="9" y1="-10" x2="12" y2="-17" />
            </g>
          </g>
          {/* Trap 3: Tall center erect trap */}
          <g transform="translate(0, -36) rotate(4)">
            <path d="M0,36 Q-2,18 0,0" stroke="#22c55e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M-12,-14 C-18,-7 -16,8 0,10 C16,8 18,-7 12,-14 Z" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
            <path d="M-9,-10 C-14,-5 -12,6 0,8 C12,6 14,-5 9,-10 Z" fill={uvActive ? "#fb7185" : "#dc2626"} />
            <g stroke={uvActive ? "#ffe4e6" : "#bbf7d0"} strokeWidth="1.3" strokeLinecap="round">
              <line x1="-11" y1="-12" x2="-14" y2="-20" />
              <line x1="-6" y1="-14" x2="-7" y2="-22" />
              <line x1="0" y1="-15" x2="0" y2="-23" />
              <line x1="6" y1="-14" x2="7" y2="-22" />
              <line x1="11" y1="-12" x2="14" y2="-20" />
            </g>
          </g>
        </g>
      );

    case 'sundew':
      return (
        <g>
          <ellipse cx="0" cy="1" rx="8" ry="3.5" fill="#14532d" />
          {[
            { angle: -65, len: 44, c: '#22c55e' },
            { angle: -38, len: 48, c: '#4ade80' },
            { angle: -12, len: 52, c: '#86efac' },
            { angle: 15, len: 50, c: '#4ade80' },
            { angle: 42, len: 46, c: '#22c55e' },
            { angle: 70, len: 40, c: '#16a34a' }
          ].map((stem, idx) => (
            <g key={idx} transform={`rotate(${stem.angle})`}>
              <path d={`M0,0 Q-4,${-stem.len * 0.5} 0,${-stem.len}`} stroke={stem.c} strokeWidth="2.2" fill="none" strokeLinecap="round" />
              {[-0.4, -0.6, -0.8, -1.0].map((frac, di) => (
                <g key={di} transform={`translate(0, ${stem.len * frac})`}>
                  <line x1="-6" y1="-2" x2="6" y2="2" stroke="#f43f5e" strokeWidth="0.8" opacity="0.8" />
                  <circle cx="-6" cy="-2" r={uvActive ? "2.6" : "2"} fill={uvActive ? "#f0abfc" : "#fb7185"} opacity="0.9" />
                  <circle cx="6" cy="2" r={uvActive ? "2.6" : "2"} fill={uvActive ? "#f0abfc" : "#fb7185"} opacity="0.9" />
                  <circle cx="-7" cy="-3" r="0.8" fill="#ffffff" />
                  <circle cx="5" cy="1" r="0.8" fill="#ffffff" />
                </g>
              ))}
              <circle cx="0" cy={-stem.len} r={uvActive ? "3.5" : "2.8"} fill={uvActive ? "#e879f9" : "#f43f5e"} />
              <circle cx="-1" cy={-stem.len - 1} r="1" fill="#ffffff" />
            </g>
          ))}
        </g>
      );

    case 'peperomia':
      return (
        <g>
          <path d="M0,0 Q-18,-15 -28,-36 Q-34,-50 -25,-68" stroke="#713f12" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M0,0 Q16,-12 24,-32 Q32,-48 20,-64" stroke="#713f12" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M0,0 Q-4,-25 2,-50 Q8,-65 0,-80" stroke="#713f12" strokeWidth="2" fill="none" strokeLinecap="round" />
          {[
            { x: -14, y: -12, r: 12, s: 0.95 },
            { x: -26, y: -30, r: -20, s: 1.1 },
            { x: -30, y: -50, r: -10, s: 1.05 },
            { x: -23, y: -66, r: 15, s: 0.85 },
            { x: 12, y: -10, r: -15, s: 0.9 },
            { x: 22, y: -26, r: 25, s: 1.1 },
            { x: 28, y: -44, r: 15, s: 1.0 },
            { x: 18, y: -62, r: -15, s: 0.8 },
            { x: -2, y: -22, r: 5, s: 1.15 },
            { x: 4, y: -42, r: -8, s: 1.2 },
            { x: 6, y: -62, r: 10, s: 1.05 },
            { x: -1, y: -78, r: -4, s: 0.9 }
          ].map((leaf, idx) => (
            <g key={idx} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
              <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="#14532d" stroke="#166534" strokeWidth="1" />
              <path d="M-6,0 Q0,-4 6,0 Q0,4 -6,0 M0,-6 L0,6 M-4,-4 L4,4 M-4,4 L4,-4" stroke={uvActive ? "#86efac" : "#bbf7d0"} strokeWidth="1.1" fill="none" opacity="0.85" />
              <ellipse cx="-2" cy="-2" rx="7" ry="5.5" fill="none" stroke={uvActive ? "#a7f3d0" : "#dcfce7"} strokeWidth="0.6" opacity="0.6" />
            </g>
          ))}
        </g>
      );

    case 'water_pool':
      return (
        <g>
          <path d="M-38,6 C-42,-2 -28,-14 0,-14 C28,-14 42,-2 38,6 C26,12 -26,12 -38,6 Z" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
          <path d="M-34,5 C-38,-1 -24,-11 0,-11 C24,-11 38,-1 34,5 C24,9 -24,9 -34,5 Z" fill="#0284c7" fillOpacity="0.75" />
          <path d="M-28,3 C-30,-2 -18,-8 0,-8 C18,-8 30,-2 28,3 C18,6 -18,6 -28,3 Z" fill="#38bdf8" fillOpacity="0.55" />
          <ellipse cx="-6" cy="-2" rx="14" ry="4" fill="none" stroke="#e0f2fe" strokeWidth="1.2" opacity="0.85" />
          <ellipse cx="10" cy="1" rx="8" ry="2.5" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.75" />
          {uvActive && (
            <ellipse cx="0" cy="0" rx="30" ry="8" fill="#38bdf8" opacity="0.25" />
          )}
        </g>
      );

    case 'lava_rock': {
      const rockBase = cultivar === 'red' ? "#7f1d1d" : cultivar === 'pumice' ? "#57534e" : "#18181b";
      const rockStroke = cultivar === 'red' ? "#450a0a" : cultivar === 'pumice' ? "#292524" : "#09090b";
      const rockFacet1 = cultivar === 'red' ? "#991b1b" : cultivar === 'pumice' ? "#78716c" : "#27272a";
      const rockFacet2 = cultivar === 'red' ? "#b91c1c" : cultivar === 'pumice' ? "#a8a29e" : "#3f3f46";
      return (
        <g>
          <polygon points="-36,6 -42,-18 -26,-48 -6,-62 18,-54 38,-32 42,4 20,8 -16,8" fill={rockBase} stroke={rockStroke} strokeWidth="1.5" />
          <polygon points="-26,-48 -6,-62 4,-34 -18,-24" fill={rockFacet1} />
          <polygon points="-6,-62 18,-54 12,-26 4,-34" fill={rockFacet2} />
          <polygon points="18,-54 38,-32 24,-12 12,-26" fill={rockFacet1} />
          {[
            { cx: -20, cy: -34, r: 3.5 },
            { cx: -8, cy: -46, r: 2.8 },
            { cx: 8, cy: -38, r: 4.2 },
            { cx: 22, cy: -22, r: 3.2 },
            { cx: -12, cy: -14, r: 4.8 },
            { cx: 6, cy: -16, r: 3.0 },
            { cx: -28, cy: -10, r: 2.5 },
            { cx: 16, cy: -4, r: 3.6 }
          ].map((hole, hi) => (
            <circle key={hi} cx={hole.cx} cy={hole.cy} r={hole.r} fill={rockStroke} stroke={rockFacet1} strokeWidth="0.8" />
          ))}
          {uvActive && (
            <path d="M-6,-46 L-4,-38 M8,-38 L6,-28" stroke="#f97316" strokeWidth="1.5" opacity="0.7" />
          )}
        </g>
      );
    }

    case 'petrified_wood':
      return (
        <g>
          <path d="M-30,6 C-34,-14 -32,-42 -22,-68 C-6,-74 16,-72 26,-66 C32,-38 34,-12 30,6 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
          <path d="M-22,-64 C-26,-40 -26,-16 -24,4" stroke="#b45309" strokeWidth="3.5" fill="none" />
          <path d="M-14,-67 C-18,-42 -16,-12 -14,5" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <path d="M-6,-70 C-8,-44 -6,-10 -4,5" stroke="#fef3c7" strokeWidth="2.5" fill="none" />
          <path d="M4,-69 C2,-42 4,-12 6,5" stroke="#d97706" strokeWidth="3.2" fill="none" />
          <path d="M14,-67 C12,-38 14,-14 16,5" stroke="#92400e" strokeWidth="3" fill="none" />
          <path d="M22,-64 C24,-38 24,-14 24,5" stroke="#451a03" strokeWidth="2" fill="none" />
          <ellipse cx="2" cy="-68" rx="24" ry="7" fill="#fde68a" stroke="#78350f" strokeWidth="1.2" />
          <ellipse cx="2" cy="-68" rx="16" ry="4.5" fill="none" stroke="#b45309" strokeWidth="1" />
          <ellipse cx="2" cy="-68" rx="8" ry="2.2" fill="#78350f" />
        </g>
      );

    default:
      return null;
  }
};

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================

// Cryptographically secure UID generator and random helpers (CodeQL / CWE-338 compliant)
const getRandomFloat = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
};

const getRandomInt = (max) => {
  if (max <= 1) return 0;
  return Math.floor(getRandomFloat() * max);
};

const generateItemUid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `item-${crypto.randomUUID()}`;
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint32Array(2);
    crypto.getRandomValues(bytes);
    return `item-${Date.now()}-${bytes[0].toString(36)}${bytes[1].toString(36)}`;
  }
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export default function App() {
  // Core Terrarium State
  const [vesselId, setVesselId] = useState('apothecary');
  const [substrates, setSubstrates] = useState(PRESETS.rainforest.substrates);
  const [items, setItems] = useState(PRESETS.rainforest.items);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Environment State
  const [humidity, setHumidity] = useState(PRESETS.rainforest.humidity);
  const [lighting, setLighting] = useState(PRESETS.rainforest.lighting);
  const [isMisting, setIsMisting] = useState(false);
  const [mistParticles, setMistParticles] = useState([]);
  // Start on 'vessel' tab to reduce initial DOM payload on mobile (LCP/FCP boost)
  const [activeTab, setActiveTab] = useState('vessel'); // 'vessel' | 'substrate' | 'catalog'
  const [catalogFilter, setCatalogFilter] = useState('all'); // 'all' | 'plants' | 'hardscape'
  const [showHudLabels, setShowHudLabels] = useState(true);
  const [snapshotSuccess, setSnapshotSuccess] = useState(false);
  const [critterOffset, setCritterOffset] = useState(0);

  // Ambient sound synthesizer state
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const audioCtxRef = useRef(null);

  // SVG Dragging State
  const svgRef = useRef(null);
  const draggingRef = useRef({ active: false, uid: null, offsetX: 0, offsetY: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  // History & Undo / Redo State
  const [history, setHistory] = useState([
    {
      vesselId: 'apothecary',
      substrates: PRESETS.rainforest.substrates,
      items: PRESETS.rainforest.items,
      humidity: PRESETS.rainforest.humidity,
      lighting: PRESETS.rainforest.lighting,
      temperature: 23,
      glassTint: 'clear',
      pedestalType: 'walnut'
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Saved Enclosures (LocalStorage) State
  const [savedSlots, setSavedSlots] = useState(() => {
    try {
      const raw = localStorage.getItem('verdantglass_saved_slots');
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  });
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [newSlotName, setNewSlotName] = useState('');

  // Share Modal & Deep Link State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // High-Res Photo Studio State
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('png'); // 'png' | 'svg'
  const [exportResolution, setExportResolution] = useState(2); // 1 | 2 | 4
  const [exportBackdrop, setExportBackdrop] = useState('studio'); // 'studio' | 'white' | 'transparent'
  const [includePlaque, setIncludePlaque] = useState(true);
  const [customPlaqueTitle, setCustomPlaqueTitle] = useState('VERDANTGLASS ARCHIVE • SPECIMEN NO. 1');
  const [isRenderingExport, setIsRenderingExport] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Phase 2: Diurnal Automated Time-Lapse Cycle State (0.00 to 24.00 hours)
  const [timeOfDay, setTimeOfDay] = useState(12.0);
  const [isCyclePlaying, setIsCyclePlaying] = useState(false);
  const [cycleSpeed, setCycleSpeed] = useState(1); // 1x, 5x, 20x

  // Phase 2: Zen Sanctuary Mode
  const [isZenMode, setIsZenMode] = useState(false);

  // Phase 2: Dynamic Water Cycle & Evaporation Engine
  const [isEvaporationActive, setIsEvaporationActive] = useState(true);
  const [condensationTrickleOffset, setCondensationTrickleOffset] = useState(0);

  // Phase 2: Multi-Track Procedural Web Audio Soundscape
  const [isAmbientSoundActive, setIsAmbientSoundActive] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const ambientNodesRef = useRef({ windSource: null, windGain: null, cricketOsc: null, cricketGain: null });

  // Phase 3: Botanical Intelligence & Care Encyclopedia State
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const [selectedCareItem, setSelectedCareItem] = useState(null);
  const [careSearchQuery, setCareSearchQuery] = useState('');
  const [careFilterBiome, setCareFilterBiome] = useState('all');

  // Phase 3: Real-World "BOM" Nursery Shopping List Generator State
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [checkedBOMItems, setCheckedBOMItems] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(() => detectUserCurrency());
  const userRegionLabel = useMemo(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return tz ? tz.replace(/_/g, ' ') : '';
    } catch (_) {
      return '';
    }
  }, []);

  // Phase 3: Time-Lapse Flora Growth & Sprouting Scrubber (0 = Day 1, 1 = 3 Mo, 2 = 6 Mo, 3 = 1 Yr)
  const [growthStage, setGrowthStage] = useState(0);

  // Phase 3: Touch Pinch-to-Zoom & Canvas Viewport State
  const [zoomScale, setZoomScale] = useState(1.0);
  const [isPinching, setIsPinching] = useState(false);
  const touchDistRef = useRef(0);

  // Phase 4: State Additions
  const [glassTint, setGlassTint] = useState('clear');
  const [pedestalType, setPedestalType] = useState('walnut');
  const [temperature, setTemperature] = useState(23);
  const [isExplodedView, setIsExplodedView] = useState(false);
  const [compositionGrid, setCompositionGrid] = useState('none');
  const [isBuildWizardOpen, setIsBuildWizardOpen] = useState(false);
  const [buildWizardStep, setBuildWizardStep] = useState(0);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [passportTitle, setPassportTitle] = useState('Sanctuary of the Living Glass');
  const [passportRecipient, setPassportRecipient] = useState('For Nature Enthusiast');
  const [passportCreator, setPassportCreator] = useState('Crafted by Basil Shaji');
  const [passportQrDataUrl, setPassportQrDataUrl] = useState('');
  const duplicateItemRef = useRef(null);

  // Web Audio Context & Synthesizer Engine
  const initAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play resonant 432 Hz Zen Singing Bowl harmonic tone
  const playZenHarmonicChime = () => {
    try {
      const ctx = initAudioContext();
      if (!ctx || isSoundMuted) return;

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, now); // 432Hz harmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(864, now); // Octave overtone

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.22 * soundVolume, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.3);
      osc2.stop(now + 3.3);
      showToast('Zen Harmonic Chime (432 Hz)', 'info');
    } catch (_) {}
  };

  // State ref to prevent stale closures in drag / keyboard listeners
  const stateRef = useRef({ vesselId, substrates, items, humidity, lighting, temperature, glassTint, pedestalType });
  useEffect(() => {
    stateRef.current = { vesselId, substrates, items, humidity, lighting, temperature, glassTint, pedestalType };
  }, [vesselId, substrates, items, humidity, lighting, temperature, glassTint, pedestalType]);

  const currentVessel = useMemo(
    () => VESSELS.find((v) => v.id === vesselId) || VESSELS[0],
    [vesselId]
  );

  const currentLighting = LIGHTING_MODES[lighting] || LIGHTING_MODES.day;

  const selectedItem = useMemo(
    () => items.find((it) => it.uid === selectedItemId) || null,
    [items, selectedItemId]
  );

  // Deep-Linking Serialization & Deserialization Helpers
  const encodeBuildState = (state) => {
    try {
      const payload = {
        v: state.vesselId,
        s: state.substrates,
        i: state.items.map((it) => ({
          t: it.type,
          x: it.x,
          y: it.y,
          s: it.scale,
          r: it.rotation,
          f: it.flipX ? 1 : 0,
          z: it.zIndex,
          c: it.cultivar || null,
          k: it.isLocked ? 1 : 0
        })),
        h: state.humidity,
        l: state.lighting,
        temp: state.temperature ?? 23,
        gt: state.glassTint || 'clear',
        pb: state.pedestalType || 'walnut'
      };
      const jsonStr = JSON.stringify(payload);
      return btoa(
        encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
    } catch (err) {
      console.error('Failed to encode build state:', err);
      return '';
    }
  };

  const decodeBuildState = (hashStr) => {
    try {
      const cleanHash = hashStr.replace(/^#build=/, '');
      if (!cleanHash) return null;
      const decodedUri = decodeURIComponent(
        Array.prototype.map
          .call(atob(cleanHash), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const data = JSON.parse(decodedUri);
      if (!data || !data.s || !Array.isArray(data.i)) return null;
      return {
        vesselId: data.v || 'apothecary',
        substrates: data.s,
        items: data.i.map((it, idx) => ({
          uid: `shared-${Date.now()}-${idx}`,
          type: it.t,
          x: it.x,
          y: it.y,
          scale: it.s ?? 1,
          rotation: it.r ?? 0,
          flipX: Boolean(it.f),
          zIndex: it.z ?? idx + 1,
          cultivar: it.c || null,
          isLocked: Boolean(it.k)
        })),
        humidity: data.h ?? 70,
        lighting: data.l ?? 'day',
        temperature: data.temp ?? 23,
        glassTint: data.gt || 'clear',
        pedestalType: data.pb || 'walnut'
      };
    } catch (err) {
      console.warn('Failed to parse build state:', err);
      return null;
    }
  };

  // Push Snapshot to History (up to 30 snapshots)
  const pushHistorySnapshot = (newSnapshot) => {
    const fullSnapshot = {
      vesselId,
      substrates,
      items,
      humidity,
      lighting,
      temperature,
      glassTint,
      pedestalType,
      ...newSnapshot
    };
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const next = [...trimmed, fullSnapshot];
      if (next.length > 30) next.shift();
      return next;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 29));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const snap = history[targetIndex];
      if (snap) {
        setVesselId(snap.vesselId);
        setSubstrates({ ...snap.substrates });
        setItems(snap.items.map((it) => ({ ...it })));
        setHumidity(snap.humidity);
        setLighting(snap.lighting);
        if (snap.temperature !== undefined) setTemperature(snap.temperature);
        if (snap.glassTint) setGlassTint(snap.glassTint);
        if (snap.pedestalType) setPedestalType(snap.pedestalType);
        setSelectedItemId(null);
        setHistoryIndex(targetIndex);
        showToast('Undo', 'info');
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      const snap = history[targetIndex];
      if (snap) {
        setVesselId(snap.vesselId);
        setSubstrates({ ...snap.substrates });
        setItems(snap.items.map((it) => ({ ...it })));
        setHumidity(snap.humidity);
        setLighting(snap.lighting);
        if (snap.temperature !== undefined) setTemperature(snap.temperature);
        if (snap.glassTint) setGlassTint(snap.glassTint);
        if (snap.pedestalType) setPedestalType(snap.pedestalType);
        setSelectedItemId(null);
        setHistoryIndex(targetIndex);
        showToast('Redo', 'info');
      }
    }
  };

  // 1. Initial Load: Check URL Hash first (#build=...), else load LocalStorage Auto-Save
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#build=')) {
      const parsed = decodeBuildState(window.location.hash);
      if (parsed) {
        setVesselId(parsed.vesselId);
        setSubstrates(parsed.substrates);
        setItems(parsed.items);
        setHumidity(parsed.humidity);
        setLighting(parsed.lighting);
        if (parsed.temperature !== undefined) setTemperature(parsed.temperature);
        if (parsed.glassTint) setGlassTint(parsed.glassTint);
        if (parsed.pedestalType) setPedestalType(parsed.pedestalType);
        setHistory([parsed]);
        setHistoryIndex(0);
        showToast('Ecosystem loaded from shared link!', 'success');
        return;
      }
    }

    try {
      const saved = localStorage.getItem('verdantglass_autosave');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.items && parsed.substrates) {
          setVesselId(parsed.vesselId || 'apothecary');
          setSubstrates(parsed.substrates);
          setItems(parsed.items);
          setHumidity(parsed.humidity ?? 70);
          setLighting(parsed.lighting ?? 'day');
          if (parsed.temperature !== undefined) setTemperature(parsed.temperature);
          if (parsed.glassTint) setGlassTint(parsed.glassTint);
          if (parsed.pedestalType) setPedestalType(parsed.pedestalType);
          setHistory([
            {
              vesselId: parsed.vesselId || 'apothecary',
              substrates: parsed.substrates,
              items: parsed.items,
              humidity: parsed.humidity ?? 70,
              lighting: parsed.lighting ?? 'day',
              temperature: parsed.temperature ?? 23,
              glassTint: parsed.glassTint || 'clear',
              pedestalType: parsed.pedestalType || 'walnut'
            }
          ]);
          setHistoryIndex(0);
        }
      }
    } catch (_) {}
  }, []);

  // 2. Debounced Auto-Save to LocalStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          'verdantglass_autosave',
          JSON.stringify({
            vesselId,
            substrates,
            items,
            humidity,
            lighting,
            temperature,
            glassTint,
            pedestalType,
            timestamp: Date.now()
          })
        );
      } catch (_) {}
    }, 1000);
    return () => clearTimeout(timer);
  }, [vesselId, substrates, items, humidity, lighting, temperature, glassTint, pedestalType]);

  // 3. Global Keyboard Shortcuts for Undo & Redo (Ctrl+Z / Ctrl+Y / Cmd+Z / Cmd+Shift+Z / Ctrl+D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z') && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        ((e.key === 'y' || e.key === 'Y') || (e.shiftKey && (e.key === 'z' || e.key === 'Z')))
      ) {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        duplicateItemRef.current?.();
      } else if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsZenMode((prev) => {
          const next = !prev;
          showToast(next ? 'Entered Zen Sanctuary' : 'Exited Zen Sanctuary', 'info');
          return next;
        });
      } else if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, isZenMode]);

  // Phase 2: Diurnal Automated Time-Lapse Progression
  useEffect(() => {
    if (!isCyclePlaying) return;
    const interval = setInterval(() => {
      setTimeOfDay((prev) => {
        const next = (prev + 0.05 * cycleSpeed) % 24;
        const targetMode = getTimeLightingMode(next);
        setLighting((curr) => (curr !== targetMode ? targetMode : curr));
        return Number(next.toFixed(2));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isCyclePlaying, cycleSpeed]);

  // Phase 2: Dynamic Water Cycle Evaporation Loop (Realistic Open vs Closed Glass)
  useEffect(() => {
    if (!isEvaporationActive) return;
    const interval = setInterval(() => {
      if (currentVessel.type === 'open') {
        // Open vessels lose moisture steadily down to ambient 24%
        setHumidity((prev) => Math.max(24, Math.round(prev - 1)));
      } else if (currentVessel.type === 'semi-closed') {
        setHumidity((prev) => Math.max(38, Math.round(prev - 0.5)));
      }
      // Closed vessels retain equilibrium
    }, 5000);
    return () => clearInterval(interval);
  }, [isEvaporationActive, currentVessel]);

  // Phase 2: Condensation Trickle Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCondensationTrickleOffset((prev) => (prev + 0.5) % 40);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Phase 2: Procedural Multi-Track Soundscape (Canopy Wind & Nocturnal Crickets)
  useEffect(() => {
    if (!isAmbientSoundActive || isSoundMuted) {
      if (ambientNodesRef.current.windGain) {
        try {
          ambientNodesRef.current.windGain.gain.setValueAtTime(0.0001, audioCtxRef.current?.currentTime || 0);
        } catch (_) {}
      }
      if (ambientNodesRef.current.cricketGain) {
        try {
          ambientNodesRef.current.cricketGain.gain.setValueAtTime(0.0001, audioCtxRef.current?.currentTime || 0);
        } catch (_) {}
      }
      return;
    }

    try {
      const ctx = initAudioContext();
      if (!ctx) return;

      // 1. Canopy Wind Breeze
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.18;
      }

      const windSource = ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.value = 420;
      windFilter.Q.value = 2.2;

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.08 * soundVolume, ctx.currentTime);

      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(ctx.destination);
      windSource.start();

      ambientNodesRef.current.windGain = windGain;

      // 2. Nocturnal Crickets (Active during dusk/night/uv)
      const isNight = lighting === 'night' || lighting === 'twilight' || lighting === 'uv';
      const cricketGain = ctx.createGain();
      cricketGain.gain.setValueAtTime(isNight ? 0.035 * soundVolume : 0.0001, ctx.currentTime);

      const cricketOsc = ctx.createOscillator();
      cricketOsc.type = 'sine';
      cricketOsc.frequency.value = 4650;

      const cricketMod = ctx.createOscillator();
      cricketMod.frequency.value = 12; // Chirp frequency

      const modGain = ctx.createGain();
      modGain.gain.value = 0.45;

      cricketMod.connect(modGain);
      cricketOsc.connect(cricketGain);
      cricketGain.connect(ctx.destination);

      cricketOsc.start();
      cricketMod.start();

      ambientNodesRef.current.cricketGain = cricketGain;

      return () => {
        try {
          windSource.stop();
          cricketOsc.stop();
          cricketMod.stop();
        } catch (_) {}
      };
    } catch (_) {}
  }, [isAmbientSoundActive, isSoundMuted, lighting, soundVolume]);

  // Phase 2: Compute Dynamic Condensation Beads along the glass walls
  const condensationBeads = useMemo(() => {
    if (humidity < 48) return [];
    const beadCount = Math.min(50, Math.floor(((humidity - 40) / 60) * 45 * currentVessel.humidityRetention));
    const beads = [];
    for (let i = 0; i < beadCount; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const baseDist = 112 + (i * 19) % 78;
      const cx = 200 + side * baseDist;
      const rawCy = 115 + (i * 31) % 270;
      const cy = humidity > 70 ? rawCy + ((condensationTrickleOffset + i * 7) % 32) : rawCy;
      const rx = 1.6 + ((i * 3) % 2.5);
      const ry = 2.4 + ((i * 5) % 3.8);
      beads.push({
        id: `cond-bead-${i}`,
        cx,
        cy,
        rx,
        ry,
        opacity: Math.min(0.65, 0.2 + (humidity / 100) * 0.45)
      });
    }
    return beads;
  }, [humidity, currentVessel, condensationTrickleOffset]);

  // Animate Critters smoothly along the soil surface
  useEffect(() => {
    const interval = setInterval(() => {
      setCritterOffset((prev) => (prev + 0.08) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Window-level pointer drag handlers to make moving plants ultra-smooth
  useEffect(() => {
    const onPointerMove = (e) => {
      if (!draggingRef.current.active || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = 400 / rect.width;
      const scaleY = 520 / rect.height;
      const ptX = (e.clientX - rect.left) * scaleX;
      const ptY = (e.clientY - rect.top) * scaleY;

      const clampedX = Math.max(70, Math.min(330, ptX - draggingRef.current.offsetX));
      const clampedY = Math.max(120, Math.min(450, ptY - draggingRef.current.offsetY));

      setItems((prev) =>
        prev.map((it) =>
          it.uid === draggingRef.current.uid
            ? { ...it, x: Math.round(clampedX), y: Math.round(clampedY) }
            : it
        )
      );
    };

    const onPointerUp = () => {
      if (draggingRef.current.active) {
        const movedUid = draggingRef.current.uid;
        draggingRef.current.active = false;
        const currentItems = stateRef.current.items;
        const movedItem = currentItems.find((it) => it.uid === movedUid);
        if (
          movedItem &&
          (movedItem.x !== dragStartPosRef.current.x || movedItem.y !== dragStartPosRef.current.y)
        ) {
          pushHistorySnapshot({
            vesselId: stateRef.current.vesselId,
            substrates: stateRef.current.substrates,
            items: currentItems,
            humidity: stateRef.current.humidity,
            lighting: stateRef.current.lighting
          });
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [historyIndex]);

  // Calculate stacked substrate layers from bottom up
  const substrateStack = useMemo(() => {
    let currentBottomY = currentVessel.soilBaseY;
    const layers = [];

    SUBSTRATE_CONFIG.forEach((layer, idx) => {
      const height = substrates[layer.key] || 0;
      if (height > 0) {
        const topY = currentBottomY - height;
        layers.push({
          ...layer,
          height,
          topY,
          bottomY: currentBottomY,
          explodedOffset: isExplodedView ? (SUBSTRATE_CONFIG.length - 1 - idx) * 26 : 0
        });
        currentBottomY = topY;
      }
    });

    return {
      layers,
      surfaceY: currentBottomY,
      totalHeight: currentVessel.soilBaseY - currentBottomY
    };
  }, [substrates, currentVessel, isExplodedView]);

  // ==========================================
  // 4. ECOSYSTEM BALANCE ENGINE
  // ==========================================

  const ecosystemReport = useMemo(() => {
    let score = 100;
    const warnings = [];
    const positives = [];

    const placedCatalogItems = items.map((it) =>
      CATALOG_ITEMS.find((c) => c.id === it.type)
    ).filter(Boolean);

    const plants = placedCatalogItems.filter((c) => c.category === 'plants');
    const tropicalPlants = plants.filter((p) => p.biome === 'tropical');
    const aridPlants = plants.filter((p) => p.biome === 'arid');
    const carnivorousPlants = plants.filter((p) => p.biome === 'carnivorous');
    const hasCritters = placedCatalogItems.some((c) => c.id === 'critters');
    const hasWaterPool = placedCatalogItems.some((c) => c.id === 'water_pool');
    const hasLavaRock = placedCatalogItems.some((c) => c.id === 'lava_rock');

    // 1. Check Drainage Layer
    if (substrates.pebbles < 12) {
      score -= 22;
      warnings.push('Missing sufficient Leca/Pebble drainage layer (root rot risk).');
    } else {
      positives.push('Healthy false-bottom drainage layer established.');
    }

    // 2. Check Charcoal Filtration in Closed Vessels
    if (currentVessel.type === 'closed' && substrates.charcoal < 5) {
      score -= 14;
      warnings.push('Closed vessels need Activated Charcoal to filter stagnant moisture.');
    } else if (substrates.charcoal >= 6) {
      positives.push('Activated charcoal provides toxin & mold filtration.');
    }

    // 3. Check Soil Depth for Rooted Plants
    if (plants.length > 0 && substrates.soil < 18 && plants.some((p) => p.biome !== 'epiphyte')) {
      score -= 20;
      warnings.push('Nutrient soil is too shallow for plant roots to anchor.');
    }

    // 4. Check Biome Compatibility (Tropical + Arid conflict)
    if (tropicalPlants.length > 0 && aridPlants.length > 0) {
      score -= 28;
      warnings.push('Incompatible biomes: Tropical plants & desert succulents have conflicting moisture needs.');
    }
    if (carnivorousPlants.length > 0 && aridPlants.length > 0) {
      score -= 26;
      warnings.push('Incompatible biomes: Carnivorous bog flora cannot co-exist with arid succulents.');
    }

    // 5. Check Humidity vs Plant Needs
    if (aridPlants.length > 0 && humidity > 50) {
      score -= 24;
      warnings.push('Humidity is too high for succulents (Echeveria/Haworthia may rot).');
    }
    if (aridPlants.length > 0 && currentVessel.type === 'closed') {
      score -= 15;
      warnings.push('Closed glass traps moisture; succulents prefer open vessels like the Bubble Bowl.');
    }
    if (tropicalPlants.length > 0 && humidity < 55) {
      score -= 22;
      warnings.push('Humidity is too low for tropical flora—use the Mist Spray!');
    }
    if (carnivorousPlants.length > 0 && humidity < 60) {
      score -= 20;
      warnings.push('Carnivorous plants (Venus Flytrap / Sundew) require elevated bog humidity (>60%).');
    } else if (carnivorousPlants.length > 0 && substrates.moss >= 8) {
      positives.push('Sphagnum moss layer simulates natural bog moisture for carnivorous flora.');
    }

    // 6. Check Temperature Compatibility
    if (temperature < 18) {
      score -= 16;
      warnings.push(`Chilly temperature (${temperature}°C) slows botanical metabolism & triggers dormancy.`);
    } else if (temperature > 28) {
      score -= 18;
      warnings.push(`High temperature (${temperature}°C) under enclosed glass causes heat stress & rot risk.`);
    } else if (temperature >= 20 && temperature <= 25) {
      positives.push(`Optimal micro-climate temperature (${temperature}°C) for cellular respiration.`);
    }

    // 7. Hardscape & Bioactive Bonuses
    if (hasCritters && tropicalPlants.length > 0 && substrates.soil >= 20) {
      score = Math.min(100, score + 8);
      positives.push('Bioactive clean-up crew actively cycling nutrients!');
    }
    if (hasWaterPool) {
      positives.push('Subterranean crystal aquifer buffers internal micro-climate humidity.');
    }
    if (hasLavaRock) {
      positives.push('Porous volcanic basalt enhances beneficial bacterial colonization.');
    }

    const clampedScore = Math.max(10, Math.min(100, score));
    let statusLabel = 'Thriving Bio-Harmony';
    let statusColor = 'text-emerald-400';
    let barColor = 'bg-emerald-500';

    if (clampedScore < 55) {
      statusLabel = 'Critical Imbalance';
      statusColor = 'text-rose-400';
      barColor = 'bg-rose-500';
    } else if (clampedScore < 80) {
      statusLabel = 'Needs Adjustment';
      statusColor = 'text-amber-400';
      barColor = 'bg-amber-500';
    }

    const isLivingFloraStressed = clampedScore < 60 || temperature < 18 || temperature > 28 || (tropicalPlants.length > 0 && humidity < 45);

    return {
      score: clampedScore,
      statusLabel,
      statusColor,
      barColor,
      warnings,
      positives,
      isLivingFloraStressed
    };
  }, [substrates, items, humidity, currentVessel, temperature]);

  // ==========================================
  // 5. INTERACTION & PERSISTENCE HANDLERS
  // ==========================================

  const handleSubstrateChange = (key, newValue) => {
    const val = Math.max(0, Math.min(80, Number(newValue)));
    const oldVal = substrates[key] || 0;
    const delta = val - oldVal;

    const nextSubstrates = {
      ...substrates,
      [key]: val
    };
    setSubstrates(nextSubstrates);

    let nextItems = items;
    if (delta !== 0) {
      nextItems = items.map((it) => ({
        ...it,
        y: Math.max(130, Math.min(445, it.y - delta))
      }));
      setItems(nextItems);
    }

    pushHistorySnapshot({
      vesselId,
      substrates: nextSubstrates,
      items: nextItems,
      humidity,
      lighting
    });
  };

  const handleSelectVessel = (newVesselId) => {
    if (newVesselId === vesselId) return;
    setVesselId(newVesselId);
    pushHistorySnapshot({
      vesselId: newVesselId,
      substrates,
      items,
      humidity,
      lighting
    });
  };

  const handleAddItem = (catalogItem) => {
    const newUid = generateItemUid();
    const randomOffsetX = Math.floor((getRandomFloat() - 0.5) * 70);
    const spawnY = Math.min(435, Math.max(220, substrateStack.surfaceY + 6));

    const newItem = {
      uid: newUid,
      type: catalogItem.id,
      x: 200 + randomOffsetX,
      y: spawnY,
      scale: catalogItem.defaultScale || 1,
      rotation: 0,
      flipX: getRandomFloat() > 0.5,
      zIndex: items.length + 1
    };

    const nextItems = [...items, newItem];
    setItems(nextItems);
    setSelectedItemId(newUid);

    pushHistorySnapshot({
      vesselId,
      substrates,
      items: nextItems,
      humidity,
      lighting
    });
  };

  const updateSelectedItem = (patch, record = true) => {
    if (!selectedItemId) return;
    const nextItems = items.map((it) =>
      it.uid === selectedItemId ? { ...it, ...patch } : it
    );
    setItems(nextItems);
    if (record) {
      pushHistorySnapshot({
        vesselId,
        substrates,
        items: nextItems,
        humidity,
        lighting
      });
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedItemId) return;
    const nextItems = items.filter((it) => it.uid !== selectedItemId);
    setItems(nextItems);
    setSelectedItemId(null);
    pushHistorySnapshot({
      vesselId,
      substrates,
      items: nextItems,
      humidity,
      lighting
    });
    showToast('Element removed from terrarium', 'info');
  };

  const handleLayerOrder = (direction) => {
    if (!selectedItem) return;
    const sorted = [...items].sort((a, b) => a.zIndex - b.zIndex);
    const idx = sorted.findIndex((it) => it.uid === selectedItemId);
    if (idx === -1) return;
    const swapIdx = direction === 'up' ? idx + 1 : idx - 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const tempZ = sorted[idx].zIndex;
    sorted[idx] = { ...sorted[idx], zIndex: sorted[swapIdx].zIndex };
    sorted[swapIdx] = { ...sorted[swapIdx], zIndex: tempZ };

    setItems(sorted);
    pushHistorySnapshot({
      vesselId,
      substrates,
      items: sorted,
      humidity,
      lighting
    });
  };

  const handleDuplicateItem = () => {
    if (!selectedItemId) return;
    const target = items.find((it) => it.uid === selectedItemId);
    if (!target) return;
    const newUid = generateItemUid();
    const newItem = {
      ...target,
      uid: newUid,
      x: Math.min(320, target.x + 16),
      y: Math.min(420, target.y + 12),
      isLocked: false,
      zIndex: items.length + 1
    };
    const nextItems = [...items, newItem];
    setItems(nextItems);
    setSelectedItemId(newUid);
    playPopSound();
    showToast('Specimen duplicated (Ctrl+D)', 'success');
    pushHistorySnapshot({ items: nextItems });
  };
  duplicateItemRef.current = handleDuplicateItem;

  const handleToggleItemLock = (uid) => {
    const idToToggle = uid || selectedItemId;
    if (!idToToggle) return;
    const nextItems = items.map((it) => (it.uid === idToToggle ? { ...it, isLocked: !it.isLocked } : it));
    setItems(nextItems);
    const target = nextItems.find((it) => it.uid === idToToggle);
    showToast(target?.isLocked ? 'Specimen layer pinned/locked 🔒' : 'Specimen layer unlocked 🔓', 'info');
  };

  const handleItemCultivarChange = (uid, cultivar) => {
    const idToUpdate = uid || selectedItemId;
    if (!idToUpdate) return;
    const nextItems = items.map((it) => (it.uid === idToUpdate ? { ...it, cultivar } : it));
    setItems(nextItems);
    pushHistorySnapshot({ items: nextItems });
  };

  const playAutoScapeChime = () => {
    try {
      const ctx = initAudioContext();
      if (!ctx || isSoundMuted) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 987.77, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18 * soundVolume, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } catch (_) {}
  };

  const playAutoBalanceChime = () => {
    try {
      const ctx = initAudioContext();
      if (!ctx || isSoundMuted) return;
      const now = ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.2 * soundVolume, now + idx * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.85);
      });
    } catch (_) {}
  };

  const handleAutoScape = (chosenThemeId = null) => {
    let theme = AUTO_SCAPES.find((t) => t.id === chosenThemeId);
    if (!theme) {
      const remaining = AUTO_SCAPES.filter((t) => t.vesselId !== vesselId);
      theme = remaining.length > 0
        ? remaining[getRandomInt(remaining.length)]
        : AUTO_SCAPES[getRandomInt(AUTO_SCAPES.length)];
    }
    setVesselId(theme.vesselId);
    setSubstrates({ ...theme.substrates });
    const freshItems = theme.items.map((it) => ({
      ...it,
      uid: generateItemUid()
    }));
    setItems(freshItems);
    setHumidity(theme.humidity);
    setLighting(theme.lighting);
    setTemperature(theme.temperature || 23);
    setGlassTint(theme.glassTint || 'clear');
    setPedestalType(theme.pedestalType || 'walnut');
    setSelectedItemId(null);
    playAutoScapeChime();
    showToast(`Inspire Me: Generated "${theme.name}"! ✨`, 'success');
    pushHistorySnapshot({
      vesselId: theme.vesselId,
      substrates: { ...theme.substrates },
      items: freshItems,
      humidity: theme.humidity,
      lighting: theme.lighting,
      temperature: theme.temperature || 23,
      glassTint: theme.glassTint || 'clear',
      pedestalType: theme.pedestalType || 'walnut'
    });
  };

  const handleAutoFixEcosystem = () => {
    const placedCatalog = items.map((it) => CATALOG_ITEMS.find((c) => c.id === it.type)).filter(Boolean);
    const plants = placedCatalog.filter((c) => c.category === 'plants');
    const isArid = plants.some((p) => p.biome === 'arid') && !plants.some((p) => p.biome === 'tropical');
    const isCarnivorous = plants.some((p) => p.biome === 'carnivorous');

    let newSubstrates = { ...substrates };
    let newHumidity = humidity;
    let newVesselId = vesselId;
    let newTemp = 23;

    if (isArid) {
      newSubstrates = { pebbles: 26, charcoal: 8, moss: 0, soil: 24, sand: 42 };
      newHumidity = 30;
      newTemp = 26;
      if (currentVessel.type === 'closed') {
        newVesselId = 'fishbowl';
      }
    } else if (isCarnivorous) {
      newSubstrates = { pebbles: 28, charcoal: 14, moss: 24, soil: 38, sand: 0 };
      newHumidity = 88;
      newTemp = 22;
    } else {
      // Tropical default optimal
      newSubstrates = {
        pebbles: Math.max(22, substrates.pebbles),
        charcoal: Math.max(12, substrates.charcoal),
        moss: Math.max(12, substrates.moss),
        soil: Math.max(36, substrates.soil),
        sand: 0
      };
      newHumidity = Math.max(75, Math.min(85, humidity));
      newTemp = 23;
    }

    setSubstrates(newSubstrates);
    setHumidity(newHumidity);
    setVesselId(newVesselId);
    setTemperature(newTemp);
    playAutoBalanceChime();
    showToast('Auto-Fix Applied: 100% Bio-Harmony Restored! 🌿✨', 'success');
    pushHistorySnapshot({
      vesselId: newVesselId,
      substrates: newSubstrates,
      humidity: newHumidity,
      temperature: newTemp
    });
  };

  // Pointer Drag inside SVG
  const getSvgCoords = (clientX, clientY) => {
    if (!svgRef.current) return { x: 200, y: 300 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 520 / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleItemPointerDown = (e, item) => {
    e.stopPropagation();
    setSelectedItemId(item.uid);
    if (item.isLocked) {
      showToast('Specimen position is pinned (Unlock in Inspector)', 'info');
      return;
    }
    const pt = getSvgCoords(e.clientX, e.clientY);
    dragStartPosRef.current = { x: item.x, y: item.y };
    draggingRef.current = {
      active: true,
      uid: item.uid,
      offsetX: pt.x - item.x,
      offsetY: pt.y - item.y
    };
  };

  // Phase 3: Touch Pinch-to-Zoom Event Handlers
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 2) {
      setIsPinching(true);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistRef.current = dist;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length === 2 && touchDistRef.current > 0) {
      e.preventDefault();
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (newDist - touchDistRef.current) / 220;
      setZoomScale((prev) => Math.min(2.0, Math.max(0.75, Number((prev + delta).toFixed(2)))));
      touchDistRef.current = newDist;
    }
  };

  const handleTouchEnd = () => {
    setIsPinching(false);
    touchDistRef.current = 0;
  };

  // Phase 3: Real-World Nursery BOM Calculation Engine
  const bomData = useMemo(() => {
    // 1. Substrates
    const substrateItems = [
      {
        id: 'sub-pebbles',
        name: 'Leca / Hydro-Gravel',
        spec: 'Expanded clay false-bottom pebbles (8-16mm)',
        grams: Math.round(substrates.pebbles * 12.5),
        liters: (substrates.pebbles * 0.02).toFixed(2),
        usdMin: 3,
        usdMax: 5,
        costEst: formatPriceRange(3, 5, selectedCurrency),
        role: 'Drainage basin prevents roots rotting in standing water'
      },
      {
        id: 'sub-charcoal',
        name: 'Horticultural Activated Charcoal',
        spec: 'Steam-activated granular hardwood carbon',
        grams: Math.round(substrates.charcoal * 8.5),
        liters: (substrates.charcoal * 0.012).toFixed(2),
        usdMin: 2,
        usdMax: 4,
        costEst: formatPriceRange(2, 4, selectedCurrency),
        role: 'Absorbs bacterial toxins, sulfur odors and mold spores'
      },
      {
        id: 'sub-moss',
        name: 'Long-Fiber Sphagnum Barrier',
        spec: 'Dried premium Grade-AAA Sphagnum moss',
        grams: Math.round(substrates.moss * 3.2),
        liters: (substrates.moss * 0.015).toFixed(2),
        usdMin: 2,
        usdMax: 4,
        costEst: formatPriceRange(2, 4, selectedCurrency),
        role: 'Physical mesh barrier separating bio-soil from leca'
      },
      {
        id: 'sub-soil',
        name: 'Tropical Bio-Soil (ABG Mix)',
        spec: 'Milled tree fern fiber, peat, fine charcoal & orchid bark',
        grams: Math.round(substrates.soil * 14.5),
        liters: (substrates.soil * 0.025).toFixed(2),
        usdMin: 4,
        usdMax: 7,
        costEst: formatPriceRange(4, 7, selectedCurrency),
        role: 'Airy, bioactive organic rooting matrix'
      },
      ...(substrates.sand > 0 ? [{
        id: 'sub-sand',
        name: 'Washed Silica Desert Sand',
        spec: 'Fine inert quartz sand (0.5-1.0mm)',
        grams: Math.round(substrates.sand * 16.0),
        liters: (substrates.sand * 0.02).toFixed(2),
        usdMin: 2,
        usdMax: 4,
        costEst: formatPriceRange(2, 4, selectedCurrency),
        role: 'Decorative arid top dressing or mineral strata'
      }] : [])
    ];

    const totalSubstrateGrams = substrateItems.reduce((acc, it) => acc + it.grams, 0);

    // 2. Glass Vessel
    const vesselMin = currentVessel.id === 'wardian' ? 28
      : currentVessel.id === 'apothecary' ? 18
      : currentVessel.id === 'flask' ? 16
      : currentVessel.id === 'globe' ? 14
      : 12;
    const vesselMax = currentVessel.id === 'wardian' ? 42
      : currentVessel.id === 'apothecary' ? 26
      : currentVessel.id === 'flask' ? 24
      : currentVessel.id === 'globe' ? 22
      : 18;

    const vesselItem = {
      id: `vessel-${currentVessel.id}`,
      name: currentVessel.name,
      spec: currentVessel.subtitle,
      usdMin: vesselMin,
      usdMax: vesselMax,
      costEst: formatPriceRange(vesselMin, vesselMax, selectedCurrency),
      type: 'vessel'
    };

    // 3. Specimen Aggregation (Flora, Hardscape & Critters)
    const counts = {};
    items.forEach((it) => {
      counts[it.type] = (counts[it.type] || 0) + 1;
    });

    const specimenItems = Object.entries(counts).map(([typeId, count]) => {
      const cat = CATALOG_ITEMS.find((c) => c.id === typeId);
      const uMin = cat?.usdRange ? cat.usdRange[0] : 5;
      const uMax = cat?.usdRange ? cat.usdRange[1] : 10;
      return {
        id: `specimen-${typeId}`,
        typeId,
        name: cat?.name || typeId,
        scientific: cat?.scientific || '',
        count,
        unit: cat?.nurseryUnit || '1x nursery specimen',
        usdMin: uMin * count,
        usdMax: uMax * count,
        costEst: formatPriceRange(uMin, uMax, selectedCurrency),
        totalCostEst: formatPriceRange(uMin * count, uMax * count, selectedCurrency),
        category: cat?.category || 'plants',
        family: cat?.family || ''
      };
    });

    const allItems = [vesselItem, ...substrateItems, ...specimenItems];

    // Total Estimated Physical Build Budget (Sum of vessel + substrates + all specimens)
    const totalUSDMin =
      vesselItem.usdMin +
      substrateItems.reduce((sum, s) => sum + s.usdMin, 0) +
      specimenItems.reduce((sum, sp) => sum + sp.usdMin, 0);

    const totalUSDMax =
      vesselItem.usdMax +
      substrateItems.reduce((sum, s) => sum + s.usdMax, 0) +
      specimenItems.reduce((sum, sp) => sum + sp.usdMax, 0);

    const totalBuildCostEst = formatPriceRange(totalUSDMin, totalUSDMax, selectedCurrency);

    return {
      vesselItem,
      substrateItems,
      specimenItems,
      totalSubstrateGrams,
      totalBuildCostEst,
      allItems
    };
  }, [substrates, items, currentVessel, selectedCurrency]);

  const handleCopyBOMChecklist = async () => {
    try {
      const substrateText = bomData.substrateItems
        .map((s) => `  - [${checkedBOMItems.includes(s.id) ? 'x' : ' '}] ${s.name}: ${s.grams}g (~${s.liters} L) - Est. ${s.costEst}`)
        .join('\n');

      const specimenText = bomData.specimenItems
        .map((sp) => `  - [${checkedBOMItems.includes(sp.id) ? 'x' : ' '}] ${sp.count}x ${sp.name} (${sp.unit}) - Est. ${sp.costEst} ea (${sp.totalCostEst} total)`)
        .join('\n');

      const text = `🌿 VerdantGlass Studio - Nursery Bill of Materials & Shopping List
Enclosure: ${bomData.vesselItem.name} (${bomData.vesselItem.spec}) [Est. ${bomData.vesselItem.costEst}]
Currency: ${CURRENCIES[selectedCurrency]?.name || selectedCurrency} (${CURRENCIES[selectedCurrency]?.flag || ''})

Substrates & Drainage (Total: ~${bomData.totalSubstrateGrams}g):
${substrateText}

Living Flora, Hardscape & Fauna:
${specimenText}

Total Estimated Physical Build Cost: ${bomData.totalBuildCostEst}
Generated from VerdantGlass Studio: https://terrariumstudio.web.app/`;

      await navigator.clipboard.writeText(text);
      showToast(`Checklist copied in ${selectedCurrency}!`, 'success');
    } catch (_) {
      showToast('Checklist ready (Copy failed in this context)', 'info');
    }
  };

  const handlePrintBOM = () => {
    window.print();
  };

  const toggleBOMItem = (id) => {
    setCheckedBOMItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSvgPointerDown = () => {
    setSelectedItemId(null);
  };

  // Mist Spray Effect & Sound Synthesis
  const handleTriggerMist = () => {
    setIsMisting(true);
    const nextHumidity = Math.min(99, Math.round(humidity + 12 * currentVessel.humidityRetention));
    setHumidity(nextHumidity);

    if (!isSoundMuted) {
      try {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            audioCtxRef.current = new AudioContext();
          }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        if (audioCtxRef.current) {
          const ctx = audioCtxRef.current;
          const bufferSize = ctx.sampleRate * 0.6;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1400;
          filter.Q.value = 1.2;

          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.58);

          whiteNoise.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          whiteNoise.start();
        }
      } catch (_) {}
    }

    const droplets = Array.from({ length: 28 }).map((_, idx) => ({
      id: `drop-${Date.now()}-${idx}`,
      x: 115 + Math.random() * 170,
      y: 120 + Math.random() * 230,
      r: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 0.35
    }));
    setMistParticles(droplets);

    setTimeout(() => {
      setIsMisting(false);
      setMistParticles([]);
    }, 1400);
  };

  const handleLoadPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    setVesselId(preset.vesselId);
    setSubstrates({ ...preset.substrates });
    const nextItems = preset.items.map((item) => ({ ...item }));
    setItems(nextItems);
    setHumidity(preset.humidity);
    setLighting(preset.lighting);
    setSelectedItemId(null);

    pushHistorySnapshot({
      vesselId: preset.vesselId,
      substrates: { ...preset.substrates },
      items: nextItems,
      humidity: preset.humidity,
      lighting: preset.lighting
    });
    showToast(`Loaded ${preset.name} template!`, 'success');
  };

  const handleClearTerrarium = () => {
    setItems([]);
    setSelectedItemId(null);
    pushHistorySnapshot({
      vesselId,
      substrates,
      items: [],
      humidity,
      lighting
    });
    showToast('Emptied all plants and decor', 'info');
  };

  // Saved Enclosure Slot Management (LocalStorage)
  const handleSaveSlot = (name) => {
    const cleanName = (name || '').trim();
    if (!cleanName) return;
    const newSlot = {
      id: `slot-${Date.now()}`,
      name: cleanName,
      timestamp: Date.now(),
      vesselId,
      substrates: { ...substrates },
      items: items.map((it) => ({ ...it })),
      humidity,
      lighting,
      score: ecosystemReport.score
    };

    const updated = [newSlot, ...savedSlots.filter((s) => s.name.toLowerCase() !== cleanName.toLowerCase())];
    setSavedSlots(updated);
    try {
      localStorage.setItem('verdantglass_saved_slots', JSON.stringify(updated));
    } catch (_) {}
    setNewSlotName('');
    showToast(`Archived "${cleanName}"!`, 'success');
  };

  const handleLoadSlot = (slot) => {
    if (!slot) return;
    setVesselId(slot.vesselId);
    setSubstrates({ ...slot.substrates });
    const loadedItems = (slot.items || []).map((it) => ({ ...it }));
    setItems(loadedItems);
    setHumidity(slot.humidity ?? 70);
    setLighting(slot.lighting ?? 'day');
    setSelectedItemId(null);

    pushHistorySnapshot({
      vesselId: slot.vesselId,
      substrates: { ...slot.substrates },
      items: loadedItems,
      humidity: slot.humidity ?? 70,
      lighting: slot.lighting ?? 'day'
    });
    setIsSavedModalOpen(false);
    showToast(`Loaded "${slot.name}"`, 'success');
  };

  const handleDeleteSlot = (slotId) => {
    const updated = savedSlots.filter((s) => s.id !== slotId);
    setSavedSlots(updated);
    try {
      localStorage.setItem('verdantglass_saved_slots', JSON.stringify(updated));
    } catch (_) {}
    showToast('Enclosure removed from archives', 'info');
  };

  const handleExportAllSlotsJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedSlots, null, 2));
      const link = document.createElement('a');
      link.href = dataStr;
      link.download = `verdantglass-archives-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported archives JSON backup', 'success');
    } catch (_) {
      showToast('Failed to export JSON backup', 'warn');
    }
  };

  const handleImportSlotsJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          const merged = [...parsed, ...savedSlots];
          const unique = Array.from(new Map(merged.map((s) => [s.id, s])).values());
          setSavedSlots(unique);
          localStorage.setItem('verdantglass_saved_slots', JSON.stringify(unique));
          showToast(`Imported ${parsed.length} enclosures!`, 'success');
        } else {
          showToast('Invalid JSON file format', 'warn');
        }
      } catch (_) {
        showToast('Invalid JSON file', 'warn');
      }
    };
    reader.readAsText(file);
  };

  // Deep-Link Share URL computation & clipboard copy
  const currentShareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const hash = encodeBuildState({
      vesselId,
      substrates,
      items,
      humidity,
      lighting,
      temperature,
      glassTint,
      pedestalType
    });
    return `${window.location.origin}${window.location.pathname}#build=${hash}`;
  }, [vesselId, substrates, items, humidity, lighting, temperature, glassTint, pedestalType]);

  // Generate QR Code data URL for Printable Passport & Gift Card
  useEffect(() => {
    if (!currentShareUrl) return;
    QRCode.toDataURL(currentShareUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => setPassportQrDataUrl(url))
      .catch((err) => console.warn('QR Code generation failed:', err));
  }, [currentShareUrl]);

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentShareUrl);
      setCopiedShareLink(true);
      showToast('Link copied to clipboard!', 'success');
      setTimeout(() => setCopiedShareLink(false), 2500);
    } catch (_) {
      showToast('Could not copy link automatically', 'warn');
    }
  };

  // High-Resolution Photo Studio Export Engine
  const handleRenderAndDownloadArtwork = () => {
    if (!svgRef.current) return;
    setIsRenderingExport(true);

    try {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgRef.current);

      if (exportFormat === 'svg') {
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `verdantglass-${vesselId}-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('SVG artwork exported!', 'success');
        setIsRenderingExport(false);
        setIsPhotoStudioOpen(false);
        return;
      }

      // PNG High-Res Rasterization with Canvas
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const scale = exportResolution; // 1 | 2 | 4
        const terrariumW = 400 * scale;
        const terrariumH = 520 * scale;
        const plaqueH = includePlaque ? 80 * scale : 0;

        const canvas = document.createElement('canvas');
        canvas.width = terrariumW;
        canvas.height = terrariumH + plaqueH;
        const ctx = canvas.getContext('2d');

        // 1. Draw Background
        if (exportBackdrop === 'studio') {
          const grad = ctx.createRadialGradient(
            terrariumW / 2, terrariumH * 0.4, 20 * scale,
            terrariumW / 2, (terrariumH + plaqueH) / 2, terrariumH
          );
          grad.addColorStop(0, '#16231c');
          grad.addColorStop(0.6, '#0c1410');
          grad.addColorStop(1, '#050806');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (exportBackdrop === 'white') {
          ctx.fillStyle = '#f7f6f2';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // 2. Draw Terrarium Vessel Artwork
        ctx.drawImage(img, 0, 0, terrariumW, terrariumH);

        // 3. Draw Engraved Brass Archival Plaque
        if (includePlaque) {
          const pTop = terrariumH;
          const pHeight = plaqueH;
          const pWidth = terrariumW;

          // Plaque base plate
          const plaqueGrad = ctx.createLinearGradient(0, pTop, 0, pTop + pHeight);
          plaqueGrad.addColorStop(0, '#1c1b18');
          plaqueGrad.addColorStop(0.5, '#121210');
          plaqueGrad.addColorStop(1, '#0d0d0b');
          ctx.fillStyle = plaqueGrad;
          ctx.fillRect(0, pTop, pWidth, pHeight);

          // Double Gold Borders
          ctx.strokeStyle = '#d4af37';
          ctx.lineWidth = 2 * scale;
          ctx.strokeRect(12 * scale, pTop + 8 * scale, pWidth - 24 * scale, pHeight - 16 * scale);

          ctx.strokeStyle = '#8c7322';
          ctx.lineWidth = 1 * scale;
          ctx.strokeRect(15 * scale, pTop + 11 * scale, pWidth - 30 * scale, pHeight - 22 * scale);

          // Golden Corner Rivets
          const rivetCoords = [
            [20 * scale, pTop + 16 * scale],
            [pWidth - 20 * scale, pTop + 16 * scale],
            [20 * scale, pTop + pHeight - 16 * scale],
            [pWidth - 20 * scale, pTop + pHeight - 16 * scale]
          ];
          rivetCoords.forEach(([rx, ry]) => {
            ctx.beginPath();
            ctx.arc(rx, ry, 2.5 * scale, 0, Math.PI * 2);
            ctx.fillStyle = '#b89635';
            ctx.fill();
          });

          // Text Engravings
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Small-caps Archival Header
          ctx.fillStyle = '#b89635';
          ctx.font = `600 ${9 * scale}px "Georgia", "Times New Roman", serif`;
          ctx.fillText('VERDANTGLASS BOTANICAL ARCHIVES', pWidth / 2, pTop + 24 * scale);

          // Custom Specimen Title
          ctx.fillStyle = '#f4e8c1';
          ctx.font = `bold ${13 * scale}px "Georgia", serif`;
          const titleText = customPlaqueTitle || `SPECIMEN NO. ${items.length} • ${currentVessel.name.toUpperCase()}`;
          ctx.fillText(titleText, pWidth / 2, pTop + 42 * scale);

          // Bottom Metadata Bar
          const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
          ctx.fillStyle = '#a19375';
          ctx.font = `500 ${8.5 * scale}px monospace, sans-serif`;
          ctx.fillText(
            `${currentVessel.name.toUpperCase()}  |  BIO-HARMONY: ${ecosystemReport.score}/100  |  ${dateStr.toUpperCase()}`,
            pWidth / 2,
            pTop + 60 * scale
          );
        }

        // 4. Download Resulting PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            const resTag = scale === 4 ? '4K' : scale === 2 ? 'HD' : '1x';
            link.download = `verdantglass-${vesselId}-${resTag}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            showToast(`Exported ${resTag} PNG photo!`, 'success');
          }
          URL.revokeObjectURL(svgUrl);
          setIsRenderingExport(false);
          setIsPhotoStudioOpen(false);
        }, 'image/png');
      };

      img.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        setIsRenderingExport(false);
        showToast('Rasterization error. Please choose SVG format.', 'warn');
      };

      img.src = svgUrl;
    } catch (err) {
      console.error(err);
      setIsRenderingExport(false);
      showToast('Export failed', 'warn');
    }
  };

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.zIndex - b.zIndex),
    [items]
  );

  const filteredCatalog = useMemo(() => {
    if (catalogFilter === 'all') return CATALOG_ITEMS;
    if (catalogFilter === 'plants') return CATALOG_ITEMS.filter((i) => i.category === 'plants');
    return CATALOG_ITEMS.filter((i) => i.category !== 'plants');
  }, [catalogFilter]);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${currentLighting.bgGradient} text-stone-100 flex flex-col transition-colors duration-700 select-none overflow-x-hidden`}
    >
      {/* ==========================================
          TOP HEADER BAR & PRESET SELECTOR
          ========================================== */}
      <header className="border-b border-white/10 bg-stone-950/60 backdrop-blur-md px-4 lg:px-6 py-3 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-inner">
            <Sprout className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">
                VerdantGlass <span className="font-light text-emerald-400">Studio</span>
              </h1>
              <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                Bio-Simulator
              </span>
            </div>
            <p className="text-xs text-stone-300 hidden sm:block">
              Interactive Botanical Terrarium & Micro-Ecosystem Architect
            </p>
          </div>
        </div>

        {/* Presets & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-300 mr-1 hidden md:inline">Templates:</span>
          <button
            onClick={() => handleLoadPreset('rainforest')}
            aria-label="Tropical Rainforest - Load preset"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            Tropical Rainforest
          </button>
          <button
            onClick={() => handleLoadPreset('desert')}
            aria-label="Desert Oasis - Load preset"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-950/80 hover:bg-amber-900/90 text-amber-200 border border-amber-700/50 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            Desert Oasis
          </button>
          <button
            onClick={() => handleLoadPreset('zen')}
            aria-label="Zen Moss Garden - Load preset"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 border border-purple-700/50 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            Zen Moss Garden
          </button>

          {/* Inspire Me Auto-Scaper Button */}
          <button
            onClick={() => handleAutoScape()}
            aria-label="Inspire Me - Procedural auto-scaper"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-emerald-500/20 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
            title="Generate Procedural Terrarium Theme (Inspire Me)"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" aria-hidden="true" />
            <span>Inspire Me</span>
          </button>

          <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Undo & Redo History */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              aria-label="Undo last modification (Ctrl+Z)"
              className={`p-1.5 rounded-lg text-xs border transition flex items-center justify-center min-w-[32px] min-h-[32px] ${
                historyIndex > 0
                  ? 'bg-stone-800/80 text-stone-200 border-white/10 hover:text-white hover:bg-stone-700 cursor-pointer active:scale-95'
                  : 'bg-stone-900/40 text-stone-600 border-white/5 cursor-not-allowed opacity-40'
              }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              aria-label="Redo last modification (Ctrl+Y)"
              className={`p-1.5 rounded-lg text-xs border transition flex items-center justify-center min-w-[32px] min-h-[32px] ${
                historyIndex < history.length - 1
                  ? 'bg-stone-800/80 text-stone-200 border-white/10 hover:text-white hover:bg-stone-700 cursor-pointer active:scale-95'
                  : 'bg-stone-900/40 text-stone-600 border-white/5 cursor-not-allowed opacity-40'
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Saved Enclosures Archives */}
          <button
            onClick={() => setIsSavedModalOpen(true)}
            aria-label="Archives - Open Saved Enclosures"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer relative active:scale-95"
            title="Saved Terrarium Enclosures"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span className="hidden sm:inline">Archives</span>
            {savedSlots.length > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {savedSlots.length}
              </span>
            )}
          </button>

          {/* Share Deep-Link */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            aria-label="Share - Interactive Terrarium Link"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Share Interactive Link"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Botanical Field Guide / Care Encyclopedia */}
          <button
            onClick={() => {
              setSelectedCareItem(null);
              setIsCareModalOpen(true);
            }}
            aria-label="Field Guide - Open Botanical Care Encyclopedia"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Botanical Field Guide & Care Encyclopedia"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="hidden sm:inline">Field Guide</span>
          </button>

          {/* Nursery BOM & Shopping List Generator */}
          <button
            onClick={() => setIsBOMModalOpen(true)}
            aria-label="Nursery BOM - Generate Nursery Bill of Materials & Shopping List"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Real-World Nursery Shopping List & Substrate Masses"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span className="hidden sm:inline">Nursery BOM</span>
          </button>

          {/* DIY Physical Build Guide */}
          <button
            onClick={() => {
              setBuildWizardStep(0);
              setIsBuildWizardOpen(true);
            }}
            aria-label="Build Guide - Open DIY Physical Build Instructions"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="7-Step DIY Physical Build Walkthrough & Caliper Guide"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
            <span className="hidden sm:inline">Build Guide</span>
          </button>

          {/* Botanical Care Passport & QR Gift Certificate */}
          <button
            onClick={() => setIsPassportModalOpen(true)}
            aria-label="Passport & QR - Open Botanical Care Passport & Gift Certificate"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Printable Botanical Care Passport & QR Gift Certificate"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span className="hidden sm:inline">Passport & QR</span>
          </button>

          {/* Procedural Soundscape Toggle */}
          <button
            onClick={() => {
              setIsAmbientSoundActive((prev) => {
                const next = !prev;
                if (next && isSoundMuted) setIsSoundMuted(false);
                showToast(next ? 'Canopy Wind & Nocturnal Crickets On' : 'Ambient Sound Off', 'info');
                return next;
              });
            }}
            aria-label="Breeze - Toggle ambient procedural soundscape"
            className={`p-1.5 rounded-lg text-xs border transition flex items-center gap-1.5 cursor-pointer min-w-[32px] min-h-[32px] justify-center ${
              isAmbientSoundActive && !isSoundMuted
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-stone-800/80 text-stone-300 border-white/10 hover:text-white'
            }`}
            title="Canopy Breeze & Nocturnal Crickets"
          >
            <Wind className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden xl:inline text-xs">Breeze</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setIsSoundMuted((prev) => !prev)}
            aria-label={isSoundMuted ? "Unmute ambient audio" : "Mute ambient audio"}
            className={`p-1.5 rounded-lg text-xs border transition flex items-center gap-1 cursor-pointer min-w-[32px] min-h-[32px] justify-center ${
              !isSoundMuted 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-stone-800/80 text-stone-300 border-white/10 hover:text-white'
            }`}
            title={isSoundMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleClearTerrarium}
            aria-label="Empty - Clear all placed items"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-rose-950/80 hover:text-rose-200 hover:border-rose-700/50 text-stone-200 border border-white/10 transition flex items-center gap-1 cursor-pointer active:scale-95"
            title="Clear all plants and decor"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Empty</span>
          </button>

          {/* Zen Sanctuary Toggle Button */}
          <button
            onClick={() => {
              setIsZenMode((z) => {
                const next = !z;
                showToast(next ? 'Entered Zen Sanctuary (Press Esc to exit)' : 'Exited Zen Sanctuary', 'info');
                return next;
              });
            }}
            aria-label="Zen Mode - Toggle ambient full-screen sanctuary"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isZenMode
                ? 'bg-purple-500/25 text-purple-200 border-purple-400/50 shadow-sm'
                : 'bg-stone-800/80 hover:bg-stone-700 text-stone-200 border-white/10'
            }`}
            title="Zen Sanctuary Living Lamp Mode (F)"
          >
            {isZenMode ? <Minimize2 className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" /> : <Maximize2 className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />}
            <span className="hidden sm:inline">Zen Mode</span>
          </button>

          <button
            onClick={() => setIsPhotoStudioOpen(true)}
            aria-label="Photo Studio - High-resolution snapshot & archival export"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 active:scale-95 cursor-pointer"
            title="High-Res Photo Studio"
          >
            <Camera className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Photo Studio</span>
          </button>
        </div>
      </header>

      {/* ==========================================
          MAIN 3-COLUMN WORKSPACE
          ========================================== */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:p-6 max-w-[1600px] w-full mx-auto items-start">
        
        {/* LEFT PANEL: VESSEL, SUBSTRATE & CATALOG */}
        {!isZenMode && (
        <section aria-label="Terrarium Design Controls" className="lg:col-span-4 bg-stone-900/75 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden flex flex-col">
          {/* Navigation Tabs */}
          <div role="tablist" aria-label="Designer Modules" className="grid grid-cols-3 p-1.5 bg-stone-950/80 border-b border-white/10 gap-1">
            {[
              { id: 'vessel', label: '1. Vessel', icon: Maximize2 },
              { id: 'substrate', label: '2. Substrate', icon: Layers },
              { id: 'catalog', label: '3. Flora & Decor', icon: Sprout }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-emerald-500 text-stone-950 shadow-md'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-4 overflow-y-auto max-h-[540px] space-y-4">
            {/* TAB 1: VESSEL SELECTION */}
            {activeTab === 'vessel' && (
              <div id="panel-vessel" role="tabpanel" aria-labelledby="tab-vessel" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">Select Glass Container</h2>
                  <span className="text-xs text-stone-300">{VESSELS.length} Designs</span>
                </div>
                <div className="space-y-2.5">
                  {VESSELS.map((v) => {
                    const isSelected = v.id === vesselId;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleSelectVessel(v.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-400/60 shadow-lg'
                            : 'bg-stone-950/50 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white">{v.name}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium ${
                                v.type === 'closed'
                                  ? 'bg-teal-500/20 text-teal-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {v.type}
                            </span>
                          </div>
                          <p className="text-xs text-stone-300 mt-1">{v.subtitle}</p>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-emerald-400' : 'text-stone-500'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Phase 4: Glass Tint Customizer */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      Architectural Glass Tint
                    </label>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">
                      {GLASS_TINTS[glassTint]?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(GLASS_TINTS).map((gt) => {
                      const isActive = glassTint === gt.id;
                      return (
                        <button
                          key={gt.id}
                          onClick={() => {
                            setGlassTint(gt.id);
                            pushHistorySnapshot({ glassTint: gt.id });
                            showToast(`Glass Tint: ${gt.name}`, 'info');
                          }}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500/15 border-emerald-400/60 shadow-md'
                              : 'bg-stone-950/40 border-white/10 hover:border-white/25'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                            style={{
                              backgroundColor:
                                gt.id === 'clear'
                                  ? 'rgba(255,255,255,0.2)'
                                  : gt.id === 'amber'
                                  ? '#b45309'
                                  : gt.id === 'seaglass'
                                  ? '#059669'
                                  : '#1e293b'
                            }}
                          />
                          <span className="text-xs font-medium text-stone-200 truncate">{gt.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Phase 4: Pedestal Display Base */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      Display Pedestal Base
                    </label>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">
                      {PEDESTAL_BASES[pedestalType]?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {Object.values(PEDESTAL_BASES).map((pb) => {
                      const isActive = pedestalType === pb.id;
                      return (
                        <button
                          key={pb.id}
                          onClick={() => {
                            setPedestalType(pb.id);
                            pushHistorySnapshot({ pedestalType: pb.id });
                            showToast(`Pedestal: ${pb.name}`, 'info');
                          }}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                            isActive
                              ? 'bg-amber-500/15 border-amber-400/60 shadow-md'
                              : 'bg-stone-950/40 border-white/10 hover:border-white/25'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: pb.id === 'none' ? 'transparent' : pb.topColor }}
                          />
                          <span className="text-[11px] font-medium text-stone-200 truncate">{pb.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SUBSTRATE LAYERING SYSTEM */}
            {activeTab === 'substrate' && (
              <div id="panel-substrate" role="tabpanel" aria-labelledby="tab-substrate" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-white">Substrate Layering</h2>
                    <p className="text-xs text-stone-300">
                      Adjust sliders to pour or reduce foundational strata
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-950 text-emerald-400 border border-white/10">
                    Total: {substrateStack.totalHeight}mm
                  </span>
                </div>

                {/* Sliders for each substrate layer */}
                <div className="space-y-3">
                  {SUBSTRATE_CONFIG.map((layer) => {
                    const currentVal = substrates[layer.key] || 0;
                    const isOptimal =
                      currentVal >= layer.recommendedMin && currentVal <= layer.recommendedMax;
                    return (
                      <div
                        key={layer.key}
                        className="p-3 rounded-xl bg-stone-950/60 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <label htmlFor={`slider-${layer.key}`} className="flex items-center gap-2 cursor-pointer">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-sm"
                              style={{ backgroundColor: layer.color }}
                              aria-hidden="true"
                            />
                            <span className="text-xs font-semibold text-stone-100">
                              {layer.name}
                            </span>
                          </label>
                          <span className="text-xs font-mono text-stone-200">{currentVal} mm</span>
                        </div>
                        <p className="text-[11px] text-stone-300">{layer.role}</p>
                        <input
                          id={`slider-${layer.key}`}
                          aria-label={`${layer.name} thickness in millimeters`}
                          type="range"
                          min="0"
                          max="70"
                          value={currentVal}
                          onChange={(e) => handleSubstrateChange(layer.key, e.target.value)}
                          className="w-full accent-emerald-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
                        />
                        <div className="flex justify-between text-[10px] text-stone-400">
                          <span>0mm</span>
                          <span className={isOptimal ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                            Ideal: {layer.recommendedMin}–{layer.recommendedMax}mm
                          </span>
                          <span>70mm</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: BOTANICAL & HARDSCAPE CATALOG */}
            {activeTab === 'catalog' && (
              <div id="panel-catalog" role="tabpanel" aria-labelledby="tab-catalog" className="space-y-3">
                {/* Filter Pills */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5" role="group" aria-label="Catalog categories">
                    {[
                      { id: 'all', label: 'All Items' },
                      { id: 'plants', label: 'Living Flora' },
                      { id: 'hardscape', label: 'Hardscape & Fauna' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        aria-pressed={catalogFilter === f.id}
                        onClick={() => setCatalogFilter(f.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                          catalogFilter === f.id
                            ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40'
                            : 'bg-stone-950/60 text-stone-300 hover:text-white border border-white/5'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">Click to place</span>
                </div>

                {/* Grid of Catalog Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {filteredCatalog.map((item) => (
                    <button
                      key={item.id}
                      aria-label={`Add ${item.name} to terrarium`}
                      onClick={() => handleAddItem(item)}
                      className="group p-2.5 rounded-xl bg-stone-950/60 hover:bg-stone-800/80 border border-white/10 hover:border-emerald-400/50 transition-all text-left flex flex-col justify-between relative overflow-hidden cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                            item.biome === 'tropical'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : item.biome === 'arid'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-stone-700/60 text-stone-200'
                          }`}
                        >
                          {item.biome}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>

                      {/* Mini SVG Preview */}
                      <div className="h-20 w-full flex items-center justify-center my-1 pointer-events-none" aria-hidden="true">
                        <svg viewBox="-55 -95 110 110" className="w-16 h-16 overflow-visible">
                          <RenderBotanicalArtwork
                            type={item.id}
                            uvActive={currentLighting.uvActive}
                          />
                        </svg>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition line-clamp-1">
                          {item.name}
                        </div>
                        <div className="text-[10px] italic text-stone-300 line-clamp-1">
                          {item.scientific}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        )}

        {/* ==========================================
            CENTER PANEL: INTERACTIVE SVG TERRARIUM STAGE
            ========================================== */}
        <section
          aria-label="Interactive Terrarium Enclosure"
          className={`${
            isZenMode
              ? 'lg:col-span-12 flex flex-col items-center justify-center min-h-[85vh] py-2 relative'
              : 'lg:col-span-5 flex flex-col items-center justify-center relative'
          }`}
        >
          {/* Quick Floating Environment Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 px-3 py-2 rounded-2xl bg-stone-900/85 border border-white/10 backdrop-blur-md shadow-lg">
            {/* Diurnal Time-Lapse Player Pill */}
            <div className="flex items-center gap-1.5 bg-stone-950/70 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setIsCyclePlaying((p) => !p)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition cursor-pointer min-h-[30px] ${
                  isCyclePlaying
                    ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-stone-900 text-stone-300 border-white/10 hover:text-white'
                }`}
                title={isCyclePlaying ? 'Pause Automated 24h Day/Night Cycle' : 'Play Automated 24h Day/Night Cycle'}
              >
                {isCyclePlaying ? <Pause className="w-3.5 h-3.5" aria-hidden="true" /> : <Play className="w-3.5 h-3.5" aria-hidden="true" />}
                <span className="text-xs font-semibold hidden md:inline">
                  {isCyclePlaying ? 'Pause' : 'Play Cycle'}
                </span>
              </button>

              <div className="flex items-center gap-1 px-1.5 text-xs font-mono font-bold text-stone-200">
                <Clock className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>
                  {Math.floor(timeOfDay).toString().padStart(2, '0')}:
                  {Math.floor((timeOfDay % 1) * 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Cycle Speed Selector */}
              <button
                onClick={() => setCycleSpeed((s) => (s === 1 ? 5 : s === 5 ? 20 : 1))}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-800 text-stone-300 hover:text-white border border-white/10 transition cursor-pointer"
                title="Change Cycle Simulation Speed"
              >
                {cycleSpeed}x
              </button>
            </div>

            {/* Lighting Mode Switcher (All 6 modes) */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5" role="group" aria-label="Lighting Environment">
              {Object.values(LIGHTING_MODES).map((mode) => {
                const Icon = mode.icon;
                const active = lighting === mode.id;
                return (
                  <button
                    key={mode.id}
                    aria-label={`Set lighting to ${mode.name}`}
                    aria-pressed={active}
                    onClick={() => {
                      setLighting(mode.id);
                      if (mode.id === 'dawn') setTimeOfDay(6.5);
                      else if (mode.id === 'day') setTimeOfDay(12.0);
                      else if (mode.id === 'golden') setTimeOfDay(17.5);
                      else if (mode.id === 'twilight') setTimeOfDay(20.0);
                      else if (mode.id === 'night') setTimeOfDay(23.5);
                      else if (mode.id === 'uv') setTimeOfDay(2.5);
                    }}
                    className={`px-2 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition cursor-pointer min-h-[30px] ${
                      active
                        ? 'bg-white/15 text-white border border-white/25 shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                    title={`${mode.name} (${mode.timeLabel})`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? mode.accentText : ''}`} aria-hidden="true" />
                    <span className="hidden xl:inline">{mode.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right group: Mist Spray, Water Cycle, Chime & Zen */}
            <div className="flex items-center gap-1.5">
              {/* Dynamic Water Cycle Evaporation Status */}
              <button
                onClick={() => {
                  setIsEvaporationActive((p) => {
                    const next = !p;
                    showToast(next ? 'Natural Evaporation Cycle: Active' : 'Evaporation: Paused', 'info');
                    return next;
                  });
                }}
                className={`p-1.5 rounded-xl border text-xs flex items-center gap-1 transition cursor-pointer min-h-[30px] ${
                  isEvaporationActive
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/30'
                    : 'bg-stone-900 text-stone-500 border-white/5'
                }`}
                title={`Water Cycle & Evaporation: ${isEvaporationActive ? 'Active (Dynamic)' : 'Paused'}`}
              >
                <CloudRain className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[11px] hidden lg:inline">
                  {currentVessel.type === 'closed' ? 'Closed Glass' : 'Evaporating'}
                </span>
              </button>

              {/* 432Hz Zen Singing Bowl Chime */}
              <button
                onClick={playZenHarmonicChime}
                className="p-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/40 text-xs flex items-center gap-1 transition cursor-pointer min-h-[30px]"
                title="432 Hz Zen Singing Bowl Harmonic Chime"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {/* Mist Spray */}
              <button
                onClick={handleTriggerMist}
                aria-label="Spray water mist into terrarium"
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 transition flex items-center gap-1 active:scale-95 cursor-pointer shadow-sm min-h-[30px]"
              >
                <Droplets className={`w-3.5 h-3.5 ${isMisting ? 'animate-bounce' : ''}`} aria-hidden="true" />
                <span>Mist</span>
              </button>

              {/* HUD Guides */}
              <button
                onClick={() => setShowHudLabels((p) => !p)}
                aria-label={showHudLabels ? "Hide layer depth guides" : "Show layer depth guides"}
                className="p-1.5 rounded-xl bg-stone-800/80 text-stone-200 hover:text-white border border-white/10 cursor-pointer min-w-[30px] min-h-[30px] flex items-center justify-center"
                title="Toggle Layer Depth Guides"
              >
                {showHudLabels ? <Eye className="w-3.5 h-3.5" aria-hidden="true" /> : <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>

              {/* Zen Fullscreen Button */}
              <button
                onClick={() => {
                  setIsZenMode((p) => {
                    const next = !p;
                    showToast(next ? 'Entered Zen Sanctuary (Press Esc to exit)' : 'Exited Zen Sanctuary', 'info');
                    return next;
                  });
                }}
                aria-label={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
                className={`p-1.5 rounded-xl border cursor-pointer min-w-[30px] min-h-[30px] flex items-center justify-center transition ${
                  isZenMode
                    ? 'bg-purple-500/25 text-purple-200 border-purple-400/50'
                    : 'bg-stone-800/80 text-stone-200 hover:text-white border-white/10'
                }`}
                title={isZenMode ? "Exit Zen Mode (Esc)" : "Zen Fullscreen Mode (F)"}
              >
                {isZenMode ? <Minimize2 className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" /> : <Maximize2 className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Time-Lapse Growth Scrubber & Canvas Zoom Bar */}
          <div className={`flex flex-wrap items-center justify-between gap-2 w-full ${isZenMode ? 'max-w-[540px]' : 'max-w-[460px]'} px-1 transition-all duration-500`}>
            {/* Time-Lapse Growth Scrubber */}
            <div className="flex items-center gap-1 bg-stone-900/80 px-2.5 py-1 rounded-xl border border-white/10 shadow-sm">
              <Sprout className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="text-[11px] text-stone-300 font-medium hidden sm:inline mr-1">Time-Lapse:</span>
              {[
                { stage: 0, label: 'Day 1' },
                { stage: 1, label: '3 Mo' },
                { stage: 2, label: '6 Mo' },
                { stage: 3, label: '1 Yr' }
              ].map((st) => (
                <button
                  key={st.stage}
                  onClick={() => {
                    setGrowthStage(st.stage);
                    showToast(
                      st.stage === 0 ? 'Day 1: Freshly Planted'
                      : st.stage === 1 ? '3 Months: Rooted & Acclimated'
                      : st.stage === 2 ? '6 Months: Lush Canopy Spread'
                      : '1 Year: Mature Micro-Jungle!',
                      'info'
                    );
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    growthStage === st.stage
                      ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                  title={`Simulate botanical development: ${st.label}`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Canvas Zoom & Reset Controls */}
            <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-white/10 shadow-sm">
              <button
                onClick={() => setZoomScale((prev) => Math.max(0.75, Number((prev - 0.15).toFixed(2))))}
                aria-label="Zoom out terrarium canvas"
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition cursor-pointer min-w-[24px] flex items-center justify-center"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <span className="text-[11px] font-mono text-stone-300 min-w-[34px] text-center select-none">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((prev) => Math.min(2.0, Number((prev + 0.15).toFixed(2))))}
                aria-label="Zoom in terrarium canvas"
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition cursor-pointer min-w-[24px] flex items-center justify-center"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              {zoomScale !== 1.0 && (
                <button
                  onClick={() => setZoomScale(1.0)}
                  aria-label="Reset zoom to 100%"
                  className="p-1 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-stone-800 transition cursor-pointer"
                  title="Reset View (100%)"
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Phase 4: Canvas Secondary Controls Toolbar (Climate, Aquascaping Grids, X-Ray Strata & 1-Click Fix) */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-stone-900/80 border border-white/10 backdrop-blur-md shadow-lg text-xs">
            {/* 1. Micro-Climate Temperature Controller */}
            <div className="flex items-center gap-1.5 bg-stone-950/80 px-2.5 py-1 rounded-xl border border-white/10">
              <Thermometer className={`w-3.5 h-3.5 ${temperature < 18 ? 'text-sky-400' : temperature > 27 ? 'text-amber-400' : 'text-emerald-400'}`} aria-hidden="true" />
              <span className="text-[11px] text-stone-400 hidden sm:inline">Temp:</span>
              <button
                type="button"
                onClick={() => setTemperature((prev) => Math.max(15, prev - 1))}
                aria-label="Decrease temperature"
                className="w-5 h-5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-xs transition cursor-pointer"
                title="Cool Enclosure (-1°C)"
              >
                -
              </button>
              <span className={`font-mono font-bold text-xs min-w-[34px] text-center ${temperature < 18 ? 'text-sky-300' : temperature > 27 ? 'text-amber-300' : 'text-emerald-300'}`}>
                {temperature}°C
              </span>
              <button
                type="button"
                onClick={() => setTemperature((prev) => Math.min(32, prev + 1))}
                aria-label="Increase temperature"
                className="w-5 h-5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-xs transition cursor-pointer"
                title="Warm Enclosure (+1°C)"
              >
                +
              </button>
            </div>

            {/* 2. Aquascaping Composition Grid Switcher */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const modes = ['none', 'ruleOfThirds', 'goldenSpiral', 'triangularSlope'];
                  const nextIdx = (modes.indexOf(compositionGrid) + 1) % modes.length;
                  const nextMode = modes[nextIdx];
                  setCompositionGrid(nextMode);
                  const labels = {
                    none: 'Grid: Off',
                    ruleOfThirds: 'Grid: Rule of Thirds',
                    goldenSpiral: 'Grid: Golden Spiral',
                    triangularSlope: 'Grid: Triangular Slope'
                  };
                  showToast(labels[nextMode], 'info');
                }}
                className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 transition cursor-pointer text-xs font-medium ${
                  compositionGrid !== 'none'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-stone-950/80 text-stone-300 border-white/10 hover:text-white hover:bg-stone-800'
                }`}
                title="Cycle Composition Grids (Rule of Thirds, Golden Spiral, Triangular Slope)"
              >
                <Grid className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span className="hidden sm:inline">
                  {compositionGrid === 'none' && 'Grid'}
                  {compositionGrid === 'ruleOfThirds' && '1/3 Grid'}
                  {compositionGrid === 'goldenSpiral' && 'Golden Spiral'}
                  {compositionGrid === 'triangularSlope' && 'Triangular'}
                </span>
              </button>

              {/* 3. Exploded X-Ray Strata View Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsExplodedView(!isExplodedView);
                  showToast(!isExplodedView ? 'X-Ray Strata View enabled' : 'Normal view restored', 'info');
                }}
                className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 transition cursor-pointer text-xs font-medium ${
                  isExplodedView
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                    : 'bg-stone-950/80 text-stone-300 border-white/10 hover:text-white hover:bg-stone-800'
                }`}
                title="Toggle Exploded Strata X-Ray View (Layer Depths & Weights)"
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span className="hidden sm:inline">X-Ray Strata</span>
              </button>

              {/* 4. 1-Click Ecosystem Auto-Fix Button */}
              <button
                type="button"
                onClick={handleAutoFixEcosystem}
                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer active:scale-95 text-xs"
                title="1-Click Auto-Fix: Automatically sets optimal climate, substrates & balanced biome"
              >
                <Wand2 className="w-3.5 h-3.5 text-emerald-200" aria-hidden="true" />
                <span>Auto-Fix</span>
              </button>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className={`relative w-full ${isZenMode ? 'max-w-[540px]' : 'max-w-[460px]'} aspect-[400/520] rounded-3xl bg-stone-950/40 border border-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-500`}>
            <svg
              ref={svgRef}
              viewBox="0 0 400 520"
              className="w-full h-full touch-none"
              style={{ transform: `scale(${zoomScale})`, transition: isPinching ? 'none' : 'transform 0.2s ease-out' }}
              aria-label="Interactive 3D Glass Terrarium View"
              role="img"
              onPointerDown={handleSvgPointerDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <defs>
                <clipPath id="vessel-clip">
                  <path d={currentVessel.clipPath} />
                </clipPath>

                <radialGradient id="lamp-glow" cx="50%" cy="15%" r="65%">
                  <stop offset="0%" stopColor={currentLighting.ambientGlow} />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>

                <linearGradient id="glass-sheen" x1="0%" y1="0%" x2="100%" y2="20%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.03)" />
                  <stop offset="75%" stopColor="rgba(255,255,255,0.01)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.16)" />
                </linearGradient>

                <pattern id="pat-pebbles" width="18" height="14" patternUnits="userSpaceOnUse">
                  <rect width="18" height="14" fill="#6e5d4f" />
                  <ellipse cx="5" cy="5" rx="4.5" ry="3.2" fill="#9c8978" />
                  <ellipse cx="13" cy="6" rx="4" ry="3" fill="#827060" />
                  <ellipse cx="8" cy="11" rx="4.8" ry="2.8" fill="#ab9887" />
                  <ellipse cx="15" cy="12" rx="3" ry="2.2" fill="#594a3e" />
                </pattern>

                <pattern id="pat-charcoal" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#181b1d" />
                  <polygon points="2,2 6,1 5,6 1,5" fill="#2f353a" />
                  <polygon points="8,4 11,3 10,8 7,7" fill="#0d0f10" />
                  <polygon points="3,8 7,9 6,11 2,11" fill="#373e44" />
                </pattern>

                <pattern id="pat-moss" width="20" height="12" patternUnits="userSpaceOnUse">
                  <rect width="20" height="12" fill="#5c743b" />
                  <path d="M0,6 Q5,1 10,6 T20,6" stroke="#789252" strokeWidth="3" fill="none" />
                  <path d="M0,10 Q5,5 10,10 T20,10" stroke="#8aa860" strokeWidth="2" fill="none" />
                </pattern>

                <pattern id="pat-soil" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect width="16" height="16" fill="#3a2719" />
                  <circle cx="4" cy="4" r="1.5" fill="#26180f" />
                  <circle cx="12" cy="6" r="1.8" fill="#523926" />
                  <circle cx="7" cy="12" r="1.4" fill="#26180f" />
                  <circle cx="14" cy="13" r="1.2" fill="#634630" />
                </pattern>

                <pattern id="pat-sand" width="16" height="12" patternUnits="userSpaceOnUse">
                  <rect width="16" height="12" fill="#dfc18b" />
                  <path d="M0,6 Q8,3 16,6" stroke="#cda96d" strokeWidth="2" fill="none" />
                  <circle cx="5" cy="3" r="0.8" fill="#f3dfb9" />
                  <circle cx="12" cy="9" r="0.9" fill="#b89358" />
                </pattern>
              </defs>

              {/* Background Ambient Glow & Light Rays */}
              <rect x="0" y="0" width="400" height="520" fill="url(#lamp-glow)" />
              <polygon
                points="140,0 260,0 360,480 40,480"
                fill={currentLighting.rayColor}
                opacity="0.45"
              />

              {/* Dynamic Pedestal Base */}
              {pedestalType !== 'none' && (
                <g>
                  {pedestalType === 'led_halo' && (
                    <ellipse
                      cx="200"
                      cy="470"
                      rx="155"
                      ry="22"
                      fill="none"
                      stroke={PEDESTAL_BASES.led_halo.stroke}
                      strokeWidth="5"
                      opacity="0.85"
                      filter="drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))"
                    />
                  )}
                  <ellipse
                    cx="200"
                    cy="472"
                    rx="145"
                    ry="18"
                    fill={PEDESTAL_BASES[pedestalType]?.rimColor || '#291d15'}
                    stroke={PEDESTAL_BASES[pedestalType]?.stroke || '#423023'}
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="200"
                    cy="467"
                    rx="135"
                    ry="13"
                    fill={PEDESTAL_BASES[pedestalType]?.topColor || '#3d2b1f'}
                  />
                  {pedestalType === 'marble' && (
                    <path
                      d="M 120 467 Q 160 464 200 468 T 280 466"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                      opacity="0.45"
                      fill="none"
                    />
                  )}
                </g>
              )}

              {/* Hanging Chain for Globe */}
              {currentVessel.rimPath && (
                <path
                  d={currentVessel.rimPath}
                  stroke="#a8a29e"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              )}

              {/* Cork Stopper Lid (For Apothecary & Flask) */}
              {currentVessel.lidType === 'cork' && (
                <path
                  d={currentVessel.lidPath}
                  fill="#a47551"
                  stroke="#704e32"
                  strokeWidth="2"
                />
              )}

              {/* Horizontal Bottle Side Cork & Neck */}
              {currentVessel.lidType === 'cork-side' && (
                <g>
                  {currentVessel.neckPath && (
                    <path
                      d={currentVessel.neckPath}
                      fill="none"
                      stroke={GLASS_TINTS[glassTint]?.sheen || 'rgba(255,255,255,0.45)'}
                      strokeWidth="2.5"
                    />
                  )}
                  {currentVessel.lidPath && (
                    <path
                      d={currentVessel.lidPath}
                      fill="#a47551"
                      stroke="#704e32"
                      strokeWidth="2"
                    />
                  )}
                </g>
              )}

              {/* Hexagonal Lantern Hanging Ring */}
              {currentVessel.steepleRing && (
                <path
                  d={currentVessel.steepleRing}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3.5"
                />
              )}

              {/* ==========================================
                  CLIPPED INTERIOR: SUBSTRATE + ITEMS + MIST
                  ========================================== */}
              <g clipPath="url(#vessel-clip)">
                <rect
                  x="0"
                  y="0"
                  width="400"
                  height="520"
                  fill={currentLighting.vesselTint}
                />

                {/* Glass Tint Tinting Fill */}
                {glassTint !== 'clear' && (
                  <rect
                    x="0"
                    y="0"
                    width="400"
                    height="520"
                    fill={GLASS_TINTS[glassTint]?.vesselTint || 'transparent'}
                    pointerEvents="none"
                  />
                )}

                {/* 1. Stacked Substrate Layers */}
                {substrateStack.layers.map((layer) => {
                  const layerY = isExplodedView ? (layer.topY - layer.explodedOffset) : layer.topY;
                  const depthMm = Math.round(layer.height * 1.5);
                  const grams = Math.round(layer.height * 14);

                  return (
                    <g key={layer.key}>
                      <rect
                        x="20"
                        y={layerY}
                        width="360"
                        height={layer.height + 4}
                        fill={`url(#pat-${layer.pattern})`}
                      />
                      <path
                        d={`M 20 ${layerY} Q 110 ${layerY - 4} 200 ${layerY} T 380 ${layerY} L 380 ${layerY + 5} L 20 ${layerY + 5} Z`}
                        fill={layer.color}
                        opacity="0.85"
                      />

                      {/* Exploded Strata Depth & Weight Caliper Brackets */}
                      {isExplodedView && (
                        <g pointerEvents="none">
                          <path
                            d={`M 345 ${layerY} L 355 ${layerY} L 355 ${layerY + layer.height} L 345 ${layerY + layer.height}`}
                            stroke="#38bdf8"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.85"
                          />
                          <rect
                            x="225"
                            y={layerY + (layer.height / 2) - 9}
                            width="115"
                            height="18"
                            rx="4"
                            fill="rgba(15, 23, 42, 0.88)"
                            stroke="#38bdf8"
                            strokeWidth="1"
                          />
                          <text
                            x="282"
                            y={layerY + (layer.height / 2) + 3.5}
                            fill="#7dd3fc"
                            fontSize="8.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {layer.name.split(' ')[0]}: {depthMm}mm • {grams}g
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* 2. Placed Flora, Hardscape & Animated Critters */}
                {sortedItems.map((item) => {
                  const isSelected = item.uid === selectedItemId;
                  const roamX =
                    item.type === 'critters' ? Math.sin(critterOffset) * 26 : 0;
                  const roamFlip =
                    item.type === 'critters'
                      ? Math.cos(critterOffset) >= 0
                        ? 1
                        : -1
                      : item.flipX
                      ? -1
                      : 1;

                  const isLivingPlant = item.type !== 'driftwood' && item.type !== 'dragon_stone' && item.type !== 'quartz' && item.type !== 'river_stones' && item.type !== 'critters' && item.type !== 'water_pool' && item.type !== 'lava_rock' && item.type !== 'petrified_wood';
                  const growthMultiplier = isLivingPlant ? (1 + growthStage * 0.12) : 1;
                  const itemExplodedY = isExplodedView ? item.y - 32 : item.y;
                  const isItemStressed = isLivingPlant && ecosystemReport.isLivingFloraStressed;

                  return (
                    <g
                      key={item.uid}
                      transform={`translate(${item.x + roamX}, ${itemExplodedY}) rotate(${item.rotation}) scale(${
                        item.scale * roamFlip * growthMultiplier
                      }, ${item.scale * growthMultiplier})`}
                      onPointerDown={(e) => handleItemPointerDown(e, item)}
                      className="cursor-grab active:cursor-grabbing transition-transform select-none"
                    >
                      <ellipse
                        cx="0"
                        cy="3"
                        rx="22"
                        ry="5"
                        fill="rgba(0,0,0,0.35)"
                      />

                      <RenderBotanicalArtwork
                        type={item.type}
                        uvActive={currentLighting.uvActive}
                        growthStage={growthStage}
                        cultivar={item.cultivar}
                        isStressed={isItemStressed}
                      />

                      {/* Locked Specimen Pin Indicator */}
                      {item.isLocked && (
                        <g transform="translate(18, -35) scale(0.7)" pointerEvents="none">
                          <circle cx="0" cy="0" r="11" fill="rgba(245, 158, 11, 0.95)" stroke="#78350f" strokeWidth="1.5" />
                          <path d="M-4,-1 L-4,-4 A4,4 0 0,1 4,-4 L4,-1 M-5,-1 L5,-1 L5,6 L-5,6 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                        </g>
                      )}

                      {/* Selection Bounding Halo */}
                      {isSelected && (
                        <circle
                          cx="0"
                          cy="-28"
                          r="42"
                          fill="none"
                          stroke={item.isLocked ? "#f59e0b" : "#34d399"}
                          strokeWidth="1.8"
                          strokeDasharray={item.isLocked ? "2 2" : "4 3"}
                        />
                      )}
                    </g>
                  );
                })}

                {/* 3. Active Mist Spray Particles & High Humidity Condensation */}
                {mistParticles.map((drop) => (
                  <circle
                    key={drop.id}
                    cx={drop.x}
                    cy={drop.y}
                    r={drop.r}
                    fill="#bae6fd"
                    opacity="0.75"
                    className="animate-ping"
                  />
                ))}

                {humidity > 78 && (
                  <g opacity={(humidity - 75) / 35}>
                    <circle cx="105" cy="210" r="2" fill="#e0f2fe" />
                    <circle cx="112" cy="225" r="1.5" fill="#e0f2fe" />
                    <circle cx="295" cy="195" r="2.2" fill="#e0f2fe" />
                    <circle cx="285" cy="240" r="1.6" fill="#e0f2fe" />
                    <circle cx="95" cy="290" r="1.8" fill="#e0f2fe" />
                  </g>
                )}

                <rect
                  x="0"
                  y="0"
                  width="400"
                  height="520"
                  fill="url(#glass-sheen)"
                  pointerEvents="none"
                />
              </g>

              {/* Dynamic Water Cycle: Condensation Beads on Glass */}
              {condensationBeads.length > 0 && (
                <g clipPath="url(#vessel-clip)" opacity={currentVessel.humidityRetention >= 1 ? 0.95 : 0.75} pointerEvents="none">
                  {condensationBeads.map((bead) => (
                    <g key={bead.id} transform={`translate(${bead.cx}, ${bead.cy})`}>
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={bead.rx}
                        ry={bead.ry}
                        fill="rgba(255, 255, 255, 0.45)"
                        stroke="rgba(255, 255, 255, 0.7)"
                        strokeWidth="0.5"
                        opacity={bead.opacity}
                      />
                      <circle
                        cx={-bead.rx * 0.3}
                        cy={-bead.ry * 0.3}
                        r={bead.rx * 0.35}
                        fill="#ffffff"
                        opacity={bead.opacity * 1.3}
                      />
                    </g>
                  ))}
                </g>
              )}

              {/* Phase 4: Aquascaping Composition Overlays */}
              {compositionGrid === 'ruleOfThirds' && (
                <g pointerEvents="none" opacity="0.65">
                  <line x1="133.3" y1="50" x2="133.3" y2="470" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 4" />
                  <line x1="266.7" y1="50" x2="266.7" y2="470" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 4" />
                  <line x1="60" y1="173.3" x2="340" y2="173.3" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 4" />
                  <line x1="60" y1="346.7" x2="340" y2="346.7" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 4" />
                  <circle cx="133.3" cy="173.3" r="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="266.7" cy="173.3" r="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="133.3" cy="346.7" r="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="266.7" cy="346.7" r="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1.5" />
                </g>
              )}

              {compositionGrid === 'goldenSpiral' && (
                <g pointerEvents="none" opacity="0.7">
                  <path
                    d="M 60 450 C 60 200 200 90 340 90 C 370 180 340 380 230 380 C 130 380 130 250 190 230 C 230 220 250 270 230 290"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.8"
                    strokeDasharray="6 3"
                  />
                  <circle cx="230" cy="290" r="5" fill="#f59e0b" />
                </g>
              )}

              {compositionGrid === 'triangularSlope' && (
                <g pointerEvents="none" opacity="0.65">
                  <line x1="80" y1="130" x2="340" y2="440" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
                  <line x1="320" y1="130" x2="200" y2="440" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="80" cy="130" r="5" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="340" cy="440" r="5" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1.5" />
                </g>
              )}

              {/* Glass Outlines & Highlights */}
              <path
                d={currentVessel.outlinePath}
                fill="none"
                stroke={
                  currentVessel.lidType === 'brass' || currentVessel.lidType === 'brass-steeple'
                    ? '#d97706'
                    : (GLASS_TINTS[glassTint]?.sheen || 'rgba(255, 255, 255, 0.45)')
                }
                strokeWidth={currentVessel.lidType === 'brass' || currentVessel.lidType === 'brass-steeple' ? '3.5' : '2.5'}
                pointerEvents="none"
              />

              {currentVessel.facetLines && (
                <path
                  d={currentVessel.facetLines}
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="2.2"
                  opacity="0.85"
                  pointerEvents="none"
                />
              )}

              {currentVessel.openingEllipse && (
                <ellipse
                  cx={currentVessel.openingEllipse.cx}
                  cy={currentVessel.openingEllipse.cy}
                  rx={currentVessel.openingEllipse.rx}
                  ry={currentVessel.openingEllipse.ry}
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="2.2"
                  pointerEvents="none"
                />
              )}

              {currentVessel.topEllipse && (
                <ellipse
                  cx={currentVessel.topEllipse.cx}
                  cy={currentVessel.topEllipse.cy}
                  rx={currentVessel.topEllipse.rx}
                  ry={currentVessel.topEllipse.ry}
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2.5"
                  pointerEvents="none"
                />
              )}

              <path
                d={currentVessel.highlightPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="5"
                strokeLinecap="round"
                pointerEvents="none"
              />

              {showHudLabels && !isExplodedView &&
                substrateStack.layers.map((layer) => (
                  <g key={`hud-${layer.key}`} pointerEvents="none">
                    <line
                      x1="335"
                      y1={layer.topY + layer.height / 2}
                      x2="355"
                      y2={layer.topY + layer.height / 2}
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="1"
                    />
                    <text
                      x="358"
                      y={layer.topY + layer.height / 2 + 3}
                      fill="rgba(255,255,255,0.75)"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {layer.key.slice(0, 4).toUpperCase()}
                    </text>
                  </g>
                ))}
            </svg>

            {/* Bottom Helper Overlay */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-stone-300 pointer-events-none">
              <span>Drag any item to reposition</span>
              <span>{items.length} elements placed</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            RIGHT PANEL: INSPECTOR & ECOSYSTEM DIAGNOSTICS
            ========================================== */}
        {!isZenMode && (
        <section aria-label="Ecosystem Diagnostics & Inspector" className="lg:col-span-3 space-y-4">
          {/* 1. SELECTED ITEM TRANSFORMATION CONTROLS */}
          <div className="bg-stone-900/75 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2 shrink-0">
                <Sliders className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Item Inspector
              </h2>
              {selectedItem && (
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {/* Pin / Lock Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleItemLock(selectedItem.uid)}
                    aria-label={selectedItem.isLocked ? "Unlock item position" : "Lock item position"}
                    className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg border transition cursor-pointer ${
                      selectedItem.isLocked
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                        : 'bg-stone-800 text-stone-300 border-white/10 hover:text-white hover:bg-stone-700'
                    }`}
                    title={selectedItem.isLocked ? "Pinned (Click to unlock)" : "Pin Position"}
                  >
                    {selectedItem.isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                    )}
                    <span>{selectedItem.isLocked ? 'Pinned' : 'Pin'}</span>
                  </button>

                  {/* Duplicate Button */}
                  <button
                    type="button"
                    onClick={() => handleDuplicateItem(selectedItem)}
                    aria-label="Duplicate selected item"
                    className="text-xs text-sky-300 hover:text-sky-200 flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 hover:bg-sky-500/25 transition cursor-pointer"
                    title="Duplicate Specimen (Ctrl+D)"
                  >
                    <CopyPlus className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Duplicate</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={handleDeleteSelected}
                    aria-label="Remove selected item"
                    className="text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              )}
            </div>

            {selectedItem ? (
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-stone-950/70 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-emerald-300">
                      {CATALOG_ITEMS.find((c) => c.id === selectedItem.type)?.name}
                    </div>
                    <div className="text-[11px] text-stone-300">
                      Position: X:{selectedItem.x} Y:{selectedItem.y}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-200">
                    Layer #{selectedItem.zIndex}
                  </span>
                </div>

                {/* Cultivar / Color Phenotype Chips */}
                {(() => {
                  const catalogItem = CATALOG_ITEMS.find((c) => c.id === selectedItem.type);
                  if (!catalogItem?.cultivars || catalogItem.cultivars.length === 0) return null;
                  return (
                    <div className="space-y-1.5 p-2.5 rounded-xl bg-stone-950/70 border border-white/10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-300 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                          Variety / Color
                        </span>
                        <span className="font-mono text-[11px] text-emerald-300">
                          {catalogItem.cultivars.find((c) => c.id === (selectedItem.cultivar || catalogItem.cultivars[0].id))?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                        {catalogItem.cultivars.map((cult) => {
                          const isSelectedCult = (selectedItem.cultivar || catalogItem.cultivars[0].id) === cult.id;
                          return (
                            <button
                              key={cult.id}
                              type="button"
                              onClick={() => handleItemCultivarChange(selectedItem.uid, cult.id)}
                              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[11px] font-medium transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                                isSelectedCult
                                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-sm'
                                  : 'bg-stone-900 text-stone-400 border-white/5 hover:text-stone-200 hover:bg-stone-800'
                              }`}
                              title={cult.name}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/30"
                                style={{ backgroundColor: cult.color }}
                              />
                              <span className="truncate">{cult.name.split(' ')[0]}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Scale Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="item-scale-slider" className="text-stone-300">Size / Scale</label>
                    <span className="font-mono text-stone-200">
                      {Math.round(selectedItem.scale * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateSelectedItem({
                          scale: Math.max(0.5, Number((selectedItem.scale - 0.1).toFixed(2)))
                        })
                      }
                      aria-label="Decrease item size"
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                      title="Shrink"
                    >
                      <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <input
                      id="item-scale-slider"
                      aria-label="Selected item scale"
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.05"
                      value={selectedItem.scale}
                      onChange={(e) =>
                        updateSelectedItem({ scale: parseFloat(e.target.value) })
                      }
                      className="w-full accent-emerald-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
                    />
                    <button
                      onClick={() =>
                        updateSelectedItem({
                          scale: Math.min(1.8, Number((selectedItem.scale + 0.1).toFixed(2)))
                        })
                      }
                      aria-label="Increase item size"
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                      title="Enlarge"
                    >
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Rotation Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="item-rotation-slider" className="text-stone-300">Rotation Angle</label>
                    <span className="font-mono text-stone-200">{selectedItem.rotation}°</span>
                  </div>
                  <input
                    id="item-rotation-slider"
                    aria-label="Selected item rotation angle"
                    type="range"
                    min="-45"
                    max="45"
                    value={selectedItem.rotation}
                    onChange={(e) =>
                      updateSelectedItem({ rotation: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-emerald-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
                  />
                </div>

                {/* Flip & Z-Index Layer Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => updateSelectedItem({ flipX: !selectedItem.flipX })}
                    aria-label="Flip selected item horizontally"
                    className="py-2 px-2 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-medium text-stone-200 flex items-center justify-center gap-1.5 border border-white/5 cursor-pointer min-h-[36px]"
                  >
                    <FlipHorizontal className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Flip
                  </button>
                  <button
                    onClick={() => handleLayerOrder('up')}
                    aria-label="Bring selected item forward"
                    className="py-2 px-2 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-medium text-stone-200 flex items-center justify-center gap-1.5 border border-white/5 cursor-pointer min-h-[36px]"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Forward
                  </button>
                  <button
                    onClick={() => handleLayerOrder('down')}
                    aria-label="Send selected item backward"
                    className="py-2 px-2 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-xs font-medium text-stone-200 flex items-center justify-center gap-1.5 border border-white/5 cursor-pointer min-h-[36px]"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Back
                  </button>
                </div>

                {/* Botanical Care Dossier Quick Button */}
                <button
                  onClick={() => {
                    const cat = CATALOG_ITEMS.find((c) => c.id === selectedItem.type);
                    setSelectedCareItem(cat || null);
                    setIsCareModalOpen(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-xs font-semibold text-emerald-300 border border-emerald-600/40 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span>View Botanical Care Dossier</span>
                </button>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-stone-300 bg-stone-950/40 rounded-xl border border-dashed border-white/10">
                Click any plant, crystal, or stone inside the glass vessel to scale, rotate, or layer it.
              </div>
            )}
          </div>

          {/* 2. MICRO-CLIMATE HUMIDITY & MOISTURE GAUGE */}
          <div className="bg-stone-900/75 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="humidity-slider" className="text-sm font-semibold text-white flex items-center gap-2 cursor-pointer">
                <Droplets className="w-4 h-4 text-sky-400" aria-hidden="true" />
                Micro-Climate Humidity
              </label>
              <span className="text-xs font-mono font-bold text-sky-300">{humidity}% RH</span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-stone-950 overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 transition-all duration-300"
                style={{ width: `${humidity}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <input
                id="humidity-slider"
                aria-label="Micro-climate humidity percentage"
                type="range"
                min="15"
                max="99"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
              />
              <button
                onClick={handleTriggerMist}
                aria-label="Increase humidity by misting"
                className="shrink-0 px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-medium border border-sky-500/30 cursor-pointer min-h-[32px]"
              >
                + Mist
              </button>
            </div>
          </div>

          {/* 3. ECOSYSTEM BALANCE & BIO-HARMONY METER */}
          <div
            role="region"
            aria-label="Ecosystem Balance Status"
            aria-live="polite"
            className="bg-stone-900/75 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Ecosystem Balance
              </h2>
              <span className={`text-sm font-bold font-mono ${ecosystemReport.statusColor}`}>
                {ecosystemReport.score}/100
              </span>
            </div>

            {/* Score Progress Bar */}
            <div
              className="w-full h-2 rounded-full bg-stone-950 overflow-hidden"
              role="progressbar"
              aria-valuenow={ecosystemReport.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Ecosystem bio-harmony balance: ${ecosystemReport.score}%`}
            >
              <div
                className={`h-full transition-all duration-500 ${ecosystemReport.barColor}`}
                style={{ width: `${ecosystemReport.score}%` }}
              />
            </div>

            <div className={`text-xs font-semibold ${ecosystemReport.statusColor}`}>
              {ecosystemReport.statusLabel}
            </div>

            {/* Phase 4: 1-Click Ecosystem Auto-Fix Button */}
            {ecosystemReport.score < 100 && (
              <button
                type="button"
                onClick={handleAutoFixEcosystem}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 animate-pulse"
                title="Automatically fix substrate depths, humidity, vessel type & temperature for 100% ecosystem score"
              >
                <Wand2 className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                <span>1-Click Auto-Fix Ecosystem (100% Score)</span>
              </button>
            )}

            {/* Warnings & Positives List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {ecosystemReport.warnings.map((warn, idx) => (
                <div
                  key={`warn-${idx}`}
                  className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{warn}</span>
                </div>
              ))}

              {ecosystemReport.positives.map((pos, idx) => (
                <div
                  key={`pos-${idx}`}
                  className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/25 text-emerald-200 text-xs flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{pos}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. REAL-WORLD UTILITY QUICK ACTIONS */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedCareItem(null);
                setIsCareModalOpen(true);
              }}
              className="p-3 rounded-2xl bg-stone-900/75 border border-white/10 hover:border-emerald-500/40 text-left transition flex flex-col justify-between cursor-pointer group active:scale-95 shadow-md"
            >
              <div className="flex items-center justify-between">
                <BookOpen className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-300" aria-hidden="true" />
              </div>
              <div className="mt-2">
                <div className="text-xs font-semibold text-white">Care Guide</div>
                <div className="text-[10px] text-stone-400">14 botanical dossiers</div>
              </div>
            </button>

            <button
              onClick={() => setIsBOMModalOpen(true)}
              className="p-3 rounded-2xl bg-stone-900/75 border border-white/10 hover:border-amber-500/40 text-left transition flex flex-col justify-between cursor-pointer group active:scale-95 shadow-md"
            >
              <div className="flex items-center justify-between">
                <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-300" aria-hidden="true" />
              </div>
              <div className="mt-2">
                <div className="text-xs font-semibold text-white">Nursery BOM</div>
                <div className="text-[10px] text-stone-400">Grams & shopping list</div>
              </div>
            </button>
          </div>
        </section>
        )}
      </main>

      {/* ==========================================
          TOAST NOTIFICATION BANNER
          ========================================== */}
      {toast.visible && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-stone-900/95 border border-emerald-500/30 shadow-2xl backdrop-blur-md text-xs font-medium text-emerald-200 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />}
          {toast.type === 'info' && <Sparkles className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />}
          {toast.type === 'warn' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />}
          <span>{toast.message}</span>
        </aside>
      )}

      {/* ==========================================
          SAVED ENCLOSURES / ARCHIVES MODAL
          ========================================== */}
      {isSavedModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="saved-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-xl bg-stone-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 text-stone-100 flex flex-col max-h-[85vh]">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <h2 id="saved-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  Terrarium Archives & Saved Enclosures
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Save your designs locally in your browser. Persisted across visits on this device.
                </p>
              </div>
              <button
                onClick={() => setIsSavedModalOpen(false)}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Save Current Build Form */}
            <div className="py-4 border-b border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Name this enclosure (e.g., Emerald Rainforest, Moonlit Haven)..."
                value={newSlotName}
                onChange={(e) => setNewSlotName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveSlot(newSlotName);
                }}
                className="flex-1 px-3 py-2 text-xs bg-stone-950 border border-white/10 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={() => handleSaveSlot(newSlotName)}
                disabled={!newSlotName.trim()}
                className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
                Save Current
              </button>
            </div>

            {/* Saved Slots List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-2.5 pr-1">
              {savedSlots.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-xs">
                  <FolderHeart className="w-10 h-10 mx-auto text-stone-600 mb-2 opacity-50" aria-hidden="true" />
                  <p className="font-medium text-stone-300">No saved terrariums found.</p>
                  <p className="mt-1 text-[11px] text-stone-400">
                    Type a name above and click "Save Current" to archive your work.
                  </p>
                </div>
              ) : (
                savedSlots.map((slot) => {
                  const slotVessel = VESSELS.find((v) => v.id === slot.vesselId) || VESSELS[0];
                  const dateStr = new Date(slot.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  return (
                    <div
                      key={slot.id}
                      className="p-3.5 rounded-xl bg-stone-950/60 border border-white/10 hover:border-white/20 transition flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-stone-100">{slot.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {slotVessel.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[11px] text-stone-400">
                          <span>{slot.items?.length || 0} flora/decor</span>
                          <span>•</span>
                          <span>Score: {slot.score || 85}/100</span>
                          <span>•</span>
                          <span>{dateStr}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleLoadSlot(slot)}
                          className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 border border-emerald-500/40 rounded-lg transition cursor-pointer"
                          title="Load into Studio"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          aria-label={`Delete ${slot.name}`}
                          className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                          title="Delete Slot"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportAllSlotsJson}
                  className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
                  title="Download JSON Backup"
                >
                  <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                  Backup (JSON)
                </button>
                <label className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 transition cursor-pointer">
                  <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                  Restore (JSON)
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportSlotsJson}
                    className="hidden"
                  />
                </label>
              </div>
              <span>{savedSlots.length} enclosure{savedSlots.length !== 1 ? 's' : ''} stored</span>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SHARE DEEP-LINK MODAL
          ========================================== */}
      {isShareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-md bg-stone-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 text-stone-100 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <h2 id="share-modal-title" className="text-base font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-sky-400" aria-hidden="true" />
                  Share Micro-Ecosystem
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Send this interactive link so anyone can explore or clone your exact terrarium.
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                aria-label="Close share dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Direct Link Input */}
            <div className="space-y-1.5">
              <label htmlFor="share-url-input" className="text-xs font-semibold text-stone-300">Shareable Deep-Link URL</label>
              <div className="flex items-center gap-2">
                <input
                  id="share-url-input"
                  type="text"
                  readOnly
                  value={currentShareUrl}
                  className="flex-1 px-3 py-2 text-xs bg-stone-950 border border-white/10 rounded-xl text-stone-300 font-mono select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyShareUrl}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    copiedShareLink
                      ? 'bg-emerald-500 text-stone-950'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  }`}
                >
                  {copiedShareLink ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                  {copiedShareLink ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-stone-300">Quick Share:</div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `🌿 Check out my custom botanical terrarium on VerdantGlass Studio!\n${currentShareUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-200 text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    'Crafted a living botanical micro-ecosystem on VerdantGlass Studio. Explore or clone it:'
                  )}&url=${encodeURIComponent(currentShareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-600/40 text-sky-200 text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>X / Twitter</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/50 border border-white/5 text-[11px] text-stone-400">
              💡 <strong>Instant & Private:</strong> The full design configuration is stored directly in the URL hash—no server accounts or sign-ups required.
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          HIGH-RESOLUTION PHOTO STUDIO MODAL
          ========================================== */}
      {isPhotoStudioOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-studio-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-2xl bg-stone-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 text-stone-100 flex flex-col max-h-[90vh]">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <h2 id="photo-studio-title" className="text-lg font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  Botanical Photo Studio & Archival Export
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Render exhibition-grade high-resolution artwork of your living terrarium.
                </p>
              </div>
              <button
                onClick={() => setIsPhotoStudioOpen(false)}
                aria-label="Close photo studio dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {/* Export Format */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Export Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportFormat('png')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition cursor-pointer ${
                      exportFormat === 'png'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-stone-950/60 text-stone-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <span>PNG Photo Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat('svg')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition cursor-pointer ${
                      exportFormat === 'svg'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-stone-950/60 text-stone-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <span>Scalable Vector (SVG)</span>
                  </button>
                </div>
              </div>

              {/* PNG Resolution Options */}
              {exportFormat === 'png' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Output Resolution</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { res: 1, label: 'Standard 1x', dim: '400×520' },
                      { res: 2, label: 'High-Res 2x', dim: '800×1040' },
                      { res: 4, label: 'Ultra 4K', dim: '1600×2080' }
                    ].map((item) => (
                      <button
                        key={item.res}
                        type="button"
                        onClick={() => setExportResolution(item.res)}
                        className={`p-2 rounded-xl text-xs border flex flex-col items-center transition cursor-pointer ${
                          exportResolution === item.res
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                            : 'bg-stone-950/60 text-stone-400 border-white/10 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-stone-500 font-mono mt-0.5">{item.dim}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Studio Backdrop */}
              {exportFormat === 'png' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Studio Backdrop</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'studio', name: 'Botanical Noir' },
                      { id: 'white', name: 'Gallery Ivory' },
                      { id: 'transparent', name: 'Transparent' }
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => setExportBackdrop(bg.id)}
                        className={`p-2 rounded-xl text-xs border flex items-center justify-center transition cursor-pointer ${
                          exportBackdrop === bg.id
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                            : 'bg-stone-950/60 text-stone-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {bg.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Collector's Brass Archival Plaque */}
              {exportFormat === 'png' && (
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-stone-200">Engraved Archival Brass Plaque</span>
                      <p className="text-[11px] text-stone-400">Emboss a museum specimen plaque at the base.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includePlaque}
                        onChange={(e) => setIncludePlaque(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {includePlaque && (
                    <div className="space-y-1">
                      <label htmlFor="plaque-title-input" className="text-[11px] text-stone-400">Specimen Title / Inscription</label>
                      <input
                        id="plaque-title-input"
                        type="text"
                        value={customPlaqueTitle}
                        onChange={(e) => setCustomPlaqueTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-900 border border-white/10 rounded-lg text-stone-200 font-serif focus:outline-none focus:border-amber-400"
                        placeholder="VERDANTGLASS ARCHIVE • SPECIMEN NO. 1"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">
                {exportFormat === 'svg' ? 'SVG Vector' : `${exportResolution === 4 ? '1600×2400 (4K)' : exportResolution === 2 ? '800×1200 (HD)' : '400×600'} PNG`}
              </span>
              <button
                type="button"
                onClick={handleRenderAndDownloadArtwork}
                disabled={isRenderingExport}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition flex items-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{isRenderingExport ? 'Rendering Artwork...' : 'Download Artwork'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          BOTANICAL CARE ENCYCLOPEDIA & FIELD GUIDE MODAL
          ========================================== */}
      {isCareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="care-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-4xl bg-stone-900/95 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 text-stone-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <h2 id="care-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  Botanical Field Guide & Care Encyclopedia
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Taxonomy, light & humidity tolerances, natural habitats, and companion planting guidelines for all 14 terrarium species.
                </p>
              </div>
              <button
                onClick={() => setIsCareModalOpen(false)}
                aria-label="Close field guide dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by plant name, botanical family, or origin..."
                  value={careSearchQuery}
                  onChange={(e) => setCareSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-950 border border-white/10 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'tropical', label: 'Tropical' },
                  { id: 'arid', label: 'Arid / Succulents' },
                  { id: 'carnivorous', label: 'Carnivorous' },
                  { id: 'hardscape', label: 'Hardscape' },
                  { id: 'critters', label: 'Bioactive' }
                ].map((bf) => (
                  <button
                    key={bf.id}
                    onClick={() => setCareFilterBiome(bf.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                      careFilterBiome === bf.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    {bf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Split: Item List on Left, Active Dossier on Right */}
            {(() => {
              const activeList = CATALOG_ITEMS.filter((item) => {
                const matchesBiome =
                  careFilterBiome === 'all'
                    ? true
                    : careFilterBiome === 'hardscape'
                    ? item.category === 'hardscape'
                    : careFilterBiome === 'critters'
                    ? item.category === 'critters'
                    : item.biome === careFilterBiome;

                const q = careSearchQuery.toLowerCase().trim();
                const matchesSearch =
                  !q ||
                  item.name.toLowerCase().includes(q) ||
                  item.scientific.toLowerCase().includes(q) ||
                  (item.family && item.family.toLowerCase().includes(q)) ||
                  (item.origin && item.origin.toLowerCase().includes(q));

                return matchesBiome && matchesSearch;
              });

              const activeDossier = selectedCareItem || activeList[0] || CATALOG_ITEMS[0];

              return (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden py-3">
                  {/* Left Column: List of items */}
                  <div className="md:col-span-5 overflow-y-auto space-y-2 pr-1 max-h-[58vh]">
                    {activeList.length === 0 ? (
                      <div className="text-center py-10 text-stone-400 text-xs">
                        No species found matching "{careSearchQuery}".
                      </div>
                    ) : (
                      activeList.map((entry) => {
                        const isSelected = activeDossier.id === entry.id;
                        return (
                          <div
                            key={entry.id}
                            onClick={() => setSelectedCareItem(entry)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-emerald-950/60 border-emerald-500/50 shadow-md'
                                : 'bg-stone-950/40 border-white/5 hover:border-white/15 hover:bg-stone-900/60'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                <span>{entry.name}</span>
                                {entry.biome === 'tropical' && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                    Tropical
                                  </span>
                                )}
                                {entry.biome === 'arid' && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                    Arid
                                  </span>
                                )}
                                {entry.biome === 'carnivorous' && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                    Carnivore
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] italic text-stone-400 font-serif">
                                {entry.scientific}
                              </div>
                              <div className="text-[10px] text-stone-500">
                                {entry.family || entry.category}
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 shrink-0 transition ${isSelected ? 'text-emerald-400 translate-x-0.5' : 'text-stone-600'}`} />
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Column: Detailed Botanical Dossier */}
                  <div className="md:col-span-7 bg-stone-950/80 border border-white/10 rounded-xl p-4 overflow-y-auto max-h-[58vh] space-y-3.5">
                    {/* Title & Classification */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {activeDossier.family || 'Botanical Specimen'}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1">{activeDossier.name}</h3>
                        <p className="text-xs italic text-stone-400 font-serif">{activeDossier.scientific}</p>
                      </div>
                      <button
                        onClick={() => {
                          handleAddItem(activeDossier.id);
                          showToast(`Placed ${activeDossier.name} in terrarium!`, 'success');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer active:scale-95 shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Place in Vessel</span>
                      </button>
                    </div>

                    {/* Specimen Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* Light */}
                      <div className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                          <span>Light Exposure</span>
                        </div>
                        <p className="text-[11px] text-stone-300">{activeDossier.light || 'Filtered ambient or grow light'}</p>
                      </div>

                      {/* Watering */}
                      <div className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 space-y-1">
                        <div className="flex items-center gap-1.5 text-sky-300 font-semibold text-[11px]">
                          <Droplets className="w-3.5 h-3.5 text-sky-400" />
                          <span>Watering Regimen</span>
                        </div>
                        <p className="text-[11px] text-stone-300">{activeDossier.watering || 'Maintain even moisture'}</p>
                      </div>

                      {/* Substrate */}
                      <div className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-semibold text-[11px]">
                          <Layers className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Rooting Medium</span>
                        </div>
                        <p className="text-[11px] text-stone-300">{activeDossier.soilPreference || 'Airy tropical substrate'}</p>
                      </div>

                      {/* Care Difficulty */}
                      <div className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>Care Rating</span>
                        </div>
                        <p className="text-[11px] text-stone-300">{activeDossier.careDifficulty || 'Beginner Friendly'}</p>
                      </div>
                    </div>

                    {/* Ideal Humidity Range Gauge (for plants) */}
                    {activeDossier.idealHumidity && (
                      <div className="p-2.5 rounded-xl bg-stone-900/90 border border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-300 font-semibold flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-sky-400" />
                            Ideal Humidity Range
                          </span>
                          <span className="font-mono text-sky-300">
                            {activeDossier.idealHumidity[0]}% – {activeDossier.idealHumidity[1]}% RH
                          </span>
                        </div>
                        <div className="relative w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-white/10">
                          <div
                            className="absolute top-0 bottom-0 bg-emerald-400 rounded-full opacity-80"
                            style={{
                              left: `${activeDossier.idealHumidity[0]}%`,
                              width: `${activeDossier.idealHumidity[1] - activeDossier.idealHumidity[0]}%`
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Companion Rules & Horticultural Advice */}
                    {activeDossier.companionTip && (
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs space-y-1">
                        <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Companion Planting & Biome Synergy</span>
                        </div>
                        <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                          {activeDossier.companionTip}
                        </p>
                      </div>
                    )}

                    {/* Physical Procurement & Origin */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/5">
                      <div>
                        <span className="text-stone-400">Natural Habitat:</span>
                        <div className="text-stone-200 font-medium">{activeDossier.origin || 'Global'}</div>
                      </div>
                      <div>
                        <span className="text-stone-400">Nursery Procurement:</span>
                        <div className="text-stone-200 font-medium">
                          {activeDossier.nurseryUnit || '1x unit'}
                          <span className="text-emerald-400 ml-1.5 font-mono font-semibold">
                            ({activeDossier.usdRange ? formatPriceRange(activeDossier.usdRange[0], activeDossier.usdRange[1], selectedCurrency) : activeDossier.approxCost})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ==========================================
          REAL-WORLD NURSERY BILL OF MATERIALS (BOM) MODAL
          ========================================== */}
      {isBOMModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bom-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl bg-stone-900/95 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 text-stone-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <h2 id="bom-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  Nursery Bill of Materials & Substrate Mass Calculator
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Calculated physical substrate grams, liters, and itemized specimen checklist for building your real-world terrarium.
                </p>
              </div>
              <button
                onClick={() => setIsBOMModalOpen(false)}
                aria-label="Close nursery shopping list dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Currency Selector & Geo-Detection Bar */}
            <div className="py-2.5 px-3 bg-stone-950/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5 rounded-xl mt-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="text-xs text-stone-300 font-medium">Pricing Currency:</span>
                <select
                  value={selectedCurrency}
                  onChange={(e) => {
                    setSelectedCurrency(e.target.value);
                    showToast(`Currency switched to ${e.target.value}`, 'info');
                  }}
                  className="px-2.5 py-1 text-xs font-semibold bg-stone-900 border border-white/15 rounded-lg text-emerald-300 focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code} className="bg-stone-900 text-stone-100">
                      {c.flag} {c.code} – {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {userRegionLabel && (
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Auto-detected: <strong className="text-stone-200">{userRegionLabel}</strong></span>
                </div>
              )}
            </div>

            {/* Checklist Content */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-stone-950/70 border border-white/10 text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Substrate Mass</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">
                    {bomData.totalSubstrateGrams}g
                  </div>
                  <div className="text-[10px] text-stone-500">{(bomData.totalSubstrateGrams / 1000).toFixed(2)} kg dry</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/70 border border-white/10 text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Flora & Decor</div>
                  <div className="text-base sm:text-lg font-bold text-sky-400 font-mono mt-0.5">
                    {items.length} pcs
                  </div>
                  <div className="text-[10px] text-stone-500">{bomData.specimenItems.length} varieties</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                  <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Est. Total Build</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-300 font-mono mt-0.5">
                    {bomData.totalBuildCostEst}
                  </div>
                  <div className="text-[10px] text-emerald-400/70">Full physical build</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/70 border border-white/10 text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Acquired</div>
                  <div className="text-base sm:text-lg font-bold text-amber-400 font-mono mt-0.5">
                    {checkedBOMItems.length}/{bomData.allItems.length}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {checkedBOMItems.length === bomData.allItems.length && bomData.allItems.length > 0 ? 'All acquired! 🎉' : 'Checklist active'}
                  </div>
                </div>
              </div>

              {/* 1. Glass Enclosure */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">1. Glass Enclosure Vessel</div>
                <div
                  onClick={() => toggleBOMItem(bomData.vesselItem.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    checkedBOMItems.includes(bomData.vesselItem.id)
                      ? 'bg-emerald-950/30 border-emerald-500/30 opacity-70'
                      : 'bg-stone-950/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checkedBOMItems.includes(bomData.vesselItem.id)}
                      onChange={() => toggleBOMItem(bomData.vesselItem.id)}
                      className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className={`text-xs font-bold ${checkedBOMItems.includes(bomData.vesselItem.id) ? 'line-through text-stone-400' : 'text-white'}`}>
                        {bomData.vesselItem.name}
                      </div>
                      <div className="text-[11px] text-stone-400">{bomData.vesselItem.spec}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-stone-300">{bomData.vesselItem.costEst}</span>
                </div>
              </div>

              {/* 2. Substrate Layers */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">2. Substrates, Drainage & Filtration Medium</div>
                <div className="space-y-1.5">
                  {bomData.substrateItems.map((sub) => {
                    const isChecked = checkedBOMItems.includes(sub.id);
                    return (
                      <div
                        key={sub.id}
                        onClick={() => toggleBOMItem(sub.id)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-emerald-950/30 border-emerald-500/30 opacity-70'
                            : 'bg-stone-950/50 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleBOMItem(sub.id)}
                            className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <div className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-white'}`}>
                              {sub.name}
                            </div>
                            <div className="text-[11px] text-stone-400">{sub.spec}</div>
                            <div className="text-[10px] text-stone-500">{sub.role}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-mono font-bold text-emerald-400">{sub.grams}g</div>
                          <div className="text-[10px] text-stone-400 font-mono">~{sub.liters} L</div>
                          <div className="text-[10px] text-stone-500">{sub.costEst}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Living Flora & Hardscape Specimens */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider">3. Living Flora, Botanicals & Hardscape Specimens</div>
                {bomData.specimenItems.length === 0 ? (
                  <div className="p-4 rounded-xl bg-stone-950/40 border border-dashed border-white/10 text-center text-xs text-stone-400">
                    No flora or hardscape placed yet. Add plants from the catalog to populate your shopping list.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {bomData.specimenItems.map((specimen) => {
                      const isChecked = checkedBOMItems.includes(specimen.id);
                      return (
                        <div
                          key={specimen.id}
                          onClick={() => toggleBOMItem(specimen.id)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                            isChecked
                              ? 'bg-emerald-950/30 border-emerald-500/30 opacity-70'
                            : 'bg-stone-950/50 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleBOMItem(specimen.id)}
                              className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-white'}`}>
                                  {specimen.count}x {specimen.name}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-300">
                                  {specimen.category}
                                </span>
                              </div>
                              <div className="text-[11px] italic text-stone-400 font-serif">{specimen.scientific}</div>
                              <div className="text-[10px] text-stone-500">Unit: {specimen.unit}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-mono font-bold text-emerald-400">
                              {specimen.count > 1 ? specimen.totalCostEst : specimen.costEst}
                            </div>
                            {specimen.count > 1 && (
                              <div className="text-[10px] text-stone-400 font-mono">
                                ({specimen.costEst} /ea)
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePrintBOM}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Print Checklist</span>
              </button>

              <button
                type="button"
                onClick={handleCopyBOMChecklist}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-95"
              >
                <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
                <span>Copy Checklist to Clipboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          PHASE 4: INTERACTIVE DIY PHYSICAL BUILD WIZARD
          ========================================== */}
      {isBuildWizardOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="build-wizard-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-2xl bg-stone-900/95 border border-white/10 rounded-3xl shadow-2xl p-6 text-stone-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Step {buildWizardStep + 1} of 7
                  </span>
                  <span className="text-xs text-stone-400">Physical Terrarium Assembly Guide</span>
                </div>
                <h2 id="build-wizard-title" className="text-lg font-bold text-white flex items-center gap-2 mt-1">
                  <Sprout className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  Interactive Physical Build Walkthrough
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Real-world assembly protocol tailored to your custom {currentVessel.name} enclosure.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBuildWizardOpen(false)}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Step Indicators / Navigation Pills */}
            <div className="py-3 border-b border-white/10 overflow-x-auto">
              <div className="flex items-center gap-1.5 min-w-max">
                {[
                  '1. Vessel Prep',
                  '2. Drainage Leca',
                  '3. Charcoal Shield',
                  '4. Sphagnum Mesh',
                  '5. Tropical Soil',
                  '6. Hardscape & Flora',
                  '7. Hydration & Seal'
                ].map((stepName, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBuildWizardStep(idx)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                      buildWizardStep === idx
                        ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                        : idx < buildWizardStep
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40'
                        : 'bg-stone-950/60 text-stone-400 border border-white/5 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <span>{stepName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Body Content */}
            <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
              {buildWizardStep === 0 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <Sparkles className="w-4 h-4" />
                      Step 1: Enclosure Sterilization & Inspection
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Before placing any living matter, ensure your <span className="text-white font-medium">{currentVessel.name}</span> is thoroughly sanitized. Even invisible fungal spores or oils can cause mold outbreaks in a sealed microclimate.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Cleaning Agent</span>
                        <span className="text-white font-medium">70% Isopropyl alcohol or mild dish soap</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Drying Technique</span>
                        <span className="text-white font-medium">Lint-free microfiber cloth (zero streaks)</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Avoid chemical glass cleaners (e.g. Windex) with ammonia—residual fumes are toxic to tropical mosses and micro-fauna.</span>
                  </div>
                </div>
              )}

              {buildWizardStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Layers className="w-4 h-4" />
                        Step 2: Hydro-Stratum (False Bottom Drainage)
                      </div>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        ~{Math.round((substrates.pebbles || 25) * 1.5)}mm depth
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Pour washed hydro-clay leca pebbles or river pea gravel into the bottom of the vessel. This creates the foundational false bottom where excess water collects away from plant roots, preventing root suffocation and rot.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Calculated Mass</span>
                        <span className="text-white font-bold text-xs">~{Math.round((substrates.pebbles || 25) * 12.5)} grams</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Stratum Role</span>
                        <span className="text-white font-medium">Sub-surface water table reservoir</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200 text-xs flex items-start gap-2.5">
                    <Droplets className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Rinse leca pebbles under running water first to wash away red clay dust that would otherwise cloud the glass.</span>
                  </div>
                </div>
              )}

              {buildWizardStep === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <ShieldCheck className="w-4 h-4" />
                        Step 3: Activated Horticultural Carbon Filtration
                      </div>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        ~{Math.round((substrates.charcoal || 10) * 1.5)}mm depth
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Distribute an even layer of granular activated charcoal directly atop the drainage pebbles. Activated carbon serves as a biological chemical filter that binds toxins, absorbs sour odors, and suppresses mold in enclosed ecosystems.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Calculated Mass</span>
                        <span className="text-white font-bold text-xs">~{Math.round((substrates.charcoal || 10) * 8.5)} grams</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Vessel Retention</span>
                        <span className="text-white font-medium">{currentVessel.type === 'closed' ? 'Critical (Enclosed Glass)' : 'Recommended (Bio-active)'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Use steam-activated horticultural charcoal rather than BBQ briquettes, which contain petroleum binders.</span>
                  </div>
                </div>
              )}

              {buildWizardStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Layers className="w-4 h-4" />
                        Step 4: Sphagnum Separation Mesh Barrier
                      </div>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        ~{Math.round((substrates.moss || 15) * 1.5)}mm depth
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Dampen long-fiber sphagnum moss in dechlorinated water, squeeze out the drip until sponge-damp, and press it firmly across the entire charcoal surface. This creates an impenetrable physical membrane preventing fine soil from falling into your drainage basin.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Calculated Dry Mass</span>
                        <span className="text-white font-bold text-xs">~{Math.round((substrates.moss || 15) * 3.2)} grams</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Alternative Barrier</span>
                        <span className="text-white font-medium">Fine fiberglass mesh screen cut to size</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {buildWizardStep === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Sprout className="w-4 h-4" />
                        Step 5: Bio-Active Soil Substrate (ABG Mix)
                      </div>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        ~{Math.round((substrates.soil || 40) * 1.5)}mm depth
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Introduce your bio-active substrate (Atlanta Botanical Garden mix). Sculpt a gentle slope—higher at the rear of the vessel and lower at the front—to add dramatic optical depth and allow multiple viewing planes.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Calculated Mass</span>
                        <span className="text-white font-bold text-xs">~{Math.round((substrates.soil || 40) * 14.5)} grams</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5">
                        <span className="text-stone-400 block font-mono">Soil Blend Composition</span>
                        <span className="text-white font-medium">Tree fern fiber, peat, fine charcoal & fir bark</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {buildWizardStep === 5 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Sparkles className="w-4 h-4" />
                        Step 6: Hardscape Anchoring & Botanical Planting
                      </div>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        {items.length} Elements
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      First, position structural hardscape (driftwood roots, stones, crystals). Then, use aquascaping tweezers to plant botanical plugs. Trim long root tips, open small divots in the soil, insert the roots, and tamp gently with a wooden dowel.
                    </p>
                    <div className="p-2.5 rounded-xl bg-stone-900/80 border border-white/5 space-y-1.5 text-xs">
                      <span className="text-stone-400 block font-mono text-[11px]">Current Enclosure Species Manifest:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {bomData.specimenItems.map((sp) => (
                          <span key={sp.id} className="px-2 py-0.5 rounded-lg bg-stone-800 text-stone-200 text-[11px] border border-white/5">
                            {sp.count}x {sp.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {buildWizardStep === 6 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <Droplets className="w-4 h-4" />
                        Step 7: Initial Hydration & Acclimation Protocol
                      </div>
                      <span className="text-xs font-mono text-sky-300 font-bold">
                        Target: {humidity}% RH • {temperature}°C
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Give the plants and substrate 4-6 fine pumps of pure distilled or reverse-osmosis mist. Wipe down interior glass above the soil line. Place the lid on your {currentVessel.name}. During the first 2 weeks, monitor condensation: gentle fogging in early morning that clears during midday indicates equilibrium.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-stone-900/80 border border-white/5 text-center">
                        <span className="text-stone-400 block font-mono">Lighting</span>
                        <span className="text-white font-medium">Bright indirect (no direct sun)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-stone-900/80 border border-white/5 text-center">
                        <span className="text-stone-400 block font-mono">Temperature</span>
                        <span className="text-white font-medium">{temperature}°C (Optimal: 20-25°C)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-stone-900/80 border border-white/5 text-center">
                        <span className="text-stone-400 block font-mono">Ventilation</span>
                        <span className="text-white font-medium">{currentVessel.type === 'closed' ? 'Air out 10m / month' : 'Open continuous'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={buildWizardStep === 0}
                onClick={() => setBuildWizardStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Previous Step
              </button>

              <div className="text-xs text-stone-400 font-mono hidden sm:block">
                Step {buildWizardStep + 1} of 7
              </div>

              {buildWizardStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setBuildWizardStep((prev) => Math.min(6, prev + 1))}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsBuildWizardOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 cursor-pointer"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Finish Walkthrough</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          PHASE 4: PRINTABLE BOTANICAL CARE PASSPORT & QR GIFT CARD
          ========================================== */}
      {isPassportModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="passport-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl bg-stone-900/95 border border-white/10 rounded-3xl shadow-2xl p-6 text-stone-100 flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/10 no-print">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Artisan Certificate
                  </span>
                  <span className="text-xs text-stone-400">Botanical Care Passport & QR Gift Certificate</span>
                </div>
                <h2 id="passport-modal-title" className="text-lg font-bold text-white flex items-center gap-2 mt-1">
                  <FileText className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  Botanical Care Passport & Interactive Gift Card
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsPassportModalOpen(false)}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Customizer Inputs (Top bar, hidden in print) */}
            <div className="py-3 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs no-print">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Enclosure Title</label>
                <input
                  type="text"
                  value={passportTitle}
                  onChange={(e) => setPassportTitle(e.target.value)}
                  placeholder="e.g. Kyoto Moss Sanctuary No. 04"
                  className="w-full px-2.5 py-1.5 bg-stone-950 border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Recipient / Dedication</label>
                <input
                  type="text"
                  value={passportRecipient}
                  onChange={(e) => setPassportRecipient(e.target.value)}
                  placeholder="e.g. For Emma"
                  className="w-full px-2.5 py-1.5 bg-stone-950 border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Botanical Artisan</label>
                <input
                  type="text"
                  value={passportCreator}
                  onChange={(e) => setPassportCreator(e.target.value)}
                  placeholder="e.g. Crafted by Basil Shaji"
                  className="w-full px-2.5 py-1.5 bg-stone-950 border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>

            {/* Certificate Preview Card (Printable Area) */}
            <div className="flex-1 overflow-y-auto py-4 pr-1">
              <div className="printable-certificate p-6 sm:p-8 rounded-2xl bg-stone-950/90 border-2 border-amber-500/30 text-stone-200 shadow-xl space-y-6 relative overflow-hidden">
                {/* Decorative Botanical Border Corners */}
                <div className="absolute top-2 left-2 text-amber-500/20 text-xl select-none">🌿</div>
                <div className="absolute top-2 right-2 text-amber-500/20 text-xl select-none">🌿</div>
                <div className="absolute bottom-2 left-2 text-amber-500/20 text-xl select-none">🌱</div>
                <div className="absolute bottom-2 right-2 text-amber-500/20 text-xl select-none">🌱</div>

                {/* Certificate Header */}
                <div className="text-center space-y-1.5 border-b border-white/10 pb-4">
                  <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                    VerdantGlass Terrarium Studio • Botanical Registry
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                    {passportTitle || 'Verdant Enclosure'}
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-xs text-stone-400 pt-1">
                    <span>Dedication: <strong className="text-stone-200">{passportRecipient || 'Honored Guest'}</strong></span>
                    <span>•</span>
                    <span>Artisan: <strong className="text-stone-200">{passportCreator || 'Verdant Artisan'}</strong></span>
                    <span>•</span>
                    <span>Date: <strong className="text-stone-200">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</strong></span>
                  </div>
                </div>

                {/* Micro-Climate & Enclosure Specifications */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-white/10 text-center">
                    <span className="text-[10px] text-stone-400 block font-mono uppercase">Vessel & Glass</span>
                    <span className="font-semibold text-white text-xs">{currentVessel.name}</span>
                    <span className="text-[10px] text-emerald-400 block">{GLASS_TINTS[glassTint]?.name || 'Clear'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-white/10 text-center">
                    <span className="text-[10px] text-stone-400 block font-mono uppercase">Pedestal Base</span>
                    <span className="font-semibold text-white text-xs">{PEDESTAL_BASES[pedestalType]?.name || 'None'}</span>
                    <span className="text-[10px] text-stone-400 block">Artisan display</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-white/10 text-center">
                    <span className="text-[10px] text-stone-400 block font-mono uppercase">Target Humidity</span>
                    <span className="font-semibold text-sky-300 text-xs font-mono">{humidity}% RH</span>
                    <span className="text-[10px] text-stone-400 block">{currentVessel.type === 'closed' ? 'Closed-dome' : 'Semi-closed'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-white/10 text-center">
                    <span className="text-[10px] text-stone-400 block font-mono uppercase">Temperature</span>
                    <span className="font-semibold text-emerald-300 text-xs font-mono">{temperature}°C (Optimal)</span>
                    <span className="text-[10px] text-stone-400 block">Eco-Score: {ecosystemReport.score}/100</span>
                  </div>
                </div>

                {/* Botanical Species Manifest Table */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    Living Botanical & Hardscape Manifest
                  </div>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-stone-900/90 text-stone-300 font-mono text-[10px] uppercase border-b border-white/10">
                        <tr>
                          <th className="py-2 px-3">Item / Species</th>
                          <th className="py-2 px-3">Category / Variety</th>
                          <th className="py-2 px-3">Scientific Name</th>
                          <th className="py-2 px-3 text-right">Care Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {bomData.specimenItems.map((sp) => {
                          const catalog = CATALOG_ITEMS.find((c) => c.name === sp.name);
                          return (
                            <tr key={sp.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-2 px-3 font-medium text-stone-100">
                                {sp.count}x {sp.name}
                              </td>
                              <td className="py-2 px-3 text-stone-400 capitalize">
                                {sp.category}
                              </td>
                              <td className="py-2 px-3 italic font-serif text-stone-400">
                                {sp.scientific || 'Mineralia'}
                              </td>
                              <td className="py-2 px-3 text-right text-stone-400 text-[11px]">
                                {catalog?.watering || 'Ambient mist'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Interactive QR Code & Digital Twin Callout */}
                <div className="p-4 rounded-xl bg-stone-900/90 border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>Scan to Inspect 3D Interactive Digital Twin</span>
                    </div>
                    <p className="text-[11px] text-stone-400 max-w-md leading-relaxed">
                      Scan this cryptographic QR code with any smartphone camera to open and interact with this exact living enclosure, inspect strata depths, and simulate growth on VerdantGlass Studio.
                    </p>
                    <div className="text-[10px] text-emerald-400 font-mono pt-1">
                      Deep-link URL encoded into certificate
                    </div>
                  </div>
                  {passportQrDataUrl ? (
                    <div className="shrink-0 p-2 rounded-xl bg-white shadow-md">
                      <img
                        src={passportQrDataUrl}
                        alt="Interactive Terrarium Digital Twin QR Code"
                        className="w-24 h-24 rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-stone-800 flex items-center justify-center text-xs text-stone-500">
                      QR Generating...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 no-print">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(currentShareUrl);
                  showToast('Interactive digital twin link copied to clipboard!', 'success');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy Deep-Link</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition flex items-center gap-1.5 shadow-lg shadow-amber-950/60 cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>Print Care Passport & Gift Card (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
