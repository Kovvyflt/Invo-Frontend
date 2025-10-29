import React, { useEffect, useState } from "react";
import API from "../../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminRevenueChart() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("7");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await API.get(`/sales/admin/revenue-trend?range=${range}`);
        setData(data || []);
      } catch (err) {
        console.error("❌ Error fetching admin revenue trend:", err);
        setError("Failed to load revenue data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [range]);

  return (
    <div className="dashboard--card dashboard--card__chart">
      <div className="heading--card">
        <h3 className="heading--3">💰 Revenue Trend</h3>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="select--option"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading chart...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 mt-4">No revenue data yet.</p>
      ) : (
        <div style={{ width: "100%", height: 320, paddingTop: "1rem" }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
                labelStyle={{ fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
