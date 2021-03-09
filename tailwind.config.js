const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    // typography: (theme) => ({}),
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        rose: colors.rose,
        indigo: {
          500: '#64b4ed',
          600: '#3da1e9',
          700: '#3181ba',
        },
      },
      screens: {
        print: { raw: 'print' },
      },
      gridTemplateColumns: {
        'ingredient-row': 'repeat(9, minmax(0, 1fr)) auto',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
};
