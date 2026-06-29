'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL } from '@/lib/constants';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <mark 
      style={{ 
        background: 'rgba(196,145,58,0.15)', 
        color: 'var(--dust)', 
        padding: '2px 6px', 
        borderRadius: '4px',
        fontWeight: 500,
      }}
    >
      {children}
    </mark>
  );
}

function StatChip({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center p-2 rounded bg-[var(--deep-space)] border border-[var(--horizon)]">
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--star)' }}>{value}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--comet)', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations
    gsap.fromTo('.gsap-intro', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Scroll-triggered animations for bio blocks
    gsap.utils.toArray('.gsap-bio-block').forEach((block: any, i) => {
      gsap.fromTo(block,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Mission log timeline stagger
    gsap.fromTo('.gsap-mission-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-mission-container',
          start: 'top 80%',
        }
      }
    );

    // Values Strip parallax and fade
    gsap.fromTo('.gsap-value-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.gsap-values-container',
          start: 'top 90%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col pt-32 pb-24 px-6 relative z-10">
      <div className="w-full max-w-[860px] mx-auto flex flex-col gap-16">
        
        {/* Intro */}
        <div className="gsap-intro flex flex-col gap-3">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--dust)' }}>// ABOUT_ME.md</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--star)', lineHeight: 1.1 }}>
            Who's Behind the Terminal
          </h2>
        </div>

        {/* Bio Block */}
        <div className="gsap-bio-block flex flex-col md:flex-row gap-10">
          {/* Left Column */}
          <div className="w-full md:w-[35%] flex flex-col gap-6">
            <div className="relative w-full aspect-square rounded-[var(--radius-lg)] overflow-hidden group">
              <div className="absolute inset-0 bg-[var(--deep-space)] flex items-center justify-center">
                <span className="text-[var(--ghost)] font-mono text-2xl opacity-50">IMAGE_NOT_FOUND</span>
              </div>
              <div className="absolute inset-0 border border-[rgba(196,145,58,0.3)] rounded-[var(--radius-lg)] transition-transform duration-700 group-hover:rotate-6" />
            </div>
            
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-[rgba(196,145,58,0.1)]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--dust)', letterSpacing: '0.05em' }}>
                AVAILABLE FOR WORK
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Stars" value="120+" />
              <StatChip label="Commits" value="1000+" />
              <StatChip label="Repos" value="20+" />
              <StatChip label="PRs" value="15+" />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[65%] flex flex-col gap-6" style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--comet)', lineHeight: 1.8 }}>
            <p>
              I'm a fourth-year CS student, passionate about building AI-powered systems that are not just functional — but <em style={{ color: 'var(--dust)' }}>trustworthy</em>.
            </p>
            <p>
              My work lives at the intersection of <Highlight>Java development</Highlight>, LLM engineering, and AI pipeline design. I've built an AI Code Review system using LangChain4j, a Java MCP Server for AI tool integration, and content analytics tools with Python — all from scratch. When I'm not coding, I'm probably deep in <Highlight>LeetCode problems</Highlight> or watching Game of Thrones.
            </p>
          </div>
        </div>

        {/* Off-Duty Bento Box (replaces Core Arsenal) */}
        <div className="gsap-mission-container flex flex-col gap-8">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--star)' }}>Off-Duty</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large Card */}
            <div className="gsap-mission-item md:col-span-2 relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--deep-space)] border border-[var(--horizon)] p-8 min-h-[200px] flex flex-col justify-end group transition-all duration-500 hover:border-[rgba(196,145,58,0.4)]">
              {/* Background Effect */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(196,145,58,0.4) 0%, transparent 50%)' }} />
              
              <div className="relative z-10">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--dust)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  // CURRENT_OBSESSION
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--star)', lineHeight: 1.2, marginBottom: '8px' }}>
                  System Design & Distributed Architectures
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--comet)', fontSize: '0.95rem', maxWidth: '80%' }}>
                  Diving deep into how massive applications scale, handle failures, and manage state across the globe.
                </p>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="gsap-mission-item relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--deep-space)] border border-[var(--horizon)] p-6 flex flex-col justify-between group transition-all duration-300 hover:border-[rgba(196,145,58,0.4)]">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">♟️</div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--dust)', marginBottom: '4px' }}>// HOBBY_01</div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--star)' }}>Chess</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--comet)', fontSize: '0.85rem' }}>Playing rapid games to keep the mind sharp.</p>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="gsap-mission-item relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--deep-space)] border border-[var(--horizon)] p-6 flex flex-col justify-between group transition-all duration-300 hover:border-[rgba(196,145,58,0.4)]">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">🐉</div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--dust)', marginBottom: '4px' }}>// MEDIA_01</div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--star)' }}>Game of Thrones</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--comet)', fontSize: '0.85rem' }}>Rewatching epic fantasy world-building.</p>
              </div>
            </div>

            {/* Medium Card */}
            <div className="gsap-mission-item md:col-span-2 relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--deep-space)] border border-[var(--horizon)] p-6 flex items-center gap-6 group transition-all duration-300 hover:border-[rgba(196,145,58,0.4)]">
              <div className="w-16 h-16 rounded-full bg-[rgba(196,145,58,0.1)] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 border-2 border-[var(--dust)] border-dashed rounded-full animate-[spin_10s_linear_infinite]" />
                <span className="text-2xl relative z-10">🎧</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--dust)', marginBottom: '4px' }}>// NOW_PLAYING</div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--star)' }}>Deep Focus Synthwave</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--comet)', fontSize: '0.85rem' }}>The soundtrack for late-night coding sessions and debugging.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Block */}
        <div className="gsap-bio-block w-full rounded-[var(--radius-md)] bg-[var(--deep-space)] border border-[var(--horizon)] p-6 md:p-8 font-mono text-[0.85rem]">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[var(--star)]">$ whoami</span>
              <div className="text-[var(--comet)] mt-1">{'> Backend Engineer. AI Systems Builder. CS Student @ NHCE Bangalore.'}</div>
            </div>
            <div>
              <span className="text-[var(--star)]">$ currently</span>
              <div className="text-[var(--comet)] mt-1 flex flex-col gap-1">
                <div>{'> Building: [Java MCP Server — AI Tool Integration Platform]'}</div>
                <div>{'> Watching: [Game of Thrones — House of the Dragon]'}</div>
                <div>{'> Solving: [LeetCode DSA daily grind]'}</div>
                <div>{'> Location: [Bengaluru, India — IST UTC+5:30]'} <span className="text-[var(--dust)] animate-[blink_1s_step-end_infinite]">|</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Strip */}
        <div className="gsap-values-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Systems Thinking', desc: 'Every line of code exists within an architecture.' },
            { title: 'Reliability First', desc: '99.9% is a promise. I build the 0.1% buffer.' },
            { title: 'Curiosity as Method', desc: 'I treat engineering problems the way physicists treat the universe.' }
          ].map((value, idx) => (
            <div 
              key={idx}
              className="gsap-value-card flex flex-col gap-3 p-6 rounded-[var(--radius-md)] bg-[var(--deep-space)] border border-[var(--horizon)] transition-colors duration-300 hover:border-[rgba(196,145,58,0.3)] group"
            >
              <div className="w-10 h-10 rounded bg-[rgba(196,145,58,0.1)] flex items-center justify-center text-[var(--dust)] group-hover:shadow-[var(--glow-dust)] transition-shadow">
                {/* SVG Icon Placeholder */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--star)' }}>{value.title}</h4>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--comet)' }}>{value.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
