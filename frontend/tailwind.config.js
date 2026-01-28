/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // We replace the emerald/gray palette with your new theme
        primary: "#d4af37", // Gold
        "primary-soft": "#f3e5ab",
        bgDark: "#050505",
        cardBg: "rgba(255, 255, 255, 0.05)",
        textMain: "#ffffff",
        textMuted: "#a0a0a0",

        // Mapping old colors to new theme to prevent breaking old pages instantly
        emerald: {
          400: "#d4af37", // Old emerald-400 is now Gold
          500: "#c5a028",
          600: "#b08d1e", // Hover states
          700: "#8a6d15",
        },
        gray: {
          800: "#0a0a0a", // Darker cards
          900: "#050505", // Main background
        },
      },
      fontFamily: {
        display: ['"Italiana"', "serif"],
        body: ['"Outfit"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-glow":
          "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
      },
    },
  },
  plugins: [],
};
