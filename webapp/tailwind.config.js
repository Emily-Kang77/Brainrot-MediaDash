/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-600": "#6C47FF",
        "primary-700": "#5639CC",
        "primary-50": "#F4F2FF",
        "success-700": "#027A48",
        "success-50": "#ECFDF3",
        "background-color": "#0B1215"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      padding: {
        "screen-1440": "150px",
        "screen-1200": "120px",
        "screen-992": "70px",
        "screen-768": "40px",
        "screen-320": "16px",
      },
    },
  },
  plugins: [require("daisyui")],
  plugins: [
    require('daisyui'),
      require("tailwindcss-animate")
],
};
