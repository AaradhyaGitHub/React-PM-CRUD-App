# Styling and Functionality of the NewProject and Modal Components

We styled **NewProject** components with the same rules as the **NoProjectSelected** component. This ensures consistent design across the application.

## Custom Button Component in Modal

We use a custom button component in our modal. Here is how the modal is structured:

```jsx
<Modal ref={modal} buttonCaption="Okay">
  <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">Invalid Input</h2>
  <p className="text-stone-600 mb-4">You forgot to enter a value :(</p>
  <p className="text-stone-600 mb-4">Please fill every input field :)</p>
</Modal>

<form method="dialog" className="mt-4 text-right">
  <Button>{buttonCaption}</Button>
</form>
```

## Styling the Modal Component

The modal component is styled using Tailwind CSS classes for a clean, modern look. Here is the styling:

```jsx
<dialog
  ref={dialog}
  className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
>
```

## Handling Cancel Button in NewProject Component

When the **Cancel** button in the **NewProject** component is clicked, we update the state in **App.jsx** to reset the selected project. This involves transitioning the `selectedProjectId` to an `undefined` state.

### Updating State in App.jsx

To handle the cancel action, we added this function:

```jsx
function handleCancelProjectAddProject() {
  setProjectState((prevState) => ({
    ...prevState,
    selectedProjectId: undefined
  }));
}
```

This function modifies the `selectedProjectId` to `undefined`, effectively resetting the selected project.

### Handling Add Project

The **Add Project** function remains largely the same but sets `selectedProjectId` to `null` instead:

```jsx
function handleStartAddProject() {
  setProjectState((prevState) => ({
    ...prevState,
    selectedProjectId: null
  }));
}
```

## Passing Functions to NewProject Component

The cancel and add functions are passed as props to the **NewProject** component:

```jsx
<NewProject onAdd={handleAddProject} onCancel={handleCancelProjectAddProject} />
```

## Accepting Props in NewProject Component

Inside the **NewProject** component, the `onAdd` and `onCancel` props are accepted like this:

```jsx
export default function NewProject({ onAdd, onCancel }) {
```

## Calling the Cancel Function on Button Click

Finally, the cancel function is triggered when the cancel button is clicked:

```jsx
<button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
  Cancel
</button>
```

## Up to Date Code Sections

### Final App.jsx code:

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

  function handleCancelProjectAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  let content;

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

  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
```

### Final Modal.jsx code:

```jsx
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button.jsx";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}

      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
```

### Final NewProject.jsx code:

```jsx
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
import { useRef } from "react";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">
          Invalid Input
        </h2>
        <p className="text-stone-600 mb-4">You forgot to enter a value :( </p>
        <p className="text-stone-600 mb-4">Please fill every input field :)</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
```
