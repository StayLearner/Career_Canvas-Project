import React from "react";
import Navbar from "../shared/Navbar";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { CalendarDays, Search } from "lucide-react";

const AppliedJobsCard = () => {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusClass = (status) => {
    if (status === "accepted") {
      return "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
    }

    if (status === "rejected") {
      return "bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20";
    }

    return "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-sky-50 via-white to-amber-50 dark:bg-[#020817] dark:bg-none text-slate-800 dark:text-slate-100 pb-16">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="mb-7">
          <p className="text-sm font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
            Student Dashboard
          </p>

          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white font-heading">
            Applied Jobs
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            View every job you have applied to and track your current hiring
            status in one place.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.18),transparent_35%)] dark:hidden pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-7 py-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <h2 className="font-semibold text-xl text-slate-950 dark:text-white font-heading">
                Application History
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Track your submitted job applications and current review status.
              </p>
            </div>

            <span className="w-fit text-xs px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20 font-semibold">
              {allAppliedJobs.length} Applications
            </span>
          </div>

          <div className="relative z-10 p-5 sm:p-7">
            {allAppliedJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-14 w-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Search className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>

                <h3 className="font-semibold text-slate-950 dark:text-white">
                  No Applications Yet
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-sm">
                  Start exploring jobs and your applications will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allAppliedJobs.map((appliedJob) => {
                  const companyName =
                    appliedJob?.job?.company?.name || "Unknown Company";
                  const jobTitle = appliedJob?.job?.title || "Untitled Role";
                  const status = appliedJob?.status || "pending";
                  const date = appliedJob?.createdAt?.split("T")[0];

                  return (
                    <div
                      key={appliedJob._id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:bg-sky-50/80 hover:border-sky-200 hover:shadow-[0_12px_30px_rgba(14,165,233,0.12)] dark:bg-[#081120]/90 dark:border-white/5 dark:hover:bg-[#111827] dark:hover:border-white/10 dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.12)] transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="h-12 w-12 rounded-xl bg-cyan-100 border border-cyan-200 dark:bg-cyan-500/20 dark:border-cyan-500/10 flex items-center justify-center font-bold text-sm text-cyan-700 dark:text-cyan-400 shrink-0 shadow-sm">
                            {getInitials(companyName)}
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base text-slate-950 dark:text-white truncate font-heading">
                              {jobTitle}
                            </h3>

                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                              {companyName}
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              <span>{date || "Date not available"}</span>
                            </div>
                          </div>
                        </div>

                        <Badge
                          className={`${getStatusClass(
                            status
                          )} rounded-full px-3 py-1 font-semibold shadow-none w-fit`}
                        >
                          {status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobsCard;