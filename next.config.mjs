// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          // tu cloud name:
          pathname: '/do87isqjr/**',
        },
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
          pathname: '/**',
        },
      ],
      // Alternativa simple:
      // domains: ['res.cloudinary.com', 'images.pexels.com'],
    },
  };
  
  export default nextConfig; // 👈 ESM correcto
  