const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#001b30ff',
        'prussian-blue': '#012a4aff',
        'indigo-dye': '#013a63ff',
        'indigo-dye-2': '#014f86ff',
        'cerulean': '#2c7da0ff',
        'turquoise': '#63e7d8ff',
        'azure-web': '#f5feffff',
        'cadet-grey': '#99b3b6ff',
        'rich-black': '#000e18ff',
        'rich-black-2': '#001524ff',
      },
      backgroundImage: {
        'gradient-top': 'linear-gradient(0deg, #001b30ff, #012a4aff, #013a63ff, #014f86ff, #2c7da0ff, #63e7d8ff, #f5feffff)',
        'gradient-right': 'linear-gradient(90deg, #001b30ff, #012a4aff, #013a63ff, #014f86ff, #2c7da0ff, #63e7d8ff, #f5feffff)',
        // Add other gradients as needed
      },
      keyframes: {
        rotateGradient: {
          '0%': { background: 'linear-gradient(90deg, #34d399, #3b82f6)' },
          '100%': { background: 'linear-gradient(160deg, #34d399, #3b82f6)' }, // 90 + 70 = 160 degrees
        },
      },
      animation: {
        'rotate-gradient': 'rotateGradient 1s forwards',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: "#4b494c", // color of textarea hint
            background: "#000e18ff", // bkg
            content1: "#001524ff",
            default: {
              foreground: "#000e18ff", // color of textarea input
              100: "#99b3b6ff",
              200: "#99b3b6ff",
              300: "#6e8e91ff",
              500: "#3b6065ff",
              600: "#000e18ff",
            },
          },
        },
      },
    }),
  ],
};