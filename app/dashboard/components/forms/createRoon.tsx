"use client";
import {
  CreateRoomTypeAPI,
  CreateRoomTypeImageAPI,
  EditRoomTypeAPI,
  getRoomByIdAPI,
} from "@/app/api/roomtype/action";
import { useAppContext } from "@/app/context";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FaImage, FaX } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/common/loader";

export type CreateRoomTypeFormData = {
  name: string;
  description: string;
  amenities: string;
  units: number;
  price: string;
  capacity: number;
};

export default function RoomTypeForm({ roomId }: { roomId?: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();
  const { setActiveModalId, setActiveTab } = useAppContext();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...acceptedFiles]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    },
  });

  useEffect(() => {
    handleGetRoom();
  }, [roomId]);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomTypeFormData>();

  const onSubmit = async (data: CreateRoomTypeFormData) => {
    try {
      if (!roomId) {
        const result = await CreateRoomTypeAPI(data);

        if (result.status) {
          const formData = new FormData();
          images.forEach((img) => {
            formData.append("image", img);
          });

          const response = await CreateRoomTypeImageAPI(
            formData,
            result?.data?.id
          );

          if (response.success) {
            setError({ status: true, message: "Image uploaded successfully!" });
            setActiveTab("Room Type");
            router.push("dashboard");
          } else {
            setError({ status: true, message: "Failed to upload image." });
          }
        }
      } else {
        const result = await EditRoomTypeAPI(roomId, data);
        if (!result.status) {
          setError({ status: true, message: result.message });
          return;
        }
        setError({
          status: true,
          message: "Room type updated successfully!",
        });

        if (result.status) {
          if (images.length > 0) {
            const formData = new FormData();
            images.forEach((img) => {
              formData.append("image", img);
            });

            const response = await CreateRoomTypeImageAPI(formData, roomId);

            if (response.success) {
              setError({
                status: true,
                message: "Room type updated successfully!",
              });
              setActiveTab("Room Type");
              router.push("dashboard");
              setActiveModalId(null);
              router.refresh();
            } else {
              setError({ status: true, message: "Failed to upload image." });
            }
          } else {
            setError({
              status: true,
              message: "Room type updated successfully without images!",
            });
            setActiveTab("Room Type");
            router.push("dashboard");
          }
        }
      }
    } catch (error) {
      setError({ status: true, message: error as string });
    } finally {
      setValue("name", "");
      setValue("description", "");
      setValue("amenities", "");
      setValue("units", 0);
      setValue("price", "");
      setValue("capacity", 0);
      setActiveTab("Room Type");
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleGetRoom = async () => {
    setLoading(true);
    if (!roomId) return;
    try {
      const response = await getRoomByIdAPI(roomId);

      if (response.status === 200) {
        reset({
          name: response.data?.name || "",
          description: response.data?.description || "",
          amenities: response.data?.amenities || "",
          units: response.data?.units || 0,
          price: response.data?.price?.toString() || "",
          capacity: response.data?.capacity || 0,
        });
        setImagePreviews(
          response.data?.images?.map((img: { image: string }) => img.image) ||
            []
        );
      }
    } catch (error) {
      console.error("Error fetching room type:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && roomId!)
    return (
      <div className="flex items-center justify-center min-w-[500px] min-h-[500px]">
        <Loader />
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-4 space-y-6 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-bold">
        {roomId ? "Edit Room Form" : "Create New Room Type Form"}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-500 pb-1 text-sm">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="room name"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm pt-0.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium text-gray-500 pb-1 text-sm">
            Units (total rooms of this type)
          </label>
          <input
            type="number"
            {...register("units", { required: true, min: 0 })}
            className="w-full border px-3 py-2 rounded"
            placeholder="eg:12"
          />
          {errors.units && (
            <p className="text-red-500 text-sm pt-0.5">
              Units must be a number
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium text-gray-500 pb-1 text-sm">
            Amenities
          </label>
          <textarea
            {...register("amenities")}
            placeholder={`e.g. {"wifi":"true", "pool":"yes"}`}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-500 pb-1 text-sm">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="room description"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm pt-0.5">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-500 pb-1 text-sm">
            Price
          </label>
          <input
            type="text"
            {...register("price", { required: "Price is required" })}
            placeholder="$00.00"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm pt-0.5">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-500 pb-1 text-sm">
            Capacity (number of people room can accommodate)
          </label>
          <input
            type="number"
            {...register("capacity", { required: true, min: 1 })}
            placeholder="eg:12"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm pt-0.5">
              Capacity must be at least 1
            </p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Create Room Images</h3>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "hover:border-secondaryRed"
          }`}
        >
          <input {...getInputProps()} />
          <FaImage className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Drag & drop or click to upload (multiple images)
          </p>
        </div>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((src, index) => (
              <div
                key={index}
                className="relative group aspect-video rounded overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <FaX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error.status && (
        <div className="text-blue-500 text-sm text-center">{error.message}</div>
      )}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-w-sm cursor-pointer bg-secondaryRed/80 text-white px-6 py-2 rounded hover:bg-secondaryRed"
        >
          {isSubmitting ? "Submitting..." : " Submit"}
        </button>
      </div>
    </form>
  );
}
