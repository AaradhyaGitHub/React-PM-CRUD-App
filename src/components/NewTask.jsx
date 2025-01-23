import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState(""); // ✅ Initialize as an empty string

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === "") return; // ✅ Prevent empty tasks
    onAdd(enteredTask);
    setEnteredTask(""); // ✅ Properly clear the input
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        value={enteredTask} // ✅ Controlled input
        onChange={handleChange}
      />
      <button 
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick} // ✅ Add click handler
      >
        Add Task
      </button>
    </div>
  );
}
