import { dirname, join } from 'path'
import webpack from 'webpack'

const config = {
  stories: ['../packages/react/stories/*/**.mdx', '../packages/react/stories/*/**.stories.tsx'],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
  },

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
        controls: true,
        docs: true,
        toolbars: false,
        measure: false,
        outline: false,
        viewport: true,
      },
    },
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-links',
  ],

  staticDirs: ['./public'],

  typescript: {
    check: false,
    skipCompiler: false,
    reactDocgen: 'react-docgen',
    // If you want to use react-docgen-typescript, you should install it and uncomment the following lines
    // reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   include: ['packages/react/**/*.{ts,tsx}'],
    // },
  },

  docs: {
    autodocs: 'tag',
  },

  core: {
    builder: {
      name: 'webpack5',
      options: {
        lazyCompilation: false,
        fsCache: true,
      },
    },
  },

  webpackFinal: async (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream'),
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    )

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    config.output.environment = {
      ...config.output.environment,
      asyncFunction: true,
    }

    return config
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

export default config
