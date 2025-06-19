import React from "react";
import Image from "next/image";
import redlogo from "@/public/images/red_logo.png";
import { FiSearch, FiBell, FiInfo, FiGlobe } from "react-icons/fi";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="sticky top-0 left-0 z-50 bg-white flex justify-between items-center w-full p-6 shadow-sm">
      <Link href={"/"} className="w-16 h-16 relative">
        <Image src={redlogo} alt="Description of image" fill />
      </Link>
      <div className="flex items-center bg-white rounded-full  px-4 py-2 space-x-4 ">
        {/* Search input */}
        <div className="flex items-center bg-[#F6F8FF] rounded-full px-4 py-2 w-full min-w-[300px]">
          <FiSearch className="text-[#B0B7C3] mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-[#B0B7C3] placeholder-[#B0B7C3] w-full"
          />
        </div>

        {/* Icons */}
        <button className="text-[#B0B7C3] hover:text-blue-900">
          <FiBell size={18} />
        </button>
        <button className="text-[#B0B7C3] hover:text-blue-900">
          <FiInfo size={18} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
