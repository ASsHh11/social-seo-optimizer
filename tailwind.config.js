/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0F19",
        indigoGlow: "#6366F1",
        violetGlow: "#8B5CF6"
      },
      animation: {
        glow: "glow 4s ease-in-out infinite",
        pulseSlow: "pulse 5s infinite"
      },
      keyframes: {
        glow: {
          "0%,100%": {
            opacity: 0.4,
            transform: "scale(1)"
          },
          "50%": {
            opacity: 0.8,
            transform: "scale(1.1)"
          }
        }
      }
    }
  },
  plugins: []
};
