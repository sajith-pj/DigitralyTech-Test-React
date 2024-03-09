/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5D5FEF",
        text_color: "#05004E",
        sub_text: "#737791",
        secondary_bg: "#FAFBFC",
      },
      fontFamily: {
        Poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
