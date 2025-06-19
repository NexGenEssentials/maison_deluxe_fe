"use client";
import React from "react";
import { useAppContext } from "../context";
import DashboardAnalytics from "./components/dashboard";
import RoomType from "./components/roomType";
import Messages from "./components/messages";

const AdminDashboard = () => {
  const { activeTab } = useAppContext();
  return (
    <div className="w-full pl-60">
      {activeTab === "Dashboard" && <DashboardAnalytics />}
      {activeTab === "Room Type" && <RoomType />}
      {activeTab === "Message" && <Messages />}
    </div>
  );
};

export default AdminDashboard;
