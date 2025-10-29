import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdDashboard, MdOutlineInventory, MdOutlineAddChart, MdAddShoppingCart } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

export default function NavBar({ onAddProduct }) {
  const { logout, user } = useAuth();
  const role = user?.role;

  // Dynamically assign dashboard path
  const dashboardPath =
    role === "admin" ? "/admin" :
    role === "manager" ? "/manager" :
    role === "staff" ? "/staff" :
    "/";

  return (
    <div className="nav--container" >
      <ul className="nav--bar">
        <Link to={dashboardPath} className="nav--link__item">
          <li className="nav--link">
            <MdDashboard size="1.5em" />
            Dashboard
          </li>
        </Link>

        <Link to="/inventory" className="nav--link__item">
          <li className="nav--link">
            <MdOutlineInventory size="1.5em" />
            Inventory List
          </li>
        </Link>

        {onAddProduct && (
          <Link
            className="nav--link__item"
            onClick={(e) => {
              e.preventDefault();
              onAddProduct();
            }}
          >
            <li className="nav--link">
              <MdOutlineAddChart size="1.5em" />
              Add Products
            </li>
          </Link>
        )}

        <Link to="/sales" className="nav--link__item">
          <li className="nav--link">
            <MdAddShoppingCart size="1.5em" />
            Make Sales
          </li>
        </Link>

        <Link to="/salesreport" className="nav--link__item">
          <li className="nav--link">
            <TbReportAnalytics size="1.5em" />
            Sales Report
          </li>
        </Link>

        <Link to="/settings" className="nav--link__item">
          <li className="nav--link">
            <IoSettingsOutline size="1.5em" />
            Settings
          </li>
        </Link>
      </ul>

      <button className="btn--logout" onClick={logout}>
        <IoIosLogOut size="1.5em" /> Logout
      </button>
    </div>
  );
}