/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0B0F19',
          800: '#101827',
          700: '#111827',
        },
        accent: {
          cyan: '#00F2FE',
          blue: '#0066FF',
          electric: '#1683FF',
        },
        cloud: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'route-dash': 'routeDash 3s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,242,254,0.4)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(0,242,254,0.2)' },
        },
        routeDash: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #00F2FE, #0066FF)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
