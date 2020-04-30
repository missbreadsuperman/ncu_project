const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = async ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    src: path.resolve(__dirname, '../src'),
  };
  config.module.rules.push({
    test: [/\.less$/],
    exclude: /node_modules/,
    include: [path.resolve(__dirname, '../src')],
    loaders: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [autoprefixer],
        },
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          noIeCompat: true,
        },
      },
    ],
  });

  return config;
};
