/** @type {import('next').NextConfig} */

const cacheHeaders = [
  { key: "Cache-Control", value: "max-age=0" },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() { return [
    { source: '/', headers: cacheHeaders }
  ] },
}

module.exports = nextConfig
