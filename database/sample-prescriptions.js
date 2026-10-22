// Fictional fixtures only. Run with mongosh; does not alter other collections.
const clinic = db.getSiblingDB('prescriptions');
const fixtures = [
  {
    "_id": "demo-rx-01",
    "patientName": "John Smith",
    "appointmentId": 51,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-02",
    "patientName": "Emily Rose",
    "appointmentId": 52,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-03",
    "patientName": "Michael Jordan",
    "appointmentId": 53,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-04",
    "patientName": "Olivia Moon",
    "appointmentId": 54,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-05",
    "patientName": "Liam King",
    "appointmentId": 55,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-06",
    "patientName": "Sophia Lane",
    "appointmentId": 56,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-07",
    "patientName": "Noah Brooks",
    "appointmentId": 57,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-08",
    "patientName": "Ava Daniels",
    "appointmentId": 58,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-09",
    "patientName": "William Harris",
    "appointmentId": 59,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-10",
    "patientName": "Mia Green",
    "appointmentId": 60,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-11",
    "patientName": "James Brown",
    "appointmentId": 61,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-12",
    "patientName": "Amelia Clark",
    "appointmentId": 62,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-13",
    "patientName": "Ben Johnson",
    "appointmentId": 63,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-14",
    "patientName": "Ella Monroe",
    "appointmentId": 64,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-15",
    "patientName": "Lucas Turner",
    "appointmentId": 65,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-16",
    "patientName": "Grace Scott",
    "appointmentId": 66,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-17",
    "patientName": "Ethan Hill",
    "appointmentId": 67,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-18",
    "patientName": "Ruby Ward",
    "appointmentId": 68,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-19",
    "patientName": "Jack Baker",
    "appointmentId": 69,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-20",
    "patientName": "Mia Hall",
    "appointmentId": 70,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-21",
    "patientName": "Owen Thomas",
    "appointmentId": 71,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-22",
    "patientName": "Ivy Jackson",
    "appointmentId": 72,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-23",
    "patientName": "Leo Martin",
    "appointmentId": 73,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  },
  {
    "_id": "demo-rx-24",
    "patientName": "Ella Moore",
    "appointmentId": 74,
    "medication": "Demo medication",
    "dosage": "Demo dosage",
    "doctorNotes": "Fictional training record; not medical advice.",
    "_class": "com.project.back_end.models.Prescription"
  }
];
for (const document of fixtures) {
    clinic.prescriptions.replaceOne({_id: document._id}, document, {upsert: true});
}
print('Demo prescriptions: ' + clinic.prescriptions.countDocuments({_id: /^demo-rx-/}));
