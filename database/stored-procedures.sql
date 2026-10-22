USE cms;
DROP PROCEDURE IF EXISTS GetDailyAppointmentReportByDoctor;
DROP PROCEDURE IF EXISTS GetDoctorWithMostPatientsByMonth;
DROP PROCEDURE IF EXISTS GetDoctorWithMostPatientsByYear;
DELIMITER $$
CREATE PROCEDURE GetDailyAppointmentReportByDoctor(IN report_date DATE)
BEGIN
 SELECT d.name AS doctor_name, a.appointment_time, a.status,
        p.name AS patient_name, p.phone AS patient_phone
 FROM appointment a
 JOIN doctor d ON a.doctor_id = d.id
 JOIN patient p ON a.patient_id = p.id
 WHERE a.appointment_time >= report_date
   AND a.appointment_time < report_date + INTERVAL 1 DAY
 ORDER BY d.name, a.appointment_time, a.id;
END$$
CREATE PROCEDURE GetDoctorWithMostPatientsByMonth(IN input_month INT, IN input_year INT)
BEGIN
 IF input_month NOT BETWEEN 1 AND 12 OR input_month IS NULL OR input_year IS NULL OR input_year NOT BETWEEN 1000 AND 9999 THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Provide a valid month (1-12) and year (1000-9999)';
 END IF;
 SELECT doctor_id, COUNT(patient_id) AS patients_seen
 FROM appointment
 WHERE MONTH(appointment_time) = input_month AND YEAR(appointment_time) = input_year
 GROUP BY doctor_id
 ORDER BY patients_seen DESC, doctor_id ASC LIMIT 1;
END$$
CREATE PROCEDURE GetDoctorWithMostPatientsByYear(IN input_year INT)
BEGIN
 IF input_year IS NULL OR input_year NOT BETWEEN 1000 AND 9999 THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Provide a valid year (1000-9999)';
 END IF;
 SELECT doctor_id, COUNT(patient_id) AS patients_seen
 FROM appointment WHERE YEAR(appointment_time) = input_year
 GROUP BY doctor_id
 ORDER BY patients_seen DESC, doctor_id ASC LIMIT 1;
END$$
DELIMITER ;
-- As in the IBM lab, patients_seen counts visits, not distinct patients.
-- Equal counts are resolved deterministically using the lowest doctor ID.
