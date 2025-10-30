import React from "react";

export default function ReportTable({ sales, loading, message }) {
  if (loading) return <p>Loading report...</p>;
  if (message) return <p>{message}</p>;
  if (!sales || sales.length === 0) return <p>No sales data found.</p>;

  // ✅ Backend already returns flat sales rows
  const allRows = sales.map((sale) => ({
    productName: sale.productName || "N/A",
    sku: sale.sku || "N/A",
    quantity: sale.quantity || 0,
    price: sale.priceAtSale != null ? sale.priceAtSale.toFixed(2) : "0.00",
    total: sale.total != null ? sale.total.toFixed(2) : "0.00",
    soldBy: sale.soldBy || "Unknown",
    date: sale.createdAt
      ? new Date(sale.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <div className="sales--report__table">
      <table className="sales--report__table--wrapper">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Sold By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allRows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.productName}</td>
              <td>{row.sku}</td>
              <td>{row.quantity}</td>
              <td>${row.price}</td>
              <td>${row.total}</td>
              <td>{row.soldBy}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
