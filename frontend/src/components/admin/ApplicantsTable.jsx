import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button';
import { Check, X, FileText, Mail, Phone, Calendar, Users } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const CandidateCard = ({ item, jobTitle, onStatusChange }) => {
    const applicant = item?.applicant;
    const name = applicant?.fullname || 'Anonymous';
    const email = applicant?.email || '';
    const phone = applicant?.phoneNumber || '';
    const skills = applicant?.profile?.skills || [];
    const resume = applicant?.profile?.resume || '';
    const resumeName = applicant?.profile?.resumeOriginalName || 'Resume';
    const dateApplied = item?.createdAt?.split("T")[0] || 'Recently';
    const status = item?.status || 'pending';
    const lowerStatus = status.toLowerCase();

    // Dynamically assign avatar background color based on name characters
    const avatarColors = [
        'bg-[#0ea5e9]', // Sky Blue
        'bg-[#8b5cf6]', // Violet
        'bg-[#ec4899]', // Pink
        'bg-[#f59e0b]', // Amber
        'bg-[#10b981]'  // Emerald
    ];
    const colorIndex = name.charCodeAt(0) % avatarColors.length;
    const avatarBg = avatarColors[colorIndex];
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

    return (
        <div className="bg-white/95 dark:bg-[#111827]/40 border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 flex flex-col gap-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] hover:border-sky-300/70 text-left relative overflow-hidden">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    {/* Circle initials avatar */}
                    <div className={`h-12 w-12 rounded-full ${avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md select-none shrink-0`}>
                        {initials}
                    </div>

                    <div className="space-y-1">
                        <h4 className="text-lg font-bold text-slate-950 dark:text-white leading-tight">{name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Applying for <strong className="text-slate-900 dark:text-slate-350">{jobTitle || 'Role'}</strong>
                        </p>
                        
                        {/* Contact details */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-xs text-slate-700 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-slate-450" />
                                {email}
                            </span>
                            {phone && (
                                <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-slate-450" />
                                    {phone}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-right shrink-0 flex flex-col items-start sm:items-end gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-slate-450" />
                        Applied {dateApplied}
                    </span>

                    {/* Resume link */}
                    {resume ? (
                        <a 
                            href={resume} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            <span>View {resumeName}</span>
                        </a>
                    ) : (
                        <span className="text-xs text-slate-400 italic">No resume uploaded</span>
                    )}
                </div>
            </div>

            {/* Skills pills */}
            {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 border-t border-slate-200/90 dark:border-white/5 pt-4">
                    {skills.map((skill, index) => (
                        <span key={index} className="text-xs font-semibold bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-300">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Action buttons or status */}
            <div className="border-t border-slate-200/90 dark:border-white/5 pt-4 mt-1">
                {lowerStatus === 'pending' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => onStatusChange('Accepted', item?._id)}
                            className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/75 rounded-xl h-11 flex items-center justify-center gap-2 font-bold transition cursor-pointer"
                        >
                            <Check className="h-4 w-4" />
                            <span>Accept</span>
                        </button>
                        <button 
                            onClick={() => onStatusChange('Rejected', item?._id)}
                            className="w-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100/75 rounded-xl h-11 flex items-center justify-center gap-2 font-bold transition cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                            <span>Reject</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        {lowerStatus === 'accepted' ? (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                <Check className="h-3.5 w-3.5" />
                                Accepted
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold border border-rose-200 bg-rose-50 text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                                <X className="h-3.5 w-3.5" />
                                Rejected
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [applicants]);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                
                // Instantly update Redux state
                if (applicants) {
                    dispatch(setAllApplicants({
                        ...applicants,
                        applications: applicants.applications.map(app => 
                            app._id === id ? { ...app, status: status } : app
                        )
                    }));
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Status update failed");
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-6 rounded-3xl flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-white/5" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-32 bg-slate-200 dark:bg-white/5 rounded" />
                                <div className="h-3 w-20 bg-slate-200 dark:bg-white/5 rounded" />
                            </div>
                        </div>
                        <div className="h-3 w-full bg-slate-200 dark:bg-white/5 rounded" />
                        <div className="h-11 w-full bg-slate-200 dark:bg-white/5 rounded-xl" />
                    </div>
                ))}
            </div>
        );
    }

    if (applicants?.applications?.length <= 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 shadow-sm">
                    <Users className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No applicants found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">This job opening doesn't have any candidate submissions yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {applicants?.applications?.map((item) => (
                <CandidateCard 
                    key={item._id} 
                    item={item} 
                    jobTitle={applicants?.title} 
                    onStatusChange={statusHandler} 
                />
            ))}
        </div>
    )
}

export default ApplicantsTable