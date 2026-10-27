import realynklogo from "../assets/projects/realynk/realynklogo.png";
import pallogo from "../assets/projects/pal/pallogo.png";
import langorlogo from "../assets/projects/langor/langorlogo.png";
import gtrashlogo from "../assets/projects/gtrash/gtrashlogo.png";
import medoralogo from "../assets/projects/medora/medoralogo.png";
import klogo from "../assets/projects/klinkahub/klogo.png";

import realynk1 from "../assets/projects/realynk/realynk1.png";
import realynk2 from "../assets/projects/realynk/realynk2.png";
import realynk3 from "../assets/projects/realynk/realynk3.png";
import realynk4 from "../assets/projects/realynk/realynk4.png";
import realynk5 from "../assets/projects/realynk/realynk5.png";
import realynk6 from "../assets/projects/realynk/realynk6.png";
import realynk7 from "../assets/projects/realynk/realynk7.png";
import realynk8 from "../assets/projects/realynk/realynk8.png";
import realynk9 from "../assets/projects/realynk/realynk9.png";
import realynk10 from "../assets/projects/realynk/realynk10.png";
import realynk11 from "../assets/projects/realynk/realynk11.png";

import pal1 from "../assets/projects/pal/pal1.png";
import pal2 from "../assets/projects/pal/pal2.png";
import pal3 from "../assets/projects/pal/pal3.png";
import pal4 from "../assets/projects/pal/pal4.png";
import pal5 from "../assets/projects/pal/pal5.png";
import pal6 from "../assets/projects/pal/pal6.png";
import pal7 from "../assets/projects/pal/pal7.png";
import pal8 from "../assets/projects/pal/pal8.png";
import pal9 from "../assets/projects/pal/pal9.png";

import langor1 from "../assets/projects/langor/langor1.png";
import langor2 from "../assets/projects/langor/langor2.png";
import langor3 from "../assets/projects/langor/langor3.png";
import langor4 from "../assets/projects/langor/langor4.png";
import langor5 from "../assets/projects/langor/langor5.png";
import langor6 from "../assets/projects/langor/langor6.png";
import langor7 from "../assets/projects/langor/langor7.png";
import langor8 from "../assets/projects/langor/langor8.png";

import gtrash1 from "../assets/projects/gtrash/gtrash1.png";
import gtrash2 from "../assets/projects/gtrash/gtrash2.png";
import gtrash3 from "../assets/projects/gtrash/gtrash3.png";
import gtrash4 from "../assets/projects/gtrash/gtrash4.jpg";
import gtrash5 from "../assets/projects/gtrash/gtrash5.jpg";
import gtrash6 from "../assets/projects/gtrash/gtrash6.jpg";
import gtrash7 from "../assets/projects/gtrash/gtrash7.jpg";

import medora1 from "../assets/projects/medora/medora1.png";
import medora2 from "../assets/projects/medora/medora2.png";
import medora3 from "../assets/projects/medora/medora3.png";
import medora4 from "../assets/projects/medora/medora4.png";
import medora5 from "../assets/projects/medora/medora5.png";
import medora6 from "../assets/projects/medora/medora6.png";

import k1 from "../assets/projects/klinkahub/k1.jpg";
import k2 from "../assets/projects/klinkahub/k2.jpg";
import k3 from "../assets/projects/klinkahub/k3.jpg";
import k4 from "../assets/projects/klinkahub/k4.jpg";
import k5 from "../assets/projects/klinkahub/k5.jpg";
import k6 from "../assets/projects/klinkahub/k6.jpg";
import k7 from "../assets/projects/klinkahub/k7.jpg";
import k8 from "../assets/projects/klinkahub/k8.jpg";
import k9 from "../assets/projects/klinkahub/k9.jpg";
import k10 from "../assets/projects/klinkahub/k10.jpg";
import k11 from "../assets/projects/klinkahub/k11.jpg";
import k12 from "../assets/projects/klinkahub/k12.jpg";
import k13 from "../assets/projects/klinkahub/k13.jpg";

import resumeDoc from "../assets/resume/Hanz_Resume.pdf";

