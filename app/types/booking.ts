export type BookingData = {
  id: number;
  room_category: RoomCategory;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: string;
  status: string;
  booking_reference: string;
  created_at: string;
  updated_at: string;
  note: string;
};
export type BookingDetails = {
  room_category_id: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  note: string;
};

export type BookingResponse = {
  status: "success";
  message: string;
  data: BookingData[];
};

export type RoomCategory = {
  name: string;
  description: string;
  amenities: string[] | Record<string, any>; // Adjust if structure is known
  units: number;
  price: string;
  capacity: number;
};

export type PaymentResponseType = {
  authkey: string;
  refid: string;
  reply: string;
  retcode: number;
  success: number;
  tid: string;
  url: string;
};
