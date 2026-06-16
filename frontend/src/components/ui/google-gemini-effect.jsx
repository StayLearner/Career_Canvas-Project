import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GoogleGeminiEffect = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden z-0 select-none",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover opacity-40"
      >
        <motion.path
          d="M -100 250 C 300 250, 400 550, 720 550 C 1040 550, 1140 850, 1540 850"
          stroke="url(#gemini-gradient-1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0, 0.85, 0.55, 0.85] 
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeOut" },
            opacity: { 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              times: [0, 0.1, 0.55, 1]
            }
          }}
          className="drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]"
        />
        <motion.path
          d="M -100 300 C 300 300, 350 600, 720 600 C 1090 600, 1140 900, 1540 900"
          stroke="url(#gemini-gradient-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 0.95, 
            opacity: [0, 0.75, 0.45, 0.75] 
          }}
          transition={{
            pathLength: { duration: 3.3, ease: "easeOut", delay: 0.2 },
            opacity: { 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              times: [0, 0.1, 0.55, 1],
              delay: 0.2
            }
          }}
          className="drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
        />
        <motion.path
          d="M -100 200 C 300 200, 450 500, 720 500 C 990 500, 1140 800, 1540 800"
          stroke="url(#gemini-gradient-3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 0.9, 
            opacity: [0, 0.65, 0.35, 0.65] 
          }}
          transition={{
            pathLength: { duration: 3.6, ease: "easeOut", delay: 0.4 },
            opacity: { 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              times: [0, 0.1, 0.55, 1],
              delay: 0.4
            }
          }}
          className="drop-shadow-[0_0_10px_rgba(14,165,233,0.4)]"
        />
        <defs>
          <linearGradient id="gemini-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gemini-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gemini-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
