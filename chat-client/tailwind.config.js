/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom': '2px 2px 4px 1px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}

