# Security Policy 🛡️

The VerdantGlass Terrarium Studio team and maintainers take the security and privacy of our software, users, and community seriously. This document outlines our vulnerability disclosure process and supported software versions.

---

## 📦 Supported Versions

We provide security updates and patches for the following versions of VerdantGlass Terrarium Studio:

| Version | Supported          | Release Notes / Branch |
| :------ | :----------------: | :--------------------- |
| `main`  | :white_check_mark: | Latest production live deployment at [terrariumstudio.web.app](https://terrariumstudio.web.app) |
| `< 1.0` | :x:                | Legacy alpha/preview commits (please upgrade to `main`) |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or security bug in VerdantGlass Terrarium Studio, please do **NOT** open a public issue. Publicly disclosing a vulnerability can put users and environments at risk before a patch is released.

Instead, please report vulnerabilities responsibly using one of the following methods:

### Option 1: GitHub Private Security Advisory (Preferred)
1. Navigate to the [Security Advisories tab](https://github.com/18basils/Terrarium-Studio/security/advisories/new) of this repository.
2. Click **"Report a vulnerability"** to submit an encrypted, confidential report directly to the repository maintainer.

### Option 2: Direct Maintainer Contact
- Contact the project maintainer via GitHub: [@18basils](https://github.com/18basils)
- Email: `18basils@users.noreply.github.com`

### What to Include in Your Report
To help us triage and resolve the issue quickly, please provide as much detail as possible:
- A clear description of the vulnerability and its potential impact.
- Step-by-step instructions or a Minimal Reproducible Example (MRE) / Proof of Concept (PoC).
- The operating system, browser version, and environment where the issue was observed.
- Any relevant logs, stack traces, or console outputs.

---

## ⏱️ Response Timeline

When a security report is submitted:
1. **Initial Acknowledgment**: You will receive an initial response confirming receipt of your report within **48 hours**.
2. **Assessment & Verification**: We will triage the vulnerability, determine its severity (CVSS score where applicable), and verify reproduction within **5 business days**.
3. **Resolution & Patch**: Once verified, a fix will be developed in a private security fork and deployed to production.
4. **Public Disclosure**: A public security advisory and release notes will be published in coordination with the reporter after the fix is verified in production.

---

## 🔒 Security Architecture & Best Practices

VerdantGlass Terrarium Studio is a client-side Single Page Application (SPA) designed with privacy-first and secure-by-default architecture:

- **Zero Tracking & Zero PII**: The studio does not collect, track, or transmit any personally identifiable information (PII) or telemetry to external tracking servers.
- **Client-Side Enclosure Storage**: Terrarium saves are persisted locally within the user's browser `localStorage` and never sent to a remote database without explicit user action.
- **Safe State Serialization**: State sharing URLs use standard Base64-encoded JSON payloads with schema verification and type bounds checking on deserialization to mitigate prototype pollution or injection.
- **Sanitized Vector Graphics**: SVG elements are generated deterministically through React's virtual DOM without `dangerouslySetInnerHTML`.
- **Continuous CodeQL Static Analysis**: Automated deep code scanning analyzing all PRs and commits against CWE security rules (including CWE-338 cryptographically secure randomness, injection, and prototype pollution).
- **Automated Dependabot CVE Monitoring**: Continuous security alerts and automated dependency update PRs protecting against known npm vulnerabilities.
- **Secret Scanning & Push Protection**: Real-time git push scanning intercepting accidental API key, token, or credential leakage before reaching the repository.
- **Immutable Branch Protection**: Strict GitHub rulesets preventing accidental force pushes (`non_fast_forward`) and branch deletion on the `main` production branch.
- **Content Security & Hosting**: Production assets are served over HTTPS via Firebase Hosting / Google Cloud CDN with secure HTTP response headers and caching controls.

Thank you for helping keep VerdantGlass Terrarium Studio safe and resilient! 🌿
