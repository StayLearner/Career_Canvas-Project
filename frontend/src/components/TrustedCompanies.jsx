import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Cpu, Layers, Radio, Award, Compass } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';

// Fixed templates for visual icons, colors, and default names
const companyTemplates = [
  { icon: Cpu, color: 'text-cyan-400', defaultName: 'InnovateX' },
  { icon: Layers, color: 'text-blue-400', defaultName: 'CloudNest' },
  { icon: Building2, color: 'text-violet-400', defaultName: 'ApexHQ' },
  { icon: Radio, color: 'text-indigo-400', defaultName: 'Velocity' },
  { icon: Award, color: 'text-purple-400', defaultName: 'AlphaLabs' },
  { icon: Compass, color: 'text-emerald-400', defaultName: 'TalentFlow' },
];

const TrustedCompanies = () => {
  const [displayCompanies, setDisplayCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fisher-Yates Shuffle algorithm
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/all-companies`, { withCredentials: true });
        if (res.data.success && res.data.companies && res.data.companies.length > 0) {
          // Shuffle dynamic API companies and take first 5 for desktop centering
          const shuffledApi = shuffleArray(res.data.companies);
          setDisplayCompanies(shuffledApi.slice(0, 5));
        } else {
          // Shuffle templates for dynamic ordering on fallback (take 5)
          const shuffledDemo = shuffleArray(companyTemplates).slice(0, 5);
          setDisplayCompanies(shuffledDemo);
        }
      } catch (error) {
        console.error("Failed to fetch companies for logo strip:", error);
        // Fallback to shuffled demo companies on error (take 5)
        const shuffledDemo = shuffleArray(companyTemplates).slice(0, 5);
        setDisplayCompanies(shuffledDemo);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <section className="py-12 border-y border-white/5 bg-[#030712]/50 relative overflow-visible w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 overflow-visible">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase animate-pulse">
              Loading partner organizations...
            </p>
          </div>
          <div className="mt-8 flex flex-nowrap overflow-x-auto lg:overflow-visible justify-start lg:justify-center items-center gap-6 no-scrollbar pb-4 pt-2 px-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-2.5 animate-pulse w-[240px] h-14 bg-white/5 border border-white/5 shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 border-y border-white/5 bg-[#030712]/50 relative overflow-visible w-full">
      {/* Background line accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Empowering growth for talent at top-tier startups & tech giants
          </p>
        </motion.div>

        {/* Responsive centered/scrollable flex row */}
        <div className="mt-8 flex flex-nowrap gap-6 overflow-x-auto lg:overflow-visible justify-start lg:justify-center items-center px-4 pb-4 no-scrollbar select-none">
          {displayCompanies.map((company, index) => {
            // Determine if using database company object or template fallback object
            const isApiCompany = !!company._id;
            const companyName = isApiCompany ? company.name : company.defaultName;
            const companyWebsite = isApiCompany ? company.website : null;
            const companyLocation = isApiCompany ? company.location : null;

            // Pick corresponding icon template style based on index (or keep demo custom icon)
            const template = companyTemplates[index % companyTemplates.length];
            const IconComponent = isApiCompany ? template.icon : company.icon;
            const iconColor = isApiCompany ? template.color : company.color;
            const hasWebsite = companyWebsite && companyWebsite.trim() !== "";

            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-2.5 cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/5 group relative shrink-0 w-[240px] h-14"
              >
                <div className={`p-1.5 rounded-lg bg-white/5 transition-colors group-hover:bg-white/10 shrink-0 ${iconColor}`}>
                  <IconComponent className="h-4.5 w-4.5" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors block truncate">
                    {companyName}
                  </span>
                  {companyLocation && (
                    <span className="text-[9px] text-slate-500 block truncate -mt-0.5">
                      {companyLocation}
                    </span>
                  )}
                </div>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );

            if (hasWebsite) {
              return (
                <a 
                  key={isApiCompany ? company._id : index} 
                  href={companyWebsite.startsWith('http') ? companyWebsite : `https://${companyWebsite}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="no-underline shrink-0 block"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={isApiCompany ? company._id : index} className="shrink-0">
                {content}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Hide scrollbars for chrome, safari and opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbars for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default TrustedCompanies;
