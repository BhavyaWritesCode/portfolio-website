import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin, FaTwitter as Twitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-slate-300 transition-colors"
              >
                <ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" transform="rotate(-30 16 16)" />
                <ellipse cx="16" cy="16" rx="14" ry="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" transform="rotate(30 16 16)" />
                <circle cx="16" cy="16" r="4" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-bold text-xl tracking-tight text-white">
                Bhavya Saini
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
              Fourth-year CS student building AI-powered systems and validating their behaviour. Seeking a QA/SDET internship to help ship trustworthy AI-driven products.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/BhavyaWritesCode" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/bhavya-saini-568a29303" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                <Linkedin size={20} />
              </a>
              <a href="mailto:bhavyasaini06@gmail.com" className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="https://github.com/BhavyaWritesCode" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/bhavya-saini-568a29303" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
                  LinkedIn Network
                </a>
              </li>
              <li>
                <a href="mailto:bhavyasaini06@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
                  Email Inquiries
                </a>
              </li>
              <li>
                <a href="/Bhavya_Saini_Resume.pdf" download="Bhavya_Saini_Resume.pdf" className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Bhavya Saini. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-sm font-medium">Built with Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
