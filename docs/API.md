# API

## Index

- [Base Rules](#1-base-rules)
- [Auth Endpoints](#2-auth-endpoints)
  - [Student Auth](#student-auth)
  - [Faculty Auth](#faculty-auth)
- [Module Endpoints](#module-endpoints)
- [Theme Preference API](#25-theme-preference-api)
- [Request and Response Notes](#3-request-and-response-notes)
- [API Versioning Strategy](#4-api-versioning-strategy)

## 1. Base Rules

- Versioned base path: `/api/v1`
- JSON API format only
- Standard response contract from `STANDARDS.md`

## 2. Auth Endpoints

### Student Auth

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/change-password`
- `POST /api/v1/auth/signup` (optional, may be admin-restricted)
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

#### POST /api/v1/auth/login

Request body:
```json
{
  "email": "student@example.com",
  "password": "enrollment_number_or_password"
}
```

Response (normal login):
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "student@example.com",
      "role": "student",
      "enrollmentNumber": "ENR123"
    }
  },
  "message": "Login successful"
}
```

Error cases:
- 400 invalid email or password format
- 401 invalid credentials
- 500 auth service error

#### POST /api/v1/auth/change-password

Description: Allow user to change their password anytime. Can be used after login from the profile settings page.

Request body:
```json
{
  "currentPassword": "current_password_or_enrollment_number",
  "newPassword": "new_secure_password",
  "confirmPassword": "new_secure_password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "Password changed successfully"
  },
  "message": "Password updated successfully"
}
```

Error cases:
- 400 password validation failed or mismatch
- 401 current password incorrect
- 500 password change service error

#### POST /api/v1/auth/signup

Request body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "enrollmentNumber": "ENR123",
  "password": "secure_password",
  "program": "B.Tech CSE"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "enrollmentNumber": "ENR123",
      "role": "student"
    },
    "message": "Account created. Please login."
  },
  "message": "Signup successful"
}
```

Error cases:
- 400 validation failed
- 409 email or enrollment number already exists
- 500 signup service error

#### POST /api/v1/auth/logout

Request body: None

Response:
```json
{
  "success": true,
  "data": null,
  "message": "Logged out successfully"
}
```

#### GET /api/v1/auth/me

Request body: None

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "student@example.com",
      "role": "student",
      "enrollmentNumber": "ENR123"
    }
  },
  "message": "Current user fetched"
}
```

Error cases:
- 401 unauthorized (no valid token)
- 500 user fetch error

### Faculty Auth

- `POST /api/v1/faculty/login`
- `POST /api/v1/faculty/signup`
- `POST /api/v1/faculty/logout`
- `GET /api/v1/faculty/me`

#### POST /api/v1/faculty/login

Request body:
```json
{
  "email": "faculty@institution.edu",
  "password": "faculty_password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_with_faculty_role",
    "user": {
      "id": "faculty_id",
      "email": "faculty@institution.edu",
      "role": "faculty",
      "facultyId": "FAC123",
      "department": "Computer Science"
    }
  },
  "message": "Faculty login successful"
}
```

Error cases:
- 400 invalid email or password format
- 401 invalid credentials
- 403 faculty account not approved or inactive
- 500 faculty auth service error

#### POST /api/v1/faculty/signup

Request body:
```json
{
  "fullName": "Dr. Jane Smith",
  "email": "jane@institution.edu",
  "facultyId": "FAC123",
  "department": "Computer Science",
  "password": "secure_faculty_password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "faculty_id",
      "email": "jane@institution.edu",
      "facultyId": "FAC123"
    },
    "message": "Account created. Awaiting admin approval or ready to login."
  },
  "message": "Faculty signup successful"
}
```

Error cases:
- 400 validation failed
- 403 email domain not authorized for faculty
- 409 faculty ID or email already exists
- 500 faculty signup service error

#### POST /api/v1/faculty/logout

Request body: None

Response:
```json
{
  "success": true,
  "data": null,
  "message": "Faculty logged out successfully"
}
```

#### GET /api/v1/faculty/me

Request body: None

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "faculty_id",
      "email": "faculty@institution.edu",
      "role": "faculty",
      "facultyId": "FAC123",
      "department": "Computer Science"
    }
  },
  "message": "Current faculty fetched"
}
```

Error cases:
- 401 unauthorized (no valid faculty token)
- 500 faculty fetch error

## Module Endpoints

### Dashboard

- `GET /api/v1/dashboard/overview`

Request body:
- None

Response:
```json
{
	"success": true,
	"data": {
		"kpis": {},
		"upcoming": []
	},
	"message": "Dashboard overview fetched"
}
```

Error cases:
- 401 unauthorized session
- 500 dashboard aggregation failure

### Class Routine

- `GET /api/v1/class-routine`

Request body:
- None (query params: date, view)

Response:
```json
{
	"success": true,
	"data": {
		"slots": []
	},
	"message": "Class routine fetched"
}
```

Error cases:
- 400 invalid date format
- 404 routine not found
- 500 schedule fetch failure

### Examination

- `GET /api/v1/exams/schedule`
- `POST /api/v1/exams/form`

Request body:
- GET schedule: None (query params: term, semester)
- POST form:
```json
{
	"term": "mid-sem",
	"semester": 3,
	"subjectIds": ["sub1", "sub2"],
	"declarationAccepted": true
}
```

Response:
```json
{
	"success": true,
	"data": {
		"formId": "frm_001",
		"status": "submitted"
	},
	"message": "Exam form submitted"
}
```

Error cases:
- 400 missing declaration/subjects
- 409 exam form already submitted
- 500 exam module operation failed

### Contact Activity

- `GET /api/v1/contact-activity`

Request body:
- None (query params: status, channel)

Response:
```json
{
	"success": true,
	"data": {
		"activities": []
	},
	"message": "Contact activity fetched"
}
```

Error cases:
- 401 unauthorized
- 500 contact activity fetch error

### Subject Planner

- `GET /api/v1/subject-planner`
- `POST /api/v1/subject-planner`
- `PATCH /api/v1/subject-planner/:id`

Request body:
```json
{
	"subjectId": "sub1",
	"title": "Unit 3 Revision",
	"dueDate": "2026-05-10",
	"priority": "high"
}
```

Response:
```json
{
	"success": true,
	"data": {
		"plannerItem": {}
	},
	"message": "Planner item saved"
}
```

Error cases:
- 400 invalid dueDate/priority
- 404 planner item not found
- 500 planner save failure

### Attendance

- `GET /api/v1/attendance`
- `GET /api/v1/attendance/:id`

Request body:
- None (query params: from, to, subjectId)

Response:
```json
{
	"success": true,
	"data": {
		"summary": {},
		"records": []
	},
	"message": "Attendance fetched"
}
```

Error cases:
- 400 invalid date range
- 404 attendance records not found
- 500 attendance fetch failure

### Result

- `GET /api/v1/results`
- `GET /api/v1/results/:termId`

Request body:
- None (query params: semester)

Response:
```json
{
	"success": true,
	"data": {
		"grades": [],
		"gpa": {}
	},
	"message": "Result fetched"
}
```

Error cases:
- 404 result not published
- 500 result fetch error

### Fees Report

- `GET /api/v1/fees/summary`
- `GET /api/v1/fees/invoices`
- `GET /api/v1/fees/payments`
- `GET /api/v1/fees/reports`

Request body:
- None (query params: from, to, status)

Response:
```json
{
	"success": true,
	"data": {
		"reports": [],
		"totals": {}
	},
	"message": "Fees report fetched"
}
```

Error cases:
- 400 invalid report filter
- 404 no report data
- 500 fee report service error

### Student Section

- `GET /api/v1/student-section`
- `POST /api/v1/student-section/update-request`

Request body:
```json
{
	"field": "address",
	"requestedValue": "New Address",
	"reason": "Hostel transfer"
}
```

Response:
```json
{
	"success": true,
	"data": {
		"requestId": "upd_001"
	},
	"message": "Update request created"
}
```

Error cases:
- 400 invalid update request
- 403 restricted profile field
- 500 student section operation failed

### Notice

- `GET /api/v1/notices`
- `PATCH /api/v1/notices/:id/read`

Request body:
- PATCH read: None

Response:
```json
{
	"success": true,
	"data": {
		"noticeId": "ntc_001",
		"readAt": "2026-04-21T10:00:00.000Z"
	},
	"message": "Notice marked as read"
}
```

Error cases:
- 404 notice not found
- 500 notice update failed

### Assignments

- `GET /api/v1/assignments`
- `GET /api/v1/assignments/:id`
- `POST /api/v1/assignments/:id/submissions`

Request body:
```json
{
	"submissionLink": "https://...",
	"comments": "Final draft"
}
```

Response:
```json
{
	"success": true,
	"data": {
		"submissionId": "sub_001",
		"status": "submitted"
	},
	"message": "Assignment submitted"
}
```

Error cases:
- 400 missing submission payload
- 413 file too large (if upload mode used)
- 500 assignment submission failed

### Quiz

- `GET /api/v1/quiz`
- `GET /api/v1/quiz/:id`
- `POST /api/v1/quiz/:id/attempt`

Request body:
```json
{
	"answers": [
		{ "questionId": "q1", "option": "B" }
	]
}
```

Response:
```json
{
	"success": true,
	"data": {
		"attemptId": "att_001",
		"score": 8
	},
	"message": "Quiz submitted"
}
```

Error cases:
- 400 invalid answer payload
- 409 quiz already attempted (single attempt mode)
- 500 quiz attempt processing failed

### Feedback

- `POST /api/v1/feedback`
- `GET /api/v1/feedback`
- `GET /api/v1/feedback/resolved`
- `POST /api/v1/feedback/:id/rating`

Request body:
```json
{
	"category": "academic",
	"title": "Lab timing conflict",
	"description": "Please review lab schedule",
	"priority": "medium"
}
```

Rating request body:
```json
{
	"rating": 4,
	"comment": "Resolved well"
}
```

Response:
```json
{
	"success": true,
	"data": {
		"feedbackId": "fb_001",
		"status": "open"
	},
	"message": "Feedback submitted"
}
```

Error cases:
- 400 invalid feedback fields
- 404 feedback ticket not found
- 500 feedback service unavailable

### Downloads

- `GET /api/v1/downloads`
- `GET /api/v1/downloads/:id`

Request body:
- None

Response:
```json
{
	"success": true,
	"data": {
		"items": []
	},
	"message": "Downloads fetched"
}
```

Error cases:
- 403 document access denied
- 404 file not found
- 500 download link generation failed

### My Profile

- `GET /api/v1/profile`
- `PATCH /api/v1/profile`

Request body:
```json
{
	"phone": "9999999999",
	"address": "New Hostel Block",
	"preferences": {
		"theme": "dark"
	}
}
```

Response:
```json
{
	"success": true,
	"data": {
		"profile": {}
	},
	"message": "Profile updated"
}
```

Error cases:
- 400 invalid profile payload
- 403 restricted field update attempt
- 500 profile update failed

### Notifications

- `GET /api/v1/notifications`
- `PATCH /api/v1/notifications/:id/read`
- `PATCH /api/v1/notifications/read-all`

Request body:
- None

Response:
```json
{
	"success": true,
	"data": {
		"notifications": []
	},
	"message": "Notifications fetched"
}
```

Error cases:
- 404 notification not found
- 500 notification operation failed

### Calendar

- `GET /api/v1/calendar/events`

Request body:
- None (query params: from, to, type)

Response:
```json
{
	"success": true,
	"data": {
		"events": []
	},
	"message": "Calendar events fetched"
}
```

Error cases:
- 400 invalid date filter
- 500 calendar fetch failure

## 2.5 Theme Preference API

### PATCH /api/v1/profile/theme

Description:
- Updates the current user's theme preference.

Request:
```json
{
	"theme": "light" | "dark"
}
```

Response:
```json
{
	"success": true,
	"data": { "theme": "dark" },
	"message": "Theme updated"
}
```

Validation and behavior:
- Allowed values: `light`, `dark`
- 400 on invalid theme values
- 401 when unauthenticated
- Preference is persisted per user profile; client may also cache in localStorage for bootstrap fallback

## 3. Request and Response Notes

- Input validation is mandatory before controller logic.
- Unauthorized access must return 401 with standardized payload.
- Validation failures return 400 with field-level message detail in `message` and/or `data`.
- All module endpoints should provide loading-safe payload shapes (empty arrays/objects instead of missing keys).

## 4. API Versioning Strategy

- Keep `v1` stable.
- Breaking changes require `v2` route namespace.
- Non-breaking additions can remain in current version.
