import React from 'react'
import { Wizard } from 'react-use-wizard'
import CompleteStep from './_internal/CompleteStep'
import CreateWalletStep from './_internal/CreateWalletStep'
import EnterEmailStep from './_internal/EnterEmailStep'
import ExperienceChainsStep from './_internal/ExperienceChainsStep'
import ExperienceLevelStep from './_internal/ExperienceLevelStep'
import WalletMethodStep from './_internal/WalletMethodStep'
import WalletSignatureStep from './_internal/WalletSignatureStep'
import { getFirstStep } from './utils'
import { useAuthRegister } from '../../../hooks'

function AuthRegister() {
  const { config } = useAuthRegister()
  const { survey } = config

  const firstStep = getFirstStep(survey)

  return (
    <Wizard startIndex={firstStep}>
      <ExperienceLevelStep />
      <ExperienceChainsStep />
      <WalletMethodStep />
      <WalletSignatureStep />
      <CreateWalletStep />
      <EnterEmailStep />
      <CompleteStep />
    </Wizard>
  )
}

export default AuthRegister
