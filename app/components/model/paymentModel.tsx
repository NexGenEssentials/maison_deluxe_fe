"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BookingDetails, BookingResponse } from "@/app/types/booking";
import {
  CreateBookingAPI,
  CreatePaymentMethod,
} from "@/app/api/bookings/action";
import { useState } from "react";
import { RoomType } from "@/app/types/rooms";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { formatToDateOnly } from "@/app/utils/filters";
import { useAppContext } from "@/app/context";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  people: yup.number().required("Number of people is required"),
  paymentMode: yup.string().required("Payment mode is required"),
  terms: yup.bool().oneOf([true], "You must agree to the terms"),
  notes: yup.string().optional(),
});

export default function BookingForm({ room }: { room: RoomType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      people: room.capacity,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [payButton, setPayButton] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(
    null
  );
  const { setActiveModalId } = useAppContext();

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
      check_in: formatToDateOnly(String(checkIn)),
      check_out: formatToDateOnly(String(checkOut)),
      total_price: Number(room.price) * getValues("people"),
      guests: room.capacity,
    };

    try {
      const result = await CreateBookingAPI(formdata);
      setBookingResult(result);
      if (result.status === "success" && payButton) {
        const paymentBody = {
          booking_id: result.data.id,
          pmethod: data.paymentMode,
          amount: Number(room.price),
          redirect_url: "http://localhost:3000/rooms/",
          phone: result.data.guest_phone,
          email: result.data.guest_email,
          full_name: result.data.guest_name,
        };

        const response = await CreatePaymentMethod(paymentBody);

        if (response.url) {
          router.push(`${response.url}`);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <>
      {bookingResult ? (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-green-600">
              🎉 Booking Confirmed!
            </h2>
            <p className="text-gray-600 text-sm">
              Thank you for booking with us. Here are your booking details:
            </p>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-dashed border-green-200">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between">
                <span className="font-medium">Room Type:</span>
                <span>{bookingResult.data.room_category.name}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Booking Ref:</span>
                <span className="font-semibold">
                  {" "}
                  {bookingResult.data.booking_reference}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Check-In:</span>
                <span>
                  {formatToDateOnly(String(bookingResult.data.check_in))}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Check-Out:</span>
                <span>
                  {formatToDateOnly(String(bookingResult.data.check_out))}
                </span>
              </li>
              <li className="flex justify-between text-green-700 font-semibold">
                <span>Total Price:</span>
                <span>
                  RWF {Number(bookingResult.data.total_price).toLocaleString()}
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-5 text-center text-sm text-gray-500">
            We look forward to welcoming you and making your stay memorable.
          </p>

          <button
            onClick={() => setActiveModalId(null)}
            className="mt-6 w-full bg-primaryRed/70 hover:bg-primaryRed text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Close
          </button>
        </div>
      ) : (
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
          <div>
            <input
              {...register("people")}
              type="number"
              min={1}
              max={room.capacity}
              placeholder="Number of People"
              className="w-full border rounded px-4 py-2 focus:outline-none  border-gray-400 hover:border-lime-400 transition"
            />
            {errors.people && (
              <p className="text-red-500 text-sm">{errors.people.message}</p>
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
              <option value="momo">MoMo</option>
              <option value="cash">Cash</option>
            </select>
            {errors.paymentMode && (
              <p className="text-red-500 text-sm">
                {errors.paymentMode.message}
              </p>
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
          <div className="flex justify-between items-center border-t ">
            <span>Total Price</span>
            <span className="font-semibold text-lg">
              RWF {(Number(room.price) * getValues("people")).toLocaleString()}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-secondaryRed/80 hover:bg-secondaryRed text-white font-bold py-2 px-4 rounded transition"
          >
            {loading ? "Submitting..." : "Book"}
          </button>

          <button
            onClick={() => setPayButton(true)}
            type="submit"
            className="w-full bg-blue-500/80 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition"
          >
            {loading && payButton ? "Submitting..." : "Pay"}
          </button>
        </form>
      )}
    </>
  );
}
