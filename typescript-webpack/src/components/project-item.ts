import { Draggable } from '../models/drag-drop.js';
import { Component } from './base-component';
import { Project } from '../models/project';

// render project item class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
