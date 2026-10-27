import { useState, useEffect } from 'react';
import SplashScreen from '../components/splash/SplashScreen';
import HeaderNavbar from '../components/navigation/HeaderNavbar';
import EditorialMosaicHero from '../components/hero/EditorialMosaicHero';
import AboutSection2D from '../components/about/AboutSection2D';
import ProjectsGridMotionSection from '../components/projects/ProjectsGridMotionSection';
import EducationSection2D from '../components/education/EducationSection2D';
import CertificatesSelectedSection from '../components/certificates/CertificatesSelectedSection';
import ContactArchitectural3D from '../components/contact/ContactArchitectural3D';
import ContactFormAndFooter2D from '../components/contact/ContactFormAndFooter2D';
import { ScrollProgressTopBar, SectionReveal } from '../components/common/ScrollReveal';
import BackToTop from '../components/common/BackToTop';

import ProjectModal from '../components/overlays/ProjectModal';
import CertificateModal from '../components/overlays/CertificateModal';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedCertIdx, setSelectedCertIdx] = useState(null);

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'projects',
      'education',
      'achievements',
      'contact-3d',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '-10% 0px -30% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="site"
      className="relative w-full min-h-screen bg-[#F8F7F2] text-[#171715] selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      {/* Global Scroll Progress Bar */}
      <ScrollProgressTopBar />

      {/* 0. Architectural Animated Splash Screen (Replay with [R], Skip with [ESC]) */}
      <SplashScreen />

      {/* 0. Top Fixed Header Navigation */}
      <HeaderNavbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 1. Editorial Mosaic Hero (Inspired by Reference Layout with Mockup Photos) */}
      <div className="rv">
        <EditorialMosaicHero
          onExploreWork={() => handleNavigate('projects')}
          onAboutMe={() => handleNavigate('about')}
        />
      </div>

      {/* 2. Normal About section with Horizontal Tech Stack Slider */}
      <SectionReveal className="w-full">
        <AboutSection2D />
      </SectionReveal>

      {/* 3. Full-Width React Bits <GridMotion /> Projects Showcase */}
      <SectionReveal className="w-full">
        <ProjectsGridMotionSection
          onOpenProjectModal={(projId) => setSelectedProjectId(projId)}
        />
      </SectionReveal>

      {/* 4. Normal Education section (School Timeline with Parallax) */}
      <SectionReveal className="w-full">
        <EducationSection2D />
      </SectionReveal>

      {/* 5. Selected Honors & Credentials (Full Scale Diploma with Parallax) */}
      <SectionReveal className="w-full">
        <CertificatesSelectedSection
          onOpenCertificateModal={(certIdx) => setSelectedCertIdx(certIdx)}
        />
      </SectionReveal>

      {/* 6. 3D Contact scene (Collaboration Studio 3-Stage Scrollytelling) */}
      <ContactArchitectural3D
        onScrollToContactForm={() => handleNavigate('contact')}
      />

      {/* 7. Normal Footer & Contact Portal (Conventional 2D Website Form & Footer) */}
      <SectionReveal className="w-full">
        <ContactFormAndFooter2D />
      </SectionReveal>

      {/* Case Study & Certificate Modals for Deep Inspection */}
      {selectedProjectId && (
        <ProjectModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />
      )}

      {selectedCertIdx !== null && (
        <CertificateModal
          certificateIdx={selectedCertIdx}
          onClose={() => setSelectedCertIdx(null)}
          onSelectCertificate={(idx) => setSelectedCertIdx(idx)}
        />
      )}

      {/* Floating Architectural Back to Top Action */}
      <BackToTop />

    </div>
  );
}
