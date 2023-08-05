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
				ibm: ["IBM", "sans-serif"],
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
				"indigo-800": "#523BA2",
				orange: "#FF8400",
				navyBlue: "#212832;",
				orangePA: "#F78000;",
				orangePAHover: "#fc8d14;",
				greyText: "#B8B8B8;",
				greyTextLight: "#D9D9D9;",
				greyBackground: "#3A3A3A;",
			},
			backgroundImage: {
				"background-vector": "url('/carousel/background-vector.svg')",
				"background-blog-world": "url('/blog/world.svg')",
			},
			keyframes: {
				showAlertPopup: {
					"0%": { transform: "translateY(6rem)" },
					"10%": { transform: "translateY(0px)" },
					"90%": { transform: "translateY(0px)" },
					"100%": { transform: "translateY(6rem)" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeOut: {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
			},
			animation: {
				showAlertPopup:
					"showAlertPopup 4s cubic-bezier(0.2, 0, 0.2, 1) forwards",
				fadeIn: "fadeIn .2s cubic-bezier(0.2, 0, 0.2, 1) forwards",
				fadeOut: "fadeOut .2s cubic-bezier(0.2, 0, 0.2, 1) forwards",
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
				".full-screen-center-container": {
					width: "100%",
					height: "calc(100vh - 12rem)",
					display: "flex",
					"align-items": "center",
					"justify-content": "center",
				},
				"input:invalid": {
					"border-color": "red",
				},
			});
		}),
	],
};
