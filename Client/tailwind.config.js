/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'light':'#FF9209',
        'lightdark':'#FF6C22'
      }
    },
  },
  plugins: [],
}

