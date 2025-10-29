import React, { useEffect, useState } from "react";
import API from "../../api";

export default function LowStock() {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const { data } = await API.get("/products/low-stock");
        setLowStock(data);
      } catch (err) {
        console.error("Error fetching low stock:", err);
      }
    };
    fetchLowStock();
  }, []);

  return (
    <div className="dashboard--card dashboard--card__products">
      <h3 className="heading--3">⚠️ Low Stock</h3>
      <ul className="product--list">
        {lowStock.map((p) => (
          <li key={p._id} className="product--item">
            <div>
              <span className="product--name">{p.name}</span>
              <span className="product--meta">({p.sku})</span>
            </div>
            <span className="product--sold"> Qty: {p.quantity}</span>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
