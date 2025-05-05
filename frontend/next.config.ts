import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "storage.googleapis.com"],
  },
}

export default nextConfig
