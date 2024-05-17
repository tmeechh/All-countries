/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xl': { 'max': '1200px' },
      'sl': {'max' : '1024'},
      'lg': { 'max': '991px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '550px' },
      'me': { 'max': '375px' },
      'xsm': {'max': '357px'},
    }
  },
  plugins: [],
}

