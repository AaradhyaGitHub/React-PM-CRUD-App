# Input and NewProject Components Implementation

## Overview

This document outlines the implementation of the `Input` and `NewProject` components for the CRUD app, along with their integration into the `App` component. The goal is to streamline form creation and avoid repetition using a reusable `Input` component.

---

## Code

### `Input.jsx`

```jsx
export default function Input({ textarea, label, ...props }) {
  return (
    <p>
      <label>{label}</label>
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </p>
  );
}
```

#### Explanation:

- **Props:**
  - `label`: Specifies the text for the input's label.
  - `textarea`: Determines whether a `<textarea>` or an `<input>` is rendered.
  - `...props`: Spreads additional properties like `value`, `required`, `placeholder`, etc., onto the element.
- **Functionality:**
  - If `textarea` is passed, a `<textarea>` is rendered; otherwise, a default `<input>` is rendered.
  - Each input or textarea is wrapped in a `<p>` for styling consistency.

---

### `NewProject.jsx`

```jsx
import Input from "./Input.jsx";

export default function NewProject() {
  return (
    <div>
      <menu>
        <li>
          <button>Cancel</button>
        </li>
        <li>
          <button>Create</button>
        </li>
      </menu>
      <div>
        <Input label="Title" />
        <Input label="Description" textarea />
        <Input label="Due Date" />
      </div>
    </div>
  );
}
```

#### Explanation:

- **Structure:**
  - A `<menu>` is used for action buttons (`Cancel` and `Create`).
  - The inputs for `Title`, `Description`, and `Due Date` are generated using the `Input` component.
- **Reasoning:**
  - Using the `Input` component prevents repetition and ensures consistency in styling and behavior.
- **Alternatives:**
  - Initially, each input was manually rendered:

    ```jsx
    <div>
      <label>Title</label>
      <input type="text" />

      <label>Description</label>
      <textarea></textarea>

      <label>Due Date</label>
      <input type="date" />
    </div>
    ```

  - This approach was replaced by the `Input` component to avoid redundancy.

---

### `App.jsx`

```jsx
import NewProject from "./components/NewProject.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  return (
    <main className="h-screen flex gap-8"> 
      <ProjectsSidebar />
      <NewProject />
    </main>
  );
}

export default App;
```

#### Tailwind CSS Utility Classes Used

**`<main>`:**

- `h-screen` → Sets the height to 100% of the viewport.
- `flex` → Enables flexbox layout for child components.
- `gap-8` → Adds a gap of `2rem` (32px) between child components.

---

## Conclusion

The `Input` component streamlines the creation of labeled input fields and textareas, while the `NewProject` component organizes the inputs and action buttons into a clean structure. The integration into `App.jsx` ensures a responsive layout with proper spacing using Tailwind CSS. Let me know if you need further refinements!
