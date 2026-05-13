import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Bookmark, MapPin, Briefcase, IndianRupee, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      onClick={() => navigate(`/description/${job?._id || job?.id}`)}
      className="portal-card p-6 flex flex-col justify-between h-full preserve-3d"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -10, 
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.4, ease: "easeOut" } 
      }}
    >
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="bg-white p-2 rounded-xl shadow-lg border border-[rgba(255,255,255,0.1)] flex-shrink-0 relative overflow-hidden">
              <Avatar className="w-12 h-12 bg-transparent">
                <AvatarImage src={job?.company?.logo} className="object-contain" />
              </Avatar>
              {isHovered && (
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </div>
            <div>
              <h2 className="font-bold text-xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#b3b3b3]">
                {job?.title}
              </h2>
              <p className="text-[#00d4ff] font-medium text-sm mt-0.5">{job?.company?.name}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.success("Saved to bookmarks!");
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-[rgba(255,255,255,0.05)] hover:bg-[#8b5cf6] border border-[rgba(255,255,255,0.1)] group"
          >
            <Bookmark size={18} className="text-[#b3b3b3] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Metadata Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-[#b3b3b3] text-sm">
            <MapPin size={16} className="text-[#8b5cf6]" />
            <span className="truncate">{job?.location || "India"}</span>
          </div>
          <div className="flex items-center gap-2 text-[#b3b3b3] text-sm">
            <Briefcase size={16} className="text-[#00d4ff]" />
            <span>{job?.experienceLevel || job?.experience || "0"} Years</span>
          </div>
          <div className="flex items-center gap-2 text-[#b3b3b3] text-sm col-span-2">
            <IndianRupee size={16} className="text-[#69f0ae]" />
            <span>{job?.salary} LPA</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-[#888] leading-relaxed mb-6 line-clamp-3">
          {job?.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="portal-badge badge-cyan shadow-[0_0_10px_rgba(0,212,255,0.1)]">
            {job?.position} Positions
          </span>
          <span className="portal-badge badge-purple shadow-[0_0_10px_rgba(114,9,183,0.1)]">
            {job?.jobType}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] pt-4 mt-auto">
        <p className="text-xs text-[#555] font-medium uppercase tracking-wider">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Posted Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <motion.div 
          className="flex items-center gap-1 text-[#8b5cf6] text-sm font-bold"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          View Details <ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Job1;
