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
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: "#99b3b6ff", // color of Tooltips (& textarea hint)
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