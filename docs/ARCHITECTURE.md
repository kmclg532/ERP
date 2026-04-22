# ARCHITECTURE

## Index

- [System Flow](#1-system-flow)
- [Client Architecture](#2-client-architecture)
- [API and Backend Architecture](#3-api-and-backend-architecture)
  - [Module-Based Scalability](#module-based-scalability)
- [Authentication Flow](#4-authentication-flow)
- [Error Flow](#5-error-flow)
- [Component Structure Guidelines](#6-component-structure-guidelines)
- [Frontend Module Composition](#7-frontend-module-composition)
- [Theme Management](#8-theme-management)
- [Frontend Requirement Update](#9-frontend-requirement-update)

## 1. System Flow

Primary flow:

Client -> API Layer -> Route -> Controller -> Service -> Model -> MongoDB

Responsibilities:
- Client: UI rendering, route protection, API consumption
- Route: endpoint definition and middleware chain
- Controller: request parsing, response shaping
- Service: business logic and orchestration
- Model: schema and persistence rules

## 2. Client Architecture

- `layouts/` defines shell patterns (sidebar + top navbar + content area)
- `pages/` are route-level feature screens
- `components/` are reusable UI primitives/blocks
- `routes/` contains route maps and guards (`ProtectedRoute` equivalent)
- `services/` isolates Axios and domain API calls
- `theme/` owns light/dark CSS variable tokens

## 3. API and Backend Architecture

- `server/src/server.js` starts runtime and DB connection
- `server/src/app.js` registers middleware and versioned routes
- `routes/v1/` composes feature route groups
- `controllers/` delegate logic to service layer
- `services/` contain business rules, no direct HTTP shaping
- `models/` hold Mongoose entities
- `middlewares/` centralize auth, validation, and error handling

### Module-Based Scalability

- Every ERP module (dashboard, class-routine, exams, contact-activity, subject-planner, attendance, result, fees-report, student-section, notice, assignment, quiz, feedback, resolved-feedback, downloads, my-profile) maps to:
	- Route group in `routes/v1/`
	- Controller boundary in `controllers/`
	- Service boundary in `services/`
	- Model boundary in `models/` where persistence is required
- Modules share only common middleware/utilities and API response contract.
- Cross-module data composition (for example dashboard aggregates) is service-orchestrated, not controller-heavy.
- New modules must integrate without modifying established response and auth contracts.

## 4. Authentication Flow

1. User submits credentials via login form
2. Auth controller validates input and delegates to auth service
3. Auth service verifies email and password match stored credentials
4. JWT token is generated with student or faculty role claim
5. Token is set with secure HttpOnly cookie strategy
6. User redirects to dashboard after successful login
7. Protected routes validate token via auth middleware
8. Password changes are user-initiated from profile settings (/my-profile)
9. Expired/invalid token returns standardized unauthorized response

## 5. Error Flow

1. Route/controller throws or forwards error
2. Error middleware catches all unhandled errors
3. Error response is normalized to standard API contract
4. Logs preserve operational context while avoiding sensitive leaks

## 6. Component Structure Guidelines

- Container components at page level; presentational components in `components/`
- Keep reusable elements stateless where possible
- Keep forms isolated with validation boundaries
- Avoid direct API calls inside deeply nested UI primitives

## 7. Frontend Module Composition

- Route-level pages remain module-scoped under `pages/` and use shared layout shell.
- Shared UI blocks remain in `components/` and must not include module-specific API coupling.
- Feature services in `services/` encapsulate endpoint contracts for each module.
- Sidebar and top navbar expose module navigation, while keeping module internals decoupled.

## 8. Theme Management

- Theme is handled at global layout level to ensure application-wide consistency.
- Theme state is managed at app root (context/store), then consumed by layout and page components.
- Theme application uses CSS variables with root-level mode switch (for example, `data-theme`).
- Preference persistence strategy:
	- Primary: profile-backed preference via API
	- Fallback: localStorage bootstrap value
- Toggle control is placed in Top Navbar for global accessibility.

## 9. Frontend Requirement Update

- Theme state management must remain global (root context/store).
- Navbar must include a dedicated theme toggle component.
- CSS variable switching logic must drive all color changes.
- No per-page custom color logic that bypasses theme tokens.
