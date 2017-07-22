const path = require('path');
const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');

const CACHED_DURATION = 60000;
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), CACHED_DURATION);

const resolver = ResolverFactory.createResolver({
	alias: {
		'@App': path.resolve(__dirname, 'src'),
	},
	extensions: ['.css'],
	modules: ['src', 'node_modules'],
	useSyncFileSystemCalls: true,
	fileSystem
});

module.exports = {
	plugins: {
		'postcss-import': {
			extensions: ['.css'],
			resolve(id, basedir) {
				return resolver.resolveSync({}, basedir, id);
			}
		},
		'postcss-cssnext': {},
		'lost': {},
		'postcss-short': {},
		'postcss-move-media': {},
	}
};
