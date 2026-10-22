# Smart Clinic Management System: Architecture

## Section 1: Architecture summary

The Smart Clinic application follows a three-tier design. The presentation tier provides server-rendered Thymeleaf dashboards for administrators and doctors, together with client interfaces that consume REST APIs for appointments, patient dashboards, and patient records. The application tier is a Spring Boot backend. MVC and REST controllers handle HTTP requests and delegate business rules and workflow coordination to services rather than accessing databases directly.

The data tier uses MySQL for structured Patient, Doctor, Appointment, and Admin records, and MongoDB for flexible prescription documents. Services access these stores through Spring Data JPA and Spring Data MongoDB repositories. JPA entities represent relational records; document models represent MongoDB records. Separating presentation, business rules, and persistence makes each responsibility easier to test and maintain. This document describes the intended course architecture; it does not claim that the application has already been implemented.

## Section 2: Numbered flow of data and control

1. **User interface:** An administrator or doctor opens a Thymeleaf dashboard, or a patient-facing client sends an HTTP request to an appointment or patient API.
2. **Controller routing:** Spring routes the request according to its path and HTTP method. An MVC controller prepares a view response, while a REST controller prepares an API response. Controllers validate request input and delegate application work.
3. **Service logic:** The service applies business rules and coordinates the operation, such as checking doctor availability before booking an appointment. It selects the required data-access operations.
4. **Repository access:** The service calls a Spring Data JPA repository for relational entities or a Spring Data MongoDB repository for prescription documents. Repositories isolate persistence details from business logic.
5. **Database operation:** The repository reads or writes the corresponding MySQL tables or MongoDB collection. MySQL maintains structured relationships, while MongoDB stores flexible prescription data.
6. **Mapping to application models:** Persistence frameworks map retrieved data to Java JPA entities or MongoDB document objects. The repositories return these objects to the service, which prepares the result for the controller.
7. **Response to the user:** For MVC, the controller supplies model attributes to Thymeleaf to render an HTML page. For REST, it returns an appropriate response DTO serialized as JSON. The HTTP response reaches the browser or API client, completing the request-response cycle.

Based on the IBM Skills Network lab, [Creating Architecture Design Document](https://cf-courses-data.static.labs.skills.network/6pEkqeCiMVj4Zm5Akn-hpw/architecture-v1.md.html).
