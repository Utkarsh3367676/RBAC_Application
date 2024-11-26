/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#1a1a1a",
          card: "#2d2d2d",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
