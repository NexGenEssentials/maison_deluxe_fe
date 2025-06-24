export type BookingData = {

};
export type BookingDetails = {
  room_category: {
    name: string;
    description: string;
    amenities: string;
    units: number;
    price: string;
    capacity: number;
  };
  room_category_id: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string; 
  check_out: string;
  guests: number;
  total_price: string;
  note: string;
};
export type BookingResponse = {

};
export type PaymentResponseType = {};

