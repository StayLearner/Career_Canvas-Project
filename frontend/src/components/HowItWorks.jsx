import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, CheckCircle, Building2, Send, Check } from 'lucide-react';

const studentSteps = [
  {
    num: '01',
    icon: UserPlus,
    title: 'Assemble Your Canvas',
    desc: 'Register a student account, populate your profile with skills, and upload your resume.',
  },
  {
    num: '02',
    icon: Search,
    title: 'Search & Apply',
    desc: 'Browse tailored listings, filter by location or salary, and apply in seconds.',
  },
  {
    num: '03',
    icon: CheckCircle,
    title: 'Track Application Status',
    desc: 'Monitor status live on your profile dashboard (Pending, Accepted, or Rejected).',
  },
];

const recruiterSteps = [
  {
    num: '01',
    icon: Building2,
    title: 'Establish Brand Profile',
    desc: 'Create an employer account, list company values, details, and upload your company logo.',
  },
  {
    num: '02',
    icon: Send,
    title: 'Publish Listings',
    desc: 'Draft comprehensive job descriptions, specify criteria, and launch jobs immediately.',
  },
  {
    num: '03',
    icon: Check,
    title: 'Accept & Reject Applications',
    desc: 'Review candidates resumes, inspect profiles, and set hiring statuses to Accepted or Rejected.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Hiring Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Two Channels. Simple Pathways.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Whether you are starting your professional path or scaling your engineering team, Career Canvas streamlines each step of the pipeline.
          </p>
        </div>

        {/* Timelines Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {/* Vertical divider line for desktop */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-px bg-white/5 hidden lg:block" />

          {/* Student timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-7 w-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs font-bold">A</span>
              <h3 className="font-extrabold text-xl text-white">For Candidates</h3>
            </div>
            
            <div className="space-y-6">
              {studentSteps.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-panel p-6 rounded-2xl flex gap-4 hover:border-cyan-500/20 hover:bg-white/5 transition-all duration-300 relative group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors">
                          {step.title}
                        </h4>
                        <span className="text-xs font-semibold text-slate-500 group-hover:text-cyan-400/50 transition-colors">
                          Step {step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recruiter timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-7 w-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">B</span>
              <h3 className="font-extrabold text-xl text-white">For Employers</h3>
            </div>

            <div className="space-y-6">
              {recruiterSteps.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-panel p-6 rounded-2xl flex gap-4 hover:border-violet-500/20 hover:bg-white/5 transition-all duration-300 relative group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:from-violet-500 group-hover:to-fuchsia-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-violet-400 transition-colors">
                          {step.title}
                        </h4>
                        <span className="text-xs font-semibold text-slate-500 group-hover:text-violet-400/50 transition-colors">
                          Step {step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
