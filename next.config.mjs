/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compile-time optimisations
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Experimental optimisations
  experimental: {
    // Optimise CSS output
    optimizeCss: false, // requires critters — skip unless installed
    // Optimise package imports for tree-shaking
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
    ],
  },

  images: {
    // Allow external image domains if needed in future
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;