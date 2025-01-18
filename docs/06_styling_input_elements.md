# Styling Input Elements in NewProject

## Overview

This document highlights the Tailwind CSS utility classes applied to the `NewProject` and `Input` components.

## Purpose

The purpose of these styling changes is to:

- Structure the layout of the `NewProject` component.
- Style buttons for better user interaction.
- Enhance input elements with proper spacing, borders, and focus states.

## Code

### `NewProject.jsx`

```jsx
import Input from "./Input.jsx";
export default function NewProject() {
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
            Save
          </button>
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

#### Tailwind CSS Utility Classes Used

**`<div>` (Wrapper):**
- `w-[35rem]` → Sets the width to 35rem (560px).
- `mt-16` → Adds a top margin of 4rem (64px).

**`<menu>` (Button Container):**
- `flex` → Enables flexbox layout.
- `items-center` → Aligns items vertically at the center.
- `justify-end` → Aligns content to the end (right-aligned).
- `gap-4` → Adds a 1rem (16px) gap between child elements.
- `my-4` → Adds a vertical margin of 1rem (16px).

**`<button>` (Cancel Button):**
- `text-stone-800` → Sets text color to dark gray.
- `hover:text-stone-950` → Changes text color to an even darker gray on hover.

**`<button>` (Save Button):**
- `px-6` → Adds horizontal padding of 1.5rem (24px).
- `py-2` → Adds vertical padding of 0.5rem (8px).
- `rounded-md` → Applies medium border radius.
- `bg-stone-800` → Sets background to dark gray.
- `text-stone-50` → Sets text color to near white.
- `hover:bg-stone-950` → Changes background to a darker gray on hover.

### `Input.jsx`

```jsx
export default function Input({ textarea, label, ...props }) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea className={classes} {...props} />
      ) : (
        <input className={classes} {...props} />
      )}
    </p>
  );
}
```

#### Tailwind CSS Utility Classes Used

**`<p>` (Input Wrapper):**
- `flex` → Enables flexbox layout.
- `flex-col` → Stacks child elements in a column.
- `gap-1` → Adds a 0.25rem (4px) gap between elements.
- `my-4` → Adds a vertical margin of 1rem (16px).

**`<label>` (Input Label):**
- `text-sm` → Sets font size to small (0.875rem, 14px).
- `font-bold` → Makes text bold.
- `uppercase` → Converts text to uppercase.
- `text-stone-500` → Sets text color to medium gray.

**`<input>` and `<textarea>` (Input Fields):**
- `w-full` → Sets width to 100% of the parent container.
- `p-1` → Adds 0.25rem (4px) padding.
- `border-b-2` → Adds a 2px bottom border.
- `rounded-sm` → Applies small rounding to corners.
- `border-stone-300` → Sets border color to light gray.
- `bg-stone-200` → Sets background color to a very light gray.
- `text-stone-600` → Sets text color to medium-dark gray.
- `focus:outline-none` → Removes default outline when focused.
- `focus:border-stone-600` → Changes border color to a darker gray when focused.

