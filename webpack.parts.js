exports.shellPlugin = () => {
	const WebpackShellPlugin = require('webpack-shell-plugin');
	return {
		plugins: [
			new WebpackShellPlugin({onBuildEnd:['npm run rollupdev'], dev: false})
		]
	}
};

exports.extractCSS_dev = () => {
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	return {
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader, 
						'css-loader', 
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin()
		]
	}
};

exports.extractCSS_prod = () => {
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	return {
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader, 
						'css-loader', 
						{
							loader: 'postcss-loader',
							options: {
								plugins: (loader) => [
									require('autoprefixer')(),
									require('cssnano')({
										reduceIdents: false
									}),
								]
							}
						},
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin()
		]
	}
};

exports.loadCssAssets = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
	}
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|svg)$/,
				include,
				exclude,
				use: {
					loader: 'url-loader',
					options,
				},
			},
		],
	},
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				include,
				exclude,
				use: {
					loader: 'file-loader',
					options,
				},
			},
		],
	},
});

exports.loadJavaScript = ({ include, exclude }) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
			},
		],
	},
});

exports.generateSourceMaps = ({ type }) => ({
	devtool: type,
});
