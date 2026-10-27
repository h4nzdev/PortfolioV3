import * as THREE from 'three';

/**
 * EducationPathwayScene: Scene 05 — "Education: The Walk Toward the Gate"
 * A calm architectural campus environment featuring:
 * - A paved stone pathway winding toward an iconic School Gate portal
 * - A stylized developer character walking along the path as the visitor scrolls
 * - Flanking sculptural trees and warm morning sunlight
 * - Representing Hanz's growth from Cabalagnan & Lahug to USPF BSIT
 */
export class EducationPathwayScene {
  constructor(position = new THREE.Vector3(-22, 0, -22)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);

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

    this.sceneProgress = 0;
    this.time = 0;

    this.initPathwayGround();
    this.initSchoolGate();
    this.initCampusTrees();
    this.initWalkingDeveloper();
  }

  initPathwayGround() {
    // Ground platform
    const groundGeo = new THREE.BoxGeometry(8.4, 0.25, 14.0);
    const ground = new THREE.Mesh(groundGeo, this.sandBeige);
    ground.position.set(0, 0.125, 0);
    ground.receiveShadow = true;
    this.group.add(ground);

    // Paved stone pathway leading from foreground (z = 6) straight to the school gate (z = -4.5)
    this.pathCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.26, 6.0),
      new THREE.Vector3(0.2, 0.26, 3.0),
      new THREE.Vector3(-0.1, 0.26, 0.0),
      new THREE.Vector3(0, 0.26, -3.8),
    ]);

    const pathGeo = new THREE.TubeGeometry(this.pathCurve, 64, 0.8, 8, false);
    pathGeo.scale(1.2, 0.04, 1.0);
    const pathMesh = new THREE.Mesh(pathGeo, this.clayWhite);
    pathMesh.receiveShadow = true;
    this.group.add(pathMesh);

    // Stone pathway curb edges
    [-0.95, 0.95].forEach((offset) => {
      const curbGeo = new THREE.BoxGeometry(0.08, 0.04, 10.0);
      const curb = new THREE.Mesh(curbGeo, this.charcoal);
      curb.position.set(offset, 0.28, 1.1);
      this.group.add(curb);
    });
  }

  initSchoolGate() {
    this.gateGroup = new THREE.Group();
    // Positioned at the terminus of the pathway
    this.gateGroup.position.set(0, 0.25, -4.2);

    const gateWidth = 4.2;
    const gateHeight = 4.2;
    const pillarW = 0.55;

    // Twin Architectural Pillars
    [-gateWidth / 2, gateWidth / 2].forEach((x) => {
      // Base
      const baseGeo = new THREE.BoxGeometry(pillarW + 0.2, 0.6, pillarW + 0.2);
      const base = new THREE.Mesh(baseGeo, this.charcoal);
      base.position.set(x, 0.3, 0);
      base.castShadow = true;
      this.gateGroup.add(base);

      // Shaft
      const shaftGeo = new THREE.BoxGeometry(pillarW, gateHeight, pillarW);
      const shaft = new THREE.Mesh(shaftGeo, this.clayWhite);
      shaft.position.set(x, gateHeight / 2 + 0.3, 0);
      shaft.castShadow = true;
      this.gateGroup.add(shaft);

      // Capital / Crown
      const capGeo = new THREE.BoxGeometry(pillarW + 0.15, 0.2, pillarW + 0.15);
      const cap = new THREE.Mesh(capGeo, this.charcoal);
      cap.position.set(x, gateHeight + 0.4, 0);
      this.gateGroup.add(cap);

      // Sphere finial atop each pillar
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), this.khaki);
      finial.position.set(x, gateHeight + 0.65, 0);
      finial.castShadow = true;
      this.gateGroup.add(finial);
    });

    // Grand Archway Overhead Beam
    const lintelGeo = new THREE.BoxGeometry(gateWidth + 0.8, 0.45, 0.6);
    const lintel = new THREE.Mesh(lintelGeo, this.clayWhite);
    lintel.position.set(0, gateHeight + 0.15, 0);
    lintel.castShadow = true;
    this.gateGroup.add(lintel);

    // Decorative Secondary Beam
    const subLintel = new THREE.Mesh(new THREE.BoxGeometry(gateWidth + 0.4, 0.1, 0.4), this.charcoal);
    subLintel.position.set(0, gateHeight - 0.1, 0);
    this.gateGroup.add(subLintel);

    // University of Southern Philippines Foundation Plaque
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 480;
    plaqueCanvas.height = 100;
    const pctx = plaqueCanvas.getContext('2d');
    pctx.fillStyle = '#171715';
    pctx.fillRect(0, 0, 480, 100);
    pctx.fillStyle = '#C8B99A';
    pctx.font = 'bold 20px Space Grotesk, sans-serif';
    pctx.fillText('UNIVERSITY OF SOUTHERN PHILIPPINES', 24, 42);
    pctx.fillStyle = '#E5DCCB';
    pctx.font = '14px JetBrains Mono, monospace';
    pctx.fillText('BSIT SENIOR • EST. CEBU CITY', 24, 76);

    const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
    const plaquePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 0.65),
      new THREE.MeshBasicMaterial({ map: plaqueTex })
    );
    plaquePlane.position.set(0, gateHeight + 0.15, 0.31);
    this.gateGroup.add(plaquePlane);

    // Soft warm morning sun halo behind gate
    const gateSunHalo = new THREE.PointLight(0xFDF4DC, 1.2, 10.0);
    gateSunHalo.position.set(0, gateHeight + 0.8, -1.5);
    this.gateGroup.add(gateSunHalo);

    this.group.add(this.gateGroup);
  }

  initCampusTrees() {
    const trees = new THREE.Group();

    // Sculptural trees flanking both sides of the pathway
    const treePositions = [
      { x: -2.4, z: 4.5 },
      { x: 2.4, z: 3.2 },
      { x: -2.6, z: 0.8 },
      { x: 2.6, z: -1.2 },
      { x: -2.8, z: -3.0 },
      { x: 2.8, z: -4.0 },
    ];

    treePositions.forEach((pos, idx) => {
      const tree = new THREE.Group();
      tree.position.set(pos.x, 0.25, pos.z);

      // Trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 2.2, 12), this.charcoal);
      trunk.position.y = 1.1;
      trunk.castShadow = true;
      tree.add(trunk);

      // Sphere canopy
      const scale = 0.8 + (idx % 2) * 0.2;
      const canopy = new THREE.Mesh(
        new THREE.SphereGeometry(scale, 16, 16),
        idx % 2 === 0 ? this.khaki : this.sandBeige
      );
      canopy.position.y = 2.4 + scale * 0.5;
      canopy.castShadow = true;
      tree.add(canopy);

      trees.add(tree);
    });

    this.group.add(trees);
  }

  initWalkingDeveloper() {
    this.character = new THREE.Group();
    this.character.position.set(0, 0.26, 5.0);

    // Hips
    const hipsGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.18, 20);
    this.hips = new THREE.Mesh(hipsGeo, this.charcoal);
    this.hips.position.y = 0.85;
    this.character.add(this.hips);

    // Left Leg
    this.leftLegGroup = new THREE.Group();
    this.leftLegGroup.position.set(-0.16, 0.85, 0);

    const legGeo = new THREE.CylinderGeometry(0.085, 0.075, 0.85, 16);
    const leftLeg = new THREE.Mesh(legGeo, this.charcoal);
    leftLeg.position.y = -0.425;
    leftLeg.castShadow = true;
    this.leftLegGroup.add(leftLeg);

    const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), this.deepBlack);
    leftFoot.position.set(0, -0.85, -0.05);
    this.leftLegGroup.add(leftFoot);

    this.character.add(this.leftLegGroup);

    // Right Leg
    this.rightLegGroup = new THREE.Group();
    this.rightLegGroup.position.set(0.16, 0.85, 0);

    const rightLeg = new THREE.Mesh(legGeo, this.charcoal);
    rightLeg.position.y = -0.425;
    rightLeg.castShadow = true;
    this.rightLegGroup.add(rightLeg);

    const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), this.deepBlack);
    rightFoot.position.set(0, -0.85, -0.05);
    this.rightLegGroup.add(rightFoot);

    this.character.add(this.rightLegGroup);

    // Torso
    this.torso = new THREE.Group();
    this.torso.position.set(0, 0.95, 0);

    const torsoGeo = new THREE.CylinderGeometry(0.26, 0.23, 0.65, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, this.clayWhite);
    torsoMesh.position.y = 0.325;
    torsoMesh.castShadow = true;
    this.torso.add(torsoMesh);

    // Khaki collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 12, 24), this.khaki);
    collar.position.y = 0.64;
    collar.rotation.x = Math.PI / 2;
    this.torso.add(collar);

    // Backpack (student backpack on back!)
    const bagGeo = new THREE.BoxGeometry(0.38, 0.48, 0.2);
    const bag = new THREE.Mesh(bagGeo, this.charcoal);
    bag.position.set(0, 0.34, 0.2);
    bag.castShadow = true;
    this.torso.add(bag);

    // Head
    this.head = new THREE.Group();
    this.head.position.set(0, 0.82, 0);

    const headGeo = new THREE.SphereGeometry(0.22, 24, 24);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, this.clayWhite);
    headMesh.castShadow = true;
    this.head.add(headMesh);

    const visorGeo = new THREE.CapsuleGeometry(0.04, 0.16, 12, 12);
    visorGeo.rotateZ(Math.PI / 2);
    const visor = new THREE.Mesh(visorGeo, this.deepBlack);
    visor.position.set(0, 0.02, -0.2); // facing towards the gate (negative Z)
    this.head.add(visor);

    this.torso.add(this.head);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.6, 12);

    this.leftArm = new THREE.Mesh(armGeo, this.clayWhite);
    this.leftArm.position.set(-0.32, 0.35, 0);
    this.leftArm.castShadow = true;
    this.torso.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeo, this.clayWhite);
    this.rightArm.position.set(0.32, 0.35, 0);
    this.rightArm.castShadow = true;
    this.torso.add(this.rightArm);

    this.character.add(this.torso);

    // Rotate character to face toward the gate (-Z)
    this.character.rotation.y = Math.PI;

    this.group.add(this.character);
  }

  setWalkingProgress(p) {
    this.sceneProgress = Math.max(0, Math.min(1, p));
  }

  update(delta) {
    this.time += delta;

    // Advance character along the path based on scroll progress
    if (this.character && this.pathCurve) {
      // Map progress 0.0 -> 1.0 to path points from z = 5.0 to z = -3.2
      const t = Math.max(0.01, Math.min(0.99, this.sceneProgress));
      const pt = this.pathCurve.getPointAt(t);
      this.character.position.x = pt.x;
      this.character.position.z = pt.z;

      // Walking oscillation frequency
      const walkRate = this.time * 6.0;
      const legAngle = Math.sin(walkRate) * 0.42;

      // Leg swinging
      if (this.leftLegGroup && this.rightLegGroup) {
        this.leftLegGroup.rotation.x = legAngle;
        this.rightLegGroup.rotation.x = -legAngle;
      }

      // Arm counter-swinging
      if (this.leftArm && this.rightArm) {
        this.leftArm.rotation.x = -legAngle * 0.8;
        this.rightArm.rotation.x = legAngle * 0.8;
      }

      // Torso gait bounce
      if (this.torso) {
        this.torso.position.y = 0.95 + Math.abs(Math.sin(walkRate)) * 0.035;
      }
    }
  }
}
