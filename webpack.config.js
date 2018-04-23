const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const pkg = require('./package.json');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'production';
const isProduction = (NODE_ENV === 'production');
const isDevelopment = (NODE_ENV === 'development');
const root = path.resolve(__dirname, './')

const webpackConfig = {
  entry: isDevelopment
    ? [
      'react-hot-loader/patch', // activate HMR for React
      `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/__webpack_hmr`, // bundle the client for webpack-hot-middleware and connect to the provided endpoint

      './src/client.tsx',
    ]
    : [
      './src/client.tsx',
    ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  output: {
    path: path.join(__dirname, 'dist/public/'),
    chunkFilename: 'assets/scripts/[name].[chunkhash].js',
    filename: isDevelopment
      ? 'main.js'
      : 'assets/scripts/[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: isProduction,
                  sourceMap: !isProduction
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: !isProduction
                }
              },
            ],
          })
        ),
      },
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
              babelOptions: require(`${root}/configs/babelrc`)
            },
          }
        ],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },

	// optimization.splitChunks

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),

    isDevelopment
      ? null
      : new webpack.optimize.ModuleConcatenationPlugin(),

    isDevelopment
      ? new webpack.HotModuleReplacementPlugin() // enable HMR globally
      : null,
    isDevelopment
      ? new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
      : null,
    isDevelopment
      ? new webpack.NoEmitOnErrorsPlugin() // do not emit compiled assets that include errors
      : null,

    new ExtractTextPlugin({
      filename: isDevelopment
        ? 'assets/styles/main.css'
        : 'assets/styles/[name].[chunkhash].css',
    }),


	  isProduction
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

    isDevelopment
      ? null
      : new webpack.BannerPlugin(`${pkg.version} ${new Date().toString()}`),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      minify: isProduction ? { collapseWhitespace: true, collapseInlineTagWhitespace: true } : false,
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
        isProduction
          ? { userAgent: '*', allow: '/' }
          : { userAgent: '*', disallow: '/' },
      ],
    }),

    new WriteFilePlugin(),

    // isDevelopment ? null : new BundleAnalyzerPlugin()
  ].filter(Boolean),

  devtool: isProduction
    ? 'none'
    : 'source-map',

  performance: {
    maxAssetSize: 500000,
  },
};

module.exports = webpackConfig;
