'use server'
import { cookies } from "next/headers";

const base_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export type Message = {
  full_name: string;
  email: string;
  message: string;
  phone: string;
  seen: boolean;
};
export const getMessages = async (): Promise<{
  status: string;
  message: string;
  data: Message[];
}> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await fetch(`${base_url}/contact-us/`, {
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
