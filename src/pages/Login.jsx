import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import logo from "../assets/logo.png";
import loginImg from "../assets/Login Image.jpg";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../components/layouts/CustomToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", { email, password });

      // Block unapproved users
      if (data.user && data.user.isApproved === false) {
        toast.custom(
          <CustomToast
            type="error"
            message="Your account is awaiting admin approval. Please check back later."
          />,
          { duration: 5000 }
        );
        return;
      }

      // Update global context and localStorage
      login({
        token: data.token,
        role: data.user.role,
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        phoneNumber: data.user.phoneNumber,
        age: data.user.age,
        picture: data.user.picture,
      });

      // Redirect based on role
      if (data.user.role === "admin") navigate("/admin", { replace: true });
      else if (data.user.role === "manager")
        navigate("/manager", { replace: true });
      else navigate("/staff", { replace: true });
    } catch (err) {
      const status = err.response?.status;
      let message = "Login failed. Please try again later.";

      if (status === 403) {
        message =
          "Your account is awaiting admin approval. Please wait for approval.";
      } else if (status === 401) {
        message = "Invalid email or password.";
      }

      toast.custom(<CustomToast type="error" message={message} />, {
        duration: 5000,
      });
    }
  };

  return (
    <div className="login">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="login--container">
        <img src={logo} alt="simple logo" className="login--img" />
        <h2 className="heading--1">Welcome back</h2>

        <div className="login--signup">
          <p>Don't have an account yet?</p>
          <Link to="/signup" className="login--signup__link">
            <p>Signup</p>
          </Link>
        </div>

        <form onSubmit={handleLogin} className="login--form">
          <label className="login--label">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login--input"
          />

          <label className="login--label">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login--input"
          />

          <button type="submit" className="btn--login">
            Login
          </button>
        </form>
      </div>

      <div className="login--fig">
        <img src={loginImg} alt="" className="login--fig__img" />
      </div>
    </div>
  );
}
