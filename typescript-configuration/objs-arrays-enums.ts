// const person: {
//   // typescript object type
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   // javascript object
//   name: 'andhika',
//   age: 23,
//   hobbies: ['Sports', 'Cooking'],
//   role: [1, 'author'],
// };

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  // javascript object
  name: 'andhika',
  age: 23,
  hobbies: ['Sports', 'Cooking'],
  role: Role.AUTHOR,
};

let favoriteActivities: string[];

// console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

person.role === Role.AUTHOR ? console.log('is author') : '';
