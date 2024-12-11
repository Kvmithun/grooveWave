import { NextConfig } from 'next';

const config: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false; // Disable cache for client-side builds
    }
    return config;
  },
  images: {
    domains: ['ltmbrdqxtksaxdbscvqp.supabase.co'],
    formats: ['image/webp'], 
  },
};

export default config;
