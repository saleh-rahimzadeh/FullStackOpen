//const express = require('express');
import express from 'express';
const app = express();
import { calculateBmi, parseArguments } from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
