# Implementing the SelectedProject Component

## 1. Creating the `SelectedProject` Component

We start by creating a new component inside the `components/` directory called `SelectedProject.jsx`. Below is the general skeleton for the component:

```jsx
export default function SelectedProject({ project, onDelete }) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      TASKS
    </div>
  );
}
```

## 2. Ensuring Projects Can Be Selected

We need to ensure that clicking a project button updates the selected project in the `App` component. This requires maintaining a state variable `selectedProjectId` and updating it when a project is selected.

### Adding a New Function in `App.jsx`

```jsx
function handleSelectProject(id) {
  setProjectState((prevState) => ({
    ...prevState,
    selectedProjectId: id
  }));
}
```

We then pass this function as a prop to the `ProjectsSidebar` component:

```jsx
<ProjectsSidebar
  onStartAddProject={handleStartAddProject}
  projects={projectState.projects}
  onSelectProject={handleSelectProject}
  selectedProjectId={projectState.selectedProjectId}
/>
```

## 3. Modifying `ProjectsSidebar.jsx`

We update the `ProjectsSidebar` component so that the selected project is visually distinguished and clicking a project updates the state in `App.jsx`.

```jsx
import Button from "./Button.jsx";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={project.id}>
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
```

## 4. Displaying the Selected Project

Next, we modify `App.jsx` to display the selected project based on the state.

### Handling Project Deletion

We add a function in `App.jsx` to handle deleting a selected project:

```jsx
function handleDeleteProject(projectId) {
  setProjectState((prevState) => {
    return {
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter((project) => project.id !== projectId)
    };
  });
}
```

We then determine the `content` variable dynamically:

```jsx
let selectedProject = projectState.projects.find(
  (project) => project.id === projectState.selectedProjectId
);

let content;
if (projectState.selectedProjectId === null) {
  content = (
    <NewProject
      onAdd={handleAddProject}
      onCancel={handleCancelProjectAddProject}
    />
  );
} else if (selectedProject) {
  content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />;
} else {
  content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
}
```

## 5. Updating the `App` Component Return Statement

Finally, we modify the main return statement in `App.jsx` to display the selected project content:

```jsx
return (
  <main className="h-screen flex gap-8">
    <ProjectsSidebar
      onStartAddProject={handleStartAddProject}
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}
    />
    {content}
  </main>
);
```

## Summary

1. **Created** `SelectedProject.jsx` **to display project details.**
2. **Updated** `ProjectsSidebar.jsx` **to allow project selection.**
3. **Modified** `App.jsx` **to track the selected project and dynamically display the appropriate content.**
4. **Added a delete button** in `SelectedProject.jsx` to remove projects dynamically.

With these changes, our React app now supports selecting, displaying, and deleting projects dynamically! 🎉

