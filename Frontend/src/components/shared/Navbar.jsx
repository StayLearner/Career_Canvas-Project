// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Button } from '../ui/button'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { LogOut, User2 } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'
// import { USER_API_END_POINT } from '@/utils/constant'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { setUser } from '@/redux/authSlice'

// const Navbar = () => {

//     const { user } = useSelector(store => store.auth);
//     // const user= true;

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setUser(null));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "Logout failed");
//         }
//     }

//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//                 <div> <h1 className='text-2xl font-bold'>Job <span className='text-red-700'>Portal</span> </h1>
//                 </div>

//                 <div className='flex items-center gap-12'>
//                     <ul className='flex font-medium items-center gap-5'>

//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/jobs">Jobs</Link></li>
//                         <li><Link to="/browse">Browse</Link></li>

//                         {/* {
//                             user && user.role === 'recruiter'  ? (
//                                 <>
//                                 <li><Link to="/admin/companies">Companies</Link></li>
//                                 <li><Link to="/admin/jobs">Jobs</Link></li>
//                                 </>
//                             ) : (
//                                 <>
//                                 <li><Link to="/">Home</Link></li>
//                                 <li><Link to="jobs">Jobs</Link></li>
//                                 <li><Link to="/browse">Browse</Link></li>
//                                 </>
//                             )
//                         }
//                         */}

//                     </ul>

//                     {

//                         !user ? (
//                             <div className='flex items-center gap-2'>
//                                 <Link to="/login"><Button variant="outline">Login</Button></Link>
//                                 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
//                             </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="cursor-pointer">
//                                         {/* <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" /> */}
//                                         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                                     </Avatar>
//                                 </PopoverTrigger>

//                                 <PopoverContent className='w-80'>
//                                     <div className=''>
//                                         <div className='flex gap-2 space-y-2'>
//                                             <Avatar className='cursor-pointer'>
//                                                 <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                                                 {/* <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" /> */}
//                                             </Avatar>
//                                             <div>
//                                             {/* <h4 className='font-medium'>{user?.fullname}</h4> */}
//                                             {/* <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p> */}
//                                             <h4 className=' font-medium'>{user?.fullname || "User Name"}</h4>
//                                             <p className='text-sm text-muted-foreground'>{user?.profile?.bio || "Bio information"}</p>
//                                             </div>
//                                         </div>

//                                         <div className='flex flex-col my-2 text-gray-600'>
//                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                 <User2 />
//                                                 <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
//                                             </div>
//                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                 <LogOut />
//                                                 <Button onClick={logoutHandler} variant="link">Logout</Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
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

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-5xl font-bold text-[#ffba08]  ">
            Career<span className="text-[#00b4d8]">Canvas</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li className="mr-4">
                  <Link
                    to="/admin/companies"
                    className="inline-block bg-[#1e96fc] text-white font-bold rounded-full px-4 py-1.5 transition duration-300 ease-in-out hover:bg-[#31e981] shadow-lg transform hover:scale-105"
                  >
                    Companies
                  </Link>
                </li>
                <li className="mr-4">
                  <Link
                    to="/admin/jobs"
                    className="inline-block bg-[#1e96fc] text-white font-bold rounded-full px-4 py-1.5 transition duration-300 ease-in-out hover:bg-[#31e981] shadow-lg transform hover:scale-105"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              // <>
              //     <li className='text-[#dc2f02] font-bold'><Link to="/">Home</Link></li>
              //     <li><Link to="/jobs">Jobs</Link></li>
              //     <li><Link to="/browse">Browse</Link></li>
              // </>

              <>
                <li className="mr-4">
                  <Link
                    to="/"
                    className="inline-block bg-[#1e96fc] text-white font-bold rounded-full px-4 py-1.5 transition duration-300 ease-in-out hover:bg-[#31e981] shadow-lg transform hover:scale-105"
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-4">
                  <Link
                    to="/jobs"
                    className="inline-block bg-[#1e96fc] text-white font-bold rounded-full px-4 py-1.5 transition duration-300 ease-in-out hover:bg-[#31e981] shadow-lg transform hover:scale-105"
                  >
                    Jobs
                  </Link>
                </li>
                <li className="mr-4">
                  <Link
                    to="/browse"
                    className="inline-block bg-[#1e96fc] text-white font-bold rounded-full px-4 py-1.5 transition duration-300 ease-in-out hover:bg-[#31e981] shadow-lg transform hover:scale-105"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
              <div className="flex gap-4">
  <Button 
    variant="outline"
    className="border-4 border-[#0ead69] text-[#0ead69] py-2 px-5  font-semibold tracking-wide animate-pulse transition-all duration-500 ease-in-out shadow-lg transform hover:-translate-y-1"
  >
    Login
  </Button>
  <Link to="/signup">
  <Button 
  className="bg-gradient-to-r border-4 border-[#ff9e00] from-[#f7b801] to-[#4cc9f0] text-white py-2 px-6  font-semibold tracking-wide shadow-lg transform transition-all duration-500 ease-in-out hover:bg-gradient-to-l hover:from-[#ff577f] hover:to-[#6A38C2] hover:scale-105 hover:shadow-2xl"
> Signup </Button>

  </Link>
</div>

              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer shadow-md ring-4 ring-[#ffbe0b]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                  
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="cursor-pointer shadow-md ring-4 ring-[#ffbe0b]">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "@shadcn"}
                      />
                    </Avatar>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-black">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-900">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col text-gray-700 space-y-2">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                        <User2 className="text-[#00b4d8]" />
                        <Button
                          variant="link"
                          className="p-0 text-sm font-medium"
                        >
                          <Link to="/profile" className="hover:underline ">
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                      <LogOut className="text-[#d90429] " />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="p-0 text-sm font-medium"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
