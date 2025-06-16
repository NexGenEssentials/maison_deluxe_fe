"use client";
import { roomType } from "@/app/costants";
import React from "react";

const tableHeaders = [
  "Rooms Category",
  "Room Facilities",
  "Max Per Room",
  "Price Per Room (USD)",
  "Extra Person Rate (Adult)",
  "Extra Person Rate (Child)",
  "BreakFast Per Person (USD)",
  "Airport TransfersPer Person (USD)",
];

const Pricing = () => {
  return (
    <div className="px-4">
      <h1 className="text-primaryRed font-bold text-4xl mb-6 text-center">
        Maison De Luxe Price List
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
          <thead className="bg-red-700 text-white">
            <tr>
              {tableHeaders.map((header, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roomType.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-nowrap">
                  {row.title} <br /> ({row.available} Room{row.available > 1 ? "s" : ""})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.amenities}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {"2 Adults"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  $ {row.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">{`20%`}</td>
                <td className="border border-gray-300 px-4 py-2">{`10%`}</td>
                <td className="border border-gray-300 px-4 py-2">$ {15.0}</td>
                <td className="border border-gray-300 px-4 py-2">$ {20.0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;
