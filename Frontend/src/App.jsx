import React from "react";
import Navbar from "./components/pages/Navbar";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import PrivacyPolicy from "./components/pages/PrivacyPolicy.jsx";
import TermsofService from "./components/pages/TermsofService.jsx";
import InternshipListings from "./components/pages/InternshipListings.jsx";
import Browse from "./components/pages/Browse.jsx";
import Profile from "./components/pages/Profile.jsx";
import InternshipDetails from "./components/pages/InternshipDetails.jsx";
import Companies from "./components/admin_dashboard/Companies";
import CompanyCreate from "./components/admin_dashboard/CompanyCreate";
import CompanySetup from "./components/admin_dashboard/CompanySetup";
import AdminJobs from "./components/admin_dashboard/AdminJobs.jsx";
import PostJob from "./components/admin_dashboard/PostJob";
import Applicants from "./components/admin_dashboard/Applicants";
import ProtectedRoute from "./components/admin_dashboard/ProtectedRoute";
import Creator from "./components/creator/Creator.jsx";
import AdminDashboard from "./components/admin_dashboard/AdminDashboard.jsx";
const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/description/:id",
    element: <InternshipDetails />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/TermsofService",
    element: <TermsofService />,
  },
  {
    path: "/Jobs",
    element: <InternshipListings />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Browse",
    element: <Browse />,
  },
  {
    path:"/Creator",
    element: <Creator/>
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        {" "}
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        {" "}
        <PostJob />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}
export default App;
