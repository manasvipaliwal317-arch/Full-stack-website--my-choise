import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        luxury: {
          gold: "#D4AF37",
          "gold-light": "#F3E5AB",
          "gold-dark": "#AA7C11",
          emerald: "#10B981",
          obsidian: "#090A0F",
          charcoal: "#12141D",
          card: "rgba(255, 255, 255, 0.03)",
          "card-border": "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite linear",
        "pulse-glow": "pulseGlow 3s infinite ease-in-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA7C11 100%)",
        "emerald-gradient": "linear-gradient(135deg, #34D399 0%, #059669 100%)",
        "dark-radial": "radial-gradient(ellipse at top, #1E202E 0%, #090A0F 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
