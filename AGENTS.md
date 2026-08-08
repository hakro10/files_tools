# AGENTS.md - Developer & Agent Instructions for DevSuite Platform

> **IMPORTANT FOR ALL AI AGENTS & DEVELOPERS**: 
> Read this document completely before modifying or extending this repository. This file details the architecture, compliance rules, known gotchas, complete change history, and mandatory procedures.

---

## 🛑 MANDATORY AGENT RULE (MUST FOLLOW ON EVERY TASK)

> [!CRITICAL]
> Whenever an AI Agent or developer resolves an issue, fixes a bug, refactors code, or adds a new feature to this codebase, you **MUST** immediately append a new log entry to the **[CHANGELOG & ISSUE/BUG RESOLUTION HISTORY](#-changelog--issuebug-resolution-history)** section at the bottom of this file.
> 
> Each entry **MUST** contain:
> 1. **Timestamp & Date**
> 2. **Summary of Issue / Bug / Feature**
> 3. **Root Cause & Diagnostic Findings**
> 4. **Exact File Changes Applied**
> 5. **Verification Conducted** (`npm run build` status)

---

## 🏗️ Project Architecture & Tech Stack

- **Framework**: React 18 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom dark mode design system
- **Routing**: `react-router-dom` v6 (Hub & Spoke URL model)
- **Icons**: `lucide-react`
- **Utilities**: `sql-formatter`, native browser Web Crypto API (`crypto.subtle`)
- **Hosting Target**: Cloudflare Pages (Static SPA mode configured via `public/_redirects`)

### Core Architecture Guarantee
1. **100% Client-Side Processing**: Zero network API dispatches to backend servers. All data processing occurs locally in browser memory for sub-50ms speed and absolute privacy.
2. **Web Crypto Native**: Cryptographic operations (HMAC SHA-256/384/512 JWT verification) use native browser `crypto.subtle`.

---

## 📍 File & Directory Structure

```
Developer_&_Tech_Suite/
├── public/
│   ├── _redirects                  # Cloudflare Pages SPA redirect rule (/* /index.html 200)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ads/                    # AdSense AdSlot Components
│   │   │   ├── AdSlotHeader.tsx    # id="ad-slot-header"
│   │   │   ├── AdSlotOutput.tsx    # id="ad-slot-output"
│   │   │   ├── AdSlotInline.tsx    # id="ad-slot-inline"
│   │   │   └── AdSlotSidebar.tsx   # id="ad-slot-sidebar"
│   │   ├── common/
│   │   │   ├── CopyButton.tsx      # 1-Click copy with visual feedback
│   │   │   ├── ErrorAlert.tsx      # Syntax & runtime error alert badge
│   │   │   ├── CodeBlock.tsx       # Monospace code container
│   │   │   └── SeoContent.tsx      # Programmatic 700+ word SEO text generator
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Logo, search bar, status badges
│   │   │   ├── Sidebar.tsx         # Tool list navigation & ad slot
│   │   │   ├── Footer.tsx          # Compliance links & legal disclosures
│   │   │   └── ToolLayout.tsx      # Standard hub-and-spoke page wrapper
│   │   └── tools/                  # 6 Core Tool Views
│   │       ├── JsonFormatter/      # 1. JSON Formatter, Validator & Tree Visualizer
│   │       ├── JwtDecoder/         # 2. JWT Decoder (Web Crypto API)
│   │       ├── SqlFormatter/       # 3. SQL Query Formatter & Minifier
│   │       ├── RegexTester/        # 4. Regex Tester with token highlighting
│   │       ├── Base64Encoder/      # 5. Base64 & URL Encoder/Decoder
│   │       └── FlexGridPlayground/ # 6. CSS Flexbox & Grid Visual Playground
│   ├── pages/
│   │   ├── HomePage.tsx            # Hub page
│   │   ├── ToolPage.tsx            # Dynamic tool router (/tools/:slug)
│   │   ├── PrivacyPolicyPage.tsx   # /privacy
│   │   ├── TermsPage.tsx           # /terms
│   │   ├── AboutPage.tsx           # /about
│   │   └── ContactPage.tsx         # /contact
│   ├── data/
│   │   └── toolsData.ts            # SEO text (700+ words/tool), FAQs, code snippets
│   ├── App.tsx                     # React Router definition
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind v4 import (@import "tailwindcss";)
├── package.json
├── vite.config.ts
├── AGENTS.md                       # This file (Agent Instructions & Change Log)
└── README.md
```

---

## 💰 Google AdSense Compliance Rules (CRITICAL)

All future UI or layout edits **MUST** strictly maintain the following AdSense rules:

1. **Mandatory Ad Labeling**:
   - Every ad placeholder (`AdSlotHeader`, `AdSlotOutput`, `AdSlotInline`, `AdSlotSidebar`) MUST render a muted, uppercase font-mono label reading **`ADVERTISEMENT`** at the top.
2. **Top Header Ad Placement (`id="ad-slot-header"`)**:
   - MUST sit **BELOW** the main page H1 title / hero section and **DIRECTLY ABOVE** the tool workspace component.
   - **NEVER** render an ad banner above the main site title or main H1 page heading (prevents "Ads Above Content" policy flags).
3. **Output Ad Placement (`id="ad-slot-output"`)**:
   - Positioned directly adjacent to/below the tool's result output box.
4. **Spacing**:
   - Enforce explicit 16px+ vertical margins (`my-4`, `my-6`) around ad slot containers to prevent accidental click flags near interactive UI inputs and buttons.
5. **Non-Thin Content**:
   - Every tool page must maintain 700+ words of structured programmatic HTML text (`SeoContent.tsx`) with semantic H2/H3 headings.

---

## 🛠️ Verification Commands

Before declaring any task complete, run:
```bash
npm run build
```
Ensure build compiles cleanly with zero TypeScript errors.

---

## 📜 CHANGELOG & ISSUE/BUG RESOLUTION HISTORY

### Entry 001 - Initial Platform Creation & Deployment Setup
- **Date**: 2026-07-30
- **Summary**: Built DevSuite core platform featuring 6 client-side developer tools, Tailwind CSS v4, React Router v6, Web Crypto API, and Cloudflare Pages SPA deployment configuration.
- **Root Cause & Fix**: N/A (Initial feature build).
- **Verification**: Executed `npm run build` (`✓ built in 268ms`).

---

### Entry 002 - Import Typo Fix (`react.router-dom` -> `react-router-dom`)
- **Date**: 2026-07-30
- **Summary**: Fixed module resolution errors during initial TypeScript build.
- **Root Cause**: Accidental dot in import paths (`import { Link } from 'react.router-dom'`).
- **Fix Applied**: Updated imports across `App.tsx`, `Header.tsx`, `Footer.tsx`, `Sidebar.tsx`, `ToolLayout.tsx`, `HomePage.tsx`, and `ToolPage.tsx` to `react-router-dom`.
- **Verification**: `npm run build` cleared module resolution errors.

---

### Entry 003 - Template Literal Backtick Syntax Fix in `toolsData.ts`
- **Date**: 2026-07-30
- **Summary**: Fixed TypeScript parser error `TS2364: The left-hand side of an assignment expression must be a variable...` at line 353 of `toolsData.ts`.
- **Root Cause**: Escaped backticks (`\`+\`` and `\`=\``) inside multi-line template literals caused JavaScript string termination ambiguity.
- **Fix Applied**: Replaced escaped backticks with standard single quotes (`'+'`, `'='`) inside text content in `src/data/toolsData.ts`.
- **Verification**: `npm run build` resolved TS2364 error.

---

### Entry 004 - `sql-formatter` v15 Indent Option Migration
- **Date**: 2026-07-30
- **Summary**: Fixed `TS2353: Object literal may only specify known properties, and 'indent' does not exist in type...`.
- **Root Cause**: `sql-formatter` v15 deprecated the `indent` string property in favor of `tabWidth`.
- **Fix Applied**: Updated `SqlFormatter.tsx` options payload to pass `{ tabWidth: 2 }`.
- **Verification**: `npm run build` passed cleanly.

---

### Entry 005 - TypeScript Type-Only Import Enforcement
- **Date**: 2026-07-30
- **Summary**: Fixed `TS1484: 'ToolMetadata' is a type and must be imported using a type-only import`.
- **Root Cause**: `verbatimModuleSyntax` TypeScript flag required explicit type imports for interface types.
- **Fix Applied**: Updated imports in `ToolLayout.tsx` and `SeoContent.tsx` to `import type { ToolMetadata } from ...`.
- **Verification**: `npm run build` passed cleanly.

---

### Entry 006 - Valid Signature Sample Token for JWT Decoder
- **Date**: 2026-08-08
- **Summary**: Fixed false "Invalid Signature" result when verifying sample JWT in `JwtDecoder.tsx`.
- **Root Cause**: Initial sample JWT string had a dummy hardcoded signature string rather than a valid HMAC SHA-256 signature calculated against secret `your-256-bit-secret-key`.
- **Fix Applied**: Generated exact Web Crypto signature `F8yURrIpFEimb2m_XXN9vt6x27_nnNhcbx_mBgStsuQ` and updated `SAMPLE_JWT` in `JwtDecoder.tsx`.
- **Verification**: Browser subagent verification returned **Signature Verified!** status.

---

### Entry 007 - AdSense Top Banner Placement & Ad Labeling Refactor
- **Date**: 2026-07-30
- **Summary**: Refactored top header ad placement and added `AdSlotOutput` to prevent AdSense policy flags.
- **Root Cause**: Leaderboard ad was rendering above main page titles, risking "Ads Above Content" flags.
- **Fix Applied**:
  1. Moved `<AdSlotHeader />` in `HomePage.tsx` below Hero section and above tools grid.
  2. Moved `<AdSlotHeader />` in `ToolLayout.tsx` below H1 Page Title and directly above tool workspace.
  3. Added explicit uppercase `ADVERTISEMENT` header badge and `my-4` / `my-6` margins to all 4 ad slot components.
  4. Embedded `<AdSlotOutput />` directly below output result boxes across all 6 tool components.
- **Verification**: `npm run build` passed cleanly (`✓ built in 188ms`).

---

### Entry 008 - Creation of Essential Compliance Pages
- **Date**: 2026-07-30
- **Summary**: Created dedicated policy and information pages required for AdSense site approval.
- **Fix Applied**:
  - Created `PrivacyPolicyPage.tsx` (`/privacy`), `TermsPage.tsx` (`/terms`), `AboutPage.tsx` (`/about`), and `ContactPage.tsx` (`/contact`).
  - Added routes in `App.tsx` and updated global `Footer.tsx` with clickable navigation links.
- **Verification**: Verified navigation and page rendering in browser.

---

### Entry 009 - Git Repository Initialization & Remote Push
- **Date**: 2026-08-08
- **Summary**: Initialized local Git repository, created initial commit, and pushed codebase to GitHub.
- **Fix Applied**:
  - Initialized git (`git init`), set default branch to `main`.
  - Added remote origin `https://github.com/hakro10/files_tools.git`.
  - Executed initial commit (`45 files changed, 5936 insertions(+)`) and pushed to `origin/main`.
- **Verification**: Remote branch `main` successfully tracking `origin/main`.
