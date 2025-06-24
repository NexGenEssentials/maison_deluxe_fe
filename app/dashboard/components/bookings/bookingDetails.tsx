"use client";

import React from "react";
import { BookingData } from "@/app/types/booking";
import { formatToDateOnly } from "@/app/utils/filters";

const BookingDetails = ({ data }: { data: BookingData }) => {
  return (
    <div className="max-w-6xl min-w-[400px] mx-auto px-6 py-10 bg-white  rounded-xl ">
      <h2 className="text-2xl font-bold text-primaryBlue mb-6 border-b pb-3">
        Booking Summary
      </h2>

      {/* Booking Reference */}
      <div className="text-right text-sm text-gray-500 mb-4">
        Ref: <span className="font-semibold">{data.booking_reference}</span>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div>
          <h4 className="font-semibold text-lg mb-1">Guest Information</h4>
          <p>
            <span className="font-medium">Name:</span> {data.guest_name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {data.guest_email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {data.guest_phone}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">Room Details</h4>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {data.room_category.name}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${data.total_price}
          </p>
          <p>
            <span className="font-medium">Guests:</span> {data.guests}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">Stay Duration</h4>
          <p>
            <span className="font-medium">Check-in:</span>{" "}
            {formatToDateOnly(data.check_in)}
          </p>
          <p>
            <span className="font-medium">Check-out:</span>{" "}
            {formatToDateOnly(data.check_out)}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">Status & Notes</h4>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`inline-block px-2 py-1 rounded text-sm ${
                data.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : data.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data.status}
            </span>
          </p>
          <p>
            <span className="font-medium">Note:</span> {data.note || "N/A"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-gray-500 text-right">
        Created: {formatToDateOnly(data.created_at)}
      </div>
    </div>
  );
};

export default BookingDetails;
