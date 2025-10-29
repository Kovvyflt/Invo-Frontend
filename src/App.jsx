import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminHome from "./pages/AdminHome";
import StaffHome from "./pages/StaffHome";
import InventoryList from "./pages/InventoryList";
import MakeSalesPage from "./pages/MakeSalesPage";
import SalesReport from "./pages/SalesReport";
import Settings from "./pages/Settings";

function App() {
  const { user, loading } = useAuth();

  // ⏳ Wait for context to finish loading
  if (loading) return <p>Loading...</p>;

  // 🔒 Protected route wrapper
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/" replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based dashboards */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute roles={["staff"]}>
              <StaffHome />
            </ProtectedRoute>
          }
        />

        {/* Shared routes */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute roles={["admin", "manager", "staff"]}>
              <InventoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute roles={["admin", "manager", "staff"]}>
              <MakeSalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salesreport"
          element={
            <ProtectedRoute roles={["admin", "manager","staff"]}>
              <SalesReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["admin", "manager", "staff"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster    
        position="top-right"
        autoClose={5000}        // ⏱ stays 5 seconds instead of 3
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body" />
    </BrowserRouter>
  );
}

export default App;
