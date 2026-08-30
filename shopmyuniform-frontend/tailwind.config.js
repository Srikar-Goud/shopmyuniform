/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B3A6B", // brand blue - nav bar, headings, primary buttons
          light: "#2F5FAE", // hover state
          dark: "#26272B", // near-black, used for body text
        },
        maroon: "#FB641B", // accent orange - sale tags, category labels
        cream: "#F1F3F6", // light neutral page background
        mustard: "#FF9F00", // accent orange/gold - highlights, badges
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};