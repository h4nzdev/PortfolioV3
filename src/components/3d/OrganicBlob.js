import * as THREE from 'three';

// Custom GLSL Simplex Noise 3D implementation
const noiseGLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

/**
 * OrganicBlob: Liquid membrane inflating, folding and deforming
 * around the character and camera, creating an award-worthy spatial transition.
 */
export class OrganicBlob {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 1.8, 1.0);

    // High resolution sphere for smooth displacement
    const geometry = new THREE.SphereGeometry(2.4, 96, 96);

    this.uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 }, // 0.0 to 1.0 during Scene 02
      uInflation: { value: 0 }, // scales overall size
      uDistortion: { value: 0.8 },
      uColorA: { value: new THREE.Color(0xF8F7F2) }, // Warm white
      uColorB: { value: new THREE.Color(0xC8B99A) }, // Light khaki
      uColorC: { value: new THREE.Color(0xE4D8C3) }, // Sand
      uAperture: { value: 0.0 }, // Aperture hole that opens as we break through
    };

    const vertexShader = `
      uniform float uTime;
      uniform float uProgress;
      uniform float uInflation;
      uniform float uDistortion;
      uniform float uAperture;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vNoise;
      varying vec2 vUv;

      ${noiseGLSL}

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        // Multi-frequency liquid noise
        vec3 p = position;
        float noise1 = snoise(p * 0.85 + vec3(0.0, uTime * 0.4, uTime * 0.25));
        float noise2 = snoise(p * 1.75 - vec3(uTime * 0.3, 0.0, uTime * 0.35)) * 0.5;
        float totalNoise = noise1 + noise2;
        vNoise = totalNoise;

        // Dynamic inflation and deformation
        float displacement = totalNoise * uDistortion * (0.6 + uInflation * 0.8);
        
        // Stretch along z-axis during movement
        vec3 displaced = position + normal * displacement;
        displaced.z += sin(p.y * 2.0 + uTime) * 0.3 * uProgress;

        // Overall scale based on inflation
        displaced *= (0.2 + uInflation * 3.4);

        vPosition = displaced;
        vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = worldPos.xyz;

        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uProgress;
      uniform float uInflation;
      uniform float uAperture;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vNoise;
      varying vec2 vUv;

      void main() {
        // Fresnel rim effect
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
        fresnel = pow(fresnel, 2.2);

        // Blending palette based on noise and fresnel
        vec3 baseColor = mix(uColorA, uColorC, smoothstep(-0.5, 0.5, vNoise));
        baseColor = mix(baseColor, uColorB, fresnel * 0.85);

        // Pearlescent highlights
        float highlight = pow(max(dot(reflect(-viewDir, vNormal), vec3(0.0, 1.0, 0.5)), 0.0), 16.0);
        vec3 finalColor = baseColor + vec3(highlight * 0.4);

        // Opacity and membrane dissipation
        float alpha = mix(0.15, 0.92, uInflation);
        
        // When progress exceeds 0.65, dilate an aperture hole in center to unveil the world
        if (uProgress > 0.5) {
          float fade = 1.0 - smoothstep(0.5, 0.98, uProgress);
          alpha *= fade;
        }

        // Clip near-zero alpha to avoid depth write bugs
        if (alpha < 0.02) discard;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.group.add(this.mesh);

    // Initial scale: hidden until needed
    this.mesh.visible = false;
  }

  update(delta, scrollProgress) {
    this.uniforms.uTime.value += delta;

    // Active in scroll progress range [0.16, 0.30]
    // 0.16 - 0.21: Emerges & inflates around character
    // 0.21 - 0.26: Envelopes viewport and deforms dynamically
    // 0.26 - 0.30: Stretches, dilates aperture, and reveals world
    if (scrollProgress >= 0.14 && scrollProgress <= 0.32) {
      this.mesh.visible = true;

      // Local progress 0 to 1 inside Scene 02
      const sceneProgress = Math.min(Math.max((scrollProgress - 0.16) / 0.13, 0), 1);
      this.uniforms.uProgress.value = sceneProgress;

      // Inflation curve: rises swiftly, plateaus, then expands through camera
      const inflation =
        sceneProgress < 0.35
          ? sceneProgress / 0.35
          : sceneProgress < 0.7
            ? 1.0
            : 1.0 + (sceneProgress - 0.7) * 2.5;

      this.uniforms.uInflation.value = inflation;
      this.group.rotation.y += delta * 0.25;
      this.group.rotation.x = Math.sin(this.uniforms.uTime.value * 0.5) * 0.1;
    } else {
      this.mesh.visible = false;
    }
  }
}
