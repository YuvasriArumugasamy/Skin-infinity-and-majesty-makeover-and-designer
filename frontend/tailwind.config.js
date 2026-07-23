/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxuryPink: '#FAD7E6',
        luxuryRoseGold: '#B76E79',
        luxuryGold: '#D4AF37',
        luxuryDark: '#2C2225',
        luxurySubtle: '#FFF5F8',
        luxuryBorder: '#F4C2D7'
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 10px 30px -5px rgba(183, 110, 121, 0.15)',
        glow: '0 0 25px rgba(212, 175, 55, 0.3)',
        card: '0 15px 35px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
