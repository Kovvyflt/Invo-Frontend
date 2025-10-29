import React from "react";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}) {
  return (
    <table className="product--table">
      <thead>
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Qty</th>
          <th>Price</th>
          {(canEdit || canDelete) && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? (
          products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>

              {(canEdit || canDelete) && (
                <td className="actions">
                  {canEdit ? (
                    <button
                      className="btn--edit"
                      onClick={() => onEdit(p._id)}
                    >
                      ✏️ Edit
                    </button>
                  ) : (
                    <button className="btn--edit btn--disabled" disabled>
                      ✏️ Edit
                    </button>
                  )}

                  {canDelete ? (
                    <button
                      className="btn--delete"
                      onClick={() => onDelete(p)}
                    >
                      🗑 Delete
                    </button>
                  ) : (
                    <button className="btn--delete btn--disabled" disabled>
                      🗑 Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={canEdit || canDelete ? 5 : 4}>No products found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
