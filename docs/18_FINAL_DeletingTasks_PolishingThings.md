# Project: Task Management

## Overview
This project is a web application that allows users to manage their tasks and projects. It includes the following core functionality:

- Creating and managing projects
- Adding, editing, and deleting tasks within each project
- Visualizing the tasks and their status within a project

## File Structure

```
src/
├── App.jsx
├── ProjectsSidebar.jsx
├── SelectedProject.jsx
└── Tasks/
    ├── NewTask.jsx
    └── Tasks.jsx
```

## Components

### App.jsx
This is the main entry point of the application. It manages the overall state of the application, including the list of projects and the currently selected project.

**Key Functions:**
- `handleStartAddProject`: Toggles the state to start adding a new project.
- `handleAddProject`: Adds a new project to the list of projects.
- `handleSelectProject`: Selects a project from the list, updating the `selectedProjectId` state.
- `handleDeleteProject`: Deletes the currently selected project.
- `handleAddTask`: Adds a new task to the currently selected project.
- `handleDeleteTask`: Deletes a task from the currently selected project.

### ProjectsSidebar.jsx
This component displays the list of projects and allows the user to select a project.

**Props:**
- `onStartAddProject`: Function to toggle the state to start adding a new project.
- `projects`: List of projects.
- `onSelectProject`: Function to select a project.
- `selectedProjectId`: ID of the currently selected project.

### SelectedProject.jsx
This component displays the details of the currently selected project, including the list of tasks.

**Props:**
- `project`: The currently selected project.
- `onDelete`: Function to delete the currently selected project.
- `onAddTask`: Function to add a new task to the currently selected project.
- `onDeleteTask`: Function to delete a task from the currently selected project.
- `tasks`: List of tasks for the currently selected project.

### Tasks/Tasks.jsx
This component displays the list of tasks for the currently selected project.

**Props:**
- `tasks`: List of tasks for the currently selected project.
- `onAdd`: Function to add a new task to the currently selected project.
- `onDelete`: Function to delete a task from the currently selected project.

### Tasks/NewTask.jsx
This component provides a form for adding a new task to the currently selected project.

**Props:**
- `onAdd`: Function to add a new task to the currently selected project.

## Handling Task Deletion

When the user clicks the "Clear" button next to a task in the `Tasks` component, the `onDelete` function is called with the `id` of the task that should be deleted.

```jsx
<button
  className="text-stone-700 hover:text-red-500"
  onClick={() => onDelete(task.id)}
>
  Clear
</button>
```

The `onDelete` function is passed down from the `App.jsx` component through the `SelectedProject.jsx` component to the `Tasks.jsx` component. This allows the deletion logic to be handled at the top-level `App.jsx` component, keeping the `Tasks.jsx` component focused on rendering the tasks and handling user interactions.

In the `App.jsx` component, the `handleDeleteTask` function is responsible for removing the task from the list of tasks for the currently selected project:

```jsx
function handleDeleteTask(id) {
  setProjectState((prevState) => ({
    ...prevState,
    tasks: prevState.tasks.filter(
      (task) => task.id !== id
    )
  }));
}
```

By passing the `handleDeleteTask` function as a prop to the `Tasks.jsx` component, the deletion logic is decoupled from the `Tasks.jsx` component itself, making the code more modular, reusable, and testable.

## Conclusion
This project demonstrates a well-structured React application that manages projects and tasks. The separation of concerns, use of props to pass down functionality, and the clear handling of task deletion showcase best practices in React application development.