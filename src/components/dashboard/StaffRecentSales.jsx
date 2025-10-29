import React, { useEffect, useState } from "react";
import API from "../../api";

export default function StaffRecentSales() {
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    const fetchRecentSales = async () => {
      try {
        const { data } = await API.get("/sales/staff/recent-sales");
        setRecentSales(data);
      } catch (err) {
        console.error("❌ Error fetching recent sales:", err);
      }
    };
    fetchRecentSales();
  }, []);

  return (
    <div className="dashboard--card dashboard--card__recent">
      <h3 className="heading--3">🕓 Recent Sales</h3>
      {recentSales.length > 0 ? (
        <table className="dashboard--card__recent--table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((s, idx) => (
              <tr key={idx}>
                <td>{s.name}</td>
                <td>{s.sku}</td>
                <td>{s.qty}</td>
                <td>${s.total.toFixed(2)}</td>
                <td>{new Date(s.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recent sales found.</p>
      )}
    </div>
  );
}
