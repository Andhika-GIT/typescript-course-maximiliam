interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }

  console.log(`moving at speed : ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// --------------- //

// <HTMLInputElement> -> type casting for html input element
// const userInputElement = <HTMLInputElement>document.getElementById('user-input');

// type casting for react jsx file
const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'hi there';
}
