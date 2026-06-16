import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input, dispatch]);

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            <div className='max-w-6xl mx-auto my-8 sm:my-10 px-4 sm:px-6 lg:px-8'>
                <div className='bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]'>
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 gap-4">
                        <h1 className="font-bold text-2xl text-slate-900 dark:text-white text-left">Your Companies</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-left">Manage or edit your registered business profiles</p>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6'>
                        <Input
                            className="w-full sm:w-64 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            placeholder="Filter by name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button  onClick={() => navigate("/admin/companies/create")} 
                            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-semibold py-2 px-6 rounded-xl shadow-lg transition-transform duration-300">
                            New Company
                        </Button>
                    </div>
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies