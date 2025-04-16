// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      // Your path aliases (matches jsconfig.json)
      '@src': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@scenes': path.resolve(__dirname, 'src/scenes/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@consts': path.resolve(__dirname, 'src/consts/'),
      '@states': path.resolve(__dirname, 'src/states/'),
    },

    configure: (webpackConfig) => {
     webpackConfig.resolve.modules = [
       ...webpackConfig.resolve.modules,
       path.resolve(__dirname, 'src'),
     ];
     return webpackConfig;
    },

  },
  // Optional: Override devServer (CRA uses 'public' folder, not 'dist')
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true, // Helps with client-side routing
  },
};