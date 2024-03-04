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
    domains: [
      "relu-stepan.s3.eu-north-1.amazonaws.com",
      "relu-stepan2.s3.eu-central-1.amazonaws.com",
    ],
  },
}

export default nextConfig
