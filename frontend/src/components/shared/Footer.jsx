import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-transparent text-slate-600 dark:text-slate-400 py-12 sm:py-16 relative overflow-hidden transition-colors duration-500">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          
          {/* Column 1: Branding, Contact & Social Links */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight select-none">
              <span className="text-amber-500 dark:text-amber-400">Career</span>
              <span className="text-cyan-500 dark:text-cyan-400 font-medium">Canvas</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 leading-relaxed max-w-sm">
              A streamlined platform connecting student developers and recruiters within the modern software ecosystem.
            </p>
            
            <div className="space-y-2 text-xs sm:text-sm pt-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <a href="mailto:support@careercanvas.online" className="hover:text-slate-900 dark:hover:text-white transition">
                  support@careercanvas.online
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-cyan-500/30 hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all duration-300"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="h-9 w-9 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-cyan-500/30 hover:shadow-md dark:hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all duration-300"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Real Project Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-0.5">
                  <ArrowRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                  <span>Home</span>
                </Link>
              </li>

              {/* Student views */}
              {(!user || user?.role === 'student') && (
                <>
                  <li>
                    <Link to="/jobs" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-0.5">
                      <ArrowRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                      <span>Browse Jobs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-0.5">
                      <ArrowRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                      <span>Search & Filter</span>
                    </Link>
                  </li>
                </>
              )}

              {user && user.role === 'student' && (
                <li>
                  <Link to="/profile" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-0.5">
                    <ArrowRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                    <span>My Profile</span>
                  </Link>
                </li>
              )}

              {/* Recruiter views */}
              {user && user?.role === 'recruiter' && (
                <>
                  <li>
                    <Link to="/admin/companies" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-0.5">
                      <ArrowRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                      <span>Companies</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-0.5">
                      <ArrowRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                      <span>Job Postings</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Project Technology Stack */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
              Architecture & Tech Stack
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Frontend: React & Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Backend: Node.js & Express.js</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span>Database: MongoDB</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 CareerCanvas. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;