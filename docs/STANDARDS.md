# STANDARDS

## Index

- [STANDARDS](#standards)
  - [Index](#index)
  - [1. General Principles](#1-general-principles)
  - [2. Naming Conventions](#2-naming-conventions)
  - [3. Folder Rules](#3-folder-rules)
  - [4. Import and Export Rules](#4-import-and-export-rules)
  - [5. API Response Contract (Mandatory)](#5-api-response-contract-mandatory)
  - [6. Route Versioning (Mandatory)](#6-route-versioning-mandatory)
  - [7. Environment and Config Rules](#7-environment-and-config-rules)
  - [8. Security Baselines](#8-security-baselines)
  - [9. UI and Design System Rules](#9-ui-and-design-system-rules)
    - [Tailwind CSS Usage Rule (NEW)](#tailwind-css-usage-rule-new)
  - [10. Auth System Rules (New)](#10-auth-system-rules-new)
  - [11. Theme System Rules](#11-theme-system-rules)
  - [12. AI Execution Rules (Strict)](#12-ai-execution-rules-strict)

This document is the strict rulebook for both human and AI contributors.

## 1. General Principles

- Follow documentation-first workflow before implementation.
- Reuse existing utilities, services, and components whenever possible.
- Avoid duplicate logic across pages/modules.
- Keep architecture and naming predictable.
- Prefer small, composable units over large files.

## 2. Naming Conventions

Frontend:

- Components: PascalCase (`StudentCard.jsx`)
- Hooks: camelCase prefixed with `use` (`useAuth.js`)
- Utilities/services: camelCase (`authService.js`)
- Folders: kebab-case for feature folders, lowercase for domain groups

Backend:

- Files: kebab-case (`auth.controller.js`, `error.middleware.js`)
- Models: PascalCase symbols, file names can stay kebab/lowercase per module style
- Route files: `*.route.js` preferred for feature routing

Environment variables:

- UPPER_SNAKE_CASE only

## 3. Folder Rules

Frontend must keep:

- `components/` reusable UI only
- `layouts/` app shell compositions (sidebar/topbar/content)
- `pages/` route-level screens
- `routes/` route declarations and guards
- `services/` API clients and domain service wrappers
- `theme/` CSS variable tokens and mode definitions

Backend must keep:

- `routes/` HTTP route registration only
- `controllers/` request-response orchestration only
- `services/` business logic
- `models/` Mongoose schemas/models
- `middlewares/` cross-cutting concerns (auth, validation, errors)
- `config/` app/runtime config
- `validators/` request validation schemas

## 4. Import and Export Rules

- Use ES Modules consistently.
- Prefer named exports for utilities and services.
- Use default export only for clear single-responsibility modules (for example root app instance).
- Keep import order consistent:
  1. External packages
  2. Internal absolute/relative modules
  3. Local styles/assets

## 5. API Response Contract (Mandatory)

All API responses must follow:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed",
  "error": "Optional error message"
}
```

Notes:

- `error` is optional and should appear only on failure responses.
- `data` can be object, array, or null.

## 6. Route Versioning (Mandatory)

- All backend routes must be versioned.
- Base format: `/api/v1/...`
- No unversioned public API endpoints for production features.

## 7. Environment and Config Rules

- Never hardcode URLs, ports, database URIs, secrets, OAuth keys.
- Load env using explicit path strategy.
- Validate required env at startup; fail fast on missing values.

## 8. Security Baselines

- Use HttpOnly cookies for auth tokens where applicable.
- Enforce token expiry.
- Configure CORS with explicit origins.
- Sanitize and validate all incoming payloads.

## 9. UI and Design System Rules

- Use CSS variables only for theme colors.
- Primary brand color: `#3EA1E4`.
- Light mode default, dark mode parity mandatory.
- Keep spacing and typography scale consistent across pages.
- Preserve minimalist, uncluttered dashboard layout.

### Tailwind CSS Usage Rule (NEW)

- Tailwind CSS must be the primary styling system for all components.
- Do NOT write component-level styles in `index.css` or custom CSS files.
- Use Tailwind utility classes for:
  - layout
  - spacing
  - typography
  - responsiveness
- CSS files are allowed ONLY for:
  - global variables (theme tokens)
  - base resets
- All colors must use CSS variables with Tailwind:
  - `text-[var(--text-color)]`
  - `bg-[var(--bg-color)]`
- Do NOT mix Tailwind and custom CSS randomly.

## 10. Auth System Rules (New)

- Auth system must support role-based access control (student, faculty).
- Student authentication must support first login with enrollment number.
- Password change is optional and user-initiated, available from profile settings.
- Faculty authentication must include role claim in JWT token.
- No Google OAuth or third-party auth in initial release.
- Endpoints must validate role claims before granting access.
- Password policy: minimum 8 characters with complexity rules.
- Tokens must expire after 24 hours; refresh tokens optional in Phase 1.

## 11. Theme System Rules

- All UI must use CSS variables for colors.
- Theme must support both light and dark modes.
- No hardcoded color values are allowed in component styles.
- Theme toggle behavior must be globally consistent across all pages.
- Theme state must be managed at app root level (context/store pattern).
- Theme switching must not require page reload.
- Persist user preference in profile, with localStorage fallback only for bootstrap resilience.

## 12. AI Execution Rules (Strict)

- AI must read and follow `PROJECT_SPEC.md` and this file before generating new code.
- AI must not introduce parallel patterns for solved concerns.
- AI must extend existing architecture rather than replacing it.
- AI must not generate feature code in documentation-only phases.
- Every new ERP module must be documented in `PROJECT_SPEC.md` (page definition, flow, actions, states, backend reflection) before coding starts.
