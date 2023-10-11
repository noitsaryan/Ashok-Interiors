/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        Primary: '#FFF',
        Secondary:"#FF5C5C",
        PrimaryText: "#535353",
        SecondaryText: '#A8A8A8',
        Accent:"#FFDAB9",
        Hover:'#E0FFFF'
      }
    },
  },
  plugins: [],
}
