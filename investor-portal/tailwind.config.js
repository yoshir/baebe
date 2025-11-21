/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hacker-green': '#00ff41',
        'hacker-dark': '#0a0a0a',
        'hacker-darker': '#000000',
        'hacker-gray': '#1a1a1a',
        'hacker-light-gray': '#2a2a2a',
      },
      fontFamily: {
        'mono': ['VT323', 'DejaVu Sans Mono', 'Liberation Mono', 'Noto Mono', 'Ubuntu Mono', 'Inconsolata', 'Courier New', 'Courier', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' },
          '100%': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#00ff41' },
        },
      },
    },
  },
  plugins: [],
}






