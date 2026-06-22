import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, CheckCircle2, ArrowUpRight, Award, History } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const StudentFeatures = () => {
  const features = [
    {
      icon: Search,
      title: 'Precision Job Search',
      desc: 'Quickly find jobs aligned with your tech stack, location, or keywords using our browse filters.',
      color: 'from-cyan-400 to-sky-500 shadow-md shadow-sky-500/10',
    },
    {
      icon: Compass,
      title: 'Quick Applications',
      desc: 'Submit your profile and active resume directly to recruiter listings with a single click.',
      color: 'from-sky-400 to-cyan-500 shadow-md shadow-sky-500/10',
    },
    {
      icon: Award,
      title: 'Profile & Resume Canvas',
      desc: 'Manage your contact details, host your profile photo, list tech skills, and upload your resume.',
      color: 'from-cyan-500 to-blue-500 shadow-md shadow-sky-500/10',
    },
    {
      icon: History,
      title: 'Hiring History Log',
      desc: 'View all submitted applications and monitor their review states in a structured profile dashboard.',
      color: 'from-sky-500 to-indigo-500 shadow-md shadow-sky-500/10',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Dashboard Mockup Preview */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 blur-2xl rounded-3xl -z-10" />
            
            {/* Main Mockup Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-sky-200/70 dark:border-white/10 p-6 rounded-3xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden"
            >
              {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-3xl z-0" />

              <div className="relative z-10">
                {/* Header inside mockup */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5 mb-6">
                  <div>
                    <h3 className="font-semibold text-base text-slate-950 dark:text-white">Student Workspace</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back, Rohan</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Active Candidate
                  </span>
                </div>

                {/* Application Tracking Pipeline Visual */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Applications</h4>
                  
                  {/* App Item 1 */}
                  <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#081120]/90 border border-slate-100 dark:border-white/5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#111827] hover:border-slate-200 dark:hover:border-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.05)] dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center font-semibold text-xs text-amber-600 dark:text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.1)] dark:shadow-[0_0_8px_rgba(245,158,11,0.15)]">
                        AP
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-800 dark:text-white">Product Designer</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ApexHQ</p>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-semibold">
                      Pending
                    </span>
                  </div>

                  {/* App Item 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#081120]/90 border border-slate-100 dark:border-white/5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#111827] hover:border-slate-200 dark:hover:border-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.05)] dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center font-semibold text-xs text-cyan-600 dark:text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.1)] dark:shadow-[0_0_8px_rgba(34,211,238,0.15)]">
                        IV
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-800 dark:text-white">Frontend Developer</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">InnovateX</p>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      Accepted
                    </span>
                  </div>

                  {/* App Item 3 */}
                  <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#081120]/90 border border-slate-100 dark:border-white/5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#111827] hover:border-slate-200 dark:hover:border-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.05)] dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 opacity-70">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center font-semibold text-xs text-blue-600 dark:text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.1)] dark:shadow-[0_0_8px_rgba(59,130,246,0.15)]">
                        CN
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-800 dark:text-white">Software Intern</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">CloudNest</p>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 font-semibold">
                      Rejected
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Features Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                For Aspiring Candidates
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight font-heading">
                Search active job openings, manage applications, and submit your resume.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
                Career Canvas equips you with features designed to take the stress out of job hunting. Streamline your processes and get hired in modern startup environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="relative group/card rounded-3xl">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 p-5 rounded-3xl flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] hover:border-sky-300/80 dark:hover:border-white/20 h-full relative z-10 overflow-hidden text-left">
                      {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-3xl z-0" />
                      
                      <div className="relative z-10 space-y-3 flex flex-col h-full">
                        <div className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white transform group-hover/card:scale-110 group-hover/card:rotate-6 transition-transform duration-300 shadow-md shrink-0`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-sm text-slate-950 dark:text-white group-hover/card:text-cyan-500 dark:group-hover/card:text-cyan-400 transition-colors font-heading">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                    <GlowingEffect
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={1.5}
                      spread={40}
                      glow={false}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StudentFeatures;
