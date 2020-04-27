import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveItems());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatinet = patientService.addItem({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.json(newPatinet);
});

export default router;
