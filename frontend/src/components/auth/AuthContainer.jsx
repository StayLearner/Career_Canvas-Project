import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthToggle from './AuthToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthContainer = ({ defaultMode = 'login' }) => {
    const [mode, setMode] = useState(defaultMode);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(store => store.auth);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // Sync state with router param if it changes
    useEffect(() => {
        setMode(defaultMode);
    }, [defaultMode]);

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        // Replace URL state so back button works logically
        navigate(`/${newMode}`, { replace: true });
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617] relative overflow-x-hidden">
            {/* Minimal Background Decor */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-100/50 to-transparent dark:from-sky-900/10 -z-10" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-tr from-[#00b4d8]/10 to-[#ffb703]/10 blur-[80px] -z-10 opacity-50 pointer-events-none" />
            
            <Navbar />
            
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 mt-2 sm:mt-4 w-full">
                
                <AuthToggle mode={mode} setMode={handleModeSwitch} />

                {/* DESKTOP 3D FLIP CONTAINER (md and up) */}
                <div className="hidden md:block relative w-full max-w-[420px] h-[560px] [perspective:1400px]">
                    <motion.div
                        className="w-full h-full relative [transform-style:preserve-3d]"
                        initial={false}
                        animate={{ rotateY: mode === 'signup' ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1 }}
                    >
                        {/* FRONT FACE: LOGIN */}
                        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                            <div className="w-full h-full bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-[2rem] shadow-[0_20px_70px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 flex flex-col justify-center">
                                <LoginForm />
                            </div>
                        </div>

                        {/* BACK FACE: SIGNUP */}
                        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <div className="w-full h-full bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-[2rem] shadow-[0_20px_70px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 flex flex-col justify-center">
                                <SignupForm />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* MOBILE/TABLET TAB CONTAINER (below md) - No 3D flip */}
                <div className="md:hidden w-full max-w-[420px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-xl p-5 min-h-[560px] overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {mode === 'login' ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="h-full flex flex-col justify-center"
                            >
                                <LoginForm />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="h-full flex flex-col justify-center"
                            >
                                <SignupForm />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default AuthContainer;
