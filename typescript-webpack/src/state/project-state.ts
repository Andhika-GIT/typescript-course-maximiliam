import { Project } from '../models/project';
import { ProjectStatus } from '../models/project';

// project state Management (singleton) class'
type Listener<T> = (items: Array<T>) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
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
export const projectState = ProjectState.getInstance();
