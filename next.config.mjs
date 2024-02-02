const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/poker-creation', // Adjust this path based on your custom home page file
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
