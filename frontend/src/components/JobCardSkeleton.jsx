import React from 'react';

const JobCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden p-5 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] h-full flex flex-col justify-between shadow-[0_20px_50px_rgba(15,23,42,0.02)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] animate-pulse select-none">
      
      <div className="space-y-3.5 flex-1 flex flex-col">
        {/* Top badge and time row */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100/60 dark:border-white/5 pb-2.5 shrink-0">
          <div className="h-4 w-24 bg-slate-200 dark:bg-white/10 rounded-full" />
          <div className="h-4 w-12 bg-slate-200 dark:bg-white/10 rounded-md" />
        </div>

        {/* Company Identity Row */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-white/10 shrink-0" />
          <div className="flex-1 space-y-1.5 min-w-0">
            <div className="h-3.5 w-24 bg-slate-200 dark:bg-white/10 rounded-md" />
            <div className="h-3 w-16 bg-slate-200 dark:bg-white/5 rounded-md" />
          </div>
        </div>

        {/* Job Title and Description */}
        <div className="space-y-1.5 pt-1 flex-1 flex flex-col justify-center">
          <div className="h-4.5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md shrink-0" />
          <div className="space-y-1 h-[3.375rem] sm:h-[3.75rem] flex flex-col justify-center overflow-hidden">
            <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-md" />
            <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-md" />
            <div className="h-3 w-5/6 bg-slate-100 dark:bg-white/5 rounded-md" />
          </div>
        </div>

        {/* Realism indicators */}
        <div className="flex gap-3 pt-0.5 shrink-0">
          <div className="h-3 w-20 bg-slate-200 dark:bg-white/10 rounded-md" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-white/10 rounded-md" />
        </div>
      </div>

      <div className="mt-auto pt-3 space-y-3 shrink-0">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="h-5.5 w-16 bg-slate-100 dark:bg-white/5 rounded-md" />
          <div className="h-5.5 w-16 bg-slate-100 dark:bg-white/5 rounded-md" />
          <div className="h-5.5 w-16 bg-slate-100 dark:bg-white/5 rounded-md" />
        </div>

        {/* Button */}
        <div className="h-9 w-full bg-slate-200 dark:bg-white/10 rounded-xl" />
      </div>
    </div>
  );
};

export default JobCardSkeleton;
