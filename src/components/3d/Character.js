import * as THREE from 'three';

/**
 * Creates a stylized minimal 3D humanoid character.
 * Sculptural, friendly, and abstract with ceramic/clay materials.
 * Features a natural waving arm animation, gentle breathing, head tilt, and subtle cursor tracking.
 */
export class HumanoidCharacter {
  constructor(options = {}) {
    this.group = new THREE.Group();
    this.isSecondary = options.isSecondary || false;

    // Palette: Warm white ceramic, charcoal accents, light khaki accessories
    this.clayMaterial = new THREE.MeshStandardMaterial({
      color: 0xF8F7F2,
      roughness: 0.35,
      metalness: 0.05,
    });

    this.accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x292824, // Charcoal
      roughness: 0.4,
      metalness: 0.2,
    });

    this.khakiMaterial = new THREE.MeshStandardMaterial({
      color: 0xC8B99A, // Light khaki
      roughness: 0.5,
      metalness: 0.1,
    });

    this.sandMaterial = new THREE.MeshStandardMaterial({
      color: 0xE4D8C3,
      roughness: 0.6,
      metalness: 0.05,
    });

    this.pedestalGroup = new THREE.Group();
    this.bodyGroup = new THREE.Group();

    this.initPedestal();
    this.initBody();

    this.group.add(this.pedestalGroup);
    this.group.add(this.bodyGroup);

    // Initial positioning
    if (options.position) {
      this.group.position.copy(options.position);
    }

    // Animation state
    this.time = 0;
    this.targetHeadRotation = { x: 0, y: 0 };
  }

  initPedestal() {
    // Stepped circular khaki platform
    const baseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.2, 48);
    const baseMesh = new THREE.Mesh(baseGeo, this.khakiMaterial);
    baseMesh.position.y = 0.1;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    this.pedestalGroup.add(baseMesh);

    const stepGeo = new THREE.CylinderGeometry(2.0, 2.2, 0.15, 48);
    const stepMesh = new THREE.Mesh(stepGeo, this.sandMaterial);
    stepMesh.position.y = 0.25;
    stepMesh.receiveShadow = true;
    stepMesh.castShadow = true;
    this.pedestalGroup.add(stepMesh);

    // Subtle dark circular rim inlay
    const ringGeo = new THREE.TorusGeometry(1.6, 0.025, 16, 48);
    ringGeo.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, this.accentMaterial);
    ringMesh.position.y = 0.33;
    this.pedestalGroup.add(ringMesh);
  }

  initBody() {
    this.bodyGroup.position.y = 0.33;

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.85, 24);
    const leftLeg = new THREE.Mesh(legGeo, this.accentMaterial);
    leftLeg.position.set(-0.25, 0.425, 0);
    leftLeg.castShadow = true;
    this.bodyGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, this.accentMaterial);
    rightLeg.position.set(0.25, 0.425, 0);
    rightLeg.castShadow = true;
    this.bodyGroup.add(rightLeg);

    // Feet (minimalist rounded pods)
    const footGeo = new THREE.CapsuleGeometry(0.12, 0.2, 16, 16);
    footGeo.rotateX(Math.PI / 2);
    const leftFoot = new THREE.Mesh(footGeo, this.accentMaterial);
    leftFoot.position.set(-0.25, 0.08, 0.06);
    leftFoot.castShadow = true;
    this.bodyGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, this.accentMaterial);
    rightFoot.position.set(0.25, 0.08, 0.06);
    rightFoot.castShadow = true;
    this.bodyGroup.add(rightFoot);

    // Pelvis / Hips
    const hipGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.2, 24);
    const hips = new THREE.Mesh(hipGeo, this.accentMaterial);
    hips.position.set(0, 0.95, 0);
    hips.castShadow = true;
    this.bodyGroup.add(hips);

    // Torso (sleek tapered ceramic body)
    this.torso = new THREE.Group();
    this.torso.position.set(0, 1.05, 0);

    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.75, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, this.clayMaterial);
    torsoMesh.position.y = 0.375;
    torsoMesh.castShadow = true;
    this.torso.add(torsoMesh);

    // Minimal Khaki Collar / Scarf ring
    const scarfGeo = new THREE.TorusGeometry(0.32, 0.08, 16, 32);
    scarfGeo.rotateX(Math.PI / 2);
    const scarf = new THREE.Mesh(scarfGeo, this.khakiMaterial);
    scarf.position.y = 0.75;
    scarf.castShadow = true;
    this.torso.add(scarf);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.18, 24);
    const neck = new THREE.Mesh(neckGeo, this.accentMaterial);
    neck.position.y = 0.84;
    this.torso.add(neck);

    // Head Group (for tilting and looking around)
    this.head = new THREE.Group();
    this.head.position.set(0, 1.15, 0);

    // Head Geometry (smooth sculptural egg/capsule)
    const headGeo = new THREE.SphereGeometry(0.34, 32, 32);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, this.clayMaterial);
    headMesh.castShadow = true;
    this.head.add(headMesh);

    // Visor / Friendly Eye Bar (tactile inset charcoal visor)
    const visorGeo = new THREE.CapsuleGeometry(0.06, 0.24, 16, 16);
    visorGeo.rotateZ(Math.PI / 2);
    const visorMesh = new THREE.Mesh(visorGeo, this.accentMaterial);
    visorMesh.position.set(0, 0.04, 0.3);
    this.head.add(visorMesh);

    // Subtle warm ear discs
    const earGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 24);
    earGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earGeo, this.khakiMaterial);
    leftEar.position.set(-0.35, 0, 0);
    this.head.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, this.khakiMaterial);
    rightEar.position.set(0.35, 0, 0);
    this.head.add(rightEar);

    this.torso.add(this.head);

    // Left Arm (relaxed at side or holding device)
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.46, 0.65, 0);

    const leftUpperArmGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.42, 16);
    const leftUpperArm = new THREE.Mesh(leftUpperArmGeo, this.clayMaterial);
    leftUpperArm.position.y = -0.21;
    leftUpperArm.castShadow = true;
    this.leftArm.add(leftUpperArm);

    const leftForearm = new THREE.Group();
    leftForearm.position.set(0, -0.42, 0);
    const leftForearmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.38, 16);
    const leftForearmMesh = new THREE.Mesh(leftForearmGeo, this.clayMaterial);
    leftForearmMesh.position.y = -0.19;
    leftForearmMesh.castShadow = true;
    leftForearm.add(leftForearmMesh);

    // Left Hand
    const leftHandGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const leftHand = new THREE.Mesh(leftHandGeo, this.accentMaterial);
    leftHand.position.set(0, -0.42, 0);
    leftForearm.add(leftHand);

    this.leftArm.add(leftForearm);
    this.torso.add(this.leftArm);

    // Right Arm (The Waving Arm)
    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.46, 0.65, 0);

    if (this.isSecondary) {
      // Courtyard pose: arms resting or holding a compass/blueprint
      const rightUpperArmGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.42, 16);
      const rightUpperArm = new THREE.Mesh(rightUpperArmGeo, this.clayMaterial);
      rightUpperArm.position.y = -0.21;
      this.rightArm.add(rightUpperArm);

      const rightForearm = new THREE.Group();
      rightForearm.position.set(0, -0.42, 0);
      const rightForearmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.38, 16);
      const rightForearmMesh = new THREE.Mesh(rightForearmGeo, this.clayMaterial);
      rightForearmMesh.position.y = -0.19;
      rightForearm.add(rightForearmMesh);

      const rightHandGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const rightHand = new THREE.Mesh(rightHandGeo, this.accentMaterial);
      rightHand.position.set(0, -0.42, 0);
      rightForearm.add(rightHand);

      this.rightArm.add(rightForearm);
    } else {
      // Scene 1: Friendly greeting wave pose
      // Rotate shoulder upwards towards wave
      this.rightArm.rotation.z = -Math.PI * 0.72; // raised
      this.rightArm.rotation.x = 0.2;

      const rightUpperArmGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.42, 16);
      const rightUpperArm = new THREE.Mesh(rightUpperArmGeo, this.clayMaterial);
      rightUpperArm.position.y = -0.21;
      rightUpperArm.castShadow = true;
      this.rightArm.add(rightUpperArm);

      // Elbow joint
      this.rightForearm = new THREE.Group();
      this.rightForearm.position.set(0, -0.42, 0);
      this.rightForearm.rotation.z = Math.PI * 0.45; // bent inward toward face/head

      const rightForearmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.38, 16);
      const rightForearmMesh = new THREE.Mesh(rightForearmGeo, this.clayMaterial);
      rightForearmMesh.position.y = -0.19;
      rightForearmMesh.castShadow = true;
      this.rightForearm.add(rightForearmMesh);

      // Wrist & Hand Group
      this.rightHand = new THREE.Group();
      this.rightHand.position.set(0, -0.42, 0);

      // Palm (oval ceramic disc)
      const palmGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.05, 16);
      palmGeo.rotateX(Math.PI / 2);
      const palmMesh = new THREE.Mesh(palmGeo, this.accentMaterial);
      this.rightHand.add(palmMesh);

      // Stylized gentle fingers
      for (let i = -1.5; i <= 1.5; i++) {
        const fingerGeo = new THREE.CapsuleGeometry(0.022, 0.08, 8, 8);
        const finger = new THREE.Mesh(fingerGeo, this.accentMaterial);
        finger.position.set(i * 0.05, 0.08, 0);
        this.rightHand.add(finger);
      }

      this.rightForearm.add(this.rightHand);
      this.rightArm.add(this.rightForearm);
    }

    this.torso.add(this.rightArm);
    this.bodyGroup.add(this.torso);
  }

  updateCursor(mouse) {
    if (!mouse) return;
    // Map mouse [-1, 1] to gentle head tilt
    this.targetHeadRotation.y = mouse.x * 0.35;
    this.targetHeadRotation.x = -mouse.y * 0.25;
  }

  update(delta) {
    this.time += delta;

    // Gentle breathing cycle
    if (this.torso) {
      this.torso.position.y = 1.05 + Math.sin(this.time * 2.0) * 0.015;
    }

    // Natural waving animation for Scene 01 character
    if (this.rightForearm && this.rightHand && !this.isSecondary) {
      // Natural fluid wave oscillation with secondary hand oscillation
      const wavePrimary = Math.sin(this.time * 4.0);
      const waveSecondary = Math.cos(this.time * 4.0);

      this.rightForearm.rotation.z = Math.PI * 0.45 + wavePrimary * 0.32;
      this.rightHand.rotation.z = waveSecondary * 0.25;
      this.rightHand.rotation.x = wavePrimary * 0.15;
    }

    // Head subtle animation & cursor tracking interpolation
    if (this.head) {
      // Idle head tilt
      const idleTilt = Math.sin(this.time * 1.4) * 0.06;
      this.head.rotation.y += (this.targetHeadRotation.y - this.head.rotation.y) * 0.06;
      this.head.rotation.x += (this.targetHeadRotation.x - this.head.rotation.x) * 0.06;
      this.head.rotation.z = idleTilt;
    }
  }
}
