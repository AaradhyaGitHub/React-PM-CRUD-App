# Outsourcing Button Component & Implementing NoProjectSelected

## Overview

This document explains the creation of the `NoProjectSelected.jsx` component and the refactoring of buttons into a reusable `Button.jsx` component. The goal is to improve maintainability by reusing a common button component across different parts of the application.

## 1. Creating `NoProjectSelected.jsx`

We introduced a new `NoProjectSelected.jsx` component to provide a default UI when no project is selected. This component includes an image, a heading, descriptive text, and a button for creating a new project.

### `NoProjectSelected.jsx`

```jsx
import noProjectImage from "../assets/no-projects.png";
import Button from "./Button.jsx";

export default function NoProjectSelected() {
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
        <Button>
          Create New Project
        </Button>
      </p>
    </div>
  );
}
```

### Tailwind CSS Utility Classes Used

**`<div>`:**
- `mt-24` → Adds a top margin of `6rem` (96px).
- `text-center` → Centers the text content.
- `w-2/3` → Sets the width to two-thirds of the parent container.

**`<img>`:**
- `w-16 h-16` → Sets width and height to `4rem` (64px).
- `object-contain` → Ensures the image scales while maintaining aspect ratio.
- `mx-auto` → Centers the image horizontally.

**`<h2>`:**
- `text-xl` → Sets the font size to `1.25rem` (20px).
- `font-bold` → Applies bold font weight.
- `text-stone-500` → Sets the text color to a medium gray shade.
- `mt-4 my-4` → Adds vertical spacing.

**`<p>` (Description):**
- `text-stone-400` → Applies a lighter gray color.
- `mb-4` → Adds a bottom margin of `1rem` (16px).

**`<p>` (Button Container):**
- `mt-8` → Adds a top margin of `2rem` (32px).

---

## 2. Dynamic Image Sourcing

The `src` attribute of the `<img>` tag is dynamically set using:

```jsx
import noProjectImage from "../assets/no-projects.png";
```

This allows Webpack (or another bundler) to correctly handle and optimize the image.

---

## 3. Creating `Button.jsx`

Since we use similar styled buttons in both `NewProject.jsx` and `ProjectsSidebar.jsx`, we outsourced the button component for reusability.

### `Button.jsx`

```jsx
export default function Button({ children, ...props }) {
  return (
    <button {...props} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
      {children}
    </button>
  );
}
```

### Why Accept `{...props}`?

By including `{...props}` in the `<button>` element, we allow additional properties such as `onClick` handlers to be passed dynamically when using this component.

---

## 4. Implementing `Button.jsx` in `ProjectsSidebar.jsx` & `NoProjectSelected.jsx`

Now that we have the `Button` component, we update `ProjectsSidebar.jsx` and `NoProjectSelected.jsx` to use it.

### `ProjectsSidebar.jsx`

```jsx
import Button from "./Button.jsx";

export default function ProjectSidebar() {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
          <Button>+ Add Project</Button>
      </div>
      <ul></ul>
    </aside>
  );
}
```

### `NoProjectSelected.jsx`

```jsx
<Button>
  Create New Project
</Button>
```

---

## Correct Usage of `{...props}` in JSX

Consider the difference between these two approaches:

### ❌ Incorrect
```jsx
<Button>{...props}{children}</Button>
```

- Here, `{...props}` is placed inside the opening and closing `<Button>` tags. However, props should be spread into the actual `<button>` element inside `Button.jsx`, not treated as children.

### ✅ Correct
```jsx
<Button {...props}>{children}</Button>
```

- `{...props}` is correctly passed to the `<button>` element inside `Button.jsx`, allowing all attributes (like `onClick`) to be applied properly.

This ensures the component remains flexible while keeping `children` (the button text or elements) separate from props.

---

## Final `App.jsx`

Now, the updated `App.jsx` looks like this:

```jsx
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar />
      <NoProjectSelected />
    </main>
  );
}

export default App;
```

---

## Conclusion

- We introduced `NoProjectSelected.jsx` to display a default UI when no project is selected.
- The image in `NoProjectSelected.jsx` is dynamically sourced.
- We refactored buttons into a reusable `Button.jsx` component.
- We updated `ProjectsSidebar.jsx` and `NoProjectSelected.jsx` to use `Button.jsx`.
- We clarified the correct way to pass `{...props}` in JSX components.

