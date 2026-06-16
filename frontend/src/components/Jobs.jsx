import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, FileSearch, RotateCcw, Search } from 'lucide-react';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import JobCardSkeleton from './JobCardSkeleton';
import useGetAllJobs from '@/hooks/useGetAllJobs';

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

const Jobs = () => {
    // Trigger hook to ensure jobs are fetched on refresh or direct navigation
    useGetAllJobs();

    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    // Local search text input synced with Redux searchedQuery
    const [searchInput, setSearchInput] = useState(searchedQuery || "");

    // Local filter state for sidebar selections (Job Role removed)
    const [selectedFilters, setSelectedFilters] = useState({
        location: [],
        jobType: [],
        salary: [],
        experience: []
    });

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

    // Toggle a filter option
    const handleToggleFilter = (category, value) => {
        const key = category.toLowerCase().replace(" ", "");
        setSelectedFilters(prev => {
            const current = prev[key] || [];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [key]: updated };
        });
    };

    // Clear all filters (local sidebar + global keyword search)
    const handleClearAll = () => {
        setSelectedFilters({
            location: [],
            jobType: [],
            salary: [],
            experience: []
        });
        setSearchInput("");
        dispatch(setSearchedQuery(""));
    };

    // Compute dynamic option counts matching active searchInput
    const getOptionCount = (category, value) => {
        if (!allJobs) return 0;
        let pool = allJobs;
        
        // Filter pool by general text searchInput if active
        if (searchInput) {
            const queryLower = searchInput.toLowerCase();
            pool = pool.filter(job => 
                job.title.toLowerCase().includes(queryLower) ||
                job.description.toLowerCase().includes(queryLower) ||
                job.location.toLowerCase().includes(queryLower) ||
                job.jobType.toLowerCase().includes(queryLower) ||
                (job.company?.name && job.company.name.toLowerCase().includes(queryLower)) ||
                (job.requirements && job.requirements.some(s => s.toLowerCase().includes(queryLower)))
            );
        }

        return pool.filter(job => {
            if (category === "Location") {
                return job.location.toLowerCase().includes(value.toLowerCase());
            }
            if (category === "Job Type") {
                return job.jobType.toLowerCase().includes(value.toLowerCase());
            }
            if (category === "Salary") {
                const salary = Number(job.salary);
                if (value === "0-3 LPA") return salary <= 3;
                if (value === "3-6 LPA") return salary > 3 && salary <= 6;
                if (value === "6-10 LPA") return salary > 6 && salary <= 10;
                if (value === "10-15 LPA") return salary > 10 && salary <= 15;
                if (value === "15+ LPA") return salary > 15;
            }
            if (category === "Experience") {
                const exp = Number(job.experienceLevel);
                if (value === "Fresher (0-1 Yrs)") return exp <= 1;
                if (value === "1-3 Yrs") return exp > 1 && exp <= 3;
                if (value === "3-5 Yrs") return exp > 3 && exp <= 5;
                if (value === "5+ Yrs") return exp > 5;
            }
            return false;
        }).length;
    };

    // Apply multi-faceted local filters on allJobs
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            let filtered = allJobs || [];
            
            // 1. Local text search input
            if (searchInput) {
                const queryLower = searchInput.toLowerCase();
                filtered = filtered.filter((job) => {
                    return job.title.toLowerCase().includes(queryLower) ||
                        job.description.toLowerCase().includes(queryLower) ||
                        job.location.toLowerCase().includes(queryLower) ||
                        job.jobType.toLowerCase().includes(queryLower) ||
                        (job.company?.name && job.company.name.toLowerCase().includes(queryLower)) ||
                        (job.requirements && job.requirements.some(s => s.toLowerCase().includes(queryLower)));
                });
            }

            // 2. Location filter
            if (selectedFilters.location.length > 0) {
                filtered = filtered.filter(job => 
                    selectedFilters.location.some(loc => 
                        job.location.toLowerCase().includes(loc.toLowerCase())
                    )
                );
            }

            // 3. Job Type filter
            if (selectedFilters.jobType.length > 0) {
                filtered = filtered.filter(job => 
                    selectedFilters.jobType.some(type => 
                        job.jobType.toLowerCase().includes(type.toLowerCase())
                    )
                );
            }

            // 4. Salary filter
            if (selectedFilters.salary.length > 0) {
                filtered = filtered.filter(job => {
                    const salary = Number(job.salary);
                    return selectedFilters.salary.some(salRange => {
                        if (salRange === "0-3 LPA") return salary <= 3;
                        if (salRange === "3-6 LPA") return salary > 3 && salary <= 6;
                        if (salRange === "6-10 LPA") return salary > 6 && salary <= 10;
                        if (salRange === "10-15 LPA") return salary > 10 && salary <= 15;
                        if (salRange === "15+ LPA") return salary > 15;
                        return false;
                    });
                });
            }

            // 5. Experience filter
            if (selectedFilters.experience.length > 0) {
                filtered = filtered.filter(job => {
                    const exp = Number(job.experienceLevel);
                    return selectedFilters.experience.some(expRange => {
                        if (expRange === "Fresher (0-1 Yrs)") return exp <= 1;
                        if (expRange === "1-3 Yrs") return exp > 1 && exp <= 3;
                        if (expRange === "3-5 Yrs") return exp > 3 && exp <= 5;
                        if (expRange === "5+ Yrs") return exp > 5;
                        return false;
                    });
                });
            }

            setFilterJobs(filtered);
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [allJobs, searchInput, selectedFilters]);

    // Gather flat array of active pills to render
    const activePills = [];
    if (searchInput) {
        activePills.push({ id: 'search', type: 'search', label: `Search: "${searchInput}"`, value: searchInput });
    }
    Object.entries(selectedFilters).forEach(([key, values]) => {
        values.forEach(val => {
            activePills.push({ id: `${key}-${val}`, type: key, label: val, value: val });
        });
    });

    const removePill = (pill) => {
        if (pill.type === 'search') {
            setSearchInput("");
            dispatch(setSearchedQuery(""));
        } else {
            setSelectedFilters(prev => ({
                ...prev,
                [pill.type]: prev[pill.type].filter(v => v !== pill.value)
            }));
        }
    };

    const hasAnyFilter = activePills.length > 0;

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
                                    onClick={() => {
                                        setSearchInput("");
                                        dispatch(setSearchedQuery(""));
                                    }}
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
                                {isLoading ? "Searching..." : `${filterJobs.length} ${filterJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Found`}
                            </span>
                        </div>
                        {hasAnyFilter && (
                            <button
                                onClick={handleClearAll}
                                className="text-xs font-extrabold text-slate-505 hover:text-red-500 dark:text-slate-405 dark:hover:text-red-400 transition flex items-center gap-1 bg-transparent"
                            >
                                <RotateCcw size={12} />
                                <span>Reset All Filters</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 items-start mt-4'>
                    
                    {/* Desktop Filter Sidebar - Sticky on left */}
                    <div className='hidden lg:block lg:w-1/4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-2 shrink-0 custom-scrollbar'>
                        <FilterCard 
                            selectedFilters={selectedFilters}
                            onToggleFilter={handleToggleFilter}
                            onClearAll={handleClearAll}
                            getOptionCount={getOptionCount}
                        />
                    </div>

                    {/* Jobs Container */}
                    <div className="flex-1 w-full min-w-0">
                        {/* Active filter pills */}
                        <AnimatePresence>
                            {activePills.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-wrap items-center gap-2 mb-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 p-3 rounded-2xl"
                                >
                                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">Active:</span>
                                    {activePills.map((pill) => {
                                        const isSearch = pill.type === 'search';
                                        const pillColorClass = isSearch
                                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                            : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
                                        
                                        return (
                                            <motion.div
                                                key={pill.id}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm transition-all duration-200 ${pillColorClass}`}
                                            >
                                                <span>{pill.label}</span>
                                                <button
                                                    onClick={() => removePill(pill)}
                                                    className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition"
                                                >
                                                    <X size={12} className="stroke-[2.5]" />
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                    <button
                                        onClick={handleClearAll}
                                        className="text-xs font-extrabold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-405 ml-auto transition flex items-center gap-1 bg-transparent hover:scale-102"
                                    >
                                        <RotateCcw size={12} />
                                        <span>Clear All</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {
                            isLoading ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-10'>
                                    {
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <JobCardSkeleton key={index} />
                                        ))
                                    }
                                </div>
                            ) : filterJobs.length <= 0 ? (
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
                                                Try adjusting your search query or selecting other filters to discover open roles.
                                            </p>
                                        </div>
                                        <Button 
                                            onClick={handleClearAll}
                                            className="bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 font-bold py-2.5 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 border-0"
                                        >
                                            Reset Filters & Search
                                        </Button>
                                    </motion.div>
                                </div>
                            ) : (
                                <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-10'
                                >
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                variants={cardVariants}
                                                key={job?._id}
                                                className="h-full"
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Floating Mobile Filter Trigger Button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-cyan-500 text-slate-950 font-extrabold shadow-xl shadow-cyan-500/20 dark:shadow-cyan-950/40 border-0"
                >
                    <SlidersHorizontal size={18} />
                    <span>Filters</span>
                    {activePills.length > 1 && (
                        <span className="bg-slate-950 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center shrink-0">
                            {activePills.filter(p => p.type !== 'search').length}
                        </span>
                    )}
                </motion.button>
            </div>

            {/* Mobile Filter Drawer Slide-Over Panel */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                        />
                        {/* Drawer body sheet */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85vw] sm:w-[380px] bg-slate-50 dark:bg-[#020817] z-50 p-5 shadow-2xl flex flex-col gap-4 overflow-y-auto lg:hidden border-l border-slate-200 dark:border-white/10"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5">
                                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Filters</h3>
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="p-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition bg-transparent"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto mt-2 custom-scrollbar">
                                <FilterCard 
                                    selectedFilters={selectedFilters}
                                    onToggleFilter={handleToggleFilter}
                                    onClearAll={handleClearAll}
                                    getOptionCount={getOptionCount}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Jobs;