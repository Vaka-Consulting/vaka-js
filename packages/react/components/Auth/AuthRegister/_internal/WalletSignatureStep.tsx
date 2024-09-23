import React, { useEffect } from 'react'
import { useWizard } from 'react-use-wizard'
import { useWallet } from '@meshsdk/react'
import { WalletSignature } from '../../../../../common'
import { useAuthRegister } from '../../../../hooks'
import WalletSignatureForm from '../../../Form/forms/WalletSignatureForm'
import { AuthRegisterStep } from '../types'

const initialData = {
  stakeAddress: undefined,
  walletSignature: undefined,
}

function WalletSignatureStep() {
  const { connected } = useWallet()
  const { data: userData, storeData, registered, register } = useAuthRegister()
  const { goToStep } = useWizard()

  const resetCurrentStepData = () => {
    storeData(initialData)
  }

  const handlePrevStep = () => {
    resetCurrentStepData()
    goToStep(AuthRegisterStep.WalletMethod)
  }

  const handleNextStep = () => {
    goToStep(AuthRegisterStep.Complete)
  }

  /**
   * Disconnected
   * When: User disconnects wallet and has to reconnect again on prev page.
   */
  useEffect(() => {
    if (!connected) {
      handlePrevStep()
    }
  }, [connected])

  /**
   * Register user
   * When: stakeAddress & walletSignature are submitted through the form and state has been updated
   */
  const handleSubmit = (data: { stakeAddress: string; walletSignature: WalletSignature }) => {
    const { stakeAddress, walletSignature } = data

    if (stakeAddress && walletSignature) {
      void storeData(data)
      void register({ stakeAddress, walletSignature, userData })
    }
  }

  /**
   * Registered
   * When: register through provider has been successful
   */
  useEffect(() => {
    if (registered) {
      handleNextStep()
    }
  }, [registered])

  return <WalletSignatureForm onPrevious={handlePrevStep} onSubmit={handleSubmit} />
}

export default WalletSignatureStep
