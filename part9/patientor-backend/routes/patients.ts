import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveItems());
});

router.post('/', (req, res) => {
  try {
    const newEntry = toNewPatientEntry(req.body);
    const newPatinet = patientService.addItem(newEntry);
    res.json(newPatinet);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
