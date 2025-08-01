"use server";

import { UserApiResponse } from "@/app/types/user";
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const Subscribe = async (
  email: string
): Promise<{ status: string; message: string }> => {
  try {
    const response = await fetch(`${base_url}/subscribe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const ContactUs = async (contactData: {
  full_name: string;
  email: string;
  message: string;
}): Promise<{ status: string; message: string }> => {
  try {
    const response = await fetch(`${base_url}/contact-us/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (): Promise<UserApiResponse> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const response = await fetch(`${base_url}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (userId: number): Promise<boolean> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  try {
    const response = await fetch(`${base_url}/users/${userId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};
