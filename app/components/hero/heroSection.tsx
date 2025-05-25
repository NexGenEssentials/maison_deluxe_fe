"use client";

import React, { useState } from "react";
import { HiChevronDown, HiOutlinePlay } from "react-icons/hi";
import FeatureBranch from "./branch";
import { FaCalendarAlt } from "react-icons/fa";

const HeroSection = () => {
  const [checkIn, setCheckIn] = useState("2025-05-19");
  const [checkOut, setCheckOut] = useState("2025-05-20");
  const [people, setPeople] = useState("1 Person");
  const [roomType, setRoomType] = useState("Deluxe");
  const [openModle, setOpenModle] = useState(false);

  const handleBooking = () => {
  console.log(
      `Booking Info:\nCheck In: ${checkIn}\nCheck Out: ${checkOut}\nPeople: ${people}\nRoom Type: ${roomType}`
    );
    // You can replace alert with actual API call logic
  };

  return (
    <div className=" relative flex max-lg:h-[70vh]  text-white lg:px-4 max-w-[1560px] mx-auto ">
      <div
        className="max-lg:border-none w-full flex items-end justify-between lg:gap-10 lg:px-10 md:pb-16  lg:pb-32 rounded-lg"
        // style={{
        //   borderLeft: "1px solid",
        //   borderRight: "1px solid",
        //   borderBottom: "1px solid",
        //   borderImage:
        //     "linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent) 1",
        //   borderImageSlice: 1,
        //   borderRadius: "10px 10px",
        // }}
      >
        <div className="w-full lg:max-w-[75%] flex flex-col space-y-10">
          <h1 className="font-[Playfair_Display] font-semibold text-[min(8vw,48px)] max-lg:text-center leading-tight">
            Experience{" "}
            <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Kigali with
            </span>{" "}
            Comfort, Style, and Authentic Rwandan Hospitality.
          </h1>
          <p className="text-base font-light max-lg:text-center">
            Embrace the warmth of Rwanda in a luxurious setting. Maison De Luxe
            is where tradition meets sophistication in the heart of Kigali.
          </p>
          <div className="flex justify-between items-center text-nowrap flex-wrap gap-4 w-3/4 mx-auto">
            <div
              onClick={() => setOpenModle(true)}
              className="p-3 font-semibold rounded-md bg-white/10 backdrop-blur-sm flex items-center gap-2 w-fit text-primaryGreen cursor-pointer hover:bg-white/20  transition"
            >
              <HiOutlinePlay size={20} /> Take A Tour
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
                    className="absolute top-4 right-4 text-white text-2xl z-10"
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

      <div className="max-lg:hidden absolute z-20 right-0 left-0 -bottom-12 w-full max-w-[1300px] mx-auto backdrop-blur-md bg-white/5 border-t border-primaryGreen/30 rounded-2xl p-6 flex items-center justify-between gap-8 shadow-lg">
        {/* Input Group */}
        <div className="flex items-center gap-8 flex-grow justify-between text-white">
          {/* Check In */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">CHECK IN</span>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div className="w-px h-12 bg-white/20"></div>

          {/* Check Out */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">CHECK OUT</span>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div className="w-px h-12 bg-white/20"></div>

          {/* No of People */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">No of People</span>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <select
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="bg-transparent text-white outline-none"
              >
                <option className="text-black">1 Person</option>
                <option className="text-black">2 People</option>
                <option className="text-black">3 People</option>
                <option className="text-black">4+ People</option>
              </select>
            </div>
          </div>

          <div className="w-px h-12 bg-white/20"></div>

          {/* Room Type */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-semibold">Room Type</span>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent text-white outline-none"
              >
                <option className="text-black">Deluxe</option>
                <option className="text-black">Standard</option>
                <option className="text-black">Suite</option>
              </select>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          className="bg-white/10 text-lime-400 font-semibold px-6 py-3 rounded-xl hover:bg-black/20 cursor-pointer transition backdrop-blur-sm"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
