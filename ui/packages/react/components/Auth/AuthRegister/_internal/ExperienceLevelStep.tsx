import React from 'react'
import { useWizard } from 'react-use-wizard'
import { ExperienceLevel } from '../../../../../common'
import { useAuthRegister } from '../../../../hooks'
import ExperienceLevelForm from '../../../Form/forms/ExperienceLevelForm'
import { AuthRegisterStep } from '../types'
import { getIsExperienced, getIsNewbie } from '../utils'

const _getNextStep = (experienceLevel: ExperienceLevel) => {
  const isNewbie = getIsNewbie(experienceLevel)
  const isExperienced = getIsExperienced(experienceLevel)

  if (isNewbie) {
    return AuthRegisterStep.CreateWallet
  } else if (isExperienced) {
    return AuthRegisterStep.ExperienceChains
  }

  return AuthRegisterStep.CreateWallet
}

function ExperienceLevelStep() {
  const { data, storeData } = useAuthRegister()
  const { experienceLevel } = data
  const { goToStep } = useWizard()

  const defaultValues = {
    experienceLevel,
  }

  const handleSubmit = ({ experienceLevel }: { experienceLevel: ExperienceLevel }) => {
    const nextStep = _getNextStep(experienceLevel)

    storeData({ experienceLevel })
    goToStep(nextStep)
  }

  return <ExperienceLevelForm defaultValues={defaultValues} onSubmit={handleSubmit} />
}

export default ExperienceLevelStep
