import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        lago: {
          navy: "#1e7fa0",
          deep: "#136180",
          gold: "#f5b820",
          ocean: "#4fc3f7",
          sky: "#b3e0f5",
          cream: "#f8f4ed",
          pearl: "#eef6fb",
          ink: "#1a4a6b"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(30, 127, 160, 0.2)",
        soft: "0 14px 40px rgba(30, 127, 160, 0.12)",
        "glow-blue": "0 0 30px rgba(30, 127, 160, 0.25)",
        "glow-gold": "0 0 30px rgba(245, 184, 32, 0.25)"
      },
      backgroundImage: {
        "lago-radial": "radial-gradient(circle at 15% 20%, rgba(79, 195, 247, 0.15), transparent 28%), linear-gradient(135deg, #1e7fa0 0%, #136180 52%, #1e7fa0 100%)",
        "lago-waves": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120'%3E%3Cpath fill='%234fc3f7' fill-opacity='0.08' d='M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z'/%3E%3C/svg%3E\")"
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        ripple: "ripple 3s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite"
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Arial", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
