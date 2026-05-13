import React, { useEffect } from "react";
import Navbar from "./Navbar";
import InternshipCard from "./InternshipCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4">
        {}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results
          </h1>
          <p className="text-[#b3b3b3]">
            <span style={{ color: '#00d4ff' }}>{allJobs.length}</span> internships found
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children pb-10">
          {allJobs.map((job) => {
            return <InternshipCard key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Browse;
