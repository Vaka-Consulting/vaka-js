import React from 'react'
import { useWizard } from 'react-use-wizard'
import { useAuthRegister } from '../../../../hooks'
import ExperienceChainsForm from '../../../Form/ExperienceChainsForm'
import { AuthRegisterStep } from '../types'

function ExperienceChainsStep() {
  const { data, storeData } = useAuthRegister()
  const { experienceChains } = data
  const { nextStep, goToStep } = useWizard()

  const defaultValues = {
    experienceChains,
  }

  const handlePreviousStep = () => {
    goToStep(AuthRegisterStep.ExperienceLevel)
  }

  const handleSubmit = ({ experienceChains }: { experienceChains: string[] }) => {
    storeData({ experienceChains })

    void nextStep()
  }

  return <ExperienceChainsForm defaultValues={defaultValues} onPrevious={handlePreviousStep} onSubmit={handleSubmit} />
}

export default ExperienceChainsStep
