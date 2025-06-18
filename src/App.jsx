import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectGallery from './pages/ProjectGallery';
import AddProject from './pages/AddProject';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectGallery />} />
        <Route path="/add-project" element={<AddProject />} />
         <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}

export default App;
