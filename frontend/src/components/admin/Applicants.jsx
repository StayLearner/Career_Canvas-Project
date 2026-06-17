import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

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

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            <div className='max-w-6xl mx-auto my-8 sm:my-10 px-4 sm:px-6 lg:px-8'>
                <div className='bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]'>
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-6 gap-4">
                        <h1 className='font-bold text-2xl text-slate-900 dark:text-white text-left'>
                            Applicants ({applicants?.applications?.length || 0})
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-left">Review candidate submissions and update shortlisting status</p>
                    </div>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants