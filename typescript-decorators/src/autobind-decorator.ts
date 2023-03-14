// decorator
function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  // access original method
  const originalMethod = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };

  return adjDescriptor;
}

class Printer {
  message = 'this works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
