import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, Droplets, Sun, Moon, Sunset, Zap, Layers, Sprout, 
  Sliders, Trash2, FlipHorizontal, ArrowUp, 
  ArrowDown, ZoomIn, ZoomOut, CheckCircle2, AlertTriangle, 
  Camera, RefreshCw, Eye, EyeOff, Volume2, VolumeX, Plus,
  ShieldCheck, ChevronRight, Maximize2,
  Undo2, Redo2, Share2, Copy, Save, Bookmark, Check, X, Download, FolderHeart, ExternalLink, FileDown, Upload
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
  }
];

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

const CATALOG_ITEMS = [
  // PLANTS
  {
    id: 'fittonia',
    name: 'Fittonia Nerve Plant',
    scientific: 'Fittonia albivenis',
    category: 'plants',
    biome: 'tropical',
    idealHumidity: [65, 95],
    defaultScale: 1,
    description: 'Vibrant pink-veined foliage that thrives in closed humid jars.',
  },
  {
    id: 'polkadot',
    name: 'Polka Dot Plant',
    scientific: 'Hypoestes phyllostachya',
    category: 'plants',
    biome: 'tropical',
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
    idealHumidity: [35, 80],
    defaultScale: 0.95,
    description: 'Rootless epiphyte that perches on driftwood or stone.',
  },

  // HARDSCAPE & CRITTERS
  {
    id: 'driftwood',
    name: 'Spiderwood Branch',
    scientific: 'Rhododendron root',
    category: 'hardscape',
    biome: 'neutral',
    defaultScale: 1.15,
    description: 'Twisted golden timber providing natural climbing structure.',
  },
  {
    id: 'dragon_stone',
    name: 'Ohko Dragon Stone',
    scientific: 'Argillaceous clay stone',
    category: 'hardscape',
    biome: 'neutral',
    defaultScale: 1.1,
    description: 'Craggy, eroded stone with cavities perfect for moss pockets.',
  },
  {
    id: 'quartz',
    name: 'Amethyst & Rose Quartz',
    scientific: 'Crystalline silica',
    category: 'hardscape',
    biome: 'neutral',
    defaultScale: 0.95,
    description: 'Translucent mineral cluster that catches grow-light rays.',
  },
  {
    id: 'river_stones',
    name: 'Zen River Pebbles',
    scientific: 'Polished basalt',
    category: 'hardscape',
    biome: 'neutral',
    defaultScale: 1,
    description: 'Smooth water-worn stones for pathways and soil borders.',
  },
  {
    id: 'mushrooms',
    name: 'Canopy Forest Fungi',
    scientific: 'Mycena chlorophos',
    category: 'hardscape',
    biome: 'tropical',
    defaultScale: 0.95,
    description: 'Whimsical fruiting bodies that glow softly under UV light.',
  },
  {
    id: 'critters',
    name: 'Bioactive Clean-Up Crew',
    scientific: 'Collembola & Dairy Cow Isopods',
    category: 'critters',
    biome: 'tropical',
    defaultScale: 1,
    description: 'Living micro-fauna that roam the substrate and consume decaying matter!',
  }
];

