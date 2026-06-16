import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Company update failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        })
    },[singleCompany]);

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            <div className='max-w-xl mx-auto my-8 sm:my-10 px-4 sm:px-6 lg:px-0'>
                <form onSubmit={submitHandler} className='bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]'>
                    <div className='flex items-center gap-4 sm:gap-5 pb-6 border-b border-slate-100 dark:border-white/5 mb-6 text-left'>
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            type="button" 
                            variant="outline" 
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-semibold w-fit h-9 px-4 shrink-0 transition"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl sm:text-2xl text-slate-900 dark:text-white truncate'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-left'>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-semibold">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-semibold">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-semibold">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-semibold">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className='sm:col-span-2 space-y-1'>
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-semibold">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button disabled className="w-full my-6 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 font-semibold py-2.5">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Please wait 
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-6 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-transform duration-300 border-0">
                                Update
                            </Button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup