import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allJobs: [],
  allAdminJobs: [], 
  singleJob: null, 
  searchJobByText: "",
  allAppliedJobs: [], // This will hold
  searchedQuery: "",
  jobFilters: {
    Location: [],
    Technology: [],
    Experience: [],
    Salary: [],
  },
};
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload; 
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload; 
    },
    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload; 
    },
    setSearchJobByText(state, action) {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery(state, action) {
      state.searchedQuery = action.payload;
    },
    setJobFilters(state, action) {
      const { category, value } = action.payload;
      const currentFilters = state.jobFilters[category];
      if (currentFilters.includes(value)) {
        state.jobFilters[category] = currentFilters.filter(item => item !== value);
      } else {
        state.jobFilters[category] = [...currentFilters, value];
      }
    },
    clearJobFilters(state) {
      state.jobFilters = {
        Location: [],
        Technology: [],
        Experience: [],
        Salary: [],
      };
    }
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setJobFilters,
  clearJobFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
