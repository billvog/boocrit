const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
        slab: ['Roboto Slab']
      },
      colors: {
        primary: colors.white,
        secondary: {
          DEFAULT: '#282B28',
          hover: '#3D423D'
        },
        accent: {
          dark: '#C9C79C',
          DEFAULT: '#FFFCC3',
          lightdark: '#FCF9C1'
        },
        green: {
          dark: '#567469',
          light: '#9DE5CD',
          DEFAULT: '#6D9889',
          hover: "#7CA295"
        },
        brown: {
          DEFAULT: '#A24936',
          hover: "#AB5B4A"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
