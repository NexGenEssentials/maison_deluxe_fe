"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BookingDetails } from "@/app/types/booking";
import {
  CreateBookingAPI,
  CreatePaymentMethod,
} from "@/app/api/bookings/action";
import { useState } from "react";
import { RoomType } from "@/app/types/rooms";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  paymentMode: yup.string().required("Payment mode is required"),
  terms: yup.bool().oneOf([true], "You must agree to the terms"),
  notes: yup.string().optional(),
});

export default function BookingForm({ room }: { room: RoomType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    if (!data.terms) {
      return;
    }
    setLoading(true);
    const formdata: BookingDetails = {
      room_category_id: room.id,
      guest_name: data.fullName,
      guest_email: data.email,
      guest_phone: data.phone,
      note: data.notes || "",
      check_in: String(checkIn),
      check_out: String(checkOut),
      total_price: Number(room.price),
      guests: room.capacity,
    };
    let method;
    if (data.paymentMode.toLowerCase() === "momo" && data.phone.trim() === "") {
      method = "mm";
    }
    if (data.paymentMode.toLowerCase() === "card") {
      method = "cc";
    }
    try {
      const result = await CreateBookingAPI(formdata);
      if (result.status) {
        const formData = {
          booking_id: result.data.id,
          pmethod: method,
          amount: Number(room.price),
          redirect_url: "http://localhost:3000/rooms/",
        };

        const response = await CreatePaymentMethod(formData);

        if (response.url) {
          router.push(`${response.url}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 space-y-5 bg-white shadow rounded-md"
    >
      <h2 className="text-xl font-bold text-gray-900">
        Enter your Personal info
      </h2>
      <p className="text-sm text-gray-500">
        Provide information to finalize your booking
      </p>

      <div>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Full Name"
          className="w-full border rounded px-4 py-2 focus:outline-none  border-gray-400 hover:border-lime-400 transition"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone")}
          type="text"
          placeholder="+250 788 888 888"
          className="w-full border rounded px-4 py-2 focus:outline-none  border-gray-400 hover:border-lime-400 transition"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email Address"
          className="w-full border rounded px-4 py-2 focus:outline-none  border-gray-400 hover:border-lime-400 transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Check-In
          </label>
          <div className="relative w-full border rounded-md border-gray-400 hover:border-lime-400">
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              minDate={new Date()}
              placeholderText="Select date"
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Check-Out
          </label>
          <div className="relative w-full border rounded-md border-gray-400 hover:border-lime-400">
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              minDate={checkIn || new Date()}
              placeholderText="Select date"
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <select
          {...register("paymentMode")}
          className="w-full border rounded px-4 py-2 focus:outline-none  border-gray-400 hover:border-lime-400 transition"
        >
          <option value="">Select Payment Mode</option>
          <option value="cc">Card</option>
          <option value="mm">MoMo</option>
        </select>
        {errors.paymentMode && (
          <p className="text-red-500 text-sm">{errors.paymentMode.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("notes")}
          rows={5}
          placeholder="Special Notes"
          className="w-full border rounded px-4 py-2 focus:outline-none  border-gray-400 hover:border-lime-400 transition"
        ></textarea>
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" {...register("terms")} className="mt-1" />
        <label className="text-sm text-gray-600">
          I Agree to Maison luxe{" "}
          <a href="#" className="text-blue-600 underline">
            Terms and Conditions
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm">{errors.terms.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-secondaryRed/80 hover:bg-secondaryRed text-white font-bold py-2 px-4 rounded transition"
      >
        {loading ? "Submitting..." : "Continue"}
      </button>
    </form>
  );
}
