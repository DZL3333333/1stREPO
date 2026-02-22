/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Claude.ai-inspired dark palette
        surface: {
          DEFAULT: '#1a1a1a',
          50: '#2a2a2a',
          100: '#222222',
          200: '#1a1a1a',
          300: '#141414',
          400: '#0f0f0f',
        },
        accent: {
          DEFAULT: '#c07a3a',
          hover: '#d4883e',
          muted: 'rgba(192,122,58,0.15)',
        },
        border: 'rgba(255,255,255,0.08)',
        textPrimary: '#f0ece4',
        textSecondary: '#9a9287',
        textMuted: '#6b6560',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
