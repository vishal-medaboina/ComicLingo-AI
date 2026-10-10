/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#061a1e',
          900: '#0b2b32',
          850: '#0e3740',
          800: '#134753',
          700: '#1b6170',
          600: '#267f92',
          500: '#34a0b7',
        },
        coral: {
          50: '#fff5f3',
          100: '#ffe8e5',
          200: '#ffd5ce',
          300: '#ffb3a7',
          400: '#ff8674',
          500: '#ff5c45',
          600: '#ee3e25',
          700: '#c82e17',
        },
        paper: {
          50: '#fcfbf9',
          100: '#f9f6f0',
          200: '#f4efe6',
          300: '#eae2d5',
          400: '#dcd1c1',
          900: '#1e1c18',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        comic: ['"Outfit"', '"Fredoka"', 'system-ui', 'sans-serif'],
        bangers: ['"Bangers"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        comic: '4px 4px 0px 0px rgba(15, 43, 50, 0.9)',
        'comic-sm': '2px 2px 0px 0px rgba(15, 43, 50, 0.9)',
        'comic-lg': '6px 6px 0px 0px rgba(15, 43, 50, 0.9)',
        'comic-coral': '4px 4px 0px 0px rgba(238, 62, 37, 0.8)',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        floatBubble: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUpFade: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 2.5s ease-in-out infinite',
        'float-bubble': 'floatBubble 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pop-in': 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-up': 'slideUpFade 0.4s ease-out forwards',
      }
    },
  },
  plugins: [],
}
