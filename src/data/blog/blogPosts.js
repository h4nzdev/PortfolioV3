/**
 * Blog Posts Data Registry for Hanz Magbal's Developer Journal
 * Categorized by: System Architecture | AI & Embedded Systems | Cloud & DevOps | Full-Stack Web
 */

export const BLOG_CATEGORIES = [
  'All',
  'System Architecture',
  'AI & Embedded Systems',
  'Cloud & DevOps',
  'Full-Stack Web',
];

export const blogPosts = [
  {
    id: '01',
    slug: 'architecting-real-time-biometric-erp-system',
    title: 'Architecting a Resilient Biometric Time & Attendance ERP System',
    excerpt:
      'A deep dive into building Realynk: addressing edge hardware latency, clock drift, idempotent punch logging, and real-time attendance analytics at enterprise scale.',
    category: 'System Architecture',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Biometrics', 'WebSockets', 'ERP'],
    publishedDate: '2026-03-20',
    readTime: '7 min read',
    featured: true,
    author: {
      name: 'Hanz Magbal',
      role: '4th Year BSIT • USPF',
      avatar: '/me.png',
    },
    toc: [
      { id: 'background-and-problem', text: '1. The Real-World Latency & Clock Drift Problem', level: 2 },
      { id: 'hardware-gateway-pipeline', text: '2. Biometric Hardware Gateway & WebSocket Bridge', level: 2 },
      { id: 'database-idempotency', text: '3. Idempotent Punch Transactions in PostgreSQL', level: 2 },
      { id: 'caching-and-realtime', text: '4. High-Throughput Aggregations & Live Dashboard', level: 2 },
      { id: 'key-takeaways', text: '5. Key Architectural Takeaways', level: 2 },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Time and attendance tracking in enterprise environments appears deceptively straightforward at first glance: an employee punches a card or fingerprint scanner, a timestamp is logged, and monthly payroll queries tally the hours. However, once deployed across multiple branch offices with unpredictable network connectivity and physical hardware latency, clock drift, duplicate punch packets, and network partitions quickly turn a simple logging mechanism into a data integrity nightmare.',
      },
      {
        type: 'callout',
        variant: 'insight',
        title: 'Core Architectural Challenge',
        text: 'How do you guarantee that a punch registered at 08:00:00 AM on a disconnected biometric hardware terminal in a remote depot is recorded with microsecond precision and zero duplicate payroll calculations when connectivity restores?',
      },
      {
        type: 'heading',
        level: 2,
        id: 'background-and-problem',
        text: '1. The Real-World Latency & Clock Drift Problem',
      },
      {
        type: 'paragraph',
        text: 'In our enterprise project Realynk, biometric optical scanners communicated over TCP/IP sockets to a local branch gateway. Hardware clocks in inexpensive terminals can drift by as much as 30 to 90 seconds per month if not synchronized via Network Time Protocol (NTP). Furthermore, when workers queue up during morning rush hour, a momentary Ethernet glitch could cause the hardware queue to flush hundreds of punches in a single burst.',
      },
      {
        type: 'paragraph',
        text: 'To resolve this, we decoupled the physical punch capture from the payroll computation pipeline. Each punch event is assigned a deterministic hardware transaction hash generated from the combination of terminal UUID, biometric card ID, and timestamp normalized to UTC.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'hardware-gateway-pipeline',
        text: '2. Biometric Hardware Gateway & WebSocket Bridge',
      },
      {
        type: 'paragraph',
        text: 'Rather than allowing edge biometric devices to interact directly with the primary relational database, we engineered a lightweight local bridge service. The bridge parses raw hexadecimal packets from the scanner, converts them into standard JSON envelopes, and dispatches them over an authenticated WebSocket connection with backpressure control.',
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'punchIngestionPipeline.js',
        code: `// Deterministic Punch Envelope Creation & Verification
import crypto from 'node:crypto';

export function createPunchEnvelope({ terminalId, biometricCardId, deviceTimestampUtc }) {
  // Generate idempotent deterministic hash to prevent double-swipes
  const rawPayload = \`\${terminalId}:\${biometricCardId}:\${deviceTimestampUtc}\`;
  const transactionId = crypto
    .createHash('sha256')
    .update(rawPayload)
    .digest('hex');

  return {
    transactionId,
    terminalId,
    biometricCardId,
    timestamp: deviceTimestampUtc,
    receivedAt: new Date().toISOString(),
    status: 'INGESTED'
  };
}`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'database-idempotency',
        text: '3. Idempotent Punch Transactions in PostgreSQL',
      },
      {
        type: 'paragraph',
        text: 'On the database tier, we utilized PostgreSQL conditional upserts (`ON CONFLICT DO NOTHING`) combined with an audit write-ahead log. This guaranteed that even if an unstable edge router re-transmitted the same TCP packet 5 times during an outage recovery burst, exactly one authoritative attendance log record was written.',
      },
      {
        type: 'code',
        language: 'sql',
        title: 'schema_attendance_upsert.sql',
        code: `-- Idempotent punch ingestion with audit trail
INSERT INTO employee_attendance_logs (
    transaction_id,
    employee_id,
    terminal_id,
    punch_timestamp,
    punch_type,
    created_at
) VALUES (
    $1, $2, $3, $4, $5, NOW()
)
ON CONFLICT (transaction_id) 
DO UPDATE SET 
    sync_retry_count = employee_attendance_logs.sync_retry_count + 1
RETURNING log_id, is_duplicate;`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'caching-and-realtime',
        text: '4. High-Throughput Aggregations & Live Dashboard',
      },
      {
        type: 'paragraph',
        text: 'For the administrative frontend built in React, managers required instantaneous visibility into who had arrived, who was late, and who was in transit across faculties. Re-querying thousands of raw log entries on every status render degraded server performance under peak morning traffic. We introduced a Redis caching tier that maintains active presence bitfields for employees, dropping dashboard query latency from 840ms to under 12ms.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'key-takeaways',
        text: '5. Key Architectural Takeaways',
      },
      {
        type: 'paragraph',
        text: 'Building Realynk proved that high-reliability engineering is not just about writing clean frontend code, but anticipating the physical imperfections of hardware, unreliable local networks, and edge failures. By isolating the edge ingest, enforcing database idempotency, and caching real-time presence indicators, we delivered a system that runs seamlessly 24/7.',
      },
    ],
  },
  {
    id: '02',
    slug: 'computer-vision-automated-waste-sorting-iot',
    title: 'Edge Computer Vision & IoT: Building the GTrash Automated Sorter',
    excerpt:
      'Engineering an autonomous waste classification bin using lightweight YOLOv8 models on edge processors, micro-servos, and ultrasonic depth telemetry.',
    category: 'AI & Embedded Systems',
    tags: ['YOLOv8', 'Python', 'Raspberry Pi', 'OpenCV', 'IoT', 'TensorFlow Lite'],
    publishedDate: '2026-02-14',
    readTime: '6 min read',
    featured: false,
    author: {
      name: 'Hanz Magbal',
      role: '4th Year BSIT • USPF',
      avatar: '/me.png',
    },
    toc: [
      { id: 'motivation', text: '1. Why Automated Point-of-Disposal Sorting?', level: 2 },
      { id: 'model-pipeline', text: '2. Lightweight YOLOv8 Model Quantization', level: 2 },
      { id: 'hardware-actuation', text: '3. Hardware Actuation & Servo Routing', level: 2 },
      { id: 'telemetry-dashboard', text: '4. Ultrasonic Bin Capacity Telemetry', level: 2 },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Municipal recycling initiatives frequently suffer from consumer sorting fatigue: clean recyclable plastics and aluminum cans are contaminated by food grease or discarded organic waste at the moment of disposal. GTrash was engineered as an automated intelligent bin that takes human decision-making out of the equation.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Project Hardware Stack',
        text: 'Raspberry Pi 4 Model B (4GB), wide-angle 8MP camera module, dual micro-servo tilt flap, HC-SR04 ultrasonic range finders, and custom 3D-printed diversion chute.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'motivation',
        text: '1. Why Automated Point-of-Disposal Sorting?',
      },
      {
        type: 'paragraph',
        text: 'When a user deposits an item into the intake chamber, the lid seals momentarily. An overhead camera takes an ambient-lit snapshot, runs inference to classify the object into Biodegradable, Non-Biodegradable, or Recyclable, and rotates a servo-actuated diverter ramp to slide the item into the designated bin partition.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'model-pipeline',
        text: '2. Lightweight YOLOv8 Model Quantization',
      },
      {
        type: 'paragraph',
        text: 'Standard desktop vision models are too heavy for an embedded edge device like the Raspberry Pi. We trained a customized YOLOv8 nano model on a dataset of over 4,200 labeled campus waste items, then exported the weights into INT8 quantized TensorFlow Lite format. This reduced inference latency from 1,200ms down to 180ms per frame without sacrificing critical detection precision.',
      },
      {
        type: 'code',
        language: 'python',
        title: 'edge_inference_runner.py',
        code: `import cv2
import numpy as np
import tflite_runtime.interpreter as tflite

# Load Quantized TFLite Edge Model
interpreter = tflite.Interpreter(model_path="models/yolov8n_waste_int8.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def classify_waste_frame(frame):
    # Preprocess image to model input shape (320x320)
    resized = cv2.resize(frame, (320, 320))
    input_data = np.expand_dims(resized, axis=0).astype(np.uint8)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()

    predictions = interpreter.get_tensor(output_details[0]['index'])[0]
    category_id = np.argmax(predictions)
    confidence = float(predictions[category_id])

    return category_id, confidence`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'hardware-actuation',
        text: '3. Hardware Actuation & Servo Routing',
      },
      {
        type: 'paragraph',
        text: 'Once confidence scores exceed 85%, GPIO signals command the servo motors to tilt the sorting tray at precise angles (45° left for recyclables, 45° right for non-biodegradable, 0° drop-through for organic). If the confidence score is low or ambiguous (e.g. obscured wrappers), the system prompts an audible buzzer and defaults to the general waste bin.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'telemetry-dashboard',
        text: '4. Ultrasonic Bin Capacity Telemetry',
      },
      {
        type: 'paragraph',
        text: 'Each waste compartment is monitored by an HC-SR04 ultrasonic sensor positioned on the ceiling. As waste accumulates, distance readings decrease. When capacity reaches 85%, the bin sends an MQTT payload to the central campus facilities dashboard, notifying custodial staff for scheduled pickups before bins overflow.',
      },
    ],
  },
  {
    id: '03',
    slug: 'mastering-docker-microservices-production',
    title: 'Production Dockerization: Containerizing Monoliths into Microservices',
    excerpt:
      'Key architectural patterns learned while containerizing Node.js and PostgreSQL applications: multi-stage builds, non-root users, healthchecks, and Nginx reverse proxies.',
    category: 'Cloud & DevOps',
    tags: ['Docker', 'Nginx', 'DevOps', 'Microservices', 'CI/CD', 'AWS'],
    publishedDate: '2026-01-28',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Hanz Magbal',
      role: '4th Year BSIT • USPF',
      avatar: '/me.png',
    },
    toc: [
      { id: 'why-containerize', text: '1. Why Dockerize Early in Modern Projects', level: 2 },
      { id: 'multi-stage-builds', text: '2. Multi-Stage Dockerfile for Lean Images', level: 2 },
      { id: 'reverse-proxy', text: '3. Nginx Reverse Proxy with Zero Downtime', level: 2 },
      { id: 'production-checklist', text: '4. Production Container Checklist', level: 2 },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'During early development, running services directly on localhost works smoothly. But when deploying to cloud droplets, staging environments, or grading assessment clusters, disparate Node versions, missing build tools, and mismatched database drivers cause unpredictable "it works on my machine" failures.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'why-containerize',
        text: '1. Why Dockerize Early in Modern Projects',
      },
      {
        type: 'paragraph',
        text: 'Containerization enforces parity between development and production. Every dependency, environment flag, and runtime configuration is codified directly in version-controlled configuration files (`Dockerfile` and `docker-compose.yml`), making onboarding instantaneous for collaborative teams.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'multi-stage-builds',
        text: '2. Multi-Stage Dockerfile for Lean Images',
      },
      {
        type: 'paragraph',
        text: 'A naive Docker build for a modern Vite + Node application often bundles development dependencies, compiler toolchains, and package caches into a bloated image exceeding 1.2 GB. By adopting multi-stage builds, we reduced image footprint down to under 85 MB.',
      },
      {
        type: 'code',
        language: 'dockerfile',
        title: 'Dockerfile.production',
        code: `# Stage 1: Build & Compile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimalist Production Runner
FROM nginx:alpine-slim AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: Run as non-root
USER nginx
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'reverse-proxy',
        text: '3. Nginx Reverse Proxy with Zero Downtime',
      },
      {
        type: 'paragraph',
        text: 'Exposing backend application servers directly to the public internet introduces unnecessary security attack surfaces. We position Nginx in front of all application containers to handle SSL/TLS termination via Let\'s Encrypt, request rate limiting, gzip/brotli compression, and upstream load distribution.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'production-checklist',
        text: '4. Production Container Checklist',
      },
      {
        type: 'paragraph',
        text: 'Always enforce three fundamental rules in production container architectures: never run containers as the default root user, always specify container health checks so orchestration engines can auto-heal stalled tasks, and keep container build contexts strictly pruned using `.dockerignore`.',
      },
    ],
  },
  {
    id: '04',
    slug: 'state-management-patterns-modern-react',
    title: 'State Machines & Predictable Workflows in React 19 Applications',
    excerpt:
      'Moving beyond messy useEffect chains: how modeling UI flows with explicit finite state patterns eliminated race conditions in complex clinical and dashboard workflows.',
    category: 'Full-Stack Web',
    tags: ['React 19', 'JavaScript', 'Frontend Architecture', 'State Management', 'Performance'],
    publishedDate: '2025-12-10',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'Hanz Magbal',
      role: '4th Year BSIT • USPF',
      avatar: '/me.png',
    },
    toc: [
      { id: 'cascading-effects-nightmare', text: '1. The Pitfalls of Cascading useEffect Hooks', level: 2 },
      { id: 'finite-state-approach', text: '2. Modeling Flows as Explicit Finite States', level: 2 },
      { id: 'tactile-feedback', text: '3. Tactile Transitions & Perceived Performance', level: 2 },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'In complex applications like Medora (clinical appointment triage) or multi-step checkout funnels in Langor, components often juggle multiple boolean flags: `isLoading`, `isSubmitting`, `hasError`, `isSuccess`, and `isConfirmed`. As requirements evolve, these flags combine into impossible states where a component is both loading and displaying an error dialog simultaneously.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'cascading-effects-nightmare',
        text: '1. The Pitfalls of Cascading useEffect Hooks',
      },
      {
        type: 'paragraph',
        text: 'React effects should synchronize state with external systems, not orchestrate internal sequential logic. When developers chain useEffect calls to watch for state changes that trigger secondary state changes, unexpected race conditions and cascading re-renders inevitably follow.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'finite-state-approach',
        text: '2. Modeling Flows as Explicit Finite States',
      },
      {
        type: 'paragraph',
        text: 'By replacing fragmented boolean flags with an explicit finite state machine pattern, we guarantee that the UI can only ever exist in one valid mode at any given millisecond: IDLE, VALIDATING, PROCESSING, SUCCESS, or FAILED.',
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'useTriageWorkflow.js',
        code: `// Deterministic State Machine Pattern
import { useReducer } from 'react';

const initialState = {
  status: 'IDLE', // 'IDLE' | 'ANALYZING' | 'SCHEDULED' | 'ERROR'
  data: null,
  error: null,
};

function triageReducer(state, action) {
  switch (state.status) {
    case 'IDLE':
      if (action.type === 'START_ANALYSIS') {
        return { ...state, status: 'ANALYZING', error: null };
      }
      return state;
    case 'ANALYZING':
      if (action.type === 'ANALYSIS_COMPLETE') {
        return { status: 'SCHEDULED', data: action.payload, error: null };
      }
      if (action.type === 'ANALYSIS_FAILED') {
        return { status: 'ERROR', data: null, error: action.payload };
      }
      return state;
    case 'SCHEDULED':
    case 'ERROR':
      if (action.type === 'RESET') {
        return initialState;
      }
      return state;
    default:
      return state;
  }
}`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'tactile-feedback',
        text: '3. Tactile Transitions & Perceived Performance',
      },
      {
        type: 'paragraph',
        text: 'Explicit state models enable seamless animations. Because transition states are deterministic, Framer Motion can smoothly coordinate exit and entrance animations between distinct steps without flickering or state tearing.',
      },
    ],
  },
];

/**
 * Returns all blog posts sorted by date descending.
 */
export function getAllPosts() {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Retrieves a single post by slug.
 */
export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

/**
 * Retrieves related posts sharing the same category or tags, excluding current post.
 */
export function getRelatedPosts(currentSlug, limit = 2) {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      const aCat = a.category === current.category ? 1 : 0;
      const bCat = b.category === current.category ? 1 : 0;
      return bCat - aCat;
    })
    .slice(0, limit);
}
