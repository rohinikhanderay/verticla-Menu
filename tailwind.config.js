const { red } = require("tailwindcss/colors");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        baskerville: ["Libre Baskerville", "serif"],
        nunito: ["nunito", "sans-serif"],
        roboto: ['Roboto'],
      },
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        border_red: "rgb(22, 172, 178)",
        tag_br: "#E8EDF3",
        bg_yellow: "#FFF7B2",
        border_yellow: "#FFD338",
        border_gray:'#cccccc',
        disable_bg_color: '#E6E6E6',
        bg_white: '#FFFFFF',
        bg_gray666: '#666666',
        bg_skyblue: '#10E9D4',
        gray333: '#333333',
        lightGray: '#F1F2F4'
      },

      screens: {
        md: "768px",

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        sm: { max: "767px" },
        // => @media (min-width: 640px) { ... }

        xs: { max: "575px" },
      },
      boxShadow: {
        modal_header: '0px 0px 8px rgba(0, 0, 0, 0.16)',
        modal_footer:'0px 0px 8px rgba(0, 0, 0, 0.16)',
      },
      maxHeight: {
        '70vh': '70vh',
      },
      height: {
        '83vh': '83vh',
        '50px': '50px'
      },

      borderRadius: {
        default: '5px'
      },

      padding: {
        '1px': '1px',
        '1.3rem': '1.3rem'
      },

      fontSize: {
        '13px': '13px'
      },

      borderWidth: {
        '1px': '1px'
      }
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};