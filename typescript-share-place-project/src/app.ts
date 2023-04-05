// Code goes here!
const form = <HTMLFormElement>document.querySelector('form');
const addressInput = <HTMLInputElement>document.getElementById('address');

function searchAddressHandler(event: Event) {
  event.preventDefault();
  //   const enteredAdress = addressInput.value;

  // send to google API
}

form.addEventListener('submit', searchAddressHandler);
