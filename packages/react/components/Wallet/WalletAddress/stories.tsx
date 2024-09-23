import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { WalletAddress as WalletAddressComponent } from '../../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../../context'

const meta: Meta<typeof WalletAddressComponent> = {
  title: 'Components/Wallet',
  component: WalletAddressComponent,
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider projectPrefix={'storybook'} persistConnection={true}>
          <Story />
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
}

type Story = StoryObj<typeof WalletAddressComponent>

export const WalletAddress: Story = {
  name: 'WalletAddress',
  render: () => <WalletAddressComponent />,
}

export default meta
