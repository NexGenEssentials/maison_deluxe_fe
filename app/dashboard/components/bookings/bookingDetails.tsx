"use client";

import React from "react";
import { BookingData } from "@/app/types/booking";
import { formatToDateOnly } from "@/app/utils/filters";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBed,
  FaMoneyBillWave,
  FaUsers,
  FaCalendarCheck,
  FaCalendarTimes,
  FaStickyNote,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaReceipt,
} from "react-icons/fa";

const BookingDetails = ({ data }: { data: BookingData }) => {
  const statusBadge = {
    pending: {
      text: "Pending",
      icon: <FaHourglassHalf className="inline mr-1" />,
      style: "bg-yellow-100 text-yellow-700",
    },
    confirmed: {
      text: "Confirmed",
      icon: <FaCheckCircle className="inline mr-1" />,
      style: "bg-green-100 text-green-700",
    },
    cancelled: {
      text: "Cancelled",
      icon: <FaTimesCircle className="inline mr-1" />,
      style: "bg-red-100 text-red-700",
    },
  };

  const currentStatus = statusBadge[data.status as keyof typeof statusBadge] || statusBadge["pending"];

  return (
    <div className="max-w-7xl min-w-[360px] mx-auto px-6 py-10 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-primaryBlue flex items-center gap-2">
          <FaReceipt className="text-primaryBlue" />
          Booking Summary
        </h2>
        <p className="text-sm text-gray-500">
          Ref: <span className="font-semibold">{data.booking_reference}</span>
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-sm gap-8 text-gray-700">
        {/* Guest Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaUser className="text-primaryBlue" />
            Guest Information
          </h4>
          <p>
            <span className="font-bold">Name:</span> {data.guest_name}
          </p>
          <p>
            <span className="font-bold">Email:</span> {data.guest_email}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {data.guest_phone}
          </p>
        </div>

        {/* Room Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaBed className="text-primaryBlue" />
            Room Details
          </h4>
          <p>
            <span className="font-bold">Category:</span>{" "}
            {data.room_category.name}
          </p>
          <p>
            <span className="font-bold">Price:</span> ${data.total_price}
          </p>
          <p>
            <span className="font-bold">Guests:</span> {data.guests}
          </p>
        </div>

        {/* Stay Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaCalendarCheck className="text-primaryBlue" />
            Stay Duration
          </h4>
          <p>
            <span className="font-bold">Check-in:</span>{" "}
            {formatToDateOnly(data.check_in)}
          </p>
          <p>
            <span className="font-bold">Check-out:</span>{" "}
            {formatToDateOnly(data.check_out)}
          </p>
        </div>

        {/* Status & Notes */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaStickyNote className="text-primaryBlue" />
            Status & Notes
          </h4>
          <p>
            <span className="font-bold">Status:</span>{" "}
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${currentStatus.style}`}
            >
              {currentStatus.icon}
              {currentStatus.text}
            </span>
          </p>
          <p>
            <span className="font-bold">Note:</span>{" "}
            {data.note ? data.note : "N/A"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-sm text-gray-500 text-right flex items-center justify-end gap-2">
        <FaClock />
        Created: {formatToDateOnly(data.created_at)}
      </div>
    </div>
  );
};

export default BookingDetails;
