import lunarLanderGif from "@/static/lunar_lender_reward_312.gif";
import mountainCarGif from "@/static/mountaincar_simulation_model_episode_14400_lr0.gif";

export const personalInfo = {
  name: "Ahmet Sahiner",
  tagline:
    "Results-Driven Computer Science Student | Full-Stack Developer | Salesforce Certified Administrator & Developer",
  email: "ahmetsahinersf@gmail.com",
  phone: "415.310.6414",
  github: "github.com/albertfast",
  linkedin: "linkedin.com/in/ahmetsahiner",
  githubUrl: "https://github.com/albertfast",
  linkedinUrl: "https://linkedin.com/in/ahmetsahiner",
};

export const aboutContent = {
  paragraphs: [
    "Born and raised in Istanbul, I began my academic journey in finance and earned a Bachelor of Science from Adnan Menderes University in 2015. After moving to the United States, I reinvented myself as a software engineer. I obtained Salesforce Administrator and Platform Developer I certifications and immersed myself in web and mobile development at City College of San Francisco. I’m now completing an Associate of Science in Computer Science (3.63 GPA) while earning certificates in Advanced Web Development Techniques, Web Application Programming, and Front‑End Web Development.",
    "I thrive at the intersection of innovation and problem solving. I’ve built full‑stack iOS and Android apps with React Native and Expo, integrated Supabase/PostgreSQL back‑ends, and designed scalable APIs. My projects range from real‑time transit‑tracking systems and reinforcement‑learning experiments using DQN/Q‑learning to nonprofit CRM solutions with Salesforce Sales and Billing Clouds. Through internships and open‑source contributions, I’ve integrated modern logging frameworks, led teams of interns, and explored AI research workflows for domain‑specific language models.",
    "My passion for AI isn’t limited to conventional applications: I’ve trained reinforcement‑learning agents over tens of thousands of episodes to optimize lunar landings and other control tasks, visualizing learning trajectories and experimenting with ε‑greedy strategies. I’m equally fascinated by quantum computing and the potential of emerging technologies. Combining analytical thinking honed in finance with hands‑on engineering skills, I’m committed to continuous learning and collaboration, whether building new applications, contributing to open source, or exploring the frontiers of technology.",
  ],
  stats: [
    { label: "Education", value: "5" },
    { label: "Certifications", value: "4" },
    { label: "Projects", value: "10+" },
    { label: "Experiences", value: "5" },
  ],
};

export const educationEntries = [
  {
    institution: "City College of San Francisco",
    degree: "Associate of Science in Computer Science",
    date: "Expected May 2027",
    gpa: "3.63",
    details: null,
  },
  {
    institution: "City College of San Francisco",
    degree: "Advanced Web Development Techniques Certificate",
    date: "Graduated Dec 2025",
    gpa: null,
    details: null,
  },
  {
    institution: "City College of San Francisco",
    degree: "Web Application Programming Certificate",
    date: "Graduated Dec 2025",
    gpa: null,
    details: null,
  },
  {
    institution: "City College of San Francisco",
    degree: "Front-End Web Development Certificate",
    date: "Expected Dec 2025",
    gpa: null,
    details: null,
  },
  {
    institution: "Adnan Menderes University",
    degree: "Bachelor of Science in Finance",
    date: "Jan 2015",
    gpa: null,
    details: "Aydın, Turkey",
  },
];

export const deansList = [
  "Fall 2024",
  "Spring 2025",
  "Fall 2025",
];

export const certifications = [
  {
    name: "Salesforce Certified Platform Developer I",
    credentialId: "2943764",
    date: "Jan 2023",
  },
  {
    name: "Salesforce Certified Administrator",
    credentialId: "2415012",
    date: "Nov 2022",
  },
  {
    name: "Copado Fundamentals I",
    credentialId: "030352",
    date: null,
  },
  {
    name: "Artificial Intelligence and Introduction to Algorithms",
    credentialId: null,
    date: "June 2023",
  },
];

