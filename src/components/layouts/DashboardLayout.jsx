import React, { useState } from "react";
import NavBar from "../NavBar";
import TopNavBar from "../TopNav";
import AddProductModal from "../modals/AddProductModal";

export default function DashboardLayout({
  title,
  onAddProduct,
  onLogout,
  showAddModal,
  setShowAddModal,
  search,
  setSearch,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="adminHome">
      <div className={`adminHome--container ${menuOpen ? "adminHome--container__open" : ""}`}>
        <h2>{title}</h2>
        <NavBar onAddProduct={onAddProduct} onLogOut={onLogout} />
      </div>

      <div className="grid--container">
        <TopNavBar 
          onMenuClick={toggleMenu} 
          isMenuOpen = {menuOpen}
          search={search}
          setSearch={setSearch}
        />
        {children}
      </div>

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
