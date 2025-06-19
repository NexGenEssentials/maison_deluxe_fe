import familyRoom from "@/public/images/luxe/room1.jpg";
import Room2 from "@/public/images/luxe/room4.jpg";
import Room3 from "@/public/images/luxe/room3.jpg";
import Room4 from "@/public/images/luxe/room8.jpg";
import Room5 from "@/public/images/luxe/room5.jpg";
import Room6 from "@/public/images/luxe/room6.jpg";
import slide1 from "@/public/images/slide3.jpg";
import profile from "@/public/images/profile.jpg";
import p3 from "@/public/images/p3.png";
import p2 from "@/public/images/p2.png";
import p4 from "@/public/images/placeholder.webp";
import rw from "@/public/images/rw.png";
import us from "@/public/images/us.jpg";
import kny from "@/public/images/kny.png";
import rec from "@/public/images/luxe/room3.jpg";
import dine from "@/public/images/luxe/dine.jpg";

export const roomType = [
  {
    id: 1,
    title: "Penthouse Suite",
    description:
      "The epitome of luxury living. Our Penthouse Suite features expansive interiors, panoramic city views, and a private terrace with a fireplace. Perfect for distinguished guests seeking sophistication, space, and complete privacy.",
    amenities: [
      "Up to 2 Guests",
      "1 King-Sized Bed + Lounge Area",
      "Private Terrace with Fireplace",
      "Panoramic City View",
      "Luxury Bathroom with Jacuzzi",
    ],
    available: 1,
    image: familyRoom,
    price: 150,
  },
  {
    id: 2,
    title: "Executive Room",
    description:
      "Experience refined comfort in our Executive Room, thoughtfully designed for the modern traveler. Featuring elegant decor, a spacious layout, and premium amenities, it’s ideal for business or leisure.",
    amenities: [
      "Up to 2 Guests",
      "1 King-Sized Bed",
      "Dedicated Workspace",
      "Complimentary Mini-Bar",
      "Modern Ensuite Bathroom",
    ],
    available: 1,
    image: Room2,
    price: 130,
  },
  {
    id: 3,
    title: "Junior Suit",
    description:
      "Stylish and comfortable, the Junior Suite offers extra space to unwind with a separate lounge corner. Ideal for couples or solo travelers seeking elevated relaxation and function.",
    amenities: [
      "2 Guests",
      "1 Queen-Sized Bed + Lounge Area",
      "Spacious Sitting Area",
      "Smart TV & Desk",
      "Walk-In Shower",
    ],
    available: 1,
    image: Room3,
    price: 140,
  },
  {
    id: 4,
    title: "Deluxe City View",
    description:
      "Designed with comfort and elegance in mind, the Deluxe Room offers a cozy retreat with tasteful furnishings and all the essentials for a relaxing stay.",
    amenities: [
      "2 Guests",
      "1 Queen-Sized Bed",
      "En-Suite Bathroom",
      "Flat-Screen TV",
      "Tea & Coffee Station",
    ],
    available: 2,
    image: Room4,
    price: 120,
  },
  {
    id: 5,
    title: "Standard Double Room",
    description:
      "Our Standard Double Room provides simplicity and comfort for everyday travelers. A well-appointed space with modern essentials for a restful night.",
    amenities: [
      "2 Guests",
      "1 Double Bed",
      "Compact Work Desk",
      "Private Bathroom",
      "Air Conditioning",
    ],
    available: 4,
    image: Room5,
    price: 100,
  },
  {
    id: 6,
    title: "Standard single Room",
    description:
      "Our Standard Double Room provides simplicity and comfort for everyday travelers. A well-appointed space with modern essentials for a restful night.",
    amenities: [
      "1 Guests",
      "1 Double Bed",
      "Compact Work Desk",
      "Private Bathroom",
      "Air Conditioning",
    ],
    available: 2,
    image: Room6,
    price: 90,
  },
];

