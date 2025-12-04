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
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	turbopack: {},
	/* webpack: (config, { isServer }) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			"pg-native": false,
			"sqlite3": false,
			"mysql": false,
			"mysql2": false,
			"mssql": false,
			"oracle": false,
			"mongodb": false,
			"react-native-sqlite-storage": false,
			"@sap/hana-client": false,
			"@sap/hana-client/extension/Stream": false
		};

		config.ignoreWarnings = [
			{ module: /node_modules\/typeorm\/connection\/ConnectionOptionsReader\.js/ },
			{ module: /node_modules\/typeorm\/browser\/connection\/ConnectionOptionsReader\.js/ },
			{ module: /node_modules\/typeorm\/util\/DirectoryExportedClassesLoader\.js/ },
			{ module: /node_modules\/typeorm\/browser\/util\/DirectoryExportedClassesLoader\.js/ }
		];

		if (!isServer) {
			config.resolve.fallback = {
                ...config.resolve.fallback,
                "typeorm": false,
                "pg": false,
            };
		}

		return config;
	}, */
};

export default nextConfig;
