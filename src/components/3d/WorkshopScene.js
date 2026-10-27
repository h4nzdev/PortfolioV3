import * as THREE from 'three';

/**
 * WorkshopScene: "How I Build"
 * An architectural installation of software craftsmanship.
 * Features a sculptural laptop with live code display, floating terminal surfaces,
 * stacked database cylinder tiers, and curved glowing API lines with traveling data pulses.
 */
export class WorkshopScene {
  constructor(position = new THREE.Vector3(18, 1.2, -10)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);

    // Material palette
    this.charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.35,
      metalness: 0.25,
    });

    this.whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.05,
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

    this.initSculpturalLaptop();
    this.initDatabaseStack();
    this.initFloatingTerminalPanels();
    this.initApiConnectionPipelines();

    this.time = 0;
  }

  initSculpturalLaptop() {
    this.laptopGroup = new THREE.Group();
    this.laptopGroup.position.set(-1.0, 0.4, 0);

    // Base Deck
    const baseGeo = new THREE.BoxGeometry(2.4, 0.1, 1.7);
    const baseMesh = new THREE.Mesh(baseGeo, this.charcoalMaterial);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.laptopGroup.add(baseMesh);

    // Minimal Keyboard Inset
    const kbGeo = new THREE.BoxGeometry(2.1, 0.02, 1.0);
    const kbMesh = new THREE.Mesh(kbGeo, new THREE.MeshStandardMaterial({
      color: 0x292824,
      roughness: 0.8,
    }));
    kbMesh.position.set(0, 0.055, 0.2);
    this.laptopGroup.add(kbMesh);

    // Trackpad
    const padGeo = new THREE.BoxGeometry(0.8, 0.015, 0.45);
    const padMesh = new THREE.Mesh(padGeo, this.khakiMaterial);
    padMesh.position.set(0, 0.055, -0.45);
    this.laptopGroup.add(padMesh);

    // Screen Hinge & Lid
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.05, -0.85);
    lidGroup.rotation.x = -Math.PI * 0.18; // Tilted slightly open

    const lidGeo = new THREE.BoxGeometry(2.4, 1.6, 0.08);
    const lidMesh = new THREE.Mesh(lidGeo, this.charcoalMaterial);
    lidMesh.position.set(0, 0.8, 0);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Dynamic Screen Texture (Minimalist code editor in JetBrains Mono)
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d');

    // Background: pure warm white editor with charcoal accents
    ctx.fillStyle = '#F8F7F2';
    ctx.fillRect(0, 0, 512, 340);

    // Title bar
    ctx.fillStyle = '#292824';
    ctx.fillRect(0, 0, 512, 36);
    ctx.fillStyle = '#C8B99A';
    ctx.font = '14px monospace';
    ctx.fillText('system_architecture.js — h4nz.dev', 18, 24);

    // Code lines
    ctx.fillStyle = '#151515';
    ctx.font = '16px monospace';
    const lines = [
      '1  const architect = new Developer({',
      '2    name: "Hanz Magbal",',
      '3    focus: ["Full-Stack", "Architecture", "AI"],',
      '4    pipeline: async () => {',
      '5      await ideate();',
      '6      await buildScalableSystems();',
      '7      return deployToProduction();',
      '8    }',
      '9  });',
    ];
    lines.forEach((line, i) => {
      ctx.fillStyle = i === 5 ? '#A99A7D' : '#292824';
      ctx.fillText(line, 20, 68 + i * 28);
    });

    const screenTexture = new THREE.CanvasTexture(canvas);
    const screenGeo = new THREE.PlaneGeometry(2.25, 1.45);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.8, 0.045);
    lidGroup.add(screenMesh);

    this.laptopGroup.add(lidGroup);
    this.group.add(this.laptopGroup);
  }

  initDatabaseStack() {
    this.databaseGroup = new THREE.Group();
    this.databaseGroup.position.set(2.4, 0.5, -0.6);

    // 3 Organized stacked cylinder tiers representing databases
    for (let i = 0; i < 3; i++) {
      const tierGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.35, 32);
      const tierMat = i % 2 === 0 ? this.whiteMaterial : this.sandMaterial;
      const tierMesh = new THREE.Mesh(tierGeo, tierMat);
      tierMesh.position.y = i * 0.45;
      tierMesh.castShadow = true;
      tierMesh.receiveShadow = true;
      this.databaseGroup.add(tierMesh);

      // Glowing khaki seam ring
      const ringGeo = new THREE.TorusGeometry(0.77, 0.02, 16, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, this.khakiMaterial);
      ringMesh.position.y = i * 0.45;
      this.databaseGroup.add(ringMesh);
    }

    this.group.add(this.databaseGroup);
  }

  initFloatingTerminalPanels() {
    this.terminalPanels = [];
    const panelConfigs = [
      { x: -2.8, y: 1.8, z: 0.8, rx: 0.1, ry: 0.3, text: '$ git commit -m "feat: scale backend"' },
      { x: 1.8, y: 2.2, z: 1.2, rx: -0.1, ry: -0.25, text: '✓ 12 tests passed (45ms)' },
    ];

    panelConfigs.forEach((cfg) => {
      const canvas = document.createElement('canvas');
      canvas.width = 380;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#151515';
      ctx.fillRect(0, 0, 380, 100);
      ctx.fillStyle = '#C8B99A';
      ctx.font = '16px monospace';
      ctx.fillText(cfg.text, 24, 56);

      const texture = new THREE.CanvasTexture(canvas);
      const geo = new THREE.PlaneGeometry(1.6, 0.45);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.baseY = cfg.y;
      mesh.rotation.x = cfg.rx;
      mesh.rotation.y = cfg.ry;
      this.group.add(mesh);
      this.terminalPanels.push(mesh);
    });
  }

  initApiConnectionPipelines() {
    // Curved glowing 3D pipeline connecting Laptop to Database
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 0.4, 0),
      new THREE.Vector3(0.8, 1.4, -0.4),
      new THREE.Vector3(1.6, 1.2, -0.6),
      new THREE.Vector3(2.4, 0.9, -0.6),
    ]);

    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      roughness: 0.3,
      metalness: 0.2,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.group.add(tubeMesh);

    // Traveling Data Beads
    this.dataBeads = [];
    for (let i = 0; i < 4; i++) {
      const beadGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const beadMat = new THREE.MeshStandardMaterial({
        color: 0x151515,
        roughness: 0.2,
      });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.tOffset = i * 0.25;
      this.group.add(bead);
      this.dataBeads.push(bead);
    }
    this.apiCurve = curve;
  }

  update(delta) {
    this.time += delta;

    // Gently float terminal panels
    this.terminalPanels.forEach((panel, i) => {
      panel.position.y = panel.baseY + Math.sin(this.time * 1.5 + i) * 0.08;
    });

    // Move data pulses along the API connection curve
    if (this.apiCurve && this.dataBeads) {
      this.dataBeads.forEach((bead) => {
        const t = (this.time * 0.35 + bead.tOffset) % 1.0;
        const pt = this.apiCurve.getPoint(t);
        bead.position.copy(pt);
      });
    }

    // Database cylinders slow subtle rotation
    if (this.databaseGroup) {
      this.databaseGroup.rotation.y = this.time * 0.2;
    }
  }
}
