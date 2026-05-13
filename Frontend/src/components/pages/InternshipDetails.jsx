import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";
import { MapPin, DollarSign, Clock, Users, Briefcase, Calendar } from "lucide-react";
const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        console.log(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchSingleJobs = async () => {
      dispatch(setSingleJob(null));
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);
  if (!singleJob) {
    return (
      <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#8b5cf6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-24 pb-10 max-w-4xl mx-auto px-4">
        <div className="animate-fade-in-up">
          {}
          <div className="glass-card p-8 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <h1 className="font-bold text-3xl text-white mb-4">{singleJob?.title}</h1>
                <div className="flex flex-wrap gap-3">
                  <span className="portal-badge badge-cyan">
                    {singleJob?.position} Open Positions
                  </span>
                  <span className="portal-badge badge-red">
                    {singleJob?.salary} LPA
                  </span>
                  <span className="portal-badge badge-purple">
                    {singleJob?.location}
                  </span>
                  <span className="portal-badge badge-green">
                    {singleJob?.jobType}
                  </span>
                </div>
              </div>
              <button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isApplied
                    ? "bg-[#333] cursor-not-allowed text-[#666]"
                    : "portal-btn animate-pulse-glow"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>
          </div>
          {}
          <div className="glass-card p-8 mb-6">
            <h2 className="section-title text-xl mb-6">About this Internship</h2>
            <p className="text-[#b3b3b3] leading-relaxed mt-4">
              {singleJob?.description}
            </p>
          </div>
          {}
          <div className="glass-card p-8">
            <h2 className="section-title text-xl mb-6">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
                  <Briefcase size={18} className="text-[#00d4ff]" />
                </div>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Role</p>
                  <p className="text-white font-medium">{singleJob?.position} Open Positions</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                  <MapPin size={18} className="text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Location</p>
                  <p className="text-white font-medium">{singleJob?.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(114, 9, 183, 0.1)' }}>
                  <DollarSign size={18} className="text-[#c77dff]" />
                </div>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Salary</p>
                  <p className="text-white font-medium">{singleJob?.salary} LPA</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 200, 83, 0.1)' }}>
                  <Clock size={18} className="text-[#69f0ae]" />
                </div>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Experience</p>
                  <p className="text-white font-medium">{singleJob?.experienceLevel} Year</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                  <Users size={18} className="text-[#ffc107]" />
                </div>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Total Applicants</p>
                  <p className="text-white font-medium">{singleJob?.applications?.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <Calendar size={18} className="text-[#b3b3b3]" />
                </div>
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider">Posted On</p>
                  <p className="text-white font-medium">{singleJob?.createdAt.split("T")[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Description;
