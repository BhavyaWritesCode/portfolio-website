'use client';

import { motion } from 'framer-motion';
import { PERSONAL } from '@/lib/constants';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">{title}</h2>
        <div className="flex-1 h-px bg-slate-800" />
      </div>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium">
      {children}
    </span>
  );
}

export default function ResumePage() {
  const downloadPdf = () => {
    window.open('/Bhavya_Saini_Resume.pdf', '_blank');
  };

  return (
    <div className="min-h-screen w-full pt-24 pb-20 px-6">
      {/* Subtle background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-[860px] mx-auto">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight mb-2">
              {PERSONAL.name}
            </h1>
            <p className="text-blue-400 font-semibold text-base mb-4">
              Backend Engineer &nbsp;·&nbsp; AI Systems Builder
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              <a href={`mailto:${PERSONAL.email}`} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <FiMail size={13} /> {PERSONAL.email}
              </a>
              <span className="flex items-center gap-1.5">
                <FiMapPin size={13} /> Bangalore, India
              </span>
              <a href={PERSONAL.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <FiLinkedin size={13} /> linkedin.com/in/bhavya-saini-568a29303
              </a>
              <a href={PERSONAL.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <FiGithub size={13} /> github.com/BhavyaWritesCode
              </a>
              <a href={PERSONAL.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <SiLeetcode size={13} /> leetcode.com/u/bhavyasaini06
              </a>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-semibold hover:bg-blue-500/20 hover:border-blue-400 transition-all whitespace-nowrap"
          >
            <FiDownload size={15} />
            Download Resume
          </motion.button>
        </motion.div>

        {/* ── Summary ── */}
        <motion.div {...fadeUp(0.05)}>
          <Section title="Summary">
            <p className="text-slate-300 leading-relaxed text-sm">
              Fourth-year Computer Science student with hands-on experience building AI-powered systems and validating their behaviour under
              real-world conditions. Strong foundation in software testing, defect analysis, and evaluating non-deterministic AI outputs for accuracy and
              reliability. Seeking a <span className="text-blue-400 font-semibold">QA/SDET internship</span> to help ship trustworthy AI-driven products.
            </p>
          </Section>
        </motion.div>

        {/* ── Education ── */}
        <motion.div {...fadeUp(0.1)}>
          <Section title="Education">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">B.E. — Computer Science Engineering</h3>
                  <p className="text-slate-400 text-sm">New Horizon College Of Engineering &nbsp;·&nbsp; Bengaluru, Karnataka</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-400 text-xs">Expected 2027</span>
                  <p className="text-blue-400 text-xs font-semibold">GPA: 8.4 / 10.0</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">High School Diploma</h3>
                  <p className="text-slate-400 text-sm">Mount Litera Zee School &nbsp;·&nbsp; Amritsar, Punjab</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-400 text-xs">2023</span>
                  <p className="text-blue-400 text-xs font-semibold">72%</p>
                </div>
              </div>
            </div>
          </Section>
        </motion.div>

        {/* ── Skills ── */}
        <motion.div {...fadeUp(0.15)}>
          <Section title="Skills">
            <div className="space-y-3">
              {[
                { label: 'Languages', items: ['Java', 'C/C++', 'Python', 'HTML+CSS', 'JavaScript'] },
                { label: 'AI & LLM', items: ['LangChain4j', 'OpenAI API', 'Prompt Engineering', 'RAG', 'Vector Embeddings', 'MCP'] },
                { label: 'Frameworks & Tools', items: ['JavaParser (AST)', 'Maven', 'Docker', 'REST APIs (Java HttpClient)', 'Git', 'GitHub'] },
                { label: 'Cloud / Databases', items: ['Google Cloud', 'Vertex AI (Generative AI path)', 'MySQL', 'ChromaDB'] },
                { label: 'Concepts', items: ['Data Structures & Algorithms', 'OOP', 'Multi-Pipeline AI Systems'] },
                { label: 'Soft Skills', items: ['Teamwork', 'Problem Solving', 'Self-Learning', 'Adaptability'] },
              ].map(({ label, items }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider w-36 shrink-0 pt-0.5">{label}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(item => <Tag key={item}>{item}</Tag>)}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </motion.div>

        {/* ── Projects ── */}
        <motion.div {...fadeUp(0.2)}>
          <Section title="Relevant Projects">
            <div className="space-y-8">

              {/* Project 1 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">AI-Powered Java Code Review System</h3>
                  <span className="text-slate-500 text-xs">Java · LangChain4j · JavaParser · ChromaDB · MySQL</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Designed and validated a 3-stage JavaParser AST analysis engine, defining test cases across cyclomatic complexity, naming violations, and structural metrics to verify detection accuracy per file.',
                    'Built an evaluation framework for 3 parallel AI pipelines (Bug Detection, Security Scanning, Code Quality Scoring) via LangChain4j + OpenAI API, testing for output consistency, false positives, and hallucinated issues across repeated runs, consolidating results into a 0–100 review score.',
                    'Developed a Refactoring Suggestion Engine and validated generated fixes for correctness, regression risk, and explanation clarity, reducing repeat-error submissions in developer self-testing.',
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="text-blue-500 shrink-0 mt-1">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">Java MCP Server — AI Tool Integration Platform</h3>
                  <span className="text-slate-500 text-xs">Java · MCP SDK · Docker · ChromaDB · MySQL · GitHub API</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Built a production-compatible Model Context Protocol (MCP) server in Java exposing 4 agentic tools — GitHub Repo Analyzer, Safe SQL Executor, Semantic Doc Searcher, and a Dockerized Code Sandbox — enabling any MCP-compatible AI client (Claude, ChatGPT) to interact with live external data sources.',
                    'Engineered a SQL validation guardrail that parses and blocks all destructive queries (DROP, DELETE, UPDATE) before execution, and a Docker-isolated Java sandbox with configurable timeout and memory limits for safe AI-driven code execution.',
                    'Logged every tool invocation with input, output, latency, and session metadata to MySQL, providing full observability and usage analytics across all AI client sessions.',
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="text-blue-500 shrink-0 mt-1">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project 3 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">SmartScribe Analytics Engine</h3>
                  <span className="text-slate-500 text-xs">Python · Groq Llama · Streamlit · REST APIs</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Built an AI-powered content intelligence platform that automates the full content lifecycle — analysis, improvement, structuring, and publishing — using Python, Groq\'s Llama 3.1 70B, and Streamlit.',
                    'Implemented a DITA XML generator that converts unstructured text into industry-standard topic types (task, concept, reference), directly mirroring enterprise documentation systems used at companies like Infineon.',
                    'Built a content analytics engine using Textstat to measure readability, sentence complexity, passive voice, and structural clarity.',
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="text-blue-500 shrink-0 mt-1">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project 4 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-[#F8FAFC] font-semibold text-sm">Caravan App Project</h3>
                  <span className="text-slate-500 text-xs">Java · DSA · OOP</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Designed and implemented a custom sorting algorithm based on comparative analysis, utilizing data structures such as arrays, linked lists, and trees to optimize vehicle utilization incorporating factors such as car size, animal type, and passenger capacity.',
                    'Developed a vehicle dispatch system using Java, utilizing object-oriented programming principles and advanced data structures such as heaps and queues to route vehicles.',
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="text-blue-500 shrink-0 mt-1">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </Section>
        </motion.div>

        {/* ── Certifications ── */}
        <motion.div {...fadeUp(0.25)}>
          <Section title="Certifications">
            <div className="space-y-2.5">
              {[
                { name: 'SAP Certified — SAP Generative AI Developer', issuer: 'SAP' },
                { name: 'Google Arcade Legend', issuer: 'Google Cloud' },
                { name: 'LangChain for LLM Application Development', issuer: 'DeepLearning.ai' },
              ].map(({ name, issuer }) => (
                <div key={name} className="flex items-center justify-between gap-4 py-2.5 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-300 text-sm font-medium">{name}</span>
                  <span className="text-blue-400 text-xs font-semibold shrink-0">{issuer}</span>
                </div>
              ))}
            </div>
          </Section>
        </motion.div>

        {/* ── Extra-Curricular ── */}
        <motion.div {...fadeUp(0.3)}>
          <Section title="Extra-Curricular Activities">
            <div className="space-y-3">
              {[
                { role: 'Student Ambassador', org: 'CDC, New Horizon College of Engineering', period: '2025 – Present' },
                { role: 'Board Member', org: 'Tech Forge Club, New Horizon College of Engineering', period: '2024 – 2025' },
              ].map(({ role, org, period }) => (
                <div key={role} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <span className="text-[#F8FAFC] text-sm font-semibold">{role}</span>
                    <span className="text-slate-400 text-sm"> — {org}</span>
                  </div>
                  <span className="text-slate-500 text-xs shrink-0">{period}</span>
                </div>
              ))}
            </div>
          </Section>
        </motion.div>

        {/* Bottom note */}
        <motion.p {...fadeUp(0.35)} className="text-center text-xs text-slate-600 mt-4">
          Continuous Learning · Continuous Building
        </motion.p>

      </div>
    </div>
  );
}
