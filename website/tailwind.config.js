/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        postgres: {
          DEFAULT: '#336791',
          light: '#4A8DBD',
          dark: '#1E40AF',
        },
        spark: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA580C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

