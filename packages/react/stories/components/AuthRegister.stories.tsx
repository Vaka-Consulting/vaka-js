import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { AuthRegister as AuthRegisterComponent } from '../../components'
import { AuthRegisterContextProvider, WalletContextProvider, WalletExtendedContextProvider } from '../../context'
import { AuthRegisterType } from '../../types'

const meta: Meta<typeof AuthRegisterComponent> = {
  title: 'Components/Authentication/AuthRegister',
  component: AuthRegisterComponent,
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={[]}
        >
          <AuthRegisterContextProvider>
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
