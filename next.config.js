/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            }
        ],
		domains: ["i.pravatar.cc", "picsum.photos", "i.ibb.co", "i0.wp.com", "i.pinimg.com"],
	},
	env: {
		SERVICE_ID_EMAILJS: process.env.EMAIL_SERVICE_ID,
		TEMPLATE_ID_EMAILJS: process.env.EMAIL_TEMPLATE_ID,
		USER_ID_EMAILJS: process.env.EMAIL_USER_ID,
	},
};

module.exports = nextConfig;
