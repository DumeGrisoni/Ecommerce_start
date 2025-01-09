import { withGluestackUI } from '@gluestack/ui-next-adapter';
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['nativewind', 'react-native-css-interop'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withGluestackUI(nextConfig);