export const personalInfo = {
  name: "HANZ CHRISTIAN ANGELO G. MAGBAL",
  shortName: "Hanz Magbal",
  role: "4th Year BSIT Student",
  institution: "University of Southern Philippines Foundation",
  location: "Cebu City, Philippines",
  email: "hanzhmagbal@gmail.com",
  phone: "09927870100",
  bio: "Leveraging my IT background at the University of Southern Philippines Foundation to bridge innovative technology with real-world solutions. Passionate about building scalable software architectures, integrating AI, and developing high-performance, data-driven applications.",
  longBio:
    "As a senior Information Technology student at the University of Southern Philippines Foundation, I have cultivated a deep expertise in modern software engineering, artificial intelligence integration, and cloud-native architectures. My academic and project journey focuses on developing high-performance, scalable systems that translate complex data into actionable real-world insights.",
  socials: {
    github: "https://github.com/h4nzdev",
    linkedin: "https://linkedin.com/in/hanz-christian-angelo-g-magbal-685206361?originalSubdomain=ph",
    email: "mailto:hanzhmagbal@gmail.com",
    resume: resumeDoc,
  },
  stats: [
    { label: "Year in BSIT", value: "4th" },
    { label: "Core Projects", value: "6" },
    { label: "Technologies", value: "15+" },
    { label: "GPA / Standing", value: "Dean's List" },
  ],
};

