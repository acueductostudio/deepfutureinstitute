// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true"
// });
const path = require("path");
const withOffline = require("next-offline");

const nextConfig = {
  //start of WPA config
  target: "serverless",
  transformManifest: manifest => ["/"].concat(manifest),
  // generateInDevMode: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }, //end of WPA config
  exportTrailingSlash: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false
          }
        }
      ]
    });
    config.resolve.modules.push(path.resolve("./"));
    return config;
  }
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = withOffline(nextConfig);
