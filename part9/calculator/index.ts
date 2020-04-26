//const express = require('express');
import express from 'express';
const app = express();
import { calculateBmi, parseArguments } from './bmiCalculator';
import { parsePostArguments, calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const args: Array<string> = [];
  if (height != undefined) args.push(height);
  if (weight != undefined) args.push(weight);

  try {
    const [ heightResult, weightResult ] = parseArguments(args);
    const bmi = calculateBmi(heightResult, weightResult);
    res.json({
      height: heightResult,
      weight: weightResult,
      bmi
    });
  } catch (e) {
    res.json({
      error: e.message
    });
  }
});

app.post('/exercises', (req, res) => {
  const postArguments = req.body;

  try {
    const inputs: number[] = parsePostArguments(postArguments.daily_exercises, postArguments.target);
    const target = Number(postArguments.target);
    res.json(calculateExercises(inputs, target));
  } catch (e) {
    res.json({
      error: e.message
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