export const featuredProjects = [
  {
    id: "realynk",
    title: "Realynk – Modern Time & Attendance ERP",
    category: "Enterprise Web App",
    featured: true,
    tagline: "Modern time-tracking and workforce management for SMBs.",
    description:
      "A robust, production-ready Progressive Web Application (PWA) designed to modernize time-tracking and workforce management. It serves as a comprehensive ERP system featuring role-based access control, real-time geolocated time-punching, and an extensive administrative suite.",
    images: [realynklogo, realynk1, realynk2, realynk3, realynk4, realynk5, realynk6, realynk7, realynk8, realynk9, realynk10, realynk11],
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Zustand",
      "Leaflet",
    ],
    liveUrl: "https://realynk.vercel.app/",
    githubUrl: "#",
    role: "Full Stack Developer",
    duration: "Ongoing",
    teamSize: "N/A",
    completed: "Present",
    details: {
      problem:
        "Small-to-medium businesses struggle with outdated time-tracking systems and lack real-time visibility into workforce geolocation and attendance.",
      solution:
        "Developed a PWA-compliant ERP featuring real-time geolocated time-punching, offline capabilities, and a comprehensive admin suite.",
      features: [
        "Real-time geolocated time-punching with HTML5 Geolocation API",
        "Role-based access control and administrative suite",
        "PWA-compliant for offline capabilities and native installation",
        "Analytics and data visualization using Recharts",
      ],
    },
  },
  {
    id: "pal-journeypad",
    title: "PAL (JourneyPad)",
    category: "AI & Productivity",
    featured: true,
    tagline: "Collaborative project-planning PWA with AI Co-Pilot.",
    description:
      "A collaborative project-planning Progressive Web Application that allows users to create Journeys, build nested task trees, chat in real-time, and leverage an intelligent in-app AI co-pilot for automated project structure creation.",
    images: [pallogo, pal1, pal2, pal3, pal4, pal5, pal6, pal7, pal8, pal9],
    techStack: ["React 19", "Tailwind CSS", "Supabase", "Zustand", "Groq API"],
    liveUrl: "https://pal-ai-cham.vercel.app",
    githubUrl: "#",
    role: "Full Stack Developer",
    duration: "N/A",
    teamSize: "N/A",
    completed: "Present",
    details: {
      problem:
        "Teams often waste time manually structuring complex projects and switching between separate chat and planning apps.",
      solution:
        "Built a centralized planning tool with real-time chat, nested task trees, and an AI co-pilot powered by Llama 3.1 that automates project structuring.",
      features: [
        "Intelligent in-app AI co-pilot for automated project structure creation",
        "Real-time team chat and forced logouts via Supabase Realtime",
        "Visual diagrams and interactive section roadmaps using ReactFlow",
        "Flat-node tree data structures managed in PostgreSQL",
      ],
    },
  },
  {
    id: "langor-ai",
    title: "Langor AI",
    category: "AI & Education",
    featured: true,
    tagline: "AI-Powered English Speaking Practice Platform.",
    description:
      "An AI-powered English speaking practice PWA providing real-time voice conversations using AI tutor personas, a competitive 1v1 battle mode for debates, and multiplayer community rooms with live grammar correction.",
    images: [langorlogo, langor1, langor2, langor3, langor4, langor5, langor6, langor7, langor8],
    techStack: ["Next.js 15", "Supabase", "Groq API", "ElevenLabs", "WebRTC"],
    liveUrl: "https://langor-ai.vercel.app/",
    githubUrl: "#",
    role: "Full Stack Developer",
    duration: "N/A",
    teamSize: "N/A",
    completed: "Present",
    details: {
      problem:
        "Language learners lack accessible, real-time conversational practice with immediate grammatical feedback.",
      solution:
        "Engineered a dual-backend AI platform utilizing Groq (Llama 3.3) and Gemini for ultra-low latency voice tutoring and grammar correction over a WebRTC mesh network.",
      features: [
        "Real-time voice conversations with AI tutor personas",
        "Competitive 1v1 debate battle mode and multiplayer community rooms",
        "Live, spoken-English grammar correction and skill radar charts",
        "Gamification system with XP, streaks, and global leaderboards",
      ],
    },
  },
  {
    id: "gtrash",
    title: "G-TRASH",
    category: "IoT & Mobile",
    featured: true,
    tagline: "Smart waste monitoring and management platform.",
    description:
      "A smart waste monitoring platform connecting residents, drivers, officials, and admins. Features real-time garbage truck tracking, IoT-powered pollution/bin monitoring, AI-driven routing, and gamified community participation.",
    images: [gtrashlogo, gtrash1, gtrash2, gtrash3, gtrash4, gtrash5, gtrash6, gtrash7],
    techStack: [
      "React Native",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "IoT / ESP32",
    ],
    liveUrl: "https://g-trash.vercel.app/",
    githubUrl: "#",
    role: "Full Stack Developer",
    duration: "N/A",
    teamSize: "N/A",
    completed: "Present",
    details: {
      problem:
        "Inefficient waste collection routes, unmonitored pollution levels, and lack of resident participation in waste segregation.",
      solution:
        "Deployed a suite of 4 interconnected apps with live GPS tracking, IoT sensors for environmental metrics, and an on-device AI trash scanner.",
      features: [
        "Real-time bidirectional communication and truck tracking via Socket.io",
        "IoT integration with ESP32 & MQ-135 sensors for pollution alerts",
        "On-device AI trash scanner (TensorFlow.js & Gemini) for segregation",
        "EcoAssist AI chatbot for drivers and smart routing suggestions",
      ],
    },
  },
  {
    id: "klinikahub",
    title: "KlinikaHub",
    category: "SaaS & Healthcare",
    featured: true,
    tagline: "Multi-tenant clinic and practice management platform.",
    description:
      "A comprehensive SaaS-style solution offering isolated workspaces for healthcare practices. Centralizes operations from patient registration, EHR, and appointment scheduling to POS and automated billing workflows.",
    images: [klogo, k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13],
    techStack: ["CodeIgniter 3", "PHP", "MySQL", "JavaScript", "Google OAuth"],
    liveUrl: "https://klinikahub.com/",
    githubUrl: "#",
    role: "Full Stack Developer",
    duration: "N/A",
    teamSize: "N/A",
    completed: "Present",
    details: {
      problem:
        "Healthcare practices struggle with fragmented patient records, inefficient scheduling, and data isolation issues across multiple tenants.",
      solution:
        "Built a subdomain-based multi-tenant SaaS architecture handling core business logic, isolated databases, and dynamic SQL patches for strict data security.",
      features: [
        "Multi-tenant SaaS architecture with subdomain isolation",
        "Electronic Health Records (EHR) and appointment scheduling",
        "Payment gateway integrations and automated billing workflows",
        "Telehealth integrations for seamless video teleconsultations",
      ],
    },
  },
  {
    id: "medora",
    title: "Medora",
    category: "SaaS & Healthcare",
    featured: true,
    tagline: "Multi-tenant clinic and practice management platform.",
    description:
      "A comprehensive SaaS-style solution offering isolated workspaces for healthcare practices. Centralizes operations from patient registration, EHR, and appointment scheduling to POS and automated billing workflows.",
    images: [medoralogo, medora1, medora2, medora3, medora4, medora5, medora6],
    techStack: ["CodeIgniter 3", "PHP", "MySQL", "JavaScript", "Google OAuth"],
    liveUrl: "https://medora-doc.vercel.app/",
    githubUrl: "#",
    role: "Full Stack Developer",
    duration: "N/A",
    teamSize: "N/A",
    completed: "Present",
    details: {
      problem:
        "Healthcare practices struggle with fragmented patient records, inefficient scheduling, and data isolation issues across multiple tenants.",
      solution:
        "Built a subdomain-based multi-tenant SaaS architecture handling core business logic, isolated databases, and dynamic SQL patches for strict data security.",
      features: [
        "Multi-tenant SaaS architecture with subdomain isolation",
        "Electronic Health Records (EHR) and appointment scheduling",
        "Payment gateway integrations and automated billing workflows",
        "Telehealth integrations for seamless video teleconsultations",
      ],
    },
  },
];

