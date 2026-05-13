import React from "react";
import { useNavigate } from "react-router-dom";
const JobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job?._id || job?.id}`)}
      className="portal-card p-5 w-[300px] min-w-[300px] cursor-pointer"
    >
      {}
      <div className="flex items-center gap-3 mb-4">
        {job?.company?.logo ? (
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-10 h-10 rounded-lg object-cover"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          />
        ) : (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
            {job?.name?.charAt(0) || 'C'}
          </div>
        )}
        <div>
          <h3 className="text-white font-medium text-sm">{job.name || job?.company?.name}</h3>
          <p className="text-[#666] text-xs">India</p>
        </div>
      </div>
      {}
      <h2 className="font-bold text-lg text-white mb-2 line-clamp-1">{job.title}</h2>
      {}
      <p className="text-[#b3b3b3] text-sm mb-4 line-clamp-2 leading-relaxed">
        {job.description}
      </p>
      {}
      <div className="flex flex-wrap gap-2">
        <span className="portal-badge badge-cyan">
          {job.position} Positions
        </span>
        <span className="portal-badge badge-red">
          {job.salary} LPA
        </span>
        <span className="portal-badge badge-purple">
          {job.location}
        </span>
        {job.jobType && (
          <span className="portal-badge badge-green">
            {job.jobType}
          </span>
        )}
      </div>
    </div>
  );
};
export default JobCards;
