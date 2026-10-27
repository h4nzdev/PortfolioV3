import * as THREE from 'three';

/**
 * MasterWorldTerrain: The continuous floating miniature diorama.
 * Connects all 6 scenes:
 * 1. Hero Workspace (0, 0)
 * 2. About Courtyard (14, 6)
 * 3. Project Tower (22, -20)
 * 4. Milestone Stage (0, -42)
 * 5. Education Gate (-22, -22)
 * 6. Client Meeting (-14, 10)
 * Features stepped terraced landmasses, a continuous winding pathway, and minimalist trees.
 */
export class MasterWorldTerrain {
  constructor() {
    this.group = new THREE.Group();

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

    this.khaki = new THREE.MeshStandardMaterial({
      color: 0xC8B99A,
      roughness: 0.6,
      metalness: 0.05,
    });

    this.sandBeige = new THREE.MeshStandardMaterial({
      color: 0xE5DCCB,
      roughness: 0.7,
      metalness: 0.02,
    });

    this.mutedBeige = new THREE.MeshStandardMaterial({
      color: 0xA99A7D,
      roughness: 0.8,
      metalness: 0.0,
    });

    this.time = 0;

    this.initTerracedArchipelago();
    this.initContinuousStonePathway();
    this.initLandscapeTrees();
    this.initFloatingGeometricGlyphs();
  }

