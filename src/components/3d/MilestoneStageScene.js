import * as THREE from 'three';
import { certifications } from '../../data/portfolioData';

import cert1Img from '../../assets/certificate/cert1.png';
import cert2Img from '../../assets/certificate/cert2.png';
import cert3Img from '../../assets/certificate/cert3.png';
import cert4Img from '../../assets/certificate/cert4.png';

const CERT_IMAGES = [cert1Img, cert2Img, cert3Img, cert4Img];

/**
 * MilestoneStageScene: Scene 04 — "Certificates and Achievements: The Milestone Stage"
 * A minimal ceremonial architectural gallery stage featuring:
 * - A timeline ribbon path uniting 4 sculptural milestone plinths
 * - Physical display frames showcasing real high-res certificates
 * - Raycastable interactive plinths linked to the Certificate inspection modal
 */
export class MilestoneStageScene {
  constructor(position = new THREE.Vector3(0, 0, -42)) {
    this.group = new THREE.Group();
    this.group.position.copy(position);

    this.textureLoader = new THREE.TextureLoader();
    this.interactiveCertificates = [];
    this.plinthGroups = [];

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

    this.activeMilestoneIdx = 0;
    this.time = 0;

    this.initCeremonialStage();
    this.initMilestonePlinths();
    this.initTimelineRibbon();
  }

