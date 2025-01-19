# Implementing Dynamic Rendering in React - Step by Step Guide

## Starting with State Management

Let's build upon our previous state setup and implement dynamic rendering. We'll break this down into small, manageable steps.

### Step 1: Passing State Update Functions

First, let's look at our complete `App.jsx`:

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
        selectedProjectId: null //this is a signal that we are adding a new project
        //undefined means nothing is going on
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

Let's break down what's happening here:

1. We pass our state updating function to both components:
```jsx
<ProjectsSidebar onStartAddProject={handleStartAddProject} />
<NoProjectSelected onStartAddProject={handleStartAddProject} />
```
This is like giving both components a button that they can press to tell the app "Hey, the user wants to add a new project!"

### Step 2: Accepting Props in Components

Now, let's look at how our `NoProjectSelected` component accepts and uses this function:

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

The important part here is:
```jsx
function NoProjectSelected({ onStartAddProject }) {
  // ...
  <Button onClick={onStartAddProject}>
```
We accept the function as a prop and connect it to our button's `onClick` event. When someone clicks the button, it triggers the function we received from App.jsx.

Similarly, our `ProjectSidebar` component does the same thing:

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

Again, the key parts are:
```jsx
function ProjectSidebar({ onStartAddProject }) {
  // ...
  <Button onClick={onStartAddProject}>
```

### Step 3: Implementing Dynamic Rendering

In our App.jsx, we add this logic:

```jsx
let content;
if (projectState.selectedProjectId === null) {
  content = <NewProject />;
} else if (projectState.selectedProjectId === undefined) {
  content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
}
```

This is like having a traffic controller that decides which component to show:
- If `selectedProjectId` is `null`, it means we're adding a new project, so show the `NewProject` component
- If `selectedProjectId` is `undefined`, it means no project is selected, so show the `NoProjectSelected` component

Then we use this content in our return statement:
```jsx
return (
  <main className="h-screen flex gap-8">
    <ProjectsSidebar onStartAddProject={handleStartAddProject} />
    {content}
  </main>
);
```

This way, our app dynamically switches between different views based on the state, creating a smooth user experience