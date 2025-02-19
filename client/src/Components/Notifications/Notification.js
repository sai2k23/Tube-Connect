import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("Profile"))?.result?.email;
        if (!userEmail) return;

        const response = await axios.get(`http://localhost:5000/api/notifications?email=${userEmail}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-page">
      <h2>🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li key={index}>
              <strong>{notification.sharedBy}</strong> shared a video: <em>{notification.title}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
