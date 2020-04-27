import patientData from '../data/patients.json';
import { PatientEntry, PatientEntryNonSensitive } from '../types';

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

export default {
  getItems,
  getNonSensitiveItems
};
