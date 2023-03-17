class ProjectInput {
  templateElement;
  hostElement;
  element;

  constructor() {
    this.templateElement = <HTMLTemplateElement>document.getElementById('project-input');
    this.hostElement = <HTMLDivElement>document.getElementById('app');

    // make the copy of the template content
    const importedNode = document.importNode(this.templateElement.content, true);

    // take the first element from the copy template content which is the <form> element
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.attach();
  }

  private attach() {
    // insert the <form> element into hostElement (id="app")
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const project = new ProjectInput();
