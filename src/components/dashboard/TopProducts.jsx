import React, { useEffect, useState } from "react";
import API from "../../api";

export default function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data } = await API.get("/sales/top-products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching top products:", err);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className="dashboard--card dashboard--card__products ">
      <h3 className="heading--3">🔥 Top 4 Products</h3>
      <ul className="product--list">
        {products.map((p) => (
          <li key={p._id} className="product--item">
            <div>
              <span className="product--name">{p.name}</span>{" "}
              <span className="product--meta">({p.sku})</span>
            </div>
            <span className="product--sold">Sold: {p.totalSold}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}
