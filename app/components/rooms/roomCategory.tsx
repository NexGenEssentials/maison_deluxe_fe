"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GoChevronDown } from "react-icons/go";
import Title from "../common/title";
import { roomType } from "@/app/costants";
import { FaPlay } from "react-icons/fa";
import { BsHeadsetVr } from "react-icons/bs";
import { HiOutlinePlay } from "react-icons/hi";

const RoomCategory = () => {
  const [room, setRoom] = useState("Room");
  const [price, setPrice] = useState("Highest Price");
  const [filter, setFilter] = useState("Filter");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roomType.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const roomCategory = roomType[currentIndex];

  return (
    <div className="bg-[#000B28] pt-16 gap-8 flex flex-col items-center ">
      <Title title={"Select a Room"} />

      <div className="flex items-center justify-between gap-4 text-nowrap text-white px-4 py-4 rounded-lg border border-[#18274F] bg-[#000D2F] w-full max-w-2xl mx-auto  ">
        {/* Room Dropdown */}
        <div className="flex items-center gap-2 w-full justify-center">
          <span className="text-sm text-gray-400">Sort By:</span>
          <button className="flex items-center font-bold uppercase gap-1 text-white text-sm">
            {room} <GoChevronDown size={14} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-[#18274F]" />

        {/* Price Dropdown */}
        <div className="flex items-center gap-2 w-full justify-center">
          <span className="text-sm text-gray-400">Sort By:</span>
          <button className="flex items-center font-bold uppercase gap-1 text-white text-sm">
            {price} <GoChevronDown size={14} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-[#18274F]" />

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full justify-center">
          <button className="flex items-center font-bold uppercase gap-1 text-white text-sm">
            {filter} <GoChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="flex pl-12 py-12 w-full mb-12 items-center text-white overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center items-start px-20 relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-[1px] bg-white rounded-full">
            <div
              className="absolute -left-1 h-1/4 transition duration-500   w-[2px] px-1 bg-[#7D9F43] rounded-full"
              style={{
                top: `${(20 * currentIndex) % 100}%`,
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className=" font-bold mb-4 flex gap-4">
              <Title title={`0${roomCategory.id}  ${roomCategory.title}`} />
            </h2>
            <p className="mb-4 text-base font-normal max-w-md leading-relaxed text-gray-300">
              {roomCategory.description}
            </p>
            <div className="py-2 px-4 bg-primaryGreen/20 w-fit rounded-md mb-4">
              Available Room(s) :{" "}
              <span className=" font-bold">{roomCategory.available}</span>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-white mb-2 text-xl">Amneties</h4>
              <ul className="list-disc font-normal pl-8 space-y-2">
                {roomCategory.amenities.map((item, idx) => (
                  <li key={idx} className="text-gray-200">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4 mt-4">
              <div className="p-3 font-semibold rounded-md bg-white/10 backdrop-blur-sm flex items-center gap-2 w-fit text-primaryGreen cursor-pointer hover:bg-white/20  transition">
                <HiOutlinePlay size={20} /> Take A Tour
              </div>
              <button className="bg-[#C6F123] text-black px-6 py-3 rounded-lg font-bold hover:bg-lime-400 transition">
                Reserve room
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-full relative">
          <div className="h-[550px] w-full overflow-hidden">
            <Image
              src={roomCategory.image}
              alt={roomCategory.title}
              height={400}
              width={400}
              className="w-full h-full object-cover object-center rounded-l-3xl"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2  flex space-x-4 items-center">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? (prev - 1) % roomType.length : 1
                )
              }
              className="w-8 h-8 rounded-full bg-black/50 text-white hover:bg-primaryGreen/70 cursor-pointer"
            >
              ❮
            </button>
            <div className="w-32 h-12 bg-black/50 rounded-full flex items-center justify-center text-white">
              <BsHeadsetVr size={30} />
            </div>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < roomType.length
                    ? (prev + 1) % roomType.length
                    : roomType.length
                )
              }
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-primaryGreen/70 cursor-pointer text-white"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCategory;
