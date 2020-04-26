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
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provide 2 number values for Height and Weight!');
  }

  return [Number(args[2]), Number(args[3])];
}

try {
  const [ height, weight ] = parseArguments(process.argv);
  console.log(`Calculate BMI for height:${height} and weight:${weight}`);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error in calculation : ', e.message);
}
