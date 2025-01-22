# Adding Tasks to a Selected Project

## Objective
Enhance the project management application by adding a task management feature within the selected project.

---

## Step 1: Creating the `Tasks.jsx` Component
First, we create a new `Tasks.jsx` file inside the `components/` folder. This component will serve as a container for displaying tasks associated with a selected project.

```jsx
export default function Tasks() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <p className="text-stone-800 mb-4">
        This project does not have any tasks yet.
      </p>
      <ul></ul>
    </section>
  );
}
```

### Explanation of Tailwind Classes:
- `text-2xl`: Sets the text size to extra-large.
- `font-bold`: Makes the text bold.
- `text-stone-700`: Sets the text color to a dark gray shade.
- `mb-4`: Adds bottom margin spacing.
- `text-stone-800`: Sets a slightly darker gray color for the paragraph.

---

## Step 2: Importing `Tasks.jsx` into `SelectedProject.jsx`
Now, we integrate `Tasks.jsx` into the `SelectedProject` component.

### Current `SelectedProject.jsx`:

```jsx
import Tasks from "./Tasks.jsx";

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
          <button className="text-stone-600 hover:text-stone-950" onClick={onDelete}>
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks />
    </div>
  );
}
```

### Explanation of Tailwind Classes:
- `w-[35rem]`: Sets the width of the component to 35rem.
- `mt-16`: Adds top margin spacing.
- `pb-4 mb-4`: Adds padding and margin to the bottom of the header.
- `border-b-2 border-stone-300`: Creates a bottom border with a light gray color.
- `flex items-center justify-between`: Aligns elements horizontally with space between.
- `text-3xl font-bold text-stone-600 mb-2`: Styles the project title.
- `hover:text-stone-950`: Changes the delete button color on hover.
- `text-stone-400`: Styles the formatted date text.
- `whitespace-pre-wrap`: Preserves whitespace formatting in the project description.

---

## Step 3: Creating `NewTask.jsx`
To allow users to add new tasks, we create a `NewTask.jsx` file in the `components/` folder.

```jsx
export default function NewTask() {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
  );
}
```

### Explanation of Tailwind Classes:
- `flex items-center gap-4`: Aligns the input and button horizontally with spacing.
- `w-64`: Sets the width of the input field.
- `px-2 py-1`: Adds padding inside the input field.
- `rounded-sm`: Applies slight rounding to input corners.
- `bg-stone-200`: Sets a light gray background color.
- `text-stone-700 hover:text-stone-950`: Styles the button and changes its color on hover.

---

## Conclusion
Now, we have successfully integrated a basic task management feature within our selected project component. The next step would be implementing functionality to add, display, and manage tasks dynamically.

