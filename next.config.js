/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
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

  // Turbopack configuration for Next.js 16+
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },

  // Webpack optimizations (for --webpack flag builds)
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
    // Temporarily disabled to debug Substack RSS issue
    // removeConsole: process.env.NODE_ENV === 'production',
  },

  // Security headers. These used to live in netlify.toml, which Vercel ignores
  // (the live site was sending none of them). Vercel adds HSTS on its own.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Images are replaced in place from time to time, so don't use "immutable".
        source: '/img/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },

  // Social shortcuts that used to live in public/_redirects (Netlify only; they
  // were returning 404 on Vercel).
  async redirects() {
    return [
      { source: '/youtube', destination: 'https://www.youtube.com/@talirecorder', permanent: true },
      { source: '/twitter', destination: 'https://x.com/TaliRubinstein', permanent: true },
      { source: '/substack', destination: 'https://talirecorder.substack.com', permanent: true },
    ]
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