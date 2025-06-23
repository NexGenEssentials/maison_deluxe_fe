"use server";

import { CreateRoomTypeFormData } from "@/app/dashboard/components/forms/createRoon";
import { RoomType } from "@/app/types/rooms";
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const CreateRoomTypeAPI = async (
  data: CreateRoomTypeFormData
): Promise<{
  message: string;
  status: boolean;
  data: RoomType | null;
}> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const response = await fetch(`${base_url}/room-categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        data: result,
        message: response.statusText,
        status: false,
      };
    } else {
      return {
        data: result,
        message: "You have successfully created room",
        status: true,
      };
    }
  } catch (error) {
    return {
      data: null,
      message: "An error occurred while processing your request",
      status: false,
    };
  }
};

export const CreateRoomTypeImageAPI = async (
  roomImages: FormData,
  id: number
): Promise<{ success: boolean }> => {
  try {
    // const accessToken = (await cookies()).get("accessToken")?.value;
    const response = await fetch(`${base_url}/room-categories/${id}/images/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${accessToken}`,
      },
      body: roomImages,
    });

    const data = await response.json();
   
    if (!response.ok) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const DeleteRoomTypeAPI = async (id: number): Promise<boolean> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const response = await fetch(`${base_url}/room-categories/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
   
    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

export const getAllRoomTypeAPI = async (): Promise<{
  message: string;
  status: number;
  data: RoomType[];
}> => {
  try {
    const response = await fetch(`${base_url}/room-categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        data: [],
        message: response.statusText,
        status: response.status,
      };
    } else {
      return {
        data: result,
        message: "rooms",
        status: response.status,
      };
    }
  } catch (error) {
    return {
      data: [],
      message: "An error occurred while processing your request",
      status: 500,
    };
  }
};
