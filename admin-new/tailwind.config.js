/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,html}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["business"]
  },
  plugins: [require("daisyui")],
}

