import React, { useEffect, useState } from "react";
import API from "../../api";

export default function EditProductModal({ productId, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${productId}`);
        setFormData({
          name: data.name,
          sku: data.sku,
          quantity: data.quantity,
          price: data.price,
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setMessage("❌ Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${productId}`, formData);
      setMessage("✅ Product updated successfully!");
      if (onUpdated) onUpdated(); // refresh parent list
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.response?.data?.message || "❌ Failed to update product");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>✏️ Edit Product</h3>

        {loading ? (
          <p>Loading product details...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU"
              required
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />

            <button type="submit">Update Product</button>
          </form>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
