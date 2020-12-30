module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.tsx'],
  theme: {
    typography: (theme) => ({}),
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
