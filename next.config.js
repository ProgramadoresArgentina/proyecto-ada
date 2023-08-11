/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["i.pravatar.cc", "picsum.photos"],
	},
	env: {
		SERVICE_ID_EMAILJS: process.env.EMAIL_SERVICE_ID,
		TEMPLATE_ID_EMAILJS: process.env.EMAIL_TEMPLATE_ID,
		USER_ID_EMAILJS: process.env.EMAIL_USER_ID,
	},
};

module.exports = nextConfig;
