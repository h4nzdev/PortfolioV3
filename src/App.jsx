import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-[#020c1b] text-[#ccd6f6] font-sans selection:bg-[#004aad] selection:text-white">
      {/* Interactive GSAP Cursor */}
      <CustomCursor />

      {/* Top Glassmorphic Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
