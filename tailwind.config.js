/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
          950: '#031826',
        },
        coral: {
          500: '#f97316',
          600: '#ea580c',
        },
        turquoise: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        sand: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5edd9',
          300: '#ecd9b5',
          800: '#785b34',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
