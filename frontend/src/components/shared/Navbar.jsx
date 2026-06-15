import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, User2, X, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setMobileOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks =
    user?.role === "recruiter"
      ? [
          { label: "Companies", path: "/admin/companies" },
          { label: "Jobs", path: "/admin/jobs" },
        ]
      : [
          { label: "Home", path: "/" },
          { label: "Jobs", path: "/jobs" },
          { label: "Browse", path: "/browse" },
        ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030712]/70 backdrop-blur-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Career<span className="text-white font-medium">Canvas</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-1">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white rounded-lg hover:bg-white/5 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Auth */}
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-sm h-9 px-4 rounded-lg transition"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm h-9 px-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer shadow-md h-9 w-9 ring-2 ring-cyan-500/30 hover:ring-cyan-500/60 transition duration-300">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-4 bg-[#0d1220]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl text-slate-100 mt-2 z-50">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                      <Avatar className="shadow-md h-10 w-10 ring-2 ring-cyan-500/20">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname || "User"}
                        />
                      </Avatar>

                      <div className="text-left min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {user?.fullname}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {user?.profile?.bio || "No bio added yet"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      {user?.role === "student" && (
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-lg text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <User2 className="h-4 w-4 text-cyan-400" />
                          <span>View Profile</span>
                        </Link>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-2 hover:bg-red-500/10 p-2 rounded-lg text-sm text-slate-300 hover:text-red-400 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-xl px-4 py-6 space-y-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white font-medium rounded-xl px-4 py-2.5 text-left hover:bg-white/5 block transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {!user ? (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full border border-white/10 text-slate-300 font-semibold h-10 rounded-xl hover:bg-white/5 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold h-10 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <div className="flex items-center gap-3 px-2">
                  <Avatar className="ring-2 ring-cyan-500/20 h-10 w-10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{user?.fullname}</h4>
                    <p className="text-xs text-slate-400 truncate">
                      {user?.profile?.bio || "No bio added yet"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 mt-2">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-cyan-400 p-2 rounded-lg hover:bg-white/5 transition"
                    >
                      <User2 className="h-4 w-4 text-cyan-400" />
                      <span>View Profile</span>
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition text-left w-full"
                  >
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;