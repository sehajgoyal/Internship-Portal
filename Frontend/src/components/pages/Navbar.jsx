import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; 
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {}, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(20, 20, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <Link to="/" className="flex items-center gap-1 group">
          <h1 className="text-2xl font-bold tracking-tight">
            <span style={{ color: '#8b5cf6' }} className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(139, 92, 246,0.6)]">Internship</span>
            <span className="text-white ml-1">Portal</span>
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && (user.role === "Recruiter" || user.role === "Admin") ? (
              <>
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    className="text-[#b3b3b3] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8b5cf6] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/companies"}
                    className="text-[#b3b3b3] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8b5cf6] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/jobs"}
                    className="text-[#b3b3b3] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8b5cf6] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={"/Home"}
                    className="text-[#b3b3b3] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8b5cf6] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/Browse"}
                    className="text-[#b3b3b3] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8b5cf6] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/Jobs"}
                    className="text-[#b3b3b3] hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8b5cf6] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Internships
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to={"/login"} className="portal-btn-outline text-sm py-2 px-5 inline-block">
                  Login
              </Link>
              <Link to={"/register"} className="portal-btn text-sm py-2 px-5 inline-block">
                  Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-[#8b5cf6] transition-all duration-300">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@user"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 glass-card border-0" style={{ background: 'rgba(26, 26, 46, 0.95)', backdropFilter: 'blur(20px)' }}>
                  <div className="flex items-center gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@user"
                      />
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-white">{user?.fullname}</h3>
                      <p className="text-sm text-[#b3b3b3]">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-[#b3b3b3]">
                    {user && user.role === "Student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-white transition-colors">
                        <User2 size={16} />
                        <Button variant="link" className="text-[#b3b3b3] hover:text-white p-0">
                          <Link to={"/Profile"}>Profile</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <button 
                onClick={logoutHandler}
                className="portal-btn-outline flex items-center gap-2 text-sm py-2 px-4 border-[rgba(255,74,74,0.3)] text-[#ff4a4a] hover:bg-[rgba(255,74,74,0.1)] hover:border-[#ff4a4a]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
