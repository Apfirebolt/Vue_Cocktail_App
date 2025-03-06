/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        //If you want to keep the primary color you had, you can
        primary: {
          100: "#27391C",
          200: "#255F38",
          300: "#1F7D53",
        },
        //If you want to keep the secondary color you had, you can.
        secondary: {
          100: "#C7D9DD",
          200: "#D5E5D5",
          300: "#EEF1DA",
        },
      },
    },
  },
  plugins: [],
};