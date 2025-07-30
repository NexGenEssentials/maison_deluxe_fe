export type RoomType = {
  id: number;
  name: string;
  description: string;
  amenities: string;
  capacity: number;
  price: string; 
  units: number;
  images: ImagesType[]; 
  policies: string[]; 
};

export type ImagesType = {
  id: number;
  image: string;
  alt_text: string;
  room_category: number;
};
