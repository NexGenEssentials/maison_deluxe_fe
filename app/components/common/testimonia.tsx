import React from "react";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Title from "./title";
import { testimonials } from "@/app/costants";

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
  return (
    <section className="relative py-20 bg-primaryBlue text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <Title title="What Our Customers say" />
        <p className="text-sm md:text-base text-gray-300 mb-12">
          Praesent volutpat augue sapien sapien. A sit neque viverra eleifend
          donec risus nam neque. Lacus etiam eu ullamcorper nisi pellentesque
          purus id. Lobortis
        </p>

        <div className="flex justify-center items-center relative">
          {/* Main testimonial */}
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-left w-full max-w-2xl shadow-xl flex items-center gap-6"
            >
              <div className="flex-shrink-0 ">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={100}
                  height={300}
                  className="rounded-bl-full object-covervh h-fll"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-lime-300 mb-2">
                  {t.title}
                </h3>
                <p className="text-base text-white text-nowrap mb-4">{t.description}</p>
                <div className="flex justify-between items-center">
                  <StarRating rating={t.rating} />
                  <div className="text-sm text-gray-300">
                    {t.name} – {t.country}{" "}
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
          ))}
        </div>

        {/* Avatar slider below */}
        <div className="mt-10 flex justify-center gap-[-10px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-full overflow-hidden border-2 border-white -ml-3 first:ml-0"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
