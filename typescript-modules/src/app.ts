import { ProjectInput } from './components/project-input';
import { projectList } from './components/project-list';

// alternative
// import DragTarget = App.DragTarget;
// import Draggable = App.Draggable;

new ProjectInput();
new projectList('active');
new projectList('finished');
