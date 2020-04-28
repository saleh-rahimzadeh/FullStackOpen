// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface DiagnoseEntry {
  code:   string;
  name:   string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Entry {

}

export interface PatientEntry {
  id:           string;
  name:         string;
  dateOfBirth:  string;
  ssn:          string;
  gender:       Gender;
  occupation:   string;
  entries:      Entry[];
}

export type PatientEntryNonSensitive = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >
