import { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
function App() {
  //state to check which component is displayed
  const [projects, setProjectsState] = useState({
    selectedProjectId: undefined,
    
    projects: []
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
        //this is a signal that we are adding a project 
      };
    });
  }

  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar />
      
      <NoProjectSelected />
    </main>
  );
}

export default App;
