const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      publicPath: '/build/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
  },
  parts.loadCssAssets(),
  parts.loadFonts({
    options: {
      name: '[path][name].[ext]',
    },
  }),
  parts.loadJavaScript({ include: PATHS.src }),
]);

const developmentConfig = merge([
  parts.extractCSS_dev(),
  parts.loadImages(),
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.shellPlugin(),
]);

const productionConfig = merge([
  parts.extractCSS_prod(),
  parts.loadImages({
    options: {
      limit: false,
      name: '[path][name].[ext]',
    },
  }),
]);


module.exports = (env) => {
  let modeConfig = env.mode === 'production' ? productionConfig : developmentConfig;
  return merge(commonConfig, modeConfig);
};
