# FEATURES

## Index

- [Student Portal Feature Set](#student-portal-feature-set-expanded)
  - [Theme System](#theme-system)
- [Cross-Cutting Features](#cross-cutting-features)

## Student Portal Feature Set (Expanded)

### Authentication
- Description: Student email+password login with enrollment-based initial password. Faculty authentication with role-based access control. Optional password changes available from profile settings.
- Related pages: /login, /signup, /faculty/login, /faculty/signup, /my-profile
- Related APIs: POST /api/v1/auth/login, POST /api/v1/auth/change-password, POST /api/v1/auth/signup, POST /api/v1/faculty/login, POST /api/v1/faculty/signup
- Features:
  - Student login with email and enrollment number (first login)
  - User-initiated optional password change from profile
  - Student signup (optional, may be admin-controlled)
  - Faculty login with email and password
  - Faculty signup (admin-controlled with verification)
  - Role-based access control (student vs faculty)
  - JWT token with role claims
  - HttpOnly cookie-based session

### Theme System
- Description: Global light/dark theming system with user-controlled navbar toggle and persistent preference.
- Related pages: Global layout shell (all authenticated pages), `/my-profile`
- Related APIs: `PATCH /api/v1/profile/theme`
- Features:
  - Light mode default
  - Dark mode support
  - User toggle in top navbar
  - Persistent preference per user
  - CSS variable-based theming
  - Entire app updates without page reload
  - Optional smooth transition between modes

1. Dashboard
- Description: Consolidated academic/financial overview with quick actions
- Related pages: /dashboard
- Related APIs: GET /api/v1/dashboard/overview

2. Class Routine
- Description: Timetable visibility by day/week with class slot details
- Related pages: /class-routine
- Related APIs: GET /api/v1/class-routine

3. Examination
- Description: Exam schedule visibility and exam form submission workflow
- Related pages: /exam/schedule, /exam/form
- Related APIs: GET /api/v1/exams/schedule, POST /api/v1/exams/form

4. Contact Activity
- Description: Communication history and support interaction timeline
- Related pages: /contact-activity
- Related APIs: GET /api/v1/contact-activity

5. Subject Planner
- Description: Subject-level planning with due-date and priority tracking
- Related pages: /subject-planner
- Related APIs: GET /api/v1/subject-planner, POST /api/v1/subject-planner, PATCH /api/v1/subject-planner/:id

6. Attendance
- Description: Attendance summary and subject/date-wise records
- Related pages: /attendance
- Related APIs: GET /api/v1/attendance, GET /api/v1/attendance/:id

7. Result
- Description: Published grades, term-wise result sheets, and GPA trends
- Related pages: /result
- Related APIs: GET /api/v1/results, GET /api/v1/results/:termId

8. Fees Report
- Description: Financial report view with summary, invoices, and payment history
- Related pages: /fees-report
- Related APIs: GET /api/v1/fees/summary, GET /api/v1/fees/invoices, GET /api/v1/fees/payments, GET /api/v1/fees/reports

9. Student Section
- Description: Student profile and enrollment metadata with controlled update requests
- Related pages: /student-section
- Related APIs: GET /api/v1/student-section, POST /api/v1/student-section/update-request

10. Notice
- Description: Institutional noticeboard with read-state tracking
- Related pages: /notice
- Related APIs: GET /api/v1/notices, PATCH /api/v1/notices/:id/read

11. Assignment
- Description: Assignment tracking, submission, and submission state monitoring
- Related pages: /assignment
- Related APIs: GET /api/v1/assignments, GET /api/v1/assignments/:id, POST /api/v1/assignments/:id/submissions

12. Quiz
- Description: Quiz listing, attempt flow, and score history
- Related pages: /quiz
- Related APIs: GET /api/v1/quiz, GET /api/v1/quiz/:id, POST /api/v1/quiz/:id/attempt

13. Feedback
- Description: Issue/experience feedback submission and ticket tracking
- Related pages: /feedback
- Related APIs: POST /api/v1/feedback, GET /api/v1/feedback

14. Resolved Feedback
- Description: Resolved feedback archive with resolution rating
- Related pages: /feedback/resolved
- Related APIs: GET /api/v1/feedback/resolved, POST /api/v1/feedback/:id/rating

15. Downloads
- Description: Access downloadable circulars, forms, and study documents
- Related pages: /downloads
- Related APIs: GET /api/v1/downloads, GET /api/v1/downloads/:id

16. My Profile
- Description: Student personal/contact/profile preference management
- Related pages: /my-profile
- Related APIs: GET /api/v1/profile, PATCH /api/v1/profile

17. Notifications
- Description: Cross-module unread/read alert center
- Related pages: /notifications
- Related APIs: GET /api/v1/notifications, PATCH /api/v1/notifications/:id/read, PATCH /api/v1/notifications/read-all

18. Academic Calendar
- Description: Event calendar with type-based and date-range filtering
- Related pages: /calendar
- Related APIs: GET /api/v1/calendar/events

## Cross-Cutting Features

- Authentication with JWT and Google OAuth
- Protected routes and session checks
- Theme system with light/dark support
- Responsive dashboard shell with sidebar + top navbar
