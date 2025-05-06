/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#481231',
        lightblue: '#e3f2fe',
        skyblue: '#bfdaf7',
        orangebright: '#fe4939',
        cafelatte: '#78614d',
        grenadine: '#D44720',
        beeswax: '#E9a752',
        darlington: '#accab2',
      },
      fontFamily: {
        heading: ['AtlasBold', 'sans-serif'],
        body: ['TiemposTextRegular', 'serif'],
      },
      fontSize: {
        mdplus: '1.175rem',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
    },
  },
  plugins: [],
};
