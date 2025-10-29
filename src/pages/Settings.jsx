import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import NavBar from "../components/NavBar";
import API from "../api";
import toast from "react-hot-toast";
import CustomToast from "../components/layouts/CustomToast";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    picture: "",
  });
  const [loading, setLoading] = useState(true);
  const [showReLoginModal, setShowReLoginModal] = useState(false);

  // 🔹 Fetch current user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/users/me");
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          password: "",
          phoneNumber: data.phoneNumber || "",
          age: data.age || "",
          picture: data.picture || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        toast((t) => <CustomToast type="error" message="❌ Failed to load user info" />);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/users/me", formData);

      if (data.reauthRequired) {
        toast((t) => <CustomToast type="success" message={data.message} />);
        setShowReLoginModal(true);
      } else {
        toast((t) => <CustomToast type="success" message={data.message || "✅ Profile updated successfully!"} />);
        setFormData((prev) => ({ ...prev, password: "" }));
      }
    } catch (err) {
      console.error("Update error:", err);
      toast((t) => <CustomToast type="error" message={err.response?.data?.message || "❌ Failed to update profile"} />);
    }
  };

  const handleReLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  return (
    <DashboardLayout title="Settings">
        <div className="settings--container">
          {loading ? (
            <p>Loading user data...</p>
          ) : (
            <form onSubmit={handleSubmit} className="settings--form">
              
              <label className="settings--label">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="settings--input"
              />

              <label className="settings--label">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="settings--input"
              />

              <label className="settings--label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="settings--input"
              />

              <label className="settings--label">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="settings--input"
              />

              <label className="settings--label">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="settings--input"
              />

              <label className="settings--label">Picture URL:</label>
              <input
                type="text"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className="settings--input"
              />

              <label className="settings--label">New Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password (optional)"
                className="settings--input"
              />

              <button type="submit" className="btn--settings">
                💾 Save Changes
              </button>
            </form>
          )}
        </div>

      {/* 🔹 Re-Login Modal */}
      {showReLoginModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🔒 Password Updated</h3>
            <p>Your password has been changed successfully.</p>
            <p>Please log in again to continue.</p>
            <div className="modal--actions">
              <button onClick={handleReLogin} className="btn--confirm">
                Login Again
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
