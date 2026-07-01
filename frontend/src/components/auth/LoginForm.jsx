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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Mail, Lock } from 'lucide-react';

const LoginForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.role) {
            toast.error("Please select a role to login.");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <form onSubmit={submitHandler} className='flex flex-col h-full justify-center w-full max-w-sm mx-auto space-y-5'>
            <div className='text-center space-y-1.5 mb-1'>
                <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-heading'>Welcome back</h1>
                <p className='text-sm text-slate-500 dark:text-slate-400 font-sans'>Enter your credentials to access your account</p>
            </div>

            <div className='space-y-3.5 font-sans'>
                <div className='space-y-1.5 text-left'>
                    <Label className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="name@example.com"
                            className="pl-10 h-10 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 focus-visible:ring-sky-500"
                            required
                        />
                    </div>
                </div>

                <div className='space-y-1.5 text-left'>
                    <Label className="text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="pl-10 h-10 text-sm bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 focus-visible:ring-sky-500"
                            required
                        />
                    </div>
                </div>

                <div className='pt-2'>
                    <RadioGroup className="flex items-center justify-center gap-6">
                        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer hover:border-sky-300 dark:hover:border-sky-500/50 transition-colors">
                            <Input
                                type="radio"
                                name="role"
                                id="login-student"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer h-4 w-4 accent-sky-500"
                            />
                            <Label htmlFor="login-student" className="cursor-pointer font-semibold text-slate-700 dark:text-slate-300">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer hover:border-amber-300 dark:hover:border-amber-500/50 transition-colors">
                            <Input
                                type="radio"
                                name="role"
                                id="login-recruiter"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer h-4 w-4 accent-amber-500"
                            />
                            <Label htmlFor="login-recruiter" className="cursor-pointer font-semibold text-slate-700 dark:text-slate-300">Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="pt-2">
                {loading ? (
                    <Button disabled className="w-full h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-lg">
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full h-10 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/20 dark:shadow-white/10 transition-all duration-300">
                        Sign In
                    </Button>
                )}
            </div>
        </form>
    )
}

export default LoginForm;
