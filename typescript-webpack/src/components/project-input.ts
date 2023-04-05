import { Component } from './base-component';
import { validate } from '../util/validation';
import { projectState } from '../state/project-state';

// project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    // select all the input field in the form based on the id
    this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
    this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
    this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

    this.submitHandler();
  }

  // INHERITANCE METHOD FROM COMPONENT CLASS ( MUST ADD TO AVOID ERROR )
  protected configure(): void {}
  protected renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (!validate({ value: enteredTitle, required: true, minLength: 5 }) || !validate({ value: enteredDescription, required: true, minLength: 5 }) || !validate({ value: +enteredPeople, required: true, min: 1 })) {
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
        // console.log(title, desc, people);

        // call the global constant to store the project
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    });
  }
}
