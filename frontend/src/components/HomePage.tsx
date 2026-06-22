import Image from "next/image";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LakeSection } from "@/components/LakeSection";
import { LocationSection } from "@/components/LocationSection";
import { MenuSection } from "@/components/MenuSection";
import { ReservationForm } from "@/components/ReservationForm";
import { ReviewsSection } from "@/components/ReviewsSection";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-lago-pearl text-lago-ink dark:bg-[#0d1a2e] dark:text-white">
      <Header />
      <main>
        <Hero />
        <LakeSection />
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
