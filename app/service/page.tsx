"use client";
import React, { useState } from "react";
import Tamplate from "../components/common/template";
import Pricing from "../components/pricing/pricing";
import { Services } from "../costants";

const tabs = ["service", "pricing"];

const Service = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  return (
    <Tamplate>
      <div className="bg-white py-8 px-6 md:px-20 space-y-16">
        <div className="border border-gray-200 rounded-lg w-full md:w-1/2 mx-auto flex overflow-hidden">
          {tabs.map((tab) => (
            <span
              onClick={() => setActiveTab(tab)}
              className={`${
                tab !== activeTab
                  ? "bg-primaryRed/70 hover:bg-primaryRed text-white"
                  : "text-gray-300 hover:cursor-not-allowed"
              } w-full flex items-center justify-center py-3 font-semibold cursor-pointer capitalize`}
              key={tab}
            >
              {tab}
            </span>
          ))}
        </div>

        {activeTab === "service" && (
          <>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
              <p className="mt-4 text-gray-500 text-lg">
                We provide exceptional hospitality services to make your stay
                smooth, enjoyable, and memorable.
              </p>
            </div>

            <div className="space-y-20">
              {Services.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className={`flex flex-col-reverse md:flex-row ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  } items-center gap-10`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full md:w-1/2 h-96 object-cover rounded-xl shadow-md"
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
          </>
        )}
        {activeTab === "pricing" && <Pricing />}
      </div>
    </Tamplate>
  );
};

export default Service;
