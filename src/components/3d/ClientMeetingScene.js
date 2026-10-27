import * as THREE from 'three';

/**
 * ClientMeetingScene: Scene 06 — "Let's Talk: A Conversation with a Client"
 * An intimate, collaborative meeting space featuring:
 * - A round conference table with two stylized seated characters in discussion
 * - Developer (Hanz) gesturing conversationally, Client character listening attentively
 * - Open laptop, coffee mugs, and an overhead warm architectural pendant lamp
 * - Preceding the final cinematic panoramic pull-back
 */
export class ClientMeetingScene {
  constructor(position = new THREE.Vector3(-14, 0, 10)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);

    // Materials
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

    this.initMeetingTerrace();
    this.initTableAndLamp();
    this.initCharacters();
  }

  initMeetingTerrace() {
    // Stepped circular terrace
    const baseGeo = new THREE.CylinderGeometry(4.2, 4.5, 0.25, 40);
    const base = new THREE.Mesh(baseGeo, this.sandBeige);
    base.position.y = 0.125;
    base.receiveShadow = true;
    this.group.add(base);

    // Accent perimeter ring
    const ringGeo = new THREE.TorusGeometry(3.8, 0.03, 16, 40);
    ringGeo.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, this.khaki);
    ring.position.y = 0.255;
    this.group.add(ring);

    // Low curved architectural privacy wall / partition behind
    const wallGeo = new THREE.CylinderGeometry(4.0, 4.0, 1.6, 32, 1, true, -Math.PI * 0.4, Math.PI * 0.8);
    const wall = new THREE.Mesh(wallGeo, this.clayWhite);
    wall.position.y = 1.05;
    wall.receiveShadow = true;
    this.group.add(wall);
  }

  initTableAndLamp() {
    this.tableGroup = new THREE.Group();
    this.tableGroup.position.set(0, 0.25, 0);

    // Round Meeting Table Top
    const tableTopGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 32);
    const tableTop = new THREE.Mesh(tableTopGeo, this.clayWhite);
    tableTop.position.y = 1.1;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    this.tableGroup.add(tableTop);

    // Table Bevel edge
    const bevelGeo = new THREE.TorusGeometry(1.18, 0.02, 12, 32);
    bevelGeo.rotateX(Math.PI / 2);
    const bevel = new THREE.Mesh(bevelGeo, this.khaki);
    bevel.position.y = 1.14;
    this.tableGroup.add(bevel);

    // Center Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.14, 0.28, 1.1, 24);
    const pedestal = new THREE.Mesh(pedestalGeo, this.charcoal);
    pedestal.position.y = 0.55;
    pedestal.castShadow = true;
    this.tableGroup.add(pedestal);

    // Open Laptop on table
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.015, 0.28), this.charcoal);
    laptopBase.position.set(0, 1.15, -0.05);
    laptopBase.castShadow = true;
    this.tableGroup.add(laptopBase);

    const laptopLid = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.26, 0.015), this.charcoal);
    laptopLid.position.set(0, 1.28, -0.18);
    laptopLid.rotation.x = -0.3;
    laptopLid.castShadow = true;
    this.tableGroup.add(laptopLid);

    // Glowing screen plane
    const lapScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.35, 0.23),
      new THREE.MeshBasicMaterial({ color: 0xF8F7F2 })
    );
    lapScreen.position.set(0, 1.28, -0.17);
    lapScreen.rotation.x = -0.3;
    this.tableGroup.add(lapScreen);

    // Coffee Cups
    [-0.45, 0.45].forEach((x, i) => {
      const mug = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.035, 0.08, 16),
        i === 0 ? this.clayWhite : this.khaki
      );
      mug.position.set(x, 1.18, 0.15);
      mug.castShadow = true;
      this.tableGroup.add(mug);
    });

    // Hanging Architectural Pendant Lamp
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.8, 8), this.charcoal);
    lampStem.position.set(0, 2.8, 0);
    this.tableGroup.add(lampStem);

    const shadeGeo = new THREE.ConeGeometry(0.28, 0.22, 24, 1, true);
    shadeGeo.rotateX(Math.PI);
    const shade = new THREE.Mesh(shadeGeo, this.charcoal);
    shade.position.set(0, 1.9, 0);
    this.tableGroup.add(shade);

    // Warm soft pool of light on the table
    const warmLight = new THREE.PointLight(0xFDF4DC, 1.1, 4.0);
    warmLight.position.set(0, 1.8, 0);
    warmLight.castShadow = true;
    this.tableGroup.add(warmLight);

    this.group.add(this.tableGroup);
  }

  initCharacters() {
    // 1. Developer Character (Seated Left, facing center/right)
    this.devGroup = new THREE.Group();
    this.devGroup.position.set(-1.25, 0.25, 0.05);
    this.devGroup.rotation.y = Math.PI * 0.48;

    this.createSeatedHuman(this.devGroup, {
      torsoMat: this.clayWhite,
      hipsMat: this.charcoal,
      collarMat: this.khaki,
      isDeveloper: true,
    });
    this.group.add(this.devGroup);

    // 2. Client Character (Seated Right, facing center/left)
    this.clientGroup = new THREE.Group();
    this.clientGroup.position.set(1.25, 0.25, 0.05);
    this.clientGroup.rotation.y = -Math.PI * 0.48;

    this.createSeatedHuman(this.clientGroup, {
      torsoMat: this.charcoal,
      hipsMat: this.deepBlack,
      collarMat: this.sandBeige,
      isDeveloper: false,
    });
    this.group.add(this.clientGroup);
  }

  createSeatedHuman(parentGroup, options) {
    // Chair
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 0.54), this.charcoal);
    chairSeat.position.y = 0.52;
    chairSeat.castShadow = true;
    parentGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.65, 0.06), this.charcoal);
    chairBack.position.set(0, 0.88, 0.25);
    chairBack.rotation.x = 0.08;
    chairBack.castShadow = true;
    parentGroup.add(chairBack);

    const chairLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 12), this.deepBlack);
    chairLeg.position.y = 0.25;
    parentGroup.add(chairLeg);

    // Hips
    const hips = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.16, 20), options.hipsMat);
    hips.position.y = 0.64;
    parentGroup.add(hips);

    // Seated Thighs
    const thighGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.4, 16);
    thighGeo.rotateX(Math.PI / 2);

    const leftThigh = new THREE.Mesh(thighGeo, options.hipsMat);
    leftThigh.position.set(-0.14, 0.68, -0.2);
    leftThigh.castShadow = true;
    parentGroup.add(leftThigh);

    const rightThigh = new THREE.Mesh(thighGeo, options.hipsMat);
    rightThigh.position.set(0.14, 0.68, -0.2);
    rightThigh.castShadow = true;
    parentGroup.add(rightThigh);

    // Lower Legs
    const shinGeo = new THREE.CylinderGeometry(0.07, 0.065, 0.48, 16);
    const leftShin = new THREE.Mesh(shinGeo, options.hipsMat);
    leftShin.position.set(-0.14, 0.42, -0.4);
    parentGroup.add(leftShin);

    const rightShin = new THREE.Mesh(shinGeo, options.hipsMat);
    rightShin.position.set(0.14, 0.42, -0.4);
    parentGroup.add(rightShin);

    // Torso
    const torso = new THREE.Group();
    torso.position.set(0, 0.76, 0);

    const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.52, 24), options.torsoMat);
    torsoMesh.position.y = 0.26;
    torsoMesh.castShadow = true;
    torso.add(torsoMesh);

    // Collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 12, 24), options.collarMat);
    collar.position.y = 0.5;
    collar.rotation.x = Math.PI / 2;
    torso.add(collar);

    // Head
    const head = new THREE.Group();
    head.position.set(0, 0.68, 0);

    const headGeo = new THREE.SphereGeometry(0.2, 24, 24);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, options.torsoMat);
    headMesh.castShadow = true;
    head.add(headMesh);

    const visor = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.14, 12, 12), this.deepBlack);
    visor.rotation.z = Math.PI / 2;
    visor.position.set(0, 0.02, -0.19);
    head.add(visor);

    torso.add(head);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.4, 12);

    const leftArm = new THREE.Mesh(armGeo, options.torsoMat);
    leftArm.position.set(-0.25, 0.32, -0.12);
    leftArm.rotation.x = 0.8;
    leftArm.rotation.z = 0.2;
    torso.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, options.torsoMat);
    rightArm.position.set(0.25, 0.32, -0.12);
    rightArm.rotation.x = 0.8;
    rightArm.rotation.z = -0.2;
    torso.add(rightArm);

    parentGroup.add(torso);

    if (options.isDeveloper) {
      this.devTorso = torso;
      this.devHead = head;
      this.devRightArm = rightArm;
    } else {
      this.clientTorso = torso;
      this.clientHead = head;
    }
  }

  update(delta) {
    this.time += delta;

    // Developer gesturing subtly during conversation
    if (this.devRightArm) {
      this.devRightArm.rotation.x = 0.8 + Math.sin(this.time * 2.5) * 0.12;
      this.devRightArm.rotation.y = Math.sin(this.time * 1.8) * 0.1;
    }

    if (this.devHead) {
      this.devHead.rotation.x = Math.sin(this.time * 1.2) * 0.04;
      this.devHead.rotation.y = Math.sin(this.time * 0.9) * 0.06;
    }

    // Client attentive listening nod
    if (this.clientHead) {
      this.clientHead.rotation.x = Math.sin(this.time * 1.5) * 0.035;
      this.clientHead.rotation.y = -Math.sin(this.time * 0.8) * 0.04;
    }

    if (this.devTorso && this.clientTorso) {
      this.devTorso.position.y = 0.76 + Math.sin(this.time * 2.0) * 0.005;
      this.clientTorso.position.y = 0.76 + Math.sin(this.time * 2.0 + 1.0) * 0.005;
    }
  }
}
