New Project Compoenent:
We need a way of collecting user Input
i.e <Input> Componenets

We can use onChange on the three Input COmpoenents and update the state on every key stroke and update
it that way. That's one possible appraoch

But we really only want to read the value when we click the save, we don;t have to add or manage all that state

we can use Refs to connect to HTML elements:

Import useRef
titleRef = useRef();
const title = useRef();
const description = useRef();
const dueDate = useRef();

This may not work as input is a built in component not a custom compoenent

ref={title} --> might not work depending on the React version. It will work on React v19 and above
<Input ref = {title} label="Title" />

So we have to modify the Input.jsx:
import { forwardRef } from "react";

const Input = forwardRef(function Input({ textarea, label, ...props }, ref) {
const classes =
"w-full p-1 border-b-2px rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
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

we acecpt ref as the second parameter...
now we can go totextarea and input and set it to the above incoming ref as such:
<textarea ref={ref} className={classes} {...props} />
<input ref={ref} className={classes} {...props} />

This component function now receives the ref parameter

with that, we can add the special refs prop
it's built in to built in html tags

Now in NewProject, we can accept it:
<Input ref = {title}label="Title" />
<Input ref = {description}label="Description" textarea >
<Input ref = {dueDate}label="Due Date" />

we can also create a handleSave function
function handleSave(){

    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value

}

this could be referring to either input or text area as seen in out Input file 

That's why we use title.current.value 

This function is linked to the save button so we link it using button's onClick event listener:
<button 
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 "
          onClick={handleSave}
          >

Now we need to pass this data to App compoenent 
Because that's where we add our projects and we want to manage it there in the projects array 

Then we'll pass it to the ProjetsSidebar in the App.jsx later 

So we create this handleAddProject function.
In this function:
    1. We call the state updating function 
    2. We use  the function form since we update state based on the old state 
    3. return a new object by:
        - Spreading existing state 
        - and we update the projects array without losing the old state 
            - we use ...prevState.projects for that 
    4. Then we go back up again to declare a newProject variable.
    5. It will be an object that will contain title, description and dudeDate 
    6. But to simplify it, we can just expect the function to expect a object say projectData
    7. Then we simply spread that object in the newProjects object variable 
    8. Plus we add an id of Math.random() which will help us later 
    Note: Math.random() theoretically could generate 2 same numbers but it's fine for our small purpose 
    9. Finally, we can add newProject as new project item to the projects array


CODE: 

function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random()
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      };
    });
  }


Now, handleAddProject should be invoked from inside the NewProject component as it has the handleSave function in it. 

So back in NewProject, we acept a new prop...
export default function NewProject({onAdd}) 

Then we call this in our handleSave function: 

function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = des.current.value;
    const enteredDueDate = dueDate.current.value;

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });
  }

that's the object that we are expecting on the App component

Then we update the App component 
content = <NewProject onAdd={handleAddProject}/>;







[Previous sections remain the same until Form Management with useRef]

## Form Management with useRef - Implementation Notes

### Understanding Our Approach

> 💡 **Key Decision**: We chose Refs over state management for form inputs. Here's why:
>
> "We can use onChange on the three Input Components and update the state on every key stroke... That's one possible approach. But we really only want to read the value when we click save, we don't have to add or manage all that state"

### Setting Up useRef

```jsx
import { useRef } from "react";

// Create refs for each input
const title = useRef();
const description = useRef();
const dueDate = useRef();
```

> 💡 **Important Note**: "This may not work as input is a built in component not a custom component"
>
> The solution? We need to use forwardRef!

### Creating a Custom Input Component with forwardRef

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
```

> 💡 **Implementation Note**: "we accept ref as the second parameter... now we can go to textarea and input and set it to the above incoming ref"

### Using the Custom Input Component

```jsx
<Input ref={title} label="Title" />
<Input ref={description} label="Description" textarea />
<Input ref={dueDate} label="Due Date" />
```

### Handling Form Submission

```jsx
function handleSave() {
  const enteredTitle = title.current.value;
  const enteredDescription = description.current.value;
  const enteredDueDate = dueDate.current.value;

  onAdd({
    title: enteredTitle,
    description: enteredDescription,
    dueDate: enteredDueDate
  });
}
```

> 💡 **Important Detail**: "this could be referring to either input or text area as seen in our Input file. That's why we use title.current.value"

### Project Data Management Process

> 💡 **Step-by-Step Process**:
> 1. Call the state updating function
> 2. Use function form for state updates based on old state
> 3. Return new object by:
>    - Spreading existing state
>    - Updating projects array while preserving old state
> 4. Declare newProject variable
> 5. Expect projectData object
> 6. Spread projectData in newProjects
> 7. Add unique id using Math.random()
> 8. Add newProject to projects array

```jsx
function handleAddProject(projectData) {
  const newProject = {
    ...projectData,
    id: Math.random()  // Note: "theoretically could generate 2 same numbers but fine for our small purpose"
  };
  setProjectState((prevState) => {
    return {
      ...prevState,
      projects: [...prevState.projects, newProject]
    };
  });
}
```

### Component Communication

In NewProject component:
```jsx
export default function NewProject({ onAdd }) {
  // ... refs setup ...

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });
  }
}
```

In App component:
```jsx
content = <NewProject onAdd={handleAddProject}/>;
```

> 💡 **Final Note**: "Now we need to pass this data to App component because that's where we add our projects and we want to manage it there in the projects array. Then we'll pass it to the ProjectsSidebar in the App.jsx later"

## Implementation Summary

1. **Form Management Strategy**
   - Chose useRef over onChange handlers
   - Only read values when needed (on save)
   - No unnecessary state management

2. **Component Architecture**
   - Custom Input component with forwardRef
   - NewProject component manages form data collection
   - App component handles data persistence

3. **Data Flow**
   - Form values captured via refs
   - Collected on save action
   - Passed to App component
   - Added to projects array in state

[Rest of the documentation remains the same]