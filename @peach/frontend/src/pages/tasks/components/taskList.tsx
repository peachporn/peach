import { FunctionalComponent, h } from 'preact';

export const TaskList: FunctionalComponent = ({ children }) => (
  <ul className="task-list">{children}</ul>
);

export const TaskListEntry: FunctionalComponent = ({ children }) => (
  <li className="task-list__entry">{children}</li>
);

export const TaskEntryCategory: FunctionalComponent = ({ children }) => (
  <span className="task-list__category">{children}</span>
);

export const TaskEntryParameters: FunctionalComponent = ({ children }) => (
  <div className="task-list__parameters">{children}</div>
);

export const TaskEntryStatus: FunctionalComponent = ({ children }) => (
  <div className="task-list__status">{children}</div>
);

export const TaskEntryControls: FunctionalComponent = ({ children }) => (
  <div className="task-list__controls">{children}</div>
);

export const TaskEntryDetails: FunctionalComponent = ({ children }) => (
  <div className="task-list__details">{children}</div>
);
