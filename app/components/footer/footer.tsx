"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import whiteLogo from "@/public/images/red_white_logo.png";
import { FaArrowRightLong, FaLinkedinIn } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { ImFacebook } from "react-icons/im";
import { Subscribe } from "@/app/api/common/action";
import { FiLoader } from "react-icons/fi";

const QuickLinks = [
  { name: "Rooms", href: "/rooms" },
  { name: "About", href: "/#about" },
  { name: "Service", href: "/#service" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/#contact" },
  { name: "Privacy Policy", href: "/#about" },
];

const icons = [
  { icon: <RiTwitterXLine />, link: "#" },
  { icon: <ImFacebook />, link: "#" },
  { icon: <FaLinkedinIn />, link: "#" },
];

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 useEffect(() => {
   setTimeout(() => {
     setMessage("");
   }, 5000);
 }, [message]);

  const handleSubscribe = async () => {
    if (!email) {
      return;
    }
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await Subscribe(email);
      if (res.status === "error") {
        setMessage(`❌ Email already exists.`);
      }
      if (res.status === "success") {
        setMessage("✅ Successfully subscribed to our newsletter.");
      }

      setEmail("");
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="py-4 md:py-16 px-8 md:px-28 bg-primaryBlue">
      <div className="w-full text-fontColor grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 border-b border-b-fontColor/30 pb-16">
        <div className="flex flex-col gap-8 ">
          <Link href="/">
            <Image src={whiteLogo} width={66} height={64} alt="White Logo" />
          </Link>
          <ul className="flex flex-col gap-2 text-sm ">
            <li>KG 263 Streets</li>
            <li>maisondeluxerw@gmail.com</li>
            <li>Kigali-Rwanda</li>
            <li>Tel:+250796890907</li>
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="text-[#FFD38B]">Quick Links</h1>
          <ul className="flex flex-col gap-2 text-fontColor">
            {QuickLinks.map((link, idx) => (
              <li key={idx} className="text-sm">
                <Link
                  href={link.href}
                  className="hover:text-primaryGreen hover:underline font-semibold duration-300 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 w-full sm:w-[300px]">
          <h1 className="text-[#FFD38B]">Subscribe</h1>
          <div className=" bg-white rounded-lg flex items-center justify-between overflow-hidden ">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Stay in the loop.."
              className="py-3 pl-3 w-full text-primaryBlue outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-400 p-3 hover:bg-blue-500 transition duration-300 cursor-pointer"
            >
              {loading ? (
                <FiLoader size={24} className="text-white" />
              ) : (
                <FaArrowRightLong size={24} className="text-white" />
              )}
            </button>
          </div>
          {message && (
            <div
              className={`${
                message.includes("Successfully")
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs `}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center pt-8 text-fontColor">
        <div>
          <div className="flex gap-4">
            {icons.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="text-white hover:text-primaryGreen transition duration-300 border border-white/30 hover:border-primaryGreen rounded-full p-2"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-sm text-white">
          © 2025 Maison De luxe. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
