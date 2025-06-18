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
      className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold">Accommodation Form</h2>

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
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
        />
        {errors.units && <p className="text-red-500">Units must be a number</p>}
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="text"
          {...register("price", { required: "Price is required" })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Capacity</label>
        <input
          type="number"
          {...register("capacity", { required: true, min: 1 })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.capacity && (
          <p className="text-red-500">Capacity must be at least 1</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
