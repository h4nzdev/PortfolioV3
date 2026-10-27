import * as THREE from 'three';

/**
 * ArchitecturalWorld: The floating miniature landscape.
 * Features sculptured terraced terrain, minimal white buildings, black monoliths,
 * stylized clay trees, floating code glyphs, and the continuous khaki pathway
 * that unites the entire diorama.
 */
export class ArchitecturalWorld {
  constructor() {
    this.group = new THREE.Group();

    // Material palette
    this.whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.3,
      metalness: 0.05,
    });

    this.charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515, // Deep black
      roughness: 0.45,
      metalness: 0.3,
    });

    this.khakiMaterial = new THREE.MeshStandardMaterial({
      color: 0xC8B99A, // Light khaki
      roughness: 0.65,
      metalness: 0.05,
    });

    this.sandMaterial = new THREE.MeshStandardMaterial({
      color: 0xE4D8C3, // Sand
      roughness: 0.7,
      metalness: 0.02,
    });

    this.mutedBeigeMaterial = new THREE.MeshStandardMaterial({
      color: 0xA99A7D, // Muted beige
      roughness: 0.8,
      metalness: 0.0,
    });

    this.pathwayPoints = [
      new THREE.Vector3(0, 0.33, 1.5),     // Scene 1: Greeting Pedestal
      new THREE.Vector3(2, 0.4, 4.0),
      new THREE.Vector3(6, 0.6, 6.0),      // Curve out toward landscape
      new THREE.Vector3(12, 0.8, 4.0),
      new THREE.Vector3(15, 1.0, -2.0),
      new THREE.Vector3(18, 1.2, -10.0),   // Scene 4: Workshop
      new THREE.Vector3(22, 1.2, -18.0),
      new THREE.Vector3(28, 1.3, -28.0),   // Scene 5: Skills Landscape
      new THREE.Vector3(26, 1.3, -38.0),
      new THREE.Vector3(16, 1.3, -46.0),
      new THREE.Vector3(6, 1.3, -50.0),    // Scene 6: Project 1 (Realynk)
      new THREE.Vector3(-4, 1.3, -52.0),   // Scene 6: Project 2 (PAL)
      new THREE.Vector3(-14, 1.3, -48.0),  // Scene 6: Project 3 (Langor)
      new THREE.Vector3(-22, 1.3, -44.0),  // Scene 6: Project 4 (G-TRASH)
      new THREE.Vector3(-28, 1.2, -38.0),  // Scene 6: Project 5 (KlinikaHub)
      new THREE.Vector3(-26, 1.0, -24.0),
      new THREE.Vector3(-24, 0.8, -14.0),  // Scene 7: Courtyard (Human Element)
      new THREE.Vector3(-16, 0.6, -6.0),
      new THREE.Vector3(-8, 0.4, -2.0),
      new THREE.Vector3(0, 0.33, 1.5),     // Loops back to greeting
    ];

    this.initTerrain();
    this.initContinuousPathway();
    this.initArchitecturalBuildings();
    this.initTrees();
    this.initFloatingGlyphs();

    this.time = 0;
  }

  initTerrain() {
    // Stepped terraced floating landmass archipelago
    const terrainGroup = new THREE.Group();

    // 1. Base Island Foundation (Stepped Contours)
    const contours = [
      { radiusX: 38, radiusZ: 48, height: 1.2, y: -0.6, mat: this.mutedBeigeMaterial },
      { radiusX: 34, radiusZ: 44, height: 0.8, y: 0.0, mat: this.sandMaterial },
      { radiusX: 30, radiusZ: 40, height: 0.6, y: 0.5, mat: this.khakiMaterial },
    ];

    contours.forEach((c) => {
      const shape = new THREE.Shape();
      const segments = 48;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Subtle organic noise in contour boundary
        const noise = Math.sin(theta * 3) * 1.5 + Math.cos(theta * 5) * 1.0;
        const x = Math.cos(theta) * (c.radiusX + noise);
        const z = Math.sin(theta) * (c.radiusZ + noise);
        if (i === 0) shape.moveTo(x, z);
        else shape.lineTo(x, z);
      }

      const extrudeSettings = {
        depth: c.height,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.4,
        bevelThickness: 0.2,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.rotateX(Math.PI / 2);
      const mesh = new THREE.Mesh(geo, c.mat);
      mesh.position.set(0, c.y, -20);
      mesh.receiveShadow = true;
      terrainGroup.add(mesh);
    });

    // 2. Sculptural bedrock hills & platforms in background
    const hillData = [
      { x: -18, z: -25, r: 8, h: 4.5, mat: this.sandMaterial },
      { x: 24, z: -8, r: 7, h: 3.8, mat: this.khakiMaterial },
      { x: 30, z: -46, r: 10, h: 5.5, mat: this.mutedBeigeMaterial },
      { x: -32, z: -55, r: 9, h: 4.8, mat: this.sandMaterial },
      { x: 0, z: -68, r: 12, h: 6.2, mat: this.khakiMaterial },
    ];

    hillData.forEach((h) => {
      const geo = new THREE.ConeGeometry(h.r, h.h, 24, 4);
      const mesh = new THREE.Mesh(geo, h.mat);
      mesh.position.set(h.x, h.h / 2, h.z);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      terrainGroup.add(mesh);
    });

    this.group.add(terrainGroup);
  }

  initContinuousPathway() {
    this.pathCurve = new THREE.CatmullRomCurve3(this.pathwayPoints, true);

    // Continuous extruded ribbon for the pathway
    const tubeGeo = new THREE.TubeGeometry(this.pathCurve, 200, 0.45, 12, true);
    // Flatten tube slightly into a wide architectural ribbon
    tubeGeo.scale(1.8, 0.2, 1.8);

    const pathMesh = new THREE.Mesh(tubeGeo, this.khakiMaterial);
    pathMesh.receiveShadow = true;
    pathMesh.castShadow = true;
    this.group.add(pathMesh);

    // Subtle dark edge curb lines along the path
    const edgeCurveL = new THREE.TubeGeometry(this.pathCurve, 180, 0.05, 8, true);
    const edgeCurveR = new THREE.TubeGeometry(this.pathCurve, 180, 0.05, 8, true);
    const edgeMeshL = new THREE.Mesh(edgeCurveL, this.charcoalMaterial);
    const edgeMeshR = new THREE.Mesh(edgeCurveR, this.charcoalMaterial);
    edgeMeshL.position.y += 0.06;
    edgeMeshR.position.y += 0.06;
    this.group.add(edgeMeshL);
    this.group.add(edgeMeshR);
  }

  initArchitecturalBuildings() {
    const buildingsGroup = new THREE.Group();

    // Sculptural minimal buildings positioned across the landscape
    const structures = [
      // Central Architecture near Workshop
      { x: 12, y: 3.5, z: -16, w: 4.5, h: 7, d: 5, mat: this.whiteMaterial },
      { x: 14.5, y: 5.5, z: -14, w: 3, h: 2.5, d: 4, mat: this.charcoalMaterial },
      
      // Gateway Monoliths
      { x: 6, y: 3, z: 2, w: 0.8, h: 6, d: 1.2, mat: this.charcoalMaterial },
      { x: 9, y: 3.5, z: 2.5, w: 0.8, h: 7, d: 1.2, mat: this.whiteMaterial },
      
      // Cantilevered Research Pavilion (East side)
      { x: 32, y: 4, z: -20, w: 6, h: 5.5, d: 5, mat: this.whiteMaterial },
      { x: 30, y: 6.5, z: -21, w: 7, h: 1.2, d: 6, mat: this.khakiMaterial },

      // North Skyline Blocks (behind gallery)
      { x: -5, y: 6, z: -62, w: 8, h: 12, d: 6, mat: this.whiteMaterial },
      { x: 4, y: 7.5, z: -64, w: 5, h: 15, d: 5, mat: this.charcoalMaterial },
      { x: -14, y: 5, z: -60, w: 6, h: 10, d: 5.5, mat: this.sandMaterial },

      // West Monoliths (near Courtyard)
      { x: -30, y: 4.5, z: -22, w: 3.5, h: 9, d: 3.5, mat: this.charcoalMaterial },
      { x: -28, y: 3, z: -16, w: 4, h: 6, d: 4, mat: this.whiteMaterial },
    ];

    structures.forEach((b) => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mesh = new THREE.Mesh(geo, b.mat);
      mesh.position.set(b.x, b.y, b.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      buildingsGroup.add(mesh);

      // Add architectural slot or window cut-out line
      if (b.h > 6) {
        const slitGeo = new THREE.BoxGeometry(b.w * 0.9, 0.15, b.d * 1.02);
        const slitMesh = new THREE.Mesh(slitGeo, this.charcoalMaterial);
        slitMesh.position.set(b.x, b.y + b.h * 0.25, b.z);
        buildingsGroup.add(slitMesh);
      }
    });

    this.group.add(buildingsGroup);
  }

  initTrees() {
    const treesGroup = new THREE.Group();

    // Sculptural minimalist clay trees (spheres on dark trunks)
    const treePositions = [
      { x: 3, z: 8 },
      { x: 8, z: 7 },
      { x: 16, z: 3 },
      { x: 22, z: -6 },
      { x: 20, z: -14 },
      { x: 26, z: -22 },
      { x: 33, z: -34 },
      { x: 18, z: -44 },
      { x: 10, z: -46 },
      { x: -8, z: -46 },
      { x: -18, z: -42 },
      { x: -24, z: -32 },
      { x: -20, z: -18 },
      { x: -14, z: -10 },
      { x: -6, z: 2 },
    ];

    treePositions.forEach((pos, idx) => {
      const tree = new THREE.Group();
      tree.position.set(pos.x, 0.8, pos.z);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.4, 12);
      const trunk = new THREE.Mesh(trunkGeo, this.charcoalMaterial);
      trunk.position.y = 0.7;
      trunk.castShadow = true;
      tree.add(trunk);

      // Clay sphere canopy (varied scale and palette)
      const scale = 0.65 + (idx % 3) * 0.25;
      const foliageGeo = new THREE.SphereGeometry(scale, 20, 20);
      const mat = idx % 2 === 0 ? this.khakiMaterial : this.sandMaterial;
      const canopy = new THREE.Mesh(foliageGeo, mat);
      canopy.position.y = 1.4 + scale * 0.7;
      canopy.castShadow = true;
      tree.add(canopy);

      treesGroup.add(tree);
    });

    this.group.add(treesGroup);
  }

  initFloatingGlyphs() {
    this.glyphsGroup = new THREE.Group();

    // Floating tactile geometric code symbols
    const glyphData = [
      { x: 4, y: 3.5, z: 5, type: 'torus' },
      { x: 14, y: 4.8, z: -4, type: 'octahedron' },
      { x: 22, y: 4.0, z: -12, type: 'box' },
      { x: 27, y: 5.2, z: -26, type: 'torus' },
      { x: 2, y: 4.6, z: -48, type: 'octahedron' },
      { x: -16, y: 4.2, z: -45, type: 'box' },
      { x: -22, y: 4.5, z: -20, type: 'torus' },
    ];

    this.glyphMeshes = [];

    glyphData.forEach((g) => {
      let geo;
      if (g.type === 'torus') geo = new THREE.TorusGeometry(0.35, 0.08, 16, 24);
      else if (g.type === 'octahedron') geo = new THREE.OctahedronGeometry(0.4, 0);
      else geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);

      const mesh = new THREE.Mesh(geo, this.khakiMaterial);
      mesh.position.set(g.x, g.y, g.g_baseY = g.y, g.z);
      mesh.baseY = g.y;
      mesh.speed = 1.0 + Math.random();
      mesh.castShadow = true;
      this.glyphMeshes.push(mesh);
      this.glyphsGroup.add(mesh);
    });

    this.group.add(this.glyphsGroup);
  }

  update(delta) {
    this.time += delta;

    // Gently float glyphs
    this.glyphMeshes.forEach((mesh, i) => {
      mesh.position.y = mesh.baseY + Math.sin(this.time * mesh.speed + i) * 0.15;
      mesh.rotation.y += delta * 0.6;
      mesh.rotation.x += delta * 0.3;
    });
  }
}
