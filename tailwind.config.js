/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EBE3D5',
          400: '#D6C8B5',
        },
        sage: {
          50: '#F2F7F4',
          100: '#E2ECE5',
          500: '#5F8670',
          600: '#4A6B58',
          700: '#385243',
          800: '#2A3F33',
        },
        terracotta: {
          50: '#FDF5F2',
          100: '#FBE8E1',
          500: '#B85C38',
          600: '#9B4B2C',
          700: '#7E3B21',
        },
        wood: {
          500: '#8D6E63',
          600: '#6D4C41',
          700: '#5D4037',
          800: '#4E342E',
          900: '#3E2723',
        }
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '50%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184, 92, 56, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(184, 92, 56, 0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' },
        }
      },
      animation: {
        pop: 'pop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        bounceSubtle: 'bounceSubtle 2s infinite ease-in-out',
        pulseGlow: 'pulseGlow 2s infinite',
        shake: 'shake 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}
