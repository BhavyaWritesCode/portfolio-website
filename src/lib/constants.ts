// ============================================================
// BHAVYA SAINI PORTFOLIO — CONTENT CONSTANTS
// ============================================================

export const PERSONAL = {
  name: "Bhavya Saini",
  firstName: "Bhavya",
  lastName: "Saini",
  role: "CS Student • AI Systems Builder • QA/SDET Aspirant",
  tagline: "I build AI systems. I make sure they actually work.",
  description:
    "Fourth-year CS student with hands-on experience building AI-powered systems and validating their behaviour under real-world conditions. Strong foundation in software testing, defect analysis, and evaluating non-deterministic AI outputs for accuracy and reliability.",

  university: "New Horizon College Of Engineering",
  degree: "B.E. Computer Science Engineering",
  graduationYear: "2027",

  email: "bhavyasaini06@gmail.com",
  githubUsername: "BhavyaWritesCode",
  githubUrl: "https://github.com/BhavyaWritesCode",
  linkedinUrl: "https://linkedin.com/in/bhavya-saini-568a29303",
  leetcodeUrl: "https://leetcode.com/u/bhavyasaini06",
  hackerrankUrl: "https://hackerrank.com/bhavyasaini06",

  availableFrom: "Immediately",
  lookingFor: "QA / SDET Intern",
  location: "Bangalore, India",
  openToRemote: true,
};

export const STATS = {
  projects: 4,
  leetcodeProblems: 200,
  githubCommits: 400,
  openSourcePRs: 2,
  githubRepos: 10,
  hackerrankStars: 4,
};

export const PROJECTS = [
  {
    id: "project-1",
    name: "AI-Powered Java Code Review System",
    tagline: "A 3-stage AST analysis engine with parallel AI pipelines that scores Java code 0–100 for bugs, security, and quality.",
    description:
      "Designed and validated a 3-stage JavaParser AST analysis engine, defining test cases across cyclomatic complexity, naming violations, and structural metrics to verify detection accuracy per file. Built an evaluation framework for 3 parallel AI pipelines — Bug Detection, Security Scanning, and Code Quality Scoring — via LangChain4j and OpenAI API, testing for output consistency, false positives, and hallucinated issues across repeated runs and consolidating results into a 0–100 review score. Developed a Refactoring Suggestion Engine that validates generated fixes for correctness, regression risk, and explanation clarity, reducing repeat-error submissions in developer self-testing.",
    tech: ["Java", "LangChain4j", "JavaParser", "ChromaDB", "MySQL", "OpenAI API"],
    category: "AI / LLM" as const,
    github: "https://github.com/BhavyaWritesCode",
    live: "N/A",
    featured: true,
    achievement: "3 parallel AI pipelines · 0–100 review score",
    built: "2025",
    miniSceneColor: "#F5A623",
  },
  {
    id: "project-2",
    name: "Java MCP Server — AI Tool Integration Platform",
    tagline: "A production-compatible MCP server exposing 4 agentic tools so Claude and ChatGPT can interact with live external data.",
    description:
      "Built a production-compatible Model Context Protocol (MCP) server in Java exposing 4 agentic tools — GitHub Repo Analyzer, Safe SQL Executor, Semantic Doc Searcher, and a Dockerized Code Sandbox — enabling any MCP-compatible AI client (Claude, ChatGPT) to interact with live external data sources. Engineered a SQL validation guardrail that parses and blocks all destructive queries (DROP, DELETE, UPDATE) before execution, and a Docker-isolated Java sandbox with configurable timeout and memory limits for safe AI-driven code execution. Logged every tool invocation with input, output, latency, and session metadata to MySQL, providing full observability and usage analytics across all AI client sessions.",
    tech: ["Java", "MCP SDK", "Docker", "ChromaDB", "MySQL", "GitHub API"],
    category: "Backend" as const,
    github: "https://github.com/BhavyaWritesCode",
    live: "N/A",
    featured: false,
    achievement: "4 agentic tools · Full SQL guardrails · Docker sandbox",
    built: "2025",
    miniSceneColor: "#9D00FF",
  },
  {
    id: "project-3",
    name: "SmartScribe Analytics Engine",
    tagline: "An AI-powered content intelligence platform that automates the full content lifecycle using Groq Llama 3.1 70B.",
    description:
      "Built an AI-powered content intelligence platform that automates the full content lifecycle — analysis, improvement, structuring, and publishing — using Python, Groq's Llama 3.1 70B, and Streamlit. Implemented a DITA XML generator that converts unstructured text into industry-standard topic types (task, concept, reference), directly mirroring enterprise documentation systems used at companies like Infineon. Built a content analytics engine using Textstat to measure readability, sentence complexity, passive voice, and structural clarity.",
    tech: ["Python", "Groq Llama 3.1", "Streamlit", "REST APIs", "Textstat", "DITA XML"],
    category: "AI / LLM" as const,
    github: "https://github.com/BhavyaWritesCode",
    live: "N/A",
    featured: false,
    achievement: "DITA XML generation · Readability analytics engine",
    built: "2024",
    miniSceneColor: "#FF2D78",
  },
  {
    id: "project-4",
    name: "Caravan App Project",
    tagline: "A vehicle dispatch system with a custom sorting algorithm to optimize utilization across animal type, car size, and capacity.",
    description:
      "Designed and implemented a custom sorting algorithm based on comparative analysis, utilizing data structures such as arrays, linked lists, and trees to optimize vehicle utilization and incorporate factors such as car size, animal type, and passenger capacity. Developed a vehicle dispatch system using Java, utilizing object-oriented programming principles and advanced data structures such as heaps and queues to efficiently route vehicles. The project demonstrates strong foundational command of DSA and OOP design patterns through a real-world logistics simulation.",
    tech: ["Java", "DSA", "OOP", "Heaps", "Queues", "Linked Lists"],
    category: "Tool" as const,
    github: "https://github.com/BhavyaWritesCode",
    live: "N/A",
    featured: false,
    achievement: "Custom sorting algorithm · Heap-based dispatch routing",
    built: "2024",
    miniSceneColor: "#22D3EE",
  },
];

