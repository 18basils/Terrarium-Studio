# Contributing to VerdantGlass Studio 🌿🤝

Thank you for your interest in contributing to **VerdantGlass Studio**! We welcome contributions from developers, botanists, aquascapers, 3D/vector artists, and nature enthusiasts around the world.

Whether you are fixing a typo, adding a new botanical specimen, engineering an architectural glass vessel, optimizing the procedural audio synthesizer, or refining the ecosystem balance engine, your help is appreciated.

---

## 🧭 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please be respectful, constructive, and collaborative in all issues, pull requests, and discussions.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or equivalent package manager like `yarn` / `pnpm`)
- **Git**: Installed and configured on your machine

### Local Development Setup

1. **Fork the Repository**  
   Click the **Fork** button at the top-right of the [repository page](https://github.com/18basils/Terrarium-Studio) to create your own copy.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/<your-username>/Terrarium-Studio.git
   cd Terrarium-Studio
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Vite Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/` (or the URL printed in your terminal). Hot Module Replacement (HMR) is active by default.

---

## 💻 Contribution Workflow

### 1. Create a Topic Branch
Always branch off the latest `main` branch:
```bash
git checkout main
git pull origin main
git checkout -b feat/add-carnivorous-sundew-specimen
```

Recommended branch naming conventions:
- `feat/feature-name` (e.g., `feat/orchid-cultivars`)
- `fix/bug-description` (e.g., `fix/pinch-zoom-boundary`)
- `docs/doc-update` (e.g., `docs/update-guide`)
- `perf/optimization` (e.g., `perf/svg-render-memo`)

### 2. Make Your Changes
Adhere to the existing code standards:
- **React 19 & Hooks**: Use idiomatic functional components with `useMemo`, `useCallback`, and `useRef` to maintain high rendering performance.
- **Tailwind CSS v4**: Maintain consistency with the dark botanical glassmorphism aesthetic (`stone-900/95`, `emerald-400`, `amber-400`, `sky-400`).
- **Lucide Icons**: Use icons consistently from `lucide-react`.
- **Procedural SVG Botanical Artwork**: When authoring new flora, fauna, or mineral hardscape, construct them as scalable procedural SVG paths within `RenderBotanicalArtwork` supporting UV glow, cultivar phenotypes, and time-lapse growth stages.
- **Micro-Climate & Bio-Harmony**: When introducing new flora or vessels, register their botanical family, humidity requirements, and biome compatibility in `CATALOG_ITEMS` and `ecosystemReport`.
- **Accessibility (a11y) & WCAG 2.5.3**: Ensure all interactive buttons include accessible names that match or contain their visible text labels (`aria-label`), progress bars define `aria-valuenow` with accessible titles, and focus states are keyboard-navigable.
- **Cryptographic Security (CodeQL CWE-338)**: Always generate unique element UIDs, IDs, or security-sensitive identifiers using `crypto.randomUUID()` or `window.crypto.getRandomValues()` rather than raw `Math.random()`.

### 3. Verify Code Quality & Build
Before committing, ensure your code passes static linting and builds cleanly without warnings:

```bash
# Run static linting
npm run lint

# Verify production Vite build bundle
npm run build
```

### 4. Commit Changes
Write clear, concise, and conventional commit messages:
```bash
git add .
git commit -m "feat(flora): introduce Drosera capensis cape sundew specimen"
```

Common commit prefixes:
- `feat:` for new capabilities or assets
- `fix:` for bug fixes
- `docs:` for documentation updates
- `refactor:` for code structural improvements
- `style:` for formatting or UI polish
- `perf:` for performance optimizations

### 5. Submit a Pull Request (PR)
1. Push your branch to your fork:
   ```bash
   git push origin feat/add-carnivorous-sundew-specimen
   ```
2. Navigate to [https://github.com/18basils/Terrarium-Studio/pulls](https://github.com/18basils/Terrarium-Studio/pulls).
3. Click **"New Pull Request"** and select your branch.
4. Fill out the PR template with:
   - A descriptive summary of what was changed and why.
   - Screenshots or video clips if modifying visual UI or SVG rendering.
   - Any linked issue numbers (e.g., `Fixes #12`).
5. Wait for automated checks and maintainer review.

---

## 🌿 Areas You Can Help With

- 🪴 **New Botanical & Hardscape Assets**: Add authentic botanical species (e.g., Sundews, Pitcher Plants, Calathea, Bonsai Juniper) or hardscape minerals.
- 🏺 **New Architectural Vessels**: Geometric terrarium glassware with mathematical SVG clipping paths.
- 🧪 **Biotic Engine Algorithms**: Expand the bio-harmony calculation rules (light spectrum requirements, fungal interactions, springtail population dynamics).
- 🔊 **Soundscape Synthesis**: Enhance Web Audio procedural nodes (rain squalls, running streamlets, night chorus).
- 🌐 **Internationalization**: Localized currency and botanical naming for global nursery checklists.

---

## 📜 Questions or Discussions?

Feel free to open an [Issue](https://github.com/18basils/Terrarium-Studio/issues) or reach out to the maintainer [@18basils](https://github.com/18basils).

Happy Terrarium Building! 🌿✨
