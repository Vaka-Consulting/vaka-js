import {
  AuthRequestWithOtp,
  AuthWithOtp,
  AuthWithWallet,
  AuthRegisterData,
  ApiResponseStatus,
  AuthSession,
  AuthStatus,
} from '@vaka-tech/common'

interface ApiResponse<TResponse> {
  data: {
    [key: string]: TResponse
  }
  errors: any[]
}

export interface Web3AuthProvider {
  requestOtp: (data: AuthRequestWithOtp) => Promise<AuthStatus | undefined>
  loginWithOtp: (data: AuthWithOtp) => Promise<AuthSession>
  loginWithWallet: (data: AuthWithWallet) => Promise<AuthSession>
  refreshSession: (data: AuthSession) => Promise<AuthSession>
  register: (data: AuthRegisterData) => Promise<AuthStatus>
  logout: () => Promise<void>
}

export type { ApiResponse, AuthRequestWithOtp, AuthWithOtp, AuthWithWallet, AuthSession, AuthStatus, AuthRegisterData }
export { ApiResponseStatus }
