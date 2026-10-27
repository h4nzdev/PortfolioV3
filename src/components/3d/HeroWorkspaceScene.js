import * as THREE from 'three';

/**
 * HeroWorkspaceScene: Scene 01 — "The Developer at Work"
 * A carefully modeled, intimate architectural workspace featuring:
 * - A seated developer character coding at a desk with subtle typing animations
 * - Desk with mechanical keyboard, mouse, warm desk lamp, coffee mug, and succulent plant
 * - Computer display with a live code editor texture (syntax highlighting & blinking cursor)
 * - Architectural window opening allowing warm morning sunlight to stream in
 */
export class HeroWorkspaceScene {
  constructor(position = new THREE.Vector3(0, 0, 0)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);

    // Color Palette
    this.clayWhite = new THREE.MeshStandardMaterial({
      color: 0xF8F7F2,
      roughness: 0.35,
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
      roughness: 0.6,
      metalness: 0.05,
    });

    this.time = 0;

    this.initRoomArchitecture();
    this.initDeskAndChair();
    this.initComputerAndAccessories();
    this.initSeatedDeveloper();
  }

  initRoomArchitecture() {
    // Floor platform (warm architectural pedestal)
    const floorGeo = new THREE.BoxGeometry(6.4, 0.2, 5.4);
    const floorMesh = new THREE.Mesh(floorGeo, this.sandBeige);
    floorMesh.position.set(0, 0.1, 0);
    floorMesh.receiveShadow = true;
    this.group.add(floorMesh);

    // Floor accent trim
    const trimGeo = new THREE.BoxGeometry(6.5, 0.04, 5.5);
    const trimMesh = new THREE.Mesh(trimGeo, this.khaki);
    trimMesh.position.set(0, 0.21, 0);
    trimMesh.receiveShadow = true;
    this.group.add(trimMesh);

    // Architectural Wall with Window Cutout (Rear & Left)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xF8F7F2,
      roughness: 0.8,
      metalness: 0.02,
    });

    // Back wall
    const backWallGeo = new THREE.BoxGeometry(6.4, 3.8, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 2.0, -2.6);
    backWall.receiveShadow = true;
    this.group.add(backWall);

    // Left wall with window opening
    const wallLeftLower = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 5.2), wallMat);
    wallLeftLower.position.set(-3.1, 0.7, 0);
    wallLeftLower.receiveShadow = true;
    this.group.add(wallLeftLower);

    const wallLeftUpper = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.0, 5.2), wallMat);
    wallLeftUpper.position.set(-3.1, 3.4, 0);
    wallLeftUpper.receiveShadow = true;
    this.group.add(wallLeftUpper);

    const wallLeftPillarRear = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 1.4), wallMat);
    wallLeftPillarRear.position.set(-3.1, 2.0, -1.9);
    wallLeftPillarRear.receiveShadow = true;
    this.group.add(wallLeftPillarRear);

    const wallLeftPillarFront = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 1.4), wallMat);
    wallLeftPillarFront.position.set(-3.1, 2.0, 1.9);
    wallLeftPillarFront.receiveShadow = true;
    this.group.add(wallLeftPillarFront);

    // Window Frame
    const windowFrameGeo = new THREE.BoxGeometry(0.24, 1.65, 2.45);
    const windowFrame = new THREE.Mesh(windowFrameGeo, this.charcoal);
    windowFrame.position.set(-3.1, 2.0, 0);
    this.group.add(windowFrame);

    // Window Mullions (T-bars)
    const mullionH = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.05, 2.4), this.charcoal);
    mullionH.position.set(-3.1, 2.0, 0);
    this.group.add(mullionH);

    const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.6, 0.05), this.charcoal);
    mullionV.position.set(-3.1, 2.0, 0);
    this.group.add(mullionV);
  }

  initDeskAndChair() {
    this.deskGroup = new THREE.Group();
    this.deskGroup.position.set(0, 0.2, -0.6);

    // Desktop: Warm sand-beige with soft bevel
    const topGeo = new THREE.BoxGeometry(2.4, 0.08, 1.4);
    const topMesh = new THREE.Mesh(topGeo, this.sandBeige);
    topMesh.position.set(0, 1.25, 0);
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    this.deskGroup.add(topMesh);

    // Desk Legs (Slim modern charcoal trestle legs)
    const legGeo = new THREE.BoxGeometry(0.06, 1.25, 0.06);
    const legPositions = [
      [-1.1, 0.625, -0.6],
      [1.1, 0.625, -0.6],
      [-1.1, 0.625, 0.6],
      [1.1, 0.625, 0.6],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, this.charcoal);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      leg.receiveShadow = true;
      this.deskGroup.add(leg);
    });

    // Under-desk crossbar
    const crossbarGeo = new THREE.BoxGeometry(2.2, 0.04, 0.04);
    const crossbar = new THREE.Mesh(crossbarGeo, this.charcoal);
    crossbar.position.set(0, 0.3, -0.6);
    this.deskGroup.add(crossbar);

    this.group.add(this.deskGroup);

    // Modern Ergonomic Office Chair
    this.chairGroup = new THREE.Group();
    this.chairGroup.position.set(0, 0.2, 0.4);

    // Star Base & Castors
    const baseHub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16), this.deepBlack);
    baseHub.position.y = 0.1;
    this.chairGroup.add(baseHub);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.04), this.deepBlack);
      spoke.position.set(Math.cos(angle) * 0.22, 0.08, Math.sin(angle) * 0.22);
      spoke.rotation.y = -angle;
      this.chairGroup.add(spoke);
    }

    // Chair Gas Cylinder Column
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12), this.charcoal);
    column.position.y = 0.35;
    this.chairGroup.add(column);

    // Seat Cushion
    const seatGeo = new THREE.BoxGeometry(0.72, 0.1, 0.68);
    const seatMesh = new THREE.Mesh(seatGeo, this.charcoal);
    seatMesh.position.y = 0.62;
    seatMesh.castShadow = true;
    seatMesh.receiveShadow = true;
    this.chairGroup.add(seatMesh);

    // Curved Ergonomic Backrest
    const backGeo = new THREE.BoxGeometry(0.68, 0.75, 0.08);
    const backMesh = new THREE.Mesh(backGeo, this.charcoal);
    backMesh.position.set(0, 1.05, 0.32);
    backMesh.rotation.x = 0.08;
    backMesh.castShadow = true;
    this.chairGroup.add(backMesh);

    this.group.add(this.chairGroup);
  }

  initComputerAndAccessories() {
    this.computerGroup = new THREE.Group();
    this.computerGroup.position.set(0, 1.48, -0.9);

    // Monitor Stand
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.3), this.deepBlack);
    standBase.position.y = 0.01;
    this.computerGroup.add(standBase);

    const standStem = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.05), this.charcoal);
    standStem.position.set(0, 0.2, -0.05);
    standStem.castShadow = true;
    this.computerGroup.add(standStem);

    // Monitor Bezel & Frame
    const monitorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.88, 0.06), this.deepBlack);
    monitorFrame.position.set(0, 0.48, 0);
    monitorFrame.castShadow = true;
    this.computerGroup.add(monitorFrame);

    // Dynamic Live Code Editor Screen Canvas
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 512;
    this.screenCanvas.height = 320;
    this.screenCtx = this.screenCanvas.getContext('2d');

    this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
    this.screenTexture.minFilter = THREE.LinearFilter;

    const screenGeo = new THREE.PlaneGeometry(1.32, 0.8);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.screenTexture,
    });
    this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
    this.screenMesh.position.set(0, 0.48, 0.035);
    this.computerGroup.add(this.screenMesh);

    this.drawCodeEditor(0);

    // Soft warm screen glow onto keyboard and character
    const screenLight = new THREE.PointLight(0xF8F7F2, 0.4, 2.5);
    screenLight.position.set(0, 0.48, 0.2);
    this.computerGroup.add(screenLight);

    this.group.add(this.computerGroup);

    // Mechanical Keyboard
    const kbGeo = new THREE.BoxGeometry(0.72, 0.025, 0.26);
    const kbMesh = new THREE.Mesh(kbGeo, this.charcoal);
    kbMesh.position.set(0, 1.5, -0.52);
    kbMesh.castShadow = true;
    this.group.add(kbMesh);

    // Mouse & Mousepad
    const padGeo = new THREE.BoxGeometry(0.28, 0.005, 0.26);
    const padMesh = new THREE.Mesh(padGeo, this.khaki);
    padMesh.position.set(0.55, 1.49, -0.52);
    this.group.add(padMesh);

    const mouseGeo = new THREE.BoxGeometry(0.09, 0.03, 0.14);
    const mouseMesh = new THREE.Mesh(mouseGeo, this.deepBlack);
    mouseMesh.position.set(0.55, 1.505, -0.52);
    mouseMesh.castShadow = true;
    this.group.add(mouseMesh);

    // Desk Lamp (Warm Task Lighting)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-0.95, 1.48, -0.85);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.02, 16), this.charcoal);
    lampBase.position.y = 0.01;
    lampGroup.add(lampBase);

    // Angled Stem
    const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.4, 8), this.khaki);
    arm1.position.set(0.05, 0.2, 0.05);
    arm1.rotation.z = -0.3;
    lampGroup.add(arm1);

    const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.35, 8), this.khaki);
    arm2.position.set(0.18, 0.45, 0.1);
    arm2.rotation.z = 0.5;
    lampGroup.add(arm2);

    // Conical Lampshade
    const shadeGeo = new THREE.ConeGeometry(0.14, 0.18, 16, 1, true);
    shadeGeo.rotateX(Math.PI);
    shadeGeo.rotateZ(-0.4);
    const shadeMesh = new THREE.Mesh(shadeGeo, this.charcoal);
    shadeMesh.position.set(0.32, 0.52, 0.12);
    shadeMesh.castShadow = true;
    lampGroup.add(shadeMesh);

    // Warm Ambient Light from the lamp
    const lampLight = new THREE.PointLight(0xFCE8B2, 0.85, 3.2);
    lampLight.position.set(0.32, 0.46, 0.12);
    lampLight.castShadow = true;
    lampGroup.add(lampLight);

    this.group.add(lampGroup);

    // Coffee Mug on small coaster
    const coaster = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.01, 16), this.khaki);
    coaster.position.set(-0.6, 1.485, -0.45);
    this.group.add(coaster);

    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.12, 16), this.clayWhite);
    mug.position.set(-0.6, 1.545, -0.45);
    mug.castShadow = true;
    this.group.add(mug);

    // Desk Succulent in ceramic pot
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.12, 16), this.sandBeige);
    pot.position.set(0.9, 1.54, -0.85);
    pot.castShadow = true;
    this.group.add(pot);

    const plantMat = new THREE.MeshStandardMaterial({ color: 0x6E856E, roughness: 0.6 });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 8), plantMat);
      const ang = (i / 5) * Math.PI * 2;
      leaf.position.set(0.9 + Math.cos(ang) * 0.03, 1.63, -0.85 + Math.sin(ang) * 0.03);
      leaf.rotation.z = Math.cos(ang) * 0.35;
      leaf.rotation.x = Math.sin(ang) * 0.35;
      this.group.add(leaf);
    }
  }

  drawCodeEditor(time) {
    if (!this.screenCtx) return;
    const ctx = this.screenCtx;
    const w = 512;
    const h = 320;

    // Dark charcoal IDE window
    ctx.fillStyle = '#1A1917';
    ctx.fillRect(0, 0, w, h);

    // Tab bar
    ctx.fillStyle = '#262420';
    ctx.fillRect(0, 0, w, 32);

    // Active tab
    ctx.fillStyle = '#1A1917';
    ctx.fillRect(16, 4, 180, 28);
    ctx.fillStyle = '#C8B99A';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText('• HanzDeveloper.ts', 28, 22);

    // Code lines
    ctx.font = '13px JetBrains Mono, monospace';
    const lines = [
      { text: '// Hanz Magbal — Senior IT Student & Builder', color: '#85847E' },
      { text: 'import { FullStack, AI, Systems } from "@uspf/core";', color: '#C8B99A' },
      { text: '', color: '#F8F7F2' },
      { text: 'export class Developer implements Architect {', color: '#E5DCCB' },
      { text: '  readonly name = "Hanz Christian Angelo G. Magbal";', color: '#F8F7F2' },
      { text: '  readonly school = "University of Southern Philippines";', color: '#F8F7F2' },
      { text: '  readonly focus = ["React 19", "Next.js", "Supabase", "IoT"];', color: '#C8B99A' },
      { text: '', color: '#F8F7F2' },
      { text: '  async build(idea: Idea): Promise<ResilientApp> {', color: '#E5DCCB' },
      { text: '    const solution = await this.engineer(idea);', color: '#F8F7F2' },
      { text: '    return solution.shipToProduction();', color: '#C8B99A' },
      { text: '  }', color: '#E5DCCB' },
      { text: '}', color: '#E5DCCB' },
    ];

    lines.forEach((l, i) => {
      // Line numbers
      ctx.fillStyle = '#55534E';
      ctx.fillText(String(i + 1).padStart(2, ' '), 14, 56 + i * 20);

      // Line content
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, 44, 56 + i * 20);
    });

    // Blinking cursor on line 12
    const showCursor = Math.floor(time * 2.2) % 2 === 0;
    if (showCursor) {
      ctx.fillStyle = '#C8B99A';
      ctx.fillRect(72, 280, 8, 14);
    }

    if (this.screenTexture) {
      this.screenTexture.needsUpdate = true;
    }
  }

  initSeatedDeveloper() {
    this.characterGroup = new THREE.Group();
    // Positioned seated in front of desk
    this.characterGroup.position.set(0, 0.82, 0.4);

    // Hips / Pelvis
    const hipsGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.2, 20);
    const hips = new THREE.Mesh(hipsGeo, this.charcoal);
    hips.position.y = 0.05;
    this.characterGroup.add(hips);

    // Seated Thighs (horizontal forward toward desk)
    const thighGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.42, 16);
    thighGeo.rotateX(Math.PI / 2);

    const leftThigh = new THREE.Mesh(thighGeo, this.charcoal);
    leftThigh.position.set(-0.16, 0.08, -0.22);
    leftThigh.castShadow = true;
    this.characterGroup.add(leftThigh);

    const rightThigh = new THREE.Mesh(thighGeo, this.charcoal);
    rightThigh.position.set(0.16, 0.08, -0.22);
    rightThigh.castShadow = true;
    this.characterGroup.add(rightThigh);

    // Shin / Lower Legs (vertical down to floor)
    const shinGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.48, 16);

    const leftShin = new THREE.Mesh(shinGeo, this.charcoal);
    leftShin.position.set(-0.16, -0.2, -0.42);
    leftShin.castShadow = true;
    this.characterGroup.add(leftShin);

    const rightShin = new THREE.Mesh(shinGeo, this.charcoal);
    rightShin.position.set(0.16, -0.2, -0.42);
    rightShin.castShadow = true;
    this.characterGroup.add(rightShin);

    // Torso (leaning slightly forward toward screen)
    this.torso = new THREE.Group();
    this.torso.position.set(0, 0.15, 0);
    this.torso.rotation.x = 0.08; // subtle forward lean

    const torsoGeo = new THREE.CylinderGeometry(0.26, 0.22, 0.55, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, this.clayWhite);
    torsoMesh.position.y = 0.28;
    torsoMesh.castShadow = true;
    this.torso.add(torsoMesh);

    // Khaki collar ring
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 12, 24), this.khaki);
    collar.position.y = 0.54;
    collar.rotation.x = Math.PI / 2;
    this.torso.add(collar);

    // Head
    this.head = new THREE.Group();
    this.head.position.set(0, 0.72, 0);

    const headGeo = new THREE.SphereGeometry(0.22, 24, 24);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, this.clayWhite);
    headMesh.castShadow = true;
    this.head.add(headMesh);

    // Eyewear / Visor looking down at monitor
    const visorGeo = new THREE.CapsuleGeometry(0.04, 0.16, 12, 12);
    visorGeo.rotateZ(Math.PI / 2);
    const visor = new THREE.Mesh(visorGeo, this.deepBlack);
    visor.position.set(0, 0.02, 0.2);
    this.head.add(visor);

    this.head.rotation.x = 0.18; // gazing down at the code
    this.torso.add(this.head);

    // Left Arm (bent toward keyboard)
    this.leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.06, 0.32, 12), this.clayWhite);
    this.leftUpperArm.position.set(-0.3, 0.38, -0.05);
    this.leftUpperArm.rotation.x = 0.5;
    this.leftUpperArm.rotation.z = 0.2;
    this.torso.add(this.leftUpperArm);

    this.leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.34, 12), this.clayWhite);
    this.leftForearm.position.set(-0.24, 0.24, -0.26);
    this.leftForearm.rotation.x = 1.35;
    this.leftForearm.rotation.y = -0.2;
    this.torso.add(this.leftForearm);

    // Left Hand (fingers on keyboard)
    this.leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), this.charcoal);
    this.leftHand.position.set(-0.14, 0.16, -0.44);
    this.torso.add(this.leftHand);

    // Right Arm (moving between typing & mouse)
    this.rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.06, 0.32, 12), this.clayWhite);
    this.rightUpperArm.position.set(0.3, 0.38, -0.05);
    this.rightUpperArm.rotation.x = 0.5;
    this.rightUpperArm.rotation.z = -0.2;
    this.torso.add(this.rightUpperArm);

    this.rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.34, 12), this.clayWhite);
    this.rightForearm.position.set(0.24, 0.24, -0.26);
    this.rightForearm.rotation.x = 1.35;
    this.rightForearm.rotation.y = 0.2;
    this.torso.add(this.rightForearm);

    // Right Hand
    this.rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), this.charcoal);
    this.rightHand.position.set(0.14, 0.16, -0.44);
    this.torso.add(this.rightHand);

    this.characterGroup.add(this.torso);
    this.group.add(this.characterGroup);
  }

  update(delta) {
    this.time += delta;

    // 1. Subtle typing animation (hands alternating slightly)
    if (this.leftHand && this.rightHand) {
      const typeSpeed = this.time * 9.0;
      this.leftHand.position.y = 0.16 + Math.sin(typeSpeed) * 0.015;
      this.rightHand.position.y = 0.16 + Math.sin(typeSpeed + Math.PI) * 0.015;
    }

    // 2. Gentle breathing movement of torso
    if (this.torso) {
      this.torso.position.y = 0.15 + Math.sin(this.time * 2.2) * 0.008;
    }

    // 3. Subtle head nod/focus motion
    if (this.head) {
      this.head.rotation.x = 0.18 + Math.sin(this.time * 1.5) * 0.03;
      this.head.rotation.y = Math.sin(this.time * 0.8) * 0.04;
    }

    // 4. Update code editor screen blinking cursor
    this.drawCodeEditor(this.time);
  }
}
