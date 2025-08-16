const { fontFamily } = require("tailwindcss/defaultTheme");
const defaultConfig = require("shadcn-ui/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    ...defaultConfig.theme, // shadcn-ui default theme
    extend: {
      fontFamily: {
        
        sans: ["'Open Sans'", "'Sansation'", "Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    // tailwind css animate install
  ],
};