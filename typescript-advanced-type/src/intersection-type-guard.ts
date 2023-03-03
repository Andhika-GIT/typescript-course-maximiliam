type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // intersection types

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

const add = (a: Combinable, b: Combinable) => {
  // type guard
  if (typeof a === 'string' || typeof b === 'string') return a.toString() + b.toString();

  return a + b;
};

type UnknownEmployee = Employee | Admin;

const printEmployeeInformation = (emp: UnknownEmployee) => {
  console.log(`Name: ${emp.name}`);

  if ('privileges' in emp) {
    console.log(`privileges: ${emp.privileges}`);
  }
  if ('startDate' in emp) {
    console.log(`Date: ${emp.startDate}`);
  }
};

const employee: ElevatedEmployee = {
  name: 'max',
  privileges: ['create-server'],
  startDate: new Date(),
};

printEmployeeInformation({ name: 'andhika', privileges: ['creator'] });

class Car {
  drive() {
    console.log('Driving...');
  }
}
class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ${amount}`);
  }
}

type vehicle = Car | Truck;

const useVehicle = (vehicle: vehicle) => {
  vehicle.drive();

  //  check if the vehicle argument is the instance of Truck class
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(200);
  }
};

const vehicleCar = new Car();
const vehicleTruck = new Truck();

useVehicle(vehicleCar);
useVehicle(vehicleTruck);