  initCeremonialStage() {
    // Stepped low ceremonial terrace
    const stageGeo = new THREE.BoxGeometry(11.2, 0.3, 5.6);
    const stageMesh = new THREE.Mesh(stageGeo, this.sandBeige);
    stageMesh.position.y = 0.15;
    stageMesh.receiveShadow = true;
    this.group.add(stageMesh);

    // Accent border line
    const borderGeo = new THREE.BoxGeometry(11.4, 0.04, 5.8);
    const border = new THREE.Mesh(borderGeo, this.khaki);
    border.position.y = 0.31;
    this.group.add(border);

    // Architectural backdrop wall (Minimalist gallery partition behind plinths)
    const wallGeo = new THREE.BoxGeometry(11.0, 3.2, 0.2);
    const wall = new THREE.Mesh(wallGeo, this.clayWhite);
    wall.position.set(0, 1.9, -2.4);
    wall.receiveShadow = true;
    this.group.add(wall);

    // Subtle dark molding line atop wall
    const molding = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.08, 0.28), this.charcoal);
    molding.position.set(0, 3.54, -2.4);
    this.group.add(molding);
  }

  initMilestonePlinths() {
    const count = certifications.length;
    const spacing = 2.4;
    const startX = -((count - 1) * spacing) / 2;

    certifications.forEach((cert, idx) => {
      const plinthGroup = new THREE.Group();
      const x = startX + idx * spacing;
      plinthGroup.position.set(x, 0.3, -0.6);

      // 1. Charcoal Plinth Base
      const baseGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.9, 32);
      const baseMesh = new THREE.Mesh(baseGeo, this.charcoal);
      baseMesh.position.y = 0.45;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      plinthGroup.add(baseMesh);

      // Illuminated Khaki Ring on Plinth
      const ringGeo = new THREE.TorusGeometry(0.58, 0.03, 16, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, this.khaki.clone());
      ringMesh.position.y = 0.9;
      plinthGroup.add(ringMesh);
      plinthGroup.ringMesh = ringMesh;

      // 2. Slender display frame support stem
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 12);
      const stem = new THREE.Mesh(stemGeo, this.charcoal);
      stem.position.y = 1.25;
      stem.castShadow = true;
      plinthGroup.add(stem);

      // 3. Certificate Bezel Frame
      const frameW = 1.5;
      const frameH = 1.05;
      const frameGeo = new THREE.BoxGeometry(frameW + 0.08, frameH + 0.08, 0.06);
      const frameMesh = new THREE.Mesh(frameGeo, this.deepBlack);
      frameMesh.position.set(0, 1.85, 0);
      frameMesh.castShadow = true;
      plinthGroup.add(frameMesh);

      // 4. Real Certificate Texture
      const texture = this.textureLoader.load(CERT_IMAGES[idx] || cert.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;

      const certPlaneGeo = new THREE.PlaneGeometry(frameW, frameH);
      const certPlaneMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
      });
      const certMesh = new THREE.Mesh(certPlaneGeo, certPlaneMat);
      certMesh.position.set(0, 1.85, 0.035);

      // Tag for raycasting
      certMesh.userData = {
        isCertificate: true,
        certIdx: idx,
        title: cert.title,
        issuer: cert.issuer,
      };
      plinthGroup.add(certMesh);
      this.interactiveCertificates.push(certMesh);

      // 5. Plinth Halo Light
      const plinthLight = new THREE.PointLight(0xFCE8B2, 0.4, 2.2);
      plinthLight.position.set(0, 2.1, 0.6);
      plinthGroup.add(plinthLight);
      plinthGroup.plinthLight = plinthLight;

      // Milestone year badge plaque on base
      const yearCanvas = document.createElement('canvas');
      yearCanvas.width = 160;
      yearCanvas.height = 60;
      const yctx = yearCanvas.getContext('2d');
      yctx.fillStyle = '#171715';
      yctx.fillRect(0, 0, 160, 60);
      yctx.fillStyle = '#C8B99A';
      yctx.font = 'bold 16px Space Grotesk, sans-serif';
      yctx.fillText(`${cert.year} // 0${idx + 1}`, 16, 38);

      const yearTex = new THREE.CanvasTexture(yearCanvas);
      const yearPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.24), new THREE.MeshBasicMaterial({ map: yearTex }));
      yearPlane.position.set(0, 0.45, 0.58);
      plinthGroup.add(yearPlane);

      plinthGroup.certIdx = idx;
      this.plinthGroups.push(plinthGroup);
      this.group.add(plinthGroup);
    });
  }

  initTimelineRibbon() {
    // Inlaid timeline ribbon connecting all 4 plinths
    const ribbonGeo = new THREE.BoxGeometry(8.6, 0.02, 0.12);
    const ribbon = new THREE.Mesh(ribbonGeo, this.charcoal);
    ribbon.position.set(0, 0.32, -0.6);
    this.group.add(ribbon);

    // Glowing timeline node beads
    this.timelineNodes = [];
    const spacing = 2.4;
    const startX = -((certifications.length - 1) * spacing) / 2;

    certifications.forEach((_, idx) => {
      const nodeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16);
      const node = new THREE.Mesh(nodeGeo, this.khaki.clone());
      node.position.set(startX + idx * spacing, 0.33, -0.6);
      this.group.add(node);
      this.timelineNodes.push(node);
    });
  }

  setActiveMilestone(idx) {
    this.activeMilestoneIdx = idx;

    this.plinthGroups.forEach((pg) => {
      const isActive = pg.certIdx === idx;
      if (pg.ringMesh) {
        if (isActive) {
          pg.ringMesh.material.color.setHex(0xFCE8B2);
          pg.ringMesh.material.emissive.setHex(0xC8B99A);
          pg.ringMesh.material.emissiveIntensity = 0.8;
        } else {
          pg.ringMesh.material.color.setHex(0xC8B99A);
          pg.ringMesh.material.emissive.setHex(0x000000);
          pg.ringMesh.material.emissiveIntensity = 0;
        }
      }
      if (pg.plinthLight) {
        pg.plinthLight.intensity = isActive ? 1.0 : 0.3;
      }
    });

    this.timelineNodes.forEach((node, i) => {
      node.material.color.setHex(i === idx ? 0xFCE8B2 : 0xC8B99A);
    });
  }

  update(delta) {
    this.time += delta;

    // Subtle gentle glow on active plinth
    const activePlinth = this.plinthGroups[this.activeMilestoneIdx];
    if (activePlinth && activePlinth.ringMesh) {
      activePlinth.ringMesh.material.emissiveIntensity = 0.6 + Math.sin(this.time * 3.0) * 0.25;
    }
  }
}
