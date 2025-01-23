# Implementing Task Management in React: A Step-by-Step Guide

## 1. Creating the Task Input Component

### Understanding the State vs Ref Decision
```jsx
// ❌ Using Ref (Not Ideal for This Case)
const inputRef = useRef();
// Would violate React's principle of controlled components

// ✅ Using State (Preferred Approach)
const [enteredTask, setEnteredTask] = useState("");
```

**Why State over Ref?**
- Refs directly manipulate DOM (against React's declarative nature)
- State maintains React's control over form inputs
- Enables React to track input changes
- Allows for immediate validation and UI updates

### Initial NewTask Component Implementation
```jsx
import { useState } from "react";

export default function NewTask() {
  const [enteredTask, setEnteredTask] = useState("");

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button className="text-stone-700 hover:text-stone-950">
        Add Tasks
      </button>
    </div>
  );
}
```

## 2. Understanding Prop Drilling

### Visual Representation of Prop Drilling Flow
```
App.jsx
└─► SelectedProject
    └─► Tasks
        └─► NewTask

handleAddTask() flows: App → SelectedProject → Tasks → NewTask
```

### Why Prop Drilling?
- State needs to be managed at the top level (App.jsx)
- Tasks are related to specific projects
- Components need to communicate up the component tree
- Common in smaller applications without state management libraries

## 3. Implementing Prop Drilling Step by Step

### Step 1: App.jsx (Top Level)
```jsx
let content = (
  <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}    // New prop
    onDeleteTask={handleDeleteTask}  // New prop
  />
);
```
- Starting point of prop drilling
- Defines handlers at the highest needed level
- Passes functions down as props

### Step 2: SelectedProject Component
```jsx
export default function SelectedProject({ 
  project, 
  onDelete, 
  onAddTask, 
  onDeleteTask 
}) {
  return (
    // ...
    <Tasks 
      onAdd={onAddTask}
      onDelete={onDeleteTask}
    />
  );
}
```
- Acts as a pass-through component
- Forwards props to child components
- Doesn't use the props directly

### Step 3: Tasks Component
```jsx
import NewTask from "./NewTask.jsx";

export default function Tasks({onAdd, onDelete}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd}/>
      <p className="text-stone-800 my-4">
        This project does not have any tasks yet.
      </p>
      <ul></ul>
    </section>
  );
}
```
- Intermediary component
- Passes `onAdd` to NewTask
- Keeps `onDelete` for future task deletion

### Step 4: Final NewTask Implementation
```jsx
import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === "") return; // Validation
    onAdd(enteredTask);        // Forward to App component
    setEnteredTask("");        // Clear input field
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        value={enteredTask}
        onChange={handleChange}
      />
      <button 
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
```

## 4. Important Implementation Details

### Controlled Component Pattern
```jsx
<input
  value={enteredTask}
  onChange={handleChange}
/>
```
- Input value controlled by React state
- Changes flow through onChange handler
- Enables immediate validation and UI updates

### Task Validation
```jsx
if (enteredTask.trim() === "") return;
```
- Prevents empty tasks
- Trims whitespace
- Early return pattern

### State Reset
```jsx
setEnteredTask(""); // After successful task addition
```
- Clears input after task is added
- Provides good user experience
- Prevents duplicate submissions

## 5. Prop Drilling Considerations

### Advantages
- Simple to implement
- Clear data flow
- Works well for small applications
- No additional dependencies

### Disadvantages
- Components become tightly coupled
- Makes component reuse harder
- Can become unwieldy in larger applications
- Intermediate components must forward props they don't use

### Future Improvements
- Consider state management libraries (Redux, Context API)
- Could use React Context for widely needed values
- Component composition could reduce prop drilling
- Custom hooks could centralize related logic

## Next Steps
1. Implement `handleAddTask` in App.jsx
2. Add task deletion functionality
3. Connect tasks to specific projects
4. Add task completion status
5. Implement task persistence

This implementation establishes the foundation for task management while demonstrating important React concepts like prop drilling, controlled components, and state management. The next section will cover implementing the actual task management logic in App.jsx.