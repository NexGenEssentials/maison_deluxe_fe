"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUserPlus } from "react-icons/fi";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  full_name: z.string().min(3, "Full name is required"),
});

type UserFormData = z.infer<typeof userSchema>;

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      phone: "",
      full_name: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    console.log("Form Data:", data);

    // try {
    //   const res = await CreateUserAPI(data);

    //   if (res.ok) {
    //     reset();
    //   } else {

    //   }
    // } catch (error) {

    // }
  };

  return (
    <div className="pl-64 py-6 pr-6 w-full">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiUserPlus /> Create New User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("full_name")}
              placeholder="Enter full name"
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
                errors.full_name
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="+2507..."
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-primaryBlue cursor-pointer transition"
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
