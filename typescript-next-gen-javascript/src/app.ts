// type AddFunctionType = (a: number, b: number) => number;
// type PrintFunctionType = (a: string | number) => void;

// const add: AddFunctionType = (a, b) => a + b;

// const printOutput: PrintFunctionType = (output) => console.log(output);

// ----------**------------//

const passiveHobbies = ['sports', 'cooking'];
const activeHobbies = ['hiking'];

const person: {
  firstName: string;
  age: number;
} = {
  firstName: 'andhika',
  age: 22,
};

const hobbies = [...passiveHobbies, ...activeHobbies];

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

const { firstName, age } = person;

// ----------**------------//

type AddFunctionType = (...numbers: number[]) => void;

const add: AddFunctionType = (...numbers) => {
  let total: number = numbers.reduce((curResult, curValue) => curResult + curValue);
  console.log(total);
};

add(5, 10, 12, 20, 7);
