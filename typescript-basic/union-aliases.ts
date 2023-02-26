// custom type
type Input = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
  // use the  custom type
  input1: Input,
  input2: Input,
  resultConversion: ConversionDescriptor
) {
  let result: number | string;

  if ((typeof input1 === 'number' && typeof input2 === 'number') || resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

const combinedNames = combine('Max', 'Anna', 'as-text');
const combinedAges = combine(15, 15, 'as-number');
console.log(combinedNames);
console.log(combinedAges);
