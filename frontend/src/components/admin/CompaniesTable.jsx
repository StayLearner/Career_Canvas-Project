import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Edit2, ExternalLink, MoreVertical, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const CompanyLogo = ({ logo, name }) => {
    const [broken, setBroken] = useState(false);
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    
    if (!logo || broken) {
        return (
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-cyan-400 flex items-center justify-center font-bold text-slate-955 text-xs shadow-md select-none shrink-0">
                {initials}
            </div>
        );
    }
    return (
        <img 
            src={logo} 
            alt={name} 
            onError={() => setBroken(true)}
            className="h-10 w-10 rounded-xl object-cover border border-slate-205 dark:border-white/10 shadow-md shrink-0"
        />
    );
};

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) || 
                   company?.location?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [companies]);

    // Skeleton loaders for table rows and cards
    if (loading) {
        return (
            <div>
                {/* Desktop Skeleton */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-100 dark:border-white/5">
                                <TableHead className="w-16">Logo</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Website</TableHead>
                                <TableHead>Date Added</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((i) => (
                                <TableRow key={i} className="animate-pulse border-slate-100 dark:border-white/5">
                                    <TableCell><div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-white/5" /></TableCell>
                                    <TableCell><div className="h-4 w-32 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell><div className="h-4 w-24 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell><div className="h-4 w-40 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell><div className="h-4 w-20 bg-slate-200 dark:bg-white/5 rounded" /></TableCell>
                                    <TableCell className="text-right"><div className="h-8 w-8 bg-slate-200 dark:bg-white/5 rounded-full ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Mobile Skeleton */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-white/5" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-28 bg-slate-200 dark:bg-white/5 rounded" />
                                    <div className="h-3 w-20 bg-slate-200 dark:bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="h-3 w-full bg-slate-200 dark:bg-white/5 rounded" />
                            <div className="h-8 w-full bg-slate-200 dark:bg-white/5 rounded-lg mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (filterCompany?.length <= 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 shadow-sm">
                    <Building2 className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No company workspaces yet</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">Create your first company profile and start posting jobs.</p>
                <Button 
                    onClick={() => navigate("/admin/companies/create")} 
                    className="bg-gradient-to-r from-yellow-400 to-sky-400 hover:scale-[1.02] text-slate-955 font-bold rounded-xl px-5 py-2.5 shadow transition border-0"
                >
                    Create Company
                </Button>
            </div>
        );
    }

    return (
        <div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-slate-900/50">
                            <TableHead className="w-16">Logo</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Name</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Location</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Website</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Date Added</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterCompany.map((company) => (
                            <TableRow key={company?._id} className="hover:bg-sky-50/50 dark:hover:bg-white/[0.02] border-slate-200 dark:border-white/[0.08] transition-colors">
                                <TableCell>
                                    <CompanyLogo logo={company.logo} name={company.name} />
                                </TableCell>
                                <TableCell className="font-semibold text-slate-905 dark:text-white whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span>{company.name}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-405/10 text-amber-600 dark:text-amber-400 border border-amber-400/20">
                                            Brand
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-700 dark:text-slate-400 whitespace-nowrap">
                                    {company.location || <span className="text-slate-400 dark:text-slate-500 italic">Not set</span>}
                                </TableCell>
                                <TableCell className="text-slate-700 dark:text-slate-400 whitespace-nowrap">
                                    {company.website ? (
                                        <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline max-w-[200px] truncate font-medium">
                                            <span>{company.website}</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ) : (
                                        <span className="text-slate-400 dark:text-slate-500 italic">Not set</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                    {company.createdAt?.split("T")[0] || 'Unknown'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition bg-transparent border-0 cursor-pointer">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-50">
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition text-left bg-transparent border-0 cursor-pointer"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                                <span>Edit Profile</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filterCompany.map((company) => (
                    <div key={company?._id} className="bg-slate-50/50 dark:bg-[#0f172a]/40 border border-slate-205 dark:border-white/[0.08] p-5 rounded-2xl flex flex-col gap-3 shadow-sm hover:border-sky-300/70 transition">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <CompanyLogo logo={company.logo} name={company.name} />
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-base leading-tight">{company.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{company.location || 'Location not set'}</p>
                                </div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20 shrink-0">
                                Workspace
                            </span>
                        </div>
                        
                        {company.description && (
                            <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 text-left mt-1">
                                {company.description}
                            </p>
                        )}
                        
                        {company.website && (
                            <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 hover:underline w-fit mt-1 font-medium">
                                <span>Visit Website</span>
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        )}

                        <div className="border-t border-slate-200 dark:border-white/[0.08] pt-3 mt-1 flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 dark:text-slate-450">
                                Added {company.createdAt?.split("T")[0]}
                            </span>
                            
                            <Button 
                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                size="sm" 
                                variant="outline" 
                                className="h-8 border-slate-250 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-705 dark:text-slate-300 rounded-lg flex items-center gap-1 px-3 text-xs"
                            >
                                <Edit2 className="h-3 w-3" />
                                <span>Setup</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompaniesTable