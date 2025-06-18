"use client";
import React, { useState } from "react";
import {
  FiHome,
  FiCalendar,
  FiBriefcase,
  FiMessageSquare,
} from "react-icons/fi";
import clsx from "clsx";
import { useAppContext } from "@/app/context";

const menuItems = [
  {
    label: "Dashboard",
    icon: <FiHome />,
    path: "/dashboard",
  },
  {
    label: "Bookings",
    icon: <FiCalendar />,
    path: "/bookings",
  },
  {
    label: "Room Type",
    icon: <FiBriefcase />,
    path: "/room",
  },
  {
    label: "Message",
    icon: <FiMessageSquare />,
    path: "/message",
  },
];

const SideBarNav = () => {
  const [active, setActive] = useState("Dashboard");
  const { setActiveTab } = useAppContext();

  return (
    <aside className="bg-[#F4F7FF] h-screen fixed top-25 left-0 min-w-[240px] pt-10 shadow-md">
      <nav className="flex flex-col space-y-2 px-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActive(item.label);
              setActiveTab(item.label);
            }}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition-all duration-200",
              active === item.label
                ? "bg-white text-primaryBlue font-semibold shadow"
                : "hover:bg-white hover:text-primaryBlue"
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBarNav;
