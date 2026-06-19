import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import {
  Contact,
  Mail,
  Pen,
  CameraIcon,
  FileText,
  CheckCircle2,
  GraduationCap,
  BriefcaseBusiness,
  GithubIcon,
  Linkedin,
} from "lucide-react";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const isResume = user?.profile?.resume;
  const skills = user?.profile?.skills || [];
  const education = user?.profile?.education || "";
  const experience = user?.profile?.experience || [];

  const changePhotoHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile photo updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Photo update failed");
    }
  };

  let profileCompletion = 0;

  if (user?.fullname) profileCompletion += 10;
  if (user?.email) profileCompletion += 10;
  if (user?.phoneNumber) profileCompletion += 10;
  if (user?.profile?.profilePhoto) profileCompletion += 10;
  if (user?.profile?.bio) profileCompletion += 10;
  if (user?.profile?.githubLink) profileCompletion += 5;
  if (user?.profile?.linkedinLink) profileCompletion += 5;
  if (skills.length > 0) profileCompletion += 10;
  if (user?.profile?.education) profileCompletion += 10;
  if (user?.profile?.experience?.length > 0) profileCompletion += 10;
  if (isResume) profileCompletion += 10;

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 pb-16 overflow-x-hidden">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-[620px] overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#111827] dark:to-[#0B1220] border border-slate-200/80 dark:border-white/10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02]">
            <div className="relative group">
              <Avatar className="h-36 w-36 shadow-xl ring-4 ring-cyan-500/60 dark:ring-cyan-400/50">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || "User"}
                />
              </Avatar>

              <label
                htmlFor="profile-photo"
                className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center cursor-pointer shadow-lg transition"
              >
                <CameraIcon className="h-4 w-4" />
              </label>

              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changePhotoHandler}
              />
            </div>

            <div className="mt-8 w-full">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-500 dark:text-slate-400">
                  Profile Completion
                </span>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {profileCompletion}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-cyan-400"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 w-full">
              <SummaryBox title="Skills" value={skills.length} />
              <SummaryBox title="Resume" value={isResume ? "Yes" : "No"} />

              <a
                href={user?.profile?.linkedinLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 p-4 flex flex-col items-center transition ${user?.profile?.linkedinLink
                    ? "hover:border-sky-400 cursor-pointer"
                    : "opacity-50 pointer-events-none"
                  }`}
              >
                <Linkedin className="h-5 w-5 text-sky-500 mb-1" />
                <p className="text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
              </a>

              <a
                href={user?.profile?.githubLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 p-4 flex flex-col items-center transition ${user?.profile?.githubLink
                    ? "hover:border-slate-500 cursor-pointer"
                    : "opacity-50 pointer-events-none"
                  }`}
              >
                <GithubIcon className="h-5 w-5 text-slate-800 dark:text-white mb-1" />
                <p className="text-xs text-slate-500 dark:text-slate-400">GitHub</p>
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {user?.fullname}
                  </h1>

                  <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 rounded-full">
                    Active Candidate
                  </Badge>
                </div>

                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  {user?.profile?.bio || "No bio added yet"}
                </p>
              </div>

              <Button
                onClick={() => setOpen(true)}
                className="bg-white text-slate-900 hover:bg-slate-100 dark:bg-white dark:text-slate-900 rounded-full px-5 gap-2 shrink-0"
              >
                <Pen className="h-4 w-4" />
                Edit
              </Button>
            </div>

            <div className="my-8 border-t border-slate-100 dark:border-white/5" />

            <div className="space-y-4">
              <InfoRow label="Email" icon={<Mail className="h-4 w-4 text-cyan-500" />}>
                {user?.email || "Not added"}
              </InfoRow>

              <InfoRow label="Phone" icon={<Contact className="h-4 w-4 text-amber-500" />}>
                {user?.phoneNumber || "Not added"}
              </InfoRow>

              <InfoRow label="Resume" icon={<FileText className="h-4 w-4 text-cyan-500" />}>
                {isResume ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user?.profile?.resume}
                    className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline break-all"
                  >
                    {user?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  "No resume uploaded"
                )}
              </InfoRow>
            </div>

            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.length ? (
                  skills.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-cyan-500/10 text-cyan-600 dark:text-green-500 border border-cyan-500/20 text-sm font-bold px-3 py-1 rounded-full"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {item}
                    </Badge>
                  ))
                ) : (
                  <EmptyText text="No skills added yet" />
                )}
              </div>
            </Section>

            <Section title="Education" icon={<GraduationCap className="h-4 w-4 text-amber-500" />}>
              {education ? (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {education}
                </p>
              ) : (
                <EmptyText text="No education added yet" />
              )}
            </Section>

            <Section title="Experience" icon={<BriefcaseBusiness className="h-4 w-4 text-cyan-500" />}>
              {experience.length ? (
                experience.map((item, index) => (
                  <p key={index} className="text-sm text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                ))
              ) : (
                <EmptyText text="No experience added yet" />
              )}
            </Section>
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

const SummaryBox = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 p-4">
      <p className="text-xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{title}</p>
    </div>
  );
};

const InfoRow = ({ label, icon, children }) => {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-4 text-sm">
      <span className="text-slate-400 dark:text-slate-500">{label}</span>
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 break-all">
        {icon}
        <div>{children}</div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => {
  return (
    <div className="mt-8 border-t border-slate-100 dark:border-white/5 pt-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <Label className="font-semibold text-slate-900 dark:text-white">
          {title}
        </Label>
      </div>
      {children}
    </div>
  );
};

const EmptyText = ({ text }) => {
  return <span className="text-sm text-slate-400">{text}</span>;
};

export default ProfileCard;