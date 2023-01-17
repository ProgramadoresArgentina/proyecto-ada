/** @type {import('tailwindcss').Config} */
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
			},
		},
	},
	plugins: [],
};
