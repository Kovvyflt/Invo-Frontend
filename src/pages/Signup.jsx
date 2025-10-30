import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import logo from "../assets/logo.png";
import signupImg from "../assets/Login Image.jpg";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../components/layouts/CustomToast";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    picture: "",
    role: "staff",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", form);

      toast.custom(
        <CustomToast
          type="success"
          message={data.message || "Registration successful ✅"}
        />,
        { duration: 5000 }
      );

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.custom(
        <CustomToast
          type="error"
          message={err.response?.data?.message || "❌ Failed to register"}
        />,
        { duration: 5000 }
      );
    }
  };

  return (
    <div className="login">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="login--container">
        <img src={logo} alt="simple logo" className="login--img" />
        <h2 className="heading--1">Create an Account</h2>

        <div className="login--signup">
          <p>Already have an account?</p>
          <Link to="/login" className="login--signup__link">
            <p>Login</p>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="login--form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="login--input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="login--input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="login--input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="login--input"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="login--input"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="login--input"
          />
          <input
            type="text"
            name="picture"
            placeholder="Profile Picture URL"
            value={form.picture}
            onChange={handleChange}
            className="login--input"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="login--input"
          >
            <option value="staff">Staff</option>
          </select>

          <button type="submit" className="btn--login">
            Sign Up
          </button>
        </form>
      </div>

      <div className="login--fig">
        <img src={signupImg} alt="signup figure" className="login--fig__img" />
      </div>
    </div>
  );
}
