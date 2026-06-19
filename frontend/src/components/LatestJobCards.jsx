import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight, Building2 } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
    
  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 p-6 rounded-2xl cursor-pointer shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] hover:border-sky-300/80 dark:hover:border-white/20 transition-all duration-300 relative group flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-2xl z-0" />

      {/* Subtle diagonal light sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-50/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0 pointer-events-none rounded-2xl" />

      <div className="space-y-4 z-10 relative flex-1 flex flex-col">
        {/* Company and location info */}
        <div className="flex justify-between items-start gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-cyan-500 dark:text-cyan-400 group-hover:from-cyan-500 group-hover:to-amber-500 group-hover:text-white shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-500 shrink-0">
              {job?.company?.logo ? (
                <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover rounded-xl" />
              ) : (
                <Building2 className="h-5 w-5" />
              )}
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-300 group-hover:text-slate-955 dark:group-hover:text-white transition-colors truncate">
                {job?.company?.name}
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">
                <MapPin className="h-3 w-3 text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="truncate">{job?.location || "India"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] text-slate-550 dark:text-slate-500 shrink-0 font-semibold bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/5">
            <Calendar className="h-3 w-3" />
            <span>{job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recent"}</span>
          </div>
        </div>

        {/* Job Title and Description */}
        <div className="text-left flex-1 flex flex-col justify-center">
          <h4 className="font-semibold text-base text-slate-955 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1">
            <span className="truncate">{job?.title}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-600 dark:text-cyan-400 shrink-0 transform translate-y-1 group-hover:translate-y-0" />
          </h4>
          <p className="text-xs text-slate-605 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed h-[3.75rem] overflow-hidden">
            {job?.description}
          </p>
        </div>
      </div>

      {/* Tags details */}
      <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-white/5 z-10 relative shrink-0">
        <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-emerald-500/20 shadow-none dark:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-sky-500/10 text-sky-700 dark:text-cyan-400 border border-sky-500/20 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-sky-500/20 shadow-none dark:shadow-[0_0_12px_rgba(6,182,212,0.15)] transition">
          {job?.jobType}
        </Badge>
        <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-amber-500/20 shadow-none dark:shadow-[0_0_12px_rgba(245,158,11,0.15)] transition">
          {job?.salary} LPA
        </Badge>
      </div>

      <GlowingEffect
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={1.5}
        spread={40}
        glow={false}
      />
    </motion.div>
  );
};

export default LatestJobCards;