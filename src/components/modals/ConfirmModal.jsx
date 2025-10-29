import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onCancel}>✖</button>
        <h3>⚠️ Confirmation</h3>
        <p>{message}</p>
        <div className="modal--actions">
          <button onClick={onConfirm} className="btn--confirm">
            Yes
          </button>
          <button onClick={onCancel} className="btn--cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
