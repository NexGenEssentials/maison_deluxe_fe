"use client";

import React, { use, useEffect, useRef, useState } from "react";
import Template from "../../components/common/template";
import { MdFilterListAlt } from "react-icons/md";
import BookingForm from "../../components/model/paymentModel";
import { IoClose } from "react-icons/io5";
import { RoomType } from "@/app/types/rooms";
import { getRoomByIdAPI } from "@/app/api/roomtype/action";
import Loader from "@/app/components/common/loader";
import { rules } from "@/app/costants";
import CenterModal from "@/app/components/model/centerModel";
import CheckAvailabilityModel from "@/app/components/model/checkAvailabilityModel";
import { useAppContext } from "@/app/context";

const RoomsPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "Room Description" | "Room Policies"
  >("Room Description");
  const [openModal, setOpenModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(true);
  const { setActiveModalId } = useAppContext();

  const openBookingModal = () => {
    setOpenModal(true);
    setTimeout(() => setAnimateModal(true), 10);
  };

  const closeBookingModal = () => {
    setAnimateModal(false);
    setTimeout(() => setOpenModal(false), 300);
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeBookingModal();
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  // Fetch room data
  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const result = await getRoomByIdAPI(id);
        if (result.status === 200) {
          setRoom(result.data);
          setSelectedImage(result.data?.images?.[0]?.image || "");
        }
      } catch (error) {
        console.error("Failed to fetch room:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(id)) {
      fetchRoom();
    }
  }, [id]);

  if (loading || !room)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader />
      </div>
    );

  return (
    <Template>
      <div className="w-full bg-[#F5F5F5] text-black py-10 px-4 md:px-12 lg:px-24">
        {/* Title */}
        <div className="font-[Playfair_Display] bg-gradient-to-r from-secondaryBlue to-primaryGreen text-center mb-10 bg-clip-text text-transparent font-semibold text-[min(10vw,48px)]">
          {room.name}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          {/* Left: Image Section */}
          <div className="relative flex-1 h-full">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected Room"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="absolute bottom-0 p-4 flex gap-4 overflow-x-auto h-24">
              {room.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.image}
                  alt={`Room thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img.image)}
                  className={`h-20 w-24 object-cover rounded-md cursor-pointer border transition ${
                    selectedImage === img.image
                      ? "border-primaryGreen shadow-md"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Description or Policies */}
          <div className="flex-1  bg-gray-50 p-4 rounded-xl shadow">
            <div className="flex items-center justify-center gap-2 mb-4 w-full bg-[#F5F5F5] p-2 rounded-md">
              {["Room Description", "Room Policies"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`text-sm font-medium flex-1 text-center p-3 rounded-md transition ${
                    activeTab === tab
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Room Description" ? (
              <div className="space-y-4">
                <p className="text-gray-700">{room.description}</p>
                <h3 className="font-bold text-[#353535] text-lg">
                  Room Amenities
                </h3>
                <ul className="text-gray-700 space-y-2 list-inside">
                  <li className="flex items-center gap-2">
                    <MdFilterListAlt />
                    {room.amenities}
                  </li>
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div
                    onClick={() => setActiveModalId("check-room-availability")}
                    className="text-primaryBlue border border-gray-400/50 text-center font-semibold px-6 py-3 rounded-xl"
                  >
                    Check Room Availability
                  </div>
                  <button
                    onClick={openBookingModal}
                    className="text-white bg-primaryBlue hover:bg-primaryBlue/90 font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto text-sm text-gray-700">
                <table className="min-w-full border rounded-lg border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3 border-b font-semibold">Policy</th>
                      <th className="p-3 border-b font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules.map((rule, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3 font-bold">{rule.label}</td>
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

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-primaryBlue/50 flex justify-end z-50">
          <div
            className={`transform transition-all duration-300 ease-in-out ${
              animateModal
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 h-full overflow-y-auto`}
          >
            <div
              ref={modalRef}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="text-xl font-semibold">Booking Form</h2>
              <button
                onClick={closeBookingModal}
                className="text-red-500 font-bold px-2 py-2 rounded"
              >
                <IoClose size={20} />
              </button>
            </div>
            <BookingForm />
          </div>
        </div>
      )}
      <CenterModal
        children={<CheckAvailabilityModel Id={room.id} />}
        id={"check-room-availability"}
      />
    </Template>
  );
};

export default RoomsPage;
