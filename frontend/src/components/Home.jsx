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
    <div className="bg-[#030712] min-h-screen text-slate-100 font-sans relative overflow-x-hidden">
      {/* Background glowing ambient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-violet-600/10 blur-[120px] animate-pulse-glow -z-10" />
      <div className="absolute top-[800px] right-20 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[150px] animate-pulse-glow -z-10" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[1800px] left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-glow -z-10" style={{ animationDelay: '8s' }} />
      <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-indigo-600/10 blur-[130px] -z-10 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Main page layout flow */}
      <Navbar />
      <main>
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