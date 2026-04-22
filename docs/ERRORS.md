# ERRORS

## Index

- [Error Handling Goals](#error-handling-goals)
- [Standard Error Response](#standard-error-response)
- [Error Categories](#error-categories)
- [Logging Guidance](#logging-guidance)
- [Module Error Examples](#module-error-examples)

## Error Handling Goals

- Consistent API error shape
- Clear actionable messages
- Separation of user-safe errors and internal diagnostics

## Standard Error Response

```json
{
  "success": false,
  "data": null,
  "message": "Validation failed",
  "error": "Detailed error code or message"
}
```

## Error Categories

1. Validation Errors (400)
- Missing required fields
- Invalid data format

2. Authentication Errors (401)
- Missing/invalid token
- Expired session

3. Authorization Errors (403)
- Access to restricted resource

4. Not Found (404)
- Route/resource not available

5. Conflict (409)
- Duplicate constraints (for example email or student ID)

6. Server Errors (500)
- Unexpected failures

## Logging Guidance

- Log internal stack traces on server side only.
- Never expose sensitive internals to API consumers.
- Add correlation/request IDs in future hardening phase.

## Module Error Examples

1. Attendance fetch fail
- Module: Attendance
- Page: /attendance
- Endpoint: GET /api/v1/attendance
- Error: 500 Internal Server Error - attendance service timeout
- Fix: Retry with bounded timeout; verify DB index and attendance query filters

2. Assignment upload fail
- Module: Assignment
- Page: /assignment
- Endpoint: POST /api/v1/assignments/:id/submissions
- Error: 413 Payload Too Large or 400 invalid submission payload
- Fix: Enforce file/link validation and max size limits on client and server

3. Fee fetch error
- Module: Fees Report
- Page: /fees-report
- Endpoint: GET /api/v1/fees/reports
- Error: 404 no fee records for filter or 500 report aggregation failure
- Fix: Validate filter defaults; return empty-safe payload; check fee ledger aggregation pipeline

4. Exam form conflict
- Module: Examination
- Page: /exam/form
- Endpoint: POST /api/v1/exams/form
- Error: 409 duplicate exam form submission
- Fix: Add unique form guard by studentId + term + semester

5. Feedback resolution rating fail
- Module: Resolved Feedback
- Page: /feedback/resolved
- Endpoint: POST /api/v1/feedback/:id/rating
- Error: 403 rating not allowed for unresolved ticket
- Fix: Validate ticket status before accepting rating submission
