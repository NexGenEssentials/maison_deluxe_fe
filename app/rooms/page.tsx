"use client";
import React, { useEffect, useRef, useState } from "react";
import Tamplate from "../components/common/template";
import { roomType } from "../costants";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { getRoomByTitle } from "../utils/filters";
import { IoClose } from "react-icons/io5";
import BookingForm from "../components/model/paymentModel";

type RoomType = {
  id: number;
  title: string;
  description: string;
  amenities: string[];
  available: number;
  image: StaticImageData;
  price: number;
};

 const RoomCategory = () => {
  const router = useRouter();
  const [active, setActive] = useState<number>(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number>(1);
  const [openModel, setOpenModel] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [animateModal, setAnimateModal] = useState(false);

  const openModal = () => {
    setOpenModel(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setOpenModel(false), 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (openModel) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRoomSelect = (name: string) => {
    const room = getRoomByTitle(name);
    if (!room) {
      console.error(`Room with title "${name}" not found`);
      return;
    }
    setSelectedRoom(room);
  };

  const handleBooking = (room: string) => {
    router.push(`/rooms/${room.replace(/\s+/g, "-").toLowerCase()}`);
  };

  return (
    <Tamplate>
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 px-4 md:px-12 py-10">
        <div className="w-3/4 bg-[#F5F5F5] text-black  ">
          <div className="flex justify-between items-center mb-6 bg-[#E6EBFF]">
            <div
              className={` ${
                active === 1
                  ? "bg-[#36416F] text-white"
                  : "bg-[#E6EBFF] text-primaryGrey/50"
              } flex gap-4  items-center justify-center w-full py-4 rounded-e-2xl `}
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 25px) 0, 100% 50%, calc(100% - 25px) 100%, 0 100%)",
              }}
            >
              <span
                className={`h-4 w-4 p-3 font-bold rounded-full flex items-center justify-center ${
                  active === 1
                    ? "bg-white text-[#36416F]"
                    : "text-white/60  bg-[#c2c4ce]"
                }`}
              >
                1
              </span>
              <span>Choose Room</span>
            </div>
            <div
              className={` ${
                active === 2
                  ? "bg-[#36416F] text-white"
                  : "bg-[#E6EBFF] text-primaryGrey/50"
              } flex gap-4  w-full items-center justify-center py-4`}
            >
              <span
                className={`h-4 w-4 p-3 font-bold rounded-full flex items-center justify-center ${
                  active === 2
                    ? "bg-white text-[#36416F]"
                    : "text-white/60  bg-[#c2c4ce]"
                }`}
              >
                2
              </span>
              <span>Check out </span>
            </div>
          </div>
          {/* Title */}
          <div className=" px-4 md:px-12 ">
            <div className="font-[Playfair_Display]  bg-gradient-to-r from-primaryBlue -from-10% to-primaryRed to-60%   bg-clip-text text-transparent font-semibold text-[min(10vw,48px)]">
              Room Categories
            </div>
            <p className="mt-4 text-sm text-gray-700">
              Our rooms combine comfort and style, offering modern amenities,
              elegant design, and warm service to ensure a relaxing and
              memorable stay.
            </p>
          </div>
          {/* Room Categories */}
          <div className="grid grid-cols-1 gap-6 py-10 px-4 md:px-12 ">
            {roomType.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-center px-4 w-full bg-gray-100 shadow-lg rounded-lg cursor-pointer duration-300 transition hover:bg-gray-50 hover:shadow-2xl"
              >
                <div className="w-full max-w-sm h-64">
                  <Image
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <div className="p-6 space-y-4 ">
                  <div className="flex justify-between items-center text-4xl">
                    <div className="flex items-start justify-between w-full">
                      <h3 className=" font-semibold bg-gradient-to-r from-primaryBlue -from-10% to-primaryRed to-60% mb-2  bg-clip-text text-transparent font-[Playfair Display]">
                        {room.title}
                      </h3>
                      <button className="bg-[#587AFF] p-3 rounded-lg cursor-none font-normal text-sm text-white  transition-colors">
                        Only {room.available} left
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <p className="text-gray-500 mb-4">
                    <span className="font-bold text-primaryBlue">Price:</span> $
                    {room.price}
                  </p>
                  <div className="flex items-start justify-between w-full">
                    <button
                      onClick={() => handleBooking(room.title)}
                      className="px-4 w-3/4 py-3 cursor-pointer bg-[#A6FF00] hover:bg-lime-500 font-semibold text-primaryBlue rounded-lg transition-colors"
                    >
                      view details
                    </button>
                    <select
                      onChange={(e) => {
                        handleRoomSelect(room.title);
                        setSelectedPeople(Number(e.target.value));
                      }}
                      value={selectedPeople}
                      className=" w-32 text-center px-2 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                      defaultValue="1"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" sticky top-[150px] right-0 h-[80vh]  w-1/4 bg-[#F9F9F9] text-black py-10 px-4 md:px-12 ">
          {!selectedRoom ? (
            <div className="text-center">
              <button className="hover:bg-gray-300  cursor-pointer w-full rounded-lg py-4 bg-[#E2E2E2] text-base font-bold mb-6">
                Book Now
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>
              <h2 className="text-xl font-semibold mb-4">
                {selectedRoom.title}
              </h2>
              <p className="text-gray-600 mb-4">{selectedRoom.description}</p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {selectedRoom.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
              <p className="text-gray-800 mb-4">
                <span className="font-bold text-3xl">
                  Amount: ${selectedRoom.price * selectedPeople}
                </span>
              </p>
              <button
                onClick={() => {
                  openModal();
                  setActive(2);
                }}
                className="w-full bg-[#A6FF00] hover:bg-lime-500 text-primaryBlue font-semibold py-3 rounded-lg transition-colors"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal for Booking */}
      {openModel && (
        <div className="fixed inset-0 bg-primaryBlue/50 flex justify-end z-50 transition-opacity duration-300">
          <div
            className={`transform transition-all duration-300 ease-in-out
              ${
                animateModal
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }
              bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 h-full overflow-y-auto`}
          >
            <div
              ref={modalRef}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="text-xl font-semibold">Booking Form</h2>
              <button
                onClick={closeModal}
                className="text-red-500 font-bold px-2 py-2 rounded"
              >
                <IoClose size={20} />
              </button>
            </div>
            <BookingForm />
          </div>
        </div>
      )}
    </Tamplate>
  );
};

export default RoomCategory;
