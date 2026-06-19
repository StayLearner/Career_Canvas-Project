import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { Button } from '../ui/button'
import { ArrowLeft, Users, Hourglass, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                // production silent here
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    // Calculate pipeline stage statistics
    const applications = applicants?.applications || [];
    const totalCount = applications.length;
    const pendingCount = applications.filter(app => app?.status?.toLowerCase() === 'pending').length;
    const acceptedCount = applications.filter(app => app?.status?.toLowerCase() === 'accepted').length;
    const rejectedCount = applications.filter(app => app?.status?.toLowerCase() === 'rejected').length;

    const stats = [
        { 
            label: 'Applicants', 
            value: totalCount, 
            percentage: 100,
            strokeColor: 'stroke-teal-500/80 dark:stroke-teal-400/80',
        },
        { 
            label: 'Pending', 
            value: pendingCount, 
            percentage: totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0, 
            strokeColor: 'stroke-amber-500/80 dark:stroke-amber-400/80',
        },
        { 
            label: 'Accepted', 
            value: acceptedCount, 
            percentage: totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0, 
            strokeColor: 'stroke-emerald-500/80 dark:stroke-emerald-400/80',
        },
        { 
            label: 'Rejected', 
            value: rejectedCount, 
            percentage: totalCount > 0 ? Math.round((rejectedCount / totalCount) * 100) : 0, 
            strokeColor: 'stroke-red-500/80 dark:stroke-red-400/80',
        }
    ];

    return (
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-amber-50/30 dark:bg-none dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-7xl mx-auto pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
                
                {/* Back button and Header */}
                <div className="flex flex-col gap-4 text-left">
                    <Button 
                        onClick={() => navigate("/admin/jobs")} 
                        type="button" 
                        variant="outline" 
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-905 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-semibold px-4 h-10 shadow-sm transition w-fit"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Jobs</span>
                    </Button>
                    
                    {/* Visual styling matching the screenshot header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl py-4 px-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                        <div className="text-left">
                            <h1 className="text-xl font-bold tracking-tight text-slate-955 dark:text-white">Hiring Dashboard</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {applicants?.company?.name ? `${applicants.company.name} Recruiting Hub` : 'InnovateX Recruiting Hub'}
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold text-[10px] w-fit">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Recruiter Account</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/95 dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl py-4 px-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                    <div className="flex flex-wrap items-center justify-around gap-6">
                        {stats.map((stat, i) => {
                            const radius = 22;
                            const strokeWidth = 3;
                            const circumference = 2 * Math.PI * radius;
                            const offset = circumference - (stat.percentage / 100) * circumference;

                            return (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="relative flex items-center justify-center w-16 h-16">
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 54 54">
                                            {/* Background track circle */}
                                            <circle
                                                cx="27"
                                                cy="27"
                                                r={radius}
                                                className="stroke-slate-100 dark:stroke-slate-800/50"
                                                strokeWidth={strokeWidth}
                                                fill="transparent"
                                            />
                                            {/* Active progress circle */}
                                            <circle
                                                cx="27"
                                                cy="27"
                                                r={radius}
                                                className={`transition-all duration-1000 ease-out ${stat.strokeColor}`}
                                                strokeWidth={strokeWidth}
                                                fill="transparent"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={offset}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        {/* Centered Stats Text */}
                                        <div className="absolute text-center">
                                            <p className="text-base font-extrabold text-slate-950 dark:text-white leading-none">{stat.value}</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-500 tracking-wider uppercase leading-none">{stat.label}</p>
                                        <span className="text-[9px] text-slate-500 dark:text-slate-500 font-medium mt-1 block leading-none">
                                            {stat.percentage}% of pipeline
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Candidates Console */}
                <div className="bg-white/95 dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                    <div className="pb-4 border-b border-slate-200 dark:border-white/5 mb-6 flex items-center justify-between">
                        <div className="text-left">
                            <h2 className="text-lg font-bold text-slate-955 dark:text-white uppercase tracking-wider text-xs">
                                Recent Applicants ({totalCount} Total)
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-550 mt-0.5">
                                For position: <strong className="text-slate-900 dark:text-slate-300">{applicants?.title || 'Job Opening'}</strong>
                            </p>
                        </div>
                    </div>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants