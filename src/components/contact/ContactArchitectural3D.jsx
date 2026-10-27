import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Send, CheckCircle2, Copy, ArrowDown, Sparkles, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

const smoothstep = (min, max, value) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

// Helper to generate a crisp 2D Canvas texture for the Wall Television
function createTVCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');

  // Background gradient: Deep luxury charcoal/slate
  const bgGrad = ctx.createLinearGradient(0, 0, 1280, 760);
  bgGrad.addColorStop(0, '#1B1A17');
  bgGrad.addColorStop(0.5, '#151412');
  bgGrad.addColorStop(1, '#0F0E0D');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1280, 760);

  // Subtle architectural grid background
  ctx.strokeStyle = 'rgba(200, 185, 154, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1280; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 760);
    ctx.stroke();
  }
  for (let y = 0; y < 760; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1280, y);
    ctx.stroke();
  }

  // Top Status Pill
  ctx.fillStyle = 'rgba(229, 220, 203, 0.12)';
  ctx.roundRect(70, 50, 420, 46, 23);
  ctx.fill();
  ctx.strokeStyle = 'rgba(200, 185, 154, 0.35)';
  ctx.stroke();

  // Pulse Dot
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(95, 73, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E5DCCB';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('06 // ARCHITECTURAL STUDIO • CEBU', 115, 79);

  // Main Headline
  ctx.fillStyle = '#F8F7F2';
  ctx.font = 'bold 64px "Space Grotesk", sans-serif';
  ctx.fillText('Have an idea?', 70, 180);

  ctx.fillStyle = '#C8B99A';
  ctx.fillText("Let's build something meaningful.", 70, 255);

  // Horizontal Accent Divider
  ctx.strokeStyle = 'rgba(200, 185, 154, 0.3)';
  ctx.beginPath();
  ctx.moveTo(70, 305);
  ctx.lineTo(1210, 305);
  ctx.stroke();

  // Information Cards Grid
  ctx.fillStyle = '#85847E';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('LEAD DEVELOPER & ARCHITECT', 70, 360);

  ctx.fillStyle = '#F8F7F2';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillText('Hanz Christian Angelo G. Magbal', 70, 400);

  ctx.fillStyle = '#C8B99A';
  ctx.font = '17px "Space Grotesk", sans-serif';
  ctx.fillText("Senior BSIT Candidate • Dean's List Standing • USPF Cebu", 70, 435);

  ctx.fillStyle = '#85847E';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('DIRECT INQUIRIES', 740, 360);

  ctx.fillStyle = '#F8F7F2';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('hanzchristianmagbal@gmail.com', 740, 400);

  ctx.fillStyle = '#C8B99A';
  ctx.font = '17px "Space Grotesk", sans-serif';
  ctx.fillText('Available for Full-Stack & Engineering Roles', 740, 435);

  // Bottom Interactive Footer Card on the TV
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.roundRect(70, 500, 1140, 180, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(200, 185, 154, 0.25)';
  ctx.stroke();

  ctx.fillStyle = '#F8F7F2';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('Open for Collaboration, Contract Engineering & Permanent Roles', 110, 555);

  ctx.fillStyle = '#85847E';
  ctx.font = '16px "JetBrains Mono", monospace';
  ctx.fillText('• Check the Bookshelf on the left for direct GitHub, LinkedIn, Email & Resume', 110, 605);
  ctx.fillText('• Click anywhere or scroll below to open the complete 2D Contact Portal', 110, 640);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Helper to generate custom book spine texture for interactive socials
function createSpineTexture(label, brandColor = '#171715', textColor = '#F8F7F2') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = brandColor;
  ctx.fillRect(0, 0, 128, 512);

  // Outer border
  ctx.strokeStyle = 'rgba(200, 185, 154, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, 116, 500);

  // Top emblem
  ctx.fillStyle = '#C8B99A';
  ctx.fillRect(20, 30, 88, 6);

  // Rotated vertical title
  ctx.save();
  ctx.translate(64, 300);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = textColor;
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(label, 0, 10);
  ctx.restore();

  // Bottom emblem
  ctx.fillStyle = '#C8B99A';
  ctx.fillRect(20, 470, 88, 6);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Helper to generate high-resolution VS Code / IDE screen displaying Hanz's personal information & codebase
function createLaptopCodeCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // 1. Editor Window Background (deep charcoal / dark slate IDE theme)
  ctx.fillStyle = '#0F1115';
  ctx.fillRect(0, 0, 1280, 800);

  // 2. macOS Window Titlebar Header (Height: 52px)
  ctx.fillStyle = '#171A21';
  ctx.fillRect(0, 0, 1280, 52);
  ctx.strokeStyle = '#232733';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 52);
  ctx.lineTo(1280, 52);
  ctx.stroke();

  // Traffic lights
  const dots = [
    { x: 30, c: '#FF5F56' }, // Close
    { x: 52, c: '#FFBD2E' }, // Min
    { x: 74, c: '#27C93F' }, // Max
  ];
  dots.forEach((d) => {
    ctx.fillStyle = d.c;
    ctx.beginPath();
    ctx.arc(d.x, 26, 6.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Active Tab
  ctx.fillStyle = '#0F1115';
  ctx.beginPath();
  ctx.roundRect(115, 8, 230, 44, [8, 8, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = '#232733';
  ctx.stroke();

  // Active Tab Top Accent Line (Gold)
  ctx.fillStyle = '#C8B99A';
  ctx.fillRect(115, 8, 230, 2.5);

  // TS Icon badge in tab
  ctx.fillStyle = '#3178C6';
  ctx.beginPath();
  ctx.roundRect(130, 20, 24, 18, 3);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 11px monospace';
  ctx.fillText('TS', 134, 33);

  // Tab Title
  ctx.fillStyle = '#E5DCCB';
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('developer.config.ts', 162, 33);

  // Tab Close '×'
  ctx.fillStyle = '#85847E';
  ctx.font = '14px sans-serif';
  ctx.fillText('×', 325, 33);

  // Breadcrumbs
  ctx.fillStyle = '#6E7681';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('portfolio-hanz › src › config › developer.config.ts', 370, 32);

  // Git branch badge on titlebar right
  ctx.fillStyle = 'rgba(200, 185, 154, 0.12)';
  ctx.beginPath();
  ctx.roundRect(1130, 14, 120, 26, 13);
  ctx.fill();
  ctx.strokeStyle = 'rgba(200, 185, 154, 0.3)';
  ctx.stroke();
  ctx.fillStyle = '#C8B99A';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('⑂ main*', 1160, 31);

  // 3. Gutter / Line Numbers Column (Width: 78px)
  ctx.fillStyle = '#0B0D11';
  ctx.fillRect(0, 52, 78, 710);
  ctx.strokeStyle = '#1D212A';
  ctx.beginPath();
  ctx.moveTo(78, 52);
  ctx.lineTo(78, 762);
  ctx.stroke();

  // 4. Code Syntax Highlighting Lines
  const codeLines = [
    [{ t: '// ─── ARCHITECTURAL CORE PROFILE ───', c: '#6A737D' }],
    [
      { t: 'import ', c: '#FF7B72' },
      { t: '{ SolutionsArchitect, FullStack } ', c: '#79C0FF' },
      { t: 'from ', c: '#FF7B72' },
      { t: "'@hanz/core';", c: '#A5D6FF' },
    ],
    [],
    [
      { t: 'export const ', c: '#FF7B72' },
      { t: 'developer', c: '#FFA657' },
      { t: ': SolutionsArchitect = {', c: '#E6EDF3' },
    ],
    [
      { t: '  name: ', c: '#79C0FF' },
      { t: "'Hanz Christian Angelo G. Magbal'", c: '#7EE787' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  handle: ', c: '#79C0FF' },
      { t: "'@h4nzdev'", c: '#7EE787' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  role: ', c: '#79C0FF' },
      { t: "'Full-Stack Engineer & Solutions Architect'", c: '#7EE787' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  education: ', c: '#79C0FF' },
      { t: "'BSIT • University of Southern Philippines Foundation'", c: '#ECC48D' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  honors: ', c: '#79C0FF' },
      { t: "'Consistent Dean\\'s Lister (1.27 GPA)'", c: '#ECC48D' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  location: ', c: '#79C0FF' },
      { t: "'Cebu City, Philippines 🇵🇭'", c: '#ECC48D' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  stack: ', c: '#79C0FF' },
      { t: "['React', 'TypeScript', 'Node.js', 'Python', 'Three.js']", c: '#A5D6FF' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  status: ', c: '#79C0FF' },
      { t: "'Available for High-Impact Roles & Contracts'", c: '#56D364' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  email: ', c: '#79C0FF' },
      { t: "'hanzchristianmagbal@gmail.com'", c: '#7EE787' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '  verified: ', c: '#79C0FF' },
      { t: 'true', c: '#FF7B72' },
      { t: ',', c: '#E6EDF3' },
    ],
    [
      { t: '};', c: '#E6EDF3' },
    ],
    [],
    [
      { t: 'export async function ', c: '#FF7B72' },
      { t: 'initiateCollaboration', c: '#D2A8FF' },
      { t: '() {', c: '#E6EDF3' },
    ],
    [
      { t: '  return await ', c: '#FF7B72' },
      { t: 'developer', c: '#FFA657' },
      { t: '.buildScalableProduct();', c: '#D2A8FF' },
    ],
    [
      { t: '}', c: '#E6EDF3' },
    ],
  ];

  const startY = 88;
  const lineHeight = 34;
  ctx.font = '500 17px "JetBrains Mono", "Fira Code", monospace';

  codeLines.forEach((lineTokens, idx) => {
    const y = startY + idx * lineHeight;

    // Line number
    ctx.fillStyle = '#484F58';
    ctx.textAlign = 'right';
    ctx.fillText(String(idx + 1).padStart(2, '0'), 58, y);

    // Tokens
    ctx.textAlign = 'left';
    let x = 98;
    lineTokens.forEach((tok) => {
      ctx.fillStyle = tok.c;
      ctx.fillText(tok.t, x, y);
      x += ctx.measureText(tok.t).width;
    });

    // Glowing blinking cursor on line 18
    if (idx === 18) {
      ctx.fillStyle = '#58A6FF';
      ctx.shadowColor = '#58A6FF';
      ctx.shadowBlur = 8;
      ctx.fillRect(x + 4, y - 16, 3, 20);
      ctx.shadowBlur = 0;
    }
  });

  // 5. Bottom Status Bar (Height: 38px)
  ctx.fillStyle = '#161A21';
  ctx.fillRect(0, 762, 1280, 38);
  ctx.strokeStyle = '#232733';
  ctx.beginPath();
  ctx.moveTo(0, 762);
  ctx.lineTo(1280, 762);
  ctx.stroke();

  // Left status bar info
  ctx.fillStyle = '#8B949E';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('⚡ ready', 20, 786);
  ctx.fillText('0 errors   0 warnings', 110, 786);

  // Right status bar info
  ctx.textAlign = 'right';
  ctx.fillText('UTF-8   TypeScript 5.4   Spaces: 2   Ln 19, Col 32', 1100, 786);

  // Green Ready pill
  ctx.fillStyle = '#238636';
  ctx.beginPath();
  ctx.roundRect(1120, 769, 140, 24, 12);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('● AVAILABLE', 1190, 785);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function ContactArchitectural3D({ onScrollToContactForm }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [mousePixelPos, setMousePixelPos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const progressRef = useRef(0);

  const handleCopyEmail = useCallback(() => {
    sound.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Track scroll progress along the 300vh section
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(p);
      progressRef.current = p;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isVisible = true;
    let animId = null;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F3EC);

    const initialWidth = container.clientWidth || window.innerWidth || 1200;
    const initialHeight = container.clientHeight || window.innerHeight || 800;
    const camera = new THREE.PerspectiveCamera(38, initialWidth / initialHeight, 0.1, 100);

    // Initial Camera position (Scene 1: Desktop Focus - zoomed out comfortably)
    const initialCamPos = new THREE.Vector3(0, 2.18, 2.22);
    const initialCamLook = new THREE.Vector3(0, 1.48, 0.16);
    camera.position.copy(initialCamPos);
    camera.lookAt(initialCamLook);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Materials with rich tactile contrast
    const clayWhite = new THREE.MeshStandardMaterial({ color: 0xFAF9F5, roughness: 0.3, metalness: 0.05 });
    const wallPlaster = new THREE.MeshStandardMaterial({ color: 0xEAE5DC, roughness: 0.65, metalness: 0.02 });
    const charcoal = new THREE.MeshStandardMaterial({ color: 0x262522, roughness: 0.5, metalness: 0.15 });
    const deepBlack = new THREE.MeshStandardMaterial({ color: 0x141312, roughness: 0.35, metalness: 0.4 });
    const khaki = new THREE.MeshStandardMaterial({ color: 0xC8B99A, roughness: 0.45, metalness: 0.2 });
    const sandBeige = new THREE.MeshStandardMaterial({ color: 0xE5DCCB, roughness: 0.65, metalness: 0.05 });
    const travertineFloor = new THREE.MeshStandardMaterial({ color: 0xD6CBB6, roughness: 0.7, metalness: 0.05 });

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xFFF9F0, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF4E0, 1.35);
    sunLight.position.set(-5, 7.5, 4.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // 3. Terrace Floor
    const terrace = new THREE.Mesh(
      new THREE.CylinderGeometry(5.4, 5.7, 0.3, 40),
      travertineFloor
    );
    terrace.position.y = 0.15;
    terrace.receiveShadow = true;
    scene.add(terrace);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(5.0, 0.04, 16, 40),
      khaki
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.31;
    scene.add(rim);

    // 4. Rear Wall
    const wallGroup = new THREE.Group();
    wallGroup.position.set(0, 0, -2.6);

    const wallMain = new THREE.Mesh(new THREE.BoxGeometry(9.6, 4.2, 0.2), wallPlaster);
    wallMain.position.set(0, 2.1, 0);
    wallMain.receiveShadow = true;
    wallGroup.add(wallMain);

    // Architectural baseboard trim
    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.14, 0.24), deepBlack);
    baseboard.position.set(0, 0.37, 0);
    wallGroup.add(baseboard);

    scene.add(wallGroup);

    // 5. WALL-MOUNTED TELEVISION DISPLAY
    const tvGroup = new THREE.Group();
    tvGroup.position.set(0, 2.45, -2.48);

    const tvFrame = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 2.15, 0.08),
      deepBlack
    );
    tvFrame.castShadow = true;
    tvGroup.add(tvFrame);

    const tvTexture = createTVCanvasTexture();
    const tvScreenMat = new THREE.MeshBasicMaterial({
      map: tvTexture,
    });
    const tvScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(3.48, 2.03),
      tvScreenMat
    );
    tvScreen.position.z = 0.045;
    tvGroup.add(tvScreen);

    const mountL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.1), charcoal);
    mountL.position.set(-0.8, 0, -0.06);
    tvGroup.add(mountL);
    const mountR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.1), charcoal);
    mountR.position.set(0.8, 0, -0.06);
    tvGroup.add(mountR);

    const tvLight = new THREE.PointLight(0xFFF7EC, 0.9, 4.5);
    tvLight.position.set(0, 0, 0.35);
    tvGroup.add(tvLight);

    scene.add(tvGroup);

    // 6. ARCHITECTURAL BOOKSHELF (SOCIALS ARSENAL)
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(-2.8, 0.3, -0.8);
    shelfGroup.rotation.y = Math.PI * 0.12;

    const shelfW = 1.25;
    const shelfH = 2.4;
    const shelfD = 0.42;

    [-shelfW / 2, shelfW / 2].forEach((xPos) => {
      const upright = new THREE.Mesh(new THREE.BoxGeometry(0.05, shelfH, shelfD), charcoal);
      upright.position.set(xPos, shelfH / 2, 0);
      upright.castShadow = true;
      shelfGroup.add(upright);
    });

    const shelfLevels = [0.05, 0.7, 1.35, 2.0, 2.38];
    shelfLevels.forEach((yPos) => {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(shelfW, 0.04, shelfD), khaki);
      plank.position.set(0, yPos, 0);
      plank.castShadow = true;
      shelfGroup.add(plank);
    });

    const interactiveSocialMeshes = [];

    const socialsList = [
      {
        id: 'github',
        name: 'GitHub Profile',
        tag: 'OPEN SOURCE CODEBASE',
        desc: 'Explore production codebases, AI experiments, repositories, and technical contributions.',
        statusLabel: 'Handle',
        statusValue: '@h4nzdev',
        url: personalInfo.socials.github,
        spineLabel: 'GITHUB',
        color: '#171715',
        textColor: '#F8F7F2',
        x: -0.36,
        y: 1.62,
        w: 0.12,
        h: 0.5,
        d: 0.3,
      },
      {
        id: 'linkedin',
        name: 'LinkedIn Network',
        tag: 'VERIFIED CREDENTIAL',
        desc: 'Connect for full-stack engineering roles, technical architecture, and professional inquiries.',
        statusLabel: 'Network',
        statusValue: 'Connect on LinkedIn',
        url: personalInfo.socials.linkedin,
        spineLabel: 'LINKEDIN',
        color: '#292824',
        textColor: '#C8B99A',
        x: -0.21,
        y: 1.63,
        w: 0.12,
        h: 0.52,
        d: 0.3,
      },
      {
        id: 'email',
        name: 'Direct Electronic Mail',
        tag: 'DIRECT INQUIRY',
        desc: 'Send proposals, project specifications, or collaboration requests directly to Hanz.',
        statusLabel: 'Protocol',
        statusValue: 'Send Email Message',
        url: `mailto:${personalInfo.email}`,
        spineLabel: 'EMAIL',
        color: '#C8B99A',
        textColor: '#171715',
        x: -0.06,
        y: 1.61,
        w: 0.12,
        h: 0.48,
        d: 0.3,
      },
      {
        id: 'resume',
        name: 'Curriculum Vitae',
        tag: 'VERIFIED CREDENTIAL',
        desc: "Verified academic Dean's list records, software engineering stack, and full background.",
        statusLabel: 'Format',
        statusValue: 'PDF Document (700KB)',
        url: resumePdf,
        spineLabel: 'RESUME',
        color: '#F8F7F2',
        textColor: '#171715',
        x: 0.1,
        y: 1.64,
        w: 0.13,
        h: 0.54,
        d: 0.32,
      },
    ];

    socialsList.forEach((soc) => {
      const spineTex = createSpineTexture(soc.spineLabel, soc.color, soc.textColor);

      const bookMaterials = [
        new THREE.MeshStandardMaterial({ color: soc.color, roughness: 0.4 }),
        new THREE.MeshStandardMaterial({ color: soc.color, roughness: 0.4 }),
        new THREE.MeshStandardMaterial({ color: 0xF5F0E6, roughness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0xF5F0E6, roughness: 0.6 }),
        new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.3 }),
        new THREE.MeshStandardMaterial({ color: soc.color, roughness: 0.4 }),
      ];

      const bookMesh = new THREE.Mesh(new THREE.BoxGeometry(soc.w, soc.h, soc.d), bookMaterials);
      bookMesh.position.set(soc.x, soc.y, 0);
      bookMesh.castShadow = true;
      bookMesh.userData = {
        isSocial: true,
        id: soc.id,
        name: soc.name,
        tag: soc.tag,
        desc: soc.desc,
        statusLabel: soc.statusLabel,
        statusValue: soc.statusValue,
        url: soc.url,
      };

      shelfGroup.add(bookMesh);
      interactiveSocialMeshes.push(bookMesh);
    });

    const bookEnd = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.28), charcoal);
    bookEnd.position.set(0.3, 1.55, 0);
    shelfGroup.add(bookEnd);

    const colors = [0x292824, 0xC8B99A, 0xE5DCCB, 0x171715];
    for (let b = 0; b < 6; b++) {
      const bGeo = new THREE.BoxGeometry(0.07, 0.42 + Math.sin(b) * 0.05, 0.26);
      const bMat = new THREE.MeshStandardMaterial({ color: colors[b % colors.length], roughness: 0.5 });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(-0.35 + b * 0.08, 0.94, 0);
      shelfGroup.add(bMesh);
    }

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.16, 16), sandBeige);
    pot.position.set(0, 2.46, 0);
    shelfGroup.add(pot);

    const plant = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 1), new THREE.MeshStandardMaterial({ color: 0x485E3B, roughness: 0.8 }));
    plant.position.set(0, 2.62, 0);
    shelfGroup.add(plant);

    scene.add(shelfGroup);

    // 7. Minimalist Meeting Table & Desktop
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0.3, 0.2);

    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.35, 0.08, 36),
      clayWhite
    );
    tableTop.position.y = 1.15;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    const tableBevel = new THREE.Mesh(
      new THREE.TorusGeometry(1.33, 0.02, 12, 36),
      khaki
    );
    tableBevel.rotation.x = Math.PI / 2;
    tableBevel.position.y = 1.19;
    tableGroup.add(tableBevel);

    const tablePedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.3, 1.15, 24),
      charcoal
    );
    tablePedestal.position.y = 0.58;
    tablePedestal.castShadow = true;
    tableGroup.add(tablePedestal);

    // 8. Two Empty Chairs (Inward Facing)
    const createEmptyChair = (x, rotY) => {
      const cGroup = new THREE.Group();
      cGroup.position.set(x, 0.3, 0.2);
      cGroup.rotation.y = rotY;

      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.52, 12), deepBlack);
      col.position.y = 0.26;
      cGroup.add(col);

      const baseDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.04, 20), deepBlack);
      baseDisc.position.y = 0.02;
      cGroup.add(baseDisc);

      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 0.54), charcoal);
      seat.position.y = 0.56;
      seat.castShadow = true;
      seat.receiveShadow = true;
      cGroup.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.62, 0.06), charcoal);
      back.position.set(0, 0.88, 0.25);
      back.rotation.x = 0.08;
      back.castShadow = true;
      cGroup.add(back);

      return cGroup;
    };

    const chairLeft = createEmptyChair(-1.42, -Math.PI * 0.42);
    scene.add(chairLeft);

    const chairRight = createEmptyChair(1.42, Math.PI * 0.42);
    scene.add(chairRight);

    // 9. Open Laptop with Live Codebase Display, Notebook & Coffee on Table
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 1.2, 0.08);

    // Laptop Lower Chassis
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.016, 0.3), deepBlack);
    laptopBase.position.set(0, 0, 0);
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // Recessed Keyboard Bed
    const keyboard = new THREE.Mesh(
      new THREE.PlaneGeometry(0.39, 0.14),
      new THREE.MeshStandardMaterial({ color: 0x1A1918, roughness: 0.7, metalness: 0.2 })
    );
    keyboard.rotation.x = -Math.PI / 2;
    keyboard.position.set(0, 0.009, -0.045);
    laptopGroup.add(keyboard);

    // Precision Glass Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.PlaneGeometry(0.14, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x242320, roughness: 0.35, metalness: 0.25 })
    );
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.009, 0.085);
    laptopGroup.add(trackpad);

    // Laptop Lid (Angled back naturally from hinge)
    const laptopLidGroup = new THREE.Group();
    laptopLidGroup.position.set(0, 0.01, -0.145);
    laptopLidGroup.rotation.x = -0.28; // ~16 deg tilt for natural ergonomic viewing angle

    const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.28, 0.014), deepBlack);
    lidBack.position.set(0, 0.14, 0);
    lidBack.castShadow = true;
    laptopLidGroup.add(lidBack);

    // High-Resolution Code Editor Display (Personal Info Codebase)
    const lapTexture = createLaptopCodeCanvasTexture();
    const lapScreenMat = new THREE.MeshBasicMaterial({
      map: lapTexture,
      toneMapped: false,
    });
    const lapScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.415, 0.255),
      lapScreenMat
    );
    lapScreen.position.set(0, 0.14, 0.008);
    laptopLidGroup.add(lapScreen);

    // Top Web Camera Glass Dot & Status Indicator
    const camDot = new THREE.Mesh(
      new THREE.CircleGeometry(0.003, 12),
      new THREE.MeshBasicMaterial({ color: 0x050505 })
    );
    camDot.position.set(0, 0.272, 0.0085);
    laptopLidGroup.add(camDot);

    const camLed = new THREE.Mesh(
      new THREE.CircleGeometry(0.0015, 8),
      new THREE.MeshBasicMaterial({ color: 0x10B981 })
    );
    camLed.position.set(0.01, 0.272, 0.0085);
    laptopLidGroup.add(camLed);

    laptopGroup.add(laptopLidGroup);

    // Atmospheric screen backlight glow softly washing over keyboard
    const screenGlow = new THREE.PointLight(0x79C0FF, 0.35, 1.2);
    screenGlow.position.set(0, 0.16, 0.04);
    laptopGroup.add(screenGlow);

    tableGroup.add(laptopGroup);

    // Moleskine Architect Notebook with Bound Spine
    const bookMesh = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.34), khaki);
    bookMesh.position.set(-0.52, 1.2, 0.14);
    bookMesh.rotation.y = 0.22;
    bookMesh.castShadow = true;
    tableGroup.add(bookMesh);

    // Minimalist Matte Pen
    const penMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.18, 8), deepBlack);
    penMesh.rotation.z = Math.PI / 2;
    penMesh.rotation.y = 0.22;
    penMesh.position.set(-0.5, 1.22, 0.14);
    tableGroup.add(penMesh);

    // Ceramic Coffee Mugs (Designer Studio Mugs)
    [-0.46, 0.46].forEach((cx, idx) => {
      const mug = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.04, 0.09, 16),
        idx === 0 ? clayWhite : khaki
      );
      mug.position.set(cx, 1.235, -0.12);
      mug.castShadow = true;
      tableGroup.add(mug);
    });

    // Overhead Pendant Lamp (Suspended high above line of sight)
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.4, 8), charcoal);
    lampStem.position.set(0, 3.45, 0.2);
    scene.add(lampStem);

    const shadeGeo = new THREE.ConeGeometry(0.32, 0.22, 24, 1, true);
    shadeGeo.rotateX(Math.PI);
    const shade = new THREE.Mesh(shadeGeo, charcoal);
    shade.position.set(0, 2.75, 0.2);
    scene.add(shade);

    const tableLight = new THREE.PointLight(0xFDF4DC, 1.2, 4.2);
    tableLight.position.set(0, 2.65, 0.2);
    tableLight.castShadow = true;
    scene.add(tableLight);

    scene.add(tableGroup);

    // 10. Raycasting & Mouse Interaction for Bookshelf Socials
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const pixelX = e.clientX - rect.left;
      const pixelY = e.clientY - rect.top;
      setMousePixelPos({ x: pixelX, y: pixelY });

      const x = (pixelX / rect.width) * 2 - 1;
      const y = -((pixelY / rect.height) * 2 - 1);
      mouseCoord.x = x;
      mouseCoord.y = y;

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(interactiveSocialMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        canvas.style.cursor = 'pointer';
        setHoveredSocial(hit.userData);
      } else {
        canvas.style.cursor = 'grab';
        setHoveredSocial(null);
      }
    };

    const onPointerDown = () => {
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(interactiveSocialMeshes);

      if (intersects.length > 0) {
        sound.playClick();
        const hit = intersects[0].object;
        if (hit.userData.url) {
          if (hit.userData.id === 'resume') {
            const link = document.createElement('a');
            link.href = hit.userData.url;
            link.download = 'Hanz_Magbal_Resume.pdf';
            link.click();
          } else {
            window.open(hit.userData.url, '_blank');
          }
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);

    // 11. Multi-Stage Scroll Choreography Keyframes
    // Scene 1: Focus on the desktop (meeting table, laptop with code, notes, cups) - Zoomed out comfortably
    const scene1Cam = new THREE.Vector3(0, 2.18, 2.22);
    const scene1Look = new THREE.Vector3(0, 1.48, 0.16);

    // Scene 2: Zoom in to the socials (bookshelf face-to-face)
    const scene2Cam = new THREE.Vector3(-2.15, 2.05, 0.7);
    const scene2Look = new THREE.Vector3(-2.78, 1.92, -0.75);

    // Scene 3: Zoom out showing the whole studio environment
    const scene3Cam = new THREE.Vector3(0, 3.8, 7.8);
    const scene3Look = new THREE.Vector3(0, 1.45, 0.2);

    const currentLookAt = scene1Look.clone();

    // 12. Animation Loop with Camera Interpolation
    let clock = new THREE.Clock();
    let isDisposed = false;

    const renderScene = () => {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    const animate = () => {
      if (isDisposed) return;
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current;

      const targetCam = new THREE.Vector3();
      const targetLook = new THREE.Vector3();

      if (p < 0.45) {
        // Scene 1 -> Scene 2 (Desktop -> Bookshelf Socials)
        const t = smoothstep(0.06, 0.38, p);
        targetCam.lerpVectors(scene1Cam, scene2Cam, t);
        targetLook.lerpVectors(scene1Look, scene2Look, t);
      } else {
        // Scene 2 -> Scene 3 (Socials -> Whole Environment Zoom-Out)
        const t = smoothstep(0.45, 0.82, p);
        targetCam.lerpVectors(scene2Cam, scene3Cam, t);
        targetLook.lerpVectors(scene2Look, scene3Look, t);
      }

      // Subtle atmospheric breathing movement
      const breatheX = Math.sin(elapsedTime * 0.2) * 0.03 + mouseCoord.x * 0.12;
      const breatheY = Math.cos(elapsedTime * 0.25) * 0.02 + mouseCoord.y * 0.08;

      camera.position.x += (targetCam.x + breatheX - camera.position.x) * 0.08;
      camera.position.y += (targetCam.y + breatheY - camera.position.y) * 0.08;
      camera.position.z += (targetCam.z - camera.position.z) * 0.08;

      currentLookAt.x += (targetLook.x - currentLookAt.x) * 0.08;
      currentLookAt.y += (targetLook.y - currentLookAt.y) * 0.08;
      currentLookAt.z += (targetLook.z - currentLookAt.z) * 0.08;

      camera.lookAt(currentLookAt);

      renderScene();
    };

    const startAnimation = () => {
      if (isDisposed) return;
      if (!animId) {
        clock.start();
        animId = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const updateSize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderScene();
    };

    updateSize();
    requestAnimationFrame(updateSize);
    setTimeout(updateSize, 120);
    setTimeout(updateSize, 600);

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', updateSize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            updateSize();
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    startAnimation();

    return () => {
      isDisposed = true;
      stopAnimation();
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);

      renderer.dispose();
      tvTexture.dispose();
      lapTexture.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-3d"
      className="relative w-full h-[320vh] bg-[#F5F3EC]"
    >
      {/* Sticky 100vh Fullscreen Pinned Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between selection:bg-[#C8B99A] selection:text-[#171715]">
        
        {/* 3D WebGL Canvas Layer */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none bg-noise opacity-25" />

        {/* Minimal HUD: Stage Status & Step Indicators */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pointer-events-none flex items-center justify-between">
          
          {/* Dynamic Scene Badge based on scrollProgress */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#C8B99A]/60 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171715]">
              {scrollProgress < 0.4
                ? 'Scene 1 / 3 • Desktop Focus'
                : scrollProgress < 0.75
                ? 'Scene 2 / 3 • Socials Bookshelf'
                : 'Scene 3 / 3 • Full Studio Environment'}
            </span>
          </div>

          {/* Stepper Dots & Scroll Hint */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C8B99A]/50 text-xs font-mono text-[#85847E]">
              <span>
                {scrollProgress < 0.4
                  ? 'Scroll to inspect socials'
                  : scrollProgress < 0.75
                  ? 'Scroll to reveal full studio'
                  : 'Scroll down for contact form'}
              </span>
              <ArrowDown size={13} className="animate-bounce" />
            </div>

            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-[#C8B99A]/50 shadow-xs">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollProgress < 0.4 ? 'bg-[#171715] scale-125' : 'bg-[#C8B99A]/60'}`} />
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollProgress >= 0.4 && scrollProgress < 0.75 ? 'bg-[#171715] scale-125' : 'bg-[#C8B99A]/60'}`} />
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${scrollProgress >= 0.75 ? 'bg-[#171715] scale-125' : 'bg-[#C8B99A]/60'}`} />
            </div>
          </div>

        </div>

        {/* Floating Hover Modal for Bookshelf Socials */}
        {hoveredSocial && (
          <div
            className="pointer-events-none hidden sm:block absolute z-30 transition-all duration-75 ease-out"
            style={{
              left: `${Math.min(window.innerWidth - 320, Math.max(16, mousePixelPos.x + 24))}px`,
              top: `${Math.max(16, Math.min(window.innerHeight - 200, mousePixelPos.y - 70))}px`,
            }}
          >
            <div className="w-72 p-4 rounded-2xl bg-[#292824]/95 border border-[#C8B99A]/60 shadow-2xl backdrop-blur-xl text-left space-y-2 transform rotate-1 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#C8B99A]">
                <span>{hoveredSocial.tag}</span>
                {hoveredSocial.id === 'github' && <Github className="w-3.5 h-3.5 text-[#C8B99A]" />}
                {hoveredSocial.id === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-[#C8B99A]" />}
                {hoveredSocial.id === 'email' && <Mail size={13} className="text-[#C8B99A]" />}
                {hoveredSocial.id === 'resume' && <FileText size={13} className="text-[#C8B99A]" />}
              </div>

              <div className="text-sm sm:text-base font-bold font-['Space_Grotesk'] text-[#F8F7F2] leading-snug">
                {hoveredSocial.name}
              </div>

              <p className="text-xs text-[#E5DCCB]/85 font-sans leading-relaxed">
                {hoveredSocial.desc}
              </p>

              <div className="pt-2 border-t border-[#C8B99A]/20 flex items-center justify-between text-[10px] font-mono text-[#85847E]">
                <span>{hoveredSocial.statusLabel}</span>
                <span className="text-[#C8B99A] font-semibold flex items-center gap-1">
                  <span>{hoveredSocial.statusValue}</span>
                  <ArrowUpRight size={11} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scene 3 Overlay: Catchy Text Line + Whole Environment Call-to-Action */}
        {scrollProgress >= 0.72 && (
          <div className="relative z-20 max-w-4xl mx-auto w-full px-4 sm:px-6 pb-12 sm:pb-16 text-center animate-fadeIn pointer-events-none">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/92 backdrop-blur-xl border border-[#C8B99A]/60 shadow-2xl space-y-4 pointer-events-auto">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171715] text-[#C8B99A] text-[11px] font-mono uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Architecture Meets Execution</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight leading-[1.08]">
                Designed for Impact. Engineered for Scale.
              </h2>

              <p className="text-xs sm:text-sm text-[#66635B] font-mono max-w-xl mx-auto">
                Ready to collaborate? Scroll down to send a direct message via the contact portal.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onScrollToContactForm) onScrollToContactForm();
                    else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full text-xs font-mono font-semibold bg-[#171715] text-[#F8F7F2] hover:bg-[#C8B99A] hover:text-[#171715] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Send size={13} />
                  <span>Open Contact Form</span>
                  <ArrowDown size={14} className="rotate-[-45deg]" />
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-3 rounded-full text-xs font-mono bg-white hover:bg-[#E5DCCB]/40 text-[#171715] border border-[#C8B99A]/60 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : personalInfo.email}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Fallback bottom navigation bar for Scene 1 & Scene 2 */}
        {scrollProgress < 0.72 && (
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 pointer-events-auto flex items-center justify-between text-xs font-mono text-[#85847E]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A]" />
              <span className="hidden sm:inline">Use mouse scroll to travel between 3D scenes</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#171715] hover:text-[#F8F7F2] border border-[#C8B99A]/50 text-[#171715] transition-colors"
              >
                GitHub
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#171715] hover:text-[#F8F7F2] border border-[#C8B99A]/50 text-[#171715] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={resumePdf}
                download="Hanz_Magbal_Resume.pdf"
                className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#171715] hover:text-[#F8F7F2] border border-[#C8B99A]/50 text-[#171715] transition-colors"
              >
                CV (PDF)
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
