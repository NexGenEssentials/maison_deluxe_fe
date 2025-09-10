"use client";
import React, { useState } from "react";
import { FiHome, FiBriefcase, FiMessageSquare } from "react-icons/fi";
import clsx from "clsx";
import { useAppContext } from "@/app/context";
import { RiLogoutCircleLine, RiSecurePaymentFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { IoIosPeople } from "react-icons/io";
import { Logout } from "@/app/utils/logout";
import { TbBrandBooking } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";

const menuItems = [
  {
    label: "Dashboard",
    icon: <FiHome />,
    path: "/dashboard",
  },
  {
    label: "Bookings",
    icon: <TbBrandBooking />,
    path: "/bookings",
  },
  {
    label: "Room Type",
    icon: <FiBriefcase />,
    path: "/room",
  },
  {
    label: "Payments",
    icon: <RiSecurePaymentFill />,
    path: "/payments",
  },
  {
    label: "Users",
    icon: <FaUsers />,
    path: "/users",
  },
  {
    label: "Message",
    icon: <FiMessageSquare />,
    path: "/message",
  },
  {
    label: "Subscribers",
    icon: <IoIosPeople />,
    path: "/subscribers",
  },
];

const SideBarNav = () => {
  const [active, setActive] = useState("Dashboard");
  const { setActiveTab } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    Logout();
    router.push("/");
  };

  return (
    <aside className="bg-[#F4F7FF] h-screen fixed top-25 left-0 min-w-[240px] pt-10 shadow-md">
      <nav className="flex flex-col space-y-2 px-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActive(item.label);
              setActiveTab(item.label);
              router.push("/dashboard");
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
        <div
          onClick={handleLogout}
          className="hover:bg-white hover:text-primaryBlue hover:font-semibold hover:shadow cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition-all duration-200"
        >
          {" "}
          <span className="text-xl">
            <RiLogoutCircleLine />
          </span>
          <span className="">Logout</span>
        </div>
      </nav>
    </aside>
  );
};

export default SideBarNav;
