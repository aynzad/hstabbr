const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './app/**/*.{js,jsx,tsx}',
    './pages/**/*.{js,jsx,tsx}',
    './components/**/*.{js,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      fontSize: {
        '10xl': ['13.975rem', '1']
      },
      colors: {
        primary: '#673FC0',
        'primary-lighter': '#B4BCD0',
        'primary-light': '#A3A4AC',
        'primary-dark': '#444B5C',
        'primary-darker': '#71727B',
        'primary-darken': '#000212',
        'primary-glass': '#0E1120'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
