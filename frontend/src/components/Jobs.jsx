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
import Prism from './Prism';
import Grainient from './Grainient';

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

    // Detect theme from html element's dark class dynamically
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    // Local search text input synced with Redux searchedQuery
    const [searchInput, setSearchInput] = useState(searchedQuery || "");

    // Local filter state for sidebar selections
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
        <div className="bg-[#FAFBFC] dark:bg-[#08070d] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative">
            {/* ── BACKGROUND LAYER: Dynamically swaps to only keep ONE WebGL context alive at a time ── */}
            {isDark ? (
                /* ── DARK MODE ONLY: Prism WebGL spectral background ── */
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.92 }}>
                        <Prism
                            animationType="rotate"
                            timeScale={0.4}
                            height={3.5}
                            baseWidth={5.5}
                            scale={3.6}
                            hueShift={0}
                            colorFrequency={1}
                            noise={0.02}
                            glow={1.1}
                            bloom={1.15}
                            transparent={true}
                        />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(8, 7, 13, 0.62)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '110%', height: '42%', background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(14,165,233,0.55) 0%, rgba(56,189,248,0.28) 40%, transparent 75%)', filter: 'blur(2px)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '55%', background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(245,158,11,0.13) 0%, rgba(250,204,21,0.07) 50%, transparent 80%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '15%', left: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse 80% 80% at 10% 50%, rgba(6,182,212,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '35%', height: '50%', background: 'radial-gradient(ellipse 80% 80% at 90% 40%, rgba(20,184,166,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,7,13,0.75) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, rgba(8,7,13,0.80) 0%, transparent 100%)', pointerEvents: 'none' }} />
                </div>
            ) : (
                /* ── LIGHT MODE: Grainient WebGL premium animated background ── */
                <div className="fixed inset-0 pointer-events-none z-0">
                    <Grainient
                        color1="#FACC15"
                        color2="#38BDF8"
                        color3="#F8FAFC"
                        timeSpeed={0.18}
                        colorBalance={0.25}
                        warpStrength={0.8}
                        warpFrequency={3.5}
                        warpSpeed={1.2}
                        warpAmplitude={65}
                        blendAngle={-20}
                        blendSoftness={0.12}
                        rotationAmount={280}
                        noiseScale={1.6}
                        grainAmount={0.035}
                        grainScale={1.4}
                        grainAnimated={false}
                        contrast={1.12}
                        gamma={1.0}
                        saturation={0.95}
                        centerX={0}
                        centerY={-0.08}
                        zoom={1.05}
                        className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/35 to-white/70 pointer-events-none" />
                </div>
            )}

            <Navbar />

            {/* ── FIXED SEARCH BAND ── fixed below Navbar, always visible at all scroll positions */}
            <div className="fixed top-[80px] left-0 right-0 z-30 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-3 backdrop-blur-xl bg-white/80 dark:bg-[#08070d]/80 border-b border-slate-200/60 dark:border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                        {/* Search input */}
                        <div className="relative group w-full max-w-4xl mx-auto">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-sky-400 to-cyan-400 rounded-full blur opacity-10 group-focus-within:opacity-35 group-hover:opacity-20 transition duration-500" />
                            <div className="relative flex items-center bg-white dark:bg-[#0c1220]/90 border border-slate-200 dark:border-white/10 rounded-full px-5 py-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.07)] dark:shadow-none group-focus-within:border-transparent transition-all duration-300">
                                <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, companies, or locations..."
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
                                        <X className="h-4 w-4 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results count & reset row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 px-1.5 pt-2.5 max-w-4xl mx-auto">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                                    {isLoading ? "Searching..." : `${filterJobs.length} ${filterJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Found`}
                                </span>
                            </div>
                            {hasAnyFilter && (
                                <button
                                    onClick={handleClearAll}
                                    className="text-xs font-semibold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition flex items-center gap-1 bg-transparent"
                                >
                                    <RotateCcw size={12} />
                                    <span>Reset All Filters</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT: filters (sticky) + job cards (scrollable) ── */}
            {/* Content pushed down to clear Navbar (80px) + Search band (~76px) */}
            <div className='max-w-7xl mx-auto pt-[160px] px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='flex flex-col lg:flex-row gap-8 items-start'>

                    {/* ── Desktop Filter Sidebar — sticky below the search band ── */}
                    {/* Filter sidebar: sticky below the fixed search band */}
                    <div className='hidden lg:block w-72 shrink-0 sticky top-[236px] h-[calc(100vh-15rem)] overflow-y-auto pr-1 custom-scrollbar'>
                        <FilterCard
                            selectedFilters={selectedFilters}
                            onToggleFilter={handleToggleFilter}
                            onClearAll={handleClearAll}
                            getOptionCount={getOptionCount}
                        />
                    </div>

                    {/* ── Job Cards column — the only thing that scrolls ── */}
                    <div className="flex-1 w-full min-w-0 pb-10">
                        {/* Active filter pills */}
                        <AnimatePresence>
                            {activePills.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-wrap items-center gap-2 mb-6 bg-white/85 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 p-3 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.03)] backdrop-blur-sm"
                                >
                                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">Active:</span>
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
                                                    className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition bg-transparent"
                                                >
                                                    <X size={12} className="stroke-[2.5]" />
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                    <button
                                        onClick={handleClearAll}
                                        className="text-xs font-semibold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 ml-auto transition flex items-center gap-1 bg-transparent hover:scale-[1.02]"
                                    >
                                        <RotateCcw size={12} />
                                        <span>Clear All</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {
                            isLoading ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                                    {
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <JobCardSkeleton key={index} />
                                        ))
                                    }
                                </div>
                            ) : filterJobs.length <= 0 ? (
                                <div className="bg-white/85 dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200 dark:border-white/10 rounded-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-10 px-4 text-center max-w-md mx-auto space-y-6"
                                    >
                                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative">
                                            <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 animate-pulse" />
                                            <FileSearch className="h-9 w-9 relative z-10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-xl text-slate-900 dark:text-white">No Matching Opportunities Found</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                                Try adjusting your search query or selecting other filters to discover open roles.
                                            </p>
                                        </div>
                                        <Button
                                            onClick={handleClearAll}
                                            className="bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 border-0"
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
                                    className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
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
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-cyan-500 text-slate-950 font-semibold shadow-xl shadow-cyan-500/20 dark:shadow-cyan-950/40 border-0"
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
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Filters</h3>
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