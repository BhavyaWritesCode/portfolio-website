'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out border-b ${
          scrolled
            ? 'bg-[#0F172A]/70 backdrop-blur-md border-white/10 py-4 shadow-lg'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* LEFT — Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-300 group-hover:text-blue-400 transition-colors"
            >
              <ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" transform="rotate(-30 16 16)" />
              <ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" transform="rotate(30 16 16)" />
              <circle cx="16" cy="16" r="4" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Bhavya Saini
            </span>
          </Link>

          {/* CENTER — Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.href === hoveredPath && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-blue-500/20 border border-blue-500/50 rounded-full z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT — Hire Me & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Hire Me
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 z-[1001] relative w-8 h-8 justify-center items-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[#0F172A]/95 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6 w-full px-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className={`block py-4 text-2xl font-bold tracking-tight border-b border-white/5 ${
                        isActive ? 'text-blue-400' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.1, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
