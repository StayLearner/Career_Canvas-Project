import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, UserPlus, FilePlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { GlowingEffect } from './ui/glowing-effect';

const FinalCTA = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-tr from-cyan-500/5 to-amber-500/10 dark:from-cyan-500/10 dark:to-amber-500/15 blur-[120px] -z-10 animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative group/card rounded-[2.5rem]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200 dark:border-white/10 p-8 sm:p-12 lg:p-16 rounded-[2.5rem] text-center relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.05)] dark:shadow-2xl"
        >
          {/* Inner highlight glows */}
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-3xl pointer-events-none z-0" />

          {/* Subtle panel grid texture overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/10 to-amber-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
              <Sparkles className="h-3.5 w-3.5" /> Start Today
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight max-w-2xl">
              Elevate your recruiting & career development.
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Connect with leading software teams, track your submissions, and establish your professional brand on the canvas of tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
              {/* Left Button */}
               <Link to={user ? "/jobs" : "/signup"} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-[0_4px_15px_rgba(6,182,212,0.15)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.35)] transition duration-300 group"
                >
                  <UserPlus className="h-5 w-5 transform group-hover:scale-105 transition-transform" />
                  <span>{user ? "Explore Hot Jobs" : "Start Your Journey"}</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              {/* Right Button */}
              {!user && (
                <Link to="/signup" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold px-8 py-3.5 rounded-2xl border border-slate-250 dark:border-white/10 hover:border-slate-350 dark:hover:border-white/20 transition duration-300 group"
                  >
                    <FilePlus className="h-5 w-5 transform group-hover:rotate-6 transition-transform" />
                    <span>Post Your First Job</span>
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
        <GlowingEffect
          disabled={false}
          proximity={120}
          inactiveZone={0.01}
          borderWidth={1.5}
          spread={50}
          glow={false}
        />
      </div>
    </section>
  );
};

export default FinalCTA;
