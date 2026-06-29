'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Server, Cloud, Database, Code2, 
  ArrowRight, Download, ExternalLink,
  GitBranch, Container, LineChart, Globe, Network, Activity
} from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const STATS = [
  { value: '5+', label: 'AI Projects Built' },
  { value: '200+', label: 'DSA Problems Solved' },
  { value: '10+', label: 'Certifications' },
  { value: '8.4', label: 'GPA / 10.0' },
];

const TECHNOLOGIES = [
  { name: 'Java', category: 'Primary Language', icon: CoffeeIcon },
  { name: 'LangChain4j', category: 'AI / LLM Framework', icon: Network },
  { name: 'Docker', category: 'Containerization', icon: Container },
  { name: 'MCP SDK', category: 'AI Tool Protocol', icon: Server },
  { name: 'Google Cloud', category: 'Cloud Platform', icon: Cloud },
  { name: 'ChromaDB', category: 'Vector Database', icon: Database },
  { name: 'Python', category: 'AI Scripting', icon: Code2 },
  { name: 'Git', category: 'Version Control', icon: GitBranch },
];

const FEATURED_PROJECTS = [
  {
    title: 'AI-Powered Java Code Review System',
    desc: '3-stage JavaParser AST engine + 3 parallel AI pipelines (Bug Detection, Security Scanning, Quality Scoring) via LangChain4j, producing a 0–100 review score.',
    tags: ['Java', 'LangChain4j', 'JavaParser', 'ChromaDB', 'OpenAI API'],
    icon: Activity,
  },
  {
    title: 'Java MCP Server — AI Tool Platform',
    desc: 'Production-compatible MCP server exposing 4 agentic tools — GitHub Analyzer, Safe SQL Executor, Semantic Doc Searcher, Dockerized Code Sandbox — for Claude & ChatGPT.',
    tags: ['Java', 'MCP SDK', 'Docker', 'MySQL', 'GitHub API'],
    icon: Server,
  },
];

const LEARNING_ROADMAP = [
  { title: 'AI Development', progress: 40, category: 'Core Focus' },
  { title: 'AI Pipeline Evaluation', progress: 38, category: 'AI Systems' },
  { title: 'LangChain4j / RAG', progress: 50, category: 'LLM Engineering' },
  { title: 'Docker & Containers', progress: 70, category: 'DevOps' },
  { title: 'Google Cloud', progress: 85, category: 'Cloud' },
  { title: 'System Design', progress: 30, category: 'Architecture' },
];

