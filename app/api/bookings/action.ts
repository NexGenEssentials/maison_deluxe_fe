"use server";

import {
  AllBookingType,
  BookingDetails,
  BookingResponse,
  PaymentResponseType,
} from "@/app/types/booking";
import { cookies } from "next/headers";
const base_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const CreateBookingAPI = async (
  bookingData: BookingDetails
): Promise<BookingResponse> => {
  try {
    const response = await fetch(`${base_url}/bookings/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllBookings = async (): Promise<AllBookingType> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const response = await fetch(`${base_url}/bookings/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log("Something went wrong", { error });
    throw error;
  }
};

export const updateBookingStatus = async (
  id: number,
  newStatus: string
): Promise<{ status: string; message: string }> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const response = await fetch(
      `${base_url}/bookings/${id}/${newStatus.toLowerCase()}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log("Something went wrong", { error });
    throw error;
  }
};

export const DeleteBooking = async (objectId: number): Promise<boolean> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const response = await fetch(`${base_url}/bookings/${objectId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Something went wrong", { error });
    throw error;
  }
};

export const CreatePaymentMethod = async (bookingData: {
  booking_id: number;
  pmethod: string;
  amount: number;
  redirect_url: string;
  phone: string;
  email: string;
  full_name: string;
}): Promise<PaymentResponseType> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const response = await fetch(`${base_url}/payment/initiate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
