/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: [
    '@mui/material',
    '@mui/material-nextjs',
    '@mui/system',
    '@vaka-tech/react',
    '@vaka-tech/web3-auth',
    'mui-one-time-password-input',
  ],
  images: {
    unoptimized: true,
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }
    return config
  },
}

export default nextConfig
