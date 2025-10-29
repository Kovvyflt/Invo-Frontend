import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import AddProductModal from "../components/modals/AddProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import DeleteProductModal from "../components/modals/DeleteProductModal";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import API from "../api";

export default function InventoryList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const pageSize = 10;
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const canEdit = isAdmin || isManager;

  const fetchProducts = async (page, searchTerm = "") => {
    setLoading(true);
    try {
      const { data } = await API.get(`/products?search=${searchTerm}&page=${page}&limit=${pageSize}`);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (err) {
      console.error("Error fetching products:", err);
      setMessage("❌ Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, search);
  }, [search]);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <DashboardLayout
      title="Inventory List"
      onAddProduct={canEdit ? () => setShowAddModal(true) : null}
      showAddModal={showAddModal}
      setShowAddModal={setShowAddModal}
      search={search}
      setSearch={setSearch} // 🔹 Pass search props to TopNavBar
    >
      <div className="grid--item grid--item__products">
        {message && <p>{message}</p>}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <ProductTable
              products={products}
              onEdit={
                canEdit
                  ? (id) => {
                      setSelectedProductId(id);
                      setShowEditModal(true);
                    }
                  : null
              }
              onDelete={isAdmin ? handleDelete : null}
              canEdit={canEdit}
              canDelete={isAdmin}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => fetchProducts(page, search)}
            />
          </>
        )}
      </div>

      {showEditModal && (
        <EditProductModal
          productId={selectedProductId}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => fetchProducts(currentPage, search)}
        />
      )}

      {showDeleteModal && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          onDeleted={() => fetchProducts(currentPage, search)}
        />
      )}
    </DashboardLayout>
  );
}
