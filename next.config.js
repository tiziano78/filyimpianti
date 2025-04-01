const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "*.vercel.app"
      }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true
  },
  webpack: (config) => {
    // Alias per i moduli
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
      "@components": path.join(__dirname, "src/components"),
      "@styles": path.join(__dirname, "src/styles"),
      "@utils": path.join(__dirname, "src/utils"),
      "@lib": path.join(__dirname, "src/lib"),
      "@types": path.join(__dirname, "src/types"),
      "@data": path.join(__dirname, "src/data"),
      "@context": path.join(__dirname, "src/context"),
      "@stores": path.join(__dirname, "src/stores"),
      "@public": path.join(__dirname, "public")
    };

    // Aggiungi regola per i font
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/media/',
          publicPath: '/_next/static/media/'
        }
      }
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://*.vercel.app *.google-analytics.com *.googletagmanager.com api.mapbox.com events.mapbox.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com; style-src 'self' 'unsafe-inline' api.mapbox.com; font-src 'self' data:; img-src 'self' data: blob: *.mapbox.com https://*.vercel.app"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
