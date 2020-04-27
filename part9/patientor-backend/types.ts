export interface DiagnoseEntry {
  code:   string;
  name:   string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface PatientEntry {
  id:           string;
  name:         string;
  dateOfBirth:  string;
  ssn:          string;
  gender:       Gender;
  occupation:   string;
}

export type PatientEntryNonSensitive = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
