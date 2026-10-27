import * as THREE from 'three';

/**
 * SplineCamera: Master cinematic scroll-driven camera controller.
 * Guides the Three.js camera along a choreographed 3D spline through the 6 story scenes:
 * 01: Hero Workspace (Coding at desk)
 * 02: About Courtyard (Contemplative review on bench)
 * 03: Project Tower (Architectural building & billboard presentation)
 * 04: Milestone Stage (Ceremonial timeline of certificates)
 * 05: Education Pathway (Walking toward the USPF school gate)
 * 06: Client Meeting & Panoramic Reveal (Collaborative table & aerial diorama pull-back)
 */
export class SplineCamera {
  constructor(camera) {
    this.camera = camera;

    // Choreographed Waypoints [progress, cameraPos, lookAtTarget]
    this.waypoints = [
      // SCENE 01: HERO — The Developer at Work (0.00 – 0.16)
      {
        progress: 0.00,
        pos: new THREE.Vector3(0.0, 2.1, 3.2),
        target: new THREE.Vector3(0.0, 1.35, -0.6),
      },
      {
        progress: 0.08,
        pos: new THREE.Vector3(0.6, 2.3, 3.8),
        target: new THREE.Vector3(0.0, 1.35, -0.6),
      },
      {
        progress: 0.15,
        pos: new THREE.Vector3(3.2, 3.2, 5.5),
        target: new THREE.Vector3(2.0, 1.4, 0.5),
      },

      // SCENE 02: ABOUT — The Person Behind the Code (0.17 – 0.33)
      {
        progress: 0.20,
        pos: new THREE.Vector3(10.5, 2.8, 12.0),
        target: new THREE.Vector3(14.0, 1.4, 6.0),
      },
      {
        progress: 0.28,
        pos: new THREE.Vector3(16.0, 2.6, 10.5),
        target: new THREE.Vector3(14.0, 1.4, 6.0),
      },
      {
        progress: 0.33,
        pos: new THREE.Vector3(17.5, 4.0, 2.0),
        target: new THREE.Vector3(18.0, 2.0, -8.0),
      },

      // SCENE 03: PROJECTS — The Architecture of My Work (0.34 – 0.58)
      // Floor 1: Realynk
      {
        progress: 0.36,
        pos: new THREE.Vector3(16.5, 3.8, -12.5),
        target: new THREE.Vector3(21.0, 2.5, -20.0),
      },
      // Floor 2: PAL JourneyPad
      {
        progress: 0.41,
        pos: new THREE.Vector3(16.2, 5.0, -12.8),
        target: new THREE.Vector3(21.0, 4.2, -20.0),
      },
      // Floor 3: Langor AI
      {
        progress: 0.46,
        pos: new THREE.Vector3(16.0, 6.5, -13.0),
        target: new THREE.Vector3(21.0, 6.0, -20.0),
      },
      // Floor 4: G-TRASH
      {
        progress: 0.51,
        pos: new THREE.Vector3(15.8, 8.0, -13.2),
        target: new THREE.Vector3(21.0, 7.8, -20.0),
      },
      // Floor 5: KlinikaHub
      {
        progress: 0.56,
        pos: new THREE.Vector3(15.5, 9.5, -13.5),
        target: new THREE.Vector3(21.0, 9.4, -20.0),
      },

      // SCENE 04: CERTIFICATES & ACHIEVEMENTS — The Milestone Stage (0.59 – 0.72)
      {
        progress: 0.61,
        pos: new THREE.Vector3(0.0, 3.2, -34.5),
        target: new THREE.Vector3(0.0, 1.8, -42.0),
      },
      {
        progress: 0.68,
        pos: new THREE.Vector3(-1.8, 2.8, -36.0),
        target: new THREE.Vector3(0.0, 1.8, -42.0),
      },

      // SCENE 05: EDUCATION — The Walk Toward the Gate (0.73 – 0.86)
      {
        progress: 0.74,
        pos: new THREE.Vector3(-20.5, 3.0, -14.0),
        target: new THREE.Vector3(-22.0, 1.8, -20.0),
      },
      {
        progress: 0.82,
        pos: new THREE.Vector3(-21.2, 3.6, -18.0),
        target: new THREE.Vector3(-22.0, 2.4, -24.0),
      },

      // SCENE 06: LET'S TALK & PANORAMA (0.87 – 1.00)
      // Client Meeting
      {
        progress: 0.89,
        pos: new THREE.Vector3(-14.0, 2.4, 15.0),
        target: new THREE.Vector3(-14.0, 1.3, 10.0),
      },
      // Panoramic Pull-back
      {
        progress: 0.95,
        pos: new THREE.Vector3(-8.0, 16.0, 22.0),
        target: new THREE.Vector3(0.0, 2.0, -16.0),
      },
      {
        progress: 1.00,
        pos: new THREE.Vector3(0.0, 28.0, 26.0),
        target: new THREE.Vector3(0.0, 0.0, -18.0),
      },
    ];

    const posPoints = this.waypoints.map((w) => w.pos);
    const targetPoints = this.waypoints.map((w) => w.target);

    this.posSpline = new THREE.CatmullRomCurve3(posPoints, false, 'centripetal', 0.5);
    this.targetSpline = new THREE.CatmullRomCurve3(targetPoints, false, 'centripetal', 0.5);

    this.currentPos = new THREE.Vector3().copy(this.waypoints[0].pos);
    this.currentTarget = new THREE.Vector3().copy(this.waypoints[0].target);

    this.targetScroll = 0;
    this.dampedScroll = 0;
  }

  setScrollProgress(progress) {
    this.targetScroll = Math.max(0, Math.min(1, progress));
  }

  update(delta) {
    // Smooth exponential damping
    const lerpFactor = 1.0 - Math.exp(-delta * 5.0);
    this.dampedScroll += (this.targetScroll - this.dampedScroll) * lerpFactor;

    const t = Math.max(0.0001, Math.min(0.9999, this.dampedScroll));

    const targetPos = this.posSpline.getPointAt(t);
    const targetLook = this.targetSpline.getPointAt(t);

    this.currentPos.lerp(targetPos, lerpFactor);
    this.currentTarget.lerp(targetLook, lerpFactor);

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentTarget);
  }

  getActiveSceneIndex(scrollProgress) {
    if (scrollProgress < 0.17) return 1; // Hero Workspace
    if (scrollProgress < 0.34) return 2; // About Courtyard
    if (scrollProgress < 0.59) return 3; // Project Tower
    if (scrollProgress < 0.73) return 4; // Milestone Stage
    if (scrollProgress < 0.87) return 5; // Education Pathway
    return 6;                            // Client Meeting & Panorama
  }
}
