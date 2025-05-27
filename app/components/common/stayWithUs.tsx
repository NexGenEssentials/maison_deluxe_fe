"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import TitleBlack from "./titleBlack";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Scrollbar, Keyboard, Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { slides } from "@/app/costants";
import Link from "next/link";

const StayWithUs = () => {
  return (
    <div
      id={"about"}
      className=" max-lg:-mt-12 bg-white pt-16 gap-4 lg:gap-12 flex flex-col justify-between h-full"
    >
      <div className="mx-8 lg:mx-20 border border-[#F2FF04] p-3 rounded-full bg-[#BFC90014] w-fit">
        <h1 className="text-[#BFC900] font-semibold">What Makes Us Special</h1>
      </div>
      <div className="mx-8 lg:mx-20">
        <TitleBlack title={"Why Stay With Us"} />
        <p className="text-medium max-lg:text-sm lg:max-w-2xl">
          From our elegant accommodations to personalized services, we go above
          and beyond to create an exceptional guest experience. Whether you're
          here for business or leisure, you'll find the perfect blend of
          comfort, convenience, and hospitality.
        </p>
      </div>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={{
          draggable: true,
          dragClass: "custom-drag",
        }}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        speed={1000}
        mousewheel={false}
        freeMode={true}
        grabCursor={true}
        centeredSlides={true}
        modules={[Scrollbar, Keyboard, Mousewheel, Navigation, Autoplay]}
        className="mySwiper w-full h-[600px] "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full rounded-lg overflow-hidden ">
              <img
                src={slide.image.src}
                alt={slide.title}
                className="w-full h-full object-cover "
              />

              <div className="absolute inset-0 bg-gradient-to-r from-primaryBlue/60 to-transparent flex items-end justify-between ">
                <div className="backdrop-blur-[2px]  w-full flex flex-wrap items-end justify-between px-12 py-10">
                  <div className="max-w-lg space-y-4 ">
                    <h2 className="text-2xl font-bold text-white">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-gray-200">{slide.description}</p>
                  </div>
                  <Link href="/rooms" className="flex-shrink-0">
                    <button className="max-sm:w-full mt-4 px-6 py-3 bg-primaryGreen text-primaryBlue backdrop-blur-xl font-semibold rounded-md shadow-md hover:opacity-90 transition">
                      Reserve Room
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StayWithUs;
