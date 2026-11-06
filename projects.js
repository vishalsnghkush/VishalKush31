export const projects = [
  {
    id: "agriverse-web",
    name: "AgriVerse",
    category: "Web",
    eyebrow: "SMART AGRICULTURE",
    description:
      "AI-assisted crop management platform combining plant disease detection, weather insights, irrigation advice, and yield estimation.",
    stack: ["React", "Flask", "PyTorch", "Turso"],
    repo: "https://github.com/vishalsnghkush/AgriVerse",
    live: "https://agriverse-farmer.onrender.com",
    visual: "agri",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/agriverse/dashboard.png`,
        label: "Dashboard",
        alt: "AgriVerse dashboard with crop yield prediction and smart farming tools",
      },
      {
        src: `${import.meta.env.BASE_URL}images/projects/agriverse/Screenshot%202026-11-04%20005451.png`,
        label: "Disease analysis",
        alt: "AgriVerse leaf disease analysis showing an apple black rot result and treatment recommendations",
      },
    ],
    color: "#D7E5CF",
  },
  {
    id: "precisionprep",
    name: "PrecisionPrep",
    category: "Web",
    eyebrow: "AI TEST PREPARATION",
    description:
      "AI-powered test preparation platform with dynamic question generation, computer-based test practice, and performance insights.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
    repo: "https://github.com/aditi-malviya666/Software-Engineering-Project",
    live: "https://precisionprep.vercel.app",
    visual: "learn",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/PrecisionPrep/1.png`,
        label: "Dashboard",
        alt: "PrecisionPrep dashboard with exam practice, accuracy metrics, and AI study coach insights",
      },
      {
        src: `${import.meta.env.BASE_URL}images/projects/PrecisionPrep/2.jpeg`,
        label: "CBT practice",
        alt: "PrecisionPrep timed JEE computer-based test with multiple-choice questions and question navigation",
      },
    ],
    color: "#E5DDF0",
  },
  {
    id: "adaptly",
    name: "Adaptly",
    category: "AI & ML",
    eyebrow: "ADAPTIVE LEARNING",
    description:
      "Resume-to-role skill gap analysis with prerequisite-aware learning roadmaps, adaptive quizzes, and an AI mentor for personalized onboarding.",
    stack: ["FastAPI", "scikit-learn", "NetworkX", "JavaScript"],
    repo: "https://github.com/aditi-malviya666/AI-Adaptive-Onboarding-Engine",
    live: "https://ai-adaptive-onboarding-engine-ar6v.onrender.com",
    visual: "adapt",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/Adapty/1.jpeg`,
        label: "Overview",
        alt: "Adaptly overview with personalized learning roadmaps, skill gaps, and an AI mentor",
      },
    ],
    color: "#D6E6E3",
  },
  {
    id: "studify-success",
    name: "Studify Success",
    category: "Mobile",
    eyebrow: "LEARNING & TEAM OPERATIONS",
    description:
      "Mobile learning and internship management platform bringing together courses, assessments, task submissions, attendance, team workflows, and training schedules.",
    stack: ["React Native", "Redux Toolkit", "Firebase", "MySQL"],
    repo: "https://github.com/vishalsnghkush/studify_all",
    live: "https://play.google.com/store/apps/details?id=com.studifysuccess.courses",
    visual: "mobile",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/Studify_App/1.jpeg`,
        label: "Learning home",
        alt: "Studify Success mobile home with a personalized study planner, AI flashcards, and learning navigation",
      },
    ],
    color: "#EFDCE2",
  },
  {
    id: "diabetic-retinopathy",
    name: "Diabetic Retinopathy",
    category: "AI & ML",
    eyebrow: "RETINAL HEALTH RESEARCH",
    description:
      "Research prototype exploring retinal vessel segmentation, blood-flow modelling, physics-informed neural networks, and diabetic retinopathy triage. Experimental risk estimates require clinical validation.",
    stack: ["PyTorch", "SciPy", "scikit-image", "FastAPI"],
    repo: "https://github.com/aditi-malviya666/Diabetic-Retinopathy",
    live: "https://diabetic-retinopathy-xk2p.onrender.com",
    visual: "retina",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/DR/1.jpeg`,
        label: "Research overview",
        alt: "Diabetic Retinopathy research prototype explaining retinal vessel analysis and physics stress mapping, with an experimental-use notice",
      },
    ],
    color: "#E6DCE8",
  },
  {
    id: "cpu-scheduler-pro",
    name: "CPU Scheduler Pro",
    category: "Systems",
    eyebrow: "OPERATING SYSTEMS",
    description:
      "Interactive CPU scheduling simulator with animated Gantt charts, algorithm comparisons, multi-core simulation, performance metrics, and a rule-based scheduling advisor.",
    stack: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
    repo: "https://github.com/vishalsnghkush/OS_CPU_Scheduler",
    live: "https://cpuscheduler-one.vercel.app",
    visual: "cpu",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/CPU/1.jpeg`,
        label: "Task builder",
        alt: "CPU Scheduler Pro task builder with process queue, burst times, CPU configuration, and FCFS algorithm selection",
      },
    ],
    color: "#DCE3EC",
  },
  {
    id: "agriverse-mobile",
    name: "AgriVerse Mobile",
    category: "Mobile",
    eyebrow: "FARMING COMPANION",
    description:
      "Offline-first farming app with leaf diagnosis, spoken advice, mandi prices, fertilizer and irrigation calculators, multilingual support, and cloud sync.",
    stack: ["React", "Capacitor", "Vite", "Tailwind CSS"],
    repo: "https://github.com/vishalsnghkush/AgriVerse_App",
    live: null,
    visual: "mobile",
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/AgriVerse_App/1.jpeg`,
        label: "Farm dashboard",
        alt: "AgriVerse Mobile dashboard with AI leaf diagnosis, farm sensor readings, fertilizer tools, and treatment history",
      },
    ],
    color: "#E1E8D3",
  },
  {
    id: "indoor-navigator",
    name: "Indoor Navigator",
    category: "Mobile",
    eyebrow: "SENSOR-BASED NAVIGATION",
    description:
      "Indoor mapping and navigation prototype using smartphone sensors, walking-based map creation, multi-floor routing, particle-filter localization, and cloud map sharing without installed beacons.",
    stack: ["React Native", "Expo", "Firebase", "React Native SVG"],
    repo: "https://github.com/aditi-malviya666/Indoor_navigation",
    live: null,
    visual: "map",
    color: "#D8E5E9",
  },
  {
    id: "amazon-ml-challenge",
    name: "Amazon ML Challenge",
    category: "AI & ML",
    eyebrow: "BUSINESS ENTITY RESOLUTION",
    description:
      "Record-linkage pipeline matching noisy business records across sources through character-level TF-IDF blocking, fuzzy similarity features, and precision-oriented classification.",
    stack: ["Python", "scikit-learn", "RapidFuzz", "LightGBM"],
    repo: "https://github.com/aditi-malviya666/amazon-ml",
    live: null,
    visual: "data",
    color: "#EBDDCB",
  },
  {
    id: "fda-weather-analysis",
    name: "FDA Weather Analysis",
    category: "AI & ML",
    eyebrow: "WEATHER DATA SCIENCE",
    description:
      "Weather-data analysis and machine learning benchmarking workflow with feature engineering, threshold-derived severity labels, cross-validation, and diagnostic visualizations.",
    stack: ["Pandas", "scikit-learn", "XGBoost", "Matplotlib"],
    repo: "https://github.com/vishalsnghkush/FDA",
    live: null,
    screenshots: [
      {
        src: `${import.meta.env.BASE_URL}images/projects/FDA/1.png`,
        label: "Diagnostics",
        alt: "FDA Weather Analysis machine learning pipeline showing weather anomalies, SHAP feature importance, and XGBoost classification diagnostics",
      },
    ],
    color: "#E8E5D4",
  },
];
