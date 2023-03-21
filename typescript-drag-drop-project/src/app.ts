// validation type
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (input: Validatable) => {
  let isValid = true;

  // if we insert required into the argument
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length > 0;
  }

  // if we insert minLength into the argument and if the value is string
  if (input.minLength !== undefined && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.minLength;
  }

  // if we insert minLength into the argument and if the value is string
  if (input.maxLength !== undefined && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.maxLength;
  }

  // if we insert min into the argument and if the value is number
  if (input.min != null && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min;
  }

  // if we insert max into the argument and if the value is number
  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max;
  }

  return isValid;
};

// project state Management (singleton) class
class ProjectState {
  private listeners: Array<any> = [];
  private projects: Array<any> = [];
  private static instance: ProjectState; // to access the class instance

  // private constructor -> singletons class
  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, people: number) {
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      people,
    };

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

// create global constant to initialize the project state class
const projectState = ProjectState.getInstance();

// render project list class
class projectList {
  templateElement;
  hostElement;
  element;
  constructor(private type: 'active' | 'finished') {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-list');
    this.hostElement = <HTMLDivElement>document.getElementById('app');

    // make the copy of the template content
    const importedNode = document.importNode(this.templateElement.content, true);

    // take the first element from the copy template content which is the <form> element
    this.element = <HTMLElement>importedNode.firstElementChild;

    // dynamic id
    this.element.setAttribute('id', `${this.type}-projects`);

    // call the addListeners to store the listeners functions
    projectState.addListener((projects: Array<any>) => {
      this.renderProjects(projects);
    });

    this.attach();
    this.renderContent();
  }

  // render the projects after listeners
  private renderProjects(projects: Array<any>) {
    const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
    for (const projectItem of projects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;
      listEl?.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
  }

  private attach() {
    // insert the <form> element into hostElement (id="app")
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// project input class
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
        console.log(title, desc, people);

        // call the global constant to store the project
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    });
  }

  private attach() {
    // insert the <form> element into hostElement (id="app")
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new projectList('active');
const finishedProjectList = new projectList('finished');
