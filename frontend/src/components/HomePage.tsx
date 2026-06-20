import Image from "next/image";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LocationSection } from "@/components/LocationSection";
import { MenuSection } from "@/components/MenuSection";
import { ReservationForm } from "@/components/ReservationForm";
import { ReviewsSection } from "@/components/ReviewsSection";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-lago-pearl text-lago-ink dark:bg-[#06111f] dark:text-white">
      <div className="bg-decoration">
        <Image
          src="/images/bg-decoration.jpeg"
          alt=""
          fill
          className="bg-decoration-blob -right-40 -top-40 opacity-[0.06] dark:opacity-[0.04]"
          sizes="600px"
          style={{ objectPosition: "right top" }}
        />
        <Image
          src="/images/bg-decoration.jpeg"
          alt=""
          fill
          className="bg-decoration-blob -bottom-40 -left-40 opacity-[0.04] dark:opacity-[0.03]"
          sizes="500px"
          style={{ objectPosition: "left bottom" }}
        />
      </div>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <MenuSection />
        <ReservationForm />
        <ReviewsSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
