"use client";
import React, { useState } from "react";
import { Services } from "@/app/costants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Title from "../common/title";
import { useRouter } from "next/navigation";

const ServiceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section id="service" className="bg-primaryBlue py-12 lg:px-24 text-white ">
      <div className="px-4">
        <Title title="Service" />
        <p className="text-sm md:text-base lg:w-1/2 text-gray-300 mb-12">
          Praesent volutpat augue sapien sapien. A sit neque viverra eleifend
          donec risus nam neque. Lacus etiam eu ullamcorper nisi pellentesque
          purus id. Lobortis
        </p>

        <Swiper
          modules={[Autoplay, Keyboard]}
          spaceBetween={0}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          keyboard={{
            enabled: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: -10,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: -10,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: -10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1524: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          className="w-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {Services.map((t, i) => (
            <SwiperSlide
              key={i}
              className="p-10 sm:py-20 lg:py-40 flex justify-center"
            >
              <div
                className={`transition-all overflow-hidden rounded-xl p-5 sm:p-10  duration-300 flex flex-col items-center gap-6 text-left ${
                  activeIndex === i
                    ? "scale-[1.1] z-10 bg-secondaryBlue shadow-[#100699]/80 sm:backdrop-blur-2xl border border-[#7576C3]/20 shadow-2xl"
                    : "opacity-70 bg:white/10 blur-[2px] "
                }`}
              >
                <div className="relative w-full h-[200px] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.title}
                    className={` ${
                      activeIndex !== i ? "blur-[8px]" : ""
                    } object-cover h-full`}
                  />
                </div>
                <div className="flex flex-col sm:p-4 items-center justify-center w-full">
                  <h3 className=" sm:text-3xl font-bold text-lime-300 mb-2">
                    {t.title}
                  </h3>
                  <p className="max-sm:text-xs text-base text-[#C7C7FF] mb-4">
                    {t.description}
                  </p>

                  <button
                    onClick={() => router.push("pricing")}
                    className="text-white bg-[#9FB3FF14] hover:bg-blue-900 cursor-pointer p-2 sm:p-4 rounded-xl w-full"
                  >
                    View Price
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServiceSection;
