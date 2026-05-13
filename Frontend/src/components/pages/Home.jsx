import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { loading, error } = useGetAllJobs(); 
  const jobs = useSelector((state) => state.job.allJobs); 
  console.log("Jobs in Component:", { loading, error, jobs }); 
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "Recruiter" || user?.role === "Admin") {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }}>
      <Navbar />
      {}
      <div className="pt-16">
        <Header />
        <Categories />
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#8b5cf6] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <p className="text-[#b3b3b3]">Error: {error}</p>
          </div>
        )}
        {!loading && !error && <LatestJobs jobs={jobs} />}
      </div>
    </div>
  );
};
export default Home;
