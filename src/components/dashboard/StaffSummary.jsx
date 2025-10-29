import React, { useEffect, useState } from "react";
import API from "../../api";

export default function StaffSummary() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/sales/staff-summary");
        setStats(data);
      } catch (err) {
        console.error("Error fetching sales summary:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="staff-summary-card">
      <h3 className="heading--3">💰 Your Sales Summary</h3>
      <div className="stats-grid">
        <div className="stat-item total-sales">
          <h4>Total Sales</h4>
          <p>${stats.totalAmount.toFixed(2)}</p>
        </div>
        <div className="stat-item total-items">
          <h4>Items Sold</h4>
          <p>{stats.totalQty}</p>
        </div>
        <div className="stat-item transactions">
          <h4>Transactions</h4>
          <p>{stats.transactions}</p>
        </div>
      </div>
    </div>
  );
}
