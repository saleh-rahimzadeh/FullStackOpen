import patientData from '../data/patients.json';
import { PatientEntry, PatientEntryNonSensitive, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';


const data: PatientEntry[] = patientData.map(item => {
  const object = toNewPatientEntry(item) as PatientEntry;
  object.id = item.id;
  return object;
});


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
