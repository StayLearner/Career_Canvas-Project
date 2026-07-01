import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import RecruiterStats from './RecruiterStats'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus, Search } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-amber-50/30 dark:bg-none dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-7xl mx-auto pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
                {/* Dashboard Stats */}
                <RecruiterStats />
 
                {/* Company Hub Header & Controls */}
                <div className="bg-white/95 dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Company Hub</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your recruiter brands and hiring workspaces.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                className="w-full pl-10 border-slate-300 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#0f172a] focus-visible:ring-sky-300/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus-visible:border-sky-400 rounded-xl"
                                placeholder="Search companies..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")} 
                            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-bold py-2.5 px-6 rounded-xl shadow-md transition-all duration-300 border-0 flex items-center justify-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span>New Company</span>
                        </Button>
                    </div>
                </div>
 
                {/* Companies Main Table/Card Container */}
                <div className="bg-white/95 dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies