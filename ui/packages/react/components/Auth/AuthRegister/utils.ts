import { AuthRegisterStep } from './types'
import { ExperienceLevel } from '../../../../common'

const inexperiencedLevels = [ExperienceLevel.Newbie]
const experiencedLevels = [ExperienceLevel.Beginner, ExperienceLevel.Confident, ExperienceLevel.Expert]

export const getIsNewbie = (experienceLevel: ExperienceLevel) => {
  return inexperiencedLevels.some((el) => el.includes(experienceLevel))
}

export const getIsExperienced = (experienceLevel: ExperienceLevel) => {
  return experiencedLevels.some((el) => el.includes(experienceLevel))
}

export const getFirstStep = (survey: boolean) => {
  if (survey) {
    return AuthRegisterStep.ExperienceLevel
  } else {
    return AuthRegisterStep.WalletMethod
  }
}
