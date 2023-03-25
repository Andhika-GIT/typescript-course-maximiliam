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

// project type class
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
}

// Component base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
    // TEMPLATE HTML ELEMENT
    this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);

    // HOST ELEMENT (element with id of "app")
    this.hostElement = <T>document.getElementById(hostElementId);

    // make the copy of the template content
    const importedNode = document.importNode(this.templateElement.content, true);

    // take the first element from the copy template content which is the <form> element
    this.element = <U>importedNode.firstElementChild;

    if (newElementId) {
      // dynamic id
      this.element.setAttribute('id', newElementId);
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    // insert the <form> element into hostElement (id="app")
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
  }

  // all child class must inherit this method
  protected abstract configure(): void;
  protected abstract renderContent(): void;
}

// project state Management (singleton) class'
type Listener<T> = (items: Array<T>) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Array<Project> = [];
  private static instance: ProjectState; // to access the class instance

  // private constructor -> singletons class
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

// create global constant to initialize the project state class
const projectState = ProjectState.getInstance();

// render project list class

class projectList extends Component<HTMLDivElement, HTMLElement> {
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  // INHERITANCE METHOD FROM COMPONENT CLASS ( MUST ADD TO AVOID ERROR )
  protected configure(): void {
    // call the addListeners to store the listeners functions
    projectState.addListener((projects: Array<Project>) => {
      // filter project based on active or finished
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active;
        }

        return project.status === ProjectStatus.Finished;
      });

      // run renderProjects and pass the projects to render new list of project
      this.renderProjects(relevantProjects);
    });
  }

  protected renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  // render the projects after listeners
  private renderProjects(projects: Array<Project>) {
    const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
    // clear elements to avoid duplication
    listEl.innerHTML = '';
    for (const projectItem of projects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;
      listEl?.appendChild(listItem);
    }
  }
}

// project input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
        console.log(title, desc, people);

        // call the global constant to store the project
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    });
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new projectList('active');
const finishedProjectList = new projectList('finished');
