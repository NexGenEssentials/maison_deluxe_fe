import React from "react";
import Tamplate from "../components/common/template";


const services = [
  {
    title: "City Tour",
    description:
      "Discover the vibrant culture and hidden gems of our city with our guided tours. From historical landmarks to local food experiences, our city tour is perfect for travelers who want a deep dive into what makes the city unique.",
    image: "/images/slide2.jpg",
  },
  {
    title: "Airport Transfer",
    description:
      "Start and end your journey stress-free with our reliable airport transfer service. Our professional drivers ensure timely pick-up and drop-off, so you can travel with peace of mind.",
    image: "/images/slide3.jpg",
  },
  {
    title: "Transport",
    description:
      "Need to get around town or travel to a nearby destination? Our transport services offer private and group options to fit your schedule, comfort, and budget. Travel with safety and ease.",
    image: "/images/us.jpg",
  },
];

const Service = () => {
  return (
    <Tamplate>
      <div className="bg-white min-h-screen py-16 px-6 md:px-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
          <p className="mt-4 text-gray-500 text-lg">
            We provide exceptional hospitality services to make your stay
            smooth, enjoyable, and memorable.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full md:w-1/2 h-72 object-cover rounded-xl shadow-md"
              />
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Tamplate>
  );
};

export default Service;
