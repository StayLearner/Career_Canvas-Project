import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company._id === value);
        setInput({...input, companyId:selectedCompany?._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Job post failed");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            <div className='flex items-center justify-center w-full my-8 px-4 sm:px-6 lg:px-8'>
                <form onSubmit = {submitHandler} className='bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] w-full max-w-4xl'>
                    <div className="pb-6 border-b border-slate-100 dark:border-white/5 mb-6 text-left">
                        <h1 className="font-extrabold text-2xl text-slate-900 dark:text-white">Post New Job</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Fill in the details below to publish a new position</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-left'>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Salary (LPA)</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-800 dark:text-slate-100 rounded-xl"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className='sm:col-span-2 space-y-1'>
                                    <Label className="text-slate-600 dark:text-slate-400 text-xs font-bold">Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-100 rounded-xl my-1 focus:ring-0">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-white/10">
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem key={company?._id} value={company?._id} className="dark:focus:bg-white/5 dark:focus:text-white">{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div> 
                    {
                        loading ? (
                            <Button disabled className="w-full my-6 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 font-bold py-2.5">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Please wait 
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-6 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg transition-transform duration-300 border-0">
                                Post New Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-500 font-bold text-center my-3'>* Please register a company first, before posting a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob