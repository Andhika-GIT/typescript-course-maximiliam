// function that is return type number
function add(n1: number, n2: number) {
  return n1 + n2;
}

// function that is return type is void (doesnt return anything)
function printResult(num: number) {
  console.log('Result: ' + num);
}

// function that is return number type and also has callback type
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

// define function type
let combineValues: (a: number, b: number) => number;

// combineValues = 5 -> false
combineValues = add;

console.log(combineValues(8, 8));
printResult(add(5, 12));

addAndHandle(10, 10, printResult);
