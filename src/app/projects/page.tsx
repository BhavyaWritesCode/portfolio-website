'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS_DATA = [
  {
    id: "project-1",
    name: "AI-Powered Java Code Review System",
    category: "AI/LLM",
    description: "Designed and validated a 3-stage JavaParser AST analysis engine, defining test cases across cyclomatic complexity, naming violations, and structural metrics. Built an evaluation framework for 3 parallel AI pipelines (Bug Detection, Security Scanning, Code Quality Scoring) via LangChain4j + OpenAI API, consolidating results into a 0–100 review score. Developed a Refactoring Suggestion Engine that validates generated fixes for correctness, regression risk, and explanation clarity.",
    tech: ["Java", "LangChain4j", "JavaParser", "ChromaDB", "MySQL", "OpenAI API"],
    metrics: ["3 parallel AI pipelines", "0–100 quality score", "AST-level analysis"],
    github: "https://github.com/BhavyaWritesCode",
    featured: true
  },
  {
    id: "project-2",
    name: "Java MCP Server — AI Tool Integration Platform",
    category: "Backend",
    description: "Built a production-compatible Model Context Protocol (MCP) server in Java exposing 4 agentic tools — GitHub Repo Analyzer, Safe SQL Executor, Semantic Doc Searcher, and a Dockerized Code Sandbox — enabling Claude and ChatGPT to interact with live external data sources. Engineered a SQL validation guardrail that blocks all destructive queries before execution. Logged every tool invocation with input, output, latency, and session metadata to MySQL for full observability.",
    tech: ["Java", "MCP SDK", "Docker", "ChromaDB", "MySQL", "GitHub API"],
    metrics: ["4 agentic tools", "SQL guardrails", "Full observability"],
    github: "https://github.com/BhavyaWritesCode",
    featured: false
  },
  {
    id: "project-3",
    name: "SmartScribe Analytics Engine",
    category: "Content/AI",
    description: "Built an AI-powered content intelligence platform that automates the full content lifecycle — analysis, improvement, structuring, and publishing — using Python, Groq's Llama 3.1 70B, and Streamlit. Implemented a DITA XML generator that converts unstructured text into industry-standard topic types, mirroring enterprise documentation systems used at Infineon. Built a content analytics engine using Textstat to measure readability, sentence complexity, passive voice, and structural clarity.",
    tech: ["Python", "Groq Llama 3.1", "Streamlit", "Textstat", "DITA XML"],
    metrics: ["DITA XML output", "Readability analytics", "Groq Llama 3.1 70B"],
    github: "https://github.com/BhavyaWritesCode",
    featured: false
  },
  {
    id: "project-4",
    name: "Caravan App Project",
    category: "Tool",
    description: "Designed and implemented a custom sorting algorithm based on comparative analysis, utilizing data structures such as arrays, linked lists, and trees to optimize vehicle utilization incorporating factors such as car size, animal type, and passenger capacity. Developed a vehicle dispatch system using Java, utilizing OOP principles and advanced data structures such as heaps and queues to efficiently route vehicles.",
    tech: ["Java", "DSA", "OOP", "Heaps", "Queues", "Linked Lists"],
    metrics: ["Custom sort algorithm", "Heap-based dispatch", "DSA mastery"],
    github: "https://github.com/BhavyaWritesCode",
    featured: false
  }
];

