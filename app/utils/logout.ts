"use client";
import Cookies from "js-cookie";

export const Logout = async (): Promise<boolean> => {
  Cookies.remove("accessToken");

  return true;
};
