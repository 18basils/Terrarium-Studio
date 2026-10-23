# VerdantGlass Studio 🌿

> **Interactive Botanical Terrarium & Micro-Ecosystem Architect**

[![Live Demo](https://img.shields.io/badge/Live_Demo-terrariumstudio.web.app-10b981?style=for-the-badge&logo=firebase&logoColor=white)](https://terrariumstudio.web.app)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**VerdantGlass Studio** is an interactive, browser-based botanical terrarium simulator and micro-ecosystem architect. Build, layer, and simulate custom bioactive glass enclosures with procedural SVGs, real-time strata layering, micro-climate humidity control, and a dynamic ecosystem balance scoring engine.

🌐 **Live URL**: [https://terrariumstudio.web.app](https://terrariumstudio.web.app)

---

## ✨ Features

- 🏺 **5 Glass Enclosure Vessels**:
  - *Apothecary Jar*: Classic closed-top cylindrical glass with cork stopper.
  - *Geometric Wardian*: Victorian faceted brass & glass conservatory case.
  - *Hanging Aerium Globe*: Spherical suspended glass with wide front portal.
  - *Wide Bubble Bowl*: Low-profile open bowl ideal for succulents & arid flora.
  - *Conical Erlenmeyer*: High-humidity laboratory borosilicate flask.

- 🪨 **5-Tier Substrate Strata System**:
  - Leca & Drainage Gravel (false bottom to prevent root rot)
  - Activated Horticultural Charcoal (toxin & odor filtration)
  - Sphagnum Moss Barrier (soil retention)
  - ABG Bio-Active Nutrient Soil (organic root development)
  - Silica Desert Sand (arid strata accent)
  - *Dynamic Strata Elevation*: Adjusting substrate sliders shifts rooted flora vertically to stay grounded on the soil horizon.

- 🌸 **Botanical & Hardscape Catalog**:
  - **Flora**: Fittonia Nerve Plant, Polka Dot Plant, Mood Cushion Moss, Crispy Wave Fern, Mini Jewel Orchid, Rosette Echeveria, Zebra Haworthia, Tillandsia Air Plant.
  - **Hardscape & Fauna**: Spiderwood Branch, Ohko Dragon Stone, Crystal Quartz, Zen River Stones, Canopy Forest Fungi.
  - **Bioactive Fauna**: Animated isopods and springtails that actively cycle nutrients across the substrate surface.

- 💡 **4 Dynamic Lighting Modes**:
  - **Daylight**: Natural bright sunlit canopy.
  - **Golden Hour**: Warm sunset hue with amber reflections.
  - **Moonlight**: Cool nocturnal deep indigo illumination.
  - **UV Bio-Glow**: Fluorescent glow bringing out bioluminescent mushrooms, crystals, and foliage veins.

- 🔬 **Real-Time Ecosystem Balance Engine**:
  - Assesses false bottom drainage, charcoal filtration, root depth, biome compatibility (flagging tropical vs. desert moisture conflicts), and bioactive bonuses.
  - Provides instant diagnostic warnings and positive feedback.

- 💧 **Micro-Climate Control**:
  - Manual and interactive mist spray with simulated droplet animations.
  - Dynamic glass condensation beads when relative humidity exceeds 78%.
  - Synthesized Web Audio mist sound effect (with mute control).

- 🎨 **Creative Tools & Export**:
  - Canvas drag-and-drop repositioning with boundary constraints.
  - Transform controls: scale, rotation angle, horizontal flipping, forward/back layering.
  - One-click templates: *Tropical Rainforest*, *Desert Oasis*, *Zen Moss Garden*.
  - Instant vector SVG snapshot export.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/18basils/Terrarium-Studio.git
cd Terrarium-Studio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Deploy

```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Graphics**: Procedural vector SVG engine
- **Audio**: Web Audio API synthesizer
- **Hosting**: Firebase Hosting (Google Cloud CDN)

