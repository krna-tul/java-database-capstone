-- Initialize a dedicated cms exercise database; does not drop existing data.
CREATE DATABASE IF NOT EXISTS cms CHARACTER SET utf8mb4;
USE cms;
CREATE TABLE IF NOT EXISTS admin (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS doctor (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 specialty VARCHAR(50) NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 phone VARCHAR(10) NOT NULL
);
CREATE TABLE IF NOT EXISTS patient (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 phone VARCHAR(10) NOT NULL,
 address VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS doctor_available_times (
 doctor_id BIGINT NOT NULL,
 available_times VARCHAR(255) NOT NULL,
 CONSTRAINT fk_available_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);
CREATE TABLE IF NOT EXISTS appointment (
 id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 appointment_time DATETIME(6) NOT NULL,
 status INT NOT NULL,
 doctor_id BIGINT NOT NULL,
 patient_id BIGINT NOT NULL,
 CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id),
 CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES patient(id),
 CONSTRAINT ck_appointment_status CHECK (status IN (0,1)),
 INDEX idx_doctor_time (doctor_id,appointment_time),
 INDEX idx_patient_time (patient_id,appointment_time)
);
