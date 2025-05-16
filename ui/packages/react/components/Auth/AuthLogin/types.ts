import type { AuthValues } from '@vaka-tech/common'

export interface LoginFormProps {
  onSubmit: (data: Partial<AuthValues>) => void
}
