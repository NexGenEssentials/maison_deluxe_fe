"use client";
import React from "react";
import { useAppContext } from "../context";
import DashboardAnalytics from "./components/dashboard";
import RoomType from "./components/roomType";
import Messages from "./components/messages";
import Subbscribers from "./components/subscribers";
import BookingPage from "./components/bookings/booking";
import UsersPage from "./components/users/users";

const AdminDashboard = () => {
  const { activeTab } = useAppContext();
  return (
    <div className="w-full pl-60">
      {activeTab === "Dashboard" && <DashboardAnalytics />}
      {activeTab === "Bookings" && <BookingPage />}
      {activeTab === "Room Type" && <RoomType />}
      {activeTab === "Payments" && (
        <div className="w-full h-[40vh] flex items-center justify-center">
          Payment is currently unavailable
        </div>
      )}
      {activeTab === "Users" && <UsersPage />}
      {activeTab === "Message" && <Messages />}
      {activeTab === "Subscribers" && <Subbscribers />}
    </div>
  );
};

export default AdminDashboard;
