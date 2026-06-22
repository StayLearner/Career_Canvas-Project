import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Briefcase, CheckCircle2, Users, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { GlowingEffect } from './ui/glowing-effect';
import TextType from './TextType';
import useReducedMotion from '@/hooks/useReducedMotion';

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { allJobs } = useSelector((store) => store.job);
  const [floatingJobs, setFloatingJobs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [animatedStudents, setAnimatedStudents] = useState(0);
  const [animatedRecruiters, setAnimatedRecruiters] = useState(0);
  const [communityStats, setCommunityStats] = useState({ studentsCount: 0, recruitersCount: 0 });

  const navigate = useNavigate();

  // Fisher-Yates Shuffle
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const fetchCommunityStats = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/stats`, { withCredentials: true });
        if (res.data.success) {
          setCommunityStats({
            studentsCount: res.data.studentsCount || 0,
            recruitersCount: res.data.recruitersCount || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch community stats for hero:", error);
      }
    };

    fetchCommunityStats();
  }, []);

  useEffect(() => {
    if (communityStats.studentsCount > 0) {
      let start = 0;
      const end = communityStats.studentsCount;
      const duration = 1.0; // seconds
      const totalFrames = 30;
      const increment = Math.ceil(end / totalFrames) || 1;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedStudents(end);
          clearInterval(timer);
        } else {
          setAnimatedStudents(start);
        }
      }, (duration * 1000) / totalFrames);
      return () => clearInterval(timer);
    }
  }, [communityStats.studentsCount]);

  useEffect(() => {
    if (communityStats.recruitersCount > 0) {
      let start = 0;
      const end = communityStats.recruitersCount;
      const duration = 1.0; // seconds
      const totalFrames = 30;
      const increment = Math.ceil(end / totalFrames) || 1;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedRecruiters(end);
          clearInterval(timer);
        } else {
          setAnimatedRecruiters(start);
        }
      }, (duration * 1000) / totalFrames);
      return () => clearInterval(timer);
    }
  }, [communityStats.recruitersCount]);

  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      const shuffled = shuffleArray(allJobs);
      setFloatingJobs(shuffled.slice(0, 2));
      setLoadingStats(false);
    } else if (allJobs && allJobs.length === 0) {
      setFloatingJobs([]);
      setLoadingStats(false);
    }
  }, [allJobs]);


  return (
    <div className="relative pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 blur-[64px] -z-10" />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.1fr_1fr] gap-16 lg:gap-20 items-center">
          
          {/* COLUMN 1: LEFT - Premium Mobile Showcase (iPhone-style Mockup) - Hidden on Mobile */}
          <div className="hidden md:flex justify-center items-center w-full relative select-none overflow-visible z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] rounded-full bg-gradient-to-tr from-[#00b4d8]/10 to-[#ffb703]/10 blur-[48px] -z-10 pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 5 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex justify-center h-[380px] w-[190px] border-[5px] border-slate-950 dark:border-slate-800 rounded-[30px] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden [perspective:1000px]"
            >
              {/* Notch */}
              <span className="absolute top-1 left-1/2 -translate-x-1/2 bg-slate-950 dark:bg-slate-800 w-16 h-3 rounded-full flex items-center justify-center z-50">
                <span className="w-5 h-0.5 bg-slate-800 dark:bg-slate-700 rounded-full mb-0.5" />
              </span>
              {/* Buttons */}
              <span className="absolute -right-[6px] top-12 border border-slate-950 dark:border-slate-850 bg-slate-950 dark:bg-slate-800 w-1 h-5 rounded-l-md z-45" />
              <span className="absolute -right-[6px] bottom-28 border border-slate-950 dark:border-slate-850 bg-slate-950 dark:bg-slate-800 w-1.5 h-7 rounded-l-md z-45" />

              {/* Simulated Screen Content Carousel Container */}
              <div className="w-full h-full flex flex-col justify-between p-2.5 relative bg-gradient-to-b from-[#0F172A] to-[#020617] text-white">
                <div className="w-full h-full pt-3 flex flex-col justify-between relative overflow-hidden text-left">
                  <motion.div 
                    animate={{ y: ["0%", "0%", "-33.33%", "-33.33%", "-66.66%", "-66.66%", "0%"] }}
                    transition={{
                      duration: 12,
                      ease: "easeInOut",
                      repeat: Infinity,
                      times: [0, 0.28, 0.33, 0.61, 0.66, 0.95, 1]
                    }}
                    className="w-full h-[300%]"
                  >
                    {/* SCREEN 1: Real Jobs Page Miniature */}
                    <div className="h-1/3 w-full flex flex-col justify-between py-1 text-left">
                      {/* Logo header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 rounded bg-gradient-to-tr from-[#ffb703] to-[#00b4d8] flex items-center justify-center text-[7.5px] font-black text-slate-950">CC</div>
                          <span className="text-[8.5px] font-bold tracking-tight bg-gradient-to-r from-[#ffb703] to-[#00b4d8] bg-clip-text text-transparent">Career Canvas</span>
                        </div>
                      </div>

                      {/* Search jobs bar */}
                      <div className="mt-1 bg-white/5 border border-white/10 rounded-lg p-1 flex items-center gap-1">
                        <Search className="h-2.5 w-2.5 text-slate-400" />
                        <span className="text-[7px] text-slate-400">Search jobs...</span>
                      </div>

                      {/* Miniature Job Card Design matches actual application */}
                      <div className="mt-1.5 flex-1 flex flex-col gap-1.5">
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Latest Jobs</span>
                        
                        <div className="p-2 rounded-lg border border-sky-500/10 bg-white/5 backdrop-blur-md flex flex-col gap-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] font-bold text-white leading-none">Frontend Engineer</span>
                            <span className="text-[6.5px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-semibold">12 LPA</span>
                          </div>
                          <p className="text-[7px] text-slate-400">Google Inc. • Delhi NCR</p>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            <span className="text-[5.5px] bg-slate-800 text-slate-300 px-1 py-0.5 rounded">Full Time</span>
                            <span className="text-[5.5px] bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded">Remote</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 2: Real Applied Jobs Page Miniature */}
                    <div className="h-1/3 w-full flex flex-col justify-between py-1 text-left">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="text-[8.5px] font-bold text-white">Applied Jobs</span>
                        <span className="text-[7px] text-slate-400">History (3)</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center space-y-1.5">
                        {/* Status Accepted */}
                        <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                          <div className="flex flex-col text-left">
                            <span className="text-[8px] font-bold text-white leading-tight">Software Engineer</span>
                            <span className="text-[6.5px] text-slate-400">Microsoft</span>
                          </div>
                          <span className="text-[6.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.5 rounded-full font-bold">ACCEPTED</span>
                        </div>

                        {/* Status Pending */}
                        <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                          <div className="flex flex-col text-left">
                            <span className="text-[8px] font-bold text-white">UI Developer</span>
                            <span className="text-[6.5px] text-slate-400">Adobe</span>
                          </div>
                          <span className="text-[6.5px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded-full font-bold">PENDING</span>
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 3: Real Recruiter Dashboard Miniature */}
                    <div className="h-1/3 w-full flex flex-col justify-between py-1 text-left">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="text-[8.5px] font-bold text-white">Recruiter Workspace</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center space-y-2">
                        <div className="grid grid-cols-3 gap-1">
                          <div className="p-1 bg-white/5 border border-white/10 rounded-lg flex flex-col text-left">
                            <span className="text-[5.5px] text-slate-400 uppercase">Jobs</span>
                            <span className="text-[10px] font-bold text-white">8</span>
                          </div>
                          <div className="p-1 bg-white/5 border border-white/10 rounded-lg flex flex-col text-left">
                            <span className="text-[5.5px] text-slate-400 uppercase">Applicants</span>
                            <span className="text-[10px] font-bold text-[#00b4d8]">148</span>
                          </div>
                          <div className="p-1 bg-white/5 border border-white/10 rounded-lg flex flex-col text-left">
                            <span className="text-[5.5px] text-slate-400 uppercase">Companies</span>
                            <span className="text-[10px] font-bold text-[#ffb703]">4</span>
                          </div>
                        </div>

                        <div className="p-1.5 bg-gradient-to-r from-[#00b4d8]/10 to-[#ffb703]/10 border border-white/5 rounded-lg text-left">
                          <span className="text-[6.5px] text-slate-400">Total job applications are up +24% this week.</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2: CENTER - Badge, TextType Headline, Description */}
          <div className="flex flex-col items-center text-center lg:text-left lg:items-start space-y-7 mx-auto w-full z-10 py-4">

            {/* Top Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 tracking-wide"
            >
              <Sparkles className="h-3 w-3 text-[#00b4d8]" />
              <span className="tracking-wide">Next-Generation Career Canvas</span>
            </motion.div>

            {/* Static label above headline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 dark:text-slate-500 font-sans"
            >
              Career Canvas
            </motion.p>

            {/* TextType animated headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <TextType
                text={[
                  "Seek smarter opportunities.",
                  "Apply with confidence.",
                  "Build your future."
                ]}
                as="h1"
                typingSpeed={60}
                deletingSpeed={35}
                pauseDuration={1800}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-[#00b4d8]"
                startOnVisible={true}
                className="text-4xl sm:text-5xl lg:text-[3rem] xl:text-[3.25rem] font-bold tracking-tight text-slate-950 dark:text-white leading-tight min-h-[4rem] sm:min-h-[5rem] lg:min-h-[4rem] font-heading"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-[420px] font-sans"
            >
              A modern career platform for students and recruiters to discover jobs, manage applications, and build hiring workflows with clarity.
            </motion.p>

          </div>

          {/* COLUMN 3: RIGHT - Existing Floating Decorative Cards Column - Hidden on Tablet/Mobile */}
          <div className="hidden lg:flex flex-1 relative h-[480px] items-center justify-center overflow-visible z-10" style={{ perspective: 1000 }}>
            {/* THE CENTERPIECE: Compact Stats Cluster (Replacing large job card) */}
            <div className="w-[280px] sm:w-[320px] h-[240px] sm:h-[270px] relative z-20 flex flex-col justify-center">
              {loadingStats ? (
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[#0B1220] backdrop-blur-xl animate-pulse z-20" />
              ) : (
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                  transition={prefersReducedMotion ? {} : { duration: 6, ease: "easeInOut", repeat: Infinity }}
                  className="grid grid-cols-2 gap-3 w-full"
                >
                  {/* Top Row: Active Jobs & Open Positions (Span 2) */}
                  <div className="col-span-2 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-sky-200/70 dark:border-white/10 shadow-[0_15px_40px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_40%)] dark:hidden pointer-events-none rounded-2xl z-0" />
                    <div className="flex items-center justify-between z-10 relative">
                      <div>
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Active Jobs</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white font-heading mt-1">{allJobs?.length || 0}</p>
                      </div>
                      <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />
                      <div className="text-right">
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Open Positions</p>
                        <p className="text-3xl font-bold text-sky-600 dark:text-sky-400 font-heading mt-1">{allJobs ? allJobs.reduce((acc, job) => acc + (job?.position || 1), 0) : 0}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Row: Total Companies (Centered Square) */}
                  <div className="col-span-2 flex justify-center">
                    <div className="w-[140px] sm:w-[150px] aspect-square p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-sky-200/70 dark:border-white/10 shadow-[0_15px_40px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-center group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_40%)] dark:hidden pointer-events-none rounded-2xl z-0" />
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 z-10">
                        <Building2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                      </div>
                      <div className="z-10 relative text-left">
                        <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading leading-none">{allJobs ? new Set(allJobs.map(job => job?.company?._id).filter(Boolean)).size : 0}</p>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-1.5">Total Companies</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* FLOATING SUPPORTING WIDGET 1: Top Right - Application Tracking (20% attention) */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              className="absolute -top-6 right-0 sm:-right-4 lg:-right-12 z-10 w-[150px] sm:w-[170px] shrink-0 group/track rounded-2xl"
            >
              <div className="p-3.5 bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-sky-200/70 dark:border-white/10 rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left flex flex-col justify-between h-[130px] relative overflow-hidden hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_20px_60px_rgba(56,189,248,0.2)] hover:border-sky-300/80 dark:hover:border-white/20 transition-all duration-300">
                {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-2xl z-0" />
                
                <div className="flex items-center gap-1.5 z-10 relative">
                  <div className="h-5 w-5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-800 dark:text-white tracking-wide uppercase">Applications</span>
                </div>
                
                <div className="space-y-1.5 py-1 z-10 relative">
                  <div className="flex justify-between items-center text-[8px]">
                    <span className="text-slate-600 dark:text-slate-300 truncate max-w-[75px] font-semibold">Software Eng</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold text-[7px] uppercase tracking-wider scale-90">Accepted</span>
                  </div>
                  <div className="flex justify-between items-center text-[8px]">
                    <span className="text-slate-600 dark:text-slate-300 truncate max-w-[75px] font-semibold">UI/UX Intern</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold text-[7px] uppercase tracking-wider scale-90">Pending</span>
                  </div>
                </div>
                <div className="text-[8px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-1.5 font-medium uppercase tracking-wider z-10 relative text-center">
                  Live Status Sync
                </div>
              </div>
              <GlowingEffect
                disabled={false}
                proximity={48}
                inactiveZone={0.01}
                borderWidth={1.2}
                spread={30}
                glow={false}
              />
            </motion.div>

            {/* FLOATING SUPPORTING WIDGET 2: Bottom Right - Community Growth (10% attention) */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              className="absolute -bottom-8 right-0 sm:-right-4 lg:-right-14 z-10 w-[180px] sm:w-[200px] shrink-0 group/comm rounded-2xl"
            >
              <div className="p-3 bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-sky-200/70 dark:border-white/10 rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between h-[160px] relative overflow-hidden hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_20px_60px_rgba(250,204,21,0.2)] hover:border-sky-300/80 dark:hover:border-white/20 transition-all duration-300">
                {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-2xl z-0" />
                
                <div className="flex items-center gap-1.5 z-10 relative text-left">
                  <div className="h-5 w-5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-800 dark:text-white tracking-wide uppercase">Community</span>
                </div>

                <div className="flex items-center justify-around gap-2 py-1 z-10 relative flex-1">
                  {/* Left Circle: Students */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-11 h-11 transform -rotate-90">
                        <circle cx="22" cy="22" r="18" className="stroke-slate-100 dark:stroke-white/5" strokeWidth="2.5" fill="transparent" />
                        <circle cx="22" cy="22" r="18" className="stroke-cyan-500 dark:stroke-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]" strokeWidth="2.5" fill="transparent" strokeDasharray={2 * Math.PI * 18} strokeDashoffset={(2 * Math.PI * 18) * (1 - Math.min((animatedStudents || 1) / (animatedStudents + animatedRecruiters || 50), 0.85))} strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-[8.5px] font-semibold text-cyan-600 dark:text-cyan-300">{animatedStudents}</span>
                    </div>
                    <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400 mt-1">Students</span>
                  </div>

                  {/* Right Circle: Recruiters */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-11 h-11 transform -rotate-90">
                        <circle cx="22" cy="22" r="18" className="stroke-slate-100 dark:stroke-white/5" strokeWidth="2.5" fill="transparent" />
                        <circle cx="22" cy="22" r="18" className="stroke-amber-500 dark:stroke-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]" strokeWidth="2.5" fill="transparent" strokeDasharray={2 * Math.PI * 18} strokeDashoffset={(2 * Math.PI * 18) * (1 - Math.min((animatedRecruiters || 1) / (animatedStudents + animatedRecruiters || 50), 0.85))} strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-[8.5px] font-semibold text-amber-600 dark:text-amber-300">{animatedRecruiters}</span>
                    </div>
                    <span className="text-[7.5px] font-semibold text-slate-500 dark:text-slate-400 mt-1">Recruiters</span>
                  </div>
                </div>

                <div className="text-[7.5px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-1.5 font-medium uppercase tracking-wider z-10 relative text-center">
                  Active Growth
                </div>
              </div>
              <GlowingEffect
                disabled={false}
                proximity={48}
                inactiveZone={0.01}
                borderWidth={1.2}
                spread={30}
                glow={false}
              />
            </motion.div>

            {/* FLOATING SUPPORTING BADGE 3: Top Left - Live Recruiter Activity */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="absolute -top-8 left-0 sm:-left-4 lg:-left-12 z-30 bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-sky-200/70 dark:border-white/10 px-2.5 py-1.5 rounded-xl flex items-center gap-2 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_15px_45px_rgba(6,182,212,0.2)] hover:border-sky-300/80 dark:hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-xl z-0" />
              <div className="h-5.5 w-5.5 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                <Sparkles className="h-3 w-3 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-semibold text-slate-800 dark:text-white uppercase tracking-wider leading-none">Recruiter Active</p>
                <p className="text-[7.5px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[70px]">{floatingJobs[0]?.company?.name || "ApexHQ"} hired</p>
              </div>
            </motion.div>

            {/* FLOATING SUPPORTING BADGE 4: Bottom Left - New Job Posted */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="absolute -bottom-4 left-0 sm:-left-4 lg:-left-10 z-30 bg-gradient-to-br from-white via-sky-50/80 to-amber-50/70 dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-sky-200/70 dark:border-white/10 px-2.5 py-1.5 rounded-xl flex items-center gap-2 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_90px_rgba(56,189,248,0.22)] dark:hover:shadow-[0_15px_45px_rgba(245,158,11,0.2)] hover:border-sky-300/80 dark:hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Subtle top-left sky glow + bottom-right amber glow for inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_35%)] dark:hidden pointer-events-none rounded-xl z-0" />
              <div className="h-5.5 w-5.5 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Briefcase className="h-3 w-3" />
              </div>
              <div className="text-left">
                <p className="text-[8px] font-semibold text-slate-800 dark:text-white uppercase tracking-wider leading-none">New Posting</p>
                <p className="text-[7.5px] text-slate-400 mt-0.5 truncate max-w-[80px]">{floatingJobs[1]?.title || "NodeJS Dev"} live</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;