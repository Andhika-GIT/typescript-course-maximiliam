class Department {
  // private id: string
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.name = n;
    // this.id = id
  }

  // this: Deparment -> to make sure this keyword always refer to instance inside the Department class
  describe(this: Department) {
    console.log(`Deparment Name : ${this.name}, id: ${this.id}`);
  }

  addEmployee(this: Department, employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const account = new Department('123123123', 'andhika'); // initiate class

account.describe(); // call the describe() method property

account.addEmployee('hendry');
account.addEmployee('aldi');
account.printEmployeeInformation();