const LIGHTING_MODES = {
  day: {
    id: 'day',
    name: 'Daylight',
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
    icon: Sunset,
    bgGradient: 'from-stone-950 via-amber-950/60 to-orange-950/50',
    ambientGlow: 'rgba(251, 146, 60, 0.22)',
    vesselTint: 'rgba(251, 146, 60, 0.08)',
    rayColor: 'rgba(253, 186, 116, 0.22)',
    uvActive: false,
    accentText: 'text-orange-300'
  },
  night: {
    id: 'night',
    name: 'Moonlight',
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
    icon: Zap,
    bgGradient: 'from-zinc-950 via-purple-950/75 to-fuchsia-950/50',
    ambientGlow: 'rgba(192, 132, 252, 0.25)',
    vesselTint: 'rgba(168, 85, 247, 0.1)',
    rayColor: 'rgba(216, 180, 254, 0.2)',
    uvActive: true,
    accentText: 'text-purple-300'
  }
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

// ==========================================
// 2. PROCEDURAL BOTANICAL & HARDSCAPE SVGs
// ==========================================

const RenderBotanicalArtwork = ({ type, uvActive }) => {
  switch (type) {
    case 'fittonia':
      return (
        <g>
          <path d="M0,0 Q-12,-18 -24,-32 M0,0 Q14,-20 26,-34 M0,0 Q-4,-25 -6,-48 M0,0 Q8,-15 18,-20" stroke="#2d5a27" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <g transform="translate(-22, -30) rotate(-32)">
            <path d="M0,0 C-14,-8 -16,-28 0,-36 C16,-28 14,-8 0,0 Z" fill="#1e4620" stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-33 M0,-10 L-8,-16 M0,-18 L-9,-24 M0,-25 L-6,-30 M0,-12 L8,-18 M0,-20 L9,-26" stroke={uvActive ? "#ff49db" : "#f472b6"} strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <g transform="translate(22, -30) rotate(30)">
            <path d="M0,0 C-14,-8 -16,-28 0,-36 C16,-28 14,-8 0,0 Z" fill="#234f26" stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-33 M0,-10 L-8,-16 M0,-18 L-9,-24 M0,-12 L8,-18 M0,-20 L9,-26" stroke={uvActive ? "#ff49db" : "#f472b6"} strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <g transform="translate(-4, -42) rotate(-6)">
            <path d="M0,0 C-16,-10 -18,-32 0,-42 C18,-32 16,-10 0,0 Z" fill="#28592b" stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-38 M0,-10 L-10,-17 M0,-20 L-11,-27 M0,-28 L-7,-34 M0,-12 L10,-19 M0,-22 L11,-29 M0,-30 L7,-35" stroke={uvActive ? "#ff49db" : "#fb7185"} strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g transform="translate(8, -14) rotate(14)">
            <path d="M0,0 C-13,-7 -14,-24 0,-30 C14,-24 13,-7 0,0 Z" fill="#2e6832" stroke="#143316" strokeWidth="1" />
            <path d="M0,-2 L0,-27 M0,-9 L-7,-14 M0,-17 L-8,-22 M0,-10 L7,-15 M0,-18 L8,-23" stroke={uvActive ? "#ff49db" : "#f472b6"} strokeWidth="1.3" strokeLinecap="round" />
          </g>
        </g>
      );

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

    case 'quartz':
      return (
        <g>
          <polygon points="-24,4 -32,-26 -22,-38 -10,-24 -8,4" fill={uvActive ? "#e879f9" : "#f472b6"} fillOpacity="0.82" stroke="#fdf4ff" strokeWidth="1" />
          <polygon points="-12,4 -16,-46 0,-64 14,-44 10,4" fill={uvActive ? "#c084fc" : "#e879f9"} fillOpacity="0.88" stroke="#ffffff" strokeWidth="1.2" />
          <polygon points="0,-64 14,-44 10,4 0,4" fill="#a855f7" fillOpacity="0.45" />
          <polygon points="6,4 12,-32 26,-40 32,-22 22,4" fill={uvActive ? "#f0abfc" : "#f9a8d4"} fillOpacity="0.85" stroke="#fdf4ff" strokeWidth="1" />
          {uvActive && <circle cx="0" cy="-50" r="18" fill="#e879f9" opacity="0.25" />}
        </g>
      );

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

    default:
      return null;
  }
};

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================

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
      lighting: PRESETS.rainforest.lighting
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

  // State ref to prevent stale closures in drag / keyboard listeners
  const stateRef = useRef({ vesselId, substrates, items, humidity, lighting });
  useEffect(() => {
    stateRef.current = { vesselId, substrates, items, humidity, lighting };
  }, [vesselId, substrates, items, humidity, lighting]);

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
          z: it.zIndex
        })),
        h: state.humidity,
        l: state.lighting
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
          zIndex: it.z ?? idx + 1
        })),
        humidity: data.h ?? 70,
        lighting: data.l ?? 'day'
      };
    } catch (err) {
      console.warn('Failed to parse build state:', err);
      return null;
    }
  };

  // Push Snapshot to History (up to 30 snapshots)
  const pushHistorySnapshot = (newSnapshot) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const next = [...trimmed, newSnapshot];
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
          setHistory([
            {
              vesselId: parsed.vesselId || 'apothecary',
              substrates: parsed.substrates,
              items: parsed.items,
              humidity: parsed.humidity ?? 70,
              lighting: parsed.lighting ?? 'day'
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
            timestamp: Date.now()
          })
        );
      } catch (_) {}
    }, 1000);
    return () => clearTimeout(timer);
  }, [vesselId, substrates, items, humidity, lighting]);

  // 3. Global Keyboard Shortcuts for Undo & Redo (Ctrl+Z / Ctrl+Y / Cmd+Z / Cmd+Shift+Z)
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

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

    SUBSTRATE_CONFIG.forEach((layer) => {
      const height = substrates[layer.key] || 0;
      if (height > 0) {
        const topY = currentBottomY - height;
        layers.push({
          ...layer,
          height,
          topY,
          bottomY: currentBottomY
        });
        currentBottomY = topY;
      }
    });

    return {
      layers,
      surfaceY: currentBottomY,
      totalHeight: currentVessel.soilBaseY - currentBottomY
    };
  }, [substrates, currentVessel]);

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
    const hasCritters = placedCatalogItems.some((c) => c.id === 'critters');

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

    // 6. Bioactive Bonus
    if (hasCritters && tropicalPlants.length > 0 && substrates.soil >= 20) {
      score = Math.min(100, score + 8);
      positives.push('Bioactive clean-up crew actively cycling nutrients!');
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

    return {
      score: clampedScore,
      statusLabel,
      statusColor,
      barColor,
      warnings,
      positives
    };
  }, [substrates, items, humidity, currentVessel]);

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
    const newUid = `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const randomOffsetX = Math.floor((Math.random() - 0.5) * 70);
    const spawnY = Math.min(435, Math.max(220, substrateStack.surfaceY + 6));

    const newItem = {
      uid: newUid,
      type: catalogItem.id,
      x: 200 + randomOffsetX,
      y: spawnY,
      scale: catalogItem.defaultScale || 1,
      rotation: 0,
      flipX: Math.random() > 0.5,
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
    const pt = getSvgCoords(e.clientX, e.clientY);
    dragStartPosRef.current = { x: item.x, y: item.y };
    draggingRef.current = {
      active: true,
      uid: item.uid,
      offsetX: pt.x - item.x,
      offsetY: pt.y - item.y
    };
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
    const hash = encodeBuildState({ vesselId, substrates, items, humidity, lighting });
    return `${window.location.origin}${window.location.pathname}#build=${hash}`;
  }, [vesselId, substrates, items, humidity, lighting]);

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
            aria-label="Load Tropical Rainforest preset"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            Tropical Rainforest
          </button>
          <button
            onClick={() => handleLoadPreset('desert')}
            aria-label="Load Desert Oasis preset"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-950/80 hover:bg-amber-900/90 text-amber-200 border border-amber-700/50 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            Desert Oasis
          </button>
          <button
            onClick={() => handleLoadPreset('zen')}
            aria-label="Load Zen Moss Garden preset"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 border border-purple-700/50 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            Zen Moss Garden
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
            aria-label="Open Saved Enclosures Archives"
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
            aria-label="Share this Terrarium via interactive link"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-white/10 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Share Interactive Link"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setIsSoundMuted((prev) => !prev)}
            aria-label={isSoundMuted ? "Unmute ambient mist sound" : "Mute ambient mist sound"}
            className={`p-1.5 rounded-lg text-xs border transition flex items-center gap-1 cursor-pointer min-w-[32px] min-h-[32px] justify-center ${
              !isSoundMuted 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-stone-800/80 text-stone-300 border-white/10 hover:text-white'
            }`}
            title={isSoundMuted ? "Unmute Ambient Mist Sound" : "Mute Sound"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleClearTerrarium}
            aria-label="Clear all placed items"
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-stone-800/80 hover:bg-rose-950/80 hover:text-rose-200 hover:border-rose-700/50 text-stone-200 border border-white/10 transition flex items-center gap-1 cursor-pointer active:scale-95"
            title="Clear all plants and decor"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Empty</span>
          </button>

          <button
            onClick={() => setIsPhotoStudioOpen(true)}
            aria-label="Open Botanical Photo Studio & Archival Export"
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
                        aria-label={`Select ${v.name} (${v.type})`}
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

        {/* ==========================================
            CENTER PANEL: INTERACTIVE SVG TERRARIUM STAGE
            ========================================== */}
        <section aria-label="Interactive Terrarium Enclosure" className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Quick Floating Environment Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 px-3 py-2 rounded-2xl bg-stone-900/75 border border-white/10 backdrop-blur-md">
            {/* Lighting Mode Switcher */}
            <div className="flex items-center gap-1" role="group" aria-label="Lighting Environment">
              {Object.values(LIGHTING_MODES).map((mode) => {
                const Icon = mode.icon;
                const active = lighting === mode.id;
                return (
                  <button
                    key={mode.id}
                    aria-label={`Set lighting to ${mode.name}`}
                    aria-pressed={active}
                    onClick={() => setLighting(mode.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer min-h-[32px] ${
                      active
                        ? 'bg-white/15 text-white border border-white/25 shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                    title={mode.name}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? mode.accentText : ''}`} aria-hidden="true" />
                    <span className="hidden sm:inline">{mode.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Mist Spray, Undo/Redo & HUD Toggle */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                aria-label="Undo last change (Ctrl+Z)"
                className={`p-1.5 rounded-xl border transition flex items-center justify-center min-w-[32px] min-h-[32px] sm:hidden ${
                  historyIndex > 0
                    ? 'bg-stone-800/80 text-stone-200 border-white/10 hover:text-white cursor-pointer active:scale-95'
                    : 'bg-stone-900/40 text-stone-600 border-white/5 cursor-not-allowed opacity-40'
                }`}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                aria-label="Redo last change (Ctrl+Y)"
                className={`p-1.5 rounded-xl border transition flex items-center justify-center min-w-[32px] min-h-[32px] sm:hidden ${
                  historyIndex < history.length - 1
                    ? 'bg-stone-800/80 text-stone-200 border-white/10 hover:text-white cursor-pointer active:scale-95'
                    : 'bg-stone-900/40 text-stone-600 border-white/5 cursor-not-allowed opacity-40'
                }`}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                onClick={handleTriggerMist}
                aria-label="Spray water mist into terrarium"
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 transition flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm min-h-[32px]"
              >
                <Droplets className={`w-3.5 h-3.5 ${isMisting ? 'animate-bounce' : ''}`} aria-hidden="true" />
                <span>Mist</span>
              </button>
              <button
                onClick={() => setShowHudLabels((p) => !p)}
                aria-label={showHudLabels ? "Hide layer depth guides" : "Show layer depth guides"}
                className="p-1.5 rounded-xl bg-stone-800/80 text-stone-200 hover:text-white border border-white/10 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                title="Toggle Layer Guides"
              >
                {showHudLabels ? <Eye className="w-4 h-4" aria-hidden="true" /> : <EyeOff className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full max-w-[460px] aspect-[400/520] rounded-3xl bg-stone-950/40 border border-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 400 520"
              className="w-full h-full touch-none"
              aria-label="Interactive 3D Glass Terrarium View"
              role="img"
              onPointerDown={handleSvgPointerDown}
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

              {/* Wooden Pedestal Base */}
              <ellipse cx="200" cy="472" rx="145" ry="18" fill="#291d15" stroke="#423023" strokeWidth="2" />
              <ellipse cx="200" cy="467" rx="135" ry="13" fill="#3d2b1f" />

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

                {/* 1. Stacked Substrate Layers */}
                {substrateStack.layers.map((layer) => (
                  <g key={layer.key}>
                    <rect
                      x="20"
                      y={layer.topY}
                      width="360"
                      height={layer.height + 4}
                      fill={`url(#pat-${layer.pattern})`}
                    />
                    <path
                      d={`M 20 ${layer.topY} Q 110 ${layer.topY - 4} 200 ${layer.topY} T 380 ${layer.topY} L 380 ${layer.topY + 5} L 20 ${layer.topY + 5} Z`}
                      fill={layer.color}
                      opacity="0.85"
                    />
                  </g>
                ))}

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

                  return (
                    <g
                      key={item.uid}
                      transform={`translate(${item.x + roamX}, ${item.y}) rotate(${item.rotation}) scale(${
                        item.scale * roamFlip
                      }, ${item.scale})`}
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
                      />

                      {/* Selection Bounding Halo */}
                      {isSelected && (
                        <circle
                          cx="0"
                          cy="-28"
                          r="42"
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="1.8"
                          strokeDasharray="4 3"
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

              {/* Glass Outlines & Highlights */}
              <path
                d={currentVessel.outlinePath}
                fill="none"
                stroke={
                  currentVessel.lidType === 'brass'
                    ? '#d97706'
                    : 'rgba(255, 255, 255, 0.45)'
                }
                strokeWidth={currentVessel.lidType === 'brass' ? '3.5' : '2.5'}
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

              {showHudLabels &&
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
        <section aria-label="Ecosystem Diagnostics & Inspector" className="lg:col-span-3 space-y-4">
          {/* 1. SELECTED ITEM TRANSFORMATION CONTROLS */}
          <div className="bg-stone-900/75 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Item Inspector
              </h2>
              {selectedItem && (
                <button
                  onClick={handleDeleteSelected}
                  aria-label="Remove selected item"
                  className="text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Remove
                </button>
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
            <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden" role="progressbar" aria-valuenow={ecosystemReport.score} aria-valuemin={0} aria-valuemax={100}>
              <div
                className={`h-full transition-all duration-500 ${ecosystemReport.barColor}`}
                style={{ width: `${ecosystemReport.score}%` }}
              />
            </div>

            <div className={`text-xs font-semibold ${ecosystemReport.statusColor}`}>
              {ecosystemReport.statusLabel}
            </div>

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
        </section>
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
    </div>
  );
}
