// next.config.mjs

/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable React Strict Mode for highlighting potential problems
  reactStrictMode: true,

  // Enable SWC minification for faster builds
  swcMinify: true,

  webpack(config, { isServer }) {
    // Remove the default SVG handling
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add custom SVG handling with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        // Adjust the issuer based on your project structure
        and: [/\.(js|ts)x?$/],
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // SVGR options can be customized here
            svgo: true, // Enable SVGO for optimization
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false, // Preserve viewBox attribute
                },
              ],
            },
            titleProp: true, // Enable passing title prop for accessibility
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;

// webpack(config) {
//   config.module.rules.push({
//     test: /\.svg$/,
//     use: [
//       {
//         loader: '@svgr/webpack',
//         options: {
//           svgo: true, // Disable SVGO optimization if you encounter issues
//         },
//       },
//     ],
//   });
//   return config;
// },
