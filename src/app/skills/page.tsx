'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Dynamic import prevents "window is not defined" SSR errors for react-force-graph
const DynamicForceGraph = dynamic(
  () => import('@/components/skills/ForceGraph3D'),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center text-[var(--ghost)] font-mono text-xs animate-pulse">Loading Simulation...</div> }
);

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header sequence
    gsap.fromTo('.gsap-skills-header > *', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' }
    );

    // Fade in the graph container
    gsap.fromTo('.gsap-graph-container',
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col pt-32 pb-24 px-6 relative z-10 overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12 h-[calc(100vh-200px)] flex-1">
        
        {/* Header */}
        <div className="gsap-skills-header flex flex-col gap-3 relative z-20 flex-shrink-0">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--dust)' }}>// SKILLS</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--star)', lineHeight: 1.1 }}>
            The Arsenal
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--comet)', marginTop: '8px', maxWidth: '600px' }}>
            A 3D physics simulation mapping the technologies I use to architect systems. Drag to rotate, scroll to zoom.
          </p>
        </div>

        {/* 3D Constellation Map Container */}
        <div className="gsap-graph-container relative flex-1 w-full rounded-[var(--radius-lg)] border border-[var(--horizon)] bg-[rgba(3,3,10,0.5)] overflow-hidden">
          {/* Faint grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <DynamicForceGraph />
        </div>

      </div>
    </div>
  );
}
