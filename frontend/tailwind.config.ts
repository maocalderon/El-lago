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
          navy: "#f5dc4a",
          deep: "#d4b42e",
          gold: "#f5b820",
          ocean: "#4fc3f7",
          sky: "#b3e0f5",
          cream: "#faf5e8",
          pearl: "#fdf9f0",
          ink: "#3d2e15"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(245, 220, 74, 0.25)",
        soft: "0 14px 40px rgba(245, 220, 74, 0.15)",
        "glow-blue": "0 0 30px rgba(245, 220, 74, 0.3)",
        "glow-gold": "0 0 30px rgba(245, 184, 32, 0.25)"
      },
      backgroundImage: {
        "lago-radial": "radial-gradient(circle at 15% 20%, rgba(247, 232, 78, 0.2), transparent 28%), linear-gradient(135deg, #f5dc4a 0%, #d4b42e 52%, #f5dc4a 100%)",
        "lago-waves": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120'%3E%3Cpath fill='%23f7e84e' fill-opacity='0.08' d='M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z'/%3E%3C/svg%3E\")"
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
