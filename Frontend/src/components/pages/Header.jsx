import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchjobHandler();
    }
  };
  return (
    <div className="hero-gradient min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8b5cf6] rounded-full opacity-[0.03] blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00d4ff] rounded-full opacity-[0.04] blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6] rounded-full opacity-[0.02] blur-[150px]"></div>
      </div>
      <div className="text-center relative z-10 max-w-4xl mx-auto px-4">
        {}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              color: '#ff6b6b'
            }}>
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></span>
            Your Gateway to Top Internships
          </span>
        </div>
        {}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <span className="text-white">Discover Your</span>
          <br />
          <span className="text-white">Next </span>
          <span style={{
            background: 'linear-gradient(135deg, #8b5cf6, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Internship
          </span>
        </h1>
        {}
        <p className="text-lg md:text-xl text-[#b3b3b3] mb-10 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
          Explore thousands of internship opportunities from top companies.
          <br className="hidden md:block" />
          Launch your career with the perfect role.
        </p>
        {}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <div className="flex w-full max-w-xl mx-auto search-glow rounded-full items-center overflow-hidden">
            <div className="pl-5 pr-2">
              <Search className="h-5 w-5 text-[#b3b3b3]" />
            </div>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search internships, companies, roles..."
              className="flex-1 bg-transparent text-white py-4 px-2 outline-none placeholder:text-[#666]"
            />
            <button
              onClick={searchjobHandler}
              className="portal-btn rounded-none rounded-r-full px-8 h-full py-4"
            >
              Search
            </button>
          </div>
        </div>
        {}
        <div className="flex items-center justify-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-sm text-[#b3b3b3]">Internships</div>
          </div>
          <div className="w-px h-10 bg-[rgba(255,255,255,0.1)]"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm text-[#b3b3b3]">Companies</div>
          </div>
          <div className="w-px h-10 bg-[rgba(255,255,255,0.1)]"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-sm text-[#b3b3b3]">Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
