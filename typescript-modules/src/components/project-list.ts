/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />

namespace App {
  // render project list class
  export class projectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
}
