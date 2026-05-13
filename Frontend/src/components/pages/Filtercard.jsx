import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobFilters, clearJobFilters } from "@/redux/jobSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter as FilterIcon, ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const dispatch = useDispatch();
  const { jobFilters: rawFilters } = useSelector((store) => store.job);
  const jobFilters = rawFilters || { Location: [], Technology: [], Experience: [], Salary: [] };
  
  // Track expanded state for accordions
  const [expanded, setExpanded] = useState({
    Location: true,
    Technology: true,
    Experience: true,
    Salary: true
  });

  const toggleAccordion = (category) => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleCheckboxChange = (category, value) => {
    dispatch(setJobFilters({ category, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearJobFilters());
  };

  const hasActiveFilters = Object.values(jobFilters).some(
    (filterArray) => filterArray.length > 0
  );

  return (
    <div className="filter-sidebar bg-[rgba(20,20,25,0.7)] border border-[rgba(255,255,255,0.05)] rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-[-50px] left-[-50px] w-[150px] h-[150px] bg-[#8b5cf6] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[rgba(139,92,246,0.1)] rounded-lg border border-[rgba(139,92,246,0.2)]">
            <FilterIcon size={18} className="text-[#8b5cf6]" />
          </div>
          <h1 className="font-bold text-xl text-white tracking-wide">Preferences</h1>
        </div>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClearFilters}
              className="text-xs font-semibold bg-[rgba(255,74,74,0.1)] text-[#ff4a4a] px-3 py-1.5 rounded-full hover:bg-[rgba(255,74,74,0.2)] transition-all flex items-center gap-1 cursor-pointer border border-[rgba(255,74,74,0.2)]"
            >
              <X size={12} strokeWidth={3} /> Clear
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="h-[1px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.1)] via-[rgba(139,92,246,0.3)] to-transparent mb-6"></div>

      <div className="space-y-6 relative z-10">
        {filterData.map((data, index) => {
          const activeCount = jobFilters[data.filterType]?.length || 0;
          const isExpanded = expanded[data.filterType];

          return (
            <div key={index} className="border-b border-[rgba(255,255,255,0.05)] pb-5 last:border-0 last:pb-0">
              <button 
                onClick={() => toggleAccordion(data.filterType)}
                className="w-full flex items-center justify-between group outline-none"
              >
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-[15px] text-[#e0e0e0] tracking-wide group-hover:text-white transition-colors">
                    {data.filterType}
                  </h2>
                  {activeCount > 0 && (
                    <span className="flex items-center justify-center bg-[#8b5cf6] text-white text-[10px] font-bold h-5 w-5 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                      {activeCount}
                    </span>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-[#666] group-hover:text-white"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2">
                      {data.array.map((item, indx) => {
                        const isChecked = jobFilters[data.filterType]?.includes(item);
                        return (
                          <motion.button
                            key={indx}
                            onClick={() => handleCheckboxChange(data.filterType, item)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 border ${
                              isChecked
                                ? "bg-[rgba(139,92,246,0.15)] text-white border-[#8b5cf6] shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                : "bg-transparent text-[#999] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] hover:text-white"
                            }`}
                          >
                            {item}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
