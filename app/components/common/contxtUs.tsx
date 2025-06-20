"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Title from "./title";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    agree: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) newErrors.email = "Email address is required.";
    if (!formData.message) newErrors.message = "Message cannot be empty.";
    if (!formData.agree) newErrors.agree = "You must accept the terms.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate submission
    console.log("Submitted Data:", formData);
    setSubmitted(true);
  };

  return (
    <div
      id={"contact"}
      className="bg-gradient-to-t md:bg-gradient-to-tr from-[#3F31FF] from-[-55%] to-primaryBlue to-45% text-white flex items-center justify-center px-4"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 py-20">
        {/* Left content */}
        <div>
          <button className="px-5 py-2 rounded-full bg-primaryGreen/20 font-semibold border border-[#BFC900] mb-6 text-[#BFC900]">
            Contact Us
          </button>
          <Title title="Get in Touch" />
          <p className="text-[#96B3FF] leading-relaxed mt-4">
            We’d love to hear from you. Whether you have a question, want to
            explore opportunities, or simply wish to say hello — feel free to
            reach out. Our team is ready to assist you.
          </p>
        </div>

        {/* Right form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {submitted ? (
            <div className="text-green-400 text-lg font-medium">
              Thank you! We’ll get back to you shortly.
            </div>
          ) : (
            <>
              {/* Name */}
              <div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full">
                  <FaUser className="text-gray-300" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
                  />
                </div>
                {errors.name && (
                  <div className="text-red-400 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full">
                  <FaUser className="text-gray-300" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
                  />
                </div>
                {errors.email && (
                  <div className="text-red-400 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full">
                  <FaUser className="text-gray-300" />
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message goes here"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-32 rounded-xl px-4 py-3 bg-white/10 outline-none text-white placeholder:text-gray-400"
                />
                {errors.message && (
                  <div className="text-red-400 text-sm mt-1">
                    {errors.message}
                  </div>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label>
                  I agree to receiving promotional emails &{" "}
                  <a href="#" className="text-blue-400 underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.agree && (
                <div className="text-red-400 text-sm mt-1">{errors.agree}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#201E92] hover:bg-indigo-700 py-3 rounded-md text-white font-medium transition"
              >
                Send Enquiries
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
