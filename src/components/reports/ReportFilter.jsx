import React, { useState, useEffect } from "react";
import API from "../../api";

export default function ReportFilter({ filter, setFilter, onFetch, isStaff }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");

  // 🔹 Fetch staff list for admin/manager
  useEffect(() => {
    if (!isStaff) {
      API.get("/users?role=staff")
        .then(({ data }) => setStaffList(data))
        .catch(() => console.error("Failed to load staff list"));
    }
  }, [isStaff]);

  const handleFetch = () => {
    let query = `?type=${filter}`;

    if (filter === "custom" && startDate && endDate) {
      query += `&startDate=${startDate}&endDate=${endDate}`;
    }

    if (selectedStaff) {
      query += `&staffId=${selectedStaff}`;
    }

    onFetch(query);
  };

  return (
    <div className="sales--report__filter">
      {/* Filter Type */}
      <label className="filter--label">Filter Type:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter--select"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="custom">Custom</option>
      </select>

      {/* Custom Date Range */}
      {filter === "custom" && (
        <div className="sales--report__filter--custom">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="sales--report__filter--custom__date"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="sales--report__filter--custom__date"
          />
        </div>
      )}

      {/* Staff Dropdown for Admin/Manager */}
      {!isStaff && (
        <div className="sales--report__filter--staff">
          <label className="filter--label">Filter by Staff:</label>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="filter--select"
          >
            <option value="">All Staff</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button onClick={handleFetch} className="btn--fetch">
        Load Report
      </button>
    </div>
  );
}
