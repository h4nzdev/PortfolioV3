import * as THREE from 'three';
import { HumanoidCharacter } from './Character.js';

import cert1Img from '../../assets/certificate/cert1.png';
import cert2Img from '../../assets/certificate/cert2.png';
import cert3Img from '../../assets/certificate/cert3.png';
import cert4Img from '../../assets/certificate/cert4.png';

/**
 * CourtyardScene: "The Human Element: Built Through Curiosity"
 * A tranquil, contemplative courtyard featuring:
 * 1. An architectural Achievement Gallery Wall with REAL framed certificates:
 *    - Top Innovator Award (USPF 2024)
 *    - NCII Computer Systems Servicing (TESDA)
 *    - USPF Research Congress Participant
 *    - 3rd Place Hackathon in the Hackestate
 * 2. Humanoid character standing beside the assembled journey monument.
 * 3. Drifting ambient particles.
 */
export class CourtyardScene {
  constructor(position = new THREE.Vector3(-24, 0.8, -14)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.textureLoader = new THREE.TextureLoader();
    this.interactiveCertificates = [];

    // Materials
    this.whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.3,
      metalness: 0.05,
    });

    this.charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.45,
      metalness: 0.25,
    });

    this.khakiMaterial = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      roughness: 0.55,
      metalness: 0.1,
    });

    this.sandMaterial = new THREE.MeshStandardMaterial({
      color: 0xE4D8C3,
      roughness: 0.7,
      metalness: 0.02,
    });

    this.initCourtyardBase();
    this.initAssembledMonument();
    this.initCertificateGalleryWall();
    this.initSecondaryCharacter();
    this.initAmbientParticles();

    this.time = 0;
  }

  initCourtyardBase() {
    // Large serene circular terrace
    const baseGeo = new THREE.CylinderGeometry(6.4, 6.8, 0.25, 48);
    const baseMesh = new THREE.Mesh(baseGeo, this.sandMaterial);
    baseMesh.position.y = 0.125;
    baseMesh.receiveShadow = true;
    this.group.add(baseMesh);

    // Concentric zen sand rings
    for (let r = 2.4; r <= 5.6; r += 1.4) {
      const ringGeo = new THREE.TorusGeometry(r, 0.02, 16, 48);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, this.khakiMaterial);
      ring.position.y = 0.26;
      this.group.add(ring);
    }
  }

  initCertificateGalleryWall() {
    this.certGroup = new THREE.Group();
    this.certGroup.position.set(0, 0.25, -2.6);

    const certImages = [
      { img: cert1Img, title: 'Top Innovator (USPF)', idx: 0 },
      { img: cert2Img, title: 'NCII CSS (TESDA)', idx: 1 },
      { img: cert3Img, title: 'Research Congress', idx: 2 },
      { img: cert4Img, title: 'Hackestate 3rd Place', idx: 3 },
    ];

    const frameW = 1.35;
    const frameH = 0.95;
    const spacing = 1.6;
    const startX = -((certImages.length - 1) * spacing) / 2;

    certImages.forEach((item, i) => {
      const frameGroup = new THREE.Group();
      const x = startX + i * spacing;
      const angle = (i - 1.5) * -0.12; // Gentle curved gallery wall
      frameGroup.position.set(x, 1.35, Math.sin(Math.abs(angle)) * 0.4);
      frameGroup.rotation.y = angle;

      // Stand pedestal
      const legGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.35, 12);
      const leg = new THREE.Mesh(legGeo, this.charcoalMaterial);
      leg.position.y = -0.68;
      frameGroup.add(leg);

      // Certificate Bezel Frame
      const frameGeo = new THREE.BoxGeometry(frameW + 0.08, frameH + 0.08, 0.05);
      const frame = new THREE.Mesh(frameGeo, this.charcoalMaterial);
      frame.castShadow = true;
      frameGroup.add(frame);

      // Certificate Texture
      const texture = this.textureLoader.load(item.img);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;

      const certGeo = new THREE.PlaneGeometry(frameW, frameH);
      const certMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
      });
      const certMesh = new THREE.Mesh(certGeo, certMat);
      certMesh.position.z = 0.028;
      certMesh.userData = { isCertificate: true, certIdx: item.idx };
      frameGroup.add(certMesh);

      this.interactiveCertificates.push(certMesh);
      this.certGroup.add(frameGroup);
    });

    this.group.add(this.certGroup);
  }

  initAssembledMonument() {
    const monument = new THREE.Group();
    monument.position.set(2.2, 0.25, 0.8);

    // 1. White Block Foundation
    const block1Geo = new THREE.BoxGeometry(1.4, 0.9, 1.4);
    const block1 = new THREE.Mesh(block1Geo, this.whiteMaterial);
    block1.position.y = 0.45;
    block1.castShadow = true;
    monument.add(block1);

    // 2. Charcoal Slender Pillar
    const pillarGeo = new THREE.BoxGeometry(0.5, 2.0, 0.5);
    const pillar = new THREE.Mesh(pillarGeo, this.charcoalMaterial);
    pillar.position.set(-0.35, 1.9, 0);
    pillar.castShadow = true;
    monument.add(pillar);

    // 3. Khaki Arch / Curved Segment
    const archGeo = new THREE.TorusGeometry(0.7, 0.1, 16, 32, Math.PI);
    const arch = new THREE.Mesh(archGeo, this.khakiMaterial);
    arch.position.set(0.3, 1.4, 0);
    arch.rotation.z = Math.PI / 2;
    arch.castShadow = true;
    monument.add(arch);

    // 4. Floating geometric milestone apex
    const apexGeo = new THREE.OctahedronGeometry(0.4, 0);
    const apex = new THREE.Mesh(apexGeo, this.khakiMaterial);
    apex.position.set(0, 3.2, 0);
    apex.castShadow = true;
    monument.apex = apex;
    monument.add(apex);

    this.group.add(monument);
    this.monument = monument;
  }

  initSecondaryCharacter() {
    this.character = new HumanoidCharacter({
      isSecondary: true,
      position: new THREE.Vector3(-1.8, 0.25, 0.6),
    });
    this.character.group.rotation.y = Math.PI * 0.2;
    this.group.add(this.character.group);
  }

  initAmbientParticles() {
    const count = 40;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10.0;
      positions[i * 3 + 1] = 0.5 + Math.random() * 4.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xC8B99A,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });

    this.particles = new THREE.Points(geometry, material);
    this.group.add(this.particles);
  }

  update(delta) {
    this.time += delta;

    if (this.character) {
      this.character.update(delta);
    }

    if (this.monument && this.monument.apex) {
      this.monument.apex.position.y = 3.2 + Math.sin(this.time * 1.5) * 0.08;
      this.monument.apex.rotation.y += delta * 0.4;
    }

    if (this.particles) {
      this.particles.rotation.y = this.time * 0.03;
    }
  }
}
