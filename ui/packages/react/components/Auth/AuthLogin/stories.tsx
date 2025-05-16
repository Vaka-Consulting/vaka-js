import React from 'react'
import { Web3AuthProvider } from '@vaka-tech/web3-auth'
import { Meta, StoryObj } from '@storybook/react'
import AuthLoginComponent from './AuthLogin'
import AuthLoginEmailComponent from './AuthLoginEmail'
import AuthLoginWalletComponent from './AuthLoginWallet'
import { AuthContextProvider, WalletContextProvider, WalletExtendedContextProvider } from '../../../context'

const web3AuthEndpoint = process.env.WEB3_AUTH_ENDPOINT as string
const web3AuthProvider = new Web3AuthProvider(web3AuthEndpoint)
const projectAssetsPolicyIds: string[] = []

const meta: Meta<typeof AuthLoginComponent> = {
  title: 'Components/Authentication/AuthLogin',
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={projectAssetsPolicyIds}
        >
          <AuthContextProvider provider={web3AuthProvider}>
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

export default meta
