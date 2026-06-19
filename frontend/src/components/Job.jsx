import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, Clock, Users, BadgeCheck, MapPin, ArrowRight, Building2 } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { GlowingEffect } from './ui/glowing-effect'

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  const daysAgo = daysAgoFunction(job?.createdAt);
  const timeText = daysAgo === 0 ? "Today" : `${daysAgo}d ago`;
  const companyName = job?.company?.name || "Company";
  
  // Extract clean initials
  const initials = companyName
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || "CO";

  // Generate hash-based gradient for avatar fallback
  const getGradientClass = (name) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const gradients = [
      'from-pink-500 via-red-500 to-yellow-500',
      'from-yellow-400 via-orange-500 to-red-500',
      'from-emerald-400 to-cyan-600',
      'from-cyan-400 via-blue-500 to-indigo-600',
      'from-purple-500 via-pink-500 to-red-500',
      'from-teal-400 to-emerald-600',
      'from-amber-400 via-amber-500 to-cyan-500',
    ];
    return gradients[hash % gradients.length];
  };

  const gradientClass = getGradientClass(companyName);

  return (
    <div className='relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] hover:-translate-y-1.5 group text-left transition-[transform,box-shadow] duration-300 h-full flex flex-col justify-between'>
      {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-2xl z-0" />
      
      {/* Glow highlight effect */}
      <GlowingEffect
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={1.5}
        spread={40}
        glow={false}
      />

      <div className="z-10 relative space-y-3.5 flex-1 flex flex-col">
        {/* Card Top Information Row */}
        <div className='flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-2.5 shrink-0'>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <BadgeCheck className="h-3 w-3 shrink-0" />
            Verified Company
          </span>
          <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-500 font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 px-2 py-0.5 rounded-md">
            <Clock className="h-3 w-3 shrink-0" />
            <span>Posted {timeText}</span>
          </div>
        </div>

        {/* Company Identity Row */}
        <div className='flex items-center gap-3 shrink-0'>
          {job?.company?.logo && !logoError ? (
            <div className="h-10 w-10 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center bg-white shadow-sm shrink-0 overflow-hidden">
              <img 
                src={job.company.logo} 
                alt={job.company.name} 
                className="h-full w-full object-cover" 
                onError={() => setLogoError(true)}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${gradientClass} flex items-center justify-center text-slate-900 dark:text-white shadow-sm shrink-0 font-semibold text-xs select-none border border-slate-200/50 dark:border-transparent`}>
              {initials}
            </div>
          )}
          <div className='min-w-0 flex-1 space-y-0.5'>
            <h2 className='font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-200 truncate'>{companyName}</h2>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-500">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="text-[10px] truncate">{job?.location || "India"}</span>
            </div>
          </div>
        </div>

        {/* Job Title and Description Hierarchy */}
        <div className="space-y-1.5 pt-1 flex-1 flex flex-col justify-center">
          <h1 className='font-semibold text-sm sm:text-base text-slate-955 dark:text-white line-clamp-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 cursor-pointer' onClick={() => navigate(`/description/${job?._id}`)}>
            {job?.title}
          </h1>
          <p className='text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed h-[3.375rem] sm:h-[3.75rem] overflow-hidden'>
            {job?.description}
          </p>
        </div>

        {/* Realism indicators */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 pt-0.5 shrink-0">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-cyan-500 dark:text-cyan-400 shrink-0" />
            <span>{job?.applications?.length || 0} applicants</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3 text-amber-500 shrink-0" />
            <span>{job?.jobType}</span>
          </div>
        </div>
      </div>

      <div className="z-10 relative mt-auto pt-3 space-y-3 shrink-0">
        {/* Core Tags */}
        <div className='flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5'>
          <Badge className='bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-md hover:bg-emerald-500/20 shadow-none transition' variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className='bg-sky-500/10 text-sky-700 dark:bg-cyan-500/10 dark:text-cyan-400 border border-sky-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-md hover:bg-sky-500/20 shadow-none transition' variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className='bg-amber-500/10 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-md hover:bg-amber-500/20 shadow-none transition' variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>

        {/* Custom View Opportunity CTA Button */}
        <div className='flex items-center justify-center pt-0.5'>
          <Button 
            onClick={() => navigate(`/description/${job?._id}`)} 
            className="w-full bg-slate-100 dark:bg-white/5 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-sky-400 hover:text-slate-955 dark:hover:text-[#020817] text-slate-900 dark:text-slate-200 font-semibold py-2 rounded-xl border border-slate-200 dark:border-white/10 transition-all duration-300 shadow-sm hover:shadow-[0_10px_25px_rgba(56,189,248,0.18)] dark:hover:shadow-md text-center text-xs flex items-center justify-center gap-1 group cursor-pointer"
          >
            <span>Explore Role</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Job);