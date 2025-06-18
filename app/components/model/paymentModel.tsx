"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  paymentMode: yup.string().required("Payment mode is required"),
  terms: yup.bool().oneOf([true], "You must agree to the terms"),
  notes: yup.string().optional(),
});

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
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
        Continue
      </button>
    </form>
  );
}
