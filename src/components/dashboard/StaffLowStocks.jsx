import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import API from "../../api";
import CustomToast from "../layouts/CustomToast";

export default function StaffLowStocks() {
  const [products, setProducts] = useState([]);

  const fetchLowStock = async () => {
    try {
      const { data } = await API.get("/products/low-stock");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching low-stock products:", err);
      toast.custom(
        <CustomToast type="error" message="❌ Failed to fetch low-stock items" />,
        { duration: 5000 }
      );
    }
  };

  const sendAlert = async (id) => {
    try {
      const { data } = await API.post(`/notifications/alert/${id}`);
      toast.custom(
        <CustomToast
          type="success"
          message={data.message || "✅ Alert sent to admin!"}
        />,
        { duration: 5000 }
      );
    } catch (err) {
      console.error("Error sending alert:", err);
      toast.custom(
        <CustomToast type="error" message="❌ Failed to send alert" />,
        { duration: 6000 }
      );
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className="dashboard--card">
      <Toaster position="top-right" reverseOrder={false} />

      <h3 className="heading--3">⚠️ Low Stock Products</h3>

      {products.length > 0 ? (
        <ul className="product--list">
          {products.map((p) => (
            <li key={p._id} className="product--item">
              <div>
                <strong className="product--name">{p.name}</strong> ({p.sku})
              </div>
              <p className="product--sold">Qty: {p.quantity}</p>
              <button
                onClick={() => sendAlert(p._id)}
                className="product--cart__remove"
              >
                Send Alert
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No low-stock products found.</p>
      )}
    </div>
  );
}
