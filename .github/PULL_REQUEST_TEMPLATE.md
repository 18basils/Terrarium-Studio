## 🌿 Pull Request Summary

### Description
<!-- Provide a clear, concise summary of the changes introduced in this PR. -->

### Related Issue
<!-- Link related issue here: Closes #12 or Fixes #34 -->
Closes #

---

### Type of Change
- [ ] 🐛 Bug fix (non-breaking change which resolves an issue)
- [ ] ✨ New feature (new botanical specimen, vessel geometry, or simulation tool)
- [ ] 💥 Breaking change (fix or feature that alters existing enclosure save formats)
- [ ] 📝 Documentation update (README, guide, architecture, or contributing notes)
- [ ] 🔒 Security fix or hardening (CodeQL, CSP, dependency patches)
- [ ] ⚡ Performance improvement / refactor (SVG rendering, chunk splitting, audio efficiency)

---

### Verification & Testing
<!-- Describe the verification steps and tests performed. -->
- [ ] Ran static linting (`npm run lint`) with zero errors or warnings
- [ ] Built production bundle (`npm run build`) and verified assets in `dist/`
- [ ] Tested locally on desktop browser (Chrome / Edge / Firefox / Safari)
- [ ] Tested responsive touch interactions and viewport scaling on mobile
- [ ] Verified enclosure save / load state persistence in `localStorage`
- [ ] Verified procedural audio playback and slider controls

---

### Security & Quality Checklist
- [ ] No API keys, secrets, tokens, or private credentials are committed.
- [ ] Generated random values or element UIDs use `crypto.randomUUID()` or `getRandomValues()` (CWE-338 compliant).
- [ ] All interactive buttons retain accessible names matching visible text (`aria-label` / WCAG 2.5.3).
- [ ] New dependencies adhere to least-privilege with zero known critical CVE vulnerabilities.
- [ ] Code follows project style conventions and preserves documentation comments.
