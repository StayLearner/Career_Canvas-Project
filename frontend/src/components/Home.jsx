import React, { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import TrustedCompanies from './TrustedCompanies'
import HowItWorks from './HowItWorks'

import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import Prism from './Prism'
import Grainient from './Grainient'
import useReducedMotion from '@/hooks/useReducedMotion'

const StudentFeatures = lazy(() => import('./StudentFeatures'));
const RecruiterFeatures = lazy(() => import('./RecruiterFeatures'));
const LatestJobs = lazy(() => import('./LatestJobs'));

const Home = () => {
  const dispatch = useDispatch();
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Detect theme from html element's dark class dynamically
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);



  useEffect(() => {
    // Initial sync
    setIsDark(document.documentElement.classList.contains("dark"));

    // Observe class attribute of documentElement to capture toggles
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#08070d] min-h-screen text-slate-800 dark:text-slate-100 font-sans relative overflow-x-hidden transition-colors duration-500">

      {/* ── BACKGROUND LAYER: Dynamically swaps to only keep ONE WebGL context alive at a time ── */}
      {isDark ? (
        /* ── DARK MODE ONLY: Prism WebGL spectral background ── */
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Prism WebGL layer — fills entire viewport */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.92 }}>
            <Prism
              animationType="rotate"
              timeScale={prefersReducedMotion ? 0 : 0.4}
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
      ) : (
        /* ── LIGHT MODE: Grainient WebGL premium animated background ── */
        <div className="fixed inset-0 pointer-events-none z-0">
          <Grainient
            color1="#FACC15"
            color2="#38BDF8"
            color3="#F8FAFC"
            timeSpeed={prefersReducedMotion ? 0 : 0.18}
            colorBalance={0.25}
            warpStrength={0.8}
            warpFrequency={3.5}
            warpSpeed={1.2}
            warpAmplitude={65}
            blendAngle={-20}
            blendSoftness={0.12}
            rotationAmount={280}
            noiseScale={1.6}
            grainAmount={0.035}
            grainScale={1.4}
            grainAnimated={false}
            contrast={1.12}
            gamma={1.0}
            saturation={0.95}
            centerX={0}
            centerY={-0.08}
            zoom={1.05}
            className="absolute inset-0 w-full h-full"
          />

          {/* Soft white overlay for readability and premium AI startup look */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/35 to-white/70 pointer-events-none" />
        </div>
      )}

      {/* Main page layout flow — sits above all backgrounds */}
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TrustedCompanies />
        <Suspense fallback={<div className="py-20 text-center text-slate-500/80 animate-pulse">Loading features...</div>}>
          <StudentFeatures />
        </Suspense>
        <Suspense fallback={<div className="py-20 text-center text-slate-500/80 animate-pulse">Loading pipeline console...</div>}>
          <RecruiterFeatures />
        </Suspense>
        <HowItWorks />
        <Suspense fallback={<div className="py-20 text-center text-slate-500/80 animate-pulse">Loading openings...</div>}>
          <LatestJobs />
        </Suspense>

      </main>
      <Footer />
    </div>
  )
}

export default Home;