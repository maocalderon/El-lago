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
          navy: "#172f4e",
          deep: "#0a2a4a",
          gold: "#f59f17",
          sky: "#a3d7df",
          cream: "#eee6d5",
          pearl: "#f8fbfd",
          ink: "#102030"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(23, 47, 78, 0.18)",
        soft: "0 14px 40px rgba(23, 47, 78, 0.1)"
      },
      backgroundImage: {
        "lago-radial": "radial-gradient(circle at 15% 20%, rgba(163, 215, 223, 0.25), transparent 28%), linear-gradient(135deg, #172f4e 0%, #0a2a4a 52%, #172f4e 100%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
