import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Eye, MoreVertical, Briefcase, MapPin, Calendar, Users, DollarSign, Layers } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanyLogo = ({ logo, name }) => {
    const [broken, setBroken] = useState(false);
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    
    if (!logo || broken) {
        return (
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-400 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-[10px] shadow-sm select-none shrink-0">
                {initials}
            </div>
        );
    }
    return (
        <img 
            src={logo} 
            alt={name} 
            onError={() => setBroken(true)}
            className="h-9 w-9 rounded-lg object-cover border border-slate-200 dark:border-white/10 shadow-sm shrink-0"
        />
    );
};

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                   job?.location?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [allAdminJobs]);

    if (loading) {
        return (
            <div>
                {/* Desktop Table Skeleton */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-100 dark:border-white/5">
                                <TableHead>Role</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Date Posted</TableHead>
                                <TableHead>Applicants</TableHead>
                                <TableHead>Positions</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((i) => (
                                <TableRow key={i} className="animate-pulse border-slate-100 dark:border-white/5">
                                    <TableCell><div className="h-4 w-40 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 bg-slate-200 dark:bg-white/5 rounded-lg" />
                                            <div className="h-4 w-24 bg-slate-200 dark:bg-white/5 rounded" />
                                        </div>
                                    </TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell><div className="h-5 w-12 bg-slate-200 dark:bg-white/5 rounded-full" /></TableCell>
                                    <TableCell><div className="h-4 w-8 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-8 bg-slate-200 dark:bg-white/5 rounded-full ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Mobile Card Skeleton */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-slate-200 dark:bg-white/5 rounded" />
                                    <div className="h-3.5 w-20 bg-slate-200 dark:bg-white/5 rounded" />
                                </div>
                                <div className="h-5 w-12 bg-slate-200 dark:bg-white/5 rounded-full" />
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="h-8 w-8 bg-slate-200 dark:bg-white/5 rounded-lg" />
                                <div className="h-3 w-28 bg-slate-200 dark:bg-white/5 rounded" />
                            </div>
                            <div className="h-8 w-full bg-slate-200 dark:bg-white/5 rounded-lg mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (filterJobs?.length <= 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 shadow-sm">
                    <Briefcase className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No jobs posted yet</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">Start by posting your first hiring opportunity.</p>
                <Button 
                    onClick={() => navigate("/admin/jobs/create")} 
                    className="bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-semibold rounded-xl px-5 py-2.5 shadow-md transition border-0"
                >
                    Post First Job
                </Button>
            </div>
        );
    }

    return (
        <div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/50">
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Job Title</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Company</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Date Posted</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Salary</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Positions</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Applicants</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs.map((job) => (
                            <TableRow key={job?._id} className="hover:bg-sky-50/50 dark:hover:bg-white/[0.02] border-slate-200 dark:border-white/[0.08] transition-colors">
                                <TableCell className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                    <div className="flex flex-col text-left">
                                        <span>{job?.title}</span>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5">{job?.jobType} • {job?.location}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-left">
                                        <CompanyLogo logo={job?.company?.logo} name={job?.company?.name} />
                                        <span className="text-slate-900 dark:text-slate-300 font-medium">{job?.company?.name || 'Unknown'}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                    {job?.createdAt?.split("T")[0] || 'Unknown'}
                                </TableCell>
                                <TableCell className="text-slate-900 dark:text-slate-300 font-semibold whitespace-nowrap">
                                    {job?.salary ? `${job.salary} LPA` : 'N/A'}
                                </TableCell>
                                <TableCell className="text-slate-700 dark:text-slate-400 whitespace-nowrap">
                                    {job?.position || 0}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                        {job?.applications?.length || 0} candidates
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 rounded-lg hover:bg-slate-105 dark:hover:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-transparent border-0 cursor-pointer">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50">
                                            <button 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition text-left bg-transparent border-0 cursor-pointer"
                                            >
                                                <Eye className="h-3.5 w-3.5 text-cyan-500" />
                                                <span>Applicants</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filterJobs.map((job) => (
                    <div key={job?._id} className="bg-white/95 dark:bg-[#0f172a]/40 border border-slate-200 dark:border-white/[0.08] p-5 rounded-2xl flex flex-col gap-3 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:shadow-none hover:border-sky-300/70 transition text-left">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h4 className="font-bold text-slate-950 dark:text-white text-base leading-tight">{job?.title}</h4>
                                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mt-1.5">
                                    {job?.jobType}
                                </span>
                            </div>
                            <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-emerald-550/10 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                                {job?.applications?.length || 0} Applicants
                            </span>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/5 mt-1">
                            <CompanyLogo logo={job?.company?.logo} name={job?.company?.name} />
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate">{job?.company?.name || 'Unknown'}</p>
                                <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    <MapPin className="h-2.5 w-2.5 text-amber-500" />
                                    <span>{job?.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                            <div className="flex items-center gap-1.5">
                                <DollarSign className="h-3.5 w-3.5 text-cyan-500" />
                                <span className="text-xs text-slate-700 dark:text-slate-400 font-semibold">{job?.salary ? `${job.salary} LPA` : 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Layers className="h-3.5 w-3.5 text-amber-500" />
                                <span className="text-xs text-slate-700 dark:text-slate-400 font-semibold">{job?.position || 0} Openings</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-500">
                                <Calendar className="h-3 w-3" />
                                <span>{job?.createdAt?.split("T")[0]}</span>
                            </div>
                            
                            <Button 
                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                size="sm" 
                                className="h-8 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 rounded-lg flex items-center gap-1.5 px-3 text-xs border-0 font-bold transition shadow-sm"
                            >
                                <Users className="h-3 w-3" />
                                <span>Candidates</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminJobsTable