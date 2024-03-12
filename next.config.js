/** @type {import('next').NextConfig} */
// const nextConfig = {
//     // test: /\.(glb|gltf)$/,
//     //   use: {
//     //     loader: 'file-loader',
//     //   },
// };

// export default nextConfig;


module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
};