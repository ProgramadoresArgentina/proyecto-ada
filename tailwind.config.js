/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
                ibm: ['IBM', 'sans-serif'],
                roboto: ["Roboto", "sans-serif"],
                jost: ["Jost", "sans-serif"],
      },
      colors: {
                secondary: "#01233F",
        grey: "#565656;",
        blueStrong: "#2E3E5C;",
        shadeBlue: "#607FF2;",
        shadeBlueHover: "#4965cc;",
        greyXlight: "#F2F2F2",
        greylight: "##1D1D1D",
        greyMedium: "#777777",
        greyDark: "#808080",
				blueNavy: "#0F0E2C",
				blueNormal: "#5D5FEF",
				blueNormalHover: "#494abc",
                'indigo-800': "#523BA2",
                orange: "#FF8400"
      },
      backgroundImage: {
        "background-vector": "url('/carousel/background-vector.svg')",
      },
      keyframes: {
        showAlertPopup: {
          '0%': { transform: 'translateY(6rem)' },
          '10%': { transform: 'translateY(0px)' },
          '90%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(6rem)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        showAlertPopup: 'showAlertPopup 4s cubic-bezier(0.2, 0, 0.2, 1) forwards',
        fadeIn: 'fadeIn .2s cubic-bezier(0.2, 0, 0.2, 1) forwards',
        fadeInUp: 'fadeInUp .2s cubic-bezier(0.2, 0, 0.2, 1) forwards',
        fadeInDown: 'fadeInDown .2s cubic-bezier(0.2, 0, 0.2, 1) forwards',
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      lgCustom: "1030px",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".button-primary": {
          "padding": "0.5em 1em",
          "font-weight": "600",
          "border-radius": "0.5rem",
          "transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke",
          "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
          "transition-duration": "150ms",
          "background-color": "rgb(99 102 241)",
          "color": "#fff"
        },
        ".button-primary:hover": {
          "background-color": "rgb(79 70 229)",
        },
        ".button-primary:active": {
          "background-color": "rgb(99 102 241)"
        },
        ".button-primary:disabled, .button-secundary:disabled": {
          "opacity": "0.75",
          "pointer-events": "none",
        },
        ".button-secundary": {
          "padding": "0.5em 1em",
          "font-weight": "600",
          "border-radius": "0.5rem",
          "transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke",
          "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
          "transition-duration": "150ms",
          "color": "rgb(99 102 241)"
        },
        ".button-secundary:hover": {
          "background-color": "rgb(238 242 255)",
        },
        ".button-secundary:active": {
          "background-color": "rgb(238 242 255)"
        }
      })
    }),
  ],
}
