"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import whiteLogo from "@/public/images/red_white_logo.png";
import redLogo from "@/public/images/red_logo.png";
import Logo from "@/public/images/logo.png";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const navbarLinks = [
  { name: "Rooms", href: "/rooms" },
  { name: "About", href: "/#about" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Pricing", href: "/pricing" },
  { name: "Service", href: "/#service" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [showStickyNavbar, setShowStickyNavbar] = useState(false);

  const toggleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowStickyNavbar(scrollTop > 100); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Default Navbar (top) - visible initially */}
      <div className="max-lg:hidden w-full p-4 gap-20 flex items-center justify-center text-white font-medium backdrop-blur-xs z-10 relative">
        <ul className="flex gap-20 py-6 items-center justify-center font-[Josefin_Slab]">
          {navbarLinks.slice(0, 3).map((link) => (
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
          {navbarLinks.slice(3, 6).map((link) => (
            <Link key={link.name} href={link.href}>
              <li className="hover:text-primaryGreen border-b border-b-transparent hover:border-b pb-2 hover:border-b-primaryGreen cursor-pointer duration-500 transition">
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Sticky Navbar - appears on scroll */}
      <div
        className={`max-lg:hidden fixed top-0 left-0 w-full z-50 p-4 gap-20 shadow flex items-center justify-center transition-opacity duration-700 ease-in-out
        ${
          showStickyNavbar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        bg-white text-primaryBlue font-bold backdrop-blur-xs`}
      >
        <ul className="flex gap-20 py-6 items-center justify-center font-[Josefin_Slab]">
          {navbarLinks.slice(0, 3).map((link) => (
            <Link key={link.name} href={link.href}>
              <li className=" hover:text-primaryRed border-b border-b-transparent hover:border-b pb-2 hover:border-b-primaryRed  cursor-pointer duration-500 transition">
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
        <Link href="/">
          <Image src={Logo} width={52} height={56} alt="De luxe Logo" />
        </Link>
        <ul className="flex gap-20 py-6 items-center justify-center font-[Josefin_Slab]">
          {navbarLinks.slice(3, 6).map((link) => (
            <Link key={link.name} href={link.href}>
              <li className="hover:text-primaryRed border-b border-b-transparent hover:border-b pb-2 hover:border-b-primaryRed cursor-pointer duration-500 transition">
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div
        className={` ${
          showStickyNavbar
            ? "z-50 fixed top-0 left-0 bg-white text-primaryBlue"
            : "relative text-white"
        }    max-lg:flex hidden w-full px-6 py-4 items-center justify-between  font-medium`}
      >
        <Link href="/">
          <Image
            src={showStickyNavbar ? Logo : whiteLogo}
            width={52}
            height={56}
            alt="White Logo"
          />
        </Link>

        <div
          onClick={() => setOpenNavbar(true)}
          className={`${
            showStickyNavbar ? "" : "hover:bg-primaryGreen/15"
          }  duration-200 transition font-bold p-4 rounded cursor-pointer`}
        >
          {showStickyNavbar ? (
            <CiMenuFries size={24} stroke="23" className="text-primaryBlue" />
          ) : (
            <CiMenuFries onClick={toggleNavbar} size={24} className="" />
          )}
        </div>

        <div
          className={`absolute top-0 right-0 left-0 w-full z-50 bg-primaryBlue/90 backdrop-blur-[10px] h-[80vh] transition-all duration-500 ease-in-out ${
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
              className="bg-primaryBlue text-white h-6 w-6 p-4 flex items-center justify-center rounded-full text-lg font-bold"
            >
              &#x2715;
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-white font-[Josefin_Slab] text-xl p-10">
            {navbarLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <li
                  onClick={() => setOpenNavbar(false)}
                  className="hover:text-primaryGreen hover:bg-gray-100/10 flex items-center justify-between p-4 rounded-md cursor-pointer transition-all duration-300"
                >
                  {link.name}
                  {/* <FaAngleRight /> */}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