function SystemDiagram({ category }: { category: string }) {
  if (category === 'Backend') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* MCP Client */}
        <rect x="30" y="80" width="60" height="40" rx="4" fill="rgba(59,130,246,0.1)" stroke="var(--pulse)" strokeWidth="2" />
        <text x="60" y="104" fill="var(--pulse)" fontSize="9" textAnchor="middle" fontFamily="monospace">Client</text>
        {/* MCP Server */}
        <rect x="160" y="70" width="80" height="60" rx="4" fill="var(--deep-space)" stroke="var(--dust)" strokeWidth="2" />
        <text x="200" y="104" fill="var(--dust)" fontSize="9" textAnchor="middle" fontFamily="monospace">MCP Server</text>
        {/* Tools */}
        <rect x="310" y="40" width="70" height="25" rx="4" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <text x="345" y="57" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">GitHub API</text>
        <rect x="310" y="75" width="70" height="25" rx="4" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <text x="345" y="92" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">SQL Guard</text>
        <rect x="310" y="110" width="70" height="25" rx="4" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <text x="345" y="127" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">Docker</text>
        {/* Lines */}
        <path d="M90 100 L160 100" stroke="var(--pulse)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_2s_linear_infinite]" />
        <path d="M240 80 L310 53" stroke="var(--dust)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dashFlow_2s_linear_infinite]" />
        <path d="M240 100 L310 88" stroke="var(--dust)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dashFlow_2s_linear_infinite]" />
        <path d="M240 120 L310 123" stroke="var(--dust)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dashFlow_2s_linear_infinite]" />
      </svg>
    );
  } else if (category === 'AI/LLM') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pipeline stages */}
        <rect x="30" y="75" width="70" height="50" rx="6" fill="rgba(59,130,246,0.1)" stroke="var(--pulse)" strokeWidth="2" />
        <text x="65" y="100" fill="var(--pulse)" fontSize="8" textAnchor="middle" fontFamily="monospace">AST</text>
        <text x="65" y="112" fill="var(--pulse)" fontSize="8" textAnchor="middle" fontFamily="monospace">Parser</text>
        <rect x="160" y="55" width="80" height="30" rx="4" fill="var(--deep-space)" stroke="var(--comet)" strokeWidth="1.5" />
        <text x="200" y="75" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">Bug Detect</text>
        <rect x="160" y="95" width="80" height="30" rx="4" fill="var(--deep-space)" stroke="var(--comet)" strokeWidth="1.5" />
        <text x="200" y="115" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">Security</text>
        <rect x="160" y="135" width="80" height="30" rx="4" fill="var(--deep-space)" stroke="var(--comet)" strokeWidth="1.5" />
        <text x="200" y="155" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">Quality</text>
        <rect x="305" y="80" width="65" height="40" rx="6" fill="rgba(196,145,58,0.15)" stroke="var(--dust)" strokeWidth="2" />
        <text x="337" y="100" fill="var(--dust)" fontSize="8" textAnchor="middle" fontFamily="monospace">Score</text>
        <text x="337" y="113" fill="var(--dust)" fontSize="8" textAnchor="middle" fontFamily="monospace">0-100</text>
        {/* Connecting lines */}
        <path d="M100 100 L160 70" stroke="var(--pulse)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1.5s_linear_infinite]" />
        <path d="M100 100 L160 110" stroke="var(--pulse)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1.5s_linear_infinite]" />
        <path d="M100 100 L160 150" stroke="var(--pulse)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1.5s_linear_infinite]" />
        <path d="M240 70 L305 95" stroke="var(--dust)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1s_linear_infinite]" />
        <path d="M240 110 L305 100" stroke="var(--dust)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1s_linear_infinite]" />
        <path d="M240 150 L305 105" stroke="var(--dust)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1s_linear_infinite]" />
      </svg>
    );
  } else if (category === 'Content/AI') {
    // SmartScribe: linear content pipeline
    return (
      <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Step 1: Text In */}
        <rect x="10" y="80" width="65" height="40" rx="6" fill="rgba(59,130,246,0.1)" stroke="var(--pulse)" strokeWidth="2" />
        <text x="42" y="98" fill="var(--pulse)" fontSize="8" textAnchor="middle" fontFamily="monospace">Text</text>
        <text x="42" y="110" fill="var(--pulse)" fontSize="8" textAnchor="middle" fontFamily="monospace">Input</text>
        {/* Arrow 1 */}
        <path d="M75 100 L105 100" stroke="var(--comet)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1.5s_linear_infinite]" />
        {/* Step 2: Groq LLM */}
        <rect x="105" y="70" width="75" height="60" rx="6" fill="var(--deep-space)" stroke="var(--dust)" strokeWidth="2" />
        <text x="142" y="97" fill="var(--dust)" fontSize="8" textAnchor="middle" fontFamily="monospace">Groq</text>
        <text x="142" y="109" fill="var(--dust)" fontSize="8" textAnchor="middle" fontFamily="monospace">Llama 3.1</text>
        <text x="142" y="121" fill="var(--dust)" fontSize="7" textAnchor="middle" fontFamily="monospace">70B</text>
        {/* Arrow 2 */}
        <path d="M180 100 L210 100" stroke="var(--comet)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1.5s_linear_infinite]" />
        {/* Step 3: DITA XML */}
        <rect x="210" y="75" width="70" height="50" rx="6" fill="var(--deep-space)" stroke="var(--comet)" strokeWidth="1.5" />
        <text x="245" y="99" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">DITA</text>
        <text x="245" y="111" fill="var(--comet)" fontSize="8" textAnchor="middle" fontFamily="monospace">XML</text>
        {/* Arrow 3 */}
        <path d="M280 100 L310 100" stroke="var(--comet)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dashFlow_1.5s_linear_infinite]" />
        {/* Step 4: Analytics Out */}
        <rect x="310" y="75" width="75" height="50" rx="6" fill="rgba(196,145,58,0.12)" stroke="var(--dust)" strokeWidth="2" />
        <text x="347" y="97" fill="var(--dust)" fontSize="8" textAnchor="middle" fontFamily="monospace">Read-</text>
        <text x="347" y="109" fill="var(--dust)" fontSize="8" textAnchor="middle" fontFamily="monospace">ability</text>
        <text x="347" y="121" fill="var(--dust)" fontSize="7" textAnchor="middle" fontFamily="monospace">Score</text>
        {/* Score bar visual */}
        <rect x="315" y="140" width="65" height="6" rx="3" fill="var(--horizon)" />
        <rect x="315" y="140" width="48" height="6" rx="3" fill="var(--dust)" className="animate-pulse" />
      </svg>
    );
  } else {
    // Tool / DSA
    return (
      <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Heap visualization */}
        <circle cx="200" cy="50" r="22" fill="rgba(59,130,246,0.1)" stroke="var(--pulse)" strokeWidth="2" />
        <text x="200" y="55" fill="var(--pulse)" fontSize="11" textAnchor="middle" fontFamily="monospace">root</text>
        <circle cx="130" cy="110" r="18" fill="var(--deep-space)" stroke="var(--comet)" strokeWidth="1.5" />
        <text x="130" y="115" fill="var(--comet)" fontSize="10" textAnchor="middle" fontFamily="monospace">L</text>
        <circle cx="270" cy="110" r="18" fill="var(--deep-space)" stroke="var(--comet)" strokeWidth="1.5" />
        <text x="270" y="115" fill="var(--comet)" fontSize="10" textAnchor="middle" fontFamily="monospace">R</text>
        <circle cx="90" cy="165" r="14" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <circle cx="165" cy="165" r="14" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <circle cx="235" cy="165" r="14" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <circle cx="310" cy="165" r="14" fill="var(--deep-space)" stroke="var(--horizon)" strokeWidth="1.5" />
        <path d="M183 67 L144 93" stroke="var(--pulse)" strokeWidth="1.5" />
        <path d="M217 67 L256 93" stroke="var(--pulse)" strokeWidth="1.5" />
        <path d="M114 126 L100 152" stroke="var(--comet)" strokeWidth="1.5" />
        <path d="M143 126 L157 152" stroke="var(--comet)" strokeWidth="1.5" />
        <path d="M254 126 L246 152" stroke="var(--comet)" strokeWidth="1.5" />
        <path d="M283 126 L298 152" stroke="var(--comet)" strokeWidth="1.5" />
      </svg>
    );
  }
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'AI/LLM', 'Backend', 'Content/AI', 'Tool'];
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = PROJECTS_DATA.filter(p => filter === 'All' || p.category === filter);

  useGSAP(() => {
    // Header sequence
    gsap.fromTo('.gsap-proj-header > *', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' }
    );

    // Initial stagger for project cards via GSAP
    // Note: Framer motion handles the layout filtering, but we use GSAP to pop them in initially.
    gsap.fromTo('.gsap-proj-card',
      { opacity: 0, scale: 0.95, y: 40 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.gsap-proj-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col pt-32 pb-24 px-6 relative z-10">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="gsap-proj-header flex flex-col gap-3">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--dust)' }}>// PROJECTS</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--star)', lineHeight: 1.1 }}>
            What I've Launched Into Orbit
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--comet)', marginTop: '8px' }}>
            Selected work across backend systems, cloud infrastructure, and AI engineering.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="gsap-proj-header flex flex-wrap items-center gap-3">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.85rem',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: filter === f ? '1px solid var(--dust)' : '1px solid var(--horizon)',
                background: filter === f ? 'rgba(196,145,58,0.15)' : 'transparent',
                color: filter === f ? 'var(--dust)' : 'var(--ghost)',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                if (filter !== f) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--comet)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== f) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--ghost)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--horizon)';
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="gsap-proj-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className={`gsap-proj-card group flex flex-col rounded-[var(--radius-md)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--glow-dust)] ${project.featured ? 'md:col-span-2 md:flex-row' : ''}`}
                style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.4)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--horizon)'}
              >
                {/* Image / Visualization Area */}
                <div 
                  className={`relative bg-[rgba(0,0,0,0.5)] border-b border-[var(--horizon)] flex items-center justify-center overflow-hidden ${project.featured ? 'md:w-1/2 md:border-b-0 md:border-r' : 'h-[200px]'}`}
                >
                  {project.featured && <div className="absolute top-4 left-4 z-10 font-mono text-[0.65rem] text-[var(--dust)] border border-[var(--dust)] px-2 py-1 rounded-sm bg-[rgba(196,145,58,0.1)]">★ FEATURED MISSION</div>}
                  <SystemDiagram category={project.category} />
                  
                  {/* Scanline overlay on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
                </div>

                {/* Content Area */}
                <div className={`flex flex-col p-6 ${project.featured ? 'md:w-1/2 justify-center' : ''}`}>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--pulse)', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--dust)' }}>
                      {project.category}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--star)', marginBottom: '8px' }}>
                    {project.name}
                  </h3>
                  
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--comet)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6" style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--dust)' }}>
                    {project.metrics.map((m, i) => (
                      <div key={m} className="flex items-center gap-3">
                        {i > 0 && <span className="text-[var(--horizon)]">|</span>}
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Links */}
                  <div className="mt-auto pt-4 border-t border-[var(--horizon)]">
                    <a href={project.github} className="inline-block transition-colors hover:text-[var(--star)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--pulse)' }}>
                      View Repo →
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
      <style>{`
        @keyframes dashFlow {
          to { stroke-dashoffset: -16; }
        }
      `}</style>
    </div>
  );
}
