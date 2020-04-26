interface ExerciseResult {
  periodLength:       number;
  trainingDays:       number;
  success:            boolean;
  rating:             number;
  ratingDescription:  string;
  target:             number;
  average:            number;
}

const calculateExercises = (hours: number[], target: number): ExerciseResult => {
  const result = {
    periodLength: hours.length,
    trainingDays: hours.filter(hour => hour > 0).length,
    average: hours.reduce((acc, value) => acc + value) / hours.length,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: target,
  };

  result.success = result.average >= 2;
  if (target - result.average === 0) {
    result.rating = 3;
    result.ratingDescription = 'good';
  } else if (target - result.average < 0.5) {
    result.rating = 2;
    result.ratingDescription = 'not too bad but could be better';
  } else {
    result.rating = 1;
    result.ratingDescription = 'bad';
  }

  return result;
};

const parsePostArguments = (args: Array<string>, target: string): number[] => {
  if (args.length == 0) throw new Error('parameters missing');
  if (isNaN(Number(target))) throw new Error('malformatted parameters');

  return args.map(item => {
    if (isNaN(Number(item))) throw new Error('malformatted parameters');
    return Number(item);
  });
};

export { parsePostArguments, calculateExercises };
