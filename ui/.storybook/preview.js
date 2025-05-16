import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from './mocks'

// Initialize MSW
initialize()

const preview = {
  parameters: {
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
}

export default preview
