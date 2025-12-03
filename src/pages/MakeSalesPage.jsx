import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../components/Pagination";
import AddProductModal from "../components/modals/AddProductModal";
import DashboardLayout from "../components/layouts/DashboardLayout";
import API from "../api";
import ProductsList from "../components/sales/ProductList";
import Cart from "../components/sales/Cart";
import CustomToast from "../components/layouts/CustomToast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ShoppingCart } from "lucide-react"; // ✅ uses lucide-react icon

export default function MakeSalesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const canEdit = isAdmin || isManager;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(
          `/products?search=${search}&page=${currentPage}&limit=${pageSize}`
        );
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.custom(
          <CustomToast type="error" message="❌ Failed to load products" />,
          { duration: 5000 }
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, currentPage]);

  const addToCart = (product) => {
    if (cart.find((c) => c.product._id === product._id)) return;
    setCart([...cart, { product, quantity: 1 }]);
  };

  const updateQuantity = (id, qty) => {
    setCart(
      cart.map((c) =>
        c.product._id === id ? { ...c, quantity: Number(qty) } : c
      )
    );
  };

  const total = cart.reduce((sum, c) => sum + c.quantity * c.product.price, 0);

  const generateReceiptPDF = (sale) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Sales Receipt", 14, 15);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);
    doc.text(`Receipt ID: ${sale._id || "N/A"}`, 14, 28);

    const tableColumn = ["Product", "Qty", "Price", "Subtotal"];
    const tableRows = sale.items.map((item) => [
      item.product.name,
      item.quantity,
      `$${item.product.price.toFixed(2)}`,
      `$${(item.quantity * item.product.price).toFixed(2)}`
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 35 });
    doc.setFontSize(12);
    doc.text(`Total: $${sale.total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text("Thank you for your purchase!", 14, doc.lastAutoTable.finalY + 20);
    doc.save(`receipt-${sale._id || Date.now()}.pdf`);
  };

  const handleSubmit = async () => {
    if (cart.length === 0) {
      toast.custom(
        <CustomToast type="warning" message="🛒 Cart is empty!" />,
        { duration: 4000 }
      );
      return;
    }

    try {
      const saleData = {
        items: cart.map((c) => ({
          product: c.product._id,
          quantity: c.quantity,
        })),
      };

      const { data: savedSale } = await API.post("/sales", saleData);

      toast.custom(
        <CustomToast type="success" message="✅ Sale recorded successfully!" />,
        { duration: 5000 }
      );

      generateReceiptPDF({
        _id: savedSale._id,
        items: cart,
        total,
      });

      setCart([]);
      setShowCart(false); // hide cart after completion
    } catch (err) {
      console.error("Sale error:", err);
      toast.custom(
        <CustomToast
          type="error"
          message={err.response?.data?.message || "❌ Failed to record sale"}
        />,
        { duration: 6000 }
      );
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Make Sales"
      showAddModal={showAddModal}
      onAddProduct={canEdit ? () => setShowAddModal(true) : null}
      setShowAddModal={setShowAddModal}
      search={search}
      setSearch={setSearch}
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Left: Product Section */}
      <div className="product--available">
        <ProductsList
          products={filteredProducts}
          loading={loading}
          onAdd={addToCart}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Floating Cart Button */}
      <button
        className="floating-cart-btn"
        onClick={() => setShowCart((prev) => !prev)}
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </button>

      {/* Slide-in Cart Panel */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart-panel">
            <Cart
              cart={cart}
              total={total}
              onUpdateQty={updateQuantity}
              onSubmit={handleSubmit}
              onRemove={(id) =>
                setCart(cart.filter((c) => c.product._id !== id))
              }
            />
            <button
              className="close-cart-btn"
              onClick={() => setShowCart(false)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}

      {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} />}
    </DashboardLayout>
  );
}
