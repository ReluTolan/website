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
    domains: ["relu-stepan.s3.eu-north-1.amazonaws.com"], // Add your S3 bucket here
  },
  // ... other configurations
}

export default nextConfig
