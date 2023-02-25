const person: {
  // typescript object type
  name: string;
  age: number;
  hobbies: string[];
} = {
  // javascript object
  name: 'andhika',
  age: 23,
  hobbies: ['Sports', 'Cooking'],
};

let favoriteActivities: string[];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
