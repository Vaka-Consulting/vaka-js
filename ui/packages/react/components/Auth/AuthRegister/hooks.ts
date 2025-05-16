import { useEffect } from 'react'
import { useWizard } from 'react-use-wizard'
import { AuthRegisterStep } from './types'
import { useAuthRegister } from '../../../hooks'

export const useAuthRegisterSteps = () => {
  const { goToStep } = useWizard()
  const { data, registered, register } = useAuthRegister()
  const { email, stakeAddress, walletSignature, ...userData } = data

  /**
   * Register - connected wallet
   */
  useEffect(() => {
    if (stakeAddress && walletSignature) {
      void register({ stakeAddress, walletSignature, userData })
    }
  }, [stakeAddress, walletSignature])

  /**
   * Register - email address
   */
  useEffect(() => {
    if (stakeAddress && walletSignature) {
      void register({ email, stakeAddress, userData })
    }
  }, [email, stakeAddress])

  /**
   * Registered
   * When: register through the provider has been successful
   */
  useEffect(() => {
    if (registered) {
      goToStep(AuthRegisterStep.Complete)
    }
  }, [registered])
}
