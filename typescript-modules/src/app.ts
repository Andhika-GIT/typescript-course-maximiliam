// import namespaces
/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />

// alternative
// import DragTarget = App.DragTarget;
// import Draggable = App.Draggable;

namespace App {
  // validation type
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  // Drag & drop type

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

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);

      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const selectedProject = this.projects.find((project) => project.id === projectId);

      if (selectedProject) {
        console.log(newStatus);
        selectedProject.status = newStatus;
        this.updateListeners();
      }
    }
  }

  // create global constant to initialize the project state class
  const projectState = ProjectState.getInstance();

  // render project item class
  class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(hostId: string, private project: Project) {
      super('single-project', hostId, false, project.id);

      this.configure();
      this.renderContent();
    }

    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      } else {
        return `${this.project.people} persons`;
      }
    }

    // INHERITANCE METHOD FROM COMPONENT CLASS ( MUST ADD TO AVOID ERROR )
    protected configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
      this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
    }

    protected renderContent() {
      this.element.querySelector('h2')!.textContent = `${this.project.title} (${this.project.id}) ${this.project.status}`;
      this.element.querySelector('h3')!.textContent = this.persons;
      this.element.querySelector('p')!.textContent = this.project.description;
    }

    // Draggable interface methods
    dragStartHandler(this: ProjectItem, event: DragEvent): void {
      // set data and only transfer the id
      event.dataTransfer!.setData('text/plain', this.project.id);

      // set the cursor effect
      event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {}
  }

  // render project list class
  class projectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);

      this.configure();
      this.renderContent();
    }

    // INHERITANCE METHOD FROM COMPONENT CLASS ( MUST ADD TO AVOID ERROR )
    protected configure(): void {
      // drag event listeners
      this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
      this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
      this.element.addEventListener('drop', this.dropHandler.bind(this));

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
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
      this.element.querySelector('ul')!.id = listId;
    }

    // render the projects after listeners
    private renderProjects(projects: Array<Project>) {
      const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`);
      // clear elements to avoid duplication
      listEl.innerHTML = '';
      for (const item of projects) {
        // instanstiate the project item class to render single list item
        new ProjectItem(this.element.querySelector('ul')!.id, item);
      }
    }

    // drag target interface methods
    dragOverHandler(this: projectList, event: DragEvent): void {
      // only allow user to drop item on spesific area
      if (event.dataTransfer) {
        // preventDefault to allow drop event
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl?.classList.add('droppable');
      }
    }

    dragLeaveHandler(this: projectList, _: DragEvent): void {
      const listEl = this.element.querySelector('ul')!;
      listEl?.classList.remove('droppable');
    }

    dropHandler(this: projectList, event: DragEvent): void {
      const projectId = event.dataTransfer!.getData('text');
      projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
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
          // console.log(title, desc, people);

          // call the global constant to store the project
          projectState.addProject(title, desc, people);
          this.clearInputs();
        }
      });
    }
  }

  new ProjectInput();
  new projectList('active');
  new projectList('finished');
}
