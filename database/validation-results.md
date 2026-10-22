# Validation results — 22 October 2026

Checks were executed locally on this project's disposable databases. They do not establish that an IBM Cloud IDE instance was created.

| Check | Result |
| --- | --- |
| Java build and tests (Maven, Java 25, compilation target Java 17) | 9 tests; 0 failures, 0 errors, 0 skipped |
| Spring Boot startup against actual MySQL and MongoDB | Application started; Hibernate generated five tables in a separate empty validation database; MongoDB connection established |
| MySQL fixture counts | 1 admin, 25 doctors, 25 patients, 100 availability entries, 130 appointments |
| MySQL appointment foreign keys | 0 orphaned doctor or patient references |
| Daily report, 2025-04-15 | 3 rows |
| Highest monthly appointment count, April 2025 | doctor 2, 31 visits |
| Highest annual appointment count, 2025 | doctor 1, 34 visits |
| Empty report periods | empty result sets |
| Month 13 | rejected with SQLSTATE 45000 |
| MongoDB import/export | 24 documents imported and exported |
| Prescription links | all 24 appointment IDs exist, and patient names match their MySQL appointments |

The Java tests verify missing or malformed data, appointment relationships/status/future dates, optional prescription notes, dosage bounds, password write-only JSON behavior for all three user models, date rollover, persistence of availability and exclusion of calculated helper values from database columns.

Complete stored-procedure query output is in [procedure-output.txt](procedure-output.txt). Test cases and the reproducible database checks are committed alongside the implementation. The scaffold's service/controller work remains outside these four database exercises.
