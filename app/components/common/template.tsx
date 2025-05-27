import React, { ReactNode } from "react";
import Image from "next/image";
import whiteLogo from "@/public/images/white_logo.png";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";

const navbarLinks = [
  { name: "Rooms", href: "/#rooms" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];
const Tamplate = ({ children }: { children: ReactNode }) => {
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

        {/* Mobile navbar */}
        <div className="max-lg:flex hidden w-full px-6 py-4 items-center justify-between text-white font-medium bg-primaryBlue bg-opacity-90">
          <Image src={whiteLogo} width={52} height={56} alt="White Logo" />
          <div className="hover:bg-primaryGreen/15 duration-200 transition font-bold text-white p-4 rounded cursor-pointer">
            <CiMenuFries size={24} />
          </div>
        </div>
      </section>

      <div className="max-w-[1756px] mx-auto">{children}</div>
    </div>
  );
};

export default Tamplate;
