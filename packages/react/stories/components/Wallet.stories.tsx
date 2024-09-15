import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import {
  WalletConnector as WalletConnectorComponent,
  WalletPicker as WalletPickerComponent,
  WalletBalance as WalletBalanceComponent,
  WalletDisconnectButton as WalletDisconnectButtonComponent,
  WalletAddress as WalletAddressComponent,
} from '../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../context'

const meta: Meta<typeof WalletConnectorComponent> = {
  title: 'Components/Wallet',
  component: WalletConnectorComponent,
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={[]}
          persistConnection={true}
        >
          <Story />
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
}

type Story = StoryObj<typeof WalletConnectorComponent>

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
export const WalletConnector: Story = {
  name: 'WalletConnector',
  render: () => <WalletConnectorComponent />,
}

export const WalletPicker: Story = {
  name: 'WalletPicker',
  render: () => <WalletPickerComponent />,
}

export const WalletAddress: Story = {
  name: 'WalletAddress',
  render: () => <WalletAddressComponent />,
}

export const WalletBalance: Story = {
  name: 'WalletBalance',
  render: () => <WalletBalanceComponent />,
}

export const WalletDisconnectButton: Story = {
  name: 'WalletDisconnectButton',
  render: () => <WalletDisconnectButtonComponent>Disconnect Wallet</WalletDisconnectButtonComponent>,
}

export default meta
