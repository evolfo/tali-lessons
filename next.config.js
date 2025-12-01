/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    loader: 'custom',
    loaderFile: './lib/netlifyImageLoader.js',
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
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

  // Webpack optimizations
  webpack: function(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })

    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
      }
    }

    return config
  },

  // Modern JavaScript compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  trailingSlash: false,

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'semantic-ui-react'],
  },

  // Production source maps (disable for better performance)
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig