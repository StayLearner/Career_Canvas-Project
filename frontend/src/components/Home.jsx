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
import Prism from './Prism'

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
    <div className="bg-[#FAFBFC] dark:bg-[#08070d] min-h-screen text-slate-800 dark:text-slate-100 font-sans relative overflow-x-hidden transition-colors duration-500">

      {/* ── DARK MODE ONLY: Prism WebGL spectral background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block">
        {/* Prism WebGL layer — fills entire viewport */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.92 }}>
          <Prism
            animationType="rotate"
            timeScale={0.4}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.02}
            glow={1.1}
            bloom={1.15}
            transparent={true}
          />
        </div>

        {/* Deep dark base — keeps background from being too bright */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(8, 7, 13, 0.62)',
            pointerEvents: 'none',
          }}
        />

        {/* Strong blue/cyan beam glow at the bottom — matches screenshot */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '110%',
            height: '42%',
            background:
              'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(14,165,233,0.55) 0%, rgba(56,189,248,0.28) 40%, transparent 75%)',
            filter: 'blur(2px)',
            pointerEvents: 'none',
          }}
        />

        {/* Warm amber/yellow center glow — matches screenshot center warmth */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '55%',
            background:
              'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(245,158,11,0.13) 0%, rgba(250,204,21,0.07) 50%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />

        {/* Soft cyan/teal left side glow */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '-5%',
            width: '40%',
            height: '60%',
            background:
              'radial-gradient(ellipse 80% 80% at 10% 50%, rgba(6,182,212,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Soft green/teal right side glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-5%',
            width: '35%',
            height: '50%',
            background:
              'radial-gradient(ellipse 80% 80% at 90% 40%, rgba(20,184,166,0.09) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Vignette — dark edges to frame the glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,7,13,0.75) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top dark fade so navbar stays readable */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, rgba(8,7,13,0.80) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── LIGHT MODE: subtle premium gradients (unchanged) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 dark:hidden">
        {/* Soft amber orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-sky-500/5 blur-[120px] animate-pulse" />
        <div className="absolute top-[800px] right-20 w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[150px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[1800px] left-1/4 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[150px] animate-pulse" style={{ animationDelay: '8s' }} />
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main page layout flow — sits above all backgrounds */}
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