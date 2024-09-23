import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { WalletPicker as WalletPickerComponent } from '../../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../../context'

const meta: Meta<typeof WalletPickerComponent> = {
  title: 'Components/Wallet',
  component: WalletPickerComponent,
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

type Story = StoryObj<typeof WalletPickerComponent>

export const WalletPicker: Story = {
  name: 'WalletPicker',
  render: () => <WalletPickerComponent />,
}

export default meta
