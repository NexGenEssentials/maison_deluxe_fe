"use client";

import { ResetPasswordAPI } from "@/app/api/common/action";
import { useAppContext } from "@/app/context";
import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { setActiveModalId } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await ResetPasswordAPI(password);

      if (result?.success) {
        setMessage({ type: "success", text: "Password reset successfully." });
        setPassword({ old_password: "", new_password: "" });
        setActiveModalId(null);
      } else {
        setMessage({
          type: "error",
          text: result?.message || "Failed to reset password.",
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl min-w-[500px] mx-auto mt-10 p-8 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Old Password</label>
          <input
            type="password"
            name="old_password"
            value={password.old_password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="new_password"
            value={password.new_password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primaryGrey text-white py-2 rounded-lg hover:bg-primaryBlue cursor-pointer transition disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-center ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
