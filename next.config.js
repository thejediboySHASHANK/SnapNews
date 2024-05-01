/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images : {
    domains: ['i.pinimg.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig

// const withTM = require('next-transpile-modules')(["react-icons"]);
//
// module.exports = withTM({})
