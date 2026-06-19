import React, { useState } from 'react'
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Mumbai", "Kolkata", "Indore", "Chennai", "Noida", "Remote"]
    },
    {
        filterType: "Job Type",
        array: ["Full Time", "Internship", "Remote", "Hybrid", "Contract"]
    },
    {
        filterType: "Salary",
        array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"]
    },
    {
        filterType: "Experience",
        array: ["Fresher (0-1 Yrs)", "1-3 Yrs", "3-5 Yrs", "5+ Yrs"]
    }
]

const FilterCard = ({ selectedFilters = {}, onToggleFilter, onClearAll, getOptionCount }) => {
    const { allJobs } = useSelector(store => store.job);
    const isInitialLoad = !allJobs || allJobs.length === 0;

    // Location, Job Type, Salary, Experience open by default.
    const [expanded, setExpanded] = useState({
        "Location": true,
        "Job Type": true,
        "Salary": true,
        "Experience": true
    });

    // Expand state for Show More/Less toggle (mapped by category type)
    const [showAllOptions, setShowAllOptions] = useState({
        "Location": false,
       "Job Type": false,
        "Salary": false,
        "Experience": false
    });

    const toggleExpand = (category) => {
        setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const toggleShowAllOptions = (category) => {
        setShowAllOptions(prev => ({ ...prev, [category]: !prev[category] }));
    };

    // Helper to see if any sidebar filter is active
    const hasActiveFilters = Object.values(selectedFilters).some(arr => arr && arr.length > 0);

    const getFilterKey = (category) => {
    const keyMap = {
        "Location": "location",
        "Job Type": "jobType",
        "Salary": "salary",
        "Experience": "experience"
    };

    return keyMap[category];
};

    return (
        <div className='w-full bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-slate-200/80 dark:border-white/5 text-slate-900 dark:text-slate-100 transition-all duration-300 select-none relative overflow-hidden'>
            {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-2xl z-0" />
            
            <div className="relative z-10">
            <div className='flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/5'>
                <div className="flex flex-col text-left">
                    <h1 className='font-bold text-lg text-slate-900 dark:text-white leading-tight'>Filters</h1>
                    <span className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold uppercase mt-0.5 tracking-wider">Refine Opportunities</span>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onClearAll}
                        className="inline-flex items-center gap-1 h-8 px-3 text-xs font-semibold border border-slate-200 dark:border-white/10 hover:border-red-300 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-600 dark:text-slate-300 hover:text-red-650 dark:hover:text-red-400 rounded-full transition duration-300 bg-transparent"
                    >
                        <RotateCcw size={11} />
                        <span>Reset</span>
                    </button>
                )}
            </div>
            
            <div className="space-y-4 mt-5">
                {filterData.map((data, index) => {
                    const isOpen = expanded[data.filterType];
                    const key = getFilterKey(data.filterType);
                    const activeArray = selectedFilters[key] || [];

                    // Filter list to keep only options with count > 0 OR actively selected
                    // Bypass during initial load to prevent flashing of sidebar layout
                    const validOptions = isInitialLoad
                        ? data.array
                        : data.array.filter(item => {
                            const active = activeArray.includes(item);
                            const count = getOptionCount ? getOptionCount(data.filterType, item) : 0;
                            return count > 0 || active;
                        });

                    // Hide filter group entirely if there are 0 valid options matching jobs
                    if (validOptions.length === 0) return null;

                    // Apply pagination / limits to chips display
                    const isShowAll = showAllOptions[data.filterType];
                    let visibleOptions = [];

                    if (isShowAll) {
                        visibleOptions = validOptions;
                    } else {
                        visibleOptions = validOptions.slice(0, 5);
                        // Make sure active selections are always visible
                        validOptions.forEach(item => {
                            if (activeArray.includes(item) && !visibleOptions.includes(item)) {
                                visibleOptions.push(item);
                            }
                        });
                    }

                    return (
                        <div key={index} className="border-b border-slate-100/50 dark:border-white/5 pb-4 last:border-b-0 last:pb-0">
                            <div 
                                className="flex items-center justify-between cursor-pointer py-1 group" 
                                onClick={() => toggleExpand(data.filterType)}
                            >
                                <h2 className='font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors flex items-center gap-1.5'>
                                    <span>{data.filterType}</span>
                                    <span className="text-[10px] text-slate-500/80 normal-case font-semibold">({validOptions.length})</span>
                                    {activeArray.length > 0 && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                    )}
                                </h2>
                                <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </span>
                            </div>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className='flex flex-wrap gap-2 pt-3 pb-1'>
                                            {visibleOptions.map((item, idx) => {
                                                const active = activeArray.includes(item);
                                                const count = getOptionCount ? getOptionCount(data.filterType, item) : 0;
                                                const hasJobs = count > 0;

                                                return (
                                                    <button
                                                        key={`${data.filterType}-${idx}`}
                                                        onClick={() => onToggleFilter(data.filterType, item)}
                                                        className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold rounded-xl cursor-pointer border transition-all duration-300 select-none gap-1 ${
                                                            active
                                                                ? "bg-gradient-to-r from-amber-500/10 to-cyan-500/10 border-cyan-400 dark:border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.02]"
                                                                : hasJobs
                                                                    ? "bg-slate-100 dark:bg-white/5 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-200/60 dark:hover:bg-white/10"
                                                                    : "bg-slate-50/50 dark:bg-white/2 border-slate-200/40 dark:border-white/2 text-slate-400/60 dark:text-slate-600 hover:border-slate-300 dark:hover:border-white/8 hover:bg-slate-100/50 dark:hover:bg-white/5"
                                                        }`}
                                                    >
                                                        <span>{item}</span>
                                                        <span className={`text-[9px] font-semibold ${
                                                            active 
                                                                ? "text-cyan-600 dark:text-cyan-400" 
                                                                : hasJobs
                                                                    ? "text-slate-400 dark:text-slate-500" 
                                                                    : "text-slate-300 dark:text-slate-700"
                                                        }`}>
                                                            ({count})
                                                        </span>
                                                    </button>
                                                )
                                              })}
                                        </div>
                                        {/* Show More / Show Less Pagination Button */}
                                        {validOptions.length > 5 && (
                                            <button
                                                onClick={() => toggleShowAllOptions(data.filterType)}
                                                className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mt-2 block bg-transparent text-left py-1 hover:underline transition-colors cursor-pointer"
                                            >
                                                {isShowAll ? "- Show less" : `+ Show more (${validOptions.length - 5} more)`}
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
    )
}

export default FilterCard