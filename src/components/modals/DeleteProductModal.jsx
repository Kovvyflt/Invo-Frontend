import React, { useState } from "react";
import API from "../../api";

export default function DeleteProductModal({ product, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!product) return null; // Safety check

  const handleDelete = async () => {
    setLoading(true);
    try {
      await API.delete(`/products/${product._id}`);
      setMessage("✅ Product deleted successfully!");
      if (onDeleted) onDeleted(); // Refresh parent list
      setTimeout(onClose, 1000); // Close modal after success
    } catch (err) {
      console.error("Delete error:", err);
      setMessage(err.response?.data?.message || "❌ Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>🗑️ Confirm Delete</h3>
        <p>
          Are you sure you want to delete <b>{product.name}</b> (SKU:{" "}
          <b>{product.sku}</b>)?
        </p>

        {message && <p>{message}</p>}

        <div style={{ marginTop: "15px" }}>
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{ marginRight: "10px", backgroundColor: "red", color: "white" }}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
