import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Allow versioned local image URLs like /images/foo.png?v=2 (cache busting)
    localPatterns: [{ pathname: "/images/**" }],
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/rent',
        destination: '/',
        permanent: false,
      },
      {
        source: '/land',
        destination: '/',
        permanent: false,
      },
      {
        source: '/project-marketing',
        destination: '/',
        permanent: false,
      },
      {
        source: '/property-management',
        destination: '/',
        permanent: false,
      },
      {
        source: '/acreage-sales',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
