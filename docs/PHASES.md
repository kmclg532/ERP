# PHASES

## Index

- [Phase 0 - Setup Validation](#phase-0---setup-validation)
  - [Phase 0.x - Theme System](#phase-0x---theme-system)
- [Phase 1 - Auth System](#phase-1---auth-system)
  - [Phase 1.1 - Student Login](#phase-11---student-login)
  - [Phase 1.2 - Password Management](#phase-12---password-management)
  - [Phase 1.3 - Faculty Auth](#phase-13---faculty-auth)
  - [Phase 1.4 - Role-Based Routing](#phase-14---role-based-routing)
- [Phase 2 - Core Modules](#phase-2---core-modules)
  - [Phase 2.1 - Dashboard](#phase-21---dashboard)
  - [Phase 2.2 - Assignments](#phase-22---assignments)
  - [Phase 2.3 - Attendance](#phase-23---attendance)
  - [Phase 2.4 - Fees](#phase-24---fees)
  - [Phase 2.5 - Notifications](#phase-25---notifications)
- [Phase 3 - Stability and Production Hardening](#phase-3---stability-and-production-hardening)

## Phase 0 - Setup Validation

Goal:
- Establish a reliable project baseline with validated frontend and backend startup, environment loading, and API health checks.

Inputs:
- Node.js + npm + MongoDB setup
- Root and server .env files configured

Outputs:
- Frontend boots with routing shell and layout rendering
- Backend boots with Express startup and MongoDB connectivity
- Basic API health endpoint returns standardized response format
- Environment validation fails fast when required variables are missing

### Phase 0.x - Theme System

Goal:
- Implement global theme switching for light/dark modes.

Inputs:
- Global layout shell with top navbar
- Theme token definitions (CSS variables)
- App root context/store scaffolding

Outputs:
- Toggle working in navbar
- Theme persists per user preference
- UI remains consistent across all pages after mode switch
- Theme changes apply without page reload

Dependencies:
- Phase 0 baseline setup

## Phase 1 - Auth System

### Phase 1.1 - Student Login

Goal:
- Implement student authentication with email and password (enrollment number on first login).

Inputs:
- Student model schema with email, enrollmentNumber, password fields
- Auth controller and service scaffolding
- Login endpoint stub

Outputs:
- POST /api/v1/auth/login endpoint functional
- Student can login with email + enrollment number
- JWT token generation and HttpOnly cookie storage
- Proper error responses (invalid credentials, missing fields)

Dependencies:
- MongoDB connection (Phase 0)

### Phase 1.2 - Password Management

Goal:
- Allow users to change their password anytime from the profile settings page.

Inputs:
- change-password endpoint stub
- Password validation rules
- My Profile page with security section

Outputs:
- POST /api/v1/auth/change-password endpoint functional anytime after login
- Profile page (/my-profile) includes change password form in security section
- Users can update password with current password verification

Dependencies:
- Phase 1.1 (student login)

### Phase 1.3 - Faculty Auth

Goal:
- Implement faculty login and signup with role claim shaping.

Inputs:
- Faculty model schema with email, facultyId, password, role fields
- Faculty controller and service
- Role claim middleware

Outputs:
- POST /api/v1/faculty/login endpoint functional
- POST /api/v1/faculty/signup endpoint functional (admin-controlled)
- Faculty JWT token includes role="faculty" claim
- Faculty and student roles properly isolated

Dependencies:
- Phase 1.1 (baseline auth)

### Phase 1.4 - Role-Based Routing

Goal:
- Implement protected routes and role-based access control on both frontend and backend.

Inputs:
- ProtectedRoute component for frontend
- Auth middleware for backend routes
- Role validation logic

Outputs:
- Student pages (student-only) reject faculty access (403)
- Faculty pages reject student access (403)
- Dashboard shows role-specific content
- Redirect to appropriate login page based on user role

Dependencies:
- Phase 1.3 (faculty auth with roles)

## Phase 2 - Core Modules

### Phase 2.1 - Dashboard

Goal:
- Implement consolidated student productivity overview with KPI cards and quick actions.

Inputs:
- Dashboard aggregation service
- KPI calculation logic (attendance %, pending assignments, unpaid fees)
- Dashboard page component

Outputs:
- GET /api/v1/dashboard/overview endpoint functional
- Dashboard page displays KPI cards and upcoming events
- Real-time data aggregation from multiple sources

Dependencies:
- Phase 1.4 (role-based routing)

### Phase 2.2 - Assignments

Goal:
- Implement assignment listing and submission workflow.

Inputs:
- Assignment model and schema
- Assignment submission model
- Assignment listing and submission endpoints
- Assignment page component

Outputs:
- GET /api/v1/assignments endpoint functional
- GET /api/v1/assignments/:id endpoint functional
- POST /api/v1/assignments/:id/submissions endpoint functional
- Student can filter and submit assignments
- Submission status tracking visible

Dependencies:
- Phase 2.1 (dashboard for context)

### Phase 2.3 - Attendance

Goal:
- Implement attendance tracking and visibility for students.

Inputs:
- Attendance model and schema (read-only for students)
- Attendance service for filtering by date/subject
- Attendance page component

Outputs:
- GET /api/v1/attendance endpoint functional
- Attendance summary and subject-wise breakdown visible
- Date range filtering working

Dependencies:
- Phase 2.1 (dashboard for context)

### Phase 2.4 - Fees

Goal:
- Implement fee tracking, invoices, and payment history visibility.

Inputs:
- Fee/invoice model and schema
- Payment ledger model
- Fees endpoints (summary, invoices, payments, reports)
- Fees page component

Outputs:
- GET /api/v1/fees/summary endpoint functional
- GET /api/v1/fees/invoices endpoint functional
- GET /api/v1/fees/payments endpoint functional
- GET /api/v1/fees/reports endpoint functional
- Fee status visible with payment history

Dependencies:
- Phase 2.1 (dashboard for context)

### Phase 2.5 - Notifications

Goal:
- Implement cross-module notification center with read-state tracking.

Inputs:
- Notification model and schema
- Notification read receipt tracking
- Notifications page component

Outputs:
- GET /api/v1/notifications endpoint functional
- PATCH /api/v1/notifications/:id/read endpoint functional
- PATCH /api/v1/notifications/read-all endpoint functional
- Notification list with read-state badges
- Unread counter in navigation

Dependencies:
- Phase 2.1–2.4 (all modules for context)

## Phase 3 - Stability and Production Hardening

Goal:
- Raise reliability, consistency, and deployment confidence.

Inputs:
- Test suites for all modules
- Security audit checklist
- Performance profiling data

Outputs:
- API validation and error taxonomy completion
- Security checks (CORS, cookie policies, token expiry enforcement)
- Performance pass for dashboard and key list pages
- Deployment-ready environment configurations
- Error handling consistent across all endpoints

Dependencies:
- Phase 2.5 (all modules complete)
