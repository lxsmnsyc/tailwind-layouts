module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.tsx',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
