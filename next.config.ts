import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/producto/fikir-coffee-edicion-001",
        destination: "/producto/etiopia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
