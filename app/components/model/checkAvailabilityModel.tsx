"use client";
import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { checkRoomAvailabilityAPI } from "@/app/api/roomtype/action";

const CheckAvailabilityModel = ({ Id }: { Id: number }) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    setError("");
    setAvailable(null);
    setLoading(true);

    try {
      const response = await checkRoomAvailabilityAPI(
        Id,
        checkIn.toISOString().split("T")[0],
        checkOut.toISOString().split("T")[0]
      );
      setAvailable(response.available);
    } catch (err) {
      setError("Something went wrong while checking availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl h-full min-h-[400px] w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Check Room Availability
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Check-In
          </label>
          <div className="relative">
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              //   startDate={checkIn}
              //   endDate={checkOut}
              minDate={new Date()}
              placeholderText="Select date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            />
            <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Check-Out
          </label>
          <div className="relative">
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              //   startDate={checkIn}
              //   endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Select date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            />
            <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckAvailability}
        disabled={loading}
        className={clsx(
          "w-full py-3 flex items-center justify-center gap-2 text-white rounded-md font-bold transition",
          loading
            ? "bg-primaryBlue/70 cursor-not-allowed"
            : "bg-primaryBlue/70 hover:bg-primaryBlue"
        )}
      >
        <IoSearch size={20} />
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {error && (
        <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
      )}

      {available !== null && (
        <div
          className={clsx(
            "mt-4 text-center font-semibold text-lg",
            available ? "text-green-600" : "text-red-500"
          )}
        >
          {available
            ? "Rooms are available for the selected dates!"
            : "Sorry, no rooms available for those dates."}
        </div>
      )}
    </div>
  );
};

export default CheckAvailabilityModel;
