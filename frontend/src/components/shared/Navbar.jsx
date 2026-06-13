import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, Menu, User2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

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
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffba08] cursor-pointer">
            Career<span className="text-[#00b4d8]">Canvas</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="inline-block bg-[#1e96fc] text-white font-bold rounded-full px-4 py-1.5 transition duration-300 ease-in-out hover:bg-[#31e981] shadow-lg transform hover:scale-105"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-2 border-[#0ead69] text-[#0ead69] font-semibold shadow-md hover:-translate-y-0.5 transition"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-gradient-to-r border-2 border-[#ff9e00] from-[#f7b801] to-[#4cc9f0] text-white font-semibold shadow-md hover:scale-105 transition">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer shadow-md ring-4 ring-[#ffbe0b]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="shadow-md ring-4 ring-[#ffbe0b]">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                      />
                    </Avatar>

                    <div className="text-left">
                      <h4 className="text-lg font-bold text-black">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-900 line-clamp-2">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col text-gray-700 space-y-2">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 hover:text-indigo-600"
                      >
                        <User2 className="text-[#00b4d8]" />
                        <span className="text-sm font-medium">
                          View Profile
                        </span>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 hover:text-red-600 text-left"
                    >
                      <LogOut className="text-[#d90429]" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md border border-gray-200"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4 shadow-md">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="bg-[#1e96fc] text-white font-bold rounded-full px-4 py-2 text-center shadow-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {!user ? (
            <div className="grid grid-cols-2 gap-3">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#0ead69] text-[#0ead69] font-semibold"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#f7b801] to-[#4cc9f0] text-white font-semibold">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 border-t pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="ring-2 ring-[#ffbe0b]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                </Avatar>
                <div>
                  <h4 className="font-bold">{user?.fullname}</h4>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>

              {user?.role === "student" && (
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User2 className="text-[#00b4d8]" />
                  View Profile
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-sm font-medium text-left"
              >
                <LogOut className="text-[#d90429]" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;