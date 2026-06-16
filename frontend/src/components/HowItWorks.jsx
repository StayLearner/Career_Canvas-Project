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
    <section className="py-20 lg:py-28 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Hiring Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-3">
            Two Channels. Simple Pathways.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4">
            Whether you are starting your professional path or scaling your engineering team, Career Canvas streamlines each step of the pipeline.
          </p>
        </div>

        {/* Timelines Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {/* Vertical divider line for desktop */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-px bg-slate-200 dark:bg-white/5 hidden lg:block" />

          {/* Student timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-7 w-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xs font-semibold">A</span>
              <h3 className="font-semibold text-xl text-slate-900 dark:text-white">For Candidates</h3>
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
                    className="bg-gradient-to-br from-white via-sky-50/50 to-amber-50/40 dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 p-6 rounded-2xl flex gap-4 hover:border-sky-300/60 dark:hover:border-cyan-500/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300 relative group shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-sky-500/10 to-blue-500/10 border border-sky-500/20 dark:border-cyan-500/20 flex items-center justify-center text-sky-600 dark:text-cyan-400 shrink-0 group-hover:from-sky-500 group-hover:to-blue-600 dark:group-hover:from-cyan-500 dark:group-hover:to-blue-600 group-hover:text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="text-left space-y-1 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                          {step.title}
                        </h4>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-sky-500/60 dark:group-hover:text-cyan-400/50 transition-colors shrink-0">
                          Step {step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
              <span className="h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xs font-semibold">B</span>
              <h3 className="font-semibold text-xl text-slate-900 dark:text-white">For Employers</h3>
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
                    className="bg-gradient-to-br from-white via-sky-50/50 to-amber-50/40 dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 p-6 rounded-2xl flex gap-4 hover:border-amber-300/60 dark:hover:border-amber-500/30 hover:shadow-[0_24px_80px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-300 relative group shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-500/10 to-yellow-500/10 border border-amber-500/20 dark:border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 group-hover:from-amber-500 group-hover:to-yellow-600 dark:group-hover:from-amber-500 dark:group-hover:to-yellow-600 group-hover:text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div className="text-left space-y-1 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors truncate">
                          {step.title}
                        </h4>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-amber-500/60 dark:group-hover:text-amber-400/50 transition-colors shrink-0">
                          Step {step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
