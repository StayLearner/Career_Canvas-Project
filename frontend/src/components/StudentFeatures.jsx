import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, CheckCircle2, ArrowUpRight, Award, History } from 'lucide-react';

const StudentFeatures = () => {
  const features = [
    {
      icon: Search,
      title: 'Precision Job Search',
      desc: 'Quickly find jobs aligned with your tech stack, location, or keywords using our browse filters.',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Compass,
      title: 'Quick Applications',
      desc: 'Submit your profile and active resume directly to recruiter listings with a single click.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Award,
      title: 'Profile & Resume Canvas',
      desc: 'Manage your contact details, host your profile photo, list tech skills, and upload your resume.',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: History,
      title: 'Hiring History Log',
      desc: 'View all submitted applications and monitor their review states in a structured profile dashboard.',
      color: 'from-violet-500 to-fuchsia-500',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Dashboard Mockup Preview */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-2xl rounded-3xl -z-10" />
            
            {/* Main Mockup Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-6 rounded-3xl border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Header inside mockup */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div>
                  <h3 className="font-bold text-base text-white">Student Workspace</h3>
                  <p className="text-xs text-slate-400">Welcome back, Rohan</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active Candidate
                </span>
              </div>


              {/* Application Tracking Pipeline Visual */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Applications</h4>
                
                {/* App Item 1 */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-violet-500/20 flex items-center justify-center font-bold text-xs text-violet-400">
                      AP
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white">Product Designer</h5>
                      <p className="text-xs text-slate-400">ApexHQ</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-semibold">
                    Pending
                  </span>
                </div>

                {/* App Item 2 */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-cyan-500/20 flex items-center justify-center font-bold text-xs text-cyan-400">
                      IV
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white">Frontend Developer</h5>
                      <p className="text-xs text-slate-400">InnovateX</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
                    Accepted
                  </span>
                </div>

                {/* App Item 3 */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition duration-300 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-xs text-blue-400">
                      CN
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white">Software Intern</h5>
                      <p className="text-xs text-slate-400">CloudNest</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-semibold">
                    Rejected
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Features Description */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                For Aspiring Candidates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Discover your path, track your goals, build your canvas.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Career Canvas equips you with features designed to take the stress out of job hunting. Streamline your processes and get hired in modern startup environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="glass-panel p-5 rounded-2xl flex flex-col gap-3 group hover:border-cyan-500/20 transition-all duration-300">
                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StudentFeatures;
