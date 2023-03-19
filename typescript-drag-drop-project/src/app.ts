class ProjectInput {
  templateElement;
  hostElement;
  element;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input');
    this.hostElement = <HTMLDivElement>document.getElementById('app');

    // make the copy of the template content
    const importedNode = document.importNode(this.templateElement.content, true);

    // take the first element from the copy template content which is the <form> element
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.setAttribute('id', 'user-input');

    // select all the input field in the form based on the id
    this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
    this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
    this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

    this.submitHandler();

    // run the attach function
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (enteredTitle.trim().length === 0 || enteredPeople.trim().length === 0 || enteredDescription.trim().length === 0) {
      alert('Invalid input, please try again');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.element.reset();
  }

  private submitHandler() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        console.log(title, desc, people);
        this.clearInputs();
      }
    });
  }

  private attach() {
    // insert the <form> element into hostElement (id="app")
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const project = new ProjectInput();
