"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import TitleBlack from "./titleBlack";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import slide1 from "@/public/images/slide1.avif";
import slide2 from "@/public/images/slide2.jpg";
import slide3 from "@/public/images/slide3.jpg";

const slides = [
  {
    title: "Exceptional Dining Experience",
    description:
      "Enjoy a diverse menu of international and Rwandan cuisine prepared by top chefs. Whether it’s a breakfast buffet or an evening à la carte dinner, we promise a delightful culinary experience.",
    image: slide3,
  },
  {
    title: "Prime Location in Kigali",
    description:
      "Located in the heart of the city, our hotel offers easy access to top attractions like the Kigali Convention Centre, Kigali Heights, and vibrant local markets — making your stay convenient and exciting.",
    image: slide1,
  },
  {
    title: "Modern & Comfortable Rooms",
    description:
      "Experience luxury and comfort in our fully equipped rooms featuring high-speed Wi-Fi, air conditioning, smart TVs, and breathtaking city views — perfect for both business and leisure travelers.",
    image: slide2,
  },
];

const StayWithUs = () => {
  return (
    <div className=" min-h-screen pt-16 gap-12 flex flex-col justify-between h-full">
      <div className="mx-20 border border-[#F2FF04] p-3 rounded-full bg-[#BFC90014] w-fit">
        <h1 className="text-[#BFC900] font-semibold">What Makes Us Special</h1>
      </div>
      <div className="px-20">
        <TitleBlack title={"Why Stay With Us"} />
        <p className="text-medium max-w-2xl">
          Praesent volutpat augue sapien sapien. A sit neque viverra eleifend
          donec risus nam neque. Lacus etiam eu ullamcorper nisi pellentesque
          purus id. Lobortis
        </p>
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        freeMode={true}
        grabCursor={true}
        centeredSlides={true}
        modules={[Scrollbar]}
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
              s
              <div className="absolute inset-0 bg-gradient-to-r from-primaryBlue/60 to-transparent flex items-end justify-between ">
                <div className="backdrop-blur-[2px]  w-full flex items-end justify-between px-12 py-10">
                  <div className="max-w-lg space-y-4 ">
                    <h2 className="text-2xl font-bold text-white">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-gray-200">{slide.description}</p>
                  </div>
                  <button className="mt-4 px-6 py-3 bg-primaryGreen/50 text-primaryGreen backdrop-blur-xl font-medium rounded-md shadow-md hover:opacity-90 transition">
                    Reserve Room
                  </button>
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
