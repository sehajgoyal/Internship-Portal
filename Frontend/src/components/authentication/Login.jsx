import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Student",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    try {
      dispatch(setLoading(true)); 
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "Admin" || res.data.user.role === "Recruiter") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false)); 
    }
  };
  useEffect(() => {
    if (user) {
      if (user.role === "Admin" || user.role === "Recruiter") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, []);
  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }}>
      <Navbar />
      <div className="flex items-center justify-center pt-24 pb-10 px-4">
        <div className="w-full max-w-md animate-fade-in-up">
          <form
            onSubmit={submitHandler}
            className="glass-card p-8"
          >
            {}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-[#b3b3b3]">Sign in to your account</p>
            </div>
            {}
            <div className="mb-4">
              <Label className="text-[#b3b3b3] text-sm mb-1 block">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@gmail.com"
                className="dark-input w-full py-3 px-4"
              />
            </div>
            {}
            <div className="mb-4">
              <Label className="text-[#b3b3b3] text-sm mb-1 block">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="dark-input w-full py-3 px-4"
              />
            </div>
            {}
            <div className="mb-6">
              <Label className="text-[#b3b3b3] text-sm mb-3 block">I am a</Label>
              <RadioGroup className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={changeEventHandler}
                    className="accent-[#8b5cf6] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[#b3b3b3] group-hover:text-white transition-colors">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={input.role === "Admin"}
                    onChange={changeEventHandler}
                    className="accent-[#8b5cf6] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[#b3b3b3] group-hover:text-white transition-colors">Admin</span>
                </label>
              </RadioGroup>
            </div>
            {}
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-8 h-8 border-2 border-[#8b5cf6] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="portal-btn w-full py-3 text-base rounded-lg"
              >
                Sign In
              </button>
            )}
            {}
            <div className="text-center mt-6">
              <p className="text-[#b3b3b3]">
                New to Internship Portal?{" "}
                <Link to="/register" className="text-white font-semibold hover:text-[#8b5cf6] transition-colors">
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
