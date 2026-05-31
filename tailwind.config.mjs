/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#7A9E7E',
          light: '#C8DECA',
          dark: '#5e8463',
        },
        cream: '#F7F3EC',
        terracotta: {
          DEFAULT: '#C4714A',
          dark: '#a85c38',
          light: '#e8c4b0',
        },
        forest: {
          DEFAULT: '#2C3E2D',
          light: '#3d5a3e',
          dark: '#1e2d1f',
        },
        sand: '#E8DECE',
        // kept for any residual usage
        warm: '#f5e6c8',
        navy: {
          DEFAULT: '#2d3d5a',
          dark: '#1e2d44',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'orbit': 'orbit 28s linear infinite',
        'orbit-reverse': 'orbit 20s linear infinite reverse',
        'hero-drift': 'heroDrift 6s ease-in-out infinite alternate',
      },
      keyframes: {
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        heroDrift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(12px,20px) scale(1.04)' },
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 56px rgba(0,0,0,0.13)',
        terracotta: '0 8px 28px rgba(196,113,74,0.28)',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
