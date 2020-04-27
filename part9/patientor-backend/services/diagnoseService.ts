import diagnoseData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const data: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

const getItems = (): Array<DiagnoseEntry> => {
  return data;
};

export default {
  getItems
};
