import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Student",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.password || !input.pancard || !input.adharcard || !input.phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }}>
      <Navbar />
      <div className="flex items-center justify-center pt-24 pb-10 px-4">
        <div className="w-full max-w-lg animate-fade-in-up">
          <form
            onSubmit={submitHandler}
            className="glass-card p-8"
          >
            {}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-[#b3b3b3]">Join the Internship Portal</p>
            </div>
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-[#b3b3b3] text-sm mb-1 block">Full Name</Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="dark-input w-full py-3 px-4"
                />
              </div>
              <div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-[#b3b3b3] text-sm mb-1 block">PAN Card Number</Label>
                <Input
                  type="text"
                  value={input.pancard}
                  name="pancard"
                  onChange={changeEventHandler}
                  placeholder="ABCDEF1234G"
                  className="dark-input w-full py-3 px-4"
                />
              </div>
              <div>
                <Label className="text-[#b3b3b3] text-sm mb-1 block">Aadhar Card Number</Label>
                <Input
                  type="text"
                  value={input.adharcard}
                  name="adharcard"
                  onChange={changeEventHandler}
                  placeholder="123456789012"
                  className="dark-input w-full py-3 px-4"
                />
              </div>
            </div>
            {}
            <div className="mb-4">
              <Label className="text-[#b3b3b3] text-sm mb-1 block">Phone Number</Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+1234567890"
                className="dark-input w-full py-3 px-4"
              />
            </div>
            {}
            <div className="mb-4">
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
            <div className="mb-6">
              <Label className="text-[#b3b3b3] text-sm mb-1 block">Profile Photo</Label>
              <div className="dark-input py-2 px-4 rounded-lg">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={ChangeFilehandler}
                  className="cursor-pointer border-0 bg-transparent text-[#b3b3b3] file:bg-[rgba(139, 92, 246,0.2)] file:text-[#ff6b6b] file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:cursor-pointer file:text-sm"
                />
              </div>
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
                Create Account
              </button>
            )}
            {}
            <div className="text-center mt-6">
              <p className="text-[#b3b3b3]">
                Already have an account?{" "}
                <Link to="/login" className="text-white font-semibold hover:text-[#8b5cf6] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
