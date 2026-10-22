"""Verify loaded fixtures and stored procedures against a disposable MySQL database.
MYSQL_BIN may be an absolute path. MYSQL_PWD is supported by the MySQL client.
"""
import json
import os
from pathlib import Path
import subprocess

client = [os.environ.get('MYSQL_BIN', 'mysql'), '--protocol=TCP',
          '-h' + os.environ.get('MYSQL_HOST', '127.0.0.1'),
          '-P' + os.environ.get('MYSQL_PORT', '3306'),
          '-u' + os.environ.get('MYSQL_USER', 'root'), '-N', '-B', 'cms']

def query(sql):
    return subprocess.check_output(client + ['-e', sql], text=True).strip()

for table, expected in [('admin', 1), ('doctor', 25), ('patient', 25), ('doctor_available_times', 100), ('appointment', 130)]:
    assert query(f'SELECT COUNT(*) FROM {table}') == str(expected), table
assert query('SELECT COUNT(*) FROM appointment a LEFT JOIN doctor d ON a.doctor_id=d.id LEFT JOIN patient p ON a.patient_id=p.id WHERE d.id IS NULL OR p.id IS NULL') == '0'
assert query('CALL GetDoctorWithMostPatientsByMonth(4,2025)') == '2\t31'
assert query('CALL GetDoctorWithMostPatientsByYear(2025)') == '1\t34'
daily = query("CALL GetDailyAppointmentReportByDoctor('2025-04-15')").splitlines()
assert len(daily) == 3 and all('2025-04-15' in row for row in daily)
assert query('CALL GetDoctorWithMostPatientsByYear(1999)') == ''
assert query("CALL GetDailyAppointmentReportByDoctor('1999-01-01')") == ''
invalid = subprocess.run(client + ['-e', 'CALL GetDoctorWithMostPatientsByMonth(13,2025)'], capture_output=True, text=True)
assert invalid.returncode != 0 and 'valid month' in invalid.stderr
print('PASS: fixture counts, foreign keys, three reports, empty periods and invalid month')

# Optional export verifies actual MongoDB content and cross-database links.
export_path = os.environ.get('MONGO_EXPORT')
if export_path:
    documents = json.loads(Path(export_path).read_text())
    assert len(documents) == 24
    assert len({d['_id'] for d in documents}) == 24
    for d in documents:
        reference = int(d['appointmentId'])
        patient = query(f'SELECT p.name FROM appointment a JOIN patient p ON a.patient_id=p.id WHERE a.id={reference}')
        assert patient == d['patientName'], d['_id']
        assert 3 <= len(d['medication']) <= 100
        assert 3 <= len(d['dosage']) <= 20
        assert len(d.get('doctorNotes', '')) <= 200
    print('PASS: 24 exported MongoDB records and all MySQL appointment/patient references')
