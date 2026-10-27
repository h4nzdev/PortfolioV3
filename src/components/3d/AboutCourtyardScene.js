import * as THREE from 'three';

/**
 * AboutCourtyardScene: Scene 02 — "The Person Behind the Code"
 * A calm, contemplative architectural courtyard where the developer character
 * sits comfortably on a low stone bench, reviewing work on a handheld tablet.
 * Evokes curiosity, reflection, and lifelong learning.
 */
export class AboutCourtyardScene {
  constructor(position = new THREE.Vector3(14, 0.4, 6)) {
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
      roughness: 0.65,
      metalness: 0.05,
    });

    this.time = 0;

    this.initCourtyardTerrace();
    this.initBench();
    this.initSeatedReflectiveDeveloper();
    this.initArchitecturalDetails();
  }

  initCourtyardTerrace() {
    // Stepped circular stone pavers
    const baseGeo = new THREE.CylinderGeometry(4.8, 5.2, 0.25, 40);
    const baseMesh = new THREE.Mesh(baseGeo, this.sandBeige);
    baseMesh.position.y = 0.125;
    baseMesh.receiveShadow = true;
    this.group.add(baseMesh);

    // Concentric zen grooves
    for (let r = 2.0; r <= 4.2; r += 1.1) {
      const ringGeo = new THREE.TorusGeometry(r, 0.02, 12, 40);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, this.khaki);
      ring.position.y = 0.255;
      this.group.add(ring);
    }
  }

  initBench() {
    this.benchGroup = new THREE.Group();
    this.benchGroup.position.set(0, 0.25, 0);

    // Low architectural bench slab
    const seatGeo = new THREE.BoxGeometry(2.4, 0.12, 0.85);
    const seat = new THREE.Mesh(seatGeo, this.clayWhite);
    seat.position.y = 0.52;
    seat.castShadow = true;
    seat.receiveShadow = true;
    this.benchGroup.add(seat);

    // Bench supports (two solid cantilevered blocks)
    const legGeo = new THREE.BoxGeometry(0.35, 0.52, 0.75);
    const leftLeg = new THREE.Mesh(legGeo, this.charcoal);
    leftLeg.position.set(-0.85, 0.26, 0);
    leftLeg.castShadow = true;
    this.benchGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, this.charcoal);
    rightLeg.position.set(0.85, 0.26, 0);
    rightLeg.castShadow = true;
    this.benchGroup.add(rightLeg);

    this.group.add(this.benchGroup);
  }

  initSeatedReflectiveDeveloper() {
    this.characterGroup = new THREE.Group();
    this.characterGroup.position.set(0, 0.86, 0.05);

    // Hips
    const hipsGeo = new THREE.CylinderGeometry(0.25, 0.23, 0.18, 20);
    const hips = new THREE.Mesh(hipsGeo, this.charcoal);
    hips.position.y = 0.02;
    this.characterGroup.add(hips);

    // Legs: Seated relaxed, one leg crossed slightly over the other
    const thighGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.44, 16);
    thighGeo.rotateX(Math.PI / 2);

    const leftThigh = new THREE.Mesh(thighGeo, this.charcoal);
    leftThigh.position.set(-0.16, 0.06, 0.22);
    leftThigh.castShadow = true;
    this.characterGroup.add(leftThigh);

    const rightThigh = new THREE.Mesh(thighGeo, this.charcoal);
    rightThigh.position.set(0.14, 0.1, 0.24);
    rightThigh.rotation.y = -0.15;
    rightThigh.castShadow = true;
    this.characterGroup.add(rightThigh);

    // Lower legs
    const shinGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.48, 16);

    const leftShin = new THREE.Mesh(shinGeo, this.charcoal);
    leftShin.position.set(-0.16, -0.22, 0.44);
    leftShin.castShadow = true;
    this.characterGroup.add(leftShin);

    const rightShin = new THREE.Mesh(shinGeo, this.charcoal);
    rightShin.position.set(0.12, -0.2, 0.46);
    rightShin.rotation.z = -0.12;
    rightShin.castShadow = true;
    this.characterGroup.add(rightShin);

    // Torso (Comfortable upright/slightly reclined seated posture)
    this.torso = new THREE.Group();
    this.torso.position.set(0, 0.12, 0);

    const torsoGeo = new THREE.CylinderGeometry(0.26, 0.23, 0.56, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, this.clayWhite);
    torsoMesh.position.y = 0.28;
    torsoMesh.castShadow = true;
    this.torso.add(torsoMesh);

    // Khaki collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 12, 24), this.khaki);
    collar.position.y = 0.54;
    collar.rotation.x = Math.PI / 2;
    this.torso.add(collar);

    // Head (gazing down at handheld tablet)
    this.head = new THREE.Group();
    this.head.position.set(0, 0.72, 0);

    const headGeo = new THREE.SphereGeometry(0.22, 24, 24);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, this.clayWhite);
    headMesh.castShadow = true;
    this.head.add(headMesh);

    const visorGeo = new THREE.CapsuleGeometry(0.04, 0.16, 12, 12);
    visorGeo.rotateZ(Math.PI / 2);
    const visor = new THREE.Mesh(visorGeo, this.deepBlack);
    visor.position.set(0, 0.02, 0.2);
    this.head.add(visor);

    this.head.rotation.x = 0.28; // tilted downward reading tablet
    this.torso.add(this.head);

    // Arms holding tablet in lap
    this.armsGroup = new THREE.Group();
    this.armsGroup.position.set(0, 0.38, 0);

    // Left Arm
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.44, 12), this.clayWhite);
    leftArm.position.set(-0.24, -0.06, 0.2);
    leftArm.rotation.x = 0.85;
    leftArm.rotation.z = -0.3;
    this.armsGroup.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.44, 12), this.clayWhite);
    rightArm.position.set(0.24, -0.06, 0.2);
    rightArm.rotation.x = 0.85;
    rightArm.rotation.z = 0.3;
    this.armsGroup.add(rightArm);

    // Handheld Tablet Device
    const tabletGeo = new THREE.BoxGeometry(0.42, 0.02, 0.28);
    const tabletMesh = new THREE.Mesh(tabletGeo, this.deepBlack);
    tabletMesh.position.set(0, -0.16, 0.36);
    tabletMesh.rotation.x = -0.45;
    tabletMesh.castShadow = true;
    this.armsGroup.add(tabletMesh);

    // Glowing tablet screen
    const tabletScreenGeo = new THREE.PlaneGeometry(0.38, 0.24);
    const tabletScreenMat = new THREE.MeshBasicMaterial({
      color: 0xF8F7F2,
    });
    const tabletScreen = new THREE.Mesh(tabletScreenGeo, tabletScreenMat);
    tabletScreen.position.set(0, -0.148, 0.36);
    tabletScreen.rotation.x = -Math.PI / 2 - 0.45;
    this.armsGroup.add(tabletScreen);

    // Subtle upward screen glow onto face
    const tabletGlow = new THREE.PointLight(0xF8F7F2, 0.3, 1.5);
    tabletGlow.position.set(0, -0.05, 0.35);
    this.armsGroup.add(tabletGlow);

    this.torso.add(this.armsGroup);
    this.characterGroup.add(this.torso);
    this.group.add(this.characterGroup);
  }

  initArchitecturalDetails() {
    // Sculptural Clay Tree beside the bench
    const tree = new THREE.Group();
    tree.position.set(-2.2, 0.25, -0.8);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 2.4, 12), this.charcoal);
    trunk.position.y = 1.2;
    trunk.castShadow = true;
    tree.add(trunk);

    const canopyMat = this.khaki;
    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 20), canopyMat);
    sphere1.position.set(0, 2.6, 0);
    sphere1.castShadow = true;
    tree.add(sphere1);

    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), this.sandBeige);
    sphere2.position.set(0.45, 3.1, -0.2);
    sphere2.castShadow = true;
    tree.add(sphere2);

    this.group.add(tree);

    // Minimalist Zen Pillar / Sculptural Lantern on the other side
    const lantern = new THREE.Group();
    lantern.position.set(2.4, 0.25, -0.5);

    const pillarBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.5), this.charcoal);
    pillarBase.position.y = 0.6;
    pillarBase.castShadow = true;
    lantern.add(pillarBase);

    const lanternTop = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.6), this.clayWhite);
    lanternTop.position.y = 1.26;
    lantern.add(lanternTop);

    // Warm ambient point light inside lantern slot
    const lanternLight = new THREE.PointLight(0xFCE8B2, 0.45, 3.0);
    lanternLight.position.set(0, 1.15, 0);
    lantern.add(lanternLight);

    this.group.add(lantern);
  }

  update(delta) {
    this.time += delta;

    // Gentle breathing and subtle head shift as if reading
    if (this.torso) {
      this.torso.position.y = 0.12 + Math.sin(this.time * 2.0) * 0.006;
    }

    if (this.head) {
      this.head.rotation.x = 0.28 + Math.sin(this.time * 1.2) * 0.02;
      this.head.rotation.y = Math.sin(this.time * 0.7) * 0.05;
    }

    if (this.armsGroup) {
      this.armsGroup.position.y = 0.38 + Math.sin(this.time * 2.0) * 0.004;
    }
  }
}
