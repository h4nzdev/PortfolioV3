import * as THREE from 'three';
import { featuredProjects } from '../../data/portfolioData';

import realynkImg from '../../assets/projects/realynk/realynk1.png';
import palImg from '../../assets/projects/pal/pal1.png';
import langorImg from '../../assets/projects/langor/langor1.png';
import gtrashImg from '../../assets/projects/gtrash/gtrash1.png';
import klinikaImg from '../../assets/projects/klinkahub/k1.jpg';

const PROJECT_IMAGE_MAP = {
  'realynk': realynkImg,
  'pal-journeypad': palImg,
  'langor-ai': langorImg,
  'gtrash': gtrashImg,
  'klinikahub': klinikaImg,
  'medora': klinikaImg,
};

/**
 * ProjectTowerScene: Scene 03 — "The Architecture of My Work"
 * A curated architectural installation tower where each distinct floor represents
 * a real engineering project by Hanz Magbal.
 * Includes:
 * - 5 architectural floors with warm interior illumination and project plaques
 * - Interactive raycastable floors that highlight when selected
 * - A large architectural presentation billboard beside the building displaying real project screenshots
 */
export class ProjectTowerScene {
  constructor(position = new THREE.Vector3(22, 0, -20)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);

    this.textureLoader = new THREE.TextureLoader();
    this.interactiveObjects = [];
    this.floorMeshes = [];

    // Materials
    this.clayWhite = new THREE.MeshStandardMaterial({
      color: 0xF8F7F2,
      roughness: 0.3,
      metalness: 0.05,
    });

    this.charcoal = new THREE.MeshStandardMaterial({
      color: 0x292824,
      roughness: 0.45,
      metalness: 0.2,
    });

    this.deepBlack = new THREE.MeshStandardMaterial({
      color: 0x171715,
      roughness: 0.3,
      metalness: 0.4,
    });