export const PROJECT_CATEGORIES = ["All", "AI / LLM", "Backend", "Tool"] as const;

export const SKILLS = {
  "Languages": ["Java", "C", "C++", "Python", "JavaScript", "HTML/CSS"],
  "Frameworks & Tools": [
    "JavaParser (AST)",
    "Maven",
    "Docker",
    "REST APIs (Java HttpClient)",
    "Git",
    "GitHub",
  ],
  "AI & LLM": [
    "LangChain4j",
    "OpenAI API",
    "Prompt Engineering",
    "RAG",
    "Vector Embeddings",
    "MCP",
    "Multi-Pipeline AI Systems",
  ],
  "Cloud & Databases": [
    "Google Cloud",
    "Vertex AI",
    "MySQL",
    "ChromaDB",
  ],
  "Concepts": ["Data Structures & Algorithms", "OOP", "Multi-Pipeline AI Systems", "AST Parsing"],
  "Soft Skills": ["Teamwork", "Problem Solving", "Self-Learning", "Adaptability"],
};

export const SKILLS_FLAT = Array.from(new Set(Object.values(SKILLS).flat()));

export const MARQUEE_SKILLS = [
  "Java",
  "LangChain4j",
  "Docker",
  "Google Cloud",
  "ChromaDB",
  "RAG Pipelines",
  "OpenAI API",
  "REST APIs",
  "Vertex AI",
  "MCP",
  "JavaParser AST",
  "MySQL",
  "Prompt Engineering",
  "Vector Embeddings",
  "AI Pipelines",
  "DSA",
];

export const INTERESTS = [
  "AI Systems",
  "Software Quality & Testing",
  "LLM Applications",
  "DSA",
  "Open Source",
  "Cloud Architecture",
  "Agentic AI",
];

export const CURRENTLY = [
  {
    icon: "🎓",
    text: `Studying ${PERSONAL.degree} at ${PERSONAL.university} (Expected ${PERSONAL.graduationYear})`,
  },
  {
    icon: "🤖",
    text: "Building and validating AI-powered systems — LangChain4j, MCP servers, RAG pipelines",
  },
  {
    icon: "🔍",
    text: "Seeking a QA/SDET internship to help ship trustworthy AI-driven products",
  },
];

