import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Web3AuthProvider } from '../../../../web3-auth'
import { AuthRegisterContextProvider, WalletContextProvider, WalletExtendedContextProvider } from '../../../context'
import { AuthRegisterType } from '../../../types'
import { AuthRegister as AuthRegisterComponent } from '../../index'

const web3AuthEndpoint = process.env.WEB3_AUTH_ENDPOINT as string
const web3AuthProvider = new Web3AuthProvider(web3AuthEndpoint)
const projectAssetsPolicyIds: string[] = []

const meta: Meta<typeof AuthRegisterComponent> = {
  title: 'Components/Authentication/AuthRegister',
  component: AuthRegisterComponent,
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={projectAssetsPolicyIds}
        >
          <AuthRegisterContextProvider provider={web3AuthProvider}>
            <Story />
          </AuthRegisterContextProvider>
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: Object.values(AuthRegisterType),
      description: 'The type of registration form to display',
      defaultValue: {
        summary: 'AuthRegisterType.Default',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

type Story = StoryObj<typeof AuthRegisterComponent>

export const AuthRegisterWallet: Story = {
  args: {
    type: 'WALLET' as AuthRegisterType,
  },

  name: 'AuthRegister - Wallet',
}

export const AuthRegister: Story = {
  args: {
    type: 'SURVEY' as AuthRegisterType,
  },

  name: 'AuthRegister - Survey',
}

export default meta
