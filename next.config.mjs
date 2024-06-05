/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	serverRuntimeConfig: {
		maxBodySize: 10 * 1024 * 1024,
	  },
};

export default nextConfig;
