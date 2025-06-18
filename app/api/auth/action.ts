"use server";

import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const LoginAPI = async (data: {
  username: string;
  password: string;
}): Promise<{
  access: string;
  message: string;
  status: number;
}> => {
  try {
    const response = await fetch(`${base_url}/tours/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const payload = result.access.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    const role = decodedPayload.role;

    console.log(result);

    if (!response.ok) {
      return {
        access: "",
        message: response.statusText,
        status: response.status,
      };
    }

    // if (data.access && role === "admin") {
    if (result.access && (role === "service_provider" || role === "admin")) {
      (await cookies()).set("accessToken", result.access);

      return {
        access: result.access,
        message: "You have successfully logged in",
        status: response.status,
      };
    }
    return {
      access: "",
      message: "An unexpected error occurred",
      status: 500,
    };
  } catch (error) {
    return {
      access: "",
      message: "An error occurred while processing your request",
      status: 500,
    };
  }
};
