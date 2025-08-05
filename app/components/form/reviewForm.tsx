"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const countries = [
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Tanzania", flag: "🇹🇿" },
];

const ReviewForm = () => {
    
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    title: "",
    message: "",
    rating: 0,
    photo: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleRating = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review Data:", formData);
   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-md space-y-4 w-full max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-primaryBlue">
        Leave a Review
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} {c.flag}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="photo"
          onChange={handlePhotoUpload}
          accept="image/*"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      <input
        type="text"
        name="title"
        placeholder="Review Title"
        value={formData.title}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-4 py-2 w-full"
        required
      />

      <textarea
        name="message"
        placeholder="Your review..."
        value={formData.message}
        onChange={handleInputChange}
        rows={5}
        className="border border-gray-300 rounded px-4 py-2 w-full"
        required
      />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Rating:</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => handleRating(i + 1)}
            className={`text-2xl ${
              formData.rating >= i + 1 ? "text-red-700" : "text-gray-300"
            }`}
          >
            <FaStar />
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-primaryBlue hover:bg-blue-700 text-white rounded font-semibold transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
