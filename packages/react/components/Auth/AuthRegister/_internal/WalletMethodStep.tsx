import React, { useEffect } from 'react'
import { useWizard } from 'react-use-wizard'
import { AuthRegisterCollectedData, WalletMethod } from '../../../../../common'
import { useAuthRegister } from '../../../../hooks'
import WalletMethodForm from '../../../Form/WalletMethodForm'
import { AuthRegisterStep } from '../types'

const _getNextStep = (walletMethod: WalletMethod): number => {
  switch (walletMethod) {
    case WalletMethod.Created:
      return AuthRegisterStep.CreateWallet
    case WalletMethod.Connected:
      return AuthRegisterStep.WalletSignature
    case WalletMethod.Supplied:
      return AuthRegisterStep.EnterEmail
  }
}

function WalletMethodStep() {
  const { data, storeData } = useAuthRegister()
  const { experienceLevel, experienceChains } = data
  const { goToStep } = useWizard()

  const hasExperience = experienceLevel && experienceChains && experienceChains?.length > 0

  const handleSubmit = (data: Partial<AuthRegisterCollectedData>) => {
    const { walletMethod } = data

    storeData(data)

    if (walletMethod) {
      goToStep(_getNextStep(walletMethod))
    }
  }

  const handlePreviousStep = () => {
    goToStep(AuthRegisterStep.ExperienceChains)
  }

  return <WalletMethodForm onPrevious={hasExperience ? handlePreviousStep : undefined} onSubmit={handleSubmit} />
}

export default WalletMethodStep
