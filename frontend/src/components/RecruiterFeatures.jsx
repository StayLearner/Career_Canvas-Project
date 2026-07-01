import React from 'react';
import { motion } from 'framer-motion';
import { Users, FilePlus, Eye, Sparkles, UserCheck, Check, X, ShieldCheck } from 'lucide-react';

const RecruiterFeatures = () => {
  const features = [
    {
      icon: Users,
      title: 'Company Hub Manager',
      desc: 'Set up your employer profile, link logos, describe your work culture, and manage locations.',
      color: 'from-amber-400 to-orange-500 shadow-md shadow-amber-500/10',
    },
    {
      icon: FilePlus,
      title: 'One-Click Job Posting',
      desc: 'Quickly define job criteria (salary, job type, vacancies) and publish immediately to active pools.',
      color: 'from-amber-400 to-orange-500 shadow-md shadow-amber-500/10',
    },
    {
      icon: Eye,
      title: 'Applicant Console',
      desc: 'Inspect applicant CVs, view core skills, analyze profile links, and short-list in real-time.',
      color: 'from-amber-500 to-yellow-500 shadow-md shadow-amber-500/10',
    },
    {
      icon: UserCheck,
      title: 'Dynamic Pipeline Control',
      desc: 'Move candidates between pipeline states (Accepted, Rejected, Pending) with direct status updates.',
      color: 'from-amber-400 to-orange-500 shadow-md shadow-amber-500/10',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-950/10 dark:bg-slate-950/30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Description of recruiter features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3 font-sans">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-750 dark:text-violet-400 border border-violet-500/20">
                For Recruiters & Hiring Managers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Create company workspaces, publish job openings, and manage candidate pipelines.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Manage job listings, review candidate submissions, and update hiring status directly in your dashboard.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-left">
              {features.map((feat, index) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="flex gap-4 p-4 rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#0d1220]/40 transition duration-300 hover:border-amber-400/30 dark:hover:border-violet-500/20 shadow-sm relative overflow-hidden group">
                    <div className="flex flex-col items-center">
                      <div className="h-9 w-9 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-500 dark:text-amber-400 font-semibold shadow-sm shrink-0 transition-transform group-hover:scale-105 group-hover:rotate-3 duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      {index < features.length - 1 && (
                        <div className="w-0.5 bg-gradient-to-b from-amber-500/20 to-transparent flex-1 mt-2 min-h-[20px]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-905 dark:text-white group-hover:text-amber-605 dark:group-hover:text-amber-400 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Recruiter Dashboard Preview */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/10 to-amber-500/10 blur-2xl rounded-3xl -z-10" />
            
            {/* Main Mockup Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] p-6 rounded-3xl border border-amber-200/70 dark:border-white/10 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-3xl z-0" />

              <div className="relative z-10">
                {/* Header inside mockup */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5 mb-6">
                  <div>
                    <h3 className="font-semibold text-base text-slate-950 dark:text-white">Hiring Dashboard</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">InnovateX Recruiting Hub</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/20 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Recruiter Account
                  </span>
                </div>

                {/* Applicant list panel */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                    <span>Recent Applicants (24 new)</span>
                    <span className="text-violet-755 dark:text-violet-400 hover:underline cursor-pointer font-semibold">View All</span>
                  </div>

                  {/* Candidate 1 */}
                  <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-semibold text-white text-sm">
                          AS
                        </div>
                        <div className="text-left">
                          <h5 className="font-semibold text-sm text-slate-800 dark:text-white">Ananya Sharma</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Applying for React Developer</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">10m ago</span>
                    </div>

                    {/* Skills tags */}
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">React</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">Tailwind</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">Redux</span>
                    </div>

                    {/* Actions inside preview */}
                    <div className="flex items-center gap-2 mt-1 border-t border-slate-100 dark:border-white/5 pt-2">
                      <button className="flex-1 flex items-center justify-center gap-1 text-[11px] bg-emerald-500/10 dark:bg-emerald-500/20 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold py-1.5 rounded-lg transition duration-200 border-0 cursor-pointer">
                        <Check className="h-3 w-3" /> Accept
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 text-[11px] bg-red-500/5 dark:bg-red-500/10 hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-750 dark:text-red-400 border border-red-500/20 font-semibold py-1.5 rounded-lg transition duration-200 border-0 cursor-pointer">
                        <X className="h-3 w-3" /> Reject
                      </button>
                    </div>
                  </div>

                  {/* Candidate 2 (Compact/Accepted) */}
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/10 transition duration-300 opacity-80">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-400 to-indigo-500 flex items-center justify-center font-semibold text-white text-xs">
                        VK
                      </div>
                      <div className="text-left">
                        <h5 className="font-semibold text-xs text-slate-800 dark:text-white">Vijay Kumar</h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Applied for Backend Engineer</p>
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold uppercase tracking-wider">
                      Accepted
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accent Floating Post Job capsule */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] px-4 py-3 rounded-2xl flex items-center gap-3 border border-amber-200/70 dark:border-violet-500/20 shadow-xl hidden sm:flex z-20 overflow-hidden"
            >
              {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-2xl z-0" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center text-violet-700 dark:text-violet-400 animate-pulse">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">Job Live</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">NodeJS Dev Posted</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecruiterFeatures;
