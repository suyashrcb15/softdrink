import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["images.app.goo.gl"], // ✅ Add all trusted external domains here
    },
};

export default nextConfig;
