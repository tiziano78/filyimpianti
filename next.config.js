const path = require("path");
const webpack = require("webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@deck.gl/core",
    "@deck.gl/layers",
    "@deck.gl/react",
    "@deck.gl/widgets",
    "@deck.gl/mesh-layers",
    "@deck.gl/geo-layers",
    "@luma.gl/engine",
    "@mapbox/mapbox-gl-geocoder"
  ],
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@deck.gl/core',
      '@deck.gl/layers',
      'mapbox-gl'
    ],
    serverActions: {}
  },
  webpack: (config, { dev, isServer }) => {
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

    // Configurazione output
    config.output = {
      ...config.output,
      globalObject: "this",
    };

// Configurazione per fallback di moduli mancanti
config.resolve.fallback = {
  ...config.resolve.fallback,
  stream: require.resolve("stream-browserify"),
  buffer: require.resolve("buffer/"),
  util: require.resolve("util/"),
  assert: require.resolve("assert/"),
  fs: false,
  path: false,
  zlib: false,
};


    // Aggiungi plugin per Buffer e Process
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process"
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
