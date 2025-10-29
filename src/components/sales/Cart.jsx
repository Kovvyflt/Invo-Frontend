import React from "react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function Cart({ cart, total, onUpdateQty, onSubmit, onRemove }) {
  return (
    <>
      <h3>🛒 Cart</h3>
      {cart.length === 0 ? (
        <p className="product--cart__p">No items added</p>
      ) : (
        <ul className="product--cart__list">
          {cart.map((c) => (
            <li key={c.product._id} style={{ marginBottom: "8px" }}>
              {c.product.name} - ${c.product.price} ×
              <input
                type="number"
                min="1"
                value={c.quantity}
                onChange={(e) => onUpdateQty(c.product._id, e.target.value)}
                style={{ width: "50px", marginLeft: "8px" }}
              />
              = ${c.quantity * c.product.price}
              <button onClick={() => onRemove(c.product._id)} className="product--cart__remove">Remove</button>
            </li> 
          ))}
        </ul>
      )}
    <div className="product--cart__footer">
      <h3>Total: {formatCurrency(total)}</h3>
      <button disabled={cart.length === 0} onClick={onSubmit}>
        ✅ Complete Sale
      </button>
    </div>
    </>
  );
}
