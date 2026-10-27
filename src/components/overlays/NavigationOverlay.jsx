import { useState } from 'react';
import { Volume2, VolumeX, FileText, Send } from 'lucide-react';
import { sound } from '../../utils/sound';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

const SCENES = [
  { id: 1, name: 'WORKSPACE', progress: 0.02 },
  { id: 2, name: 'ABOUT', progress: 0.22 },
  { id: 3, name: 'PROJECTS', progress: 0.45 },
  { id: 4, name: 'ACHIEVEMENTS', progress: 0.65 },
  { id: 5, name: 'EDUCATION', progress: 0.78 },
  { id: 6, name: "LET'S TALK", progress: 0.94 },
];

export default function NavigationOverlay({ activeScene, onJumpToProgress, onOpenContact }) {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleSceneClick = (progress) => {
    sound.playClick();
    if (onJumpToProgress) onJumpToProgress(progress);
  };

  const activeSceneData = SCENES.find((s) => s.id === activeScene) || SCENES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 pointer-events-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand & Active Scene Pill */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => handleSceneClick(0.00)}
            className="text-lg md:text-xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk'] hover:opacity-75 transition-opacity"
          >
            h4nz<span className="text-[#C8B99A]">.dev</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/60 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider font-semibold text-[#292824]">
              0{activeSceneData.id} // {activeSceneData.name}
            </span>
          </div>
        </div>

        {/* Center: Story Scene Waypoint Jumpers (Desktop) */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 border border-[#C8B99A]/50 backdrop-blur-md shadow-xs">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => handleSceneClick(scene.progress)}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-full transition-all ${
                activeScene === scene.id
                  ? 'bg-[#171715] text-[#F8F7F2] shadow-sm'
                  : 'text-[#85847E] hover:text-[#171715] hover:bg-[#E5DCCB]/50'
              }`}
              title={`Jump to Scene 0${scene.id}: ${scene.name}`}
            >
              0{scene.id} {scene.name}
            </button>
          ))}
        </nav>

        {/* Right: Sound Toggle, Resume & Contact Buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#292824] hover:bg-[#E5DCCB]/50 transition-all backdrop-blur-md shadow-xs"
            title={isMuted ? 'Enable tactile sound effects' : 'Mute sound effects'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-[#171715]" />}
          </button>

          {/* Resume Download */}
          <a
            href={resumePdf}
            download="Hanz_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#C8B99A]/50 text-xs font-mono font-medium text-[#292824] hover:bg-[#E5DCCB]/50 transition-all backdrop-blur-md shadow-xs"
            title="Download Hanz's Resume PDF"
          >
            <FileText size={14} />
            <span>CV</span>
          </a>

          {/* Contact Button */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenContact) onOpenContact();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono font-medium hover:bg-[#292824] transition-all shadow-xs"
          >
            <Send size={13} />
            <span>CONNECT</span>
          </button>
        </div>

      </div>
    </header>
  );
}
