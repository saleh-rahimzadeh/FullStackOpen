/* Calculate BMI
 * Formula: mass(kg) ÷ height(m)²
 */
const calculateBmi = (height: number, weight: number): string => {
  const result: number = weight / Math.pow((height / 100), 2);

  if (result <= 15) {
    return "Very severely underweight";
  } else if (result > 15 && result <= 16) {
    return "Severely underweight ";
  } else if (result > 16 && result <= 18.5) {
    return "Underweight";
  } else if (result > 18.5 && result <= 25) {
    return "Normal (healthy weight)";
  } else if (result > 25 && result <= 30) {
    return "Overweight";
  } else if (result > 30 && result <= 35) {
    return "Obese Class I (Moderately obese)";
  } else if (result > 35 && result <= 40) {
    return "Obese Class II (Severely obese)";
  } else if (result > 40) {
    return "Obese Class III (Very severely obese)";
  } else {
    return "Invalid Result";
  }
}

const parseArguments = (args: Array<string>): number[] => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');
  if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
    throw new Error('malformatted parameters');
  }

  return [Number(args[0]), Number(args[1])];
}

export { calculateBmi, parseArguments };
