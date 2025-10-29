import React from "react";

export default function SummaryCard({ sales, range }) {
  if (!sales || sales.length === 0) return null;

  // ✅ Handle both flattened and nested sales structures
  const totalAmount = sales.reduce((sum, s) => {
    if (s.total) return sum + s.total;
    if (s.items && s.items.length > 0)
      return sum + s.items.reduce((acc, i) => acc + i.priceAtSale * i.quantity, 0);
    return sum;
  }, 0);

  const totalQty = sales.reduce((sum, s) => {
    if (s.quantity) return sum + s.quantity;
    if (s.items && s.items.length > 0)
      return sum + s.items.reduce((acc, i) => acc + i.quantity, 0);
    return sum;
  }, 0);

  const totalTransactions = sales.length;

  return (
    <div className="sales--report__summary">
      <h4 className="heading--4">📈 Summary</h4>
      <p><strong>Total Sales:</strong> ${totalAmount.toFixed(2)}</p>
      <p><strong>Total Items Sold:</strong> {totalQty}</p>
      <p className="sales--report__summary--highlight"><strong>Transactions:</strong> {totalTransactions}</p>
      {range && (
        <p className="sales--text">
          <small>
            Range: {new Date(range.start).toLocaleDateString()} –{" "}
            {new Date(range.end).toLocaleDateString()}
          </small>
        </p>
      )}
    </div>
  );
}