export const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "HTML",
      "CSS",
      "React",
      "React Native (Expo)",
      "Expo Go",
      "iOS & Android Apps",
      "TailwindCSS",
      "Bootstrap",
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "Flask",
      "Django",
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "API Integration",
      "REST APIs",
      "SOAP APIs",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "Salesforce Sales Cloud",
      "Salesforce CPQ",
      "Billing Cloud",
      "Apex",
      "LWC",
      "Heroku",
      "Copado",
      "Git",
      "GitHub",
      "Jenkins",
      "Postman",
      "VS Code",
      "Agile Methodology",
      "Trello",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "PyTorch",
      "Q-learning",
      "DQN",
      "LLM Prompt Engineering",
      "Data Evaluation",
    ],
  },
];

export const experiences = [
  {
    company: "Eye Beamit",
    role: "Software Development Engineer Intern",
    date: "Aug 2025 - Present",
    bullets: [
      "Engineered full-stack integrations across a React Native Expo Go app, Supabase backend, Bluehost hosting, and third-party APIs.",
      "Built and tested cross-platform beacon detection for Android and iOS, strengthening the app's IoT and in-store interaction capabilities.",
      "Worked with Agile/Trello delivery habits while translating business requirements into mobile, database, and integration tasks.",
      "Supported flagship store demos in the San Francisco Bay Area for investors and brand partners.",
    ],
  },
  {
    company: "Handshake AI",
    role: "AI Research Contractor",
    date: "Nov 2025 - Jan 2026",
    bullets: [
      "Contributed to AI research initiatives focused on improving domain-specific accuracy for large language models.",
      "Developed, tested, and refined prompts while evaluating LLM responses for training and model assessment workflows.",
      "Processed and structured data into high-quality training sets to improve reasoning quality.",
    ],
  },
  {
    company: "CTI / CodeDay",
    role: "Software Engineering Internship",
    date: "Jul 2025 - Sep 2025",
    bullets: [
      "Integrated Loguru with Dagster's internal logging system through custom sink and decorator implementations.",
      "Resolved Dagster Issue #29914 by bridging context.log and loguru.logger for unified terminal and Dagster UI output.",
      "Refactored logging code into Dagster core, preserved async execution compatibility, and wrote tests for context injection and terminal output.",
      "Collaborated with mentors and maintainers through PR review and documented the technical solution in a blog post.",
    ],
  },
  {
    company: "The Build Fellowship",
    role: "Student Consultant",
    date: "Feb 2025 - Apr 2025",
    bullets: [
      "Conducted Q-learning experiments using PyTorch and Gymnasium in LunarLander-v3.",
      "Trained DQN agents over 30,000+ episodes while optimizing epsilon-greedy strategies and batch scheduling.",
      "Validated theories on collaborative vs. independent agent behavior and visualized results with reward plots and training GIFs.",
    ],
  },
  {
    company: "Munibuddy",
    role: "Backend Developer (Capstone)",
    date: "Jan 2025 - May 2025",
    bullets: [
      "Built a real-time transit tracking backend with FastAPI, PostgreSQL, Redis, and Docker.",
      "Integrated React and Flutter clients for live map display across web and Android.",
      "Implemented caching, HTTPS deployment, and location-based APIs for performance and multi-client support.",
    ],
  },
];

export type ProjectColor = "cyan" | "purple" | "emerald" | "amber" | "pink" | "indigo";

