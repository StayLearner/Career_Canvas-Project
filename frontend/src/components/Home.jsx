import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import TrustedCompanies from './TrustedCompanies'
import StudentFeatures from './StudentFeatures'
import RecruiterFeatures from './RecruiterFeatures'
import HowItWorks from './HowItWorks'
import LatestJobs from './LatestJobs'
import FinalCTA from './FinalCTA'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import LightRays from './LightRays'

const Home = () => {
  const dispatch = useDispatch();
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 font-sans relative overflow-x-hidden transition-colors duration-500">
      {/* LightRays WebGL background wrapper */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 dark:opacity-45 transition-opacity duration-500">
        <LightRays
          raysOrigin="top-center"
          raysColor="#38bdf8"
          raysSpeed={1.2}
          lightSpread={0.9}
          rayLength={1.4}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.04}
          pulsating={true}
          className="w-full h-full"
        />
      </div>

      {/* Second subtle yellow/amber glow layer using CSS radial gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,204,21,0.03),transparent_50%),radial-gradient(circle_at_20%_30%,rgba(250,204,21,0.02),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(250,204,21,0.06),transparent_50%),radial-gradient(circle_at_20%_30%,rgba(250,204,21,0.04),transparent_40%)] transition-colors duration-500" />

      {/* Soft white/light glass overlay */}
      <div className="absolute inset-0 bg-slate-900/[0.01] dark:bg-white/[0.02] backdrop-blur-[8px] pointer-events-none z-0" />

      {/* Background glowing ambient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-[120px] animate-pulse-glow -z-10" />
      <div className="absolute top-[800px] right-20 w-[450px] h-[450px] rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[150px] animate-pulse-glow -z-10" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[1800px] left-1/4 w-[400px] h-[400px] rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-[150px] animate-pulse-glow -z-10" style={{ animationDelay: '8s' }} />
      <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[130px] -z-10 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Main page layout flow */}
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TrustedCompanies />
        <StudentFeatures />
        <RecruiterFeatures />
        <HowItWorks />
        <LatestJobs />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Home;