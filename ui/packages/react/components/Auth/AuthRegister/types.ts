import type { UserAuthRegisterUserData, AuthRegisterData } from '@vaka-tech/common'

export interface RegisterFormProps {
  onSubmit: (values: Partial<AuthRegisterData> | Partial<UserAuthRegisterUserData>) => void
  onBack?: () => void
}

export enum AuthRegisterStep {
  ExperienceLevel = 0,
  ExperienceChains = 1,
  WalletMethod = 2,
  WalletSignature = 3,
  CreateWallet = 4,
  EnterEmail = 5,
  Complete = 6,
}
