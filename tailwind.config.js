/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}
