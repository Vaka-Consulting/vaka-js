import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { WalletDisconnectButton as WalletDisconnectButtonComponent } from '../../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../../context'

const meta: Meta<typeof WalletDisconnectButtonComponent> = {
  title: 'Components/Wallet',
  component: WalletDisconnectButtonComponent,
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

type Story = StoryObj<typeof WalletDisconnectButtonComponent>

export const WalletDisconnectButton: Story = {
  name: 'WalletDisconnectButton',
  render: () => <WalletDisconnectButtonComponent />,
}

export default meta
