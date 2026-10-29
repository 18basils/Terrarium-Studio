# Changelog 🌿

All notable changes to **VerdantGlass Terrarium Studio** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Automated Dependabot weekly configuration for npm dependencies.
- Structured GitHub Issue Forms for Bug Reports and Feature Requests with private vulnerability advisory routing.
- Comprehensive Pull Request review template with security and WCAG quality checklists.

### Security
- Hardened Content Security Policy with `object-src 'none';` to neutralize plugin and object injection risks.
- Enforced `no-cache, no-store, must-revalidate` caching on `/index.html` to guarantee instant delivery of new releases.
- Tuned HTTP Strict Transport Security (HSTS) max-age header for public subdomain hosting.

---

## [1.0.0] - 2026-10-28

### Added
- **Dynamic Botanical Vessels**: 4 architectural glass geometries (Geometric Wardian Case, Hexagonal Prism, Cylindrical Biome, and Teardrop Enclosure) with realistic mathematical SVG refraction and condensation gradients.
- **Botanical Specimen Catalog**: Procedural vector SVG botanical renderings for ferns, mosses, carnivorous sundews, epiphyte orchids, fittonias, and mineral hardscapes (dragon stone, driftwood, volcanic lava rock).
- **Real-Time Micro-Climate Simulator**: Interactive physics engine modeling relative humidity, ambient temperature, substrate saturation, and day/night UV light spectrum.
- **Bio-Harmony & Ecosystem Balance Scoring**: Algorithmic compatibility calculator evaluating plant light needs, moisture tolerances, and substrate drainage balance with real-time health grading (0–100%).
- **Web Audio Ambience Synthesizer**: Procedural multi-node audio engine synthesizing rain on glass, gentle canopy breeze, babbling stream, and twilight forest cricket chorus.
- **Nursery Checklist & Shopping Export**: Dynamic shopping checklist generating itemized plant, substrate, and hardware requirements with printable checklist export.
- **4K High-Res Poster Export & QR Code Sharing**: Lossless SVG/Canvas snapshot generation and instant Base64 compressed state sharing URLs with on-screen QR codes.
- **Progressive Web App (PWA)**: Mobile-optimized standalone manifest (`site.webmanifest`) and responsive touch-first interface.
- **GitHub Security Suite**: Enabled GitHub CodeQL SAST scanning, Secret Scanning with Push Protection, Dependabot security updates, and immutable `main` branch protection ruleset.
- **100/100 Core Web Vitals**: Optimized Vite 8 bundle with parallel vendor chunking, deferred analytics, and zero cumulative layout shift (CLS).

### Security
- Resolved all CWE-338 alerts by migrating to cryptographically secure `crypto.randomUUID()` and `window.crypto.getRandomValues()`.
- Implemented strict Content Security Policy, X-Frame-Options (`DENY`), and Referrer-Policy (`strict-origin-when-cross-origin`).
