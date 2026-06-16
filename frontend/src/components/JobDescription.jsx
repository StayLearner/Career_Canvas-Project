import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            if (!user) {
                toast.error("Please login to apply for this job");
                return;
            }

const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
    withCredentials: true
});            
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...(singleJob?.applications || []),{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
              toast.error(error.response?.data?.message || "Something went wrong");
            }
        }


        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans relative overflow-x-hidden pb-16">
            <Navbar />
            <div className='max-w-4xl mx-auto my-8 sm:my-10 px-4 sm:px-6'>
                <div className='bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-slate-200/80 dark:border-white/10'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 border-b border-slate-100 dark:border-white/5'>
                        <div className="text-left">
                            <h1 className='font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-4'>
                                <Badge className='bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl shadow-none hover:bg-emerald-500/20 transition' variant="ghost">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className='bg-cyan-500/10 text-cyan-650 dark:text-cyan-400 border border-cyan-500/20 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl shadow-none hover:bg-cyan-500/20 transition' variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-amber-500/10 text-amber-650 dark:text-amber-400 border border-amber-500/20 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl shadow-none hover:bg-amber-500/20 transition' variant="ghost">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-full px-6 py-3 font-semibold tracking-wide w-full md:w-auto transition-all duration-300 ${
                                isApplied 
                                    ? 'bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-yellow-400 to-sky-400 text-slate-950 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20'
                            }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <h2 className='font-bold py-4 text-xl sm:text-2xl text-slate-900 dark:text-white mt-6 text-left'>
                        Job Details
                    </h2>
                    
                    <div className='my-6 text-base sm:text-lg space-y-4 text-left'>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Role</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.title}</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Location</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.location}</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Description</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200 leading-relaxed'>{singleJob?.description}</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Job Type</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.jobType}</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Experience</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.experience} yrs</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Salary</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.salary} LPA</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2 border-b border-slate-100/50 dark:border-white/5'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Total Applicants</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.applications?.length}</span>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-1 py-2'>
                            <span className='font-bold text-slate-500 dark:text-slate-400'>Posted Date</span>
                            <span className='sm:col-span-3 text-slate-800 dark:text-slate-200'>{singleJob?.createdAt?.split("T")[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription