import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Outfit, Playfair_Display } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Restaurante El Lago | Tradición y sabor en Cúcuta",
  description:
    "Restaurante en Cúcuta con tradición culinaria y ambiente único. Reserva tu mesa y consulta nuestro menú digital.",
  metadataBase: new URL("https://restauranteellago.com"),
  openGraph: {
    title: "Restaurante El Lago | Tradición y sabor en Cúcuta",
    description:
      "Restaurante en Cúcuta con tradición culinaria y ambiente único. Reserva tu mesa y consulta nuestro menú digital.",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/images/el-lago-hero.png",
        width: 1200,
        height: 630,
        alt: "Restaurante El Lago en Cúcuta"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurante El Lago | Tradición y sabor en Cúcuta",
    description:
      "Restaurante en Cúcuta con tradición culinaria y ambiente único. Reserva tu mesa y consulta nuestro menú digital.",
    images: ["/images/el-lago-hero.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061d35"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
