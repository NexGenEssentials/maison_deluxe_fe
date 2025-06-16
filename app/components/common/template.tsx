"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import whiteLogo from "@/public/images/red_white_logo.png";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import redLogo from "@/public/images/red_logo.png";
import { navbarLinks } from "../navbar/navbar";
import FooterSection from "../footer/footer";

const Tamplate = ({ children }: { children: ReactNode }) => {
  const [openNavbar, setOpenNavbar] = useState(false);

  const toggleNavbar = () => {
   
    setOpenNavbar(!openNavbar);
  };
  return (
    <div>
      <section className="bg-primaryBlue text-white sticky top-0 z-50">
        {/* Large screen navbar */}
        <div className="max-lg:hidden w-full p-4 gap-20 flex items-center justify-center text-white font-medium backdrop-blur-xs bg-primaryBlue bg-opacity-90">
          <ul className="flex gap-20 py-6 items-center justify-center font-[Josefin_Slab]">
            {navbarLinks.slice(0, 2).map((link) => (
              <Link key={link.name} href={link.href}>
                <li className="hover:text-primaryGreen border-b border-b-transparent hover:border-b pb-2 hover:border-b-primaryGreen cursor-pointer duration-500 transition">
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
          <Link href="/">
            <Image src={whiteLogo} width={52} height={56} alt="White Logo" />
          </Link>
          <ul className="flex gap-20 py-6 items-center justify-center font-[Josefin_Slab]">
            {navbarLinks.slice(2, 4).map((link) => (
              <Link key={link.name} href={link.href}>
                <li className="hover:text-primaryGreen border-b border-b-transparent hover:border-b pb-2 hover:border-b-primaryGreen cursor-pointer duration-500 transition">
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="relative max-lg:flex hidden w-full px-6 py-4 items-center justify-between text-white font-medium">
          <Link href="/">
            <Image src={whiteLogo} width={52} height={56} alt="White Logo" />
          </Link>
          <div className="hover:bg-primaryGreen/15 duration-200 transition font-bold text-white p-4 rounded cursor-pointer">
            <CiMenuFries onClick={toggleNavbar} size={24} />
          </div>

          <div
            className={`absolute top-0 right-0 left-0 w-full z-50 bg-[#000000cc] backdrop-blur-[5px] h-[80vh] transition-all duration-500 ease-in-out ${
              openNavbar
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-center p-6 bg-white">
              <Link href="/">
                <Image src={redLogo} width={52} height={56} alt="White Logo" />
              </Link>
              <button
                onClick={toggleNavbar}
                className="text-black text-2xl font-bold"
              >
                &#x2715;
              </button>
            </div>
            <ul className="flex flex-col gap-8 text-white font-[Josefin_Slab] text-xl p-10">
              {navbarLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <li
                    onClick={() => setOpenNavbar(false)}
                    className="hover:text-primaryGreen hover:bg-gray-100/10 flex items-center justify-between p-4 rounded-md cursor-pointer transition-all duration-300"
                  >
                    {link.name}
                    <FaAngleRight />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-[1756px] mx-auto">{children}</div>
      <FooterSection />
    </div>
  );
};

export default Tamplate;
