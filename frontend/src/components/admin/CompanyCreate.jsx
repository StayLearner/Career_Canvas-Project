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

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {
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
        }
    }
   

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 mt-8">
                <motion.div 
                    className='max-w-2xl mx-auto bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]'
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6 }}
                >
                    <motion.div 
                        className='my-6 sm:my-8 text-center' 
                        initial={{ y: -30, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h1 className='font-bold text-2xl sm:text-3xl text-amber-500 dark:text-amber-400 mb-4'>
                            Your Company Name
                        </h1>
                        <p className='text-slate-500 dark:text-slate-400 text-sm sm:text-base'>
                            Choose your brand name to represent your business—don't worry, you can always update it later!
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ x: -50, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-left"
                    >
                        <Label className="text-amber-500 dark:text-amber-400 font-semibold text-sm">Company Name</Label>
                        <Input
                            type="text"
                            value={companyName}
                            className="my-2 p-3 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-805 dark:text-slate-100 rounded-xl"
                            placeholder="TCS, Swiggy, Swiggy, Google, CloudKaptan, Microsoft etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </motion.div>

                    <motion.div 
                        className='flex flex-col sm:flex-row items-center gap-4 my-8 justify-center'
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Button 
                            variant="outline" 
                            className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-semibold transition-all duration-300"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-semibold rounded-xl shadow-lg transition-transform duration-300 border-0" 
                            onClick={registerNewCompany}
                        >
                            Continue
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}


export default CompanyCreate