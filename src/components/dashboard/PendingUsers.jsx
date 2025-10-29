import React, { useEffect, useState } from "react";
import API from "../../api";
import ConfirmModal from "../modals/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../layouts/CustomToast";

export default function PendingUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const fetchPendingUsers = async () => {
    try {
      const { data } = await API.get("/auth/pending");
      setPendingUsers(data);
    } catch (err) {
      console.error("Error fetching pending users:", err);
      toast.custom(
        <CustomToast type="error" message="❌ Failed to load pending users" />,
        { duration: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await API.put(`/auth/approve/${userId}`);
      toast.custom(
        <CustomToast type="success" message="✅ User approved successfully!" />,
        { duration: 4000 }
      );
      fetchPendingUsers();
    } catch (err) {
      console.error("Approval error:", err);
      toast.custom(
        <CustomToast
          type="error"
          message={err.response?.data?.message || "❌ Failed to approve user"}
        />,
        { duration: 5000 }
      );
    }
  };

  const handleDelete = async (userId) => {
    try {
      await API.delete(`/auth/${userId}`);
      toast.custom(
        <CustomToast type="success" message="🗑️ User deleted successfully!" />,
        { duration: 4000 }
      );
      fetchPendingUsers();
    } catch (err) {
      console.error("Delete error:", err);
      toast.custom(
        <CustomToast
          type="error"
          message={err.response?.data?.message || "❌ Failed to delete user"}
        />,
        { duration: 5000 }
      );
    }
  };

  // Open confirmation modal
  const confirmAndExecute = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setConfirmAction(null);
  };

  return (
    <div className="dashboard--card dashboard--card__users">
      <Toaster position="top-right" reverseOrder={false} />

      <h3 className="heading--3">👥 Pending User Approvals</h3>

      {loading ? (
        <p>Loading pending users...</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul className="user--list">
          {pendingUsers.map((u) => (
            <li key={u._id} className="user--item">
              <div>
                <strong>{u.name}</strong> <span>({u.email})</span>
                <p>Role: {u.role}</p>
              </div>
              <div className="user--actions">
                <button
                  onClick={() =>
                    confirmAndExecute(
                      `Are you sure you want to approve ${u.name}?`,
                      () => handleApprove(u._id)
                    )
                  }
                  className="btn--user btn--user__approve"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    confirmAndExecute(
                      `Are you sure you want to delete ${u.name}?`,
                      () => handleDelete(u._id)
                    )
                  }
                  className="btn--user btn--user__delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {confirmAction && (
        <ConfirmModal
          message={confirmMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
