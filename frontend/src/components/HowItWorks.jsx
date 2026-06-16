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

/* ─── Reusable Step Card ─── */
const StepCard = ({ step, idx, accent = 'sky' }) => {
  const IconComp = step.icon;

  const isSky = accent === 'sky';

  // Accent-specific classes
  const iconBg = isSky
    ? 'from-sky-500/10 to-blue-500/10 border-sky-500/20 dark:border-cyan-500/20 text-sky-600 dark:text-cyan-400'
    : 'from-amber-500/10 to-yellow-500/10 border-amber-500/20 dark:border-amber-500/20 text-amber-600 dark:text-amber-400';

  const iconHover = isSky
    ? 'group-hover:from-sky-500 group-hover:to-blue-600 dark:group-hover:from-cyan-500 dark:group-hover:to-blue-600 group-hover:text-white'
    : 'group-hover:from-amber-500 group-hover:to-yellow-600 dark:group-hover:from-amber-500 dark:group-hover:to-yellow-600 group-hover:text-white';

  const titleHover = isSky
    ? 'group-hover:text-sky-600 dark:group-hover:text-cyan-400'
    : 'group-hover:text-amber-500 dark:group-hover:text-amber-400';

  const borderHover = isSky
    ? 'hover:border-sky-300/60 dark:hover:border-cyan-500/30'
    : 'hover:border-amber-300/60 dark:hover:border-amber-500/30';

  const shadowHover = isSky
    ? 'hover:shadow-[0_30px_80px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.25)]'
    : 'hover:shadow-[0_30px_80px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)]';

  const badgeHover = isSky
    ? 'group-hover:text-sky-500/60 dark:group-hover:text-cyan-400/50'
    : 'group-hover:text-amber-500/60 dark:group-hover:text-amber-400/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className={`
        group relative flex gap-4 items-start
        p-5 sm:p-6 rounded-2xl
        min-h-[120px]
        bg-white/85 backdrop-blur-xl border border-white/60
        shadow-[0_20px_60px_rgba(15,23,42,0.10)]
        dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220]
        dark:border-white/10
        dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
        ${borderHover} ${shadowHover}
        hover:-translate-y-1
        transition-all duration-300
      `}
    >
      {/* Icon box — fixed 48×48 */}
      <div
        className={`
          h-12 w-12 min-w-[48px] rounded-xl
          bg-gradient-to-tr ${iconBg}
          border flex items-center justify-center shrink-0
          ${iconHover}
          transform group-hover:scale-110 group-hover:rotate-6
          transition-all duration-300 shadow-md
        `}
      >
        <IconComp className="h-6 w-6" />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <h4
            className={`font-semibold text-sm sm:text-base text-slate-900 dark:text-white ${titleHover} transition-colors leading-snug`}
          >
            {step.title}
          </h4>
          <span
            className={`text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 ${badgeHover} transition-colors shrink-0 pt-0.5 tabular-nums`}
          >
            Step {step.num}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── Column Header ─── */
const ColumnHeader = ({ label, badge, accentBg, accentText }) => (
  <div className="flex items-center gap-3 mb-8">
    <span
      className={`h-8 w-8 rounded-lg ${accentBg} flex items-center justify-center ${accentText} text-xs font-bold`}
    >
      {badge}
    </span>
    <h3 className="font-semibold text-xl text-slate-900 dark:text-white">
      {label}
    </h3>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
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

        {/* ── Two-Column Timeline Grid ── */}
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-0">

          {/* ── Vertical Divider (desktop only) ── */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
            aria-hidden="true"
          >
            {/* Gradient line: fades in from top and out at bottom */}
            <div className="h-full w-full bg-gradient-to-b from-transparent via-slate-200/70 to-transparent dark:via-white/10" />
          </div>

          {/* ── Left Column: Candidates ── */}
          <div className="flex-1 lg:pr-10 xl:pr-14">
            <ColumnHeader
              label="For Candidates"
              badge="A"
              accentBg="bg-cyan-500/10"
              accentText="text-cyan-600 dark:text-cyan-400"
            />

            <div className="flex flex-col gap-5">
              {studentSteps.map((step, idx) => (
                <StepCard key={step.num} step={step} idx={idx} accent="sky" />
              ))}
            </div>
          </div>

          {/* ── Right Column: Employers ── */}
          <div className="flex-1 lg:pl-10 xl:pl-14">
            <ColumnHeader
              label="For Employers"
              badge="B"
              accentBg="bg-amber-500/10"
              accentText="text-amber-600 dark:text-amber-400"
            />

            <div className="flex flex-col gap-5">
              {recruiterSteps.map((step, idx) => (
                <StepCard key={step.num} step={step} idx={idx} accent="amber" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
