import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, Building2, Briefcase, CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import axios from 'axios';
import { COMPANY_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';

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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-[130px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description, Search, Stats */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            
            {/* Top Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-cyan-300 border border-white/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Next-Generation Career Canvas</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none"
            >
              Seek, Apply & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Build Your Future
              </span>
            </motion.h1>

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl"
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
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative flex items-center bg-[#0d1220]/90 border border-white/10 rounded-2xl p-1.5">
                <div className="flex items-center pl-3 pr-2 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search job titles, skills, or companies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none w-full text-sm sm:text-base text-white placeholder-slate-500 py-2.5"
                />
                <Button 
                  onClick={searchJobHandler} 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold h-10 px-5 sm:px-6 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0"
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
              <Button 
                onClick={handleFindJobsClick}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold px-6 py-5.5 rounded-xl transition-all duration-300 shrink-0 text-sm sm:text-base"
              >
                Find Jobs
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/5 font-semibold px-5 py-5.5 rounded-xl transition shrink-0 text-sm sm:text-base flex items-center gap-1.5"
              >
                <span>Hire Talent</span>
                <span className="text-cyan-400 font-bold">→</span>
              </Button>
            </motion.div>

            {/* Stats Counter Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 max-w-lg"
            >
              <div className="text-left">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {loadingStats ? "..." : (allJobs?.length || 0)}
                </h4>
                <p className="text-xs text-slate-500 font-medium uppercase mt-0.5">Active Jobs</p>
              </div>
              <div className="text-left">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {loadingStats ? "..." : (companyCount || 0)}
                </h4>
                <p className="text-xs text-slate-500 font-medium uppercase mt-0.5">Companies</p>
              </div>
              <div className="text-left">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {loadingStats ? "..." : totalPositions}
                </h4>
                <p className="text-xs text-slate-500 font-medium uppercase mt-0.5">Open Positions</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating 3D Cards */}
          <div className="lg:col-span-5 relative w-full max-w-xl mx-auto select-none mt-8 lg:mt-0 overflow-visible">
            {/* Visual backdrop radial light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] -z-10 animate-pulse-glow" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-visible" style={{ perspective: 1000 }}>
              
              {/* Card 1: Featured Job 1 */}
              {loadingStats ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl animate-pulse h-[190px] shrink-0" />
              ) : floatingJobs[0] ? (
                <motion.div
                  onClick={() => navigate(`/description/${floatingJobs[0]._id}`)}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 8, 
                    rotateX: -8,
                    borderColor: "rgba(6, 182, 212, 0.4)",
                    boxShadow: "0 0 40px rgba(6, 182, 212, 0.25)"
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)] p-5 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group flex flex-col justify-between h-[190px] relative overflow-hidden shrink-0"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-[11px] uppercase shrink-0 shadow-md">
                        {floatingJobs[0]?.company?.name?.slice(0, 2) || "CO"}
                      </div>
                      <div className="text-left min-w-0">
                        <h4 className="text-xs font-bold text-slate-100 truncate max-w-[110px] group-hover:text-cyan-400 transition-colors leading-tight">{floatingJobs[0]?.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{floatingJobs[0]?.company?.name}</p>
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium truncate shrink-0 max-w-[70px]">
                      {floatingJobs[0]?.location || "Remote"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[9px] text-left">
                    <span className="bg-white/5 border border-white/5 text-slate-300 px-1.5 py-0.5 rounded">{floatingJobs[0]?.jobType}</span>
                    <span className="bg-white/5 border border-white/5 text-slate-300 px-1.5 py-0.5 rounded">{floatingJobs[0]?.salary} LPA</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 text-[9px]">{floatingJobs[0]?.createdAt ? new Date(floatingJobs[0].createdAt).toLocaleDateString() : "Recent"}</span>
                    <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:text-cyan-300 transition-colors">
                      <span>View Details</span>
                      <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)] p-5 flex items-center justify-center text-slate-500 text-xs h-[190px] shrink-0">No Jobs Posted</div>
              )}

              {/* Card 2: Application Tracking */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: -8, 
                  rotateX: -8,
                  borderColor: "rgba(139, 92, 246, 0.4)",
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.25)"
                }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)] p-5 flex flex-col justify-between h-[190px] relative overflow-hidden shrink-0"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-white tracking-wide uppercase">Application Tracking</span>
                </div>
                
                <div className="space-y-2 py-1 text-left">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-300 truncate max-w-[95px] font-medium">Software Eng</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[8px] uppercase tracking-wider">Accepted</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-300 truncate max-w-[95px] font-medium">UI/UX Intern</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[8px] uppercase tracking-wider">Pending</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-300 truncate max-w-[95px] font-medium">Backend Arch</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-[8px] uppercase tracking-wider">Rejected</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Featured Job 2 */}
              {loadingStats ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl animate-pulse h-[190px] shrink-0" />
              ) : floatingJobs[1] ? (
                <motion.div
                  onClick={() => navigate(`/description/${floatingJobs[1]._id}`)}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 8, 
                    rotateX: 8,
                    borderColor: "rgba(139, 92, 246, 0.4)",
                    boxShadow: "0 0 40px rgba(139, 92, 246, 0.25)"
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)] p-5 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group flex flex-col justify-between h-[190px] relative overflow-hidden shrink-0"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60" />
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-[11px] uppercase shrink-0 shadow-md">
                        {floatingJobs[1]?.company?.name?.slice(0, 2) || "CO"}
                      </div>
                      <div className="text-left min-w-0">
                        <h4 className="text-xs font-bold text-slate-100 truncate max-w-[110px] group-hover:text-violet-400 transition-colors leading-tight">{floatingJobs[1]?.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{floatingJobs[1]?.company?.name}</p>
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium truncate shrink-0 max-w-[70px]">
                      {floatingJobs[1]?.location || "Remote"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[9px] text-left">
                    <span className="bg-white/5 border border-white/5 text-slate-300 px-1.5 py-0.5 rounded">{floatingJobs[1]?.jobType}</span>
                    <span className="bg-white/5 border border-white/5 text-slate-300 px-1.5 py-0.5 rounded">{floatingJobs[1]?.salary} LPA</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 text-[9px]">{floatingJobs[1]?.createdAt ? new Date(floatingJobs[1].createdAt).toLocaleDateString() : "Recent"}</span>
                    <span className="text-violet-400 font-bold flex items-center gap-0.5 group-hover:text-violet-300 transition-colors">
                      <span>View Details</span>
                      <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)] p-5 flex items-center justify-center text-slate-500 text-xs h-[190px] shrink-0">No Jobs Posted</div>
              )}

              {/* Card 4: Community Growth */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: -8, 
                  rotateX: 8,
                  borderColor: "rgba(139, 92, 246, 0.4)",
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.25)"
                }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)] p-4 flex flex-col justify-between h-[190px] relative overflow-hidden shrink-0 animate-float-slow-delayed"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shadow-inner shrink-0">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-white tracking-wide uppercase">Community Growth</span>
                </div>

                <div className="flex items-center justify-around gap-2 py-1.5">
                  {/* Left Circle: Students */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center mb-1">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="23"
                          className="stroke-white/5"
                          strokeWidth="3"
                          fill="transparent"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="23"
                          className="stroke-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
                          strokeWidth="3"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 23}
                          strokeDashoffset={(2 * Math.PI * 23) * (1 - Math.min((animatedStudents || 1) / (animatedStudents + animatedRecruiters || 50), 0.85))}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-cyan-300">{animatedStudents}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <GraduationCap className="h-3 w-3 text-cyan-400" />
                      <span className="text-[9px] font-semibold text-slate-300">Students</span>
                    </div>
                  </div>

                  {/* Right Circle: Recruiters */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center mb-1">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="23"
                          className="stroke-white/5"
                          strokeWidth="3"
                          fill="transparent"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="23"
                          className="stroke-violet-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]"
                          strokeWidth="3"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 23}
                          strokeDashoffset={(2 * Math.PI * 23) * (1 - Math.min((animatedRecruiters || 1) / (animatedStudents + animatedRecruiters || 50), 0.85))}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-violet-300">{animatedRecruiters}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Briefcase className="h-3 w-3 text-violet-400" />
                      <span className="text-[9px] font-semibold text-slate-300">Recruiters</span>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 text-center border-t border-white/5 pt-1.5 font-medium uppercase tracking-wider">
                  Real-time Registered Users
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