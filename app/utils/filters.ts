
import { RoomType } from "../types/rooms";

export const getRoomByTitle = (
  title: string,
  roomType: RoomType[]
): RoomType => {
  const room = roomType.find(
    (room) => room.name.toLowerCase() === title.toLowerCase()
  );
  if (!room) {
    throw new Error(`Room with title "${title}" not found`);
  }
  return room;
};

export type RoomNameId = {
  id: number;
  name: string;
};
export const filterRoomNames = (rooms: RoomType[]): RoomNameId[] => {
  return rooms.map((room) => ({ id: room.id, name: room.name }));
};
