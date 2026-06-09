// ============================================================
// BHAVYA SAINI PORTFOLIO — CONTENT CONSTANTS
// Search for "TODO:" to find all placeholders to fill in.
// ============================================================

export const PERSONAL = {
  name: "Bhavya Saini",
  firstName: "Bhavya",
  lastName: "Saini",
  role: "Backend Developer & AI Systems Engineer",
  tagline: "I architect backends. I teach them to think.",
  description:
    "Building intelligent systems where Java meets AI — REST APIs, LLM pipelines, RAG architectures, and multi-agent systems. Open to backend & AI engineering internships.",

  // TODO: Fill in your university details
  university: "TODO: Your University Name",
  degree: "TODO: B.Tech Computer Science",
  graduationYear: "TODO: May 2026",

  // TODO: Fill in your contact details
  email: "TODO: your@email.com",
  githubUsername: "TODO: your-github-username",
  githubUrl: "https://github.com/TODO-your-github-username",
  linkedinUrl: "https://linkedin.com/in/TODO-your-linkedin",
  leetcodeUrl: "https://leetcode.com/TODO-your-leetcode",
  hackerrankUrl: "https://hackerrank.com/TODO-your-hackerrank",

  // TODO: Fill in your availability
  availableFrom: "TODO: June 2025",
  lookingFor: "Backend Intern / AI Engineering Intern",
  location: "India",
  openToRemote: true,
};

export const STATS = {
  // TODO: Fill in your real numbers
  projects: 6,
  leetcodeProblems: 250, // TODO: your real count
  githubCommits: 500,    // TODO: your real count (approx)
  openSourcePRs: 5,      // TODO: your real count
  githubRepos: 15,       // TODO: your real count
  hackerrankStars: 5,    // TODO
};

export const PROJECTS = [
  {
    id: "project-1",
    name: "TODO: Project Name 1",
    tagline: "TODO: One powerful sentence describing what this does.",
    description:
      "TODO: First sentence about the problem you solved. Second sentence about the technical approach. Third sentence about key features or AI integration. Fourth sentence about impact or scale.",
    tech: ["Java", "Spring Boot", "LangChain4j", "ChromaDB", "Docker"],
    category: "AI / LLM" as const,
    github: "https://github.com/TODO-your-username/TODO-project-1",
    live: "N/A",
    featured: true,
    achievement: "TODO: Key stat — e.g. 85% retrieval accuracy on 10k doc corpus",
    built: "TODO: Jan 2025",
    miniSceneColor: "#F5A623",
  },
  {
    id: "project-2",
    name: "TODO: Project Name 2",
    tagline: "TODO: One powerful sentence.",
    description:
      "TODO: Full description in 3–4 sentences.",
    tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    category: "Backend" as const,
    github: "https://github.com/TODO-your-username/TODO-project-2",
    live: "N/A",
    featured: false,
    achievement: "TODO: Key achievement or stat",
    built: "TODO: Nov 2024",
    miniSceneColor: "#9D00FF",
  },
  {
    id: "project-3",
    name: "TODO: Project Name 3",
    tagline: "TODO: One powerful sentence.",
    description:
      "TODO: Full description in 3–4 sentences.",
    tech: ["Python", "OpenAI API", "Docker", "GCP"],
    category: "AI / LLM" as const,
    github: "https://github.com/TODO-your-username/TODO-project-3",
    live: "N/A",
    featured: false,
    achievement: "TODO: Key achievement",
    built: "TODO: Sep 2024",
    miniSceneColor: "#FF2D78",
  },
  {
    id: "project-4",
    name: "TODO: Project Name 4",
    tagline: "TODO: One powerful sentence.",
    description:
      "TODO: Full description in 3–4 sentences.",
    tech: ["Java", "JavaParser", "AST", "Maven"],
    category: "Tool" as const,
    github: "https://github.com/TODO-your-username/TODO-project-4",
    live: "N/A",
    featured: false,
    achievement: "TODO: Key achievement",
    built: "TODO: Jul 2024",
    miniSceneColor: "#F5A623",
  },
  {
    id: "project-5",
    name: "TODO: Project Name 5",
    tagline: "TODO: One powerful sentence.",
    description:
      "TODO: Full description in 3–4 sentences.",
    tech: ["Spring Boot", "PostgreSQL", "Docker", "AWS"],
    category: "Backend" as const,
    github: "https://github.com/TODO-your-username/TODO-project-5",
    live: "N/A",
    featured: false,
    achievement: "TODO: Key achievement",
    built: "TODO: May 2024",
    miniSceneColor: "#9D00FF",
  },
  {
    id: "project-6",
    name: "TODO: Project Name 6",
    tagline: "TODO: One powerful sentence.",
    description:
      "TODO: Full description in 3–4 sentences.",
    tech: ["Java", "HttpClient", "REST APIs", "JSON"],
    category: "API" as const,
    github: "https://github.com/TODO-your-username/TODO-project-6",
    live: "N/A",
    featured: false,
    achievement: "TODO: Key achievement",
    built: "TODO: Mar 2024",
    miniSceneColor: "#FF2D78",
  },
];

