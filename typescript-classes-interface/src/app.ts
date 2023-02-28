class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  // this: Deparment -> to make sure this keyword always refer to instance inside the Department class
  describe(this: Department) {
    console.log(`Deparment: ${this.name}`);
  }
}

const account = new Department('andhika'); // initiate class

account.describe(); // call the describe() method property
