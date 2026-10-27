import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { certifications } from '../../data/portfolioData';
import { Award, Eye, Calendar, Building2, ArrowDown } from 'lucide-react';
import { sound } from '../../utils/sound';

import cert1Img from '../../assets/certificate/cert1.png';
import cert2Img from '../../assets/certificate/cert2.png';
import cert3Img from '../../assets/certificate/cert3.png';
import cert4Img from '../../assets/certificate/cert4.png';

const CERT_IMAGES = [cert1Img, cert2Img, cert3Img, cert4Img];

export default function AchievementsStage3D({ onOpenCertificateModal }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  const activeCert = certifications[activeCertIdx] || certifications[0];

  const updatePlinthRef = useRef(null);
  const prevCertIdxRef = useRef(0);

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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 8.5);
    camera.lookAt(0, 1.8, 0);

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
    const ambientLight = new THREE.AmbientLight(0xF8F7F2, 0.9);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xFFF7EA, 1.3);
    mainSpot.position.set(0, 8, 7);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    scene.add(mainSpot);

    // 3. Exhibition Stage & Gallery Wall
    const stageGeo = new THREE.BoxGeometry(11.4, 0.3, 5.2);
    const stageMesh = new THREE.Mesh(stageGeo, sandBeige);
    stageMesh.position.y = 0.15;
    stageMesh.receiveShadow = true;
    scene.add(stageMesh);

    const borderGeo = new THREE.BoxGeometry(11.6, 0.04, 5.4);
    const border = new THREE.Mesh(borderGeo, khaki);
    border.position.y = 0.31;
    scene.add(border);

    // Gallery Backdrop Wall
    const wallGeo = new THREE.BoxGeometry(11.4, 3.8, 0.2);
    const wall = new THREE.Mesh(wallGeo, clayWhite);
    wall.position.set(0, 2.2, -2.2);
    wall.receiveShadow = true;
    scene.add(wall);

    const molding = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.08, 0.26), charcoal);
    molding.position.set(0, 4.14, -2.2);
    scene.add(molding);

    // Timeline Inlaid Ribbon on Floor
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.02, 0.12), charcoal);
    ribbon.position.set(0, 0.32, -0.4);
    scene.add(ribbon);

    // 4. Milestone Plinths & Certificate Displays
    const plinthGroups = [];
    const interactiveCerts = [];
    const spacing = 2.3;
    const startX = -((certifications.length - 1) * spacing) / 2;
    const textureLoader = new THREE.TextureLoader();

    certifications.forEach((cert, idx) => {
      const pGroup = new THREE.Group();
      const x = startX + idx * spacing;
      pGroup.position.set(x, 0.3, -0.4);

      // Base plinth
      const baseMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.52, 0.58, 0.9, 32),
        charcoal
      );
      baseMesh.position.y = 0.45;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      pGroup.add(baseMesh);

      // Accent ring
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.03, 16, 32),
        khaki.clone()
      );
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.9;
      pGroup.add(ringMesh);
      pGroup.ringMesh = ringMesh;

      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 0.7, 12),
        charcoal
      );
      stem.position.y = 1.25;
      stem.castShadow = true;
      pGroup.add(stem);

      // Certificate frame
      const frameW = 1.55;
      const frameH = 1.1;
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(frameW + 0.08, frameH + 0.08, 0.06),
        deepBlack
      );
      frame.position.set(0, 1.88, 0);
      frame.castShadow = true;
      pGroup.add(frame);

      // Real certificate texture
      const certTex = textureLoader.load(CERT_IMAGES[idx]);
      certTex.colorSpace = THREE.SRGBColorSpace;
      certTex.minFilter = THREE.LinearFilter;

      const certMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(frameW, frameH),
        new THREE.MeshBasicMaterial({ map: certTex })
      );
      certMesh.position.set(0, 1.88, 0.035);
      certMesh.userData = { isCert: true, certIdx: idx };
      pGroup.add(certMesh);
      interactiveCerts.push(certMesh);

      // Spotlight for this plinth
      const spot = new THREE.PointLight(0xFCE8B2, 0.5, 3.0);
      spot.position.set(0, 2.3, 0.7);
      pGroup.add(spot);
      pGroup.spot = spot;

      pGroup.certIdx = idx;
      plinthGroups.push(pGroup);
      scene.add(pGroup);
    });

    // 5. Camera Interpolation
    let targetCamPos = new THREE.Vector3(0, 3.2, 7.5);
    let targetLookAt = new THREE.Vector3(0, 1.8, 0);
    let curLookAt = new THREE.Vector3(0, 1.8, 0);

    const updatePlinthFocus = (idx) => {
      const plinth = plinthGroups[idx];
      if (!plinth) return;

      plinthGroups.forEach((pg, i) => {
        const isActive = i === idx;
        if (pg.ringMesh) {
          pg.ringMesh.material.color.setHex(isActive ? 0xFCE8B2 : 0xC8B99A);
          pg.ringMesh.material.emissive?.setHex(isActive ? 0xC8B99A : 0x000000);
        }
        if (pg.spot) {
          pg.spot.intensity = isActive ? 1.2 : 0.4;
        }
      });

      const px = plinth.position.x;
      targetCamPos.set(px * 0.7, 2.6, 5.0);
      targetLookAt.set(px, 1.9, -0.4);
    };

    updatePlinthRef.current = updatePlinthFocus;
    updatePlinthFocus(0);

    // 6. Scroll-Driven Engine: Advances plinths with vertical scroll
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      setScrollPct(progress);

      const certIdx = Math.min(
        certifications.length - 1,
        Math.floor(progress * certifications.length)
      );

      if (certIdx !== prevCertIdxRef.current) {
        prevCertIdxRef.current = certIdx;
        setActiveCertIdx(certIdx);
        updatePlinthFocus(certIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 7. Raycast Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveCerts, true);

      if (intersects.length > 0) {
        sound.playClick();
        const idx = intersects[0].object.userData.certIdx;
        setActiveCertIdx(idx);
        updatePlinthFocus(idx);

        const scrollableHeight = section.offsetHeight - window.innerHeight;
        const targetY = section.offsetTop + (idx / certifications.length) * scrollableHeight;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    };

    container.addEventListener('pointerdown', onPointerDown);

    // 8. Animation Loop
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

    // 9. Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    // 10. Resize
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
    };
  }, []);

  const handleJumpToCert = useCallback((idx) => {
    sound.playClick();
    setActiveCertIdx(idx);
    if (updatePlinthRef.current) {
      updatePlinthRef.current(idx);
    }
    const section = sectionRef.current;
    if (section) {
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const targetY = section.offsetTop + (idx / certifications.length) * scrollableHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full h-[240vh] bg-[#F8F7F2] border-t border-[#C8B99A]/40"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* 3D WebGL Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block cursor-pointer"
          style={{ touchAction: 'pan-y' }}
        />

        <div className="absolute inset-0 pointer-events-none bg-noise opacity-30" />

        {/* Editorial UI Overlays */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 pointer-events-none flex-1 flex flex-col justify-between">
          
          {/* Top Header Row with Progress */}
          <div className="pointer-events-auto flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-2xl bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-[#C8B99A]/60 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
                <span className="text-[11px] font-mono font-medium text-[#292824] uppercase tracking-wider">
                  05 // Scroll-Driven Milestone Stage
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk']">
                Certifications & Milestones
              </h2>
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <div className="text-[11px] font-mono text-[#85847E] flex items-center gap-1.5">
                <span>Scroll to glide plinths</span>
                <ArrowDown size={13} className="animate-bounce" />
              </div>
              <div className="w-28 h-1.5 bg-[#E5DCCB]/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171715] rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(scrollPct * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Split: Timeline Tabs & Readable Certificate Card */}
          <div className="pointer-events-auto mt-auto pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* Left Column: Timeline Milestone Tabs */}
            <div className="lg:col-span-5 bg-white/85 backdrop-blur-md p-4 rounded-2xl border border-[#C8B99A]/60 shadow-lg space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] px-2 flex items-center justify-between">
                <span>Chronological Plinths</span>
                <span className="font-semibold text-[#171715]">
                  Milestone 0{activeCertIdx + 1} of 0{certifications.length}
                </span>
              </div>

              <div className="space-y-1.5">
                {certifications.map((cert, idx) => {
                  const isActive = idx === activeCertIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleJumpToCert(idx)}
                      className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-mono transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#171715] text-[#F8F7F2] font-semibold shadow-xs'
                          : 'bg-[#F8F7F2]/80 hover:bg-[#E5DCCB]/60 text-[#292824]'
                      }`}
                    >
                      <span className="truncate pr-2">
                        <span className={isActive ? 'text-[#C8B99A]' : 'text-[#85847E]'}>
                          0{idx + 1} •{' '}
                        </span>
                        {cert.title}
                      </span>
                      <span className="text-[10px] opacity-75 shrink-0">
                        {cert.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Readable HTML Overlay Card */}
            <div className="lg:col-span-7 bg-[#F8F7F2]/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#C8B99A]/70 shadow-2xl space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C8B99A]/40 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#E5DCCB] text-[#171715]">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#85847E] block">
                      Verified Credential // {activeCert.badge} • 0{activeCertIdx + 1} of 0{certifications.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#171715]">
                      {activeCert.title}
                    </h3>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenCertificateModal) onOpenCertificateModal(activeCertIdx);
                  }}
                  className="editorial-btn px-4 py-2 rounded-full text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Eye size={12} />
                  <span>Inspect Certificate</span>
                </button>
              </div>

              {/* Issuer and Date Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono py-2">
                <div className="p-3 rounded-xl bg-white/70 border border-[#C8B99A]/40">
                  <span className="text-[#85847E] block text-[10px] uppercase">Issuing Body</span>
                  <span className="font-semibold text-[#171715] flex items-center gap-1 mt-0.5">
                    <Building2 size={13} className="text-[#C8B99A]" />
                    {activeCert.issuer}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/70 border border-[#C8B99A]/40">
                  <span className="text-[#85847E] block text-[10px] uppercase">Award Year</span>
                  <span className="font-semibold text-[#171715] flex items-center gap-1 mt-0.5">
                    <Calendar size={13} className="text-[#C8B99A]" />
                    {activeCert.year}
                  </span>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-xs sm:text-sm text-[#66635B] leading-relaxed">
                Official recognized credential issued to Hanz Christian Angelo G. Magbal in recognition of high-impact software design, technical systems proficiency, and academic innovation.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
