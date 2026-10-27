import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { featuredProjects } from '../../data/portfolioData';
import { ExternalLink, Eye, ArrowDown } from 'lucide-react';
import { sound } from '../../utils/sound';

// Project image mapping
import realynkImg from '../../assets/projects/realynk/realynk1.png';
import palImg from '../../assets/projects/pal/pal1.png';
import langorImg from '../../assets/projects/langor/langor1.png';
import gtrashImg from '../../assets/projects/gtrash/gtrash1.png';
import klinikaImg from '../../assets/projects/klinkahub/k1.jpg';
import medoraImg from '../../assets/projects/medora/medora1.png';

const PROJECT_IMAGE_MAP = {
  'realynk': realynkImg,
  'pal-journeypad': palImg,
  'langor-ai': langorImg,
  'gtrash': gtrashImg,
  'klinikahub': klinikaImg,
  'medora': medoraImg,
};

export default function ProjectsBuilding3D({ onOpenProjectModal }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  const activeProject = featuredProjects[activeFloorIndex] || featuredProjects[0];

  const updateFloorRef = useRef(null);
  const prevFloorIndexRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!container || !canvas || !section) return;

    let isVisible = true;
    let animId = null;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8F7F2);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Adjusted initial camera to frame building cleanly beside the right sidebar
    camera.position.set(7.5, 4.5, 12.5);
    camera.lookAt(-0.5, 2.5, 0);

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
      roughness: 0.35,
      metalness: 0.05,
    });
    const charcoal = new THREE.MeshStandardMaterial({
      color: 0x292824,
      roughness: 0.45,
      metalness: 0.2,
    });
    const deepBlack = new THREE.MeshStandardMaterial({
      color: 0x171715,
      roughness: 0.3,
      metalness: 0.35,
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

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xF8F7F2, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF7EA, 1.5);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xE5DCCB, 0.45);
    fillLight.position.set(-10, 8, -6);
    scene.add(fillLight);

    // 3. Landscaping & Architectural Pedestal
    const basePlinth = new THREE.Mesh(
      new THREE.CylinderGeometry(9.5, 10.0, 0.4, 48),
      sandBeige
    );
    basePlinth.position.y = 0.2;
    basePlinth.receiveShadow = true;
    scene.add(basePlinth);

    const plinthRim = new THREE.Mesh(
      new THREE.TorusGeometry(9.0, 0.05, 16, 48),
      khaki
    );
    plinthRim.rotation.x = Math.PI / 2;
    plinthRim.position.y = 0.42;
    scene.add(plinthRim);

    // Architectural pathways
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xF8F7F2, roughness: 0.7 });
    for (let i = 0; i < 6; i++) {
      const paver = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.5), pathMat);
      paver.position.set(2.5 + i * 0.9, 0.42, 3.2 - i * 0.3);
      paver.rotation.y = -0.3;
      paver.receiveShadow = true;
      scene.add(paver);
    }

    // Minimal geometric planters
    [-4.5, 5.0].forEach((px) => {
      const planter = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 1.2), charcoal);
      planter.position.set(px, 0.55, 3.8);
      planter.castShadow = true;
      scene.add(planter);

      const bushMat = new THREE.MeshStandardMaterial({ color: 0x5C7A5C, roughness: 0.7 });
      const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45), bushMat);
      bush.position.set(px, 0.95, 3.8);
      bush.castShadow = true;
      scene.add(bush);
    });

    // 4. The Miniature Architectural Building
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(1.5, 0.4, 0);

    const floorHeight = 1.7;
    const towerWidth = 3.6;
    const towerDepth = 3.2;

    const floorGroups = [];
    const interactiveObjects = [];

    featuredProjects.forEach((proj, idx) => {
      const fGroup = new THREE.Group();
      const floorY = idx * floorHeight;
      fGroup.position.set(0, floorY, 0);

      // Floor slab
      const slabMesh = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth, 0.18, towerDepth),
        clayWhite
      );
      slabMesh.position.y = 0.09;
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      fGroup.add(slabMesh);

      // Floor accent belt
      const beltMat = new THREE.MeshStandardMaterial({
        color: 0xC8B99A,
        roughness: 0.3,
        emissive: 0x000000,
        emissiveIntensity: 0,
      });
      const beltMesh = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth + 0.08, 0.06, towerDepth + 0.08),
        beltMat
      );
      beltMesh.position.y = 0.09;
      fGroup.add(beltMesh);
      fGroup.beltMesh = beltMesh;

      // Pillars
      const pillarGeo = new THREE.BoxGeometry(0.2, floorHeight - 0.18, 0.2);
      const pillarPositions = [
        [-towerWidth / 2 + 0.15, floorHeight / 2, -towerDepth / 2 + 0.15],
        [towerWidth / 2 - 0.15, floorHeight / 2, -towerDepth / 2 + 0.15],
        [-towerWidth / 2 + 0.15, floorHeight / 2, towerDepth / 2 - 0.15],
        [towerWidth / 2 - 0.15, floorHeight / 2, towerDepth / 2 - 0.15],
      ];
      pillarPositions.forEach(([x, y, z]) => {
        const pillar = new THREE.Mesh(pillarGeo, charcoal);
        pillar.position.set(x, y, z);
        pillar.castShadow = true;
        fGroup.add(pillar);
      });

      // Recessed showcase alcove
      const alcoveMesh = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth - 0.5, floorHeight - 0.26, towerDepth - 0.5),
        sandBeige
      );
      alcoveMesh.position.set(0, floorHeight / 2, 0);
      alcoveMesh.receiveShadow = true;
      fGroup.add(alcoveMesh);

      // Interior warm spotlight
      const fLight = new THREE.PointLight(0xFCE8B2, 0.4, 2.8);
      fLight.position.set(0, floorHeight / 2 + 0.2, 0.7);
      fGroup.add(fLight);
      fGroup.floorLight = fLight;

      // Floor sign plaque
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 320;
      pCanvas.height = 70;
      const pctx = pCanvas.getContext('2d');
      pctx.fillStyle = '#171715';
      pctx.fillRect(0, 0, 320, 70);
      pctx.fillStyle = '#C8B99A';
      pctx.font = 'bold 15px "Space Grotesk", sans-serif';
      pctx.fillText(`0${idx + 1} // ${proj.title.split('–')[0].trim().toUpperCase()}`, 14, 30);
      pctx.fillStyle = '#85847E';
      pctx.font = '11px "JetBrains Mono", monospace';
      pctx.fillText(proj.category, 14, 52);

      const plaqueTex = new THREE.CanvasTexture(pCanvas);
      const plaqueMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.35),
        new THREE.MeshBasicMaterial({ map: plaqueTex })
      );
      plaqueMesh.position.set(0, 0.65, towerDepth / 2 + 0.02);
      fGroup.add(plaqueMesh);

      // Hitbox
      const hitbox = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth + 0.4, floorHeight, towerDepth + 0.4),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitbox.position.set(0, floorHeight / 2, 0);
      hitbox.userData = {
        isFloor: true,
        projectId: proj.id,
        floorIdx: idx,
      };
      fGroup.add(hitbox);
      interactiveObjects.push(hitbox);

      fGroup.projectId = proj.id;
      floorGroups.push(fGroup);
      buildingGroup.add(fGroup);
    });

    // Building Roof & Spire
    const totalHeight = featuredProjects.length * floorHeight;
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(towerWidth + 0.3, 0.25, towerDepth + 0.3),
      clayWhite
    );
    roof.position.set(0, totalHeight + 0.125, 0);
    roof.castShadow = true;
    buildingGroup.add(roof);

    const spire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.08, 1.8, 12),
      charcoal
    );
    spire.position.set(0, totalHeight + 1.1, 0);
    buildingGroup.add(spire);

    scene.add(buildingGroup);

    // 5. Large Presentation Billboard
    const billboardGroup = new THREE.Group();
    billboardGroup.position.set(-3.8, 0.4, 0.6);
    billboardGroup.rotation.y = Math.PI * 0.14;

    const bStand = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.0, 0.3), charcoal);
    bStand.position.y = 2.0;
    bStand.castShadow = true;
    billboardGroup.add(bStand);

    const bArm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 0.2), charcoal);
    bArm.position.set(0.6, 3.7, 0);
    billboardGroup.add(bArm);

    const frameW = 3.8;
    const frameH = 2.3;
    const bFrame = new THREE.Mesh(
      new THREE.BoxGeometry(frameW + 0.12, frameH + 0.12, 0.1),
      deepBlack
    );
    bFrame.position.set(0.6, 3.7, 0.1);
    bFrame.castShadow = true;
    billboardGroup.add(bFrame);

    // Screen texture canvas
    const bbCanvas = document.createElement('canvas');
    bbCanvas.width = 1024;
    bbCanvas.height = 640;
    const bbCtx = bbCanvas.getContext('2d');
    const bbTexture = new THREE.CanvasTexture(bbCanvas);
    bbTexture.minFilter = THREE.LinearFilter;

    const bbScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(frameW, frameH),
      new THREE.MeshBasicMaterial({ map: bbTexture })
    );
    bbScreen.position.set(0.6, 3.7, 0.16);
    bbScreen.userData = { isBillboard: true };
    interactiveObjects.push(bbScreen);
    billboardGroup.add(bbScreen);

    const bbSpot = new THREE.SpotLight(0xFFFFFF, 1.2, 10, Math.PI / 4, 0.3);
    bbSpot.position.set(0.6, 5.6, 2.8);
    bbSpot.target = bbScreen;
    billboardGroup.add(bbSpot);

    scene.add(billboardGroup);

    // Update Billboard Canvas with actual project screenshot
    const updateBillboard = (proj) => {
      bbCtx.fillStyle = '#171715';
      bbCtx.fillRect(0, 0, 1024, 640);

      const imgSrc = PROJECT_IMAGE_MAP[proj.id] || proj.images?.[0];
      if (imgSrc) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          bbCtx.drawImage(img, 20, 20, 984, 440);

          const grad = bbCtx.createLinearGradient(0, 360, 0, 480);
          grad.addColorStop(0, 'rgba(23, 23, 21, 0)');
          grad.addColorStop(1, 'rgba(23, 23, 21, 0.95)');
          bbCtx.fillStyle = grad;
          bbCtx.fillRect(20, 360, 984, 100);

          bbCtx.fillStyle = '#171715';
          bbCtx.fillRect(20, 460, 984, 160);

          bbCtx.fillStyle = '#C8B99A';
          bbCtx.font = 'bold 24px "Space Grotesk", sans-serif';
          bbCtx.fillText(proj.title, 40, 508);

          bbCtx.fillStyle = '#E5DCCB';
          bbCtx.font = '16px "Manrope", sans-serif';
          bbCtx.fillText(proj.tagline || proj.description.slice(0, 75) + '...', 40, 542);

          bbCtx.fillStyle = '#85847E';
          bbCtx.font = '13px "JetBrains Mono", monospace';
          bbCtx.fillText(proj.techStack.join('  •  '), 40, 580);

          bbTexture.needsUpdate = true;
        };
        img.src = imgSrc;
      }
    };

    updateBillboard(featuredProjects[0]);

    // 6. Camera Interpolation Targets (Framing building and billboard to the left of the sidebar)
    let targetCamPos = new THREE.Vector3(7.5, 4.2, 12.0);
    let targetLookAt = new THREE.Vector3(-0.6, 1.5, 0);
    let curLookAt = new THREE.Vector3(-0.6, 1.5, 0);

    const updateFloorFocus = (idx) => {
      if (idx < 0 || idx >= featuredProjects.length) return;
      const proj = featuredProjects[idx];

      // Update belt highlights
      floorGroups.forEach((fg, i) => {
        const isActive = i === idx;
        if (fg.beltMesh) {
          fg.beltMesh.material.color.setHex(isActive ? 0xFCE8B2 : 0xC8B99A);
          fg.beltMesh.material.emissive?.setHex(isActive ? 0xC8B99A : 0x000000);
          fg.beltMesh.material.emissiveIntensity = isActive ? 0.8 : 0;
        }
        if (fg.floorLight) {
          fg.floorLight.intensity = isActive ? 1.4 : 0.4;
        }
      });

      updateBillboard(proj);

      // Camera coordinates calculated to keep the focal floor in the clear view left of the sidebar
      const floorTargetY = 0.4 + idx * floorHeight + 0.8;
      targetCamPos.set(7.2, Math.max(3.8, floorTargetY + 1.6), 11.0);
      targetLookAt.set(-0.5, floorTargetY, 0);
    };

    updateFloorRef.current = updateFloorFocus;
    updateFloorFocus(0);

    // 7. Scroll-Driven Engine
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      setScrollPct(progress);

      const floorIdx = Math.min(
        featuredProjects.length - 1,
        Math.floor(progress * featuredProjects.length)
      );

      if (floorIdx !== prevFloorIndexRef.current) {
        prevFloorIndexRef.current = floorIdx;
        setActiveFloorIndex(floorIdx);
        updateFloorFocus(floorIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 8. Raycast Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.isFloor) {
          sound.playClick();
          const targetIdx = hit.userData.floorIdx;
          setActiveFloorIndex(targetIdx);
          updateFloorFocus(targetIdx);

          const scrollableHeight = section.offsetHeight - window.innerHeight;
          const targetY = section.offsetTop + (targetIdx / featuredProjects.length) * scrollableHeight;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else if (hit.userData.isBillboard) {
          sound.playClick();
          if (onOpenProjectModal) onOpenProjectModal(featuredProjects[prevFloorIndexRef.current].id);
        }
      }
    };

    container.addEventListener('pointerdown', onPointerDown);

    // 9. Animation Loop
    const animate = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      camera.position.lerp(targetCamPos, 0.05);
      curLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(curLookAt);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // 10. Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    // 11. Resize
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      if (animId) cancelAnimationFrame(animId);
      renderer.dispose();
      bbCanvas.remove();
    };
  }, [onOpenProjectModal]);

  const handleJumpToFloor = useCallback((idx) => {
    sound.playClick();
    setActiveFloorIndex(idx);
    if (updateFloorRef.current) {
      updateFloorRef.current(idx);
    }
    const section = sectionRef.current;
    if (section) {
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const targetY = section.offsetTop + (idx / featuredProjects.length) * scrollableHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="projects-3d"
      ref={sectionRef}
      className="relative w-full h-[320vh] bg-[#F8F7F2] border-t border-[#C8B99A]/40"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
      >
        {/* 3D WebGL Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block cursor-pointer"
          style={{ touchAction: 'pan-y' }}
        />

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 pointer-events-none bg-noise opacity-30" />

        {/* Top-Left Floating Title Pill */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 z-20 pointer-events-auto max-w-sm bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#C8B99A]/60 shadow-xs">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span className="text-[10px] font-mono font-medium text-[#292824] uppercase tracking-wider">
              03 // The Architecture of My Work
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk'] leading-tight">
            Interactive Project Tower
          </h2>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#85847E] mt-1.5">
            <span>Scroll down to ascend</span>
            <ArrowDown size={12} className="animate-bounce" />
          </div>
        </div>

        {/* Right Floating Architectural Sidebar */}
        <aside
          className="absolute right-4 sm:right-8 top-20 sm:top-24 bottom-6 sm:bottom-8 z-20 pointer-events-auto w-[calc(100vw-2rem)] sm:w-[420px] max-w-full bg-[#F8F7F2]/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-[#C8B99A]/70 shadow-2xl flex flex-col justify-between overflow-y-auto"
          aria-label="Project Tower Levels and Dossier"
        >
          {/* Top Section: Building Level Jumpers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#C8B99A]/40 pb-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] font-bold">
                Building Levels
              </span>
              <span className="text-[10px] font-mono font-bold text-[#171715] bg-[#E5DCCB]/60 px-2 py-0.5 rounded-full">
                Floor 0{activeFloorIndex + 1} of 0{featuredProjects.length}
              </span>
            </div>

            {/* Level Quick-Selector List */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 max-h-[140px] sm:max-h-[160px] overflow-y-auto pr-1">
              {featuredProjects.map((proj, idx) => {
                const isActive = idx === activeFloorIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleJumpToFloor(idx)}
                    className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#171715] text-[#F8F7F2] font-semibold shadow-xs'
                        : 'bg-white/70 hover:bg-[#E5DCCB]/60 text-[#292824] border border-[#C8B99A]/30'
                    }`}
                  >
                    <span className="truncate pr-1">
                      <span className={isActive ? 'text-[#C8B99A]' : 'text-[#85847E]'}>
                        L0{idx + 1} •{' '}
                      </span>
                      {proj.title.split('–')[0].trim()}
                    </span>
                    <span className="text-[9px] opacity-75 shrink-0 hidden sm:inline">
                      {proj.category.split('&')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle Section: Active Project Dossier */}
          <div className="space-y-3.5 pt-3 border-t border-[#C8B99A]/40 my-auto">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#85847E] mb-0.5">
                Floor 0{activeFloorIndex + 1} // {activeProject.category}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#171715] leading-snug">
                {activeProject.title}
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {activeProject.liveUrl && activeProject.liveUrl !== '#' && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-btn-outline px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5"
                >
                  <span>Visit Live</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenProjectModal) onOpenProjectModal(activeProject.id);
                }}
                className="editorial-btn px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Eye size={12} />
                <span>Full Case Study</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#292824] leading-relaxed line-clamp-4">
              {activeProject.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#85847E]">Technologies:</span>
              <div className="flex flex-wrap gap-1">
                {activeProject.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white border border-[#C8B99A]/50 text-[#171715]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: Role & Scroll Progress Bar */}
          <div className="pt-3 border-t border-[#C8B99A]/40 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#66635B]">
              <span>
                <strong>Role:</strong> {activeProject.role}
              </span>
              <span className="font-mono text-[#85847E]">
                {activeProject.images?.length || 0} Screenshots
              </span>
            </div>

            {/* Ascent Progress Bar */}
            <div className="w-full h-1.5 bg-[#E5DCCB]/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#171715] rounded-full transition-all duration-300"
                style={{ width: `${Math.round(scrollPct * 100)}%` }}
              />
            </div>
          </div>
        </aside>

      </div>
    </section>
  );
}
