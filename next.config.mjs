/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compile-time optimisations
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Experimental optimisations
  experimental: {
    // Optimise CSS output
    optimizeCss: false,
    // Optimise package imports for tree-shaking
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
      "@tabler/icons-react",
      "lucide-react",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;