import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowDown, Mail, FileText } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

export default function HeroWorkspace3D({ onExploreWork, onAboutMe }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isVisible = true;
    let animId = null;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8F7F2);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.6, 3.4, 5.4);
    camera.lookAt(0, 1.4, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Palette Materials
    const clayWhite = new THREE.MeshStandardMaterial({
      color: 0xF8F7F2,
      roughness: 0.5,
      metalness: 0.05,
    });
    const charcoal = new THREE.MeshStandardMaterial({
      color: 0x292824,
      roughness: 0.45,
      metalness: 0.2,
    });
    const deepBlack = new THREE.MeshStandardMaterial({
      color: 0x171715,
      roughness: 0.35,
      metalness: 0.3,
    });
    const khaki = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      roughness: 0.5,
      metalness: 0.1,
    });
    const sandBeige = new THREE.MeshStandardMaterial({
      color: 0xE5DCCB,
      roughness: 0.65,
      metalness: 0.05,
    });
    const deskWood = new THREE.MeshStandardMaterial({
      color: 0xDDD3C1,
      roughness: 0.6,
      metalness: 0.05,
    });

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xF8F7F2, 0.95);
    scene.add(ambientLight);

    // Warm Sunbeam streaming through the architectural window
    const sunLight = new THREE.DirectionalLight(0xFFF6E5, 1.6);
    sunLight.position.set(-6, 7, 3);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 20;
    sunLight.shadow.camera.left = -4;
    sunLight.shadow.camera.right = 4;
    sunLight.shadow.camera.top = 4;
    sunLight.shadow.camera.bottom = -4;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Subtle soft interior bounce
    const bounceLight = new THREE.DirectionalLight(0xE5DCCB, 0.5);
    bounceLight.position.set(4, 5, 4);
    scene.add(bounceLight);

    // 3. Architectural Room Structure
    const roomGroup = new THREE.Group();

    // Floor platform
    const floorGeo = new THREE.BoxGeometry(6.4, 0.2, 5.4);
    const floorMesh = new THREE.Mesh(floorGeo, sandBeige);
    floorMesh.position.set(0, 0.1, 0);
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);

    // Floor accent trim
    const trimGeo = new THREE.BoxGeometry(6.5, 0.04, 5.5);
    const trimMesh = new THREE.Mesh(trimGeo, khaki);
    trimMesh.position.set(0, 0.21, 0);
    trimMesh.receiveShadow = true;
    roomGroup.add(trimMesh);

    // Back wall
    const backWallGeo = new THREE.BoxGeometry(6.4, 3.8, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, clayWhite);
    backWall.position.set(0, 2.0, -2.6);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Left wall with architectural window opening
    const wallLeftLower = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 5.2), clayWhite);
    wallLeftLower.position.set(-3.1, 0.7, 0);
    wallLeftLower.receiveShadow = true;
    roomGroup.add(wallLeftLower);

    const wallLeftUpper = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.0, 5.2), clayWhite);
    wallLeftUpper.position.set(-3.1, 3.4, 0);
    wallLeftUpper.receiveShadow = true;
    roomGroup.add(wallLeftUpper);

    const wallLeftPillarRear = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 1.4), clayWhite);
    wallLeftPillarRear.position.set(-3.1, 2.0, -1.9);
    wallLeftPillarRear.receiveShadow = true;
    roomGroup.add(wallLeftPillarRear);

    const wallLeftPillarFront = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 1.4), clayWhite);
    wallLeftPillarFront.position.set(-3.1, 2.0, 1.9);
    wallLeftPillarFront.receiveShadow = true;
    roomGroup.add(wallLeftPillarFront);

    // Window sill & frame
    const sillGeo = new THREE.BoxGeometry(0.3, 0.06, 2.5);
    const sillMesh = new THREE.Mesh(sillGeo, khaki);
    sillMesh.position.set(-3.1, 1.3, 0);
    roomGroup.add(sillMesh);

    // Window mullions (minimalist architectural grid)
    const mullionMat = new THREE.MeshStandardMaterial({ color: 0x292824, roughness: 0.4 });
    const mullionV = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8), mullionMat);
    mullionV.position.set(-3.1, 2.05, 0);
    roomGroup.add(mullionV);

    const mullionH = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.4, 8), mullionMat);
    mullionH.rotation.x = Math.PI / 2;
    mullionH.position.set(-3.1, 2.05, 0);
    roomGroup.add(mullionH);

    // Minimalist architectural shelf on back wall
    const shelfGeo = new THREE.BoxGeometry(2.4, 0.04, 0.35);
    const shelfMesh = new THREE.Mesh(shelfGeo, khaki);
    shelfMesh.position.set(0.6, 2.8, -2.4);
    shelfMesh.receiveShadow = true;
    shelfMesh.castShadow = true;
    roomGroup.add(shelfMesh);

    // Shelf books & design artifacts
    const bookColors = [0x292824, 0xC8B99A, 0xE5DCCB, 0x171715];
    for (let i = 0; i < 4; i++) {
      const bGeo = new THREE.BoxGeometry(0.06, 0.35 + (i % 2) * 0.05, 0.24);
      const bMat = new THREE.MeshStandardMaterial({ color: bookColors[i], roughness: 0.5 });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(0.1 + i * 0.08, 3.0, -2.4);
      bMesh.castShadow = true;
      roomGroup.add(bMesh);
    }

    // Shelf ceramic sculpture
    const sculpGeo = new THREE.TorusGeometry(0.14, 0.04, 16, 24);
    const sculpMesh = new THREE.Mesh(sculpGeo, sandBeige);
    sculpMesh.position.set(1.4, 3.0, -2.4);
    sculpMesh.castShadow = true;
    roomGroup.add(sculpMesh);

    // 4. Desk and Empty Ergonomic Chair
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, 0.2, -0.2);

    // Desk surface
    const deskTopGeo = new THREE.BoxGeometry(2.6, 0.08, 1.3);
    const deskTopMesh = new THREE.Mesh(deskTopGeo, deskWood);
    deskTopMesh.position.set(0, 1.24, -0.6);
    deskTopMesh.castShadow = true;
    deskTopMesh.receiveShadow = true;
    deskGroup.add(deskTopMesh);

    // Desk legs
    const legGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.2, 12);
    const legPositions = [
      [-1.2, 0.6, -1.15],
      [1.2, 0.6, -1.15],
      [-1.2, 0.6, -0.05],
      [1.2, 0.6, -0.05],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, charcoal);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Desk leather pad
    const padGeo = new THREE.BoxGeometry(1.6, 0.01, 0.8);
    const padMesh = new THREE.Mesh(padGeo, deepBlack);
    padMesh.position.set(0, 1.285, -0.55);
    padMesh.receiveShadow = true;
    deskGroup.add(padMesh);

    roomGroup.add(deskGroup);

    // Empty Designer Chair (NO PERSON SITTING)
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, 0.2, 0.5);

    // Star base
    const chairBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16), deepBlack);
    chairBase.position.y = 0.1;
    chairGroup.add(chairBase);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.035, 0.035), deepBlack);
      spoke.position.set(Math.cos(angle) * 0.22, 0.08, Math.sin(angle) * 0.22);
      spoke.rotation.y = -angle;
      chairGroup.add(spoke);
    }

    // Stem
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12), charcoal);
    stem.position.y = 0.35;
    chairGroup.add(stem);

    // Seat cushion
    const seatMesh = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.09, 0.64), charcoal);
    seatMesh.position.y = 0.62;
    seatMesh.castShadow = true;
    seatMesh.receiveShadow = true;
    chairGroup.add(seatMesh);

    // Backrest
    const backMesh = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.72, 0.08), charcoal);
    backMesh.position.set(0, 1.05, 0.3);
    backMesh.rotation.x = 0.08;
    backMesh.castShadow = true;
    chairGroup.add(backMesh);

    roomGroup.add(chairGroup);

    // 5. Computer with Live Dynamic Code Texture
    const computerGroup = new THREE.Group();
    computerGroup.position.set(0, 1.48, -0.9);

    // Monitor stand
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.26), deepBlack);
    standBase.position.y = 0.01;
    computerGroup.add(standBase);

    const standStem = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.05), charcoal);
    standStem.position.set(0, 0.2, -0.05);
    standStem.castShadow = true;
    computerGroup.add(standStem);

    // Monitor frame
    const monitorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.88, 0.05), deepBlack);
    monitorFrame.position.set(0, 0.48, 0);
    monitorFrame.castShadow = true;
    computerGroup.add(monitorFrame);

    // Live Code Canvas
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const sctx = screenCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.minFilter = THREE.LinearFilter;

    const screenGeo = new THREE.PlaneGeometry(1.32, 0.8);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.48, 0.03);
    computerGroup.add(screenMesh);

    // Soft monitor glow
    const screenGlow = new THREE.PointLight(0xF8F7F2, 0.45, 2.6);
    screenGlow.position.set(0, 0.48, 0.2);
    computerGroup.add(screenGlow);

    roomGroup.add(computerGroup);

    // Code Editor Drawing Function
    const drawCodeEditor = (t) => {
      sctx.fillStyle = '#171715';
      sctx.fillRect(0, 0, 512, 320);

      // Tab bar
      sctx.fillStyle = '#22211E';
      sctx.fillRect(0, 0, 512, 32);

      // Active tab pill
      sctx.fillStyle = '#171715';
      sctx.fillRect(16, 4, 180, 28);
      sctx.fillStyle = '#C8B99A';
      sctx.font = '12px "JetBrains Mono", monospace';
      sctx.fillText('• HanzMagbal.tsx', 28, 22);

      // Code Lines
      sctx.font = '13px "JetBrains Mono", monospace';
      const lines = [
        { text: '// Hanz Magbal — Senior IT Student & Full-Stack Builder', color: '#85847E' },
        { text: 'const architect = {', color: '#E5DCCB' },
        { text: '  institution: "USPF Cebu",', color: '#C8B99A' },
        { text: '  focus: ["Scalable Architecture", "AI & IoT", "PWA"],', color: '#98C379' },
        { text: '  flagships: ["Realynk", "PAL", "Langor", "KlinikaHub"],', color: '#61AFEF' },
        { text: '  status: "Designing award-worthy systems",', color: '#E5C07B' },
        { text: '};', color: '#E5DCCB' },
        { text: 'export default architect;', color: '#C678DD' },
      ];

      lines.forEach((line, idx) => {
        sctx.fillStyle = line.color;
        sctx.fillText(line.text, 24, 68 + idx * 26);
      });

      // Animated blinking cursor
      if (Math.sin(t * 5) > 0) {
        sctx.fillStyle = '#C8B99A';
        sctx.fillRect(250, 244, 8, 16);
      }

      screenTexture.needsUpdate = true;
    };

    // 6. Mechanical Keyboard and Mouse
    const kbGeo = new THREE.BoxGeometry(0.72, 0.025, 0.26);
    const kbMesh = new THREE.Mesh(kbGeo, charcoal);
    kbMesh.position.set(0, 1.5, -0.52);
    kbMesh.castShadow = true;
    roomGroup.add(kbMesh);

    // Mouse
    const mouseGeo = new THREE.BoxGeometry(0.1, 0.03, 0.16);
    const mouseMesh = new THREE.Mesh(mouseGeo, charcoal);
    mouseMesh.position.set(0.48, 1.5, -0.52);
    mouseMesh.castShadow = true;
    roomGroup.add(mouseMesh);

    // 7. Architectural Desk Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-0.9, 1.48, -0.95);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.03, 20), deepBlack);
    lampGroup.add(lampBase);

    const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.42, 8), khaki);
    arm1.position.set(0.06, 0.2, 0.05);
    arm1.rotation.z = -0.3;
    lampGroup.add(arm1);

    const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.36, 8), khaki);
    arm2.position.set(0.18, 0.46, 0.1);
    arm2.rotation.z = 0.5;
    lampGroup.add(arm2);

    const shadeGeo = new THREE.ConeGeometry(0.14, 0.18, 16, 1, true);
    shadeGeo.rotateX(Math.PI);
    shadeGeo.rotateZ(-0.4);
    const shadeMesh = new THREE.Mesh(shadeGeo, charcoal);
    shadeMesh.position.set(0.32, 0.54, 0.12);
    shadeMesh.castShadow = true;
    lampGroup.add(shadeMesh);

    // Warm lamp light
    const lampLight = new THREE.PointLight(0xFCE8B2, 0.9, 3.4);
    lampLight.position.set(0.32, 0.48, 0.12);
    lampLight.castShadow = true;
    lampGroup.add(lampLight);

    roomGroup.add(lampGroup);

    // 8. Carefully Arranged Books & Technical Objects on Desk
    // Desk books stack
    const dBook1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.05, 0.44), charcoal);
    dBook1.position.set(0.95, 1.5, -0.6);
    dBook1.rotation.y = 0.15;
    dBook1.castShadow = true;
    roomGroup.add(dBook1);

    const dBook2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.045, 0.4), khaki);
    dBook2.position.set(0.96, 1.55, -0.6);
    dBook2.rotation.y = 0.05;
    dBook2.castShadow = true;
    roomGroup.add(dBook2);

    // Ceramic succulent planter
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.12, 16), sandBeige);
    pot.position.set(1.0, 1.54, -0.92);
    pot.castShadow = true;
    roomGroup.add(pot);

    const plantMat = new THREE.MeshStandardMaterial({ color: 0x5C7A5C, roughness: 0.6 });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 8), plantMat);
      const ang = (i / 5) * Math.PI * 2;
      leaf.position.set(1.0 + Math.cos(ang) * 0.03, 1.63, -0.92 + Math.sin(ang) * 0.03);
      leaf.rotation.z = Math.cos(ang) * 0.35;
      leaf.rotation.x = Math.sin(ang) * 0.35;
      roomGroup.add(leaf);
    }

    // Coffee mug on coaster
    const coaster = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.01, 16), khaki);
    coaster.position.set(-0.62, 1.485, -0.45);
    roomGroup.add(coaster);

    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.12, 16), clayWhite);
    mug.position.set(-0.62, 1.545, -0.45);
    mug.castShadow = true;
    roomGroup.add(mug);

    scene.add(roomGroup);

    // 9. Interactive Camera Glide & Damped Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 3.4;
    let targetCameraY = 2.7;
    let targetCameraZ = 4.4;
    let currentCameraX = 5.2;
    let currentCameraY = 3.6;
    let currentCameraZ = 5.8;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    container.addEventListener('pointermove', onPointerMove);

    // 10. Animation Loop with IntersectionObserver
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Subtle screen update
      drawCodeEditor(elapsed);

      // Gentle mouse parallax calculation
      const parallaxX = mouseX * 0.45;
      const parallaxY = mouseY * 0.25;

      // Smooth camera interpolation
      currentCameraX += (targetCameraX + parallaxX - currentCameraX) * 0.04;
      currentCameraY += (targetCameraY + parallaxY - currentCameraY) * 0.04;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.04;

      camera.position.set(currentCameraX, currentCameraY, currentCameraZ);
      camera.lookAt(0, 1.45, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // 11. Intersection Observer to save CPU when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 12. Responsive Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      if (animId) cancelAnimationFrame(animId);
      renderer.dispose();
      screenCanvas.remove();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#F8F7F2] overflow-hidden flex flex-col justify-between"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      />

      {/* Subtle Noise Overlay for Architectural Warmth */}
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-40" />

      {/* Editorial Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 flex-1 flex flex-col justify-between pointer-events-none">
        
        {/* Top Header Row / Kicker */}
        <div className="pointer-events-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#C8B99A]/60 backdrop-blur-md mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#171715]" />
            <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
              01 // Architectural Workspace
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk'] leading-[1.08] mb-4">
            Hi, I'm Hanz.
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-medium text-[#66635B] mt-2">
              Developer building ideas into working applications.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#66635B] max-w-xl leading-relaxed font-sans mb-8">
            {personalInfo.bio} 4th Year BSIT student at USPF specializing in scalable multi-tenant architectures, AI-integrated platforms, and production Progressive Web Apps.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                if (onExploreWork) onExploreWork();
                else document.getElementById('projects-3d')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="editorial-btn px-6 py-3 rounded-full text-sm font-semibold tracking-wide shadow-md flex items-center gap-2 cursor-pointer pointer-events-auto"
            >
              <span>Explore My Work</span>
              <ArrowDown size={14} className="rotate-[-45deg]" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                if (onAboutMe) onAboutMe();
                else document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="editorial-btn-outline px-6 py-3 rounded-full text-sm font-medium tracking-wide bg-white/60 backdrop-blur-md cursor-pointer pointer-events-auto"
            >
              About Me
            </button>
          </div>
        </div>

        {/* Bottom Bar: Professional Links & Scroll Indicator */}
        <div className="pointer-events-auto pt-10 sm:pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[#C8B99A]/30">
          
          {/* Real Professional Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors shadow-xs"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors shadow-xs"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={personalInfo.socials.email}
              className="p-2.5 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors shadow-xs"
              title="Direct Email"
              aria-label="Direct Email"
            >
              <Mail size={16} />
            </a>

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 border border-[#C8B99A]/50 text-xs font-mono font-medium text-[#292824] hover:bg-[#E5DCCB]/60 transition-colors shadow-xs"
              title="View Resume PDF"
            >
              <FileText size={14} />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Subtle Scroll Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#85847E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A] animate-ping" />
            <span>Scroll down to continue</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