export const PROJECT_CATEGORIES = ["All", "AI / LLM", "Backend", "Tool", "API"] as const;

export const SKILLS = {
  "Core Languages": ["Java", "C", "C++", "Python", "JavaScript", "HTML/CSS"],
  "Backend & Frameworks": [
    "Spring Boot",
    "Maven",
    "REST APIs",
    "Java HttpClient",
    "JavaParser (AST)",
    "Docker",
    "Kubernetes",
  ],
  "AI & LLM Engineering": [
    "LangChain4j",
    "OpenAI API",
    "Prompt Engineering",
    "RAG",
    "Vector Embeddings",
    "MCP",
    "Multi-Pipeline AI Systems",
  ],
  "Cloud & Databases": [
    "Google Cloud Platform",
    "Vertex AI",
    "AWS",
    "MySQL",
    "PostgreSQL",
    "ChromaDB",
  ],
  "Tools & Workflow": ["Git", "GitHub", "Docker", "Maven", "IntelliJ IDEA", "VS Code"],
  Concepts: ["DSA", "OOP", "System Design", "Multi-Agent Systems", "AST Parsing"],
};

export const SKILLS_FLAT = Object.values(SKILLS).flat();

export const MARQUEE_SKILLS = [
  "Java",
  "Spring Boot",
  "LangChain4j",
  "Docker",
  "GCP",
  "ChromaDB",
  "RAG Pipelines",
  "OpenAI API",
  "REST APIs",
  "Vertex AI",
  "Multi-Agent AI",
  "PostgreSQL",
  "Kubernetes",
  "AST Parsing",
  "LLM Integration",
  "System Design",
];

export const INTERESTS = [
  "System Design",
  "Distributed Systems",
  "LLM Applications",
  "DSA",
  "Open Source",
  "Compiler Design",
  "Cloud Architecture",
];

export const CURRENTLY = [
  {
    icon: "🎓",
    text: `Studying ${PERSONAL.degree} at ${PERSONAL.university} (Expected ${PERSONAL.graduationYear})`,
  },
  {
    icon: "⚙️",
    text: "Building AI-powered backend systems with LangChain4j and multi-agent architectures",
  },
  {
    icon: "💡",
    text: "Solving DSA daily + contributing to open source projects",
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
- Backend developer & AI systems engineer, CS student from India
- University: ${PERSONAL.university}, ${PERSONAL.degree}, graduating ${PERSONAL.graduationYear}
- Core stack: Java, Spring Boot, LangChain4j, Docker, GCP, ChromaDB, MySQL
- Specialties: RAG pipelines, multi-agent AI systems, REST APIs, LLM integration, MCP protocols
- Active on LeetCode (${STATS.leetcodeProblems}+ problems solved) and HackerRank
- Open source contributor on GitHub (@${PERSONAL.githubUsername})
- Seeking: Backend Intern or AI Engineering Intern
- Available: ${PERSONAL.availableFrom}
- Location: ${PERSONAL.location} (open to remote or on-site globally)

Projects:
${PROJECTS.map(p => `- ${p.name}: ${p.tagline}`).join('\n')}

Links:
- GitHub: ${PERSONAL.githubUrl}
- LinkedIn: ${PERSONAL.linkedinUrl}
- Email: ${PERSONAL.email}

Answer in 2–4 sentences. Be specific and impressive. Focus on technical depth and genuine capability.
If asked something not listed here, say so briefly and redirect to the resume or contact form. Never fabricate facts.`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open Source" },
  { href: "/resume", label: "Resume" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: PERSONAL.githubUrl, icon: "github" },
  { label: "LinkedIn", href: PERSONAL.linkedinUrl, icon: "linkedin" },
  { label: "LeetCode", href: PERSONAL.leetcodeUrl, icon: "leetcode" },
  { label: "HackerRank", href: PERSONAL.hackerrankUrl, icon: "hackerrank" },
  { label: "Email", href: `mailto:${PERSONAL.email}`, icon: "email" },
];
