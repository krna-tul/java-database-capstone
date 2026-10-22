# Database exercises

These files implement the IBM clinic schema, sample-data and reporting exercises. All fixtures are fictional. They retain historical April/May 2025 appointments to match the reporting dates, and normalize phone numbers to the models' required 10 digits. The sample passwords are intentionally fake classroom values; authentication still needs secure password hashing when the services are implemented.

## Reproduce

Use an empty, disposable MySQL database. The schema script creates `cms` without dropping existing data; the fixture script must be loaded only once because it has explicit IDs. Configure the MySQL client's connection normally (host/port/user and an interactive password prompt or local client configuration). Do not commit database credentials.

```sh
mysql < database/schema.sql
mysql < database/sample-data.sql
mysql < database/stored-procedures.sql
mysql --table --verbose < database/report-calls.sql
```

Alternatively, run the model application against an empty `cms` database with `spring.jpa.hibernate.ddl-auto=update` before inserting fixtures; Hibernate generates the five tables. Override the starter's placeholder datasource and MongoDB settings with your lab connection details. Do not use `ddl-auto=create` against a database containing work you want to retain.

For MongoDB, either run the JavaScript fixture with `mongosh`, or import the equivalent JSON with the database tools:

```sh
mongosh --file database/sample-prescriptions.js
# Alternative:
mongoimport --db prescriptions --collection prescriptions --file database/prescriptions.json --jsonArray --mode upsert
```

The MongoDB fixtures upsert only documents with the fixed `demo-rx-*` IDs, so rerunning does not duplicate them. The JSON and JavaScript contain identical records. The collection is flat because it follows the Java `Prescription` model. MySQL enforces its foreign keys; cross-database prescription references require service validation.

## Reports

The three required procedures are in `stored-procedures.sql`. `procedure-output.txt` contains complete output from actual executions with this dataset:

- Daily report for `2025-04-15`: three appointments, ordered by doctor and time.
- April 2025: doctor `2`, `31` visits.
- Year 2025: doctor `1`, `34` visits.

As in the lab, `patients_seen` counts appointment visits, including repeat visits, rather than distinct people. Ties are resolved by the lowest doctor ID. The monthly procedure rejects invalid months. Periods without appointments return an empty result.

## Verification

Run Java checks from the application directory with `mvn test`. These cover validation, password JSON serialization, date/time helpers, JPA persistence and application context startup, using an isolated H2 test database.

To check loaded MySQL fixtures and procedures:

```sh
MYSQL_HOST=127.0.0.1 MYSQL_PORT=3306 MYSQL_USER=root python3 database/verify.py
```

To additionally verify MongoDB data and cross-database links:

```sh
mongoexport --db prescriptions --collection prescriptions --jsonArray --out /tmp/clinic-prescriptions.json
MONGO_EXPORT=/tmp/clinic-prescriptions.json python3 database/verify.py
```

The MySQL client supports `MYSQL_PWD` for local automated checks. Avoid putting real passwords in command history or source files. See [validation-results.md](validation-results.md) for the actual checks performed.

## Sources

- [IBM sample-data lab](https://cf-courses-data.static.labs.skills.network/JohGgubDp4tcw0FfPjxIAQ/database-sample-data-v1.md.html)
- [IBM stored-procedures lab](https://cf-courses-data.static.labs.skills.network/MffBvNn8EVlrvyi15Prb3g/stored-procedures-v1.md.html)
- [IBM model lab](https://cf-courses-data.static.labs.skills.network/TZrjF1suyfZwMzGSm21m2Q/models-v1.md.html)
