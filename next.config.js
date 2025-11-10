/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
  // Enable server-side rendering for Netlify
  output: 'standalone',
}

module.exports = nextConfig