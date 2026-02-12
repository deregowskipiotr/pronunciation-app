/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff", // soft blue
          500: "#3b82f6", // sharp blue
          900: "#1e3a8a", // deep blue
        },
        slate: {
          950: "#0a0f1a", // true black-ish
        },
      },
      borderRadius: {
        md: "0.5rem",
      },
      boxShadow: {
        md: "0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    },
  },
};
