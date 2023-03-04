// 1.) Index properties

interface ErrorContainer {
  // index properties -> we don't know how many properties in the future, but all properties key and properties value must be string
  [key: string]: string;
}

const errorMessage: ErrorContainer = {
  email: 'not a valid email',
  username: 'not a valid username',
};

// 2.) function overloads

type StringNumber = string | number;

// if both arguments are number, then return number type value
function addMixed(a: number, b: number): number;

// if both arguments are string, then return string type value
function addMixed(a: string, b: string): string;

function addMixed(a: StringNumber, b: StringNumber) {
  // type guard
  if (typeof a === 'string' || typeof b === 'string') return a.toString() + b.toString();

  return a + b;
}

const result = addMixed('vinsen', 'pro');

result.toLocaleUpperCase();

// 3.) optional chaining

const fetchedUserData = {
  id: 'u1',
  name: 'max',
  job: {
    title: 'CEO',
  },
};

console.log(fetchedUserData?.job?.title);

// 4.) Nullish coalescing

const userInput = undefined;

// if it's undefined or null then stored "DEFAULT" as the value
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);
