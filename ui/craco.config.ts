const CracoLessPlugin = require('craco-less');
const CracoEsbuildPlugin = require('craco-esbuild');

export default {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'ES2022',
        },
        esbuildMinimizerOptions: {
          target: 'ES2022',
          css: true,
        },
        skipEsbuildJest: false,
        esbuildJestOptions: {
          loaders: {
            '.ts': 'ts',
            '.tsx': 'tsx',
          },
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};