  initTerracedArchipelago() {
    const terrainGroup = new THREE.Group();

    // 3 Contoured tiered foundations forming the floating island
    const tiers = [
      { radiusX: 36, radiusZ: 44, h: 1.4, y: -0.8, mat: this.mutedBeige },
      { radiusX: 32, radiusZ: 40, h: 0.8, y: 0.0, mat: this.sandBeige },
      { radiusX: 28, radiusZ: 36, h: 0.5, y: 0.45, mat: this.khaki },
    ];

    tiers.forEach((t) => {
      const shape = new THREE.Shape();
      const segments = 48;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const noise = Math.sin(theta * 3) * 1.8 + Math.cos(theta * 5) * 1.2;
        const x = Math.cos(theta) * (t.radiusX + noise);
        const z = Math.sin(theta) * (t.radiusZ + noise);
        if (i === 0) shape.moveTo(x, z);
        else shape.lineTo(x, z);
      }

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: t.h,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.5,
        bevelThickness: 0.25,
      });
      geo.rotateX(Math.PI / 2);
      const mesh = new THREE.Mesh(geo, t.mat);
      mesh.position.set(0, t.y, -16);
      mesh.receiveShadow = true;
      terrainGroup.add(mesh);
    });

    // Sculptural background hills
    const hills = [
      { x: -16, z: -48, r: 9, h: 5.5, mat: this.sandBeige },
      { x: 26, z: -38, r: 10, h: 6.0, mat: this.mutedBeige },
      { x: 28, z: -2, r: 8, h: 4.5, mat: this.khaki },
      { x: -28, z: -4, r: 8, h: 4.8, mat: this.sandBeige },
      { x: 0, z: -58, r: 12, h: 7.0, mat: this.mutedBeige },
    ];

    hills.forEach((h) => {
      const geo = new THREE.ConeGeometry(h.r, h.h, 24, 4);
      const mesh = new THREE.Mesh(geo, h.mat);
      mesh.position.set(h.x, h.h / 2, h.z);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      terrainGroup.add(mesh);
    });

    this.group.add(terrainGroup);
  }

  initContinuousStonePathway() {
    // Waypoints threading the journey through all 6 scenes
    this.pathwayWaypoints = [
      new THREE.Vector3(0, 0.28, 2.0),     // Scene 1: Workspace
      new THREE.Vector3(7, 0.35, 4.0),
      new THREE.Vector3(14, 0.45, 6.0),    // Scene 2: About Courtyard
      new THREE.Vector3(18, 0.42, -6.0),
      new THREE.Vector3(22, 0.40, -20.0),  // Scene 3: Project Tower
      new THREE.Vector3(12, 0.38, -32.0),
      new THREE.Vector3(0, 0.35, -42.0),   // Scene 4: Milestone Stage
      new THREE.Vector3(-12, 0.35, -34.0),
      new THREE.Vector3(-22, 0.38, -22.0), // Scene 5: Education Gate
      new THREE.Vector3(-18, 0.40, -4.0),
      new THREE.Vector3(-14, 0.42, 10.0),  // Scene 6: Client Meeting
      new THREE.Vector3(-7, 0.35, 6.0),
      new THREE.Vector3(0, 0.28, 2.0),     // Closes loop
    ];

    this.pathCurve = new THREE.CatmullRomCurve3(this.pathwayWaypoints, true);

    const tubeGeo = new THREE.TubeGeometry(this.pathCurve, 200, 0.45, 8, true);
    tubeGeo.scale(1.8, 0.15, 1.8);
    const pathMesh = new THREE.Mesh(tubeGeo, this.khaki);
    pathMesh.receiveShadow = true;
    pathMesh.castShadow = true;
    this.group.add(pathMesh);

    // Dark curb lines
    const curbL = new THREE.Mesh(new THREE.TubeGeometry(this.pathCurve, 180, 0.04, 6, true), this.charcoal);
    const curbR = new THREE.Mesh(new THREE.TubeGeometry(this.pathCurve, 180, 0.04, 6, true), this.charcoal);
    curbL.position.y += 0.04;
    curbR.position.y += 0.04;
    this.group.add(curbL);
    this.group.add(curbR);
  }

  initLandscapeTrees() {
    const trees = new THREE.Group();

    const positions = [
      { x: 6, z: 2 },
      { x: 10, z: 8 },
      { x: 18, z: 2 },
      { x: 26, z: -10 },
      { x: 16, z: -22 },
      { x: 26, z: -30 },
      { x: 6, z: -36 },
      { x: -6, z: -38 },
      { x: -16, z: -28 },
      { x: -28, z: -14 },
      { x: -20, z: 4 },
      { x: -8, z: 12 },
    ];

    positions.forEach((pos, idx) => {
      const tree = new THREE.Group();
      tree.position.set(pos.x, 0.6, pos.z);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.6, 12), this.charcoal);
      trunk.position.y = 0.8;
      trunk.castShadow = true;
      tree.add(trunk);

      const scale = 0.7 + (idx % 3) * 0.25;
      const canopy = new THREE.Mesh(
        new THREE.SphereGeometry(scale, 16, 16),
        idx % 2 === 0 ? this.khaki : this.sandBeige
      );
      canopy.position.y = 1.6 + scale * 0.6;
      canopy.castShadow = true;
      tree.add(canopy);

      trees.add(tree);
    });

    this.group.add(trees);
  }

  initFloatingGeometricGlyphs() {
    this.glyphs = [];
    const glyphData = [
      { x: 5, y: 3.5, z: 3, type: 'torus' },
      { x: 16, y: 4.2, z: -2, type: 'box' },
      { x: 20, y: 5.5, z: -14, type: 'octahedron' },
      { x: 6, y: 4.8, z: -38, type: 'torus' },
      { x: -15, y: 4.0, z: -30, type: 'box' },
      { x: -18, y: 4.5, z: 0, type: 'octahedron' },
    ];

    glyphData.forEach((g) => {
      let geo;
      if (g.type === 'torus') geo = new THREE.TorusGeometry(0.3, 0.06, 12, 20);
      else if (g.type === 'octahedron') geo = new THREE.OctahedronGeometry(0.35, 0);
      else geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);

      const mesh = new THREE.Mesh(geo, this.khaki);
      mesh.position.set(g.x, g.y, g.z);
      mesh.baseY = g.y;
      mesh.speed = 1.0 + Math.random();
      mesh.castShadow = true;
      this.glyphs.push(mesh);
      this.group.add(mesh);
    });
  }

  update(delta) {
    this.time += delta;

    this.glyphs.forEach((mesh, i) => {
      mesh.position.y = mesh.baseY + Math.sin(this.time * mesh.speed + i) * 0.12;
      mesh.rotation.y += delta * 0.5;
      mesh.rotation.x += delta * 0.25;
    });
  }
}
