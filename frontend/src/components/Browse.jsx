import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, X, RotateCcw, Search } from 'lucide-react';
import { Button } from './ui/button';
import JobCardSkeleton from './JobCardSkeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    } 
  }
};

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    // Local search text input synced with Redux searchedQuery
    const [searchInput, setSearchInput] = useState(searchedQuery || "");

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Synchronize local search input when global Redux query changes
    useEffect(() => {
        setSearchInput(searchedQuery || "");
    }, [searchedQuery]);

    // Debounce syncing local searchInput changes back to Redux searchedQuery
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchInput !== (searchedQuery || "")) {
                dispatch(setSearchedQuery(searchInput));
            }
        }, 400);
        return () => clearTimeout(handler);
    }, [searchInput, dispatch, searchedQuery]);

    // Track loading states during initial mount or query updates
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [allJobs, searchInput]);

    const handleReset = () => {
        setSearchInput("");
        dispatch(setSearchedQuery(""));
    };

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />

            {/* Mesh background glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-amber-500/5 to-cyan-500/5 dark:from-amber-500/10 dark:to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className='max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 relative z-10'>
                
                {/* Top Search bar row */}
                <div className="mb-6 space-y-4 max-w-4xl mx-auto">
                    <div className="relative group w-full">
                        {/* Glow focus backdrop */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-sky-400 to-cyan-400 rounded-full blur opacity-10 group-focus-within:opacity-35 group-hover:opacity-20 transition duration-500" />
                        <div className="relative flex items-center bg-white dark:bg-[#0c1220]/90 border border-slate-200 dark:border-white/10 rounded-full px-5 py-2.5 shadow-sm group-focus-within:border-transparent transition-all duration-300">
                            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0 mr-3" />
                            <input
                                type="text"
                                placeholder="Search jobs, companies, skills, or locations..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="bg-transparent border-none outline-none w-full text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 py-1"
                            />
                            {searchInput && (
                                <button
                                    onClick={handleReset}
                                    className="hover:bg-slate-100 dark:hover:bg-white/10 rounded-full p-1 transition mr-1 bg-transparent shrink-0"
                                >
                                    <X className="h-4 w-4 text-slate-450 hover:text-slate-700 dark:text-slate-550 dark:hover:text-slate-300" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results count & Quick action button */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-1.5 pb-2 border-b border-slate-100/60 dark:border-white/5">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-405">
                                {isLoading ? "Searching..." : `${allJobs.length} ${allJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Found`}
                            </span>
                        </div>
                        {searchInput && (
                            <button
                                onClick={handleReset}
                                className="text-xs font-extrabold text-slate-505 hover:text-red-500 dark:text-slate-405 dark:hover:text-red-400 transition flex items-center gap-1 bg-transparent"
                            >
                                <RotateCcw size={12} />
                                <span>Reset Search</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Active search pill */}
                <AnimatePresence>
                    {searchInput && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-wrap items-center gap-2 mb-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl max-w-4xl mx-auto"
                        >
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">Active:</span>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm transition-all duration-200 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                            >
                                <span>Search: "{searchInput}"</span>
                                <button
                                    onClick={handleReset}
                                    className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition"
                                >
                                    <X size={12} className="stroke-[2.5]" />
                                </button>
                            </motion.div>
                            <button
                                onClick={handleReset}
                                className="text-xs font-extrabold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-405 ml-auto transition flex items-center gap-1 bg-transparent hover:scale-102"
                            >
                                <RotateCcw size={12} />
                                <span>Clear Search</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {
                    isLoading ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10'>
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <JobCardSkeleton key={index} />
                                ))
                            }
                        </div>
                    ) : allJobs.length <= 0 ? (
                        <div className="bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-250/60 dark:border-white/10 rounded-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-10 px-4 text-center max-w-md mx-auto space-y-6"
                            >
                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-550 dark:text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative">
                                    <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 animate-pulse" />
                                    <FileSearch className="h-9 w-9 relative z-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">No Matching Opportunities Found</h3>
                                    <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed">
                                        Try adjusting your search query or clear the input to discover open roles.
                                    </p>
                                </div>
                                <Button 
                                    onClick={handleReset}
                                    className="bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 font-bold py-2.5 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 border-0"
                                >
                                    Reset Search
                                </Button>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10'
                        >
                            {
                                allJobs.map((job) => {
                                    return (
                                        <motion.div
                                            variants={cardVariants}
                                            key={job._id}
                                            className="h-full"
                                        >
                                            <Job job={job}/>
                                        </motion.div>
                                    )
                                })
                            }
                        </motion.div>
                    )
                }
            </div>
        </div>
    );
};

export default Browse;