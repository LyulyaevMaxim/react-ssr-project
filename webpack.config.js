const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssChunksHtmlWebpackPlugin = require('css-chunks-html-webpack-plugin')
// const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const pkg = require('./package.json');
const root = path.resolve(__dirname, './')

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

module.exports = /*(env, argv) => {
	const mode = typeof env !== 'undefined' ? env : argv.mode
	const isDev = mode === 'development'
	console.log(`mode: ${mode}, isDev: ${isDev}`)

	return */{
	mode,
	entry: isDev
		? [
			'react-hot-loader/patch',
			`webpack-hot-middleware/client?path=http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/__webpack_hmr`,
			'./src/client.tsx',
		]
		: [
			'./src/client.tsx',
		],


	output: {
		path: path.join(__dirname, 'dist/public/'),
		chunkFilename: 'assets/scripts/[name].[chunkhash].js',
		filename: isDev
			? 'main.js'
			: 'assets/scripts/[name].[chunkhash].js',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},

	devtool: !isDev
		? 'none'
		: 'source-map',

	performance: {
		maxAssetSize: 500000,
	},

	optimization: {
		splitChunks: {
			automaticNameDelimiter: "-",

			cacheGroups: {
				vendor: {
					name: 'vendor',
					chunks: 'all',
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	},

	plugins: [
		/*isDev
			? null
			: new webpack.optimize.ModuleConcatenationPlugin(),*/

		isDev
			? new webpack.HotModuleReplacementPlugin() // enable HMR globally
			: null,

		/*isDev
			? new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
			: null,*/


		new MiniCssExtractPlugin({
			filename: isDev
				? 'assets/styles/main.css'
				: 'assets/styles/[name].[chunkhash].css',
			// filename: 'css/[name].[contenthash].css',
			ignoreOrder: true //для css-modules
		}),

		/*new ExtractCssChunks({
			filename: 'css/[name].[contenthash].css',
			ignoreOrder: true, //для css-modules
			disable: isDev
		}),*/
		// new CssChunksHtmlWebpackPlugin({ inject: 'head' }),

		!isDev
			? new UglifyJSPlugin({
				// sourceMap: true,
				cache: true,
				parallel: true,
				uglifyOptions: {
					mangle: true
					// compress: false
				}
			})
			: null,

		isDev
			? null
			: new webpack.BannerPlugin(`${pkg.version} ${new Date().toString()}`),

		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			minify: !isDev ? {collapseWhitespace: true, collapseInlineTagWhitespace: true} : false,
			alwaysWriteToDisk: true,
		}),
		new HtmlWebpackHarddiskPlugin(),

		new CopyWebpackPlugin([
			{
				context: 'src/assets',
				from: '**/*',
				to: 'assets',
				ignore: ['styles/**/*']
			}
		]),

		new RobotstxtPlugin({
			policy: [
				!isDev
					? {userAgent: '*', allow: '/'}
					: {userAgent: '*', disallow: '/'},
			],
		}),

		new WriteFilePlugin(),

		// isDev ? null : new BundleAnalyzerPlugin()
	].filter(Boolean),

	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: `${root}/configs/tsconfig.json`,
							reportFiles: [`${root}/src/**/*.{ts,tsx}`],
							useCache: true,
							//usePrecompiledFiles: true, //использовать js файлы
							//errorsAsWarnings: true, //вместо ошибок TS даёт предупреждения,
							forceIsolatedModules: true,
							//useTranspileModule: true, //режим быстрой генерации
							useBabel: true,
							babelCore: '@babel/core',
							// babelOptions: require(`${root}/configs/.babelrc`)
						},
					}
				],
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							localIdentName: '[local]-[hash:base64:4]',
							sourceMap: isDev ? true : false
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							config: {
								path: `${root}/configs/postcss.config.js`
							},
							sourceMap: isDev ? 'inline' : false
						}
					},
					{
						loader: 'stylefmt-loader',
						options: {
							//config: `${root}/configs/.stylelintrc`
						}
					}
				]
			},
		],
	}
}

