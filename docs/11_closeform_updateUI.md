# Handling Project Selection and Sidebar Updates in React

## Closing the Component on Save

When a user clicks the save button, we want to close the `NewProject` component. To achieve this, we need to reset `selectedProjectId` back to `undefined`. Currently, `selectedProjectId` is `null` and remains `null`, which prevents the component from closing.

### Understanding the Conditional Rendering

In `App.jsx`, we use an `if` statement to determine which component to render:

```jsx
if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}/>;
} else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
}
```

Since `selectedProjectId` remains `null`, the `NewProject` component stays open. We have two options to fix this:

### Option 1: Set `selectedProjectId` to `undefined`

```jsx
function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random()
    };
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
}
```

### Option 2: Set `selectedProjectId` to the New Project's ID

```jsx
function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId
    };
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
        projects: [...prevState.projects, newProject]
      };
    });
}
```

### Choosing the Best Option

We will **not** use the second option because, at the moment, we are not handling this case properly. Instead, we will stick with setting `selectedProjectId` to `undefined` to ensure the component closes correctly.

---

## Displaying Projects in the Sidebar

We also want to ensure that projects appear in the sidebar. To do this, we must pass the `projects` state to the `ProjectsSidebar` component.

### Updating the `return` Statement in `App.jsx`

```jsx
return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
);
```

### Modifying `ProjectsSidebar.jsx`

#### Before:

```jsx
export default function ProjectsSidebar({ onStartAddProject }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
          <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul>
      </ul>
    </aside>
  );
}
```

#### After:

We add `projects` as a prop and map through the project list to render buttons dynamically.

```jsx
export default function ProjectsSidebar({ onStartAddProject, projects }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
          <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map(project => (
          <li key={project.id}>
            <button className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800">
              {project.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

---

## Final Updated Code for the Three Main Files

### `Input.jsx`

```jsx
import { forwardRef } from "react";

const Input = forwardRef(function Input({ textarea, label, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;
```

### `ProjectsSidebar.jsx`

```jsx
import Button from "./Button.jsx";

export default function ProjectsSidebar({ onStartAddProject, projects }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => (
          <li key={project.id}>
            <button className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800">
              {project.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

### `App.jsx`

```jsx
import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: [...prevState.projects, { ...projectData, id: Math.random() }]
    }));
  }

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} />
      {content}
    </main>
  );
}

export default App;
```
