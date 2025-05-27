"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Title from "./title";
import { testimonials } from "@/app/costants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfStar && <FaStarHalfAlt />}
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-20 bg-primaryBlue text-white text-center">
      <div className="bg-gradient-to-r from-transparent via-[#100699]/10 via-50%  py-12  to-transparent px-4">
        <Title title="What Our Customers say" />
        <p className="text-sm md:text-base text-gray-300 mb-12">
          Praesent volutpat augue sapien sapien. A sit neque viverra eleifend
          donec risus nam neque. Lacus etiam eu ullamcorper nisi pellentesque
          purus id. Lobortis
        </p>

        <Swiper
          modules={[Autoplay, Keyboard]}
          spaceBetween={50}
          slidesPerView={2.5}
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
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1524: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          className="w-full py-10  "
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className=" lg:py-40 relative flex justify-center">
              <div
                className={`max-lg:hidden transition-all overflow-hidden  duration-300 flex items-center gap-6 rounded-xl  text-left ${
                  activeIndex === i
                    ? " rounded-bl-[80px]  scale-[1.4] z-10 bg-secondaryBlue shadow-[#100699]/80 backdrop-blur-2xl border border-[#7576C3] shadow-2xl"
                    : "opacity-70 bg:white/10 blur-[2px] "
                }`}
              >
                <div className="relative w-[150px] h-[200px] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className={` ${
                      activeIndex !== i
                        ? " rounded-full !w-[100px]  !h-[100px] blur-[8px]"
                        : " "
                    } object-cover h-full`}
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-bold text-lime-300 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-base text-[#C7C7FF] mb-4">
                    {t.description}
                  </p>
                  <div className="flex justify-between flex-wrap gap-4 items-center">
                    <StarRating rating={t.rating} />
                    <div className="text-sm text-[#C7C7FF]">
                      {t.name} – {t.country}
                      <Image
                        src={t.flag}
                        alt={t.country}
                        width={18}
                        height={12}
                        className="inline ml-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={` lg:hidden transition-all rounded-2xl p-8 overflow-hidden duration-300 flex flex-col gap-12  text-left ${
                  activeIndex === i
                    ? "z-10 bg-secondaryBlue shadow-[#100699]/80 backdrop-blur-2xl border border-[#7576C3] shadow-2xl"
                    : "opacity-70 bg:white/10 blur-[2px] "
                }`}
              >
                <div className=" flex items-center gap-4">
                  <div className="relative w-24 h-24 overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className={`object-cover h-full rounded-full`}
                    />
                  </div>
                  <div className="flex-1 ">
                    <h3 className="text-xl font-bold text-lime-300 mb-2">
                      {t.title}
                    </h3>
                    <div className="text-sm text-[#C7C7FF] ">
                      {t.name} – {t.country}
                      <Image
                        src={t.flag}
                        alt={t.country}
                        width={18}
                        height={12}
                        className="inline ml-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-base text-[#C7C7FF] mb-4">
                    {t.description}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#C7C7FF]"> Ratings</span>
                  <StarRating rating={t.rating} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Avatar slider below */}
        <div className="mt-10 flex justify-center gap-[-10px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative  overflow-hidden rounded-full border-4 border-[#DFDDFC4D] -ml-10 first:ml-0"
            >
              <div
                key={i}
                className="w-18 h-18 flex items-center overflow-hidden justify-center rounded-full  border-4 border-white/80"
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={60}
                  height={60}
                  className="object-cover w-full h-full "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
