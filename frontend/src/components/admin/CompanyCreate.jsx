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
        <div>
            <Navbar />
            <motion.div 
                className='max-w-4xl mx-4 sm:mx-auto my-8 sm:my-10 p-4 sm:p-6 bg-white shadow-lg rounded-lg' 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className='my-6 sm:my-10 text-center' 
                    initial={{ y: -50, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h1 className='font-extrabold text-2xl sm:text-3xl text-[#ffb703] mb-4'>
                        Your Company Name
                    </h1>
                    <p className='text-gray-500 text-base sm:text-lg'>
                        Choose your brand name to represent your business—don't worry, you can always update it later!
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Label className="text-[#ffb703] font-semibold">Company Name</Label>
                    <Input
                        type="text"
                        value={companyName}
                        className="my-2 p-2 border-2 border-[#00b4d8] rounded-lg focus:ring focus:ring-indigo-300"
                        placeholder="TCS, Cognizant, Swiggy, Google, CloudKaptan, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </motion.div>

                <motion.div 
                    className='flex flex-col sm:flex-row items-center gap-4 my-8 sm:my-10 justify-center'
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Button 
                        variant="outline" 
                        className="w-full sm:w-auto px-6 py-2 border-2 border-gray-300 text-white bg-[#00b4d8] hover:bg-[#ffb703] hover:scale-105 transition-transform duration-300 ease-out"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="w-full sm:w-auto px-6 py-2 border-2  bg-[#00b4d8] text-white hover:bg-[#ffb703] hover:scale-105 transition-transform duration-300 ease-out" 
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}


export default CompanyCreate