import patientData from '../data/patients.json';
import { PatientEntry, PatientEntryNonSensitive, NewPatientEntry } from '../types';

const data: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getItems = (): Array<PatientEntry> => {
   return data;
};

const getNonSensitiveItems = (): Array<PatientEntryNonSensitive> => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addItem = (entry: NewPatientEntry): PatientEntry => {
  const newPatient: PatientEntry = {
    id: (data.length + 1) + '-' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10),
    ...entry
  };

  data.push(newPatient);
  return newPatient;
};

export default {
  getItems,
  getNonSensitiveItems,
  addItem
};
