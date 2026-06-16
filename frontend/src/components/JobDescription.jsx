import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Users, 
  BadgeCheck, 
  ArrowRight, 
  Calendar, 
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Loader2
} from 'lucide-react';

const JobDescription = () => {
    const { singleJob, allJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isApplied, setIsApplied] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [logoError, setLogoError] = useState(false);

    // Initialize application state
    useEffect(() => {
        if (singleJob && user) {
            const hasApplied = singleJob.applications?.some(app => app.applicant === user._id) || false;
            setIsApplied(hasApplied);
        }
    }, [singleJob, user]);

    // Fetch single job details
    useEffect(() => {
        const fetchSingleJob = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    if (user) {
                        setIsApplied(res.data.job.applications.some(app => app.applicant === user._id));
                    }
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to load job details");
            } finally {
                setIsLoading(false);
            }
        }
        fetchSingleJob(); 
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        try {
            if (!user) {
                toast.error("Please login to apply for this job");
                navigate("/login");
                return;
            }
            setIsApplying(true);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
                withCredentials: true
            });            
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...(singleJob?.applications || []), { applicant: user._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsApplying(false);
        }
    }

    // Attempt to locate fully populated company object from allJobs list if available
    const jobFromAll = allJobs?.find(j => j._id === jobId);
    const company = (typeof singleJob?.company === 'object') 
        ? singleJob?.company 
        : (jobFromAll?.company || { name: "Canvas Employer", logo: "" });

    const companyName = company?.name || "Company";
    const initials = companyName
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || "CO";

    // Hash-based avatar gradient class matching Job.jsx cards
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

    // Normalize requirements string list or array
    const requirements = Array.isArray(singleJob?.requirements)
        ? singleJob.requirements
        : typeof singleJob?.requirements === 'string'
            ? singleJob.requirements.split(',').map(r => r.trim()).filter(Boolean)
            : [];

    const postedDate = singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : "Recently";

    // RENDER SKELETON LOADER
    if (isLoading || !singleJob) {
        return (
            <div className="bg-gradient-to-br from-slate-50 via-sky-50/50 to-amber-50/40 dark:from-[#020817] dark:to-[#020817] min-h-screen text-slate-800 dark:text-slate-100 font-sans pb-16 relative overflow-x-hidden">
                <Navbar />
                <div className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 animate-pulse select-none">
                    
                    {/* Back Button Skeleton */}
                    <div className="h-5 w-24 bg-slate-200 dark:bg-white/10 rounded-md" />

                    {/* Header Skeleton */}
                    <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-[0_15px_45px_rgba(15,23,42,0.03)]">
                        <div className="h-16 w-16 bg-slate-200 dark:bg-white/10 rounded-2xl shrink-0" />
                        <div className="flex-1 space-y-3 text-center md:text-left w-full">
                            <div className="h-6 w-1/3 bg-slate-200 dark:bg-white/10 rounded-md mx-auto md:mx-0" />
                            <div className="h-4 w-1/4 bg-slate-200 dark:bg-white/5 rounded-md mx-auto md:mx-0" />
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                                <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-lg" />
                                <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-lg" />
                                <div className="h-6 w-20 bg-slate-100 dark:bg-white/5 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content & Sidebar Skeletons */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-48" />
                            <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 h-64" />
                        </div>
                        <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 h-80" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/50 to-amber-50/40 dark:from-[#020817] dark:to-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-28 lg:pb-16 relative overflow-x-hidden">
            <Navbar />

            {/* Mesh background glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-amber-500/5 to-cyan-500/5 dark:from-amber-500/10 dark:to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                
                {/* Back Link */}
                <div className="flex items-center justify-between select-none">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer group"
                    >
                        <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to opportunities</span>
                    </button>
                </div>

                {/* 1. Premium Job Description Header */}
                <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:border-sky-200 dark:hover:border-sky-500/30 hover:shadow-[0_25px_65px_rgba(56,189,248,0.08)] transition-all duration-300 text-left w-full relative group">
                    {/* Fallback image handler */}
                    {company?.logo && !logoError ? (
                        <div className="h-16 w-16 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center bg-white shadow-sm shrink-0 overflow-hidden">
                            <img 
                                src={company.logo} 
                                alt={companyName} 
                                className="h-full w-full object-cover" 
                                onError={() => setLogoError(true)}
                            />
                        </div>
                    ) : (
                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${gradientClass} flex items-center justify-center text-slate-900 dark:text-white shadow-sm shrink-0 font-semibold text-xl select-none border border-slate-200/50 dark:border-transparent`}>
                            {initials}
                        </div>
                    )}

                    <div className="flex-1 space-y-2 min-w-0 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                            <h2 className="font-semibold text-sm text-slate-500 dark:text-slate-400">{companyName}</h2>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-200">
                                <BadgeCheck className="h-3 w-3 text-emerald-600" />
                                Verified Employer
                            </span>
                        </div>
                        <h1 className="font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white leading-tight truncate">{singleJob?.title}</h1>
                        
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1 select-none">
                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-white/5 shadow-sm">
                                <MapPin className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                                <span>{singleJob?.location}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-white/5 shadow-sm">
                                <DollarSign className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                <span>{singleJob?.salary} LPA</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-white/5 shadow-sm">
                                <Briefcase className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                <span>{singleJob?.jobType}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-white/5 shadow-sm">
                                <Calendar className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                <span>Posted {postedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main page split grids */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left details grid section */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 3. Main Details card - Role overview metadata */}
                        <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_18px_55px_rgba(15,23,42,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-sky-200 dark:hover:border-sky-500/20 hover:shadow-[0_25px_65px_rgba(56,189,248,0.08)] transition-all duration-300 text-left space-y-6">
                            <h3 className="font-semibold text-lg sm:text-xl text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                                <Award className="h-5 w-5 text-cyan-500" />
                                <span>Role Overview</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 sm:col-span-2 shadow-sm">
                                    <Briefcase className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider">Role</h4>
                                        <p className="font-medium text-slate-800 dark:text-slate-100 mt-0.5">{singleJob?.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 shadow-sm">
                                    <MapPin className="h-5 w-5 text-cyan-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider">Location</h4>
                                        <p className="font-medium text-slate-800 dark:text-slate-100 mt-0.5">{singleJob?.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 shadow-sm">
                                    <DollarSign className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider">Salary Range</h4>
                                        <p className="font-medium text-slate-800 dark:text-slate-100 mt-0.5">{singleJob?.salary} LPA</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 shadow-sm">
                                    <Clock className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider">Job Placement</h4>
                                        <p className="font-medium text-slate-800 dark:text-slate-100 mt-0.5 capitalize">{singleJob?.jobType}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 shadow-sm">
                                    <TrendingUp className="h-5 w-5 text-pink-500 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider">Experience Level</h4>
                                        <p className="font-medium text-slate-800 dark:text-slate-100 mt-0.5">{singleJob?.experienceLevel ?? 0} Years</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description card */}
                        <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_18px_55px_rgba(15,23,42,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-sky-200 dark:hover:border-sky-500/20 hover:shadow-[0_25px_65px_rgba(56,189,248,0.08)] transition-all duration-300 text-left space-y-4">
                            <h3 className="font-semibold text-lg sm:text-xl text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-white/5">
                                Description
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                {singleJob?.description}
                            </p>
                        </div>

                        {/* Requirements and skills card */}
                        {requirements.length > 0 && (
                            <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_18px_55px_rgba(15,23,42,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-sky-200 dark:hover:border-sky-500/20 hover:shadow-[0_25px_65px_rgba(56,189,248,0.08)] transition-all duration-300 text-left space-y-4">
                                <h3 className="font-semibold text-lg sm:text-xl text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-white/5">
                                    Key Requirements & Skills
                                </h3>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {requirements.map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:scale-105 hover:bg-cyan-500/20 transition-all duration-200 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* 2. Sticky apply panel (Desktop) */}
                    <div className="hidden lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] shrink-0 space-y-6">
                        <div className="bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-amber-200 dark:hover:border-amber-500/20 hover:shadow-[0_25px_65px_rgba(245,158,11,0.08)] transition-all duration-300 text-left space-y-6">
                            
                            <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3.5 text-base sm:text-lg">
                                Position Summary
                            </h3>

                            <div className="space-y-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                                <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/2 pb-3">
                                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-cyan-500" /> Applicants</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">{singleJob?.applications?.length || 0} applied</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/2 pb-3">
                                    <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-emerald-500" /> Openings</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">{singleJob?.position} vacancies</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/2 pb-3">
                                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-amber-500" /> Work Setting</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium capitalize">{singleJob?.jobType}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-white/[0.04] rounded-xl border border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed shadow-inner">
                                <span className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Quick Summary</span>
                                Join {companyName} as a {singleJob?.title} in {singleJob?.location}. This is a {singleJob?.jobType} role offering {singleJob?.salary} LPA for candidates with {singleJob?.experienceLevel ?? 0} years of experience.
                            </div>

                            <Button
                                onClick={isApplied || isApplying ? null : applyJobHandler}
                                disabled={isApplied || isApplying}
                                className={`w-full py-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                                    isApplied 
                                        ? 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none' 
                                        : 'bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(56,189,248,0.2)] border-0'
                                }`}
                            >
                                {isApplying ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin text-slate-900" />
                                        <span>Applying...</span>
                                    </>
                                ) : isApplied ? (
                                    <span>Already Applied</span>
                                ) : (
                                    <>
                                        <span>Apply Now</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Bottom Sticky Apply Bar (Mobile Only) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#0c1220]/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-15px_40px_rgba(0,0,0,0.4)] border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4 z-50 lg:hidden select-none">
                <div className="text-left min-w-0">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate leading-tight">{singleJob?.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5">{singleJob?.salary} LPA • {singleJob?.location}</p>
                </div>
                
                <Button
                    onClick={isApplied || isApplying ? null : applyJobHandler}
                    disabled={isApplied || isApplying}
                    className={`rounded-xl px-5 py-5 text-xs font-semibold transition-all duration-300 shrink-0 cursor-pointer shadow-sm flex items-center gap-1.5 ${
                        isApplied 
                            ? 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none' 
                            : 'bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 hover:scale-[1.02] border-0'
                    }`}
                >
                    {isApplying ? (
                        <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Applying...</span>
                        </>
                    ) : isApplied ? (
                        <span>Applied</span>
                    ) : (
                        <span>Apply Now</span>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default JobDescription;