/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use Netlify Image CDN loader for optimization
    loader: 'custom',
    loaderFile: './lib/netlifyImageLoader.js',
    // Allow unoptimized images as fallback
    unoptimized: false,
    // Define image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow images from external sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'talirecorderlessons.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.substack.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
    ],
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
  trailingSlash: false,
}

module.exports = nextConfig