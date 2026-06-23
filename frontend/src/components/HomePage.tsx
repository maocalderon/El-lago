import Image from "next/image";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { EventHallSection } from "@/components/EventHallSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LakeSection } from "@/components/LakeSection";
import { LocationSection } from "@/components/LocationSection";
import { MenuSection } from "@/components/MenuSection";
import { ReservationForm } from "@/components/ReservationForm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { WaveDivider } from "@/components/WaveDivider";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-lago-pearl text-lago-ink dark:bg-[#0d1a2e] dark:text-white">
      <Header />
      <main>
        <Hero />
        <LakeSection />
        <WaveDivider variant="dark" />
        <AboutSection />
        <WaveDivider variant="light" />
        <MenuSection />
        <WaveDivider variant="white" />
        <EventHallSection />
        <WaveDivider variant="dark" />
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