export const testimonials = [
  {
    name: "Sophie M.",
    country: "Kenya",
    flag: kny,
    title: "A hidden gem in Kigali!",
    image: profile,
    description:
      "The rooms are beautiful, and the service is exceptional. Highly recommend!! 😊😇",
    rating: 4.5,
  },
  {
    name: "Jean-Pierre N.",
    country: "Rwanda",
    flag: rw,
    title: "Feels like home",
    image: p2,
    description:
      "From the moment I arrived, I felt welcomed. The staff went above and beyond to make my stay comfortable.",
    rating: 5,
  },
  {
    name: "Grace A.",
    country: "USA",
    flag: us,
    title: "Impressive hospitality!",
    image: p3,
    description:
      "Clean rooms, quick service, and a peaceful environment. It’s the perfect escape in the heart of the city.",
    rating: 4,
  },
  {
    name: "Makenzi A.",
    country: "Rwanda",
    flag: rw,
    title: "Exceptional Experience!",
    image: p4,
    description:
      "The attention to detail, warm staff, and serene atmosphere made my stay truly unforgettable. Highly recommended!",
    rating: 5,
  },
];

export const slides = [
  {
    title: "Prime Location in Kigali",
    description:
      "Located in the heart of the city, our hotel offers easy access to top attractions like the Kigali Convention Centre, Kigali Heights, and vibrant local markets — making your stay convenient and exciting.",
    image: slide1,
  },
  {
    title: "Exceptional Dining Experience",
    description:
      "Enjoy a diverse menu of international and Rwandan cuisine prepared by top chefs. Whether it’s a breakfast buffet or an evening à la carte dinner, we promise a delightful culinary experience.",
    image: dine,
  },
  {
    title: "Modern & Comfortable Rooms",
    description:
      "Experience luxury and comfort in our fully equipped rooms featuring high-speed Wi-Fi, air conditioning, smart TVs, and breathtaking city views — perfect for both business and leisure travelers.",
    image: rec,
  },
];

export const rules = [
  {
    label: "Check-in:",
    value: "From 11:00 PM",
  },
  {
    label: "Check-out:",
    value: "Until 10:00 AM",
  },
  {
    label: "Cancellation/Prepayment:",
    value:
      "Policies vary by room type and booking conditions. Check your booking confirmation for more information.",
  },
  {
    label: "Children & Extra Beds:",
    value:
      "Extra person rate applies to any additional person staying in the room apart from the main guest.",
  },
  {
    label: "Pets:",
    value: "Pets are not allowed.",
  },
  {
    label: "Smoking:",
    value: "Smoking is not allowed.",
  },
  {
    label: "ID & Age Requirements:",
    value:
      "Valid government-issued ID is required at check-in. Minimum age to book a room is 18.",
  },
  {
    label: "Extra Cost:",
    value: "$15.00 will be charged for late checkout. ",
  },
  {
    label: "Transport:",
    value: "$25.00 will be charged for private transportation in kigali.",
  },
];

export const TableHeaders = [
  "Rooms Category",
  "Room Facilities",
  "Max Per Room",
  "Price Per Room (USD)",
  "Extra Person Rate (Adult)",
  "Extra Person Rate (Child)",
  "BreakFast Per Person (USD)",
  "Airport TransfersPer Person (USD)",
];

export const ExtraInfoData = [
  {
    title: "Breakfast",
    color: "text-red-600",
    points: [
      "Breakfast is served daily from 7.00 – 10.00am.",
      "No Pets , No Smoking",
    ],
  },
  {
    title: "Check – in /Check-out",
    color: "text-red-500",
    points: [
      "Check- out is not later than 10AM and Check – in starts at 11PM.",
    ],
  },
  {
    title: "Extra person rate",
    color: "text-red-500",
    points: [
      "Extra person rate applies to any additional person staying in the room apart from the main guest.",
    ],
  },
  {
    title: "Extra Cost",
    color: "text-red-600",
    points: [
      "$15.00 will be charged for late checkout.",
      "$25.00 will be charged for private transportation in Kigali.",
    ],
  },
];

export const Services = [
  {
    title: "City Tour",
    description:
      "Discover the vibrant culture and hidden gems of our city with our guided tours. From historical landmarks to local food experiences, our city tour is perfect for travelers who want a deep dive into what makes the city unique.",
    image: "/images/slide3.jpg",
  },
  {
    title: "Airport Transfer",
    description:
      "Start and end your journey stress-free with our reliable airport transfer service. Our professional drivers ensure timely pick-up and drop-off, so you can travel with peace of mind.",
    image: "/images/airport.jpg",
  },
  {
    title: "Transport",
    description:
      "Need to get around town or travel to a nearby destination? Our transport services offer private and group options to fit your schedule, comfort, and budget. Travel with safety and ease.",
    image: "/images/tax.webp",
  },
  {
    title: "City Tour",
    description:
      "Discover the vibrant culture and hidden gems of our city with our guided tours. From historical landmarks to local food experiences, our city tour is perfect for travelers who want a deep dive into what makes the city unique.",
    image: "/images/slide3.jpg",
  },
  {
    title: "Airport Transfer",
    description:
      "Start and end your journey stress-free with our reliable airport transfer service. Our professional drivers ensure timely pick-up and drop-off, so you can travel with peace of mind.",
    image: "/images/airport.jpg",
  },
  {
    title: "Transport",
    description:
      "Need to get around town or travel to a nearby destination? Our transport services offer private and group options to fit your schedule, comfort, and budget. Travel with safety and ease.",
    image: "/images/tax.webp",
  },
];

