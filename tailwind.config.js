/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

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
			},
			colors: {
				grey: "#565656;",
				blueStrong: "#2E3E5C;",
				shadeBlue: "#607FF2;",
				shadeBlueHover: "#4965cc;",
				greyXlight: "#F2F2F2",
				greylight: "##1D1D1D",
				greyMedium: "#777777",
				greyDark: "#808080",
			},
			backgroundImage: {
				"background-vector": "url('/carousel/background-vector.svg')",
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
			});
		}),
	],
};
