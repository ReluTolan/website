/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vak6daptpt15cuhf.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  // ... other configurations
}

export default nextConfig