export const featuredProjects = [
  {
    title: "Eye Beamit Mobile Integrations",
    description: "Cross-platform React Native and Expo Go mobile work for Eye Beamit, connecting iOS and Android beacon detection, Supabase data flows, Bluehost hosting, and third-party API integrations for store and investor demos.",
    tags: ["React Native", "Expo Go", "Supabase", "API Integration"],
    stars: 0,
    url: "",
    topics: ["iOS", "Android", "Expo", "Supabase", "Integrations"],
    highlights: ["iOS & Android", "Beacon Detection", "Supabase"],
    color: "emerald" as ProjectColor,
  },
  {
    title: "Pictolab.app Website",
    description: "Public website build for pictolab.app, focused on presenting the product clearly with a responsive frontend, polished visual structure, and production deployment considerations.",
    tags: ["Web", "React", "Deployment", "UI"],
    stars: 0,
    url: "https://pictolab.app",
    topics: ["product-site", "responsive-ui", "deployment"],
    highlights: ["Live Website", "Responsive UI", "Product Site"],
    color: "cyan" as ProjectColor,
  },
  {
    title: "loguru-dagster",
    description: "Open-source Dagster contribution that bridges context.log with loguru.logger so teams get consistent logging in the terminal and Dagster UI. The work included core refactoring, async-compatible behavior, tests, PR review, and a technical write-up.",
    tags: ["Python", "Dagster", "Logging", "Open Source"],
    stars: 2,
    url: "https://github.com/albertfast/loguru-dagster",
    issueUrl: "https://github.com/dagster-io/dagster/issues/29914",
    topics: ["dagster", "logging", "loguru", "observability", "python"],
    highlights: ["Issue #29914", "Dagster UI", "Test Coverage"],
    color: "cyan" as ProjectColor,
  },
  {
    title: "Open Energy Dashboard",
    description: "Open-source contribution focused on energy data reliability. Implemented Mocha/Chai tests for flow-meter data, fixed PostgreSQL authentication in Docker/GitHub Codespaces, refactored JavaScript test logic, and improved CSV time-series accuracy.",
    tags: ["JavaScript", "Mocha", "Chai", "PostgreSQL"],
    stars: 0,
    url: "https://github.com/OpenEnergyDashboard/OED",
    issueUrl: "https://github.com/OpenEnergyDashboard/OED/pull/1424",
    highlights: ["PR #1424", "CI Fixes", "Time-Series Tests"],
    color: "amber" as ProjectColor,
  },
  {
    title: "LunarLander-v3 DQN",
    description: "Reinforcement learning project using PyTorch and Gymnasium. Trained DQN agents over 30,000+ episodes, tuned epsilon-greedy behavior and batch scheduling, and compared collaborative vs. independent agent strategies.",
    tags: ["PyTorch", "RL", "Gymnasium", "DQN"],
    stars: 0,
    url: "https://github.com/albertfast/lunar_lender_v3",
    colabUrl: "https://colab.research.google.com/drive/1oqF-VY3xKghPLhTL12Cn6Xor6Q2lTBhF#scrollTo=Gm_svVNzPDXG&line=104&uniqifier=1",
    media: lunarLanderGif.src,
    mediaAlt: "LunarLander DQN reward animation",
    highlights: ["30K+ Episodes", "Reward Plots", "Colab GPU"],
    color: "pink" as ProjectColor,
  },
  {
    title: "MountainCar-v0 RL",
    description: "Reinforcement learning experiment for MountainCar-v0 using PyTorch. Built training loops, evaluated reward progression, generated training GIFs, and used Colab GPU runs to compare learning behavior.",
    tags: ["PyTorch", "RL", "Python"],
    stars: 0,
    url: "https://github.com/albertfast/Mountaincar_v0",
    colabUrl: "https://colab.research.google.com/drive/1hagi-hRqzp9pnUJLW0GuUWNR7JBeMa8i#scrollTo=EyuhmvyonOL9",
    media: mountainCarGif.src,
    mediaAlt: "MountainCar trained model simulation",
    highlights: ["Training GIFs", "Reward Analysis", "Colab GPU"],
    color: "indigo" as ProjectColor,
  },
  {
    title: "Salesforce Donor Management App",
    description: "Nonprofit donation platform built with Apex, Lightning Web Components, MuleSoft, and Give Lively integration. Led a 10-intern team, automated donation workflows, and improved dashboards for donor and financial tracking.",
    tags: ["Salesforce", "Apex", "LWC", "MuleSoft"],
    stars: 0,
    url: "https://github.com/albertfast/DonorApp",
    topics: ["salesforce", "apex", "lwc", "mulesoft"],
    highlights: ["Team Lead", "Give Lively API", "Dashboards"],
    color: "emerald" as ProjectColor,
  },
  {
    title: "Munibuddy Backend",
    description: "Capstone backend for real-time transit tracking. Built with FastAPI, PostgreSQL, Redis, and Docker, then integrated with React and Flutter clients for live map display, location APIs, caching, and HTTPS deployment.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    stars: 0,
    url: "",
    topics: ["fastapi", "postgresql", "redis", "transit"],
    highlights: ["Live Transit", "Redis Cache", "Multi-Client API"],
    color: "purple" as ProjectColor,
  },
  {
    title: "Java Cyber Animation",
    description: "JavaFX-inspired 3D cyber animation ported into the portfolio as a web-native Three.js experience. It recreates torus-knot geometry, wireframe polyhedra, and animated cyber-cell particles without requiring Java runtime in the browser.",
    tags: ["Java", "Three.js", "React", "Animation"],
    stars: 0,
    url: "https://github.com/albertfast/java-life-viewer",
    highlights: ["3D Wireframe", "JavaFX Inspired", "Web Native"],
    color: "cyan" as ProjectColor,
  },
  {
    title: "Encoder/Decoder App",
    description: "Python and JavaScript tool for encoding and decoding text. The app splits input strings, converts values to binary, mutates encoded segments, and recalculates decimal outputs for learning-focused data transformation workflows.",
    tags: ["Python", "JavaScript", "Binary"],
    stars: 0,
    url: "https://github.com/albertfast/decodedEncoded",
    highlights: ["Binary Encoding", "String Processing"],
    color: "emerald" as ProjectColor,
  },
  {
    title: "Budget Tracker",
    description: "C-based command-line budget tracker for personal finance practice. Tracks expenses, categories, and balances while reinforcing systems-level programming fundamentals.",
    tags: ["C", "CLI", "Finance"],
    stars: 0,
    url: "https://github.com/albertfast/budget-tracker",
    highlights: ["C Programming", "Finance CLI"],
    color: "purple" as ProjectColor,
  },
];

