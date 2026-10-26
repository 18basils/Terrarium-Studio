# VerdantGlass Studio 🌿

> **Interactive Botanical Terrarium & Micro-Ecosystem Architect**

[![Live Demo](https://img.shields.io/badge/Live_Demo-terrariumstudio.web.app-10b981?style=for-the-badge&logo=firebase&logoColor=white)](https://terrariumstudio.web.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](./LICENSE.md)
[![Security Policy](https://img.shields.io/badge/Security-Policy-blue.svg?style=for-the-badge)](./SECURITY.md)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-amber.svg?style=for-the-badge)](./CONTRIBUTING.md)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**VerdantGlass Studio** is an interactive, browser-based botanical terrarium simulator and micro-ecosystem architect. Build, layer, and simulate custom bioactive glass enclosures with procedural SVGs, real-time strata layering, micro-climate humidity and temperature control, aquascaping composition guides, and a dynamic ecosystem balance scoring engine.

🌐 **Live URL**: [https://terrariumstudio.web.app](https://terrariumstudio.web.app)  
📁 **GitHub Repository**: [https://github.com/18basils/Terrarium-Studio](https://github.com/18basils/Terrarium-Studio)

---

## ✨ Features

- 🏺 **8 Architectural Glass Vessels**:
  - *Apothecary Jar*: Classic cylindrical apothecary glass with cork stopper.
  - *Geometric Wardian*: Victorian faceted brass & glass conservatory case.
  - *Hanging Aerium Globe*: Spherical suspended glass with front viewing portal.
  - *Wide Bubble Bowl*: Low-profile open bowl for desert succulents & arid flora.
  - *Conical Erlenmeyer*: Borosilicate laboratory flask for high-humidity micro-mosses.
  - *Paludarium Waterfall Tank*: Half-aquatic tank with stone waterfall ledge & mist basin.
  - *Horizontal Cylinder ("Ship-in-Bottle")*: Panoramic cylinder with side cork neck.
  - *Hexagonal Conservatory Lantern*: Gothic Victorian lantern with steeple roof & hanging ring.

- 🪟 **Glass Tint Customizer & Pedestal Bases**:
  - **Glass Tints**: Clear Borosilicate, Apothecary Amber, Emerald Sea-Glass, and Obsidian Noir.
  - **Pedestal Bases**: Walnut Hardwood, Brushed Brass, Carrara Marble, Illuminated LED Halo, and Bare Glass.

- 🪨 **5-Tier Substrate Strata System with Exploded X-Ray View**:
  - Leca & Drainage Gravel (false-bottom reservoir preventing root rot)
  - Horticultural Activated Charcoal (toxin, sulfur odor & mold filtration)
  - Sphagnum Moss Barrier (separation membrane between soil and hydro-stratum)
  - ABG Bio-Active Nutrient Soil (organic tropical rooting matrix)
  - Silica Desert Sand (inert arid accent)
  - *Exploded X-Ray View*: Vertically separates strata with caliper brackets, millimeter depths, and calculated mass in grams.

- 🌸 **Botanical & Hardscape Catalog with Cultivar Phenotypes**:
  - **Living Flora**: Fittonia Nerve Plant (Sakura Pink, Ruby Red, White Anne), Polka Dot Plant, Mood Cushion Moss, Crispy Wave Fern, Mini Jewel Orchid, Rosette Echeveria, Zebra Haworthia, Tillandsia Air Plant, Creeping Fig, Venus Flytrap, Drosera Sundew.
  - **Hardscape & Crystals**: Ohko Dragon Stone, Spiderwood Branch, Crystal Quartz (Amethyst, Rose, Milky, Citrine), Zen River Stones, Volcanic Lava Rock (Basalt, Scoria, Pumice), Petrified Wood, Forest Mushrooms, Aquatic Pool.
  - **Bioactive Fauna**: Animated isopods and springtails actively cycling nutrients across the substrate surface.

- 📐 **Aquascaping Composition Grids**:
  - *Rule of Thirds*: 1/3 viewport guidelines with golden focal intersection nodes.
  - *Golden Spiral*: Fibonacci spiral path directing eye flow to natural focal apex.
  - *Triangular Depth Slope*: Nature aquarium diagonal slope guide lines.

- 🌡️ **Live Plant Stress, Thermal Control & 1-Click Auto-Fix**:
  - **Thermal Control**: Micro-climate temperature slider ($15^\circ\text{C}-32^\circ\text{C}$) with color-coded status.
  - **Visual Flora Stress**: Sub-optimal conditions trigger chlorosis yellowing, desaturation, and wilting transformations.
  - **1-Click Auto-Fix**: Instantly balances substrates, humidity, vessel, and temperature for a 100/100 score with ascending melodic chime.

- 📖 **Interactive DIY Physical Build Wizard**:
  - 7-step physical assembly guide with calculated depths (mm) and masses (grams) customized to your exact enclosure design.

- 📜 **Botanical Care Passport & QR Gift Certificate**:
  - Printable luxury care passport with dedication, artisan attribution, micro-climate manifest, and scannable QR code deep-linking to the exact 3D interactive digital twin.

- 💡 **4 Dynamic Lighting Modes & Procedural Soundscapes**:
  - Natural Daylight, Sunset Golden Hour, Midnight Moon, and UV Bio-Glow.
  - Multi-track procedural Web Audio soundscape (canopy wind, gentle mist spray, nocturnal crickets).

- 🎨 **Workflow & Precision Canvas Tools**:
  - Specimen Pin/Lock (`isLocked`) to prevent accidental movement.
  - Duplicate Specimen (`Ctrl+D` / `Cmd+D` or inspector button).
  - Time-lapse growth simulator scrubber (Day 1 through 1 Year).
  - High-res vector SVG snapshot exporter.
  - Touch pinch-to-zoom and pan navigation.

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
- **QR Engine**: QRCode generator
- **Graphics**: Procedural vector SVG engine
- **Audio**: Web Audio API procedural synthesizer
- **Hosting**: Firebase Hosting (Google Cloud CDN)

---

## 📄 Community Guidelines & License

| Document | Purpose | Link |
| :------- | :------ | :--- |
| ⚖️ **License** | Permissive open-source usage terms | [`LICENSE.md`](./LICENSE.md) |
| 🛡️ **Security Policy** | Vulnerability disclosure & supported versions | [`SECURITY.md`](./SECURITY.md) |
| 🤝 **Contributing Guide** | Development setup, code conventions & PR workflow | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |

---

## 👨‍💻 Author & Maintainer

Crafted with care by **Basil Shaji** ([@18basils](https://github.com/18basils)).
