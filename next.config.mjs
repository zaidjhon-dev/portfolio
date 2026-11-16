/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compile-time optimisations
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Do not attempt to download Google fonts during local node build
  optimizeFonts: false,

  // Experimental optimisations
  experimental: {
    // Optimise CSS output
    optimizeCss: false,
    // Optimise package imports for tree-shaking
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;