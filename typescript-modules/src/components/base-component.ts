// Component base class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
