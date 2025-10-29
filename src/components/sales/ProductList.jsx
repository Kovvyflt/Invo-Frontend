import React from "react";

export default function ProductsList({ products, loading, onAdd }) {
  if (loading) return <p>Loading products...</p>;

  return (
    <ul className="product--sales">
      {products.length > 0 ? (
        products.map((p) => (
          <li key={p._id}>
            {p.name} ({p.sku}) - ${p.price} | Stock: {p.quantity}
            <button
              onClick={() => onAdd(p)}
              className="btn--product"
            >
              Add
            </button>
          </li>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ul>
  );
}
