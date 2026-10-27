import * as THREE from 'three';

/**
 * SkillsLandscape: "Tools Are Only the Beginning"
 * 5 Sculptural architectural installations representing technical capabilities.
 * Built with physical ceramic, sand, charcoal, and khaki materials with 3D text labels.
 */
export class SkillsLandscape {
  constructor(basePosition = new THREE.Vector3(0, 0, 0)) {
    this.group = new THREE.Group();
    this.group.position.copy(basePosition);

    // Materials
    this.whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.3,
      metalness: 0.05,
    });

    this.charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.4,
      metalness: 0.25,
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

    this.installations = [];

    this.initFrontendInstallation();
    this.initBackendInstallation();
    this.initDatabaseInstallation();
    this.initMobileIotInstallation();
    this.initAiProblemSolvingInstallation();

    this.time = 0;
  }

  createLabel(title, subtitle, width = 360, height = 110) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Minimal editorial background
    ctx.fillStyle = '#151515';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#C8B99A';
    ctx.font = 'bold 15px monospace';
    ctx.fillText(title.toUpperCase(), 18, 38);

    ctx.fillStyle = '#F8F7F2';
    ctx.font = '13px monospace';
    ctx.fillText(subtitle, 18, 72);

    const texture = new THREE.CanvasTexture(canvas);
    const planeGeo = new THREE.PlaneGeometry(1.5, 0.46);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });

    return new THREE.Mesh(planeGeo, planeMat);
  }

  // 1. Frontend: Layered Interface Panels
  initFrontendInstallation() {
    const inst = new THREE.Group();
    inst.position.set(26, 1.4, -26);

    // 3 Layered sliding interface planes
    const panels = [];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.BoxGeometry(1.8, 1.2, 0.06);
      const mat = i === 1 ? this.whiteMaterial : this.khakiMaterial;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(i * 0.25 - 0.25, i * 0.35 + 0.5, i * 0.3 - 0.3);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      panels.push(mesh);
      inst.add(mesh);
    }
    inst.panels = panels;

    const label = this.createLabel('Frontend Architecture', 'React 19 • Next.js • Tailwind • Vite');
    label.position.set(0, 2.3, 0.3);
    inst.add(label);

    this.installations.push(inst);
    this.group.add(inst);
  }

  // 2. Backend: Monolithic Server Pillars & Connected Bridges
  initBackendInstallation() {
    const inst = new THREE.Group();
    inst.position.set(32, 1.4, -28);

    const pillars = [];
    for (let i = 0; i < 3; i++) {
      const h = 1.6 + i * 0.4;
      const geo = new THREE.BoxGeometry(0.5, h, 0.5);
      const mesh = new THREE.Mesh(geo, this.charcoalMaterial);
      mesh.position.set((i - 1) * 0.8, h / 2, 0);
      mesh.castShadow = true;
      pillars.push(mesh);
      inst.add(mesh);
    }

    // Horizontal connection bridges
    const bridgeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.6, 8);
    bridgeGeo.rotateZ(Math.PI / 2);
    const bridge = new THREE.Mesh(bridgeGeo, this.khakiMaterial);
    bridge.position.set(0, 1.2, 0);
    inst.add(bridge);

    const label = this.createLabel('Backend Systems', 'Node.js • Python • PHP • Java • Socket.io');
    label.position.set(0, 2.5, 0.3);
    inst.add(label);

    this.installations.push(inst);
    this.group.add(inst);
  }

  // 3. Database: Concentric Circular Disk Towers
  initDatabaseInstallation() {
    const inst = new THREE.Group();
    inst.position.set(36, 1.4, -32);

    const disks = [];
    for (let i = 0; i < 4; i++) {
      const r = 0.8 - i * 0.1;
      const geo = new THREE.CylinderGeometry(r, r, 0.2, 32);
      const mat = i % 2 === 0 ? this.sandMaterial : this.whiteMaterial;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = i * 0.35 + 0.2;
      mesh.castShadow = true;
      disks.push(mesh);
      inst.add(mesh);
    }
    inst.disks = disks;

    const label = this.createLabel('Database & BaaS', 'Supabase • PostgreSQL • MongoDB • MySQL');
    label.position.set(0, 2.2, 0.4);
    inst.add(label);

    this.installations.push(inst);
    this.group.add(inst);
  }

  // 4. Mobile & IoT: Sculptural Smartphone & Sensor Satellites
  initMobileIotInstallation() {
    const inst = new THREE.Group();
    inst.position.set(30, 1.4, -38);

    // Smartphone chassis
    const phoneGeo = new THREE.BoxGeometry(0.9, 1.7, 0.1);
    const phoneMesh = new THREE.Mesh(phoneGeo, this.charcoalMaterial);
    phoneMesh.position.y = 0.95;
    phoneMesh.rotation.y = 0.2;
    phoneMesh.castShadow = true;
    inst.add(phoneMesh);

    // Microcontroller sensor node floating satellite
    const sensorGeo = new THREE.BoxGeometry(0.35, 0.25, 0.1);
    const sensorMesh = new THREE.Mesh(sensorGeo, this.khakiMaterial);
    sensorMesh.position.set(0.9, 1.2, 0);
    inst.sensorMesh = sensorMesh;
    inst.add(sensorMesh);

    // Signal ring
    const ringGeo = new THREE.TorusGeometry(0.3, 0.02, 16, 32);
    const ringMesh = new THREE.Mesh(ringGeo, this.sandMaterial);
    ringMesh.position.set(0.9, 1.2, 0);
    inst.ringMesh = ringMesh;
    inst.add(ringMesh);

    const label = this.createLabel('Mobile & IoT', 'React Native • ESP32 • WebSockets');
    label.position.set(0, 2.4, 0.3);
    inst.add(label);

    this.installations.push(inst);
    this.group.add(inst);
  }

  // 5. Problem Solving & AI: Geometric Prisms & Orbiting Mind Rings
  initAiProblemSolvingInstallation() {
    const inst = new THREE.Group();
    inst.position.set(24, 1.4, -34);

    // Central geometric prism
    const octaGeo = new THREE.OctahedronGeometry(0.7, 0);
    const octaMesh = new THREE.Mesh(octaGeo, this.whiteMaterial);
    octaMesh.position.y = 1.1;
    octaMesh.castShadow = true;
    inst.coreMesh = octaMesh;
    inst.add(octaMesh);

    // Orbiting thought rings
    const ringGeo = new THREE.TorusGeometry(1.1, 0.025, 16, 48);
    const ringMesh1 = new THREE.Mesh(ringGeo, this.khakiMaterial);
    ringMesh1.position.y = 1.1;
    ringMesh1.rotation.x = Math.PI / 3;
    inst.ring1 = ringMesh1;
    inst.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, this.sandMaterial);
    ringMesh2.position.y = 1.1;
    ringMesh2.rotation.y = Math.PI / 4;
    inst.ring2 = ringMesh2;
    inst.add(ringMesh2);

    const label = this.createLabel('AI & System Thinking', 'Groq API • Gemini • WebRTC • ElevenLabs');
    label.position.set(0, 2.4, 0.3);
    inst.add(label);

    this.installations.push(inst);
    this.group.add(inst);
  }

  update(delta) {
    this.time += delta;

    // Subtle kinetic motions
    this.installations.forEach((inst) => {
      if (inst.panels) {
        inst.panels.forEach((p, i) => {
          p.position.z = (i * 0.3 - 0.3) + Math.sin(this.time * 2.0 + i) * 0.05;
        });
      }
      if (inst.disks) {
        inst.disks.forEach((d, i) => {
          d.rotation.y = this.time * 0.3 * (i % 2 === 0 ? 1 : -1);
        });
      }
      if (inst.sensorMesh) {
        inst.sensorMesh.position.y = 1.2 + Math.sin(this.time * 2.5) * 0.08;
        inst.ringMesh.rotation.z += delta * 1.5;
      }
      if (inst.coreMesh) {
        inst.coreMesh.rotation.y += delta * 0.5;
        inst.coreMesh.rotation.x += delta * 0.25;
        inst.ring1.rotation.z += delta * 0.4;
        inst.ring2.rotation.x += delta * 0.3;
      }
    });
  }
}
