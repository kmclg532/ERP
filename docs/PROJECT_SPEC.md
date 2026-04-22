# PROJECT_SPEC

## Index

- [PROJECT\_SPEC](#project_spec)
  - [Index](#index)
  - [1. ERP Overview](#1-erp-overview)
  - [2. Primary User Role](#2-primary-user-role)
  - [3. Core Pages and Purpose](#3-core-pages-and-purpose)
    - [3.1 Auth Pages](#31-auth-pages)
    - [3.2 Student ERP Module Definitions](#32-student-erp-module-definitions)
  - [4. Global Layout and Navigation](#4-global-layout-and-navigation)
  - [5. UI Theme Requirements](#5-ui-theme-requirements)
  - [5.1 Theme Toggle System](#51-theme-toggle-system)
      - [Location](#location)
      - [User Flow](#user-flow)
      - [UI Behavior](#ui-behavior)
      - [Button Actions](#button-actions)
      - [States](#states)
      - [Backend Reflection](#backend-reflection)
      - [CSS Variable Requirement](#css-variable-requirement)
  - [6. Feature Breakdown by Capability](#6-feature-breakdown-by-capability)
  - [7. Non-Functional Targets](#7-non-functional-targets)

## 1. ERP Overview

University ERP is a production-oriented platform to centralize student academic and administrative workflows.

Initial release focus: **Student Portal** with high clarity, predictable navigation, and minimal cognitive load.

Design goals:
- Professional and clean interface
- Scalable architecture
- Documentation-first implementation
- AI-friendly and consistency-driven development

## 2. Primary User Role

- Student

Future role expansion:
- Faculty
- Admin
- Finance
- Exam Cell

## 3. Core Pages and Purpose

### 3.1 Auth Pages

1. Student Login (/login)
- Purpose: Student authentication using email and password
- Sections: Branding, login form, help links, signup link
- Form fields:
  - Email (required, username)
  - Password (required, enrollment number on first login OR previously set password)
- Buttons: Login, Sign Up, Forgot Password
- Validation rules:
  - Email format validation
  - Password required (at least 6 chars)
- Button Actions:
  - Button: Login
  - API: POST /api/v1/auth/login
  - Payload: { email, password }
  - Response on success: { success, data: { token, user }, message }
- UI States:
  - Default: login form ready
  - Loading: submit button disabled
  - Error: error message below form
  - Success: redirect to /dashboard
- Backend Reflection:
  - Validates email exists and password matches
  - Creates JWT token with student role
  - Returns token for direct dashboard access
  - Access: student role only

2. Student Signup (/signup) [Optional, Admin-Controlled]
- Purpose: New student account registration (for flexibility, but real system creates accounts via admin)
- Note: In production, accounts are created by college/admin. Signup may be restricted by college policy.
- Sections: Registration form, college info disclaimer, terms
- Form fields:
  - Full Name (required)
  - Email (required, unique)
  - Enrollment Number (required, unique)
  - Password (required, min 8 chars, complexity rules)
  - Confirm Password (required)
  - College/Program (required dropdown)
  - Terms acceptance (required checkbox)
- Buttons: Sign Up, Already have account (login link)
- Button Actions:
  - Button: Sign Up
  - API: POST /api/v1/auth/signup
  - Payload: { fullName, email, enrollmentNumber, password, program }
  - Response: { success, data: { user, message: "Account created. Please login." } }
- Error cases:
  - 400 validation failure (weak password, email format, existing email/enrollment)
  - 409 enrollment number already exists
- Backend Reflection:
  - Creates new student record
  - Validates enrollment number format
  - Password can be changed anytime via profile
  - Access: public (may be restricted by admin config)

4. Faculty Login (/faculty/login)
- Purpose: Faculty member authentication
- Sections: Branding, login form, help links
- Form fields:
  - Email (required, faculty email)
  - Password (required)
- Buttons: Login, Faculty Signup, Forgot Password
- Button Actions:
  - Button: Login
  - API: POST /api/v1/faculty/login
  - Payload: { email, password }
  - Response: { success, data: { token, user: { role: "faculty", ...} }, message }
- UI States: loading, error, success
- Backend Reflection:
  - Validates faculty email and password
  - Returns token with faculty role claim
  - Creates JWT with role="faculty"
  - Access: faculty role only

5. Faculty Signup (/faculty/signup) [Admin-Controlled]
- Purpose: Faculty account registration (admin-initiated or restricted)
- Sections: Registration form, institution verification, admin approval note
- Form fields:
  - Full Name (required)
  - Email (required, unique, institution domain)
  - Faculty ID (required, unique)
  - Department (required dropdown)
  - Password (required, min 8 chars)
  - Confirm Password (required)
- Buttons: Sign Up, Admin Approval Notice
- Note: Signup may require admin approval or be restricted to specific email domains
- Button Actions:
  - Button: Sign Up
  - API: POST /api/v1/faculty/signup
  - Payload: { fullName, email, facultyId, department, password }
  - Response: { success, data: { message: "Account created. Awaiting admin approval or ready to login." } }
- Backend Reflection:
  - Creates faculty record with verified = false (if admin approval required)
  - Validates faculty email domain
  - Returns pending approval message
  - Access: restricted or admin-only

### 3.2 Student ERP Module Definitions

All modules below follow a mandatory structure:
- Page definition (purpose + route)
- Sections inside page
- User flow
- Button actions with endpoint contracts
- UI states
- Backend reflection (DB impact + access role)

1. Dashboard
- Page Definition:
  - Purpose: Student productivity snapshot with critical academic and financial status
  - Route: /dashboard
- Sections Inside Page:
  - Welcome panel
  - KPI cards (attendance, pending assignments, unpaid fees, unread notices)
  - Upcoming schedule widget
  - Quick action panel
- User Flow:
  - User opens Dashboard
  - Summary metrics load from multiple APIs
  - User selects a quick action card
  - Target module opens with preserved filter context
- Button Actions:
  - Button: Refresh Overview
  - API: /api/v1/dashboard/overview
  - Method: GET
  - Payload: none
  - Response: { success, data: { kpis, upcoming }, message }
  - UI update: KPI cards and timeline re-render
- UI States:
  - Loading: skeleton cards and timeline placeholders
  - Empty: no events/alerts message with shortcut actions
  - Error: inline retry banner
  - Success: updated KPIs and widgets
- Backend Reflection:
  - DB changes: read-only aggregation from attendance, assignments, fees, notices
  - Access: student, faculty, admin (role-scoped data view)

2. Class Routine
- Page Definition:
  - Purpose: View class schedule by day/week
  - Route: /class-routine
- Sections Inside Page:
  - Day/Week switcher
  - Routine table
  - Subject/faculty details panel
- User Flow:
  - User clicks Class Routine
  - Routine loads for current date
  - User changes day/week view
  - Updated routine data is fetched
- Button Actions:
  - Button: Change View
  - API: /api/v1/class-routine
  - Method: GET
  - Payload: query { date, view }
  - Response: { success, data: { slots }, message }
  - UI update: routine grid refreshes
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read-only from routine collection
  - Access: student, faculty, admin

3. Examination - Exam Schedule
- Page Definition:
  - Purpose: Show scheduled examinations
  - Route: /exam/schedule
- Sections Inside Page:
  - Term filter
  - Exam schedule table
  - Detail drawer
- User Flow:
  - User opens exam schedule
  - Selects semester/term
  - Table updates with filtered exams
- Button Actions:
  - Button: Load Schedule
  - API: /api/v1/exams/schedule
  - Method: GET
  - Payload: query { term, semester }
  - Response: { success, data: { exams }, message }
  - UI update: schedule table and detail drawer data
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read-only from exam schedule collection
  - Access: student, faculty, admin

4. Examination - Exam Form
- Page Definition:
  - Purpose: Submit exam form for eligible subjects
  - Route: /exam/form
- Sections Inside Page:
  - Eligibility summary
  - Subject checklist
  - Declaration and submit block
- User Flow:
  - User opens exam form
  - Selects subjects
  - Confirms declaration
  - Form submission status appears
- Button Actions:
  - Button: Submit Exam Form
  - API: /api/v1/exams/form
  - Method: POST
  - Payload: { term, semester, subjectIds, declarationAccepted }
  - Response: { success, data: { formId, status }, message }
  - UI update: confirmation card and submitted status badge
- UI States: loading, empty (no eligible exams), error, success
- Backend Reflection:
  - DB changes: insert/update exam_forms record
  - Access: student (submit), faculty/admin (review)

5. Contact Activity
- Page Definition:
  - Purpose: View and manage student support communication activities
  - Route: /contact-activity
- Sections Inside Page:
  - Activity timeline
  - Contact request list
  - Status filter
- User Flow:
  - User opens Contact Activity
  - Activity logs load
  - User filters by status/channel
- Button Actions:
  - Button: Refresh Activity
  - API: /api/v1/contact-activity
  - Method: GET
  - Payload: query { status, channel }
  - Response: { success, data: { activities }, message }
  - UI update: timeline/list refresh
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read-only for students; status updates by support/admin
  - Access: student, admin

6. Subject Planner
- Page Definition:
  - Purpose: Plan study priorities by subject and due dates
  - Route: /subject-planner
- Sections Inside Page:
  - Subject progress cards
  - Planner list/calendar
  - Priority editor
- User Flow:
  - User opens Subject Planner
  - Adds or updates a study plan item
  - Planner view updates by date/priority
- Button Actions:
  - Button: Save Plan Item
  - API: /api/v1/subject-planner
  - Method: POST
  - Payload: { subjectId, title, dueDate, priority }
  - Response: { success, data: { plannerItem }, message }
  - UI update: planner list/card inserted or updated
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: insert/update planner_items
  - Access: student (own data), faculty/admin (advisory read)

7. Attendance
- Page Definition:
  - Purpose: Track attendance percentage and daily records
  - Route: /attendance
- Sections Inside Page:
  - Attendance summary cards
  - Date range filter
  - Subject-wise attendance table
- User Flow:
  - User clicks Attendance
  - Attendance page loads
  - User selects date range
  - Data fetched from API and table updates
- Button Actions:
  - Button: Apply Filter
  - API: /api/v1/attendance
  - Method: GET
  - Payload: query { from, to, subjectId }
  - Response: { success, data: { summary, records }, message }
  - UI update: summary cards and records table refresh
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read-only for student view; faculty/admin write attendance entries
  - Access: student, faculty, admin

8. Result
- Page Definition:
  - Purpose: Show exam results, grades, and GPA trends
  - Route: /result
- Sections Inside Page:
  - Term selector
  - Grade table
  - GPA trend chart
- User Flow:
  - User opens Result page
  - Selects term
  - Grades and metrics load
- Button Actions:
  - Button: View Result
  - API: /api/v1/results
  - Method: GET
  - Payload: query { term, semester }
  - Response: { success, data: { grades, gpa }, message }
  - UI update: table and chart rerender
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read-only result access for student
  - Access: student, faculty, admin

9. Fees Report
- Page Definition:
  - Purpose: Detailed financial statement and report download view
  - Route: /fees-report
- Sections Inside Page:
  - Fee status summary
  - Transaction report table
  - Export/download actions
- User Flow:
  - User opens Fees Report
  - Filters transaction period
  - Report list updates
- Button Actions:
  - Button: Fetch Report
  - API: /api/v1/fees/reports
  - Method: GET
  - Payload: query { from, to, status }
  - Response: { success, data: { reports, totals }, message }
  - UI update: report table and totals cards
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read-only reporting from fee ledgers
  - Access: student (own), admin/finance (all)

10. Student Section
- Page Definition:
  - Purpose: Manage student-centric academic and identity records
  - Route: /student-section
- Sections Inside Page:
  - Academic profile snapshot
  - Enrollment details
  - Program metadata
- User Flow:
  - User opens Student Section
  - Profile and enrollment data loads
  - User can request updates where allowed
- Button Actions:
  - Button: Request Update
  - API: /api/v1/student-section/update-request
  - Method: POST
  - Payload: { field, reason, requestedValue }
  - Response: { success, data: { requestId }, message }
  - UI update: request appears in status timeline
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: insert update_requests; no direct protected profile overwrite
  - Access: student (self), admin (approval)

11. Notice
- Page Definition:
  - Purpose: Academic and administrative notice board
  - Route: /notice
- Sections Inside Page:
  - Notice category tabs
  - Notice list
  - Notice detail panel
- User Flow:
  - User opens Notice page
  - Notices load by latest priority
  - User opens detail and marks read
- Button Actions:
  - Button: Mark as Read
  - API: /api/v1/notices/:id/read
  - Method: PATCH
  - Payload: none
  - Response: { success, data: { noticeId, readAt }, message }
  - UI update: item read status and unread counter update
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: read receipts in notice_reads mapping
  - Access: student, faculty, admin

12. Assignment
- Page Definition:
  - Purpose: Assignment listing, submission, and grading status
  - Route: /assignment
- Sections Inside Page:
  - Assignment filters
  - Assignment table/cards
  - Submission panel
- User Flow:
  - User opens Assignment page
  - Filters by subject/status
  - Submits assignment and sees status update
- Button Actions:
  - Button: Submit Assignment
  - API: /api/v1/assignments/:id/submissions
  - Method: POST
  - Payload: { submissionLink, comments }
  - Response: { success, data: { submissionId, status }, message }
  - UI update: status badge switches to submitted
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: insert assignment_submissions
  - Access: student (submit own), faculty/admin (review)

13. Quiz
- Page Definition:
  - Purpose: Attempt quizzes and view score history
  - Route: /quiz
- Sections Inside Page:
  - Quiz list
  - Attempt interface
  - Score/history panel
- User Flow:
  - User opens Quiz page
  - Starts an available quiz
  - Submits answers and receives score
- Button Actions:
  - Button: Submit Quiz
  - API: /api/v1/quiz/:id/attempt
  - Method: POST
  - Payload: { answers }
  - Response: { success, data: { score, attemptId }, message }
  - UI update: score card and history list refresh
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: insert quiz_attempts
  - Access: student, faculty/admin (analytics)

14. Feedback
- Page Definition:
  - Purpose: Submit issue/experience feedback to institution
  - Route: /feedback
- Sections Inside Page:
  - Feedback form
  - Submitted feedback list
  - Status chips
- User Flow:
  - User opens Feedback page
  - Submits feedback form
  - Sees created ticket in list
- Button Actions:
  - Button: Submit Feedback
  - API: /api/v1/feedback
  - Method: POST
  - Payload: { category, title, description, priority }
  - Response: { success, data: { feedbackId, status }, message }
  - UI update: new feedback row appears
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: insert feedback tickets
  - Access: student (create/read own), admin (manage)

15. Resolved Feedback
- Page Definition:
  - Purpose: Display resolved feedback history and closure notes
  - Route: /feedback/resolved
- Sections Inside Page:
  - Resolved list
  - Resolution detail view
  - Rating/reopen controls
- User Flow:
  - User opens Resolved Feedback
  - Views closure notes
  - Optionally rates resolution
- Button Actions:
  - Button: Rate Resolution
  - API: /api/v1/feedback/:id/rating
  - Method: POST
  - Payload: { rating, comment }
  - Response: { success, data: { ratingId }, message }
  - UI update: rating badge and history updated
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: insert/update feedback_resolution_ratings
  - Access: student (own resolved items), admin (all)

16. Downloads
- Page Definition:
  - Purpose: Access downloadable academic and administrative resources
  - Route: /downloads
- Sections Inside Page:
  - Category filters
  - Download file list
  - Download history panel
- User Flow:
  - User opens Downloads
  - Filters by document type
  - Downloads required file
- Button Actions:
  - Button: Download File
  - API: /api/v1/downloads/:id
  - Method: GET
  - Payload: none
  - Response: file stream or signed URL metadata in data
  - UI update: download history and last downloaded timestamp
- UI States: loading, empty, error, success
- Backend Reflection:
  - DB changes: optional audit log insert for download events
  - Access: student, faculty, admin (role-filtered assets)

17. My Profile
- Page Definition:
  - Purpose: View and maintain personal profile details and security settings
  - Route: /my-profile
- Sections Inside Page:
  - Personal details form
  - Contact details form
  - Security/preferences section (includes change password)
- User Flow:
  - User opens My Profile
  - Edits allowed fields (phone, address, preferences)
  - Optionally changes password from security section
  - Saves updates and sees confirmation
- Button Actions (Profile Update):
  - Button: Save Profile
  - API: /api/v1/profile
  - Method: PATCH
  - Payload: { phone, address, preferences }
  - Response: { success, data: { profile }, message }
  - UI update: profile panel updates with saved values
- Change Password Feature:
  - Sections: Password change form in security settings
  - Form fields:
    - Current Password (required)
    - New Password (required, min 8 chars)
    - Confirm Password (required, must match)
  - Buttons: Update Password
  - Button Actions:
    - Button: Update Password
    - API: POST /api/v1/auth/change-password
    - Payload: { currentPassword, newPassword, confirmPassword }
    - Response: { success, data: { message }, message: "Password updated successfully" }
  - Validation rules:
    - New password must be different from current
    - Password must meet complexity rules (min 8 chars)
    - Confirm password must match new password
  - Error cases:
    - 400 validation failed (weak password, mismatch)
    - 401 current password incorrect
    - 500 password change service error
  - UI States: default, loading, error, success
- UI States: loading, empty (not expected), error, success
- Backend Reflection:
  - DB changes: update student profile record with audit metadata
  - Password changes update password hash in DB
  - Access: student (self), admin (moderated edit)

## 4. Global Layout and Navigation

- Left Sidebar (persistent)
  - Module links, active state, collapse support
- Top Navbar
  - Page title, theme toggle, user menu, quick search (future)
- Main Content Area
  - Consistent spacing and responsive containers

## 5. UI Theme Requirements

- Primary color: `#3EA1E4`
- Light mode default + dark mode support
- CSS variables only (no hardcoded colors)
- Typography and spacing scale must be consistent
- SaaS-grade visual quality

## 5.1 Theme Toggle System

#### Location

- Toggle available in Top Navbar (right side, near profile/user menu)

#### User Flow

1. User clicks theme toggle button.
2. Theme switches instantly (light <-> dark).
3. Preference is saved.
4. On next login, the same theme is applied.

#### UI Behavior

- No page reload required.
- Entire app reflects new theme state.
- Smooth transition is recommended for better UX.

#### Button Actions

- Button: Toggle Theme
- Action:
  - Updates global UI theme state.
  - Saves preference to persistence layer.

#### States

- Default: Light mode
- Active: Dark mode enabled
- Persisted: Based on saved preference

#### Backend Reflection

- Preferred storage (authenticated): user profile field (for example, `themePreference`).
- Fallback storage (unauthenticated/offline bootstrap): localStorage key `userTheme`.
- On app bootstrap/login, profile value takes precedence over localStorage fallback.

#### CSS Variable Requirement

- Theme application must be variable-driven (for example, `:root[data-theme="light"]` and `:root[data-theme="dark"]`).
- No hardcoded component-level color values.

## 6. Feature Breakdown by Capability

1. Authentication
- JWT auth
- Google OAuth
- Secure token lifecycle

2. Student Productivity
- Assignment tracking and submissions
- Calendar reminders
- Notices and notifications

3. Financial Tracking
- Fee status and history
- Invoice visibility

4. Academic Visibility
- Attendance and results
- Exam schedules

5. Profile and Feedback
- Student profile management
- Feedback submission and tracking

## 7. Non-Functional Targets

- Predictable API contracts
- Reusable UI components
- Versioned routes (`/api/v1/...`)
- Strong error handling
- Env-driven configuration
- Production deployment readiness


