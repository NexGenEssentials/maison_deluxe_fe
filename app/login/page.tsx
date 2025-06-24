"use client";
import React, { useState } from "react";
import Image from "next/image";
import RedWhiteLogo from "@/public/images/red_white_logo.png";
import Link from "next/link";
import { LoginAPI } from "../api/auth/action";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await LoginAPI(formData);
      if (result.access) {
        router.push("/dashboard");
      } else if (result.status === 401) {
        setError("Invalid credentials, check your email or password.");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {/* Left section with logo */}
      <div className="relative bg-gradient-to-b from-[#010A77] to-primaryBlue h-full w-1/2 flex items-center justify-center">
        <div
          className="absolute top-1/3 inset-0 z-0 bg-center bg-no-repeat bg-cover lg:bg-contain opacity-100"
          style={{ backgroundImage: "url('/images/grayMoon.png')" }}
        />
        <div className="h-[150px] w-[150px] relative z-10">
          <Image
            src={RedWhiteLogo}
            alt="maison de lux"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Right section with login form */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-2/3 max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-center text-gray-500">
            Welcome to the Maison de luxe back office portal. Kindly enter your
            credentials below to Sign In
          </p>

          {error && (
            <div className="text-red-500 w-full text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>
            {/* <div className="text-right">
              <a href="#" className="text-sm text-blue-800 hover:underline">
                Forgot Password
              </a>
            </div> */}

          <div className="flex justify-between items-center space-x-4">
            <Link href="/" className="w-full">
              <button
                type="button"
                className="w-1/2 py-3 cursor-pointer bg-gray-100 text-gray-400 hover:bg-gray-300 rounded-md"
                disabled
              >
                Back
              </button>
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="w-1/2 py-3 bg-primaryBlue/70 text-white rounded-md hover:bg-primaryBlue transition"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