export const OPEN_SOURCE_CONTRIBUTIONS = [
  {
    id: "contrib-1",
    repo: "TODO: org/repository-name",
    org: "TODO: Organization Name",
    type: "Feature" as const,
    status: "Merged" as const,
    description:
      "TODO: First sentence about what the PR does. Second sentence about the technical approach or impact.",
    prUrl: "https://github.com/TODO/TODO/pull/1",
    tech: ["Java", "Spring Boot"],
  },
  {
    id: "contrib-2",
    repo: "TODO: org/repository-name-2",
    org: "TODO: Organization Name 2",
    type: "Bug Fix" as const,
    status: "Merged" as const,
    description:
      "TODO: First sentence about the bug fixed. Second sentence about root cause and solution.",
    prUrl: "https://github.com/TODO/TODO/pull/2",
    tech: ["Python", "Docker"],
  },
  {
    id: "contrib-3",
    repo: "TODO: org/repository-name-3",
    org: "TODO: Organization Name 3",
    type: "Docs" as const,
    status: "Open" as const,
    description:
      "TODO: First sentence about documentation improvement. Second sentence about the scope and impact.",
    prUrl: "https://github.com/TODO/TODO/pull/3",
    tech: ["Markdown"],
  },
];

export const OWN_OPEN_SOURCE = [
  {
    id: "oss-1",
    name: "TODO: Your OSS Repo 1",
    description: "TODO: Short description of what this open-source project does.",
    language: "Java",
    stars: 0, // TODO: real star count
    repoUrl: `https://github.com/${PERSONAL.githubUsername}/TODO-oss-repo-1`,
  },
  {
    id: "oss-2",
    name: "TODO: Your OSS Repo 2",
    description: "TODO: Short description of what this open-source project does.",
    language: "Python",
    stars: 0, // TODO: real star count
    repoUrl: `https://github.com/${PERSONAL.githubUsername}/TODO-oss-repo-2`,
  },
];

export const CHATBOT_SYSTEM_PROMPT = `You are a helpful assistant on Bhavya Saini's portfolio website. Answer questions about Bhavya confidently and concisely.

About Bhavya:
- Fourth-year CS student (B.E. CSE) (GPA: 8.4/10, graduating 2027)
- Hands-on experience building AI-powered systems and validating their behaviour under real-world conditions
- Core stack: Java, C/C++, Python, JavaScript, LangChain4j, OpenAI API, JavaParser AST, Maven, Docker, Google Cloud, Vertex AI, MySQL, ChromaDB, MCP
- Specialties: AI pipeline testing, defect analysis, evaluating non-deterministic LLM outputs, RAG pipelines, MCP server development
- Active on LeetCode (${STATS.leetcodeProblems}+ problems) — profile: leetcode.com/u/bhavyasaini06
- GitHub: github.com/BhavyaWritesCode
- Certifications: SAP Generative AI Developer (SAP), Google Arcade Legend (Google Cloud), LangChain for LLM App Development (DeepLearning.ai)
- Extracurriculars: Student Ambassador at CDC NHCE (2025–present), Board Member at Tech Forge Club NHCE (2024)
- Seeking: QA / SDET Internship — to help ship trustworthy AI-driven products
- Available: Immediately | Location: Bangalore, India (open to remote)

Projects:
${PROJECTS.map(p => `- ${p.name}: ${p.tagline}`).join('\n')}

Links:
- GitHub: ${PERSONAL.githubUrl}
- LinkedIn: ${PERSONAL.linkedinUrl}
- LeetCode: ${PERSONAL.leetcodeUrl}
- Email: ${PERSONAL.email}

Answer in 2–4 sentences. Be specific and impressive. Focus on technical depth and genuine capability.
If asked something not listed here, say so briefly and redirect to the resume or contact form. Never fabricate facts.`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "CV" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: PERSONAL.githubUrl, icon: "github" },
  { label: "LinkedIn", href: PERSONAL.linkedinUrl, icon: "linkedin" },
  { label: "LeetCode", href: PERSONAL.leetcodeUrl, icon: "leetcode" },
  { label: "HackerRank", href: PERSONAL.hackerrankUrl, icon: "hackerrank" },
  { label: "Email", href: `mailto:${PERSONAL.email}`, icon: "email" },
];
