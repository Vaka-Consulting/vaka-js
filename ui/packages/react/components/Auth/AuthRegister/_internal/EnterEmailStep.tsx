import React, { useCallback, useEffect } from 'react'
import { useWizard } from 'react-use-wizard'
import { Alert, Box } from '@mui/material'
import { AuthRegisterCollectedData } from '../../../../../common'
import { useAuthRegister } from '../../../../hooks'
import { EmailForm } from '../../../Form'
import { AuthRegisterStep } from '../types'

function EnterEmailStep() {
  const { registering, registered, register, error, data, storeData } = useAuthRegister()
  const { stakeAddress, ...userData } = data
  const { goToStep } = useWizard()

  const handleSubmit = useCallback(
    (data: Partial<AuthRegisterCollectedData>) => {
      const { email } = data

      void storeData(data)
      void register({ email, stakeAddress, userData })
    },
    [register, stakeAddress, userData],
  )

  const handlePrevStep = () => {
    goToStep(AuthRegisterStep.WalletMethod)
  }

  const handleNextStep = () => {
    goToStep(AuthRegisterStep.Complete)
  }

  useEffect(() => {
    if (registered) {
      handleNextStep()
    }
  }, [registered])

  return (
    <>
      <EmailForm onPrevious={handlePrevStep} onSubmit={handleSubmit} disabled={registering} />

      {registering && (
        <Box mt={3}>
          <Alert severity={'info'}>Submitting data...</Alert>
        </Box>
      )}

      {error && (
        <Box mt={3}>
          <Alert severity={'error'}>{error.message}</Alert>
        </Box>
      )}
    </>
  )
}

export default EnterEmailStep
