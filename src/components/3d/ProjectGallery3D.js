import * as THREE from 'three';

import realynkImg from '../../assets/projects/realynk/realynk1.png';
import palImg from '../../assets/projects/pal/pal1.png';
import langorImg from '../../assets/projects/langor/langor1.png';
import gtrashImg from '../../assets/projects/gtrash/gtrash1.png';
import klinikaImg from '../../assets/projects/klinkahub/k1.jpg';

/**
 * ProjectGallery3D: "Things I've Brought to Life"
 * Architectural exhibition pavilions featuring REAL project screenshots mapped
 * onto physical display screens along the continuous pathway.
 */
export class ProjectGallery3D {
  constructor() {
    this.group = new THREE.Group();
    this.interactiveObjects = [];
    this.textureLoader = new THREE.TextureLoader();

    // Materials
    this.whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.05,
    });

    this.charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.4,
      metalness: 0.3,
    });

    this.khakiMaterial = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      roughness: 0.5,
      metalness: 0.1,
    });

    this.sandMaterial = new THREE.MeshStandardMaterial({
      color: 0xE4D8C3,
      roughness: 0.6,
      metalness: 0.05,
    });

    this.initRealynkPavilion();
    this.initPalPavilion();
    this.initLangorPavilion();
    this.initGtrashPavilion();
    this.initKlinikaPavilion();

    // Tag all meshes with their respective project ID for robust raycasting
    [this.realynkGroup, this.palGroup, this.langorGroup, this.gtrashGroup, this.klinikaGroup].forEach(group => {
      if (!group) return;
      group.traverse(child => {
        if (child.isMesh) {
          child.userData.projectId = group.projectId;
          this.interactiveObjects.push(child);
        }
      });
    });

    this.time = 0;
  }

  createPlinth(x, z, r = 2.4, h = 0.3) {
    const plinthGeo = new THREE.CylinderGeometry(r, r + 0.2, h, 36);
    const plinth = new THREE.Mesh(plinthGeo, this.sandMaterial);
    plinth.position.set(x, h / 2, z);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    this.group.add(plinth);

    const ringGeo = new THREE.TorusGeometry(r * 0.9, 0.02, 16, 36);
    ringGeo.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, this.charcoalMaterial);
    ring.position.set(x, h + 0.01, z);
    this.group.add(ring);
  }

  createDisplayScreen(imageSrc, w = 2.4, h = 1.4) {
    const displayGroup = new THREE.Group();

    // Screen Bezel Frame
    const frameGeo = new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.08);
    const frameMesh = new THREE.Mesh(frameGeo, this.charcoalMaterial);
    frameMesh.castShadow = true;
    displayGroup.add(frameMesh);

    // Screen Texture
    const texture = this.textureLoader.load(imageSrc);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    const screenGeo = new THREE.PlaneGeometry(w, h);
    const screenMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.045;
    displayGroup.add(screenMesh);

    return displayGroup;
  }

  // 1. Realynk: ERP & Attendance Pavilion
  initRealynkPavilion() {
    const pos = { x: 6, z: -50 };
    this.createPlinth(pos.x, pos.z, 2.6);

    const pavilion = new THREE.Group();
    pavilion.position.set(pos.x, 0.3, pos.z);
    pavilion.projectId = 'realynk';

    // Monolithic tower
    const towerGeo = new THREE.BoxGeometry(1.2, 3.2, 0.9);
    const tower = new THREE.Mesh(towerGeo, this.whiteMaterial);
    tower.position.set(-1.0, 1.6, 0);
    tower.castShadow = true;
    pavilion.add(tower);

    // Rotating Attendance Clockwork Disk
    const clockGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32);
    clockGeo.rotateX(Math.PI / 2);
    const clock = new THREE.Mesh(clockGeo, this.charcoalMaterial);
    clock.position.set(-1.0, 2.4, 0.5);
    clock.castShadow = true;
    pavilion.clockMesh = clock;
    pavilion.add(clock);

    // Physical Display Screen with Realynk Screenshot
    const screen = this.createDisplayScreen(realynkImg, 2.2, 1.35);
    screen.position.set(0.6, 1.6, 0.2);
    screen.rotation.y = -Math.PI * 0.12;
    pavilion.add(screen);

    this.group.add(pavilion);
    this.realynkGroup = pavilion;
  }

  // 2. PAL JourneyPad: Nested Task Trees & AI Co-Pilot Orb
  initPalPavilion() {
    const pos = { x: -4, z: -52 };
    this.createPlinth(pos.x, pos.z, 2.6);

    const pavilion = new THREE.Group();
    pavilion.position.set(pos.x, 0.3, pos.z);
    pavilion.projectId = 'pal-journeypad';

    // Branching roadmap task cards
    const card1Geo = new THREE.BoxGeometry(1.4, 0.18, 0.8);
    const card1 = new THREE.Mesh(card1Geo, this.whiteMaterial);
    card1.position.set(-0.8, 0.5, 0);
    card1.castShadow = true;
    pavilion.add(card1);

    const card2Geo = new THREE.BoxGeometry(1.1, 0.16, 0.7);
    const card2 = new THREE.Mesh(card2Geo, this.khakiMaterial);
    card2.position.set(-1.1, 1.1, 0.2);
    card2.castShadow = true;
    pavilion.add(card2);

    // Connecting branches
    const branchGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8);
    const branch = new THREE.Mesh(branchGeo, this.charcoalMaterial);
    branch.position.set(-0.8, 1.0, 0);
    pavilion.add(branch);

    // Glowing AI Co-Pilot Orb at apex
    const orbGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xF8F7F2,
      roughness: 0.1,
      metalness: 0.2,
      emissive: 0xC8B99A,
      emissiveIntensity: 0.5,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(-0.8, 2.2, 0);
    orb.castShadow = true;
    pavilion.aiOrb = orb;
    pavilion.add(orb);

    // Physical Display Screen with PAL Screenshot
    const screen = this.createDisplayScreen(palImg, 2.2, 1.35);
    screen.position.set(0.6, 1.5, 0.3);
    screen.rotation.y = -Math.PI * 0.15;
    pavilion.add(screen);

    this.group.add(pavilion);
    this.palGroup = pavilion;
  }

  // 3. Langor AI: Voice Resonance & Dual AI Persona
  initLangorPavilion() {
    const pos = { x: -14, z: -48 };
    this.createPlinth(pos.x, pos.z, 2.6);

    const pavilion = new THREE.Group();
    pavilion.position.set(pos.x, 0.3, pos.z);
    pavilion.projectId = 'langor-ai';

    // Standing acoustic resonance rings
    pavilion.rings = [];
    for (let i = 0; i < 2; i++) {
      const ringGeo = new THREE.TorusGeometry(0.6 + i * 0.3, 0.03, 16, 48);
      const ringMat = i === 1 ? this.charcoalMaterial : this.khakiMaterial;
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(-1.0, 1.6, (i - 0.5) * 0.4);
      ring.castShadow = true;
      pavilion.rings.push(ring);
      pavilion.add(ring);
    }

    // Physical Display Screen with Langor AI Screenshot
    const screen = this.createDisplayScreen(langorImg, 2.2, 1.35);
    screen.position.set(0.5, 1.5, 0.3);
    screen.rotation.y = -Math.PI * 0.12;
    pavilion.add(screen);

    this.group.add(pavilion);
    this.langorGroup = pavilion;
  }

  // 4. G-TRASH: IoT Sensor Tower & Truck Path Spline
  initGtrashPavilion() {
    const pos = { x: -22, z: -44 };
    this.createPlinth(pos.x, pos.z, 2.6);

    const pavilion = new THREE.Group();
    pavilion.position.set(pos.x, 0.3, pos.z);
    pavilion.projectId = 'gtrash';

    // IoT Transmission Tower
    const towerGeo = new THREE.ConeGeometry(0.35, 2.4, 4);
    const tower = new THREE.Mesh(towerGeo, this.charcoalMaterial);
    tower.position.set(-1.2, 1.2, 0);
    tower.castShadow = true;
    pavilion.add(tower);

    // Blinking sensor beacon atop tower
    const beaconGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      emissive: 0xC8B99A,
      emissiveIntensity: 0.7,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(-1.2, 2.5, 0);
    pavilion.beacon = beacon;
    pavilion.add(beacon);

    // Physical Display Screen with G-TRASH Screenshot
    const screen = this.createDisplayScreen(gtrashImg, 2.2, 1.35);
    screen.position.set(0.4, 1.5, 0.3);
    screen.rotation.y = -Math.PI * 0.1;
    pavilion.add(screen);

    this.group.add(pavilion);
    this.gtrashGroup = pavilion;
  }

  // 5. KlinikaHub / Medora: Multi-Tenant Clinic Architecture
  initKlinikaPavilion() {
    const pos = { x: -28, z: -38 };
    this.createPlinth(pos.x, pos.z, 2.6);

    const pavilion = new THREE.Group();
    pavilion.position.set(pos.x, 0.3, pos.z);
    pavilion.projectId = 'klinikahub';

    // Modern architectural column
    const colGeo = new THREE.BoxGeometry(0.6, 2.2, 0.6);
    const col = new THREE.Mesh(colGeo, this.whiteMaterial);
    col.position.set(-1.1, 1.1, 0);
    col.castShadow = true;
    pavilion.add(col);

    // Physical Display Screen with KlinikaHub Screenshot
    const screen = this.createDisplayScreen(klinikaImg, 2.2, 1.35);
    screen.position.set(0.4, 1.5, 0.3);
    screen.rotation.y = -Math.PI * 0.12;
    pavilion.add(screen);

    this.group.add(pavilion);
    this.klinikaGroup = pavilion;
  }

  update(delta) {
    this.time += delta;

    // Realynk clockwork disk rotation
    if (this.realynkGroup && this.realynkGroup.clockMesh) {
      this.realynkGroup.clockMesh.rotation.z = this.time * 0.8;
    }

    // PAL AI Orb gentle levitation & glow pulse
    if (this.palGroup && this.palGroup.aiOrb) {
      this.palGroup.aiOrb.position.y = 2.2 + Math.sin(this.time * 2.2) * 0.08;
      this.palGroup.aiOrb.rotation.y = this.time * 0.5;
    }

    // Langor AI acoustic rings subtle breathing
    if (this.langorGroup && this.langorGroup.rings) {
      this.langorGroup.rings.forEach((r, i) => {
        r.rotation.z = Math.sin(this.time * 1.5 + i) * 0.15;
      });
    }

    // G-TRASH beacon subtle pulse
    if (this.gtrashGroup && this.gtrashGroup.beacon) {
      this.gtrashGroup.beacon.position.y = 2.5 + Math.sin(this.time * 3.0) * 0.03;
    }
  }
}
