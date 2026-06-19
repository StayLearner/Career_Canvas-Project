import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { motion } from 'framer-motion'
import { Building2, Loader2, Award, Users, Star } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName: companyName.trim()}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Company creation failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-amber-50/30 dark:bg-none dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-6xl mx-auto px-4 pt-6 sm:pt-8 lg:pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
                    
                    {/* Left Info Panel (Hidden on mobile/tablet or shows cleanly) */}
                    <motion.div 
                        className="lg:col-span-5 bg-gradient-to-tr from-yellow-400/20 via-sky-400/20 to-blue-500/10 border border-slate-200/90 dark:border-white/10 p-8 rounded-3xl flex flex-col justify-between text-left relative overflow-hidden shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:shadow-none"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full" />
                        
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-cyan-400 flex items-center justify-center shadow-md">
                                <Building2 className="h-6 w-6 text-slate-950" />
                            </div>
                            
                            <div>
                                <h2 className="text-2xl font-bold text-slate-950 dark:text-white leading-tight">Create Company Workspace</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Start by setting up your hiring brand workspace. This will act as the hub for all your posted opportunities.</p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex gap-3">
                                    <div className="p-1 rounded-lg bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 h-fit"><Award size={16} /></div>
                                    <p className="text-xs text-slate-600 dark:text-slate-350"><strong>Employer Brand</strong>: Add logos, custom descriptions, and your official website.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="p-1 rounded-lg bg-cyan-400/20 text-cyan-600 dark:text-cyan-400 h-fit"><Users size={16} /></div>
                                    <p className="text-xs text-slate-600 dark:text-slate-350"><strong>ATS Console</strong>: Consolidate applications across all posted roles.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="p-1 rounded-lg bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 h-fit"><Star size={16} /></div>
                                    <p className="text-xs text-slate-600 dark:text-slate-350"><strong>Custom Badges</strong>: Mark your workspace as an approved workplace.</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-[10px] text-slate-450 dark:text-slate-500 pt-6 mt-8 relative z-10 border-t border-slate-200/50 dark:border-white/5">
                            You can change company names and settings anytime later.
                        </div>
                    </motion.div>

                    {/* Right Form Card */}
                    <motion.div 
                        className="lg:col-span-7 bg-white/95 dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col justify-center"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-left mb-6 sm:mb-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Brand Name</h3>
                            <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">Please enter the official registered name of your business.</p>
                        </div>

                        <div className="text-left space-y-2">
                            <Label htmlFor="companyName" className="text-xs font-semibold text-slate-700 dark:text-slate-400">Company Name *</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                                <Input
                                    id="companyName"
                                    type="text"
                                    value={companyName}
                                    className="pl-10 h-12 border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl"
                                    placeholder="e.g. Acme Corp, Google, Microsoft"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && registerNewCompany()}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-1/2 px-6 py-2.5 h-11 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-semibold transition"
                                onClick={() => navigate("/admin/companies")}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            {loading ? (
                                <Button disabled className="w-full sm:w-1/2 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </Button>
                            ) : (
                                <Button 
                                    className="w-full sm:w-1/2 px-6 py-2.5 h-11 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-bold rounded-xl shadow transition border-0" 
                                    onClick={registerNewCompany}
                                >
                                    Create Workspace
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate