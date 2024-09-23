import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import {
  CreateWalletForm as CreateWalletFormComponent,
  EmailForm as EmailFormComponent,
  ExperienceLevelForm as ExperienceLevelFormComponent,
  ExperienceChainsForm as ExperienceChainsFormComponent,
  OtpForm as OtpFormComponent,
  WalletMethodForm as WalletMethodFormComponent,
  WalletSignatureForm as WalletSignatureFormComponent,
} from '../../components'
import { WalletContextProvider, WalletExtendedContextProvider } from '../../context'

const meta: Meta = {
  title: 'Components/Forms',
  decorators: [
    (Story) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={[]}
        >
          <Story />
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
}

type Story = StoryObj

function handleSubmit(data: any) {
  alert(
    Object.keys(data)
      .map((key) => `${key}: ${data[key]}`)
      .join('\n'),
  )
}

export const EmailForm: Story = {
  name: 'EmailForm',
  render: () => <EmailFormComponent onSubmit={handleSubmit} />,
}

export const OtpForm: Story = {
  name: 'OtpForm',
  render: () => <OtpFormComponent email="test@vaka.consulting" onSubmit={handleSubmit} />,
}

export const ExperienceLevelForm: Story = {
  name: 'ExperienceLevelForm',
  render: () => <ExperienceLevelFormComponent onSubmit={handleSubmit} />,
}

export const ExperienceChainsForm: Story = {
  name: 'ExperienceChainsForm',
  render: () => <ExperienceChainsFormComponent onSubmit={handleSubmit} />,
}

export const WalletSignatureForm: Story = {
  name: 'WalletSignatureForm',
  render: () => <WalletSignatureFormComponent onSubmit={handleSubmit} />,
}

export const CreateWalletForm: Story = {
  name: 'CreateWalletForm',
  render: () => <CreateWalletFormComponent onSubmit={handleSubmit} />,
}

export const WalletMethodForm: Story = {
  name: 'WalletMethodForm',
  render: () => <WalletMethodFormComponent onSubmit={handleSubmit} />,
}

export default meta
