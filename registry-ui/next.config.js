/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['flowbite.com', 'assets.maccarianagency.com', 'avatars.githubusercontent.com', 'im.ages.io'],
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = nextConfig;