export const educationTimeline = [
  {
    year: "2023 - Ongoing",
    level: "Bachelor of Science in Information Technology",
    institution: "University of Southern Philippines Foundation",
    status: "Current",
    gpa: "N/A",
    description: "Currently pursuing a degree in Information Technology.",
    coursework: [],
    highlights: [],
  },
  {
    year: "2017 - 2023",
    level: "High School Diploma",
    institution: "Lahug National High School (Night)",
    status: "Completed",
    gpa: "N/A",
    description: "Completed secondary education.",
    coursework: [],
    highlights: [],
  },
  {
    year: "2011 - 2017",
    level: "Elementary Education",
    institution: "Cabalagnan Elementary School",
    status: "Completed",
    gpa: "N/A",
    description: "Completed primary education.",
    coursework: [],
    highlights: [],
  },
];

export const technicalSkills = {
  core: ["React", "Next.js", "Node.js", "Python", "Java", "PHP", "Supabase", "MongoDB"],
  categories: [
    {
      name: "Frontend & Mobile",
      skills: [
        { name: "React / JSX", level: 95, icon: "logos:react" },
        { name: "React Native", level: 90, icon: "logos:react" },
        { name: "Next.js", level: 90, icon: "logos:nextjs-icon" },
        { name: "Tailwind CSS", level: 95, icon: "logos:tailwindcss-icon" },
        { name: "JavaScript", level: 90, icon: "logos:javascript" },
        { name: "HTML / CSS", level: 95, icon: "logos:html-5" },
        { name: "Vite", level: 90, icon: "logos:vitejs" },
        { name: "Zustand", level: 85, icon: "logos:react" },
        { name: "Responsive UI", level: 95, icon: "mdi:responsive" },
      ],
    },
    {
      name: "Backend Engineering",
      skills: [
        { name: "Node.js", level: 90, icon: "logos:nodejs-icon" },
        { name: "PHP", level: 85, icon: "logos:php" },
        { name: "Laravel", level: 80, icon: "logos:laravel" },
        { name: "CodeIgniter", level: 85, icon: "logos:codeigniter-icon" },
        { name: "Python", level: 85, icon: "logos:python" },
        { name: "Flask", level: 80, icon: "logos:flask" },
        { name: "Java", level: 85, icon: "logos:java" },
        { name: "Socket.io", level: 85, icon: "logos:socket-io" },
      ],
    },
    {
      name: "Database & Backend-as-a-Service",
      skills: [
        { name: "Supabase", level: 90, icon: "logos:supabase-icon" },
        { name: "Firebase", level: 85, icon: "logos:firebase" },
        { name: "MongoDB", level: 85, icon: "logos:mongodb-icon" },
        { name: "MySQL", level: 90, icon: "logos:mysql" },
        { name: "SQLite", level: 85, icon: "logos:sqlite" },
      ],
    },
    {
      name: "Tools, AI & Deployment",
      skills: [
        { name: "Git & GitHub", level: 95, icon: "logos:github-icon" },
        { name: "Scikit-Learn", level: 75, icon: "logos:python" },
        { name: "Pygame", level: 80, icon: "logos:python" },
        { name: "ElevenLabs", level: 80, icon: "mdi:robot-outline" },
        { name: "Brevo", level: 80, icon: "mdi:email-fast-outline" },
        { name: "Vercel", level: 90, icon: "logos:vercel-icon" },
        { name: "Render", level: 85, icon: "mdi:cloud-braces" },
        { name: "Netlify", level: 85, icon: "logos:netlify-icon" },
      ],
    },
  ],
};

import cert1 from "../assets/certificate/cert1.png";
import cert2 from "../assets/certificate/cert2.png";
import cert3 from "../assets/certificate/cert3.png";
import cert4 from "../assets/certificate/cert4.png";

export const certifications = [
  {
    title: "Top Innovator",
    issuer: "USPF",
    year: "2024",
    badge: "Award",
    image: cert1,
  },
  {
    title: "NCII Computer Systems Servicing",
    issuer: "TESDA",
    year: "2024",
    badge: "Certification",
    image: cert2,
  },
  {
    title: "USPF Research Congress Participant",
    issuer: "USPF",
    year: "2024",
    badge: "Research",
    image: cert3,
  },
  {
    title: "3rd Place Hackathon in the Hackestate",
    issuer: "Hackestate",
    year: "2024",
    badge: "Hackathon",
    image: cert4,
  },
];
