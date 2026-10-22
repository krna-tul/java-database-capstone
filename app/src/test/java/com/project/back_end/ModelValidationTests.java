package com.project.back_end;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.back_end.models.*;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
import static org.assertj.core.api.Assertions.assertThat;

class ModelValidationTests {
    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    private Set<String> invalidFields(Object bean) {
        return validator.validate(bean).stream().map(v -> v.getPropertyPath().toString()).collect(Collectors.toSet());
    }

    static Doctor doctor() {
        Doctor d = new Doctor(); d.setName("Dr. Example"); d.setSpecialty("Cardiology");
        d.setEmail("doctor@example.com"); d.setPassword("DemoPassword123"); d.setPhone("5551234567");
        d.setAvailableTimes(java.util.List.of("09:00-10:00")); return d;
    }

    static Patient patient() {
        Patient p = new Patient(); p.setName("Example Patient"); p.setEmail("patient@example.com");
        p.setPassword("DemoPassword123"); p.setPhone("8881234567"); p.setAddress("123 Example Street"); return p;
    }

    @Test void rejectsMissingAdminCredentials() {
        assertThat(invalidFields(new Admin())).contains("username", "password");
    }

    @Test void acceptsValidDoctorAndPatient() {
        assertThat(invalidFields(doctor())).isEmpty(); assertThat(invalidFields(patient())).isEmpty();
    }

    @Test void rejectsMalformedDoctorAndPatientData() {
        Doctor d = doctor(); d.setName("ab"); d.setSpecialty("ab"); d.setEmail("bad");
        d.setPassword("short"); d.setPhone("555-123-4567");
        assertThat(invalidFields(d)).contains("name", "specialty", "email", "password", "phone");
        Patient p = patient(); p.setAddress("x".repeat(256)); p.setPhone("123"); p.setEmail("");
        assertThat(invalidFields(p)).contains("address", "phone", "email");
    }

    @Test void appointmentRequiresRelationshipsFutureTimeAndKnownStatus() {
        Appointment a = new Appointment();
        assertThat(invalidFields(a)).contains("doctor", "patient", "appointmentTime");
        a.setDoctor(doctor()); a.setPatient(patient()); a.setAppointmentTime(LocalDateTime.now().plusDays(2));
        assertThat(invalidFields(a)).isEmpty();
        a.setAppointmentTime(LocalDateTime.now().minusDays(1)); a.setStatus(2);
        assertThat(invalidFields(a)).contains("appointmentTime", "status");
    }

    @Test void appointmentHelpersHandleMidnightAndUnsetTime() {
        Appointment a = new Appointment(); assertThat(a.getEndTime()).isNull();
        assertThat(a.getAppointmentDate()).isNull(); assertThat(a.getAppointmentTimeOnly()).isNull();
        LocalDateTime time = LocalDateTime.of(2030, 12, 31, 23, 30); a.setAppointmentTime(time);
        assertThat(a.getEndTime()).isEqualTo(LocalDateTime.of(2031, 1, 1, 0, 30));
        assertThat(a.getAppointmentDate()).isEqualTo(time.toLocalDate());
        assertThat(a.getAppointmentTimeOnly()).isEqualTo(time.toLocalTime());
    }

    @Test void prescriptionAllowsOptionalNotesAndValidatesLengthAndReference() {
        Prescription p = new Prescription("Example Patient", "Demo medication", "Demo dosage", null, 1L);
        assertThat(invalidFields(p)).isEmpty(); p.setDoctorNotes("x".repeat(201)); p.setDosage("ab"); p.setAppointmentId(0L);
        assertThat(invalidFields(p)).contains("doctorNotes", "dosage", "appointmentId");
        p.setPatientName(null); p.setMedication("ab");
        assertThat(invalidFields(p)).contains("patientName", "medication");
    }

    @Test void passwordsAreAcceptedButNeverSerialized() throws Exception {
        ObjectMapper mapper = new ObjectMapper(); Admin a = new Admin(); a.setUsername("admin"); a.setPassword("DemoPassword");
        for (Object person : java.util.List.of(a, doctor(), patient())) {
            assertThat(mapper.readTree(mapper.writeValueAsString(person)).has("password")).isFalse();
        }
        assertThat(mapper.readValue("{\"password\":\"DemoPassword\"}", Admin.class).getPassword()).isEqualTo("DemoPassword");
        assertThat(mapper.readValue("{\"password\":\"DemoPassword\"}", Doctor.class).getPassword()).isEqualTo("DemoPassword");
        assertThat(mapper.readValue("{\"password\":\"DemoPassword\"}", Patient.class).getPassword()).isEqualTo("DemoPassword");
    }
}
