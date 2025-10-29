// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Rehydrate user on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("userId");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const age = localStorage.getItem("age");
    const picture = localStorage.getItem("picture");

    if (token && role) {
      setUser({
        token,
        role,
        id,
        firstName,
        lastName,
        phoneNumber,
        age,
        picture,
      });
    }
    setLoading(false);
  }, []);

  // 🔹 Login and store to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("firstName", userData.firstName);
    localStorage.setItem("lastName", userData.lastName);
    localStorage.setItem("phoneNumber", userData.phoneNumber || "");
    localStorage.setItem("age", userData.age || "");
    localStorage.setItem("picture", userData.picture || "");
  };

  // 🔹 Logout and clear
  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