export const researchInterests = [
  {
    title: "Quantum Fourier Transform (QFT)",
    description:
      "Exploring QFT applications for signal analysis and detecting unintended model biases in machine learning systems.",
    tags: ["Quantum Computing", "Signal Processing"],
  },
  {
    title: "Double-Slit Experiment & Photon Behavior",
    description:
      "Investigating the mysteries of photon observation behavior and wave-particle duality in quantum mechanics.",
    tags: ["Quantum Mechanics", "Physics"],
  },
  {
    title: "Uranus Orbital Anomalies",
    description:
      "Analyzing scientific paradigm shifts through the study of unexpected orbital behavior in planetary science.",
    tags: ["Astrophysics", "Data Analysis"],
  },
  {
    title: "Cirq Quantum Computing Experiments",
    description:
      "Hands-on experimentation with Google's Cirq library for quantum circuit design and quantum algorithm development.",
    tags: ["Cirq", "Quantum Algorithms"],
  },
  {
    title: "Perturbation Sensitivity Analysis",
    description:
      '"Perturbation Sensitivity Analysis to Detect Unintended Model Biases" — detecting biases through input perturbation methods.',
    tags: ["ML Fairness", "Bias Detection"],
  },
  {
    title: "Image Counterfactual Sensitivity Analysis",
    description:
      '"Image Counterfactual Sensitivity Analysis for Detecting Unintended Bias" — exploring bias through counterfactual image generation.',
    tags: ["Computer Vision", "Bias Detection"],
  },
];

export const awards = [
  {
    title: "Dean's Honor List",
    detail: "Fall 2024, Spring 2025, Fall 2025",
    icon: "award" as const,
  },
  {
    title: "Soft Innovas Bootcamp",
    detail: "Completed intensive software innovation bootcamp",
    icon: "rocket" as const,
  },
  {
    title: "Team Leadership",
    detail: "Led a team of 10 interns for Salesforce Donor Management App project",
    icon: "users" as const,
  },
  {
    title: "Open Source Contributor",
    detail: "Contributed to Dagster Labs and Open Energy Dashboard",
    icon: "code" as const,
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Activity", href: "#activity" },
  { label: "Research", href: "#research" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];
