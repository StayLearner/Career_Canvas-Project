import React from 'react';
import { motion } from 'framer-motion';

const AuthToggle = ({ mode, setMode }) => {
  return (
    <div className="w-full flex justify-center mb-5 relative z-20">
      <div className="relative flex items-center bg-slate-200/60 dark:bg-slate-800/80 rounded-full p-1.5 border border-slate-300/50 dark:border-white/10 shadow-inner">
        <button
          onClick={() => setMode('login')}
          className={`relative px-8 py-2.5 text-sm font-semibold rounded-full z-10 transition-colors duration-300 ${mode === 'login' ? 'text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`relative px-8 py-2.5 text-sm font-semibold rounded-full z-10 transition-colors duration-300 ${mode === 'signup' ? 'text-slate-900 dark:text-slate-900' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          Sign Up
        </button>

        {/* Sliding pill background */}
        <motion.div
          className={`absolute top-1.5 bottom-1.5 rounded-full shadow-md z-0 ${mode === 'login' ? 'bg-sky-500' : 'bg-[#ffb703]'}`}
          initial={false}
          animate={{
            left: mode === 'login' ? '6px' : '50%',
            right: mode === 'login' ? '50%' : '6px',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default AuthToggle;
