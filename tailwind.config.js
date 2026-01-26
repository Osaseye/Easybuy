/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#22C55E",
        "background-light": "#F9FAFB",
        "background-dark": "#111827",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1F2937",
        "navy": "#1E3A8A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

