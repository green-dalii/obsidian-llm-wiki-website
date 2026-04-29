/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          bg: '#1a1a1a',
          surface: '#222222',
          panel: '#2a2a2a',
          card: '#252525',
          text: '#d4d4d4',
          heading: '#e8e8e8',
          muted: '#a3a3a3',
          dim: '#6b6b6b',
          border: '#2e2e2e',
          'border-light': '#3a3a3a',
          purple: '#8b5cf6',
          'purple-light': '#a78bfa',
          'purple-dark': '#7c3aed',
          'purple-glow': 'rgba(139,92,246,0.15)',
          amber: '#d97706',
          gold: '#ca8a04',
        },
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '12px',
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      keyframes: {
        fadeSlideIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        fadeSlideIn: "fadeSlideIn 0.5s ease-out forwards",
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
