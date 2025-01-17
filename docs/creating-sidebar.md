# Sidebar Implementation for CRUD App

## Overview

This document covers the implementation of a sidebar for the CRUD app. The sidebar will display project buttons linked with tasks and allow for adding new projects.

## Purpose

The purpose of this sidebar is to:

- Display project buttons that link to their respective tasks.
- Allow users to add new projects directly from the sidebar.

## Code

** `ProjectSidebar.jsx` **

```jsx
export default function ProjectSidebar() {
  return (
    <aside>
      <h2>Your Projects</h2>
      <div>
        <button>+ Add Project</button>
      </div>
      <ul></ul>
    </aside>
  );
}
```

** `App.jsx` **

```jsx
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
function App() {
  return (
    <main className="h-screen">
      <ProjectsSidebar />
    </main>
  );
}

export default App;
```

## Breakdown

### Folder Structure:

A components/ folder was added inside the src/ folder to keep the components organized.

### ProjectSidebar.jsx:

A new component called ProjectSidebar.jsx was created for the sidebar. This component will render the list of project buttons.

### App.jsx Updates:

1. Imported ProjectSidebar.jsx into App.jsx to integrate it into the main layout of the app.
2. Added the main component as the outermost wrapper for the app.
3. Rendered the ProjectSidebar component inside the wrapper to display the sidebar alongside the main content.

## Comments/Notes:

N/A
