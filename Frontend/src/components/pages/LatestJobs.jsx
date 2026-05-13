import React from "react";
import JobCards from "./TrendingCard";
import { useSelector } from "react-redux";
const LatestJobs = () => {
  const allJobs = useSelector((state) => state.job?.allJobs || []); 
  return (
    <div className="py-12 px-4" style={{ background: 'var(--portal-black)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title mb-10">
          Trending <span style={{ color: '#8b5cf6' }}>Internships</span>
        </h2>
        {allJobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#b3b3b3] text-lg">No internships available right now</p>
            <p className="text-[#666] text-sm mt-2">Check back soon for new opportunities</p>
          </div>
        ) : (
          <div className="portal-row stagger-children">
            {allJobs.slice(0, 8).map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job} />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default LatestJobs;
