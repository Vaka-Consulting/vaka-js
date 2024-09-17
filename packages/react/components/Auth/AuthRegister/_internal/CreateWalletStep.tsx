import React, { useEffect } from 'react'
import { ExperienceLevel } from '@vaka-tech/common'
import { useWizard } from 'react-use-wizard'
import { Box, Typography } from '@mui/material'
import { useAuthRegister } from '../../../../hooks'
import CreateWalletForm from '../../../Form/CreateWalletForm'
import { AuthRegisterStep } from '../types'

const _getPreviousStep = (experienceLevel?: ExperienceLevel): number => {
  return experienceLevel === ExperienceLevel.Newbie ? AuthRegisterStep.ExperienceLevel : AuthRegisterStep.WalletMethod
}

function CreateWalletStep() {
  const { data, storeData } = useAuthRegister()
  const { experienceLevel, stakeAddress } = data
  const { nextStep, goToStep } = useWizard()

  const handlePreviousStep = () => {
    goToStep(_getPreviousStep(experienceLevel))
  }

  useEffect(() => {
    if (stakeAddress) {
      void nextStep()
    }
  }, [stakeAddress, nextStep])

  return (
    <>
      <Box mb={4}>
        <Typography variant="h6">Create new wallet</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis
          ac neque.
        </Typography>
      </Box>
      <CreateWalletForm onPrevious={handlePreviousStep} onSubmit={storeData} />
    </>
  )
}

export default CreateWalletStep
