/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: "#01F0D0",
          200: "#072635",
          300: "#C8CCD414",
        },
        secondary: {
          100: "#FFE6F1",
          200: "#E0F3FA",
          300: "#FFE6E9",
          400: "#F4F0FE",
          500: "#707070",
          600: "#F6F7F8"
        },
      },
      fontFamily: {
        body: ['var(--font-manrope)'],
      },
    },
  },
  plugins: [],
};
