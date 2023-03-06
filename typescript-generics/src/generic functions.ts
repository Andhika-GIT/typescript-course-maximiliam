// 1.) generics

// const names : string[] = [] // type

const names: Array<string> = []; // generics

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('this is done');
  }, 2000);
});

promise.then((data) => data.split(''));

// 2.) generic function

// function merge<T, U>(objA: T, objB: U): T & U {
//   return { ...objA, ...objB };
// }

// OR
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'andhika' }, { age: 30 });

// another way of using function generics
const mergeObj2 = merge<{ name: string }, { age: number }>({ name: 'vinsen' }, { age: 23 });

const countAndDescribe = <T extends number>(element: T) => {
  return element;
};

// countAndDescribe('test');

// 3.) keyof constraint

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
  // see all key properties inside the object
  return `Value : ${obj[key]}`;
};

extractAndConvert({ name: 'hubla' }, 'name');
