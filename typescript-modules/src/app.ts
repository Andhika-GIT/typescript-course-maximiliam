// import namespaces
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

// alternative
// import DragTarget = App.DragTarget;
// import Draggable = App.Draggable;

namespace App {
  new ProjectInput();
  new projectList('active');
  new projectList('finished');
}
