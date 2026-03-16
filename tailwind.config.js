/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        'glass-black': '#0a0a0a',
        'glass-black-light': '#1a1a1a',
        'glass-silver': '#c0c0c0',
        'glass-silver-light': '#e8e8e8',
        'glass-silver-dark': '#909090',
        'glass-chrome': '#d4d4d4',
        'glass-gunmetal': '#2a3439',
      },
      // Background Gradients
      backgroundImage: {
        'silver-gradient': 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 50%, #c0c0c0 100%)',
        'chrome-gradient': 'linear-gradient(135deg, #d4d4d4 0%, #ffffff 50%, #d4d4d4 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.05) 100%)',
        'space-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #000000 100%)',
        'metallic-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a3439 50%, #1a1a1a 75%, #0a0a0a 100%)',
        'silver-mesh': 'radial-gradient(circle at 20% 80%, rgba(192, 192, 192, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      // Backdrop Blur
      backdropBlur: {
        'glass': '10px',
        'glass-light': '5px',
        'glass-heavy': '15px',
      },
      // Box Shadow
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-button': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      // Border Color
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-light': 'rgba(255, 255, 255, 0.05)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
