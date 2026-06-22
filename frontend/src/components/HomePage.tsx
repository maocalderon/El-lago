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
    <div className="min-h-screen overflow-x-hidden bg-lago-pearl text-lago-ink dark:bg-[#0d1a2e] dark:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] opacity-[0.07] dark:opacity-[0.05]">
          <Image
            src="/images/bg-whatsapp.jpeg"
            alt=""
            fill
            className="rounded-full object-cover blur-3xl"
            sizes="500px"
          />
        </div>
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] opacity-[0.05] dark:opacity-[0.03]">
          <Image
            src="/images/bg-whatsapp.jpeg"
            alt=""
            fill
            className="rounded-full object-cover blur-3xl"
            sizes="400px"
          />
        </div>
        <div className="absolute left-1/3 top-1/4 h-72 w-72 opacity-[0.04] dark:opacity-[0.03]">
          <Image
            src="/images/bg-whatsapp.jpeg"
            alt=""
            fill
            className="rounded-full object-cover blur-3xl"
            sizes="300px"
          />
        </div>
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
