# Managing State for Dynamic Component Rendering

## Overview

In this section, we introduce state management in our React application to control which component is displayed: `NewProject` or `NoProjectSelected`. This is achieved by managing a `selectedProjectId` state within the `App` component.

## Purpose

The `selectedProjectId` state is designed to store one of three possible values:

- **`undefined`**: Indicates that no project has been selected and no new project is being created
- **`null`**: Signals that the user is in the process of adding a new project
- **A project ID**: Represents a selected project that the user wants to view or edit

This approach allows us to minimize state complexity by avoiding additional state variables. An alternative could have been defining a `currentAction` state with values like `'adding'`, `'selectedProject'`, or `'nothingSelected'`, but the chosen approach keeps the state lean.

## Code Implementation

### App.jsx

```jsx
import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  // State to manage selected project and available projects
  const [projects, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null // Signals that a new project is being added
      };
    });
  }

  let content;
  if (projects.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projects.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
```

## State Management Breakdown

- `selectedProjectId: undefined` → Initially, no project is selected, and the user is not adding one
- `handleStartAddProject()` → When triggered, updates `selectedProjectId` to null, indicating a new project is being created

**Alternative Approach**: Instead of `selectedProjectId`, we could have used a `currentAction` state with values such as 'adding', 'selectedProject', or 'nothingSelected'. However, using `selectedProjectId` keeps the state minimal and avoids redundant variables.

## Component Implementation

### ProjectsSidebar Component

```jsx
import Button from "./Button.jsx";

export default function ProjectSidebar({ onStartAddProject }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul></ul>
    </aside>
  );
}
```

### NoProjectSelected Component

```jsx
import noProjectImage from "../assets/no-projects.png";
import Button from "./Button.jsx";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 mt-4 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a Project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create New Project</Button>
      </p>
    </div>
  );
}
```

## Conclusion

This state-driven approach allows our app to dynamically switch between different views (`NewProject` and `NoProjectSelected`) while maintaining clarity and efficiency in state management. The next step will be integrating project selection logic to dynamically render the selected project based on `selectedProjectId`.