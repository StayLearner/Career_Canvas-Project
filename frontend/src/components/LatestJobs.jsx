import React, { useState, useEffect } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Sparkles } from 'lucide-react';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fisher-Yates Shuffle
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      const shuffled = shuffleArray(allJobs);
      setFeaturedJobs(shuffled.slice(0, 6));
      setLoading(false);
    } else if (allJobs && allJobs.length === 0) {
      setFeaturedJobs([]);
      setLoading(false);
    }
  }, [allJobs]);
   
  return (
    <section id="latest-jobs-grid" className="py-20 lg:py-24 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center sm:text-left mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            <Sparkles className="h-3 w-3" /> Direct Openings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Hot & Featured <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Job Positions</span>
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Inspect immediate positions published by active companies. Review wages, roles, and submit profiles.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 rounded-2xl animate-pulse h-48 bg-white/5 border border-white/5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 shrink-0" />
                    <div className="space-y-2 text-left">
                      <div className="h-4 w-24 bg-white/5 rounded" />
                      <div className="h-3 w-16 bg-white/5 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-white/5 rounded" />
                </div>
                <div className="space-y-2 my-2 text-left">
                  <div className="h-5 w-40 bg-white/5 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-white/5 rounded-lg" />
                  <div className="h-6 w-16 bg-white/5 rounded-lg" />
                  <div className="h-6 w-16 bg-white/5 rounded-lg" />
                </div>
              </div>
            ))
          ) : featuredJobs.length <= 0 ? (
            <div className="col-span-full text-center py-12 glass-panel rounded-2xl border-white/5">
              <span className="text-slate-400 text-sm font-semibold">No Featured Jobs Available At The Moment</span>
            </div>
          ) : (
            featuredJobs.map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
          )}
        </div>

      </div>
    </section>
  );
}

export default LatestJobs;