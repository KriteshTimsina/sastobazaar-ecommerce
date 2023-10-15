/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        navtop: "80px",
      },
      colors: {
        primary: "#3b82f6",
        secondary: "#c2410c",
        graded: "#F5F7F9",
        darkbg: "#111827",
        darktext: "#fff",
        util: "#e4e4e4",
        darkSecondary:"#1e293b"
      },
      boxShadow: {
        card: " rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;",
      },
    },
  },
  plugins: [],
};
