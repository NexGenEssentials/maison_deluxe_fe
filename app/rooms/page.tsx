"use client";
import React, { useEffect, useRef, useState } from "react";
import Tamplate from "../components/common/template";
import { useRouter } from "next/navigation";
import { getRoomByTitle } from "../utils/filters";
import { IoClose } from "react-icons/io5";
import BookingForm from "../components/model/paymentModel";
import { getAllRoomTypeAPI } from "../api/roomtype/action";
import Loader from "../components/common/loader";
import { RoomType } from "../types/rooms";
import { useAppContext } from "../context";
import CenterModal from "../components/model/centerModel";
import CheckAvailabilityModel from "../components/model/checkAvailabilityModel";
import RightModal from "../components/model/rightSideModel";

const RoomCategory = () => {
  const router = useRouter();
  const [active, setActive] = useState<number>(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedPeopleMap, setSelectedPeopleMap] = useState<{
    [roomId: number]: number;
  }>({});

  const [roomType, setRoomType] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const { setActiveModalId } = useAppContext();

  useEffect(() => {
    handleGetRoomType();
  }, []);

  const handleGetRoomType = async () => {
    try {
      const result = await getAllRoomTypeAPI();
      if (result.status === 200) {
        setRoomType(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = (name: string) => {
    const room = getRoomByTitle(name, roomType);
    if (!room) {
      console.error(`Room with title "${name}" not found`);
      return;
    }
    setSelectedRoom(room);
  };

  const handleBooking = (room: number) => {
    router.push(`/rooms/${room}/`);
  };

  return (
    <Tamplate>
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 px-4 md:px-12 py-10">
        <div className="w-full lg:w1/2 xl:w-3/4 bg-[#F5F5F5] text-black  ">
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
          <div className="px-4 md:px-12 ">
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
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 gap-6 py-10 px-4 md:px-12 ">
              {roomType.map((room) => (
                <div
                  key={room.id}
                  className="flex max-xl:flex-wrap items-center justify-center px-4 w-full bg-gray-100 shadow-lg rounded-lg cursor-pointer duration-300 transition hover:bg-gray-50 hover:shadow-2xl"
                >
                  <div className="w-full min-w-[200px] xl:max-w-sm h-64">
                    <img
                      src={room.images[0]?.image}
                      alt={room.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4 ">
                    <div className="flex justify-between items-center text-4xl">
                      <div className="flex items-start flex-wrap justify-between w-full">
                        <h3 className=" font-semibold bg-gradient-to-r from-primaryBlue -from-10% to-primaryRed to-60% mb-2  bg-clip-text text-transparent font-[Playfair Display]">
                          {room.name}
                        </h3>
                        <button className="border border-primaryBlue p-3 rounded-lg  font-normal text-sm text-primaryBlue  transition-colors">
                          Only {room.units} left
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{room.description}</p>
                    <p className="max-lg:hidden text-gray-500 mb-4">
                      <span className="font-bold text-primaryBlue">Price:</span>{" "}
                      ${room.price}
                    </p>
                    <p className="lg:hidden text-gray-500 mb-4">
                      <span className="font-bold text-primaryBlue">Price:</span>{" "}
                      $
                      {(selectedRoom && (selectedPeopleMap[selectedRoom.id] || 1)) === 0
                        ? room.price
                        : selectedRoom ? Number(room.price) * (selectedPeopleMap[selectedRoom.id] || 1) : room.price}
                    </p>
                    <div className="flex items-end gap-4 justify-between w-full">
                      <button
                        onClick={() => handleBooking(room.id)}
                        className="max-lg:hidden px-4 w-1/2 xl:1/4 py-3 cursor-pointer bg-[#a80024]/80 hover:bg-[#a80024] font-semibold text-white rounded-lg transition-colors"
                      >
                        view details
                      </button>
                      <button
                        onClick={() => {
                          setActiveModalId("booking");
                          setActive(2);
                        }}
                        className="lg:hidden px-4 w-1/2 xl:1/4 py-3 cursor-pointer bg-[#a80024]/80 hover:bg-[#a80024] font-semibold text-white rounded-lg transition-colors"
                      >
                        Book Now
                      </button>
                      <div className="flex flex-col items-center gap-2">
                        <label htmlFor="" className="text-xs font-semibold">
                          People
                        </label>

                        <select
                          className="w-32 border rounded-md p-2"
                          value={selectedPeopleMap[room.id] || 0}
                          onChange={(e) => {
                              handleRoomSelect(room.name);
                            const people = Number(e.target.value);
                            setSelectedPeopleMap((prev) => ({
                              ...prev,
                              [room.id]: people,
                            }));
                          }}
                        >
                          <option value={0}>Select People</option>
                          {[...Array(room.capacity)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1} Person{index > 0 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-lg:hidden sticky top-[150px] right-0 h-[80vh] lg:w-1/2 xl:w-1/4 bg-[#F9F9F9] text-black py-10 px-4 md:px-12 ">
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
                {selectedRoom.name}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {selectedRoom.description}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {/* {selectedRoom.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                  ))} */}
                <li>{selectedRoom.amenities}</li>
              </ul>
              <p className="text-gray-800 mb-4">
                <span className="font-bold text-3xl">
                  Amount: ${Number(selectedRoom.price) * (selectedRoom && (selectedPeopleMap[selectedRoom.id] || 1))}
                </span>
              </p>
              <div
                onClick={() => setActiveModalId("check-room-availability")}
                className="text-primaryBlue border border-gray-400/50 text-center font-semibold px-6 py-3 rounded-xl"
              >
                Check Room Availability
              </div>

              <button
                onClick={() => {
                  setActiveModalId("booking");
                  setActive(2);
                }}
                className="w-full bg-[#a80024]/80 hover:bg-[#a80024] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Booking */}
      <RightModal
        children={selectedRoom && <BookingForm room={selectedRoom} />}
        id={"booking"}
      />
      <CenterModal
        children={<CheckAvailabilityModel Id={selectedRoom?.id ?? 1} />}
        id={"check-room-availability"}
      />
    </Tamplate>
  );
};

export default RoomCategory;