export const clientData: ClientData[] = [
  {
    id: "1",
    name: "Mutamuliza Claudine",
    status: "Success",
    checkInOut: "06-06-2025",
    bookingDate: "06-06-2025",
    avatar: "MC",
  },
  {
    id: "2",
    name: "Mutamuliza Claudine",
    status: "Destructive",
    checkInOut: "06-06-2025",
    bookingDate: "06-06-2025",
    avatar: "MC",
  },
  {
    id: "3",
    name: "Mutamuliza Claudine",
    status: "Available",
    checkInOut: "06-06-2025",
    bookingDate: "06-06-2025",
    avatar: "MC",
  },
  {
    id: "4",
    name: "Mutamuliza Claudine",
    status: "Destructive",
    checkInOut: "06-06-2025",
    bookingDate: "06-06-2025",
    avatar: "MC",
  },
  {
    id: "5",
    name: "Mutamuliza Claudine",
    status: "Available",
    checkInOut: "06-06-2025",
    bookingDate: "06-06-2025",
    avatar: "MC",
  },
  {
    id: "6",
    name: "Mutamuliza Claudine",
    status: "Pending",
    checkInOut: "06-06-2025",
    bookingDate: "06-06-2025",
    avatar: "MC",
  },
];

export interface ClientData {
  id: string;
  name: string;
  status: "Success" | "Destructive" | "Available" | "Pending";
  checkInOut: string;
  bookingDate: string;
  avatar: string;
}

export interface RoomCategory {
  id: number;
  name: string;
  description: string;
  units: number;
  price: string;
  capacity: number;
}

export interface Booking {
  id: number;
  room_category: RoomCategory;
  room_category_id: number;
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
  note?: string;
}

export const dummyBookings: Booking[] = [
  {
    id: 1,
    room_category: {
      id: 1,
      name: "Deluxe Room",
      description: "A deluxe room with all amenities",
      units: 2,
      price: "150.00",
      capacity: 2,
    },
    room_category_id: 1,
    guest_name: "John Doe",
    guest_email: "john@example.com",
    guest_phone: "1234567890",
    check_in: "2025-07-01",
    check_out: "2025-07-05",
    guests: 2,
    total_price: "600.00",
    status: "Confirmed",
    booking_reference: "ABC123456",
    created_at: "2025-06-01T10:00:00Z",
    note: "Early check-in if possible",
  },
  {
    id: 2,
    room_category: {
      id: 1,
      name: "Deluxe Room",
      description: "A deluxe room with all amenities",
      units: 2,
      price: "150.00",
      capacity: 2,
    },
    room_category_id: 1,
    guest_name: "John Doe",
    guest_email: "john@example.com",
    guest_phone: "1234567890",
    check_in: "2025-07-01",
    check_out: "2025-07-05",
    guests: 2,
    total_price: "600.00",
    status: "Confirmed",
    booking_reference: "ABC123456",
    created_at: "2025-06-01T10:00:00Z",
    note: "Early check-in if possible",
  },
  {
    id: 3,
    room_category: {
      id: 1,
      name: "Deluxe Room",
      description: "A deluxe room with all amenities",
      units: 2,
      price: "150.00",
      capacity: 2,
    },
    room_category_id: 1,
    guest_name: "John Doe",
    guest_email: "john@example.com",
    guest_phone: "1234567890",
    check_in: "2025-07-01",
    check_out: "2025-07-05",
    guests: 2,
    total_price: "600.00",
    status: "Confirmed",
    booking_reference: "ABC123456",
    created_at: "2025-06-01T10:00:00Z",
    note: "Early check-in if possible",
  },
];