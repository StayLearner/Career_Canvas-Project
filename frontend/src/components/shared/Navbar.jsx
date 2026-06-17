import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, User2, X, Briefcase, Sun, Moon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 select-none"
    >
      <div className="relative w-full rounded-full p-[1px] overflow-hidden">
        {/* Moving Border Glow Accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[200%] opacity-20 dark:opacity-40 bg-[conic-gradient(from_0deg,transparent_30%,#38bdf8_45%,transparent_55%,#facc15_90%,transparent_100%)]"
          />
        </div>

        {/* Navbar Inner Surface */}
        <div
          className={`relative flex items-center justify-between mx-auto rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-white/80 dark:bg-[#020817]/80 py-2.5 px-6 shadow-slate-200/40 dark:shadow-cyan-950/20"
              : "bg-white/40 dark:bg-[#020817]/40 py-3.5 px-8"
          }`}
        >
          {/* Logo Area */}
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <motion.div
              whileHover="hover"
              initial="idle"
              className="relative flex items-center gap-2.5 select-none group"
            >
              {/* Logo Glow */}
              <div className="absolute -inset-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 pointer-events-none" />

              {/* Logo Icon */}
              <motion.div
                variants={{
                  idle: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
                  hover: { scale: 1.08, rotate: 6 }
                }}
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20"
              >
                <Briefcase className="h-5 w-5 text-slate-950 font-bold" />
              </motion.div>

              {/* Logo Text */}
              <motion.h1
                variants={{
                  hover: { scale: 1.02 }
                }}
                className="text-xl sm:text-2xl font-bold tracking-tight select-none flex items-center"
              >
                <span className="text-amber-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.2)]">Career</span>
                <span className="text-cyan-400 font-semibold ml-0.5 drop-shadow-[0_2px_8px_rgba(56,189,248,0.2)]">Canvas</span>
              </motion.h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <nav>
              <ul className="flex items-center gap-1.5 bg-slate-200/50 dark:bg-white/5 rounded-full p-1 border border-slate-300/20 dark:border-white/5">
                {navLinks.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.path} className="relative">
                      <Link
                        to={item.path}
                        className="relative px-5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors duration-300 block rounded-full"
                      >
                        {active && (
                          <motion.span
                            layoutId="activeNavPill"
                            className="absolute inset-0 bg-white dark:bg-white/15 rounded-full border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <motion.span
                          whileHover={{ y: -1 }}
                          className={`relative z-10 block ${
                            active ? "text-slate-950 dark:text-white font-semibold" : "hover:text-slate-900 dark:hover:text-slate-100"
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Floating Notification Chip */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/30 dark:border-amber-400/20 bg-amber-400/5 dark:bg-amber-400/10 text-[11px] font-semibold text-amber-600 dark:text-amber-300 tracking-wider uppercase shadow-sm cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span><span>✨ New Opportunities Daily</span></span>
            </motion.div>

            {/* Premium Theme Switcher Toggle */}
            <div
              onClick={toggleTheme}
              className="relative w-14 h-8 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 flex items-center p-1 cursor-pointer select-none overflow-hidden group shadow-inner transition-colors duration-300"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 bottom-1 w-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-md flex items-center justify-center z-10"
                style={{
                  left: theme === "light" ? "4px" : "calc(100% - 28px)"
                }}
              >
                {theme === "light" ? (
                  <Sun size={12} className="text-slate-950" />
                ) : (
                  <Moon size={12} className="text-slate-950" fill="#000" />
                )}
              </motion.div>
              <div className="w-full h-full flex justify-between items-center px-1.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <Sun size={12} className="text-slate-700 dark:text-slate-400" />
                <Moon size={12} className="text-slate-700 dark:text-slate-400" />
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-5">
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="ghost"
                        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-semibold text-sm h-9 px-4 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                      >
                        Login
                      </Button>
                    </motion.div>
                  </Link>

                  <Link to="/signup">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="bg-gradient-to-r from-yellow-400 via-sky-400 to-blue-500 px-5 py-2 text-slate-950 font-semibold text-sm h-9 rounded-full flex items-center justify-center cursor-pointer select-none">
                        <span>Signup</span>
                        <motion.div
                          initial={{ x: "-150%" }}
                          animate={{ x: "250%" }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1 }}
                          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer shadow-md h-9 w-9 ring-2 ring-slate-200 dark:ring-cyan-500/30 hover:ring-slate-300 dark:hover:ring-cyan-500/60 transition duration-300">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                      />
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 p-4 bg-white dark:bg-[#0d1220]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl text-slate-800 dark:text-slate-100 mt-2 z-50">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                        <Avatar className="shadow-md h-10 w-10 ring-2 ring-slate-200 dark:ring-cyan-500/20">
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt={user?.fullname || "User"}
                          />
                        </Avatar>

                        <div className="text-left min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {user?.fullname}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {user?.profile?.bio || "No bio added yet"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        {user?.role === "student" && (
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-cyan-400 transition-colors"
                          >
                            <User2 className="h-4 w-4 text-slate-500 dark:text-cyan-400" />
                            <span>View Profile</span>
                          </Link>
                        )}

                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-2 hover:bg-red-500/10 p-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors text-left"
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

          {/* Mobile menu button & toggle */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme switcher for mobile */}
            <div
              onClick={toggleTheme}
              className="relative w-12 h-7 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 flex items-center p-0.5 cursor-pointer select-none overflow-hidden shadow-inner transition-colors duration-300"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 bottom-0.5 w-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-md flex items-center justify-center z-10"
                style={{
                  left: theme === "light" ? "3px" : "calc(100% - 23px)"
                }}
              >
                {theme === "light" ? (
                  <Sun size={10} className="text-slate-950" />
                ) : (
                  <Moon size={10} className="text-slate-950" fill="#000" />
                )}
              </motion.div>
            </div>

            <button
              className="p-2 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Floating glass panel) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#020817]/95 backdrop-blur-xl shadow-2xl flex flex-col gap-4 z-50 overflow-hidden text-slate-800 dark:text-slate-100"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent blur-2xl pointer-events-none rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/10 to-transparent blur-2xl pointer-events-none rounded-full" />

              <div className="flex flex-col gap-2 relative z-10">
                {navLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-semibold rounded-xl px-4 py-2.5 text-left block transition ${
                      isActive(item.path)
                        ? "bg-slate-100 dark:bg-white/15 text-slate-950 dark:text-white border border-slate-200 dark:border-white/10 shadow-inner"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {!user ? (
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-white/5 relative z-10">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-semibold h-10 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="w-full block">
                    <Button className="w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-blue-500 hover:from-yellow-500 hover:via-sky-500 hover:to-blue-600 text-slate-950 font-semibold h-10 rounded-full flex items-center justify-center cursor-pointer select-none border-0">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3 border-t border-slate-100 dark:border-white/5 pt-4 relative z-10">
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="ring-2 ring-slate-100 dark:ring-cyan-500/20 h-10 w-10">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                      />
                    </Avatar>
                    <div className="min-w-0 text-left">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">{user?.fullname}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.profile?.bio || "No bio added yet"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1 mt-2">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition"
                      >
                        <User2 className="h-4 w-4 text-slate-500 dark:text-cyan-400" />
                        <span>View Profile</span>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition text-left w-full"
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
      </div>
    </motion.header>
  );
};

export default Navbar;