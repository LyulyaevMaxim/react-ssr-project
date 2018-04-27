const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default

const ExtractCssPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const LodashWebpackOptimize = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const root = path.resolve(__dirname, './')

const mode = process.env.NODE_ENV
const isDev = mode === 'development'
console.log(`mode: ${mode}, isDev: ${isDev}`)

module.exports = {
	mode,
	entry: isDev
		? [
			'react-hot-loader/patch',
			`webpack-hot-middleware/client?path=http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/__webpack_hmr`,
			'./src/client.tsx',
		]
		: {
			client: './src/client.tsx'
		},

	output: {
		path: path.join(__dirname, 'dist/public/'),
		chunkFilename: `assets/scripts/[name]${isDev ? '' : '.[chunkhash]'}.js`,
		filename: `assets/scripts/[name]${isDev ? '' : '.[chunkhash]'}.js`,
		publicPath: "/"
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},

	devtool: isDev ? 'eval' : 'none',

	cache: isDev,

	optimization: !isDev ? {
		namedModules: false,
		concatenateModules: true,
		removeAvailableModules: true,
		providedExports: true,
		usedExports: true,
		sideEffects: true,
		noEmitOnErrors: true,
		namedChunks: false,
		splitChunks: true,
		mergeDuplicateChunks: true,
		removeEmptyChunks: true,
		flagIncludedChunks: true,
		runtimeChunk: true,
		splitChunks: {
			automaticNameDelimiter: "-",
			chunks: 'all',
			cacheGroups: {
				vendor: {
					name: 'vendor',
					chunks: 'all',
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		},
		minimizer: [
			new UglifyJSPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					mangle: true,
					// compress: false
				}
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorOptions: { discardComments: { removeAll: true } , zindex: {}},
			})
		]
	} : {},

	plugins: [
		isDev && new webpack.HotModuleReplacementPlugin(),
		// new ExtractCssPlugin({
		// 	filename: `assets/styles/[name]${isDev ? '' : ".[hash]"}.css`,
		// 	chunkFilename: `assets/styles/[name]${isDev ? '' : ".[hash]"}.css`,
		// 	ignoreOrder: true
		// }),
		!isDev && new webpack.BannerPlugin(`${require('./package.json').version} ${new Date().toString()}`),

		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			alwaysWriteToDisk: true,
			inject: true,
			cache: true,
			[!isDev && 'minify']: {
				minifyJS: true,
				minifyCSS: true,
				removeComments: true,
				removeAttributeQuotes: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				keepClosingSlash: true,
				sortAttributes: true,
				sortClassName: true,
				collapseBooleanAttributes: true
			}
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer',
			preload: /\.js$/
		}),
		/*new PreloadWebpackPlugin({
			rel: 'preload',
			include: 'allAssets',
			fileWhitelist: [/\.woff2/],
			as(entry) {
				console.log(entry)
				if (/\.woff2$/.test(entry)) return 'font'
			}
		}),*/
		new HtmlWebpackHarddiskPlugin(),
		new CopyWebpackPlugin([
			{
				context: 'src/assets',
				from: '**/*',
				to: 'assets',
				ignore: ['styles/**/*']
			}
		]),
		new RobotstxtPlugin({policy: [{userAgent: '*', [isDev ? 'disallow' : 'allow']: '/'}]}),
		new WriteFilePlugin(),
		!isDev &&  new LodashWebpackOptimize({ /*не работает*/
			chaining: false,
			shorthands: true,
			collections: true,
			paths: true
		}),
		// !isDev && new BundleAnalyzerPlugin()
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
				// include: path.join(__dirname, 'src'),
				use: [
					ExtractCssPlugin.loader,
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
					// {
					// 	loader: 'stylefmt-loader',
					// 	options: {
					// 		//config: `${root}/configs/.stylelintrc`
					// 	}
					// }
				]
			},
			{
				test: /\.(woff2|woff)$/,
				include: `${root}/src/assets/fonts`,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						}
					}
				]
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				// include: `${root}/src/assets/media`,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: !isDev ? {
								svgo: {
									plugins: [{ removeTitle: true }, { convertPathData: false }]
								},
								mozjpeg: {
									enabled: false, //пока не заработает с loadable-components
									progressive: true,
									quality: 65
								},
								pngquant: {
									quality: '65-90',
									speed: 4
								},
								optipng: {
									enabled: false
								},
								gifsicle: {
									enabled: false
								},
								webp: {
									enabled: false
								}
							} : {}
					}
				]
			}
		]
	}
}

