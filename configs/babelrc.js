const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

let presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 1 versions']
      },
      modules: false,
      loose: true,
      spec: true,
      useBuiltIns: 'usage',
      forceAllTransforms: true,
      debug: false
    }
  ],
  '@babel/preset-react',
  ['@babel/preset-stage-0', {
	  "decoratorsLegacy": true
  }]
]

let plugins = [
  [
    'module-resolver',
    {
      "extensions": ['.ts', '.tsx', '.js', '.jsx', '.json'],
      "alias": {
        '~css': './src/assets/styles',
        '~utils': './src/utils',
        // '~utils': ([, fileName]) => `./src/utils/${fileName}.ts`,
        // '~img': path.resolve(__dirname, '../src/assets/img/'),
        // '~actions': path.resolve(__dirname, '../src/js/actions'),
        // '~constants': path.resolve(__dirname, '../src/js/constants.json'),
        // '~modules': path.resolve(__dirname, '../src/js/modules'),
        // '~components': path.resolve(__dirname, '../src/js/components')
      }
    }
  ],
  'babel-plugin-dual-import',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  [
    'react-css-modules',
    {
      webpackHotModuleReloading: isDev,
      handleMissingStyleName: 'warn',
      generateScopedName: '[local]-[hash:base64:4]',
      filetypes: {
        '.scss': { syntax: 'postcss-scss' }
      },
      exclude: 'node_modules'
    }
  ]
]

if (isDev) {
  plugins = [...plugins, 'react-hot-loader/babel']
} else {
  plugins = [
    ...plugins,
    'closure-elimination',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements'
  ]
}

module.exports = { presets, plugins }
