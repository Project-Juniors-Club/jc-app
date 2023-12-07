/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        'main-green': '#A9D357',
        'main-light-green': '#EBF8D3',
        'btn-green': '#7FB519',
        'dark-gray': '#385600',
        'hover-dark-gray': '#2D2D2D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
