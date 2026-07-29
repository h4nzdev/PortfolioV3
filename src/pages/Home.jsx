import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import SkillsMatrix from '../components/SkillsMatrix';
import Education from '../components/Education';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Projects />
      <SkillsMatrix />
      <Education />
      <Contact />
    </main>
  );
};

export default Home;
