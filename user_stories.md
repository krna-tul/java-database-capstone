# User Stories — Smart Clinic Management System

These are planned functional requirements, not a claim that the starter application already implements them. Acceptance criteria make each story verifiable; story points are relative estimates.

## Admin User Stories

### A01 — Secure sign-in

**Title:** As a admin, I want to log into the portal with my username and password, so that I can manage the platform securely.

**Acceptance Criteria:**

1. Valid admin credentials open the admin dashboard.

2. Invalid credentials show a generic error without creating a session.

3. Unauthenticated users cannot access admin operations.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### A02 — Sign out

**Title:** As a admin, I want to log out of the portal, so that I can protect system access.

**Acceptance Criteria:**

1. Logout removes the active authentication state.

2. Protected pages require authentication after logout.

3. The user returns to the sign-in page.


**Priority:** High

**Story Points:** 2

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### A03 — Add doctors

**Title:** As a admin, I want to add a doctor to the portal, so that patients can book appointments with available clinicians.

**Acceptance Criteria:**

1. The form accepts name, specialization, contact details and availability.

2. Required fields and email format are validated.

3. A successfully saved doctor appears in the doctor list; duplicate email is rejected.


**Priority:** High

**Story Points:** 5

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### A04 — Remove doctors

**Title:** As a admin, I want to delete a doctor profile, so that the directory contains only active clinicians.

**Acceptance Criteria:**

1. Only an authenticated admin can request deletion.

2. The interface asks for confirmation before deleting.

3. Doctors with linked appointments cannot be deleted until those appointments are resolved; no orphaned records are created.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### A05 — Monthly appointment statistics

**Title:** As a admin, I want to run a stored procedure in the MySQL CLI to count appointments per month, so that I can track clinic usage.

**Acceptance Criteria:**

1. The procedure returns year, month and appointment count.

2. Appointments are grouped by both year and month and results are ordered chronologically.

3. An empty dataset returns no monthly rows, without an error.


**Priority:** Medium

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

## Patient User Stories

### P01 — Browse doctors

**Title:** As a patient, I want to view the doctor directory without logging in, so that I can explore options before registering.

**Acceptance Criteria:**

1. The public directory is accessible without authentication.

2. Each entry shows the doctor name and specialization.

3. Patient records and private appointment details are never shown in the public directory.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### P02 — Register an account

**Title:** As a patient, I want to sign up with my email and password, so that I can book appointments.

**Acceptance Criteria:**

1. Required profile details and valid email are checked.

2. An existing email cannot create another account.

3. Passwords are stored as secure hashes and never returned in responses.


**Priority:** High

**Story Points:** 5

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### P03 — Secure sign-in

**Title:** As a patient, I want to log into the portal, so that I can manage my bookings.

**Acceptance Criteria:**

1. Valid credentials authenticate the patient.

2. Invalid credentials produce a generic error.

3. The patient can access only their own bookings.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### P04 — Sign out

**Title:** As a patient, I want to log out of the portal, so that I can secure my account.

**Acceptance Criteria:**

1. Logout clears authentication state.

2. Protected booking actions require a fresh login.

3. The portal returns to the sign-in or public page.


**Priority:** High

**Story Points:** 2

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### P05 — Book an appointment

**Title:** As a patient, I want to book an hour-long appointment with a doctor after signing in, so that I can receive a consultation.

**Acceptance Criteria:**

1. The patient selects a doctor and an available future slot.

2. The server rejects overlapping bookings and unavailable slots.

3. A successful booking links the patient and doctor and displays its date and one-hour time range.


**Priority:** High

**Story Points:** 5

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### P06 — View upcoming appointments

**Title:** As a patient, I want to view my upcoming appointments, so that I can prepare for consultations.

**Acceptance Criteria:**

1. Only the signed-in patient's upcoming appointments appear.

2. Each appointment includes doctor, date, time and status.

3. Appointments appear chronologically, with a clear empty state when none exist.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

## Doctor User Stories

### D01 — Secure sign-in

**Title:** As a doctor, I want to log into the portal, so that I can manage my appointments.

**Acceptance Criteria:**

1. Valid doctor credentials open the doctor dashboard.

2. Invalid credentials produce a generic error.

3. Patient and admin credentials cannot authorize doctor-only actions.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### D02 — Sign out

**Title:** As a doctor, I want to log out of the portal, so that I can protect my data.

**Acceptance Criteria:**

1. Logout clears active authentication state.

2. Protected doctor pages require sign-in again.

3. Patient details are not available through unauthenticated requests after logout.


**Priority:** High

**Story Points:** 2

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### D03 — Appointment calendar

**Title:** As a doctor, I want to view my appointment calendar, so that I can organize my working day.

**Acceptance Criteria:**

1. Only appointments assigned to the signed-in doctor are shown.

2. Entries include time, patient and status.

3. The calendar supports selecting a date and shows an empty state when there are no appointments.


**Priority:** High

**Story Points:** 5

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### D04 — Manage unavailability

**Title:** As a doctor, I want to mark periods when I am unavailable, so that patients can book only available slots.

**Acceptance Criteria:**

1. A doctor can update their own availability.

2. Unavailable periods cannot receive new appointments.

3. Changes conflicting with existing appointments are rejected with an explanation until those appointments are resolved.


**Priority:** High

**Story Points:** 5

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### D05 — Update profile

**Title:** As a doctor, I want to update my specialization and contact information, so that patients have accurate information.

**Acceptance Criteria:**

1. The authenticated doctor can edit only their own profile.

2. Required fields and contact formats are validated.

3. Saved public profile changes appear in the directory without exposing credentials.


**Priority:** Medium

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

### D06 — Prepare for consultations

**Title:** As a doctor, I want to view patient details for my upcoming appointments, so that I can prepare for each consultation.

**Acceptance Criteria:**

1. The doctor can open the patient details associated with their appointment.

2. Access to patients unrelated to the doctor's appointments is denied.

3. Only relevant consultation details are displayed, and unauthenticated requests are denied.


**Priority:** High

**Story Points:** 3

**Notes:** Acceptance criteria describe the intended behavior for implementation and testing.

## Source

Based on the IBM Skills Network lab [Creating User Stories](https://cf-courses-data.static.labs.skills.network/C_pOTkosg5pVXlm8T0vjZA/user-stories-v1.md.html). Stories use its role/goal/benefit format, acceptance criteria, priority, estimates and notes.
