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
        primary: colors.gray,
        secondary: {
          DEFAULT: '#282B28',
          hover: '#3D423D'
        },
        accent: {
          dark: '#C9C79C',
          darkest: '#949476',
          DEFAULT: '#FFFCC3',
          lightdark: '#FCF9C1',
          semidark: '#F6F3B6'
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
    extend: {
      textColor: ['disabled']
    },
  },
  plugins: [],
}
