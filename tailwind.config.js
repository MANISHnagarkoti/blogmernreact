/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      colors: {
        myColor: {

          400: "#f87171",
          600: "#dc2626",
          700: "#d9baf1"

        }


      }



    },
  },
  plugins: [],
}