import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, UploadCloud, FileText } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const LivePreviewCard = ({ name, description, location, website, logoUrl }) => {
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    return (
        <div className="bg-white/95 dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] relative overflow-hidden flex flex-col justify-between min-h-[320px] text-left">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-cyan-400/10 to-transparent blur-2xl rounded-full" />
            
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    {logoUrl ? (
                        <img src={logoUrl} alt="Preview logo" className="h-16 w-16 rounded-2xl object-cover border border-slate-200 dark:border-white/10 shadow-md" />
                    ) : (
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-xl shadow-md">
                            {initials}
                        </div>
                    )}
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20 uppercase tracking-wider">
                        Employer Brand
                    </span>
                </div>
                
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white truncate">{name || 'Company Name'}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin className="h-3 w-3 text-amber-500" />
                        <span>{location || 'Location not set'}</span>
                    </div>
                </div>

                <p className="text-sm text-slate-655 dark:text-slate-300 line-clamp-3 min-h-[60px]">
                    {description || 'Provide a compelling summary of your workspace brand to attract potential applicants.'}
                </p>
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 pt-4 mt-4 flex items-center justify-between">
                {website ? (
                    <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                        <Globe className="h-3.5 w-3.5" />
                        <span>{website}</span>
                    </a>
                ) : (
                    <span className="text-xs text-slate-400 italic flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5" />
                        Website not set
                    </span>
                )}
                <span className="text-[10px] text-slate-400 dark:text-slate-500">Preview Mock</span>
            </div>
        </div>
    );
};

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Company update failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        })
    }, [singleCompany]);

    useEffect(() => {
        if (input.file) {
            const url = URL.createObjectURL(input.file);
            setLogoPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setLogoPreview(singleCompany?.logo || null);
        }
    }, [input.file, singleCompany]);

    return (
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-amber-50/30 dark:bg-none dark:bg-[#020817] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans pb-16 relative overflow-x-hidden">
            <Navbar />
            
            <div className="max-w-7xl mx-auto pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8">
                
                {/* Back button and page title */}
                <div className="flex items-center gap-4 text-left mb-8 max-w-5xl mx-auto">
                    <Button 
                        onClick={() => navigate("/admin/companies")} 
                        type="button" 
                        variant="outline" 
                        className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-semibold px-4 h-10 shadow-sm transition"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Hub</span>
                    </Button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Workspace Configuration</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Perfect your business brand image and contact parameters.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
                    {/* Left preview card */}
                    <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-4">
                        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 text-left uppercase tracking-wider">Live Workspace Preview</h2>
                        <LivePreviewCard 
                            name={input.name} 
                            description={input.description} 
                            location={input.location} 
                            website={input.website} 
                            logoUrl={logoPreview} 
                        />
                    </div>

                    {/* Right editable form */}
                    <div className="lg:col-span-8 bg-white/95 dark:bg-[#0f172a] border border-slate-200/90 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-left">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200/90 dark:border-white/5 pb-4">Brand Parameters</h3>
                        
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-xs font-semibold text-slate-705 dark:text-slate-350">Company Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        placeholder="Enter company name"
                                        className="h-11 border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="location" className="text-xs font-semibold text-slate-705 dark:text-slate-350">Headquarters Location</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Bangalore, IN or Remote"
                                        className="h-11 border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="website" className="text-xs font-semibold text-slate-705 dark:text-slate-350">Official Website URL</Label>
                                    <Input
                                        id="website"
                                        type="text"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        placeholder="https://company.com"
                                        className="h-11 border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-sky-300/50 focus-visible:border-sky-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="description" className="text-xs font-semibold text-slate-705 dark:text-slate-350">Company Description</Label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        placeholder="Briefly pitch what makes your brand workspaces exceptional..."
                                        rows={4}
                                        className="w-full p-3 text-sm border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus-visible:ring-sky-300/50 focus-visible:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-400 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl transition"
                                    />
                                </div>
                                
                                {/* Premium File Upload Card */}
                                <div className="space-y-2 sm:col-span-2">
                                    <Label className="text-xs font-semibold text-slate-705 dark:text-slate-350">Brand Logo Upload</Label>
                                    <div className="relative group rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-sky-400 dark:hover:border-sky-400/40 p-6 flex flex-col items-center justify-center transition-all bg-slate-50/50 dark:bg-white/[0.01]">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={changeFileHandler}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                        />
                                        <UploadCloud className="h-8 w-8 text-slate-400 group-hover:text-sky-500 transition mb-2" />
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Drag logo here or click to browse</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG, or WEBP up to 2MB</p>
                                        {input.file && (
                                            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-lg text-xs font-semibold border border-cyan-500/20">
                                                <FileText className="h-3.5 w-3.5" />
                                                <span className="truncate max-w-[200px]">{input.file.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/admin/companies")}
                                    className="px-5 py-2.5 h-11 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-305 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/5 rounded-xl font-semibold transition"
                                >
                                    Cancel
                                </Button>
                                {loading ? (
                                    <Button disabled className="px-6 py-2.5 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 flex items-center justify-center gap-2 font-semibold">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Saving changes...</span>
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="px-6 py-2.5 h-11 bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-950 font-bold rounded-xl shadow transition border-0"
                                    >
                                        Save Brand Changes
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup