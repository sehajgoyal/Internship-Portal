import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cybersecurity",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Designer",
  "Video Editor",
];
const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="py-12 px-4" style={{ background: 'var(--portal-black)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title mb-10">Explore Categories</h2>
        <div className="portal-row stagger-children" style={{ paddingBottom: '10px' }}>
          {Category.map((category, index) => (
            <button
              key={index}
              onClick={() => searchjobHandler(category)}
              className="category-chip"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Categories;
