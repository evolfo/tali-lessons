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
    minimumCacheTTL: 2592000,
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

    // (The old custom splitChunks config forced every node_module into one
    // ~400 KB `vendor` chunk loaded by every page, ~50-80% of it unused. Next's
    // default per-route splitting is much better, so it was removed.)

    return config
  },

  // Modern JavaScript compilation
  compiler: {
    // Temporarily disabled to debug Substack RSS issue
    // removeConsole: process.env.NODE_ENV === 'production',
  },

  // Paid sheet music lives in /private (NOT /public, which is served to
  // everyone). The Stripe webhook emails it after purchase, so make sure the
  // files are bundled into that serverless function.
  outputFileTracingIncludes: {
    '/api/webhooks/stripe': ['./private/sheet-music/**/*'],
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
        // 30 days keeps repeat visits fast; to force an update, rename the file.
        source: '/img/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=604800' }],
      },
      {
        // Self-hosted fonts never change in place.
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
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
    // optimizeCss (Critters) was removed: it inlined only part of each page's CSS
    // and loaded the rest async (media="print" swap), so pages painted unstyled
    // and then jumped when the stylesheet arrived (CLS 0.55-0.8 on lesson pages).
    optimizePackageImports: ['react-icons', 'semantic-ui-react'],
  },

  // Production source maps (disable for better performance)
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig