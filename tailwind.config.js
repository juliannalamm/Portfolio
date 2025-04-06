/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
      './src/components/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {
        fontFamily: {
          heading: ['AtlasBold', 'sans-serif'],
          body: ['TiemposTextRegular', 'serif'],
        },
        fontSize: {
          mdplus: '1.175rem'
        },
      },
    },
    plugins: [],
  };
  