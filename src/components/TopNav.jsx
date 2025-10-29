import React, { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import defaultAvatar from "../assets/avatar.jpg";
import API from "../api";
import { toast } from "react-hot-toast";
import SearchBar from "./SearchBar";

export default function TopNavBar({ onMenuClick, search, setSearch }) {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Fetch notifications
  const fetchNotifications = async () => {
    try {
      const { data } = await API.get("/notifications"); // default → only unread
      setNotifications(data);
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);
    }
  };

  // ✅ Mark as read
  const markAsRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/read`);
      toast.success("Marked as read");
      fetchNotifications(); // refresh list
    } catch (err) {
      console.error("❌ Error marking as read:", err);
      toast.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const storedName = localStorage.getItem("firstName") || "User";
    setUserName(storedName);

    fetchNotifications();
  }, []);

  // ✅ Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // ✅ Only show unread notifications in dropdown
  const visibleNotifications = notifications.filter((n) => !n.isRead);

  return (
    <div className="topnav">
      {/* Left side greeting */}
      <div className="topnav--left">
        <h3>
          {greeting}, <span className="topnav--name">{userName}</span>
        </h3>
      </div>

      {/* Search bar */}
      <div className="topnav--search">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Right side icons */}
      <div className="topnav--right">
        {/* Notification bell */}
        <div
          className="topnav--icon relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <CiBellOn size="2em" />
          {unreadCount > 0 && (
            <span className="notification-count">{unreadCount}</span>
          )}
        </div>

        {/* 🔽 Dropdown modal */}
        {showDropdown && (
          <div className="notification-dropdown">
            <h4>🔔 Notifications</h4>
            {visibleNotifications.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              <ul>
                {visibleNotifications.map((n) => (
                  <li key={n._id} className={!n.isRead ? "unread" : ""}>
                    <p>{n.message}</p>
                    <small>
                      Product: {n.product?.name} ({n.product?.sku})
                    </small>
                    <br />
                    <small>From: {n.sender?.name}</small>
                    {!n.isRead && (
                      <button
                        className="mark-read-btn"
                        onClick={() => markAsRead(n._id)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Avatar */}
        <div className="topnav--fig">
          <img src={defaultAvatar} alt="avatar" className="topnav--avatar" />
        </div>

        {/* Menu toggle */}
        <div className="topnav--menu" onClick={onMenuClick}>
          <IoMenu size="2em" />
        </div>
      </div>
    </div>
  );
}