    this.khaki = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      roughness: 0.5,
      metalness: 0.1,
    });

    this.sandBeige = new THREE.MeshStandardMaterial({
      color: 0xE5DCCB,
      roughness: 0.65,
      metalness: 0.05,
    });

    // Floor highlight material
    this.highlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xFCE8B2,
      emissive: 0xC8B99A,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });

    this.activeProjectId = 'realynk';
    this.time = 0;

    this.initPlinth();
    this.initProjectTower();
    this.initPresentationBillboard();

    // Set initial project
    this.setActiveProject('realynk');
  }

  initPlinth() {
    // Large architectural stepped plinth
    const plinthGeo = new THREE.CylinderGeometry(8.2, 8.6, 0.4, 48);
    const plinthMesh = new THREE.Mesh(plinthGeo, this.sandBeige);
    plinthMesh.position.y = 0.2;
    plinthMesh.receiveShadow = true;
    this.group.add(plinthMesh);

    const plinthRingGeo = new THREE.TorusGeometry(7.6, 0.04, 16, 48);
    plinthRingGeo.rotateX(Math.PI / 2);
    const plinthRing = new THREE.Mesh(plinthRingGeo, this.khaki);
    plinthRing.position.y = 0.41;
    this.group.add(plinthRing);
  }

  initProjectTower() {
    this.towerGroup = new THREE.Group();
    this.towerGroup.position.set(1.5, 0.4, 0);

    const floorHeight = 2.1;
    const towerWidth = 3.8;
    const towerDepth = 3.4;

    // Floor configurations matching Hanz's real portfolio projects
    this.projectFloors = [
      { id: 'realynk', floor: 1, name: 'Realynk ERP', tag: 'PWA Enterprise' },
      { id: 'pal-journeypad', floor: 2, name: 'PAL JourneyPad', tag: 'AI & Collab' },
      { id: 'langor-ai', floor: 3, name: 'Langor AI', tag: 'Voice Tutor' },
      { id: 'gtrash', floor: 4, name: 'G-TRASH', tag: 'IoT & CleanTech' },
      { id: 'klinikahub', floor: 5, name: 'KlinikaHub', tag: 'Healthcare SaaS' },
    ];

    this.projectFloors.forEach((pf, i) => {
      const floorGroup = new THREE.Group();
      const floorY = i * floorHeight;
      floorGroup.position.set(0, floorY, 0);

      // 1. Concrete floor slab
      const slabGeo = new THREE.BoxGeometry(towerWidth, 0.22, towerDepth);
      const slabMesh = new THREE.Mesh(slabGeo, this.clayWhite);
      slabMesh.position.y = 0.11;
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      floorGroup.add(slabMesh);

      // Floor accent belt (glows when active)
      const beltGeo = new THREE.BoxGeometry(towerWidth + 0.08, 0.06, towerDepth + 0.08);
      const beltMesh = new THREE.Mesh(beltGeo, this.khaki.clone());
      beltMesh.position.y = 0.11;
      floorGroup.add(beltMesh);
      floorGroup.beltMesh = beltMesh;

      // 2. Architectural Pillars / Mullions for this floor
      const pillarGeo = new THREE.BoxGeometry(0.24, floorHeight - 0.22, 0.24);
      const pillarPositions = [
        [-towerWidth / 2 + 0.15, floorHeight / 2, -towerDepth / 2 + 0.15],
        [towerWidth / 2 - 0.15, floorHeight / 2, -towerDepth / 2 + 0.15],
        [-towerWidth / 2 + 0.15, floorHeight / 2, towerDepth / 2 - 0.15],
        [towerWidth / 2 - 0.15, floorHeight / 2, towerDepth / 2 - 0.15],
      ];
      pillarPositions.forEach(([px, py, pz]) => {
        const pillar = new THREE.Mesh(pillarGeo, this.charcoal);
        pillar.position.set(px, py, pz);
        pillar.castShadow = true;
        floorGroup.add(pillar);
      });

      // 3. Recessed interior gallery alcove with warm illumination
      const alcoveGeo = new THREE.BoxGeometry(towerWidth - 0.6, floorHeight - 0.3, towerDepth - 0.6);
      const alcoveMesh = new THREE.Mesh(alcoveGeo, this.sandBeige);
      alcoveMesh.position.set(0, floorHeight / 2, 0);
      alcoveMesh.receiveShadow = true;
      floorGroup.add(alcoveMesh);

      // Interior warm light for each floor
      const floorLight = new THREE.PointLight(0xFCE8B2, 0.6, 3.5);
      floorLight.position.set(0, floorHeight / 2 + 0.2, 0.8);
      floorGroup.add(floorLight);
      floorGroup.floorLight = floorLight;

      // 4. Exterior Project Identification Plaque
      const plaqueCanvas = document.createElement('canvas');
      plaqueCanvas.width = 320;
      plaqueCanvas.height = 80;
      const pctx = plaqueCanvas.getContext('2d');
      pctx.fillStyle = '#171715';
      pctx.fillRect(0, 0, 320, 80);
      pctx.fillStyle = '#C8B99A';
      pctx.font = 'bold 16px Space Grotesk, sans-serif';
      pctx.fillText(`0${pf.floor} // ${pf.name.toUpperCase()}`, 16, 34);
      pctx.fillStyle = '#85847E';
      pctx.font = '12px JetBrains Mono, monospace';
      pctx.fillText(pf.tag, 16, 60);

      const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
      const plaqueGeo = new THREE.PlaneGeometry(1.6, 0.4);
      const plaqueMat = new THREE.MeshBasicMaterial({ map: plaqueTex });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, 0.8, towerDepth / 2 + 0.02);
      floorGroup.add(plaqueMesh);

      // 5. Interactive Raycast Hitbox
      const hitboxGeo = new THREE.BoxGeometry(towerWidth + 0.3, floorHeight, towerDepth + 0.3);
      const hitboxMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
      hitbox.position.set(0, floorHeight / 2, 0);
      hitbox.userData = {
        isProjectFloor: true,
        projectId: pf.id,
        floorNumber: pf.floor,
      };
      floorGroup.add(hitbox);
      this.interactiveObjects.push(hitbox);

      floorGroup.projectId = pf.id;
      this.floorMeshes.push(floorGroup);
      this.towerGroup.add(floorGroup);
    });

    // Rooftop Crown & Architectural Fin
    const roofY = this.projectFloors.length * floorHeight;
    const roofCapGeo = new THREE.BoxGeometry(towerWidth + 0.4, 0.3, towerDepth + 0.4);
    const roofCap = new THREE.Mesh(roofCapGeo, this.clayWhite);
    roofCap.position.set(0, roofY + 0.15, 0);
    roofCap.castShadow = true;
    this.towerGroup.add(roofCap);

    // Architectural beacon spire atop building
    const spireGeo = new THREE.CylinderGeometry(0.04, 0.08, 2.2, 12);
    const spire = new THREE.Mesh(spireGeo, this.charcoal);
    spire.position.set(0, roofY + 1.4, 0);
    this.towerGroup.add(spire);

    const beaconLight = new THREE.PointLight(0xC8B99A, 1.0, 6.0);
    beaconLight.position.set(0, roofY + 2.5, 0);
    this.towerGroup.add(beaconLight);

    this.group.add(this.towerGroup);
  }

  initPresentationBillboard() {
    this.billboardGroup = new THREE.Group();
    // Positioned beside the tower facing the viewer
    this.billboardGroup.position.set(-3.8, 0.4, 0.8);
    this.billboardGroup.rotation.y = Math.PI * 0.12;

    // Billboard Pedestal Stand (Charcoal monolith)
    const standGeo = new THREE.BoxGeometry(0.3, 3.8, 0.3);
    const stand = new THREE.Mesh(standGeo, this.charcoal);
    stand.position.y = 1.9;
    stand.castShadow = true;
    this.billboardGroup.add(stand);

    // Cantilever arm
    const armGeo = new THREE.BoxGeometry(1.6, 0.2, 0.2);
    const arm = new THREE.Mesh(armGeo, this.charcoal);
    arm.position.set(0.6, 3.5, 0);
    this.billboardGroup.add(arm);

    // Presentation Display Frame
    const frameW = 3.6;
    const frameH = 2.2;
    const frameGeo = new THREE.BoxGeometry(frameW + 0.12, frameH + 0.12, 0.1);
    const frame = new THREE.Mesh(frameGeo, this.deepBlack);
    frame.position.set(0.6, 3.5, 0.1);
    frame.castShadow = true;
    this.billboardGroup.add(frame);

    // Presentation Display Screen Plane
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 1024;
    this.screenCanvas.height = 640;
    this.screenCtx = this.screenCanvas.getContext('2d');

    this.billboardTexture = new THREE.CanvasTexture(this.screenCanvas);
    this.billboardTexture.minFilter = THREE.LinearFilter;

    const screenGeo = new THREE.PlaneGeometry(frameW, frameH);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.billboardTexture,
    });
    this.billboardScreenMesh = new THREE.Mesh(screenGeo, screenMat);
    this.billboardScreenMesh.position.set(0.6, 3.5, 0.16);

    // Tag screen as interactive too!
    this.billboardScreenMesh.userData = {
      isBillboard: true,
      projectId: this.activeProjectId,
    };
    this.interactiveObjects.push(this.billboardScreenMesh);

    this.billboardGroup.add(this.billboardScreenMesh);

    // Spotlight illuminating the billboard
    const spot = new THREE.SpotLight(0xFFFFFF, 1.2, 8, Math.PI / 4, 0.3);
    spot.position.set(0.6, 5.2, 2.5);
    spot.target = this.billboardScreenMesh;
    this.billboardGroup.add(spot);

    this.group.add(this.billboardGroup);
  }

  setActiveProject(projectId) {
    this.activeProjectId = projectId;
    const project = featuredProjects.find((p) => p.id === projectId) || featuredProjects[0];

    // 1. Highlight the corresponding tower floor
    this.floorMeshes.forEach((fg) => {
      const isActive = fg.projectId === projectId;
      if (fg.beltMesh) {
        if (isActive) {
          fg.beltMesh.material.color.setHex(0xFCE8B2);
          fg.beltMesh.material.emissive.setHex(0xC8B99A);
          fg.beltMesh.material.emissiveIntensity = 0.8;
        } else {
          fg.beltMesh.material.color.setHex(0xC8B99A);
          fg.beltMesh.material.emissive.setHex(0x000000);
          fg.beltMesh.material.emissiveIntensity = 0;
        }
      }
      if (fg.floorLight) {
        fg.floorLight.intensity = isActive ? 1.4 : 0.4;
      }
    });

    // 2. Update billboard screen texture
    this.updateBillboardDisplay(project);
    if (this.billboardScreenMesh) {
      this.billboardScreenMesh.userData.projectId = projectId;
    }
  }

  updateBillboardDisplay(project) {
    if (!this.screenCtx) return;
    const ctx = this.screenCtx;
    const w = 1024;
    const h = 640;

    // Dark sleek background
    ctx.fillStyle = '#171715';
    ctx.fillRect(0, 0, w, h);

    // Load and draw actual project screenshot
    const imgSrc = PROJECT_IMAGE_MAP[project.id] || project.images?.[0];
    if (imgSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw top image preview (occupying upper 72% of billboard)
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(24, 24, w - 48, 430, 16);
        ctx.clip();
        ctx.drawImage(img, 24, 24, w - 48, 430);
        ctx.restore();

        // Subtle gradient fade at image bottom
        const grad = ctx.createLinearGradient(0, 360, 0, 454);
        grad.addColorStop(0, 'rgba(23, 23, 21, 0)');
        grad.addColorStop(1, 'rgba(23, 23, 21, 0.95)');
        ctx.fillStyle = grad;
        ctx.fillRect(24, 360, w - 48, 94);

        // Lower editorial banner
        this.drawBillboardText(ctx, project, w);

        if (this.billboardTexture) {
          this.billboardTexture.needsUpdate = true;
        }
      };
      img.src = imgSrc;
    } else {
      this.drawBillboardText(ctx, project, w);
      if (this.billboardTexture) {
        this.billboardTexture.needsUpdate = true;
      }
    }
  }

  drawBillboardText(ctx, project, w) {
    // Project Category Pill
    ctx.fillStyle = '#C8B99A';
    ctx.font = 'bold 18px JetBrains Mono, monospace';
    ctx.fillText(`${project.category.toUpperCase()} • ${project.completed || 'ACTIVE'}`, 36, 495);

    // Project Main Title
    ctx.fillStyle = '#F8F7F2';
    ctx.font = 'bold 36px Space Grotesk, sans-serif';
    ctx.fillText(project.title, 36, 545);

    // Tagline / Short description
    ctx.fillStyle = '#A99A7D';
    ctx.font = '20px Manrope, sans-serif';
    const tag = project.tagline || project.description.slice(0, 80) + '...';
    ctx.fillText(tag, 36, 585);

    // "CLICK TO EXPLORE CASE STUDY" hint badge
    ctx.fillStyle = '#E5DCCB';
    ctx.fillRect(w - 320, 520, 280, 52);
    ctx.fillStyle = '#171715';
    ctx.font = 'bold 16px Space Grotesk, sans-serif';
    ctx.fillText('EXPLORE CASE STUDY →', w - 295, 552);
  }

  update(delta) {
    this.time += delta;

    // Subtle gentle hovering light pulse on active floor
    const activeFloor = this.floorMeshes.find((f) => f.projectId === this.activeProjectId);
    if (activeFloor && activeFloor.beltMesh) {
      const pulse = 0.6 + Math.sin(this.time * 3.0) * 0.25;
      activeFloor.beltMesh.material.emissiveIntensity = pulse;
    }
  }
}
