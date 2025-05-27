"use client";

import React, { useState } from "react";
import { HiChevronDown, HiOutlinePlay } from "react-icons/hi";

import FeatureBranch from "./branch";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [checkOut, setCheckOut] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [people, setPeople] = useState("1 Person");
  const [roomType, setRoomType] = useState("Deluxe");
  const [openModle, setOpenModle] = useState(false);

  const router = useRouter();

  const handleBooking = () => {
    router.push("/rooms");
  };

  return (
    <div className="relative flex h-full  text-white lg:px-4">
      <div
        className="w-full flex items-end justify-between rounded-lg 
             lg:border-l lg:border-r lg:border-b 
             lg:border-white/30 
             lg:border-b-transparent 
             lg:gap-10 lg:px-10  lg:pb-32"
        style={{
          borderImage:
            "linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent) 1",
          borderImageSlice: 1,
        }}
      >
        <div className="w-full lg:max-w-[80%] flex flex-col space-y-10">
          <h1 className="font-[Playfair_Display] font-semibold text-[min(8vw,48px)] max-lg:text-center leading-tight">
            Indulge{" "}
            <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              in the Essence of Kigali
            </span>{" "}
            Luxury, Culture, and Warm Rwandan Hospitality Await.
          </h1>
          <p className="text-base font-light max-lg:text-center">
            Discover serenity in the heart of Kigali. Maison De Luxe blends
            contemporary comfort with timeless Rwandan charm,
            <b>Your Home Away from Home</b>
          </p>
          <div className="flex justify-between items-center text-nowrap flex-wrap gap-4 w-3/4 mx-auto">
            <div
              onClick={() => setOpenModle(true)}
              className="p-3 font-semibold rounded-md bg-white/10 backdrop-blur-sm flex items-center gap-2 w-fit text-primaryGreen cursor-pointer hover:bg-white/20  transition"
            >
              <HiOutlinePlay size={20} /> Go Luxe
            </div>
            {openModle && (
              <div
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                onClick={() => setOpenModle(false)}
              >
                <div
                  className="w-full max-w-8xl h-[90vh] bg-black rounded-lg overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 text-white cursor-pointer font-bold text-3xl shadow-2xl z-10"
                    onClick={() => setOpenModle(false)}
                  >
                    &times;
                  </button>

                  <iframe
                    title="Matterport Hotel Tour"
                    src="https://my.matterport.com/show/?m=wBEFkyJTUnW&play=1&qs=1&ts=1"
                    width="100%"
                    height="100%"
                    allow="fullscreen"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
            )}

            <button
              onClick={handleBooking}
              className="lg:hidden bg-primaryGreen text-primaryBlue font-semibold px-6 py-3 rounded-lg hover:bg-primaryGreen/70 cursor-pointer transition backdrop-blur-sm"
            >
              Reserve Now
            </button>
          </div>
        </div>

        <FeatureBranch />
      </div>

      <div className="max-lg:hidden absolute z-20 right-0 left-0 bottom-0 xl:-bottom-12 w-full max-w-[1300px] mx-auto backdrop-blur-md bg-white/5 border-t border-primaryGreen/30 rounded-2xl p-6 flex items-center justify-between gap-8 shadow-lg">
        {/* Input Group */}
        <div className="flex items-center gap-8 flex-grow justify-between text-white">
          {/* Check In */}
          <div className="flex flex-col space-y-1 w-1/3">
            <span className="text-sm font-semibold">CHECK IN</span>
            <div
              className="flex items-center justify-between gap-2 text-sm text-gray-300 border-b border-white/20 
             hover:border-lime-400 rounded"
            >
              <input
                type="date"
                id="custom-date"
                onClick={() =>
                  (
                    document.getElementById("custom-date") as HTMLInputElement
                  )?.showPicker?.()
                }
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent p-2 text-white outline-none w-full  focus:border-lime-400  cursor-pointer transition 
             [&::-webkit-calendar-picker-indicator]:opacity-0 
               [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <FaCalendarAlt
                onClick={() =>
                  (
                    document.getElementById("custom-date") as HTMLInputElement
                  )?.showPicker?.()
                }
                className="transform  text-lime-400 cursor-pointer pointer-events-auto"
                size={16}
              />
            </div>
          </div>

          <div className="w-px h-12 bg-white/20"></div>

          {/* Check Out */}
          <div className="flex flex-col space-y-1 w-1/3">
            <span className="text-sm font-semibold">CHECK OUT</span>

            <div
              className="flex items-center justify-between gap-2 text-sm text-gray-300 border-b border-white/20 
             hover:border-lime-400 rounded"
            >
              <input
                type="date"
                id="custom-date2"
                value={checkOut}
                onClick={() =>
                  (
                    document.getElementById("custom-date2") as HTMLInputElement
                  )?.showPicker?.()
                }
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent p-2 text-white outline-none w-full  focus:border-lime-400  cursor-pointer transition 
             [&::-webkit-calendar-picker-indicator]:opacity-0 
               [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <FaCalendarAlt
                onClick={() =>
                  (
                    document.getElementById("custom-date2") as HTMLInputElement
                  )?.showPicker?.()
                }
                className="transform  text-lime-400 cursor-pointer pointer-events-auto"
                size={16}
              />
            </div>
          </div>

          <div className="w-px h-12 bg-white/20"></div>

          {/* No of People */}
          <div className="flex flex-col space-y-1 w-1/3">
            <span className="text-sm font-semibold">No of People</span>
            <div className="flex items-center gap-1 text-sm text-gray-300 border-b border-white/20  hover:border-lime-400 rounded cursor-pointer focus:border-lime-400">
              <select
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className=" bg-transparent appearance-none p-2 text-white  outline-none w-full  transition"
              >
                <option className="text-black">1 Person</option>
                <option className="text-black">2 People</option>
                <option className="text-black">3 People</option>
                <option className="text-black">4+ People</option>
              </select>
              <HiChevronDown
                size={18}
                className=" text-primaryGreen pointer-events-none"
              />
            </div>
          </div>

          <div className="w-px h-12 bg-white/20"></div>

          {/* Room Type */}
          <div className="flex flex-col space-y-1 w-1/3">
            <span className="text-sm font-semibold">Room Type</span>
            <div className="flex items-center gap-1 text-sm text-gray-300 border-b border-white/20  hover:border-lime-400 rounded cursor-pointer focus:border-lime-400">
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent appearance-none p-2 text-white outline-none w-full  transition"
              >
                <option className="text-black">Penthouse Suite</option>
                <option className="text-black">Executive Room</option>
                <option className="text-black">Junior Suit</option>
                <option className="text-black">Deluxe Room</option>
                <option className="text-black">Standard Double Room</option>
              </select>
              <HiChevronDown
                size={18}
                className=" text-primaryGreen pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Book Button */}
        <Link href="/rooms" className="flex-shrink-0">
          <button
            onClick={handleBooking}
            className=" bg-primaryGreen text-primaryBlue hover:bg-primaryGreen/70 font-semibold px-6 py-3 rounded-xl cursor-pointer transition backdrop-blur-sm"
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
