import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-[#F8F7F2] text-[#151515] font-sans selection:bg-[#C8B99A] selection:text-[#151515]">
      {/* Precision Tactile Cursor */}
      <CustomCursor />

      {/* Main Content Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
};

export default App;
