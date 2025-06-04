"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Tamplate from "../../components/common/template";
import Image from "next/image";
import { MdFilterListAlt } from "react-icons/md";
import BookingForm from "../../components/model/paymentModel";
import { IoClose } from "react-icons/io5";
import { getRoomByTitle } from "../../utils/filters";
import { roomType, rules } from "../../costants";

const RoomsPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);
  const room = getRoomByTitle(name.replace(/-/g, " "));
  const [selectedImage, setSelectedImage] = useState(room.image);
  const [activeTab, setActiveTab] = useState("Room Description");
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

  return (
    <Tamplate>
      <>
        <div className="w-full h-screen bg-[#F5F5F5] text-black py-10 px-4 md:px-12 lg:px-24">
          {/* Title */}

          <div className="font-[Playfair_Display] bg-gradient-to-r from-secondaryBlue  to-primaryGreen  text-center  mb-10 bg-clip-text text-transparent font-semibold text-[min(10vw,48px)]">
            {room.title}
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            {/* Left: Image Slider */}
            <div className="relative flex-1  overflow-hidden">
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Room Image"
                  fill
                  className="w-full object-cover rounded-xl"
                />
              </div>

              <div className="absolute bottom-0 backdrop-blur-[2px] w-fit p-4 flex gap-4 mt-4 overflow-hidden justify-center lg:justify-start">
                {roomType.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(img.image)}
                    className={`border-1 ${
                      selectedImage === img.image
                        ? "border-primaryGreen/44 shadow-xs shadow-lime-600"
                        : "border-transparent"
                    } relative w-34 h-24 rounded-md overflow-hidden cursor-pointer transition`}
                  >
                    <Image src={img.image} alt={`Thumbnail ${idx}`} fill />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Description & Amenities */}
            <div className="flex-1  bg-gray-50 p-3 rounded-xl shadow">
              <div className="flex items-center justify-center space-x-4 mb-4 w-full bg-[#F5F5F5] p-2 rounded-md">
                {["Room Description", "Room Policies"].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item)}
                    className={`text-sm font-medium ${
                      activeTab === item
                        ? "bg-white rounded-md"
                        : "text-gray-400"
                    } hover:text-gray-800 cursor-pointer flex-1 text-center p-3 transition duration-300`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {activeTab === "Room Description" && (
                <div className="space-y-4 py-8">
                  <p className="text-gray-700 mb-4">
                    {roomType[0].description}
                  </p>

                  <h3 className="font-bold text-[#353535] text-lg mb-2">
                    Room Amenities
                  </h3>
                  <ul className="text-gray-700 space-y-2  list-inside">
                    {roomType[0].amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[#353535] font-normal"
                      >
                        <MdFilterListAlt />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className=" text-primaryBlue  border border-gray-400/50  text-center font-semibold px-6 py-3 rounded-xl transition">
                      Available Rooms ( {room.available} )
                    </div>
                    <button
                      onClick={openModal}
                      className=" text-primaryGreen  bg-primaryBlue/80 hover:bg-primaryBlue  font-semibold px-6 py-3 rounded-xl cursor-pointer transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Room Policies" && (
                <div className="overflow-x-auto text-sm text-gray-700">
                  <table className="min-w-full border rounded-lg border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b border-gray-200 font-semibold">
                          Policy
                        </th>
                        <th className="p-3 border-b border-gray-200 font-semibold">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules.map((rule, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="p-3 font-bold whitespace-nowrap">
                            {rule.label}
                          </td>
                          <td className="p-3">{rule.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
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
      </>
    </Tamplate>
  );
};

export default RoomsPage;
