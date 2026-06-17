import React from "react";
import Navbar from "../shared/Navbar";
import AppliedJobTable from "./AppliedJobTable";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const AppliedJobsCard = () => {
  useGetAppliedJobs();

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 mt-5">
        <div className="bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] text-left">
          <h1 className="font-semibold text-lg sm:text-xl text-slate-900 dark:text-white mb-5">
            Applied Jobs
          </h1>

          <AppliedJobTable />
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsCard;