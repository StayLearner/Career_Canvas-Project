import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, Building2, Briefcase, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import axios from 'axios';
import { COMPANY_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import { GlareCard } from './ui/glare-card';
import { GlowingEffect } from './ui/glowing-effect';
import { GoogleGeminiEffect } from './ui/google-gemini-effect';
import SplitText from './SplitText';
import ShinyText from './ShinyText';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const { allJobs } = useSelector((store) => store.job);
  const [companyCount, setCompanyCount] = useState(0);
  const [floatingJobs, setFloatingJobs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [communityStats, setCommunityStats] = useState({ studentsCount: 0, recruitersCount: 0 });
  const [animatedStudents, setAnimatedStudents] = useState(0);
  const [animatedRecruiters, setAnimatedRecruiters] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query.trim()));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler();
    }
  };

  const handleFindJobsClick = () => {
    document.getElementById('latest-jobs-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

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
    const fetchCompanyCount = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/all-companies`, { withCredentials: true });
        if (res.data.success && res.data.companies) {
          setCompanyCount(res.data.companies.length);
        }
      } catch (error) {
        console.error("Failed to fetch companies count for hero stats:", error);
      }
    };

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

    fetchCompanyCount();
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

  // Sum of vacancies (job.position)
  const totalPositions = allJobs 
    ? allJobs.reduce((acc, job) => acc + (Number(job.position) || 0), 0) 
    : 0;

  return (
    <div className="relative pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 blur-[130px] -z-10" />

      {/* Google Gemini scroll-animated decorative effect */}
      <GoogleGeminiEffect className="opacity-45 scale-[1.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description, Search, Stats */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            
            {/* Top Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/50 dark:bg-white/5 text-cyan-600 dark:text-cyan-300 border border-slate-300/20 dark:border-white/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
              <ShinyText text="Next-Generation Career Canvas" className="text-cyan-600 dark:text-cyan-300 font-semibold" shineColor="#ffffff" color="#38bdf8" speed={2.5} />
            </motion.div>

            {/* Headline */}
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none flex flex-col items-start gap-1">
              <SplitText 
                text="Seek, Apply &" 
                className="text-slate-900 dark:text-white"
                delay={40}
                duration={0.8}
                textAlign="left"
                tag="span"
              />
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-500 dark:from-cyan-400 dark:via-sky-400 dark:to-amber-400 bg-clip-text text-transparent py-1 leading-[1.15] block"
              >
                Build Your Future
              </motion.span>
            </div>

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Navigate your career journey with confidence. Screen real-time opportunities, manage applications, and land your role at modern software platforms.
            </motion.p>

            {/* Search Input Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-xl group"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur opacity-15 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-60 transition duration-500" />
              
              <div className="relative flex items-center bg-white dark:bg-[#0d1220]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-1.5 shadow-md dark:shadow-none">
                <GlowingEffect
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1.5}
                  spread={40}
                  glow={false}
                />
                <div className="flex items-center pl-3 pr-2 text-slate-400 z-10">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search job titles, skills, or companies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none w-full text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 py-2.5 z-10"
                />
                <Button 
                  onClick={searchJobHandler} 
                  className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-white font-semibold h-10 px-5 sm:px-6 rounded-xl transition duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0 z-10"
                >
                  Search
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl"
              >
                <Button 
                  onClick={handleFindJobsClick}
                  className="relative overflow-hidden bg-slate-900 hover:bg-slate-950 text-white dark:bg-gradient-to-r dark:from-yellow-400 dark:to-sky-400 dark:text-[#020817] dark:hover:from-yellow-300 dark:hover:to-sky-300 border border-slate-800 dark:border-transparent font-semibold px-6 py-5.5 rounded-xl transition-all duration-300 shrink-0 text-sm sm:text-base shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <GlowingEffect
                    disabled={true}
                    proximity={48}
                    inactiveZone={0.01}
                    borderWidth={1.2}
                    spread={30}
                    glow={false}
                  />
                  <span className="relative z-10">Find Jobs</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => navigate("/signup")}
                  variant="ghost"
                  className="text-slate-600 dark:text-sky-200 hover:text-slate-900 dark:hover:text-sky-300 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold px-5 py-5.5 rounded-xl transition shrink-0 text-sm sm:text-base flex items-center gap-1.5 group"
                >
                  <span>Hire Talent</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Counter Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/5 pt-8 max-w-lg animate-transition"
            >
              <div className="text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {loadingStats ? "..." : (allJobs?.length || 0)}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-0.5">Active Jobs</p>
              </div>
              <div className="text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {loadingStats ? "..." : (companyCount || 0)}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-0.5">Companies</p>
              </div>
              <div className="text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {loadingStats ? "..." : totalPositions}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-0.5">Open Positions</p>
              </div>
            </motion.div>

          </div>

          <div className="lg:col-span-5 relative w-full max-w-xl mx-auto select-none mt-8 lg:mt-0 overflow-visible">
            {/* Visual backdrop radial light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 blur-[100px] -z-10" />

            <div className="relative w-full h-[480px] flex items-center justify-center overflow-visible" style={{ perspective: 1000 }}>
              
              {/* THE CENTERPIECE: Dominant Featured Job Card (70% attention) */}
              {loadingStats ? (
                <div className="w-[300px] sm:w-[340px] h-[260px] sm:h-[290px] rounded-[2rem] border border-white/10 bg-[#0B1220] backdrop-blur-xl animate-pulse z-20" />
              ) : floatingJobs[0] ? (
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                  className="w-[300px] sm:w-[340px] h-[260px] sm:h-[290px] shrink-0 relative group/card rounded-[2rem] z-20"
                >
                  <GlareCard
                    onClick={() => navigate(`/description/${floatingJobs[0]._id}`)}
                    className="p-6 hover:bg-white dark:hover:bg-[#0B1220]/90 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_90px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_30px_90px_rgba(56,189,248,0.2)] md:rotate-[-0.5deg] hover:rotate-0"
                  >
                    {/* Inner highlight glows */}
                    <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-xl pointer-events-none z-0" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-xl pointer-events-none z-0" />

                    {/* Top Section */}
                    <div className="flex items-start justify-between gap-3 z-10 relative">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-500 flex items-center justify-center text-white font-semibold text-[12px] uppercase shrink-0 shadow-md">
                          {floatingJobs[0]?.company?.name?.slice(0, 2) || "CO"}
                        </div>
                        <div className="text-left min-w-0">
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[150px] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">{floatingJobs[0]?.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{floatingJobs[0]?.company?.name}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold truncate shrink-0 max-w-[85px]">
                        {floatingJobs[0]?.location || "Remote"}
                      </span>
                    </div>

                    {/* Middle Section */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 text-left z-10 relative leading-relaxed">
                      {floatingJobs[0]?.description || "Experience high-growth software engineering, custom platforms, and product shipping at this top startup."}
                    </p>

                    {/* Bottom Section */}
                    <div className="border-t border-slate-100 dark:border-white/5 pt-3 flex justify-between items-center text-xs z-10 relative">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">{floatingJobs[0]?.jobType}</span>
                        <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">{floatingJobs[0]?.salary} LPA</span>
                      </div>
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-0.5 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                        <span>View Details</span>
                        <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                      </span>
                    </div>
                  </GlareCard>
                  <GlowingEffect
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.01}
                    borderWidth={1.5}
                    spread={50}
                    glow={false}
                  />
                </motion.div>
              ) : (
                <div className="w-[300px] sm:w-[340px] h-[260px] sm:h-[290px] rounded-[2rem] border border-white/10 bg-[#0B1220] backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] p-6 flex items-center justify-center text-slate-500 text-xs z-20">No Jobs Posted</div>
              )}

              {/* FLOATING SUPPORTING WIDGET 1: Top Right - Application Tracking (20% attention) */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="absolute -top-6 -right-4 sm:-right-8 md:-right-12 z-10 w-[170px] sm:w-[190px] shrink-0 group/track rounded-2xl"
              >
                <div className="p-4 bg-white dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left flex flex-col justify-between h-[140px] relative overflow-hidden hover:shadow-[0_20px_60px_rgba(56,189,248,0.15)] dark:hover:shadow-[0_20px_60px_rgba(56,189,248,0.2)] transition-all duration-300">
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-cyan-500/10 blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-1.5 z-10 relative">
                    <div className="h-5 w-5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-800 dark:text-white tracking-wide uppercase">Applications</span>
                  </div>
                  
                  <div className="space-y-1.5 py-1 z-10 relative">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-600 dark:text-slate-300 truncate max-w-[85px] font-semibold">Software Eng</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold text-[8px] uppercase tracking-wider scale-90">Accepted</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-600 dark:text-slate-300 truncate max-w-[85px] font-semibold">UI/UX Intern</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold text-[8px] uppercase tracking-wider scale-90">Pending</span>
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
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.03 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 md:-right-14 z-10 w-[160px] sm:w-[180px] shrink-0 group/comm rounded-2xl"
              >
                <div className="p-3.5 bg-white dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between h-[145px] relative overflow-hidden hover:shadow-[0_20px_60px_rgba(250,204,21,0.15)] dark:hover:shadow-[0_20px_60px_rgba(250,204,21,0.2)] transition-all duration-300">
                  <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-1.5 z-10 relative text-left">
                    <div className="h-5 w-5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Users className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-800 dark:text-white tracking-wide uppercase">Community</span>
                  </div>

                  <div className="flex items-center justify-around gap-1.5 py-1 z-10 relative flex-1">
                    {/* Left Circle: Students */}
                    <div className="flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <svg className="w-10 h-10 transform -rotate-90">
                          <circle cx="20" cy="20" r="16" className="stroke-slate-100 dark:stroke-white/5" strokeWidth="2" fill="transparent" />
                          <circle cx="20" cy="20" r="16" className="stroke-cyan-500 dark:stroke-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]" strokeWidth="2" fill="transparent" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={(2 * Math.PI * 16) * (1 - Math.min((animatedStudents || 1) / (animatedStudents + animatedRecruiters || 50), 0.85))} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[8px] font-semibold text-cyan-600 dark:text-cyan-300">{animatedStudents}</span>
                      </div>
                      <span className="text-[7px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Students</span>
                    </div>

                    {/* Right Circle: Recruiters */}
                    <div className="flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <svg className="w-10 h-10 transform -rotate-90">
                          <circle cx="20" cy="20" r="16" className="stroke-slate-100 dark:stroke-white/5" strokeWidth="2" fill="transparent" />
                          <circle cx="20" cy="20" r="16" className="stroke-amber-500 dark:stroke-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]" strokeWidth="2" fill="transparent" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={(2 * Math.PI * 16) * (1 - Math.min((animatedRecruiters || 1) / (animatedStudents + animatedRecruiters || 50), 0.85))} strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-[8px] font-semibold text-amber-600 dark:text-amber-300">{animatedRecruiters}</span>
                      </div>
                      <span className="text-[7px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Hires</span>
                    </div>
                  </div>

                  <div className="text-[8px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-1.5 font-medium uppercase tracking-wider z-10 relative text-center">
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
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-8 -left-4 sm:-left-8 md:-left-12 z-30 bg-white dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex items-center gap-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.15)] dark:hover:shadow-[0_15px_45px_rgba(6,182,212,0.2)] hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className="h-6 w-6 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-semibold text-slate-800 dark:text-white uppercase tracking-wider leading-none">Recruiter Active</p>
                  <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[80px]">{floatingJobs[0]?.company?.name || "ApexHQ"} hired</p>
                </div>
              </motion.div>

              {/* FLOATING SUPPORTING BADGE 4: Bottom Left - New Job Posted */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 6.8, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -left-4 sm:-left-8 md:-left-10 z-30 bg-white dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#101827] dark:to-[#111827] border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl flex items-center gap-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_15px_45px_rgba(245,158,11,0.2)] hover:border-amber-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className="h-6 w-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Briefcase className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-semibold text-white uppercase tracking-wider leading-none">New Posting</p>
                  <p className="text-[8px] text-slate-400 mt-0.5 truncate max-w-[95px]">{floatingJobs[1]?.title || "NodeJS Dev"} live</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;