"use client";
import React from "react";
import Tamplate from "../components/common/template";
import { roomType } from "../costants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RoomCategory = () => {
  const router = useRouter();
  const handleBooking = (room: string) => {
    router.push(`/rooms/${room.replace(/\s+/g, "-").toLowerCase()}`);
  };
  return (
    <Tamplate>
      <div className="w-full bg-[#F5F5F5] text-black py-10 px-4 md:px-12 lg:px-24">
        {/* Title */}
        <div className=" mb-10 text-center">
          <div className="font-[Playfair_Display] bg-gradient-to-r from-secondaryBlue  to-primaryGreen  text-center  bg-clip-text text-transparent font-semibold text-[min(10vw,48px)]">
            Room Category
          </div>
          <p className="mt-4 text-sm text-gray-700">
            Our rooms combine comfort and style, offering modern amenities,
            elegant design, and warm service to ensure a relaxing and memorable
            stay.
          </p>
        </div>
        {/* Room Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomType.map((room) => (
            <div
              onClick={() => handleBooking(room.title)}
              key={room.id}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden cursor-pointer duration-300 transition hover:bg-gray-50 hover:shadow-2xl"
            >
              <div className="h-64">
                <Image
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4 ">
                <div className="flex justify-between items-center text-4xl">
                  <h3 className=" font-semibold bg-gradient-to-r from-primaryBlue -from-10% to-primaryRed mb-2 to-60% bg-clip-text text-transparent font-[Playfair Display]">
                    {room.title}
                  </h3>
                  <p className="text-gray-500 mb-4">${room.price}</p>
                </div>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <button className="px-4 w-full py-3 cursor-pointer bg-[#A6FF00] hover:bg-lime-500 font-semibold text-primaryBlue rounded-lg transition-colors">
                  view room details
                </button>
                <button className="px-4 w-full py-3 border cursor-none font-semibold text-primaryBlue rounded-lg transition-colors">
                  Available rooms: {room.available}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Tamplate>
  );
};

export default RoomCategory;
