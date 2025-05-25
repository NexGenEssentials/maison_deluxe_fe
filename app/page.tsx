import ContactForm from "./components/common/contxtUs";
import StayWithUs from "./components/common/stayWithUs";
import Testimonials from "./components/common/testimonia";
import Title from "./components/common/title";
import HeroSection from "./components/hero/heroSection";
import Navbar from "./components/navbar/navbar";
import RoomCategory from "./components/rooms/roomCategory";

export default function Home() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          =
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/heroBgImage.jpg')",
            }}
          />
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-b from-primaryBlue/50 via-primaryBlue/10 to-transparent " />
          </div>
          <div className="absolute inset-0 bg-primaryBlue/40" />
        </div>

        <div className="relative z-10 h-full">
          <Navbar />
          <div className="px-4 lg:px-12 max-w-[1560px] mx-auto">
            <HeroSection />
          </div>
        </div>
      </div>
      <RoomCategory />
      <StayWithUs />
      {/* <Testimonials /> */}
      <ContactForm />
    </>
  );
}
