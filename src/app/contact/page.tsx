'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { PERSONAL } from '@/lib/constants';

function WormholeAmbient() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-end md:justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative w-[400px] h-[400px] md:translate-x-1/4 opacity-10 md:opacity-[0.12]" style={{ filter: 'blur(2px)' }}>
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full animate-[spinRing_30s_linear_infinite]">
          <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="var(--dust)" strokeWidth="2" transform="rotate(30 200 200)" />
          <ellipse cx="200" cy="200" rx="150" ry="50" fill="none" stroke="var(--pulse)" strokeWidth="3" transform="rotate(-45 200 200)" />
          <ellipse cx="200" cy="200" rx="100" ry="30" fill="none" stroke="var(--star)" strokeWidth="1" transform="rotate(75 200 200)" />
        </svg>
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full animate-[spinRing_20s_linear_infinite_reverse]">
          <ellipse cx="200" cy="200" rx="140" ry="40" fill="none" stroke="var(--dust)" strokeWidth="1" transform="rotate(15 200 200)" />
          <ellipse cx="200" cy="200" rx="120" ry="70" fill="none" stroke="var(--pulse)" strokeWidth="2" transform="rotate(-60 200 200)" />
        </svg>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('idle');
        alert('Failed to send message. Please try again or email directly.');
      }
    } catch (error) {
      setFormState('idle');
      alert('An error occurred while sending the message.');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    // Simple toast could go here
    alert('Email copied to clipboard');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col pt-32 pb-16 px-6 z-10">
      <WormholeAmbient />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[640px] mx-auto flex flex-col justify-center flex-1 z-10"
      >
        <div className="mb-10 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--star)', marginBottom: '16px' }}>
            Open a Channel
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--comet)', lineHeight: 1.6 }}>
            Whether it's a serious engineering challenge, a collaboration idea, or you just want to talk about distributed systems at 2am — I'm listening.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem', color: 'var(--comet)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Name</label>
              <input 
                id="name"
                name="name"
                required
                type="text" 
                className="w-full px-4 py-3 rounded-md transition-all outline-none focus:border-[var(--dust)] focus:shadow-[0_0_0_3px_rgba(196,145,58,0.2)]"
                style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)', color: 'var(--star)' }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem', color: 'var(--comet)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</label>
              <input 
                id="email"
                name="email"
                required
                type="email" 
                className="w-full px-4 py-3 rounded-md transition-all outline-none focus:border-[var(--dust)] focus:shadow-[0_0_0_3px_rgba(196,145,58,0.2)]"
                style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)', color: 'var(--star)' }}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem', color: 'var(--comet)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subject</label>
            <select 
              id="subject"
              name="subject"
              className="w-full px-4 py-3 rounded-md transition-all outline-none focus:border-[var(--dust)] focus:shadow-[0_0_0_3px_rgba(196,145,58,0.2)] appearance-none"
              style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)', color: 'var(--star)' }}
            >
              <option>Job Opportunity</option>
              <option>Collaboration</option>
              <option>Consulting</option>
              <option>Just Saying Hi</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8rem', color: 'var(--comet)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Message</label>
            <textarea 
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-md transition-all outline-none focus:border-[var(--dust)] focus:shadow-[0_0_0_3px_rgba(196,145,58,0.2)] resize-y min-h-[140px] max-h-[400px]"
              style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)', color: 'var(--star)' }}
            />
          </div>

          <button
            type="submit"
            disabled={formState !== 'idle'}
            className="group relative w-full h-[52px] flex items-center justify-center rounded-md transition-all overflow-hidden disabled:opacity-80"
            style={{
              background: formState === 'idle' ? 'transparent' : 'var(--dust)',
              border: '1px solid var(--dust)',
              color: formState === 'idle' ? 'var(--dust)' : 'var(--void)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              if (formState === 'idle') {
                (e.currentTarget as HTMLElement).style.background = 'var(--dust)';
                (e.currentTarget as HTMLElement).style.color = 'var(--void)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-dust)';
              }
            }}
            onMouseLeave={(e) => {
              if (formState === 'idle') {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--dust)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }
            }}
          >
            {formState === 'idle' && 'Initiate Sequence'}
            {formState === 'submitting' && (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[var(--void)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Transmitting...
              </span>
            )}
            {formState === 'success' && 'Signal Received ✓'}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <button 
            onClick={copyEmail}
            className="flex items-center justify-center gap-3 p-4 rounded-md transition-colors group cursor-pointer"
            style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.4)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--horizon)'}
          >
            <FiMail className="text-[var(--ghost)] group-hover:text-[var(--dust)] transition-colors" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--comet)' }}>{PERSONAL.email}</span>
          </button>
          <a 
            href={PERSONAL.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-md transition-colors group"
            style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.4)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--horizon)'}
          >
            <FiGithub className="text-[var(--ghost)] group-hover:text-[var(--dust)] transition-colors" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--comet)' }}>GitHub</span>
          </a>
          <a 
            href={PERSONAL.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-md transition-colors group"
            style={{ background: 'var(--deep-space)', border: '1px solid var(--horizon)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.4)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--horizon)'}
          >
            <FiLinkedin className="text-[var(--ghost)] group-hover:text-[var(--dust)] transition-colors" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--comet)' }}>LinkedIn</span>
          </a>
        </div>

        <div className="flex justify-center">
          <div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(196,145,58,0.05)', border: '1px solid rgba(196,145,58,0.1)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--star)' }}>
              Currently available for remote opportunities & internships
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
