/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@vic-rep/design-system/tailwind-preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@vic-rep/design-system/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
