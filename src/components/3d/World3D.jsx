import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { HeroWorkspaceScene } from './HeroWorkspaceScene.js';
import { AboutCourtyardScene } from './AboutCourtyardScene.js';
import { ProjectTowerScene } from './ProjectTowerScene.js';
import { MilestoneStageScene } from './MilestoneStageScene.js';
import { EducationPathwayScene } from './EducationPathwayScene.js';
import { ClientMeetingScene } from './ClientMeetingScene.js';
import { MasterWorldTerrain } from './MasterWorldTerrain.js';
import { SplineCamera } from './SplineCamera.js';

export default function World3D({
  scrollProgress,
  activeProjectId,
  activeCertificateIdx,
  onSceneChange,
  onSelectProject,
  onSelectCertificate,
}) {
  const mountRef = useRef(null);
  const worldRef = useRef({});

  const onSceneChangeRef = useRef(onSceneChange);
  const onSelectProjectRef = useRef(onSelectProject);
  const onSelectCertificateRef = useRef(onSelectCertificate);

  useEffect(() => {
    onSceneChangeRef.current = onSceneChange;
    onSelectProjectRef.current = onSelectProject;
    onSelectCertificateRef.current = onSelectCertificate;
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8F7F2); // Warm white
    scene.fog = new THREE.FogExp2(0xF8F7F2, 0.012); // Soft warm white horizon

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      250
    );

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Cinematic Warm Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xF8F7F2, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xE5DCCB, 0.5);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // Primary Warm Directional Sunlight
    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.35);
    dirLight.position.set(28, 48, 32);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 160;
    dirLight.shadow.camera.left = -45;
    dirLight.shadow.camera.right = 45;
    dirLight.shadow.camera.top = 45;
    dirLight.shadow.camera.bottom = -45;
    dirLight.shadow.bias = -0.0004;
    scene.add(dirLight);

    // Secondary soft fill light
    const fillLight = new THREE.DirectionalLight(0xC8B99A, 0.45);
    fillLight.position.set(-30, 22, -20);
    scene.add(fillLight);

    // 5. Build the 6 Connected Diorama Scenes
    // Foundation Landscape
    const terrain = new MasterWorldTerrain();
    scene.add(terrain.group);

    // Scene 01: Hero Workspace (The Developer at Work)
    const heroWorkspace = new HeroWorkspaceScene(new THREE.Vector3(0, 0, 0));
    scene.add(heroWorkspace.group);

    // Scene 02: About Courtyard (The Person Behind the Code)
    const aboutCourtyard = new AboutCourtyardScene(new THREE.Vector3(14, 0.4, 6));
    scene.add(aboutCourtyard.group);

    // Scene 03: Project Tower (The Architecture of My Work)
    const projectTower = new ProjectTowerScene(new THREE.Vector3(22, 0, -20));
    scene.add(projectTower.group);

    // Scene 04: Milestone Stage (Certificates & Achievements)
    const milestoneStage = new MilestoneStageScene(new THREE.Vector3(0, 0, -42));
    scene.add(milestoneStage.group);

    // Scene 05: Education Pathway (The Walk Toward the Gate)
    const educationPathway = new EducationPathwayScene(new THREE.Vector3(-22, 0, -22));
    scene.add(educationPathway.group);

    // Scene 06: Client Meeting (Let's Talk & Panorama)
    const clientMeeting = new ClientMeetingScene(new THREE.Vector3(-14, 0, 10));
    scene.add(clientMeeting.group);

    // 6. Spline Camera Controller
    const splineCamera = new SplineCamera(camera);

    // Save references
    worldRef.current = {
      scene,
      camera,
      renderer,
      splineCamera,
      heroWorkspace,
      aboutCourtyard,
      projectTower,
      milestoneStage,
      educationPathway,
      clientMeeting,
      terrain,
    };

    // 7. Raycasting & Interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);

      // Check Project Tower floors or billboard
      const projectHits = raycaster.intersectObjects(projectTower.interactiveObjects, true);
      if (projectHits.length > 0) {
        const hit = projectHits[0].object;
        const pId = hit.userData?.projectId;
        if (pId && onSelectProjectRef.current) {
          onSelectProjectRef.current(pId);
          return;
        }
      }

      // Check Certificates on Milestone Stage
      const certHits = raycaster.intersectObjects(milestoneStage.interactiveCertificates, true);
      if (certHits.length > 0) {
        const hit = certHits[0].object;
        const certIdx = hit.userData?.certIdx;
        if (certIdx !== undefined && onSelectCertificateRef.current) {
          onSelectCertificateRef.current(certIdx);
          return;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    // 8. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let lastTime = performance.now();
    let animationFrameId;
    let activeScene = 1;

    const animate = (now) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update camera along master scroll spline
      splineCamera.update(delta);

      // Determine active scene
      const currentScene = splineCamera.getActiveSceneIndex(splineCamera.dampedScroll);
      if (currentScene !== activeScene) {
        activeScene = currentScene;
        if (onSceneChangeRef.current) onSceneChangeRef.current(activeScene);
      }

      // Update Scene Subsystems
      heroWorkspace.update(delta);
      aboutCourtyard.update(delta);
      projectTower.update(delta);
      milestoneStage.update(delta);
      educationPathway.update(delta);
      clientMeeting.update(delta);
      terrain.update(delta);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Sync scroll progress
  useEffect(() => {
    const { splineCamera, educationPathway } = worldRef.current;
    if (splineCamera) {
      splineCamera.setScrollProgress(scrollProgress);
    }
    // Update walking progress in Scene 5 (0.73 -> 0.86)
    if (educationPathway) {
      const p = (scrollProgress - 0.73) / (0.86 - 0.73);
      educationPathway.setWalkingProgress(p);
    }
  }, [scrollProgress]);

  // Sync active project selection in 3D
  useEffect(() => {
    const { projectTower } = worldRef.current;
    if (projectTower && activeProjectId) {
      projectTower.setActiveProject(activeProjectId);
    }
  }, [activeProjectId]);

  // Sync active certificate in 3D
  useEffect(() => {
    const { milestoneStage } = worldRef.current;
    if (milestoneStage && activeCertificateIdx !== null && activeCertificateIdx !== undefined) {
      milestoneStage.setActiveMilestone(activeCertificateIdx);
    }
  }, [activeCertificateIdx]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
