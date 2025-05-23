import React from "react";
import Image from "next/image";
import whiteLogo from "@/public/images/white_logo.png";
import { CiMenuFries } from "react-icons/ci";
const Navbar = () => {
  return (
    <>
      {/* large screen navbar */}
      <div className="max-lg:hidden w-full p-4 flex items-center justify-center text-white font-medium backdrop-blur-xs ">
        <ul className="flex gap-20 py-6 items-center justify-center font-[Josefin_Slab]">
          <li>Rooms</li>
          <li>About</li>
          <Image src={whiteLogo} width={52} height={56} alt="White Logo" />
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="max-lg:flex hidden w-full px-6 py-4  items-center justify-between text-white font-medium ">
        <Image src={whiteLogo} width={52} height={56} alt="White Logo" />
        <div className="hover:bg-primaryGreen/15 duration-200 transition font-bold text-white p-4 rounded  text-white cursor-pointer">
          <CiMenuFries size={24} />
        </div>
        {/* <li>Rooms</li>
          <li>About</li>
          <li>Blog</li>
          <li>Contact</li> */}
      </div>
    </>
  );
};

export default Navbar;
