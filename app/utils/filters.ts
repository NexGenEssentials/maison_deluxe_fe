import { StaticImageData } from "next/image";
import { roomType } from "../costants";

export const getRoomByTitle = (
  title: "Penthouse Suite"
): {
  id: number;
  title: string;
  description: string;
  amenities: string[];
  available: number;
  image: StaticImageData;
} => {
  const room = roomType.find(
    (room) => room.title.toLowerCase() === title.toLowerCase()
  );
  if (!room) {
    throw new Error(`Room with title "${title}" not found`);
  }
  return room;
};
