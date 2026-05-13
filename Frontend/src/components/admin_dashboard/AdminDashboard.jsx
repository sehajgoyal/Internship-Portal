import React, { useEffect } from "react";
import Navbar from "../pages/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { Briefcase, Building2, PlusCircle, Users } from "lucide-react";

const AdminDashboard = () => {
  useGetAllCompanies();
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { companies = [] } = useSelector((store) => store.company || {});
  const { allAdminJobs = [] } = useSelector((store) => store.job || {});

  useEffect(() => {
    if (!user || (user.role !== "Admin" && user.role !== "Recruiter")) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div style={{ background: "var(--portal-black)", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-24 px-4 pb-10">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.fullname}
          </h1>
          <p className="text-[#b3b3b3]">
            Here is what's happening with your job postings today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card p-6 rounded-xl flex items-center gap-4">
            <div className="p-4 bg-[rgba(139,92,246,0.1)] rounded-full text-[#8b5cf6]">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-[#b3b3b3] text-sm mb-1">Total Companies</p>
              <h2 className="text-3xl font-bold text-white">{companies.length || 0}</h2>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex items-center gap-4">
            <div className="p-4 bg-[rgba(16,185,129,0.1)] rounded-full text-[#10b981]">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-[#b3b3b3] text-sm mb-1">Active Jobs</p>
              <h2 className="text-3xl font-bold text-white">{allAdminJobs.length || 0}</h2>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div 
            onClick={() => navigate("/admin/companies")}
            className="glass-card p-8 rounded-xl cursor-pointer hover:border-[#8b5cf6] transition-all duration-300 group"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-[#8b5cf6] transition-colors">Manage Companies</h3>
              <Building2 className="text-[#b3b3b3] group-hover:text-[#8b5cf6] transition-colors" />
            </div>
            <p className="text-[#b3b3b3] mb-6">Register a new company or update details for your existing organizations.</p>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate("/admin/companies/create"); }}
              className="portal-btn-outline flex items-center gap-2 text-sm py-2 px-4"
            >
              <PlusCircle size={16} />
              Add Company
            </button>
          </div>

          <div 
            onClick={() => navigate("/admin/jobs")}
            className="glass-card p-8 rounded-xl cursor-pointer hover:border-[#8b5cf6] transition-all duration-300 group"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-[#8b5cf6] transition-colors">Manage Jobs</h3>
              <Briefcase className="text-[#b3b3b3] group-hover:text-[#8b5cf6] transition-colors" />
            </div>
            <p className="text-[#b3b3b3] mb-6">Post a new internship opportunity or view applicants for your active jobs.</p>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate("/admin/jobs/create"); }}
              className="portal-btn flex items-center gap-2 text-sm py-2 px-4"
            >
              <PlusCircle size={16} />
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
