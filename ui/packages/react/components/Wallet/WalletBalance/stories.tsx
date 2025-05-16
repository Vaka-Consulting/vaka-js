import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { WalletBalance as WalletBalanceComponent } from '../../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../../context'

const meta: Meta<typeof WalletBalanceComponent> = {
  title: 'Components/Wallet',
  component: WalletBalanceComponent,
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

type Story = StoryObj<typeof WalletBalanceComponent>

export const WalletBalance: Story = {
  name: 'WalletBalance',
  render: () => <WalletBalanceComponent />,
}

export default meta
