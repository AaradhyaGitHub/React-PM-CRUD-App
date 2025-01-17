# Sidebar Implementation for CRUD App

## Overview

This document covers the implementation of a sidebar for the CRUD app. The sidebar will display project buttons linked with tasks and allow for adding new projects.

## Purpose

The purpose of this sidebar is to:

- Display project buttons that link to their respective tasks.
- Allow users to add new projects directly from the sidebar.

## Code

### `ProjectSidebar.jsx`

```jsx
export default function ProjectSidebar() {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
          + Add Project
        </button>
      </div>
      <ul></ul>
    </aside>
  );
}
```

#### Tailwind CSS Utility Classes Used

**`<aside>`:**

- `w-1/3` → Sets the width to one-third of the parent container.
- `px-8` → Adds horizontal padding of `2rem` (32px).
- `py-16` → Adds vertical padding of `4rem` (64px).
- `bg-stone-900` → Sets the background color to a dark gray shade.
- `text-stone-50` → Sets the text color to a light gray shade.
- `md:w-72` → Changes the width to `18rem` (288px) on medium screens and above.
- `rounded-r-xl` → Applies extra-large rounding to the right border.

**`<h2>`:**

- `mb-8` → Adds a bottom margin of `2rem` (32px).
- `font-bold` → Sets the font weight to bold.
- `uppercase` → Transforms the text to uppercase.
- `md:text-xl` → Sets the font size to `1.25rem` (20px) on medium screens and above.
- `text-stone-200` → Sets the text color to a medium-light gray shade.

**`<button>`:**

- `px-4` → Adds horizontal padding of `1rem` (16px).
- `py-2` → Adds vertical padding of `0.5rem` (8px).
- `text-xs` → Sets the font size to `0.75rem` (12px).
- `md:text-base` → Sets the font size to `1rem` (16px) on medium screens and above.
- `rounded-md` → Applies medium rounding to the borders.
- `bg-stone-700` → Sets the background color to a medium gray shade.
- `text-stone-400` → Sets the text color to a light-medium gray shade.
- `hover:bg-stone-600` → Changes the background color to a slightly lighter gray when hovered.
- `hover:text-stone-100` → Changes the text color to a near-white shade when hovered.

### `App.jsx`

```jsx
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
function App() {
  return (
    <main className="h-screen my-8"> 
      <ProjectsSidebar />
    </main>
  );
}

export default App;
```

#### Tailwind CSS Utility Classes Used

**`<main>`:**

- `h-screen` → Sets the height to 100% of the viewport.
- `my-8` → Adds vertical margin of `2rem` (32px) to the top and bottom.
