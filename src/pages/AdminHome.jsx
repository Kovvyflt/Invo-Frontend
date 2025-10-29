import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStocks";
import TopStaff from "../components/dashboard/TopStaffs";
import PendingUsers from "../components/dashboard/PendingUsers";
import AdminRevenueChart from "../components/dashboard/AdminRevenueChart";

export default function AdminHome() {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      onAddProduct={() => setShowAddModal(true)}
      showAddModal={showAddModal}
      setShowAddModal={setShowAddModal}
    >
      <div className="grid--item grid--item__1"><TopProducts /></div>
      <div className="grid--item grid--item__2"><LowStock /></div>
      <div className="grid--item grid--item__3"><TopStaff /></div>
      <div className="grid--item grid--item__4"><AdminRevenueChart/></div>
      <div className="grid--item grid--item__5">
        <PendingUsers onClose={() => setShowAddModal(false)} />
      </div>
    </DashboardLayout>
  );
}
