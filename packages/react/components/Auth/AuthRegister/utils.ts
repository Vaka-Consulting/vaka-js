import { AuthRegisterStep } from './types'
import { ExperienceLevel } from '../../../../common'
import { AuthRegisterType } from '../../../types'

const inexperiencedLevels = [ExperienceLevel.Newbie]
const experiencedLevels = [ExperienceLevel.Beginner, ExperienceLevel.Confident, ExperienceLevel.Expert]

export const getIsNewbie = (experienceLevel: ExperienceLevel) => {
  return inexperiencedLevels.some((el) => el.includes(experienceLevel))
}

export const getIsExperienced = (experienceLevel: ExperienceLevel) => {
  return experiencedLevels.some((el) => el.includes(experienceLevel))
}

export const getFirstStep = (type: AuthRegisterType | undefined) => {
  switch (type) {
    case AuthRegisterType.Survey:
      return AuthRegisterStep.ExperienceLevel
    case AuthRegisterType.Wallet:
      return AuthRegisterStep.WalletMethod
    default:
      return AuthRegisterStep.WalletMethod
  }
}
