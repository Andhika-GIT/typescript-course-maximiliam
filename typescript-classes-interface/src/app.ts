interface Identity {
  readonly userName: string;
  lastName?: string;
  age: number;
}

interface Greetable extends Identity {
  greet(phrase: string): void;
}

interface AddFunction {
  (a: number, b: number): number;
}

////////// --- //////////

const addNumber: AddFunction = (n1: number, n2: number) => {
  return n1 + n2;
};

class Person implements Greetable {
  lastName;
  userName;
  age;

  constructor(name: string, lastName: string | undefined, age: number) {
    this.userName = name;
    this.age = age;

    // check if last name is inputed during instantiation
    lastName ? (this.lastName = lastName) : '';
  }

  greet(sentence: string) {
    console.log(`${sentence} ${this.userName} ${this.lastName ? this.lastName : ''} ${this.age} years old`);
  }
}

const user1: Greetable = new Person('andhika', '', 23);
// user1.userName = 'vinsen'

user1.greet('hello');
