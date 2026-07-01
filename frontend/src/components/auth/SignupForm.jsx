import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, Mail, Lock, User, Phone, UploadCloud } from 'lucide-react';

const SignupForm = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select a role to signup.");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <form onSubmit={submitHandler} className='flex flex-col h-full justify-center w-full max-w-sm mx-auto space-y-3.5'>
            <div className='text-center space-y-1 mb-1'>
                <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-heading'>Create an account</h1>
                <p className='text-sm text-slate-500 dark:text-slate-400 font-sans'>Enter your details to get started</p>
            </div>

            <div className='space-y-3 font-sans'>
                <div className='space-y-1 text-left'>
                    <Label className="text-slate-700 dark:text-slate-300 font-semibold text-[11px] uppercase tracking-wider">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="pl-10 h-9 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 focus-visible:ring-sky-500"
                            required
                        />
                    </div>
                </div>

                <div className='space-y-1 text-left'>
                    <Label className="text-slate-700 dark:text-slate-300 font-semibold text-[11px] uppercase tracking-wider">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="name@example.com"
                            className="pl-10 h-9 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 focus-visible:ring-sky-500"
                            required
                        />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <div className='space-y-1 text-left'>
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold text-[11px] uppercase tracking-wider">Phone</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="9876543210"
                                className="pl-10 h-9 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 focus-visible:ring-sky-500"
                                required
                            />
                        </div>
                    </div>
                    <div className='space-y-1 text-left'>
                        <Label className="text-slate-700 dark:text-slate-300 font-semibold text-[11px] uppercase tracking-wider">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="pl-10 h-9 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 focus-visible:ring-sky-500"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2.5 pt-1'>
                    <RadioGroup className="flex items-center justify-between gap-3">
                        <div className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer hover:border-sky-300 dark:hover:border-sky-500/50 transition-colors">
                            <Input
                                type="radio"
                                name="role"
                                id="signup-student"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer h-3.5 w-3.5 accent-sky-500"
                            />
                            <Label htmlFor="signup-student" className="cursor-pointer font-semibold text-slate-700 dark:text-slate-300 text-xs">Student</Label>
                        </div>
                        <div className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer hover:border-amber-300 dark:hover:border-amber-500/50 transition-colors">
                            <Input
                                type="radio"
                                name="role"
                                id="signup-recruiter"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer h-3.5 w-3.5 accent-amber-500"
                            />
                            <Label htmlFor="signup-recruiter" className="cursor-pointer font-semibold text-slate-700 dark:text-slate-300 text-xs">Recruiter</Label>
                        </div>
                    </RadioGroup>

                    <div className='flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10'>
                        <UploadCloud className="h-4 w-4 text-slate-400 shrink-0" />
                        <div className="flex-1 overflow-hidden">
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer text-[11px] file:bg-slate-100 file:dark:bg-white/10 file:border-0 file:rounded file:px-2 file:py-0.5 file:text-[11px] file:font-semibold file:text-slate-700 file:dark:text-slate-300 file:mr-2 h-auto py-1 bg-transparent border-0 focus-visible:ring-0 shadow-none text-slate-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-1">
                {loading ? (
                    <Button disabled className="w-full h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-md">
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full h-10 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold shadow-md shadow-slate-900/20 dark:shadow-white/10 transition-all duration-300">
                        Create Account
                    </Button>
                )}
            </div>
        </form>
    )
}

export default SignupForm;
