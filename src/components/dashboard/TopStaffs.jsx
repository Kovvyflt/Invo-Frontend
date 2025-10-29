import React, { useEffect, useState } from "react";
import API from "../../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TopStaff() {
  const [staffList, setStaffList] = useState([]);
  const [period, setPeriod] = useState("weekly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopStaff = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await API.get(`/sales/top-staff?period=${period}`);
        setStaffList(data?.topStaff || []);
      } catch (err) {
        console.error("❌ Error fetching top staff:", err);
        setError("Failed to load staff data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopStaff();
  }, [period]);

  return (
    <div className="dashboard--card dashboard--card__chart">
      <div className="heading--card">
        <h3 className="heading--3">👨‍💼 Top 3 Staff ({period})</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="select--option"
        >
          <option value="weekly">Last 7 Days</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading chart...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : staffList.length === 0 ? (
        <p className="text-gray-500 mt-4">No sales found for this period.</p>
      ) : (
        <div style={{ width: "100%", height: 320, paddingTop: "1rem" }}>
          <ResponsiveContainer>
            <BarChart
              data={staffList}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fontWeight: 500 }}
                interval={0}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
                labelStyle={{ fontWeight: 600 }}
              />
              <Bar
                dataKey="totalSales"
                fill="#3B82F6"
                barSize={50}
                radius={[8, 8, 0, 0]}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
