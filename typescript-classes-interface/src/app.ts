class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  // this: Deparment -> to make sure this keyword always refer to instance inside the Department class
  describe(this: Department) {
    console.log(`Deparment Name : ${this.name}, id: ${this.id}`);
  }

  addEmployee(this: Department, employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(this.employees.length);
    console.log(this.employees);
  }
}

// child classes //
class ITDepartment extends Department {
  constructor(id: string, name: string, public admins: string[]) {
    super(id, name); // pass the id to the Department class
  }

  printAdmin(this: ITDepartment) {
    console.log(`it deparment leader name : ${this.name}, crew name : ${this.admins}  `);
  }

  addEmployee(name: string): void {
    this.employees.push(name);
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, name: string, public admins: string[], private reports: string[]) {
    super(id, name); // pass the id to the Department class
  }

  // accessing private property using getter function
  get getReports() {
    if (this.reports.length > 0) return this.reports;

    return 'No report found';
  }

  // modify private property using setter function
  set addReports(value: string) {
    if (!value) return;

    this.reports.push(value);
  }

  printAdmin(this: ITDepartment) {
    console.log(`accounting deparment leader name : ${this.name}, crew name : ${this.admins}  `);
  }

  addEmployee(name: string): void {
    this.employees.push(name);
  }
}

// testing //

const deparment = new Department('123123123', 'andhika'); // initiate class

deparment.describe(); // call the describe() method property

const it = new ITDepartment('IT', 'Furfio', ['herman', 'joko']);

it.printAdmin();

///-----////

const accounting = new AccountingDepartment('Accounting', 'Julia', ['Rio'], []);

accounting.printAdmin();

accounting.addEmployee('julio');
accounting.printEmployeeInformation();
accounting.addReports = 'report sunday';

const reportsData = accounting.getReports;
console.log(reportsData);
