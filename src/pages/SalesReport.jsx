import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddProductModal from "../components/modals/AddProductModal";
import API from "../api";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ReportFilter from "../components/reports/ReportFilter";
import ReportTable from "../components/reports/ReportTable";
import DownloadButton from "../components/reports/DownloadButton";
import SummaryCard from "../components/reports/SummaryCard";

export default function SalesReport() {
  const [sales, setSales] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [range, setRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const isStaff = role === "staff";
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const canEdit = isAdmin || isManager;

  // 🔹 Fetch Sales Report
  const fetchSales = async (query = "") => {
    setLoading(true);
    try {
      const endpoint = isStaff
        ? `/sales/user/${userId}${query}`
        : `/sales/report${query}`;

      const { data } = await API.get(endpoint);
      setSales(data.sales);
      setRange(data.range || null);
      setMessage("");
    } catch (err) {
      console.error("❌ Error fetching sales report:", err);
      setMessage("❌ Failed to fetch report");
    } finally {
      setLoading(false);
    }
};
  return (
    <DashboardLayout
          title="Make Sales"
          onAddProduct={canEdit ? () => setShowAddModal(true) : null}
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
        >
              <div className="sales--report">
                {/* Filters + Controls */}
                <ReportFilter
                  filter={filter}
                  setFilter={setFilter}
                  onFetch={fetchSales}
                  isStaff={isStaff}
                />

                {/* Summary + Table + Download */}
                <SummaryCard sales={sales} range={range} />
                <ReportTable sales={sales} loading={loading} message={message} />
                <DownloadButton sales={sales} filter={filter} range={range} />
              </div>

              {showAddModal && (
                <AddProductModal onClose={() => setShowAddModal(false)} />
              )}

        </DashboardLayout>
  
  );
}


