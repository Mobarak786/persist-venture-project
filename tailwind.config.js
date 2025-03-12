import { type Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        background: {
          light: '#ffffff',
          dark: '#111827',
        },
        text: {
          light: {
            primary: '#111827',
            secondary: '#4b5563',
          },
          dark: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
          },
        },
        accent: {
          light: '#3b82f6',
          dark: '#60a5fa',
        },
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        secondary: ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        'h3': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'h6': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'small': ['0.875rem', { lineHeight: '1.25rem' }],
        'caption': ['0.75rem', { lineHeight: '1rem' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      spacing: {
        section: {
          sm: '2rem',
          md: '4rem',
          lg: '6rem',
        },
      },
    },
  },
  plugins: [],
} satisfies Config