import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight, Building2 } from 'lucide-react';

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
      className="glass-panel p-6 rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between h-full hover:bg-white/5"
    >
      {/* Glow highlight line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="space-y-4">
        {/* Company and location info */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-white/5 flex items-center justify-center text-cyan-400 group-hover:from-cyan-500 group-hover:to-indigo-500 group-hover:text-white transition-all duration-500 shrink-0">
              {job?.company?.logo ? (
                <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover rounded-xl" />
              ) : (
                <Building2 className="h-5 w-5" />
              )}
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                {job?.company?.name}
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                <span className="truncate">{job?.location || "India"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0 font-medium bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
            <Calendar className="h-3 w-3" />
            <span>{job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recent"}</span>
          </div>
        </div>

        {/* Job Title and Description */}
        <div className="text-left">
          <h4 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1">
            <span className="truncate">{job?.title}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-400 shrink-0 transform translate-y-1 group-hover:translate-y-0" />
          </h4>
          <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
            {job?.description}
          </p>
        </div>
      </div>

      {/* Tags details */}
      <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/5">
        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-emerald-500/20 shadow-none transition">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-cyan-500/20 shadow-none transition">
          {job?.jobType}
        </Badge>
        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-amber-500/20 shadow-none transition">
          {job?.salary} LPA
        </Badge>
      </div>

    </motion.div>
  );
};

export default LatestJobCards;