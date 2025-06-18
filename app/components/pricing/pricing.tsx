"use client";
import { ExtraInfoData, roomType, TableHeaders } from "@/app/costants";
import React from "react";

const Pricing = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-cover lg:bg-contain opacity-10"
        style={{ backgroundImage: "url('/images/moon.png')" }}
      />

      <div className="relative z-10 px-4 py-10">
        <h1 className="text-secondaryRed font-bold text-4xl mb-6 text-center">
          Maison De Luxe Price List
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-slate-700 text-sm md:text-base ">
            <thead className="bg-secondaryRed text-white">
              <tr>
                {TableHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className="border border-red-300 px-4 py-2 text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roomType.map((row, idx) => (
                <tr key={idx} className="hover:bg-red-100/80">
                  <td className="border border-slate-700 px-4 py-2 font-semibold text-nowrap">
                    {row.title} <br /> ({row.available} Room
                    {row.available > 1 ? "s" : ""})
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    {row.amenities}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    {"2 Adults"}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    $ {row.price}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">{`20%`}</td>
                  <td className="border border-slate-700 px-4 py-2">{`10%`}</td>
                  <td className="border border-slate-700 px-4 py-2">
                    $ {15.0}
                  </td>
                  <td className="border border-slate-700 px-4 py-2">
                    $ {20.0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-10">
          <h2 className="text-2xl font-bold text-secondaryRed mb-6 uppercase">
            Extra Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ExtraInfoData.map((section, index) => (
              <div key={index}>
                <h3 className={`text-lg font-bold mb-2 text-secondaryRed`}>
                  {section.title}
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-3 text-center text-sm md:text-base text-blue-900">
            <h4 className="font-bold text-xl uppercase">
              Contact Information{" "}
            </h4>
            <p>Kibagabaga, KG 263 Street, Kigali-Rwanda.</p>
            <p>
              +250 796 890 907 /{" "}
              <a
                href="mailto:maisondeluxerw@gmail.com"
                className="text-primaryBlue hover:text-blue-800 underline"
              >
                maisondeluxerw@gmail.com
              </a>{" "}
              /{" "}
              <a
                href="https://www.maisondeluxe.rw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primaryBlue hover:text-blue-800 underline"
              >
                www.maisondeluxe.rw
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
