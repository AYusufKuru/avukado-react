// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mango: { 500: "#ff7a45", 400: "#ff945f" },
      },
      boxShadow: { soft: "0 8px 24px rgba(2,6,23,.08)" },
      container: {
        center: true,
        padding: "1rem",
        screens: { lg: "1120px", xl: "1200px", "2xl": "1320px" },
      },
    },
  },
  plugins: [],
};
