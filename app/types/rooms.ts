export type RoomType = {
  id: number;
  name: string;
  description: string;
  amenities: string;
  capacity: number;
  price: string; // consider using number if it's always numeric
  units: number;
  images: ImagesType[]; // update to a custom Image type if needed
  policies: string[]; // update to a custom Policy type if needed
};

export type ImagesType = {
  id: number;
  image: string;
  alt_text: string;
  room_category: number;
};
