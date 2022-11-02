/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'transform-origin': 'top center',
        'animation': 'slideDown 300ms (num * 60ms) ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
