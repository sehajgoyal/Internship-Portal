import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Contact, Mail, Pen, Download, CheckCircle2, AlertTriangle, Trophy } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-24 pb-10 px-4">
        {}
        <div className="max-w-4xl mx-auto glass-card p-8 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-5">
              <Avatar className="cursor-pointer h-24 w-24 ring-2 ring-[rgba(139, 92, 246,0.3)]">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-bold text-2xl text-white">{user?.fullname}</h1>
                <p className="text-[#b3b3b3] mt-1">{user?.profile?.bio}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="portal-btn-outline py-2 px-4 text-sm flex items-center gap-2"
            >
              <Pen size={14} />
              Edit
            </button>
          </div>
          {}
          <div className="my-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
                <Mail size={14} className="text-[#00d4ff]" />
              </div>
              <a href={`mailto:${user?.email}`} className="text-[#b3b3b3] hover:text-white transition-colors">
                {user?.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                <Contact size={14} className="text-[#8b5cf6]" />
              </div>
              <a href={`tel:${user?.phoneNumber}`} className="text-[#b3b3b3] hover:text-white transition-colors">
                {user?.phoneNumber}
              </a>
            </div>
          </div>
          {}
          <div className="mb-6">
            <h3 className="text-sm text-[#666] uppercase tracking-wider mb-3">Skills</h3>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <span key={index} className="portal-badge badge-cyan">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-[#666]">No skills added</span>
              )}
            </div>
          </div>
          {}
          <div>
            <h3 className="text-sm text-[#666] uppercase tracking-wider mb-3">Resume</h3>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors"
              >
                <Download size={14} />
                {user?.profile?.resumeOriginalName || 'Download Resume'}
              </a>
            ) : (
              <span className="text-[#666]">No Resume Found</span>
            )}
          </div>
          {}
          {user?.profile?.resumeAnalysis && (
            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-[#8b5cf6]" size={20} />
                <h3 className="text-lg font-bold text-white">AI Resume Insights</h3>
                <span className="ml-auto text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c77dff' }}>
                  Score: {user.profile.resumeAnalysis.score}/100
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-[#666] uppercase tracking-wider mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {user.profile.resumeAnalysis.strengths?.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#b3b3b3]">
                        <CheckCircle2 size={16} className="text-[#69f0ae] mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-[#666] uppercase tracking-wider mb-3">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    {user.profile.resumeAnalysis.improvements?.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#b3b3b3]">
                        <AlertTriangle size={16} className="text-[#ffc107] mt-0.5 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        {}
        <div className="max-w-4xl mx-auto mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title mb-6">Applied Internships</h2>
          <div className="glass-card p-6 mt-4">
            <AppliedJob />
          </div>
        </div>
      </div>
      {}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default Profile;
