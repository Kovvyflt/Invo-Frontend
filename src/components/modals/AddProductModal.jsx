import React, { useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";
import CustomToast from "../layouts/CustomToast";

export default function AddProductModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/products", {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });

      toast.custom(
        <CustomToast type="success" message={`✅ Product "${data.name}" added successfully!`} />,
        { duration: 4000 }
      );

      setForm({ name: "", sku: "", quantity: "", price: "" });
      onClose(); // ✅ auto-close modal after success
    } catch (err) {
      toast.custom(
        <CustomToast
          type="error"
          message={err.response?.data?.message || "❌ Failed to add product"}
        />,
        { duration: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
