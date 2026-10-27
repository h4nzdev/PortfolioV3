import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { featuredProjects } from '../../data/portfolioData';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, ExternalLink, Code2 } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function ProjectsSculpturalShowcase3D({ onOpenProjectModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const sceneElementsRef = useRef(null);

  const activeProject = featuredProjects[activeIdx] || featuredProjects[0];

  // Switch project handler with sound and 3D reaction
  const handleSelectProject = useCallback((idx) => {
    sound.playClick();
    setActiveIdx(idx);

    // Trigger subtle 3D reaction
    if (sceneElementsRef.current && sceneElementsRef.current.pulseRock) {
      sceneElementsRef.current.pulseRock();
    }
  }, []);

  const handleNext = useCallback(() => {
    handleSelectProject((activeIdx + 1) % featuredProjects.length);
  }, [activeIdx, handleSelectProject]);

  const handlePrev = useCallback(() => {
    handleSelectProject((activeIdx - 1 + featuredProjects.length) % featuredProjects.length);
  }, [activeIdx, handleSelectProject]);

  // Three.js 3D Sculptural Monolith Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isVisible = true;
    let animId = null;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.2);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Master Group for the entire floating sculpture
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xF8F7F2, 0.9);
    scene.add(ambientLight);

    const keySun = new THREE.DirectionalLight(0xFFF2DC, 2.4);
    keySun.position.set(4, 7, 5);
    keySun.castShadow = true;
    keySun.shadow.mapSize.width = 1024;
    keySun.shadow.mapSize.height = 1024;
    scene.add(keySun);

    const rimLight = new THREE.DirectionalLight(0xC8B99A, 1.8);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const crystalGlowLight = new THREE.PointLight(0xFFE4BC, 2.2, 5);
    crystalGlowLight.position.set(0, 1.2, 0.2);
    masterGroup.add(crystalGlowLight);

    // 3. Materials
    const marbleRockMat = new THREE.MeshStandardMaterial({
      color: 0xFAF8F5,
      roughness: 0.38,
      metalness: 0.05,
      flatShading: true,
    });

    const goldVeinMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.25,
      metalness: 0.85,
    });

    const roseCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xF7D8E2,
      transmission: 0.85,
      opacity: 0.95,
      transparent: true,
      roughness: 0.12,
      ior: 1.54,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const whiteCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.88,
      opacity: 0.95,
      transparent: true,
      roughness: 0.08,
      ior: 1.55,
      clearcoat: 1.0,
    });

    const amberCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xFDE3BA,
      transmission: 0.82,
      opacity: 0.95,
      transparent: true,
      roughness: 0.14,
      ior: 1.52,
      clearcoat: 1.0,
    });

    const mossDarkMat = new THREE.MeshStandardMaterial({
      color: 0x2E3E28,
      roughness: 0.9,
      metalness: 0.0,
    });

    const mossLightMat = new THREE.MeshStandardMaterial({
      color: 0x485E3B,
      roughness: 0.85,
      metalness: 0.0,
    });

    const floralStemMat = new THREE.MeshStandardMaterial({
      color: 0x8C7A5A,
      roughness: 0.4,
      metalness: 0.4,
    });

    const flowerRoseMat = new THREE.MeshStandardMaterial({
      color: 0xE28392,
      roughness: 0.5,
      metalness: 0.1,
    });

    const flowerYellowMat = new THREE.MeshStandardMaterial({
      color: 0xF4CB64,
      roughness: 0.5,
      metalness: 0.1,
    });

    // 4. Procedural Sculpted Rock Base (The Island)
    const rockGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const pos = rockGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Flatten upper plateau for crystal garden
      if (y > 0.4) {
        y *= 0.72;
      }
      // Taper down the bottom into a jagged floating monolith tip
      if (y < 0.0) {
        const factor = 1.0 - Math.abs(y) * 0.22;
        x *= factor;
        z *= factor;
        y *= 1.45;
      }
      // Geometric facet perturbation
      const noise = Math.sin(x * 3.2) * Math.cos(z * 3.2) * 0.15;
      pos.setXYZ(i, x + noise, y + noise * 0.7, z + noise);
    }
    rockGeo.computeVertexNormals();

    const rockMesh = new THREE.Mesh(rockGeo, marbleRockMat);
    rockMesh.castShadow = true;
    rockMesh.receiveShadow = true;
    masterGroup.add(rockMesh);

    // Decorative Gold Vein Ribbon embedded across the rock facets
    const goldRibbonGeo = new THREE.TorusGeometry(1.7, 0.025, 8, 48, Math.PI * 1.2);
    const goldRibbon = new THREE.Mesh(goldRibbonGeo, goldVeinMat);
    goldRibbon.rotation.x = Math.PI / 3;
    goldRibbon.rotation.y = Math.PI / 6;
    goldRibbon.position.set(0, -0.2, 0);
    masterGroup.add(goldRibbon);

    // 5. Quartz & Amethyst Crystal Cluster on Top Plateau
    const crystalGroup = new THREE.Group();
    crystalGroup.position.set(0, 0.7, 0);
    masterGroup.add(crystalGroup);

    const crystalConfigs = [
      { x: 0.0, z: 0.0, h: 1.5, r: 0.22, tiltX: 0.05, tiltZ: -0.05, mat: whiteCrystalMat },
      { x: 0.35, z: 0.2, h: 1.25, r: 0.18, tiltX: 0.15, tiltZ: 0.12, mat: roseCrystalMat },
      { x: -0.32, z: 0.15, h: 1.35, r: 0.19, tiltX: -0.12, tiltZ: -0.15, mat: amberCrystalMat },
      { x: 0.15, z: -0.35, h: 1.1, r: 0.16, tiltX: -0.18, tiltZ: 0.08, mat: whiteCrystalMat },
      { x: -0.25, z: -0.25, h: 0.95, r: 0.14, tiltX: -0.1, tiltZ: -0.18, mat: roseCrystalMat },
      { x: 0.5, z: -0.1, h: 0.85, r: 0.13, tiltX: 0.25, tiltZ: -0.1, mat: amberCrystalMat },
      { x: -0.48, z: 0.35, h: 0.75, r: 0.12, tiltX: -0.2, tiltZ: 0.2, mat: whiteCrystalMat },
      { x: 0.28, z: 0.45, h: 0.7, r: 0.11, tiltX: 0.18, tiltZ: 0.22, mat: roseCrystalMat },
    ];

    crystalConfigs.forEach((cfg) => {
      const singleCrystalGroup = new THREE.Group();
      singleCrystalGroup.position.set(cfg.x, 0, cfg.z);
      singleCrystalGroup.rotation.x = cfg.tiltX;
      singleCrystalGroup.rotation.z = cfg.tiltZ;

      // Hexagonal prism column
      const shaftGeo = new THREE.CylinderGeometry(cfg.r * 0.95, cfg.r, cfg.h, 6);
      shaftGeo.translate(0, cfg.h / 2, 0);
      const shaft = new THREE.Mesh(shaftGeo, cfg.mat);
      shaft.castShadow = true;
      singleCrystalGroup.add(shaft);

      // Pointed pyramidal crystal tip
      const tipGeo = new THREE.ConeGeometry(cfg.r * 0.95, cfg.r * 1.8, 6);
      tipGeo.translate(0, cfg.h + (cfg.r * 1.8) / 2, 0);
      const tip = new THREE.Mesh(tipGeo, cfg.mat);
      tip.castShadow = true;
      singleCrystalGroup.add(tip);

      crystalGroup.add(singleCrystalGroup);
    });

    // 6. Lush Moss Cushions around Crystal Bases
    const mossGroup = new THREE.Group();
    mossGroup.position.set(0, 0.75, 0);
    masterGroup.add(mossGroup);

    const mossCoords = [
      { x: 0.4, z: 0.3, s: 0.35, mat: mossDarkMat },
      { x: -0.4, z: 0.25, s: 0.38, mat: mossLightMat },
      { x: 0.1, z: 0.5, s: 0.32, mat: mossDarkMat },
      { x: -0.2, z: -0.45, s: 0.4, mat: mossLightMat },
      { x: 0.45, z: -0.3, s: 0.3, mat: mossDarkMat },
      { x: -0.5, z: -0.2, s: 0.28, mat: mossLightMat },
      { x: 0.6, z: 0.1, s: 0.25, mat: mossLightMat },
    ];

    mossCoords.forEach((m) => {
      const mossGeo = new THREE.SphereGeometry(m.s, 7, 6);
      mossGeo.scale(1, 0.35, 1);
      const mossMesh = new THREE.Mesh(mossGeo, m.mat);
      mossMesh.position.set(m.x, 0, m.z);
      mossMesh.receiveShadow = true;
      mossGroup.add(mossMesh);
    });

    // 7. Delicate Floral Stems & Wild Blooms
    const floraGroup = new THREE.Group();
    floraGroup.position.set(0, 0.8, 0);
    masterGroup.add(floraGroup);

    const flowers = [
      { x: 0.45, z: 0.35, h: 0.7, tiltX: 0.25, tiltZ: 0.2, colorMat: flowerRoseMat },
      { x: 0.52, z: 0.22, h: 0.85, tiltX: 0.3, tiltZ: 0.15, colorMat: flowerRoseMat },
      { x: -0.42, z: 0.38, h: 0.75, tiltX: -0.2, tiltZ: 0.25, colorMat: flowerYellowMat },
      { x: -0.5, z: 0.15, h: 0.9, tiltX: -0.25, tiltZ: 0.1, colorMat: flowerRoseMat },
      { x: 0.2, z: -0.5, h: 0.65, tiltX: -0.25, tiltZ: -0.2, colorMat: flowerYellowMat },
      { x: -0.35, z: -0.42, h: 0.8, tiltX: -0.3, tiltZ: -0.15, colorMat: flowerRoseMat },
    ];

    flowers.forEach((fl) => {
      const stemGroup = new THREE.Group();
      stemGroup.position.set(fl.x, 0, fl.z);
      stemGroup.rotation.x = fl.tiltX;
      stemGroup.rotation.z = fl.tiltZ;

      const stemGeo = new THREE.CylinderGeometry(0.012, 0.018, fl.h, 6);
      stemGeo.translate(0, fl.h / 2, 0);
      const stem = new THREE.Mesh(stemGeo, floralStemMat);
      stemGroup.add(stem);

      // Sculptural flower cluster / bloom
      const bloomGroup = new THREE.Group();
      bloomGroup.position.set(0, fl.h, 0);

      // Central bloom sphere
      const centerGeo = new THREE.SphereGeometry(0.065, 8, 8);
      const center = new THREE.Mesh(centerGeo, fl.colorMat);
      bloomGroup.add(center);

      // Petite petal spheres
      for (let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2;
        const petalGeo = new THREE.SphereGeometry(0.035, 6, 6);
        const petal = new THREE.Mesh(petalGeo, fl.colorMat);
        petal.position.set(Math.cos(angle) * 0.065, 0, Math.sin(angle) * 0.065);
        bloomGroup.add(petal);
      }

      stemGroup.add(bloomGroup);
      floraGroup.add(stemGroup);
    });

    // 8. Architectural Floating Orbital Ring & Mineral Shards
    const orbitRingGeo = new THREE.TorusGeometry(2.35, 0.012, 12, 90);
    const orbitRing = new THREE.Mesh(orbitRingGeo, goldVeinMat);
    orbitRing.rotation.x = Math.PI / 2.8;
    orbitRing.rotation.y = Math.PI / 7;
    masterGroup.add(orbitRing);

    // Orbiting mini crystal shards
    const shardsGroup = new THREE.Group();
    masterGroup.add(shardsGroup);

    const shards = [];
    for (let s = 0; s < 10; s++) {
      const shardGeo = new THREE.OctahedronGeometry(0.05 + Math.random() * 0.04, 0);
      const shardMat = Math.random() > 0.5 ? goldVeinMat : whiteCrystalMat;
      const shard = new THREE.Mesh(shardGeo, shardMat);
      
      const angle = (s / 10) * Math.PI * 2;
      const radius = 2.1 + Math.random() * 0.5;
      const yPos = (Math.random() - 0.5) * 1.2;
      
      shard.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
      shardsGroup.add(shard);
      shards.push({ mesh: shard, angle, radius, speed: 0.004 + Math.random() * 0.006, yPos });
    }

    // Interactive Tilt & Mouse Tracking
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Subtle reaction trigger on project switch
    let pulseScale = 1.0;
    sceneElementsRef.current = {
      pulseRock: () => {
        pulseScale = 1.06;
        crystalGlowLight.intensity = 3.5;
        setTimeout(() => {
          pulseScale = 1.0;
          crystalGlowLight.intensity = 2.2;
        }, 350);
      },
    };

    // 9. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Gentle floating bob
      masterGroup.position.y = Math.sin(elapsedTime * 0.75) * 0.12;

      // Slow majestic rotation
      masterGroup.rotation.y = elapsedTime * 0.12 + mouse.x * 0.35;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.04 + mouse.y * -0.2;
      masterGroup.rotation.z = Math.cos(elapsedTime * 0.6) * 0.03;

      // Scale lerp for project switch reaction
      masterGroup.scale.lerp(new THREE.Vector3(pulseScale, pulseScale, pulseScale), 0.1);

      // Rotate orbital ring in counter direction
      orbitRing.rotation.z -= 0.002;

      // Animate floating shards
      shards.forEach((s) => {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.z = Math.sin(s.angle) * s.radius;
        s.mesh.position.y = s.yPos + Math.sin(elapsedTime * 1.5 + s.angle) * 0.08;
        s.mesh.rotation.x += 0.01;
        s.mesh.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            clock.start();
            animate();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);

      // Clean disposal
      renderer.dispose();
      scene.clear();
      sceneElementsRef.current = null;
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-32 bg-[#171715] text-[#F8F7F2] overflow-hidden selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full bg-radial from-[#C8B99A]/10 via-[#C8B99A]/[0.02] to-transparent pointer-events-none blur-3xl" />

      {/* Subtle Noise / Grid Pattern Watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between min-h-[calc(100vh-8rem)]">
        
        {/* Top Header Row: Section Badge + Counter */}
        <div className="flex items-center justify-between border-b border-[#C8B99A]/20 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C8B99A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5DCCB]">
              03 // Architectural Showcase
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#85847E]">
            <span className="text-[#C8B99A] font-semibold">0{activeIdx + 1}</span>
            <span>/</span>
            <span>0{featuredProjects.length}</span>
          </div>
        </div>

        {/* Middle Stage: Editorial Headline + Interactive 3D Canvas Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
          
          {/* Left Column (5 Cols): Editorial Headline from Reference Image */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-1 sm:space-y-2">
              <span className="block font-['Cormorant_Garamond'] italic font-normal text-3xl sm:text-4xl md:text-5xl text-[#C8B99A] leading-tight">
                the
              </span>
              
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-['Playfair_Display'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-[#F8F7F2] leading-none">
                  WORK
                </h2>
                <span className="px-3 py-1 rounded-full border border-[#C8B99A]/40 text-xs sm:text-sm font-['Cormorant_Garamond'] italic text-[#E5DCCB] bg-white/5">
                  (I stand)
                </span>
              </div>

              <h2 className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-[#F8F7F2] leading-none">
                BEHIND
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#85847E] leading-relaxed max-w-md">
              PROJECTS THAT REFLECT CURIOSITY, ARCHITECTURAL RIGOR, AND FULL-STACK CRAFT.
            </p>

            {/* Project Selector Grid (Directly mirroring the brand badges in the reference image) */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] block">
                Select Featured System:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {featuredProjects.map((p, idx) => {
                  const isCurrent = idx === activeIdx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProject(idx)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left flex items-center justify-between cursor-pointer ${
                        isCurrent
                          ? 'bg-[#F8F7F2] text-[#171715] font-semibold shadow-lg shadow-black/40 scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 text-[#C8B99A] border border-[#C8B99A]/20'
                      }`}
                    >
                      <span className="truncate">{p.title.split('–')[0].trim()}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Stepper Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-[#C8B99A]/30 text-[#F8F7F2] transition-colors cursor-pointer"
                title="Previous Project"
                aria-label="Previous Project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-[#C8B99A]/30 text-[#F8F7F2] transition-colors cursor-pointer"
                title="Next Project"
                aria-label="Next Project"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-xs font-mono text-[#85847E]">
                Use arrows or click systems to inspect
              </span>
            </div>
          </div>

          {/* Right Column (7 Cols): Floating 3D Sculpture + Active Project Spotlight Card */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* 3D WebGL Canvas Viewport */}
            <div className="relative w-full aspect-square max-w-[480px] sm:max-w-[540px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
                title="Drag or move cursor to interact with the architectural sculpture"
              />

              {/* Minimal floating interaction hint */}
              <div className="absolute bottom-2 right-4 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#C8B99A] border border-white/10">
                  <Sparkles size={10} />
                  <span>3D Mineral Sculpture • Drag to inspect</span>
                </span>
              </div>
            </div>

            {/* Active Project Spotlight Dossier Panel */}
            <div className="w-full max-w-xl bg-white/[0.04] backdrop-blur-md rounded-2xl border border-[#C8B99A]/30 p-5 sm:p-6 mt-4 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C8B99A]/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8B99A] block">
                    {activeProject.category} • {activeProject.completed}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#F8F7F2]">
                    {activeProject.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {activeProject.liveUrl && activeProject.liveUrl !== '#' && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F8F7F2] transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  {activeProject.githubUrl && activeProject.githubUrl !== '#' && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F8F7F2] transition-colors"
                      title="Source Code"
                    >
                      <Code2 size={15} />
                    </a>
                  )}
                </div>
              </div>

              {/* Tagline & Brief Summary */}
              <p className="text-xs sm:text-sm font-sans text-[#E5DCCB] leading-relaxed line-clamp-2">
                {activeProject.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activeProject.techStack?.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-[#C8B99A]/20 text-[#C8B99A]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button: Open Detailed Architectural Case Study */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenProjectModal) onOpenProjectModal(activeProject.id);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium bg-[#F8F7F2] text-[#171715] hover:bg-[#C8B99A] transition-all shadow-md cursor-pointer"
                >
                  <span>Explore Architecture & Details</span>
                  <ArrowUpRight size={14} />
                </button>

                <span className="text-[11px] font-mono text-[#85847E]">
                  Role: {activeProject.role}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Scroll Indicator to Education Section */}
        <div className="flex items-center justify-between pt-6 border-t border-[#C8B99A]/20 text-xs font-mono text-[#85847E]">
          <span>Interactive 3D Engineering Exhibit</span>
          <div className="flex items-center gap-2 text-[#C8B99A]">
            <span>Scroll down for Academic Records</span>
            <span>↓</span>
          </div>
        </div>

      </div>
    </section>
  );
}
