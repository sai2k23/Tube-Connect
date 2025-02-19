import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context
const SocketContext = createContext();

// Initialize socket connection
const socket = io("http://localhost:5000"); // Change this to your backend URL

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for shared videos
    socket.on("videoShared", (newVideo) => {
      console.log("New Video Shared:", newVideo);
      setNotifications((prev) => [newVideo, ...prev]);
    });

    return () => {
      socket.off("videoShared");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
