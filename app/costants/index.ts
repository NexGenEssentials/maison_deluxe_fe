import familyRoom from "@/public/images/family_room.jpg";
import Room2 from "@/public/images/room2.jpg";
import Room3 from "@/public/images/room3.jpg";
import Room4 from "@/public/images/room4.jpg";
import Room5 from "@/public/images/room5.png";

export const roomType = [
  {
    id: 1,
    title: "Penthouse Suite",
    description:
      "The epitome of luxury living. Our Penthouse Suite features expansive interiors, panoramic city views, and a private terrace with a fireplace. Perfect for distinguished guests seeking sophistication, space, and complete privacy.",
    amenities: [
      "Up to 4 Guests",
      "1 King-Sized Bed + Lounge Area",
      "Private Terrace with Fireplace",
      "Panoramic City View",
      "Luxury Bathroom with Jacuzzi",
    ],
    available: 1,
    image: familyRoom,
  },
  {
    id: 2,
    title: "Executive Room",
    description:
      "Experience refined comfort in our Executive Room, thoughtfully designed for the modern traveler. Featuring elegant decor, a spacious layout, and premium amenities, it’s ideal for business or leisure.",
    amenities: [
      "Up to 3 Guests",
      "1 King-Sized Bed",
      "Dedicated Workspace",
      "Complimentary Mini-Bar",
      "Modern Ensuite Bathroom",
    ],
    available: 1,
    image: Room2,
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
  },
  {
    id: 4,
    title: "Deluxe Room",
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
  },
  {
    id: 5,
    title: "Standard double rooom",
    description:
      "Our Standard Double Room provides simplicity and comfort for everyday travelers. A well-appointed space with modern essentials for a restful night.",
    amenities: [
      "2 Guests",
      "1 Double Bed",
      "Compact Work Desk",
      "Private Bathroom",
      "Air Conditioning",
    ],
    available: 6,
    image: Room5,
  },
];


export const testimonials = [
  {
    name: "Sophie M.",
    country: "Kenya",
    flag: "/flags/kenya.png",
    title: "A hidden gem in Kigali!",
    image: Room5,
    description:
      "The rooms are beautiful, and the service is exceptional. Highly recommend!! 😊😇",
    rating: 4.5,
  },
  {
    name: "Jean-Pierre N.",
    country: "Rwanda",
    flag: "/flags/rwanda.png",
    title: "Feels like home",
    image: Room5,
    description:
      "From the moment I arrived, I felt welcomed. The staff went above and beyond to make my stay comfortable.",
    rating: 5,
  },
  {
    name: "Grace A.",
    country: "Ghana",
    flag: "/flags/ghana.png",
    title: "Impressive hospitality!",
    image: Room5,
    description:
      "Clean rooms, quick service, and a peaceful environment. It’s the perfect escape in the heart of the city.",
    rating: 4,
  },
];
