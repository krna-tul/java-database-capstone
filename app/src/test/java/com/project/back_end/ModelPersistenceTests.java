package com.project.back_end;

import com.project.back_end.models.*;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import java.time.LocalDateTime;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class ModelPersistenceTests {
    @Autowired EntityManager entityManager;

    @Test void persistsRelationshipsAndDoctorAvailabilityWithoutComputedColumns() {
        Doctor doctor = ModelValidationTests.doctor(); Patient patient = ModelValidationTests.patient();
        Admin admin = new Admin(); admin.setUsername("admin"); admin.setPassword("DemoPassword");
        entityManager.persist(admin); entityManager.persist(doctor); entityManager.persist(patient);
        Appointment a = new Appointment(); a.setDoctor(doctor); a.setPatient(patient);
        a.setAppointmentTime(LocalDateTime.now().plusDays(3).withNano(0)); entityManager.persist(a);
        entityManager.flush(); Long id = a.getId(); entityManager.clear();
        Appointment loaded = entityManager.find(Appointment.class, id);
        assertThat(loaded.getDoctor().getAvailableTimes()).containsExactly("09:00-10:00");
        assertThat(loaded.getPatient().getEmail()).isEqualTo("patient@example.com");
        assertThat(loaded.getEndTime()).isEqualTo(loaded.getAppointmentTime().plusHours(1));
        assertThat(entityManager.createNativeQuery("select count(*) from doctor_available_times").getSingleResult().toString()).isEqualTo("1");
        assertThat(entityManager.createNativeQuery("select column_name from information_schema.columns where table_name = 'APPOINTMENT'").getResultList())
            .doesNotContain("END_TIME", "APPOINTMENT_DATE", "APPOINTMENT_TIME_ONLY");
    }
}
