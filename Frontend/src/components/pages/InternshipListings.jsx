import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./InternshipCard";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery, jobFilters } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    let filteredJobs = allJobs || [];
    if (searchedQuery && searchedQuery.trim() !== "") {
      const query = searchedQuery.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.experience?.toLowerCase().includes(query) ||
          job.salary?.toLowerCase().includes(query) ||
          job.jobType?.toLowerCase().includes(query)
        );
      });
    }
    // 2. Multi-Select Sidebar Filters
    if (jobFilters) {
      filteredJobs = filteredJobs.filter((job) => {
        // Location Match
        const matchesLocation =
          !jobFilters.Location || jobFilters.Location.length === 0 ||
          jobFilters.Location.some((loc) => job.location?.toLowerCase().includes(loc.toLowerCase()));
        // Technology Match (check in title or description)
        const matchesTechnology =
          !jobFilters.Technology || jobFilters.Technology.length === 0 ||
          jobFilters.Technology.some((tech) => 
            job.title?.toLowerCase().includes(tech.toLowerCase()) || 
            job.description?.toLowerCase().includes(tech.toLowerCase())
          );
        // Experience Match
        const matchesExperience =
          !jobFilters.Experience || jobFilters.Experience.length === 0 ||
          jobFilters.Experience.some((exp) => {
            return job.experience?.toLowerCase().includes(exp.toLowerCase()) || 
                   job.experienceLevel?.toString() === exp.split('-')[0];
          });
        const matchesSalary =
          !jobFilters.Salary || jobFilters.Salary.length === 0 ||
          jobFilters.Salary.some((sal) => job.salary?.toLowerCase().includes(sal.toLowerCase()) || sal.toLowerCase().includes(job.salary?.toLowerCase()));
        return matchesLocation && matchesTechnology && matchesExperience && matchesSalary;
      });
    }
    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery, jobFilters]);

  // Container variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ background: 'var(--portal-black)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Navbar />
      
      {/* Premium Hero Banner */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/20 to-transparent pointer-events-none"></div>
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#8b5cf6] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]">Premium</span> Opportunities
            </h1>
            <p className="text-lg text-[#b3b3b3] max-w-2xl mx-auto mb-2">
              Elevate your career with top-tier internships curated for ambitious professionals.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[#00d4ff] font-semibold">{filterJobs.length}</span> <span className="text-[#888]">internships matching your criteria</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 z-20">
            <FilterCard />
          </div>

          {/* Job Grid */}
          <div className="flex-1 min-h-[50vh]">
            <AnimatePresence mode="wait">
              {filterJobs.length <= 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-32 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-sm"
                >
                  <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-tr from-[#8b5cf6]/20 to-[#00d4ff]/20 flex items-center justify-center border border-white/10">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No internships found</h3>
                  <p className="text-[#888] text-center max-w-md">
                    We couldn't find anything matching your current filters. Try adjusting your criteria or checking back later.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000"
                >
                  {filterJobs.map((job) => (
                    <motion.div key={job.id || job._id} variants={itemVariants}>
                      <Job1 job={job} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
