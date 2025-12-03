import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import StaffTopProducts from "../components/dashboard/StaffTopProducts";
import StaffRecentSales from "../components/dashboard/StaffRecentSales";
import StaffSummary from "../components/dashboard/StaffSummary";
import StaffLowStocks from "../components/dashboard/StaffLowStocks";

export default function StaffHome() {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <DashboardLayout
      title="Staff Dashboard"
      onLogout={handleLogout}
      showAddModal={showAddModal}
      setShowAddModal={setShowAddModal}
    >
      <div className="grid--item grid--item__1"><StaffTopProducts/></div>
      <div className="grid--item grid--item__2"><StaffRecentSales/></div>
      <div className="grid--item grid--item__3"><StaffSummary/></div>
      <div className="grid--item grid--item__low"><StaffLowStocks/></div>
    </DashboardLayout>
  );
}
