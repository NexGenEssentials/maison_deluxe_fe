"use client";

import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import Title from "../common/title";
import { roomType } from "@/app/costants";
import { FaPlay } from "react-icons/fa";
import { BsHeadsetVr } from "react-icons/bs";
import { HiOutlinePlay } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Keyboard } from "swiper/modules";
import { MdFilterListAlt } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RoomCategory = () => {
  const [room, setRoom] = useState("Room");
  const [price, setPrice] = useState("Price");
  const [filter, setFilter] = useState("Amenities");
  const [isHovered, setIsHovered] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openModle, setOpenModle] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roomType.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const roomCategory = roomType[currentIndex];

  const router = useRouter();

  const handleBooking = () => {
    // if (room === "Room") {
    router.push(
      `/rooms/${roomCategory.title.replace(/\s+/g, "-").toLowerCase()}`
    );
    // } else {
    //   router.push(`/rooms/${room.replace(/\s+/g, "-").toLowerCase()}`);
    // }
  };
  return (
    <>
      <div
        id={"rooms"}
        className="bg-[#000B28] pt-16 gap-8 hidden lg:flex flex-col items-center "
      >
        <Title title={"Select a Room"} />

        <div className="flex items-center justify-between gap-4 text-nowrap text-white px-4 py-4 rounded-lg border border-[#18274F] bg-[#000D2F] w-full max-w-4xl mx-auto  ">
          {/* Room Dropdown */}
          <div className="flex items-center gap-2 w-full justify-center">
            <span className="text-sm text-gray-400">Sort By:</span>

            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="bg-transparent appearance-none p-2 text-white font-bold outline-none w-full  transition"
            >
              <option disabled className="text-black">
                Room
              </option>
              <option className="text-black">Penthouse Suite</option>
              <option className="text-black">Executive Room</option>
              <option className="text-black">Junior Suit</option>
              <option className="text-black">Deluxe Room</option>
              <option className="text-black">Standard Double Room</option>
            </select>
            <GoChevronDown
              size={18}
              className=" text-white pointer-events-none"
            />
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-[#18274F]" />

          {/* Price Dropdown */}
          <div className="flex items-center gap-2 w-full justify-center">
            <span className="text-sm text-gray-400">Sort By:</span>

            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-transparent appearance-none p-2 text-white font-bold outline-none w-full  transition"
            >
              <option disabled className="text-black">
                Price
              </option>
              <option className="text-black">Highest Price</option>
              <option className="text-black">Lowest Price</option>
            </select>
            <GoChevronDown
              size={18}
              className=" text-white pointer-events-none"
            />
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-[#18274F]" />

          {/* Filter Dropdown */}

          <div className="flex items-center gap-2 w-full justify-center">
            <span className="text-sm text-gray-400">Filter By:</span>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent appearance-none p-2 text-white font-bold outline-none w-full  transition"
            >
              <option disabled className="text-black">
                Amenities
              </option>
              <option className="text-black">Rooftop Access</option>
              <option className="text-black">Bed sizes</option>
              <option className="text-black">Bar Access</option>
              <option className="text-black">City View Access</option>
            </select>
            <GoChevronDown
              size={18}
              className=" text-white pointer-events-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-12 py-12 w-full  mb-12 items-center text-white overflow-hidden">
          {/* Left Section */}
          <div className="w-full flex flex-col justify-center items-start px-20 relative">
            <div className=" absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-[1px] bg-white rounded-full">
              <div
                className="absolute -left-1 h-1/4 transition duration-500 w-[2px] px-1 bg-[#7D9F43] rounded-full"
                style={{
                  top: `${(20 * currentIndex) % 100}%`,
                }}
              />
            </div>

            <div
              className={` transition-all duration-500 ease-in-out ${
                isTransitioning
                  ? "opacity-0 translate-y-10"
                  : "opacity-100 translate-y-0"
              }`}
              key={roomCategory.id}
            >
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
                <h4 className="font-bold text-white mb-2 text-xl">
                  {" "}
                  Amenities
                </h4>
                <ul className="list-disc font-normal pl-8 space-y-2">
                  {roomCategory.amenities.map((item, idx) => (
                    <li key={idx} className="text-gray-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4 mt-4">
                {/* <div className="p-3 font-semibold rounded-md bg-white/10 backdrop-blur-sm flex items-center gap-2 w-fit text-primaryGreen cursor-pointer hover:bg-white/20  transition">
                  <HiOutlinePlay size={20} /> Take A Tour
                </div> */}

                <button
                  onClick={handleBooking}
                  className="bg-[#C6F123] text-black px-6 py-3 rounded-lg font-bold hover:bg-lime-400 transition"
                >
                  Reserve room
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-full relative"
          >
            <div
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning
                  ? "opacity-0 translate-y-10"
                  : "opacity-100 translate-y-0"
              }`}
              key={roomCategory.id}
            >
              <div className="h-[550px] w-full overflow-hidden">
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

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  flex space-x-4 justify-center h-1/6 items-center  w-full ">
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

      <div id={"rooms"} className="lg:hidden gap-8 flex flex-col items-center ">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          keyboard={{
            enabled: true,
          }}
          loop={true}
          speed={1000}
          freeMode={true}
          grabCursor={true}
          centeredSlides={true}
          modules={[Keyboard]}
          className="mySwiper w-full "
        >
          {roomType.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full rounded-lg overflow-visible ">
                <div>
                  <img
                    src={slide.image.src}
                    alt={slide.title}
                    className="w-full h-96 object-cover "
                  />
                </div>
                {/* content section */}
                <div className="-mt-9 bg-gradient-to-t from-[#3F31FF] from-[-50%] to-primaryBlue to-50% w-full rounded-t-[40px] flex items-end justify-between z-10 relative">
                  <div className="  w-full flex gap-8 flex-col justify-between px-2 md:px-12 py-8">
                    <div className=" space-y-4 text-center">
                      <Title title={`0${slide.id}  ${slide.title}`} />

                      <p className="text-sm text-gray-200 line-clamp-2">
                        {slide.description}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primaryGreen to-transparent block rounded" />

                    <div className="mb-4">
                      <h4 className="font-bold text-white mb-2 text-xl">
                        {" "}
                        Amenities
                      </h4>
                      <ul className=" font-normal pl-8 space-y-3">
                        {slide.amenities.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-gray-200 text-sm font-bold flex gap-1 items-center"
                          >
                            <MdFilterListAlt /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        onClick={() => setOpenModle(true)}
                        className="p-3 font-semibold rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center gap-2 text-center text-primaryGreen cursor-pointer hover:bg-white/20 transition"
                      >
                        <HiOutlinePlay size={20} /> Take A Tour
                      </div>

                      <button
                        onClick={handleBooking}
                        className="bg-[#C6F123] text-black px-6 py-3 w-full rounded-lg font-bold hover:bg-lime-400 transition"
                      >
                        Reserve room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
    </>
  );
};

export default RoomCategory;
