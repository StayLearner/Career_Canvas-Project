import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Layers, 
  TrendingUp 
} from 'lucide-react';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 rounded-lg shadow-lg text-left z-30">
        <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{payload[0].name}</p>
        <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const RecruiterStats = () => {
  // Invoke hooks to fetch data if not loaded
  useGetAllCompanies();
  useGetAllAdminJobs();

  const { companies } = useSelector(store => store.company);
  const { allAdminJobs } = useSelector(store => store.job);

  const totalCompanies = companies?.length || 0;
  const totalJobs = allAdminJobs?.length || 0;
  const totalApplicants = allAdminJobs?.reduce((acc, job) => acc + (job.applications?.length || 0), 0) || 0;
  const openPositions = allAdminJobs?.reduce((acc, job) => acc + (Number(job.position) || 0), 0) || 0;

  // BarChart activity data mapping
  const activityData = [
    { name: 'Companies', value: totalCompanies, color: '#f59e0b' },
    { name: 'Posted Jobs', value: totalJobs, color: '#06b6d4' },
    { name: 'Applicants', value: totalApplicants, color: '#10b981' },
    { name: 'Positions', value: openPositions, color: '#6366f1' }
  ];

  // PieChart donut 1: Hiring Pipeline
  const pipelineData = [
    { name: 'Applicants', value: totalApplicants, color: '#10b981' },
    { name: 'Open Positions', value: openPositions, color: '#6366f1' }
  ];

  // PieChart donut 2: Workspace Mix
  const workspaceData = [
    { name: 'Companies', value: totalCompanies, color: '#f59e0b' },
    { name: 'Posted Jobs', value: totalJobs, color: '#06b6d4' }
  ];

  // Empty state handling for donut charts
  const getSafeDonutData = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    if (total === 0) {
      return [
        { name: 'Empty', value: 1, color: '#e2e8f0' } // Slate grey placeholder
      ];
    }
    return data;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full select-none">
      
      {/* Left side: Recruiter Activity Overview Bar Chart */}
      <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.02)] flex flex-col h-[320px] text-left">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-4 shrink-0">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-cyan-500" />
              Recruiter Activity Overview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Activity metrics across workspaces and job listings</p>
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.02)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right side: Two Donut Charts */}
      <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
        
        {/* Donut 1: Hiring Pipeline */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.02)] flex items-center justify-between h-[148px] text-left">
          <div className="flex flex-col justify-between h-full min-w-0 flex-1 pr-3">
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider">Hiring Pipeline</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-450">Candidate submission volume</p>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-[#10b981] shrink-0" />
                <span className="truncate">Applicants: {totalApplicants}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-[#6366f1] shrink-0" />
                <span className="truncate">Positions: {openPositions}</span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 flex items-center justify-center h-[110px] w-[110px]">
            <PieChart width={100} height={100}>
              <Pie
                data={getSafeDonutData(pipelineData)}
                cx={50}
                cy={50}
                innerRadius={28}
                outerRadius={38}
                paddingAngle={totalApplicants + openPositions > 0 ? 4 : 0}
                dataKey="value"
              >
                {getSafeDonutData(pipelineData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {totalApplicants + openPositions > 0 && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </div>
        </div>

        {/* Donut 2: Workspace Mix */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-[0_8px_30px_rgba(15,23,42,0.02)] flex items-center justify-between h-[148px] text-left">
          <div className="flex flex-col justify-between h-full min-w-0 flex-1 pr-3">
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider">Workspace Mix</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-450">Active workspaces & job roles</p>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-[#f59e0b] shrink-0" />
                <span className="truncate">Companies: {totalCompanies}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                <span className="h-2 w-2 rounded-full bg-[#06b6d4] shrink-0" />
                <span className="truncate">Posted Jobs: {totalJobs}</span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 flex items-center justify-center h-[110px] w-[110px]">
            <PieChart width={100} height={100}>
              <Pie
                data={getSafeDonutData(workspaceData)}
                cx={50}
                cy={50}
                innerRadius={28}
                outerRadius={38}
                paddingAngle={totalCompanies + totalJobs > 0 ? 4 : 0}
                dataKey="value"
              >
                {getSafeDonutData(workspaceData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {totalCompanies + totalJobs > 0 && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecruiterStats;
