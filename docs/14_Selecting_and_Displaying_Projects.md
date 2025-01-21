Created a new Component: SelectedProject inside components...

here is a general skeleton code:

```jsx
export default function SelectedProject({ project }) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 bm-2">
            {project.title}
          </h1>
          <button className="text-stone-600 hover:text-stone-950">
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

We have to make sure Projects can be selected
We must make sure button changes some state in the App component

Back in App, we add another new funciton

```jsx
function handleSelectProject(id) {
  setProjectState((prevState) => ({
    ...prevState,
    selectedProjectId: id
  }));
}
```

then we pass this as prop to the ProjectsSidebar Component:

<ProjectsSidebar
onStartAddProject={handleStartAddProject}
projects={projectState.projects}
onSelectProject={handleSelectProject}/>

Then we modify the return statements in ProjectSidebar to style the selected project button:

```jsx
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
        if (projectId === selectedProjectId) {
          cssClasses += " bg-stone-800 text-stone-200";
        } else {
          cssClasses += " text-stone-400";
        }

        <li key={project.id}>
          <button className={cssClasses} onClick={onSelectProject}>
            {project.title}
          </button>
        </li>;
      })}
    </ul>
  </aside>
);
```

Next, output the selected Project.
Back in App.jsx:

We start by initializing our content var to:
let content = <selectedProject />;

const selectedProject = projectState.projects.find(
(project) => projectId === projectState.selectedProjectId
);

Then we need to modify:
const selectedProject = projectState.projects.find(
(project) => project.id === projectState.selectedProjectId
);

let content = <SelectedProject project={selectedProject} />;

if (projectState.selectedProjectId === null) {
content = (
<NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelProjectAddProject}
      />
);
} else if (projectState.selectedProjectId === undefined) {
content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
}

Our app return now looks like:

return (
<main className="h-screen flex gap-8">
<ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
{content}
</main>
);

Then our ProjectsSidebar looks like:
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
