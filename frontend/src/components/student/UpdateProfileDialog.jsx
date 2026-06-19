import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: String(user?.phoneNumber || ""),
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(",") || "",
        linkedin: user?.profile?.linkedinLink || "",
        github: user?.profile?.githubLink || "",
        education: user?.profile?.education || "",
        experience: user?.profile?.experience?.join(", ") || "",
        file: null
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (user && open) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: String(user?.phoneNumber || ""),
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills?.join(", ") || "",
                linkedin: user?.profile?.linkedinLink || "",
                github: user?.profile?.githubLink || "",
                education: user?.profile?.education || "",
                experience: user?.profile?.experience?.join(", ") || "",
                file: null
            });
        }
    }, [user, open]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.fullname.trim() ||
            !input.email.trim() ||
            !String(input.phoneNumber).trim() ||
            !input.skills.trim() ||
            !input.education.trim()
        ) {
            toast.error("Please fill all required fields before updating.");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("linkedin", input.linkedin);
        formData.append("github", input.github);
        formData.append("education", input.education);
        formData.append("experience", input.experience);
        

        if (input.file) {
            formData.append("resume", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="w-[95%] sm:max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-0 shadow-2xl"
                onInteractOutside={() => setOpen(false)}
            >
                <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-100 dark:border-white/10 px-6 py-5">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                            Update Profile
                        </DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Keep your Career Canvas profile updated.
                        </p>
                    </DialogHeader>
                </div>

                <form onSubmit={submitHandler} id="update-profile-form" className="flex flex-col max-h-[calc(90vh-96px)]">
                    <div className="overflow-y-auto px-6 py-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Full Name *" id="fullname" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Your name" />
                            <InputField label="Email Address *" id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} placeholder="example@email.com" />
                            <InputField label="Phone Number *" id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Your phone number" />
                            <InputField label="Skills *" id="skills" name="skills" value={input.skills} onChange={changeEventHandler} placeholder="React, Node.js, MongoDB" />
                            <InputField label="Education *" id="education" name="education" value={input.education} onChange={changeEventHandler} placeholder="B.Tech CSE, College name" />
                            <InputField label="Experience" id="experience" name="experience" value={input.experience} onChange={changeEventHandler} placeholder="Frontend Intern, Company name" />
                            <InputField label="LinkedIn" id="linkedin" name="linkedin" value={input.linkedin} onChange={changeEventHandler} placeholder="https://linkedin.com/in/username" />
                            <InputField label="GitHub" id="github" name="github" value={input.github} onChange={changeEventHandler} placeholder="https://github.com/username" />

                            <div className="sm:col-span-2">
                                <InputField label="Bio" id="bio" name="bio" value={input.bio} onChange={changeEventHandler} placeholder="Tell something about yourself" />
                            </div>

                            <div className="sm:col-span-2 space-y-1">
                                <Label htmlFor="file" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    Resume
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="h-10 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 file:text-slate-700 dark:file:text-slate-200"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-t border-slate-100 dark:border-white/10 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="h-10 w-full sm:w-auto px-5 rounded-xl text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
                        >
                            Cancel
                        </button>

                        {loading ? (
                            <Button disabled className="h-10 w-full sm:w-auto rounded-xl">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="h-10 w-full sm:w-auto rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6"
                            >
                                Update Profile
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

const InputField = ({ label, id, name, value, onChange, placeholder, type = "text" }) => {
    return (
        <div className="space-y-1">
            <Label
                htmlFor={id}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
                {label}
            </Label>

            <Input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-10 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-cyan-400"
            />
        </div>
    );
};

export default UpdateProfileDialog