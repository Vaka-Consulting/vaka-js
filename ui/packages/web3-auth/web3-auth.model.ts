import {
  AuthRequestWithOtp,
  AuthWithOtp,
  AuthWithWallet,
  AuthRegisterData,
  ApiResponseStatus,
  AuthSession,
  AuthStatus,
  AuthWithWalletPolicyId,
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
  loginWithWalletPolicyId: (data: AuthWithWalletPolicyId) => Promise<AuthSession>
  refreshSession: (data: AuthSession) => Promise<AuthSession>
  register: (data: AuthRegisterData) => Promise<AuthStatus>
  logout: () => Promise<void>
}

export type { ApiResponse, AuthRequestWithOtp, AuthWithOtp, AuthWithWallet, AuthWithWalletPolicyId, AuthSession, AuthStatus, AuthRegisterData }
export { ApiResponseStatus }
