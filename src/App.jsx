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
