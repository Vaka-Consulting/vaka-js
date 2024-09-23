import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { WalletConnector as WalletConnectorComponent } from '../../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../../context'

const meta: Meta<typeof WalletConnectorComponent> = {
  title: 'Components/Wallet',
  component: WalletConnectorComponent,
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          persistConnection={true}
        >
          <Story />
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
}

type Story = StoryObj<typeof WalletConnectorComponent>

export const WalletConnector: Story = {
  name: 'WalletConnector',
  render: () => <WalletConnectorComponent />,
}

export default meta
