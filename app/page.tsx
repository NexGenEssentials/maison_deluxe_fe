import ContactForm from "./components/common/contxtUs";
import StayWithUs from "./components/common/stayWithUs";
import Testimonials from "./components/common/testimonia";
import FooterSection from "./components/footer/footer";
import HeroSection from "./components/hero/heroSection";
import Navbar from "./components/navbar/navbar";
import RoomCategory from "./components/rooms/roomCategory";
import ServiceSection from "./components/service/service";

export default function Home() {
  return (
    <section className="lg:bg-secondaryBlue ">
      <div className="max-w-[1756px] mx-auto ">
        <div className="relative max-2xl:h-screen lg:h-[800px] w-full ">
          <div className="absolute inset-0">
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
            <div className="max-lg:absolute max-lg:top-1/3 px-4 lg:px-12 ">
              <HeroSection />
            </div>
          </div>
        </div>
        <RoomCategory />
        <StayWithUs />
        <Testimonials />
        <ServiceSection />
        <ContactForm />
        <FooterSection />
      </div>
    </section>
  );
}
