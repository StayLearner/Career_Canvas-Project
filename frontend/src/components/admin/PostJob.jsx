import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Loader2, ArrowLeft, ArrowRight, Briefcase, MapPin, 
    DollarSign, Layers, Check, ShieldCheck, X, Building2
} from 'lucide-react'

const CompanyLogo = ({ logo, name }) => {
    const [broken, setBroken] = useState(false);
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    
    if (!logo || broken) {
        return (
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-sky-405 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md select-none shrink-0">
                {initials}
            </div>
        );
    }
    return (
        <img 
            src={logo} 
            alt={name} 
            onError={() => setBroken(true)}
            className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-white/10 shadow-sm shrink-0"
        />
    );
};

const PostJob = () => {
    const [step, setStep] = useState(1);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Calculate dynamic completion percentage
    const getCompletionPercentage = () => {
        let completed = 0;
        let total = 9;
        if (input.title.trim()) completed++;
        if (input.description.trim()) completed++;
        if (input.requirements.trim()) completed++;
        if (input.location.trim()) completed++;
        if (input.jobType.trim()) completed++;
        if (input.experience.trim()) completed++;
        if (input.salary.trim() && Number(input.salary) > 0) completed++;
        if (Number(input.position) > 0) completed++;
        if (input.companyId) completed++;
        return Math.round((completed / total) * 100);
    };

    const completionPercent = getCompletionPercentage();

    // Split requirements into list array for preview/chips
    const requirementsList = input.requirements
        ? input.requirements.split(',').map(r => r.trim()).filter(Boolean)
        : [];

    const handleAddRequirement = (skill) => {
        if (!skill.trim()) return;
        const current = input.requirements 
            ? input.requirements.split(',').map(r => r.trim()).filter(Boolean)
            : [];
        if (!current.includes(skill.trim())) {
            const updated = [...current, skill.trim()].join(', ');
            setInput({ ...input, requirements: updated });
        }
    };

    const handleRemoveRequirement = (indexToRemove) => {
        const current = input.requirements.split(',').map(r => r.trim()).filter(Boolean);
        const updated = current.filter((_, idx) => idx !== indexToRemove).join(', ');
        setInput({ ...input, requirements: updated });
    };

    const handleKeyDownSkill = (e) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            const val = e.target.value.replace(/,/g, '');
            if (val.trim()) {
                handleAddRequirement(val);
                e.target.value = '';
            }
        }
    };

    const submitHandler = async (e) => {
        if (e) e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company in Step 4");
            setStep(4);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Job post failed");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        // Validation per step
        if (step === 1) {
            if (!input.title.trim()) {
                toast.error("Job Title is required");
                return;
            }
            if (!input.description.trim()) {
                toast.error("Job Description is required");
                return;
            }
        } else if (step === 2) {
            if (!input.requirements.trim()) {
                toast.error("At least one requirement/skill is required");
                return;
            }
            if (!input.location.trim()) {
                toast.error("Location is required");
                return;
            }
            if (!input.jobType.trim()) {
                toast.error("Job Type is required");
                return;
            }
            if (input.experience === "" || input.experience === undefined || input.experience === null) {
                toast.error("Experience Level is required");
                return;
            }
            if (isNaN(input.experience) || Number(input.experience) < 0) {
                toast.error("Experience Level must be a positive number of years");
                return;
            }
        } else if (step === 3) {
            if (!input.salary.trim() || Number(input.salary) <= 0) {
                toast.error("Salary must be a positive number");
                return;
            }
            if (Number(input.position) <= 0) {
                toast.error("Number of openings must be greater than 0");
                return;
            }
        } else if (step === 4) {
            if (!input.companyId) {
                toast.error("Please select a company workspace");
                return;
            }
        }
        setStep(prev => Math.min(prev + 1, 5));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    const stepItems = [
        { label: "Job Basics", num: 1 },
        { label: "Requirements", num: 2 },
        { label: "Compensation", num: 3 },
        { label: "Company Selection", num: 4 },
        { label: "Publish", num: 5 }
    ];

    const selectedCompanyObj = companies.find(c => c._id === input.companyId);

    // Progress Sidebar component
const ProgressSidebar = () => (
        <div className="bg-white/95 dark:bg-[#0F172A] border border-slate-200/95 dark:border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-left space-y-6">
            <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-base">
                    Job Posting Progress
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Complete all steps to publish the listing.</p>
            </div>
            
            {/* Completion percentage bar */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 uppercase tracking-wider">Job Completion</span>
                    <span className="text-cyan-600 dark:text-cyan-405 font-bold">{completionPercent}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-white/[0.08] overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-sky-400 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completionPercent}%` }}
                    />
                </div>
            </div>

            {/* Step checklist details */}
            <div className="space-y-4 pt-2">
                {stepItems.map((item) => {
                    const isDone = step > item.num;
                    const isCurrent = step === item.num;
                    
                    return (
                        <button 
                            type="button"
                            key={item.num} 
                            onClick={() => {
                                if (item.num <= step || isDone) {
                                    setStep(item.num);
                                }
                            }}
                            disabled={item.num > step && !isDone}
                            className={`w-full flex items-center gap-3 text-sm font-semibold transition text-left focus:outline-none ${
                                isCurrent ? 'text-sky-500 font-bold scale-[1.01]' : 
                                isDone ? 'text-slate-500 dark:text-slate-400 cursor-pointer' : 
                                'text-slate-400 opacity-60'
                            }`}
                        >
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition ${
                                isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 
                                isCurrent ? 'bg-sky-500 border-sky-550 text-white shadow-[0_0_8px_rgba(56,189,248,0.3)]' : 
                                'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/[0.08] text-slate-400'
                            }`}>
                                {isDone ? <Check className="h-3 w-3" /> : item.num}
                            </div>
                            <span>
                                {isDone ? '✓ ' : isCurrent ? '● ' : '○ '}
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-amber-50/30 dark:bg-none dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-28 relative overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-7xl mx-auto pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8">
                
                {/* Wizard Page Header */}
                <div className="flex items-center gap-4 text-left mb-6">
                    <Button 
                        onClick={() => navigate("/admin/jobs")} 
                        type="button" 
                        variant="outline" 
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 border border-slate-200 dark:border-white/[0.08] rounded-full font-semibold px-4 h-10 shadow-sm transition shrink-0"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Cancel</span>
                    </Button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">Create Listing</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Launch a brand new job opening to match qualified candidate profiles.</p>
                    </div>
                </div>

                {companies.length === 0 ? (
                    /* Warning state if no companies registered */
                    <div className="bg-white/95 dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 rounded-3xl p-8 text-center max-w-2xl mx-auto mt-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
                        <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                            <Building2 className="h-6 w-6 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-955 dark:text-white mb-2">Create a company before posting a job</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            You must register at least one company brand workspace before you can publish any employment listings.
                        </p>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl border-0 shadow"
                        >
                            Register Company Brand
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                                        {/* Horizontal Progress Tracker */}
                        <div className="w-full bg-white/95 dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] mb-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2">
                                {stepItems.map((item, idx) => {
                                    const isDone = step > item.num;
                                    const isCurrent = step === item.num;
                                    const isUpcoming = step < item.num;

                                    return (
                                        <div key={item.num} className="flex items-center flex-1 last:flex-none">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (item.num <= step || isDone) {
                                                        setStep(item.num);
                                                    }
                                                }}
                                                disabled={item.num > step && !isDone}
                                                className={`flex items-center gap-3 text-left focus:outline-none transition-all ${
                                                    isCurrent ? 'text-sky-500 font-bold scale-[1.01]' :
                                                    isDone ? 'text-emerald-500 font-semibold' :
                                                    'text-slate-500 dark:text-slate-500 font-medium'
                                                }`}
                                            >
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 ${
                                                    isDone ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]' :
                                                    isCurrent ? 'bg-sky-500 border-sky-550 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]' :
                                                    'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-white/[0.08] text-slate-500'
                                                }`}>
                                                    {isDone ? <Check className="h-4 w-4" /> : item.num}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase tracking-widest leading-none font-semibold">
                                                        {isDone ? '✓ Completed' : isCurrent ? '● Active' : '○ Upcoming'}
                                                    </span>
                                                    <span className="text-sm mt-0.5 leading-tight">{item.label}</span>
                                                </div>
                                            </button>
                                            {idx < stepItems.length - 1 && (
                                                <div className="hidden md:block flex-1 mx-4 h-[2px] bg-slate-200 dark:bg-white/[0.08] relative overflow-hidden">
                                                    <motion.div 
                                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-sky-400"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: isDone ? "100%" : "0%" }}
                                                        transition={{ duration: 0.4 }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Split Workspace Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Progress Sidebar on Mobile (moves above form content) */}
                            <div className="block lg:hidden w-full">
                                <ProgressSidebar />
                            </div>

                            {/* Left Side: Dynamic Wizard Form Area */}
                            <div className="lg:col-span-8 flex flex-col gap-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white/95 dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-left"
                                    >                                         {/* STEP 1: JOB BASICS */}
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <span className="text-[10px] font-bold text-sky-655 bg-sky-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 1 of 5</span>
                                                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white mt-3">Job Basics</h2>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Describe the role candidates will apply for.</p>
                                                </div>

                                                <div className="space-y-5 pt-2">
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="title" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Job Title *</Label>
                                                        <div className="relative">
                                                            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-450" />
                                                            <Input
                                                                id="title"
                                                                type="text"
                                                                name="title"
                                                                value={input.title}
                                                                onChange={changeEventHandler}
                                                                placeholder="e.g. Senior Backend Engineer"
                                                                className="h-12 pl-11 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="description" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Description *</Label>
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            value={input.description}
                                                            onChange={changeEventHandler}
                                                            placeholder="State job roles, responsibilities, team scope..."
                                                            rows={6}
                                                            className="w-full p-4 text-sm border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus:ring-2 focus:ring-sky-300/50 focus:border-sky-400 focus:outline-none text-slate-900 dark:text-slate-100 rounded-xl transition"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2: REQUIREMENTS */}
                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <span className="text-[10px] font-bold text-sky-655 bg-sky-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 2 of 5</span>
                                                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white mt-3">Requirements & Expectations</h2>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Specify necessary credentials and place parameters.</p>
                                                </div>

                                                <div className="space-y-5 pt-2">
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="skill-input" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Skills *</Label>
                                                        <Input
                                                            id="skill-input"
                                                            type="text"
                                                            placeholder="Type a skill and press Enter or Comma..."
                                                            onKeyDown={handleKeyDownSkill}
                                                            className="h-12 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                        />
                                                        <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">Press enter or type comma to separate skills.</p>
                                                        
                                                        {/* Interactive chips display */}
                                                        {requirementsList.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 pt-2 border border-slate-200 dark:border-white/[0.08] p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/10 mt-2">
                                                                {requirementsList.map((skill, idx) => (
                                                                    <div key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25">
                                                                        <span>{skill}</span>
                                                                        <button 
                                                                            type="button" 
                                                                            onClick={() => handleRemoveRequirement(idx)} 
                                                                            className="hover:bg-sky-500/20 rounded-full p-0.5 transition bg-transparent"
                                                                        >
                                                                            <X size={12} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="experience" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Experience Level *</Label>
                                                            <Input
                                                                id="experience"
                                                                type="number"
                                                                name="experience"
                                                                value={input.experience}
                                                                onChange={changeEventHandler}
                                                                placeholder="e.g. 3 (Years)"
                                                                min="0"
                                                                className="h-12 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="location" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Location *</Label>
                                                            <Input
                                                                id="location"
                                                                type="text"
                                                                name="location"
                                                                value={input.location}
                                                                onChange={changeEventHandler}
                                                                placeholder="e.g. Remote or Noida, IN"
                                                                className="h-12 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="jobType" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Job Type *</Label>
                                                            <Input
                                                                id="jobType"
                                                                type="text"
                                                                name="jobType"
                                                                value={input.jobType}
                                                                onChange={changeEventHandler}
                                                                placeholder="Full-time / Internship"
                                                                className="h-12 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3: COMPENSATION */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <span className="text-[10px] font-bold text-sky-655 bg-sky-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 3 of 5</span>
                                                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white mt-3">Compensation & Hiring</h2>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure compensation rates and position parameters.</p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                                    <div className="space-y-5">
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="salary" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Salary *</Label>
                                                            <div className="relative">
                                                                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-450" />
                                                                <Input
                                                                    id="salary"
                                                                    type="text"
                                                                    name="salary"
                                                                    value={input.salary}
                                                                    onChange={changeEventHandler}
                                                                    placeholder="e.g. 15"
                                                                    className="h-12 pl-10 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label htmlFor="position" className="text-xs font-semibold text-slate-705 dark:text-slate-300">Open Positions *</Label>
                                                            <div className="relative">
                                                                <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-450" />
                                                                <Input
                                                                    id="position"
                                                                    type="number"
                                                                    name="position"
                                                                    value={input.position}
                                                                    onChange={changeEventHandler}
                                                                    placeholder="e.g. 5"
                                                                    className="h-12 pl-10 border border-slate-305 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 rounded-xl"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Live visual statistics preview box */}
                                                    <div className="bg-gradient-to-br from-white via-sky-50/60 to-amber-50/50 dark:bg-[#1E293B] border border-slate-200 rounded-3xl p-6 flex flex-col justify-center gap-4 text-center shadow-sm">
                                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Compensation Preview</span>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="p-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-sm">
                                                                <span className="text-xs text-slate-400 block font-medium">Salary</span>
                                                                <p className="text-lg font-bold text-slate-950 dark:text-white mt-0.5">₹{input.salary || '0'} LPA</p>
                                                            </div>
                                                            <div className="p-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-sm">
                                                                <span className="text-xs text-slate-400 block font-medium">Positions</span>
                                                                <p className="text-lg font-bold text-slate-955 dark:text-white mt-0.5">{input.position || '0'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 4: COMPANY WORKSPACE */}
                                        {step === 4 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <span className="text-[10px] font-bold text-sky-655 bg-sky-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 4 of 5</span>
                                                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white mt-3">Hiring Company</h2>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Select the company brand workspace that is publishing this opening.</p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-h-[360px] overflow-y-auto pr-1">
                                                    {companies.map((company) => {
                                                        const isSelected = input.companyId === company._id;
                                                        return (
                                                            <div 
                                                                key={company._id}
                                                                onClick={() => setInput({ ...input, companyId: company._id })}
                                                                className={`cursor-pointer border p-4 rounded-2xl flex items-center gap-3.5 transition-all text-left ${
                                                                    isSelected 
                                                                        ? 'border-sky-350 bg-gradient-to-r from-yellow-400/5 to-sky-400/5 ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                                                                        : 'border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                                                                }`}
                                                            >
                                                                <CompanyLogo logo={company.logo} name={company.name} />
                                                                <div className="min-w-0">
                                                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{company.name}</p>
                                                                    <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">
                                                                        <MapPin className="h-3 w-3 shrink-0 text-sky-400" />
                                                                        <span className="truncate">{company.location || 'Location not set'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 5: REVIEW */}
                                        {step === 5 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <span className="text-[10px] font-bold text-sky-655 bg-sky-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 5 of 5</span>
                                                    <h2 className="text-2xl font-bold text-slate-955 dark:text-white mt-3">Ready to publish</h2>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review the final summary below before launching your opportunity live.</p>
                                                </div>

                                                {/* Summary card display */}
                                                <div className="border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden bg-white dark:bg-[#0F172A] shadow-lg">
                                                    <div className="bg-gradient-to-r from-yellow-400/10 via-sky-400/5 to-transparent p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <CompanyLogo logo={selectedCompanyObj?.logo} name={selectedCompanyObj?.name} />
                                                            <div className="text-left">
                                                                <h4 className="font-bold text-slate-950 dark:text-white text-base leading-tight">{input.title}</h4>
                                                                <p className="text-xs text-slate-505 dark:text-slate-400 mt-0.5">{selectedCompanyObj?.name || 'Company Name'}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20 uppercase tracking-widest shrink-0">
                                                            Review
                                                        </span>
                                                    </div>

                                                    <div className="p-5 space-y-4 text-sm text-left">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-0.5">
                                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Location</span>
                                                                <p className="font-semibold text-slate-700 dark:text-slate-200">{input.location}</p>
                                                            </div>
                                                            <div className="space-y-0.5">
                                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Job Placement</span>
                                                                <p className="font-semibold text-slate-700 dark:text-slate-200 capitalize">{input.jobType}</p>
                                                            </div>
                                                            <div className="space-y-0.5">
                                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Experience Level</span>
                                                                <p className="font-semibold text-slate-700 dark:text-slate-200">{input.experience}</p>
                                                            </div>
                                                            <div className="space-y-0.5">
                                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Position Count</span>
                                                                <p className="font-semibold text-slate-700 dark:text-slate-200">{input.position} positions</p>
                                                            </div>
                                                            <div className="space-y-0.5 col-span-2 border-t border-slate-100 dark:border-white/[0.08] pt-3">
                                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Salary</span>
                                                                <p className="font-bold text-lg text-emerald-600 dark:text-emerald-450">₹{input.salary} LPA</p>
                                                            </div>
                                                        </div>

                                                        {requirementsList.length > 0 && (
                                                            <div className="border-t border-slate-100 dark:border-white/[0.08] pt-3 space-y-1.5">
                                                                <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider block">Skills</span>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {requirementsList.map((skill, idx) => (
                                                                        <span key={idx} className="text-[10px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.08] px-2.5 py-0.5 rounded-full text-slate-700 dark:text-slate-300">
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                                
                                {/* Bottom navigation action bar - Sticky at bottom */}
                                <div className="sticky bottom-4 z-20 bg-white/95 dark:bg-[#0F172A]/90 backdrop-blur-md border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-between items-center gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={step === 1 || loading}
                                        className="px-5 py-2.5 h-11 border border-slate-200 text-slate-700 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 rounded-xl font-semibold transition flex items-center gap-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Back</span>
                                    </Button>
                                    
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsPreviewOpen(true)}
                                            className="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-750 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 rounded-xl transition bg-transparent cursor-pointer"
                                        >
                                            Preview
                                        </button>

                                        {step < 5 ? (
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="px-5 py-2.5 h-11 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-bold rounded-xl shadow border-0 transition flex items-center justify-center gap-2"
                                            >
                                                <span>Continue</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            loading ? (
                                                <Button disabled className="px-6 py-2.5 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.08] text-slate-400 flex items-center justify-center gap-2 font-bold">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Publishing...</span>
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={submitHandler}
                                                    className="px-6 py-2.5 h-11 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-bold rounded-xl shadow transition border-0 flex items-center gap-2"
                                                >
                                                    <span>Publish Job</span>
                                                    <ShieldCheck className="h-4.5 w-4.5" />
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Sticky Progress Sidebar (Desktop Only) */}
                            <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                                <ProgressSidebar />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Candidate View Preview Modal */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        />
                              {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.15)] overflow-y-auto max-h-[85vh] text-left z-10"
                        >
                            <button
                                type="button"
                                onClick={() => setIsPreviewOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full text-slate-450 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-white/5 transition bg-transparent border-0 cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
                                    <CompanyLogo logo={selectedCompanyObj?.logo} name={selectedCompanyObj?.name} />
                                    <div>
                                        <span className="text-[10px] font-bold text-sky-505 bg-sky-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            {input.jobType || "Job Type"}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-950 dark:text-white mt-1.5 leading-tight">
                                            {input.title || "Untitled Job Opening"}
                                        </h3>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-400 mt-0.5">
                                            {selectedCompanyObj?.name || "Company Name"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08]">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider block">Salary</span>
                                        <span className="font-bold text-sm text-emerald-650 dark:text-emerald-400">₹{input.salary || "0"} LPA</span>
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Location</span>
                                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 truncate block">{input.location || "Not specified"}</span>
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] text-slate-405 font-semibold uppercase tracking-wider block">Experience</span>
                                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 truncate block">{input.experience || "Not specified"}</span>
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] text-slate-405 font-semibold uppercase tracking-wider block">Openings</span>
                                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 block">{input.position || "0"} Positions</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Role Description</h4>
                                    <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {input.description || "No description provided yet."}
                                    </p>
                                </div>

                                {requirementsList.length > 0 && (
                                    <div className="space-y-2 border-t border-slate-100 dark:border-white/[0.08] pt-6">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills & Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {requirementsList.map((skill, idx) => (
                                                <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="border-t border-slate-100 dark:border-white/[0.08] pt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="px-6 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-sm hover:opacity-90 transition border-0 cursor-pointer"
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PostJob;