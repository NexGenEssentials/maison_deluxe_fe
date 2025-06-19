import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  description: string;
  amenities: Record<string, string>; // empty object or key-value pairs
  units: number;
  price: string;
  capacity: number;
};

export default function RoomTypeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-4 space-y-4 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-bold">Create New Room Type Form</h2>

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="room name"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="room description"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">
          Amenities (optional key:value pairs)
        </label>
        <textarea
          {...register("amenities")}
          placeholder={`e.g. {"wifi":"true", "pool":"yes"}`}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Units</label>
        <input
          type="number"
          {...register("units", { required: true, min: 0 })}
          className="w-full border px-3 py-2 rounded"
          placeholder="eg:12"
        />
        {errors.units && <p className="text-red-500">Units must be a number</p>}
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="text"
          {...register("price", { required: "Price is required" })}
          placeholder="$00.00"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Capacity</label>
        <input
          type="number"
          {...register("capacity", { required: true, min: 1 })}
          placeholder="eg:12"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.capacity && (
          <p className="text-red-500">Capacity must be at least 1</p>
        )}
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="min-w-sm cursor-pointer bg-secondaryRed/80 text-white px-6 py-2 rounded hover:bg-secondaryRed"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
