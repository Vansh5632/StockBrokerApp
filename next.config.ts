import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable strict mode for better WebSocket performance
  // We're using a custom server for WebSocket support
  // The custom server will handle requests using Next's request handler
  typescript: {
    ignoreBuildErrors: true, // For development only
  },
};

export default nextConfig;
