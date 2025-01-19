# Implementing Dynamic Component Rendering

## Implementation Overview

Building on our previous state management setup, we now implement dynamic rendering of components based on the `selectedProjectId` state. This involves three main steps:

1. Passing state update functions as props
2. Accepting and using these props in child components
3. Implementing conditional rendering logic

## Updated Implementation

### App.jsx

```jsx
import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  const [projectState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  }

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectState.selectedProjectId === undefined) {
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

**Key Changes in App.jsx:**
- Added conditional rendering logic using `content` variable
- Passed `handleStartAddProject` to both `ProjectsSidebar` and `NoProjectSelected`
- Using `projectState.selectedProjectId` to determine which component to render

### NoProjectSelected.jsx

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

**Key Changes in NoProjectSelected.jsx:**
- Added `onStartAddProject` prop in the component parameters
- Connected the prop to Button's `onClick` handler

### ProjectsSidebar.jsx

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

**Key Changes in ProjectsSidebar.jsx:**
- Added `onStartAddProject` prop in the component parameters
- Connected the prop to Button's `onClick` handler

## State-Based Rendering Logic

The application now switches between components based on `selectedProjectId`:
- When `null`: Displays `<NewProject />`
- When `undefined`: Displays `<NoProjectSelected />`
- Both components receive `onStartAddProject` to trigger state changes when needed