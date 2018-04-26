const path = require('path')

module.exports = ({ file, options, env }) => {
	const isProd = env === 'production'

	const stablePlugins = {
		'postcss-nested': { preserveEmpty: true },'postcss-custom-media': {},
		'postcss-color-function': {},
		'postcss-selector-not': {},
		'postcss-selector-matches': {},
		'postcss-aspect-ratio': {},
		'postcss-line-height-px-to-unitless': {},
		'postcss-pxtorem': { rootValue: 16, mediaQuery: false },
		'postcss-scale': {},
		'css-mqpacker': { sort: true },
		'postcss-flexbugs-fixes': {},
		autoprefixer: {
			browsers: ['last 2 versions', 'IE >= 11'],
			grid: true,
			flexbox: 'no-2009',
			remove: true
		}}


	return {
		parser: 'postcss-scss',
		plugins: {
			'postcss-import': {
				resolve: (id, basedir) => {
					const alias = [
						{ name: '~css', toPath: 'src/assets/styles' },
						{ name: '~img', toPath: 'src/assets/media' },
						{ name: 'node_modules', toPath: 'node_modules' }
					]

					for (let { name, toPath } of alias)
						if (id.substr(0, name.length) === name)
							return path.resolve(__dirname, `../${toPath}/${id.substr(name.length + 1)}`)

					return path.resolve(basedir, id)
				}
			},
			...stablePlugins,
			'postcss-advanced-variables': {},
			'postcss-svg': { dirs: [path.resolve(__dirname, '../src/assets/media')] , svgo: {}},
			'postcss-preset-env': {},
		},
		stablePlugins
	}
}
