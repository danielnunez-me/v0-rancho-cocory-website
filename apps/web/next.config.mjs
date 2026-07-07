/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@rancho-cocory/shared", "@rancho-cocory/cms-server"],
  serverExternalPackages: ["firebase-admin"],
  turbopack: {
    root: "../..",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "scontent-*.cdninstagram.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
}

export default nextConfig