// Fallback for Java icon
function CoffeeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="9" x2="9" y1="2" y2="4" />
      <line x1="13" x2="13" y1="2" y2="4" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-[#0F172A] selection:bg-blue-500/30 selection:text-white text-slate-200">
      
      {/* Background Lighting & Depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
        {/* Soft Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] rounded-full bg-sky-500/10 blur-[150px]" />
      </div>

      {/* Main Content Container (Expanded width to balance empty space) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col gap-24 md:gap-32">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
          {/* Left: Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:pr-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/80 border border-slate-700/50 backdrop-blur-sm text-blue-400 text-sm font-medium w-fit shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Activity size={14} className="animate-pulse text-purple-400" />
              <span>AI Systems • Backend • Java</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15]">
              I Build AI Systems.<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 animate-gradient"> Then Validate Them.</span><br />
              <span className="text-4xl md:text-5xl text-slate-300 font-bold mt-2 block">Trustworthy Software, By Design.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#CBD5E1] max-w-xl leading-relaxed">
              Fourth-year CS student. Hands-on with LangChain4j, MCP servers, RAG pipelines, and AI pipeline evaluation. Building impactful AI tools.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                href="/projects"
                className="group relative flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold overflow-hidden transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a 
                href="/resume.pdf"
                className="group flex items-center gap-2 px-8 py-4 bg-[#1E293B] hover:bg-[#334155] border border-slate-700 text-white rounded-lg font-medium transition-all hover:-translate-y-0.5"
              >
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: Architectural Visual Ecosystem — CSS Grid for guaranteed symmetry */}
          <div className="relative hidden lg:block w-full max-w-[520px] mx-auto select-none aspect-square">

            {/* 3×3 grid: corners = nodes, center = Core API */}
            <div className="relative w-full h-full grid grid-cols-3 grid-rows-3">

              {/* ── SVG lines — viewBox matches the 3×3 grid cell centres ── */}
              <svg
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                viewBox="0 0 3 3"
                preserveAspectRatio="none"
                style={{ filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.5))' }}
              >
                {/* Client (0.5,0.5) → Core API (1.5,1.5) */}
                <motion.line x1="0.5" y1="0.5" x2="1.5" y2="1.5"
                  stroke="#3B82F6" strokeWidth="0.05" strokeDasharray="0.15 0.15"
                  initial={{ strokeDashoffset: 0.6 }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  opacity={0.6}
                />
                {/* Infra (2.5,0.5) → Core API (1.5,1.5) */}
                <motion.line x1="2.5" y1="0.5" x2="1.5" y2="1.5"
                  stroke="#A855F7" strokeWidth="0.05" strokeDasharray="0.15 0.15"
                  initial={{ strokeDashoffset: -0.6 }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  opacity={0.6}
                />
                {/* Core API (1.5,1.5) → Database (0.5,2.5) */}
                <motion.line x1="1.5" y1="1.5" x2="0.5" y2="2.5"
                  stroke="#3B82F6" strokeWidth="0.05" strokeDasharray="0.15 0.15"
                  initial={{ strokeDashoffset: 0.6 }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  opacity={0.6}
                />
                {/* Core API (1.5,1.5) → Cloud (2.5,2.5) */}
                <motion.line x1="1.5" y1="1.5" x2="2.5" y2="2.5"
                  stroke="#A855F7" strokeWidth="0.05" strokeDasharray="0.15 0.15"
                  initial={{ strokeDashoffset: -0.6 }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  opacity={0.6}
                />
              </svg>

              {/* ── Row 1 ── */}
              {/* Client — top-left */}
              <div className="flex items-center justify-center z-10">
                <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#111827] border-2 border-blue-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                    <Code2 className="text-blue-400" size={28} />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-[#111827]/80 px-2 py-0.5 rounded backdrop-blur-sm">Client</span>
                </motion.div>
              </div>

              {/* top-center — empty */}
              <div />

              {/* Infra — top-right */}
              <div className="flex items-center justify-center z-10">
                <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#111827] border-2 border-purple-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                    <Container className="text-purple-400" size={28} />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-[#111827]/80 px-2 py-0.5 rounded backdrop-blur-sm">Infra</span>
                </motion.div>
              </div>

              {/* ── Row 2 ── */}
              {/* mid-left — empty */}
              <div />

              {/* Core API — dead centre */}
              <div className="flex items-center justify-center z-10">
                <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center">
                  <div className="relative w-24 h-24 bg-[#111827] border-2 border-blue-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-3xl animate-pulse" />
                    <Server className="text-blue-400 z-10" size={40} />
                  </div>
                  <span className="mt-3 text-sm font-bold text-white uppercase tracking-widest bg-[#111827]/80 px-3 py-1 rounded backdrop-blur-sm border border-slate-700/50">Core API</span>
                </motion.div>
              </div>

              {/* mid-right — empty */}
              <div />

              {/* ── Row 3 ── */}
              {/* Database — bottom-left */}
              <div className="flex items-center justify-center z-10">
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#111827] border-2 border-blue-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                    <Database className="text-blue-400" size={28} />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-[#111827]/80 px-2 py-0.5 rounded backdrop-blur-sm">Database</span>
                </motion.div>
              </div>

              {/* bottom-center — empty */}
              <div />

              {/* Cloud — bottom-right */}
              <div className="flex items-center justify-center z-10">
                <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#111827] border-2 border-purple-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                    <Cloud className="text-purple-400" size={28} />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-[#111827]/80 px-2 py-0.5 rounded backdrop-blur-sm">Cloud</span>
                </motion.div>
              </div>

            </div>
          </div>
        </section>


        {/* --- 2. METRICS SECTION --- */}
        <section className="py-12 border-y border-slate-800/80 bg-[#111827]/30 backdrop-blur-sm rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-slate-800/80">
            {STATS.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-semibold text-[#CBD5E1] uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 3. TECHNOLOGIES I WORK WITH --- */}
        <section className="py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Core Arsenal</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">The foundational tools and frameworks I use to engineer AI systems and validate their behaviour under real-world conditions.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNOLOGIES.map((tech, i) => (
              <motion.div 
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative flex items-center gap-4 p-5 bg-[#111827] border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-[#1E293B] transition-all cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center w-12 h-12 bg-[#0F172A] border border-slate-700/50 rounded-xl group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all relative z-10">
                  <tech.icon className="text-slate-300 group-hover:text-blue-400 transition-colors" size={24} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-[#F8FAFC] font-semibold text-base">{tech.name}</h3>
                  <p className="text-[#CBD5E1] text-xs font-medium">{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 4. FEATURED PROJECTS PREVIEW --- */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Featured Work</h2>
              <p className="text-slate-400 max-w-xl">Real AI-powered projects — from code review engines and MCP servers to content analytics platforms.</p>
            </div>
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111827] border border-slate-800 hover:border-blue-500/50 hover:bg-[#1E293B] text-white rounded-lg font-medium transition-all w-fit whitespace-nowrap"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#0F172A] border border-slate-700 rounded-2xl flex items-center justify-center shadow-inner">
                    <project.icon className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                </div>
                
                <p className="text-[#CBD5E1] text-base leading-relaxed mb-8 flex-grow">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-[#0F172A] text-slate-300 text-xs font-semibold border border-slate-800/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-800/50">
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    <Github size={16} /> Source Code
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors ml-auto">
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 5. CURRENTLY LEARNING ROADMAP --- */}
        <section className="py-12 mb-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Continuous Learning</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Technology evolves rapidly. Here is my current learning roadmap as I deepen my expertise in AI systems, cloud, and quality engineering.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNING_ROADMAP.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111827] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors"
              >
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">{item.category}</div>
                    <div className="text-lg font-bold text-[#F8FAFC]">{item.title}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-400">{item.progress}%</div>
                </div>
                
                {/* Progress Bar Container */}
                <div className="w-full h-2 bg-[#0F172A] rounded-full overflow-hidden border border-slate-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 + 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
