import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import UpdateProfileDialog from "../UpdateProfileDialog";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume;

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 mt-5">
        <div className="bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-5 pb-6 border-b border-slate-100 dark:border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 shadow-md ring-4 ring-amber-400/80 dark:ring-amber-400/50">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User"}
                />
              </Avatar>

              <div className="space-y-1">
                <h1 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {user?.fullname}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 break-words">
                  {user?.profile?.bio || "No bio added yet"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full p-2 h-10 w-10"
            >
              <Pen className="h-4 w-4" />
            </Button>
          </div>

          <div className="my-6 space-y-3 text-left">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 break-all text-sm sm:text-base">
              <Mail className="h-4 w-4 text-cyan-500 shrink-0" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              <Contact className="h-4 w-4 text-amber-500 shrink-0" />
              <span>{user?.phoneNumber || "No contact info"}</span>
            </div>
          </div>

          <div className="my-6 border-t border-slate-100 dark:border-white/5 pt-6 text-left">
            <h2 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider">
              Skills
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-cyan-500/20 shadow-none transition"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-400">
                  No skills added yet
                </span>
              )}
            </div>
          </div>

          <div className="my-6 border-t border-slate-100 dark:border-white/5 pt-6 text-left">
            <Label className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white block mb-2">
              Resume
            </Label>

            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
                className="text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer font-semibold break-all text-sm sm:text-base block mt-1"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-sm text-slate-400">
                No resume uploaded
              </span>
            )}
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProfileCard;