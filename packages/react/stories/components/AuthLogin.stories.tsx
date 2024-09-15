import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import {
  AuthLogin as AuthLoginComponent,
  AuthLoginEmail as AuthLoginEmailComponent,
  AuthLoginWallet as AuthLoginWalletComponent,
} from '../../components'
import { AuthContextProvider, WalletContextProvider, WalletExtendedContextProvider } from '../../context'

const meta: Meta<typeof AuthLoginComponent> = {
  title: 'Components/Authentication/AuthLogin',
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={[]}
        >
          <AuthContextProvider>
            <Story />
          </AuthContextProvider>
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
}

type Story = StoryObj<typeof AuthLoginComponent>

export const AuthLogin: Story = {
  name: 'AuthLogin',
  decorators: [(Story) => <Story />],
  render: () => <AuthLoginComponent />,
}

export const AuthLoginWallet: Story = {
  name: 'AuthLoginWallet',
  decorators: [(Story) => <Story />],
  render: () => <AuthLoginWalletComponent />,
}

export const AuthLoginEmail: Story = {
  name: 'AuthLoginEmail',
  decorators: [(Story) => <Story />],
  render: () => <AuthLoginEmailComponent />,
}

// export const AuthConfirmEmail: Story = {
//   name: 'AuthConfirmEmail',
//   decorators: [(Story) => <Story />],
//   render: () => <AuthLoginEmailComponent />,
// }

export default meta
