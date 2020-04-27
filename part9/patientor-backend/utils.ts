/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender } from './types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};


const parseText = (text: any, title: string): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing ' + title + ': ' + text);
  }

  return text;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};


const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseText(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseText(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation, "occupation")
  };
};

export default toNewPatientEntry;
