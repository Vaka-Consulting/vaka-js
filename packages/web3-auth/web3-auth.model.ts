import {
  AuthRequestWithOtp,
  AuthWithOtp,
  AuthWithWallet,
  AuthRegisterData,
  ApiResponseStatus as AuthResponseStatus,
  AuthSession,
  SessionID,
} from '@vaka-tech/common'

export interface Session {
  sessionId: SessionID
  sessionIdExpiry: string
}

export interface AuthResponse<TData = undefined> {
  status: AuthResponseStatus
  message: string
  payload: TData
}

export interface ApiResponse<TResponse> {
  data: {
    [key: string]: TResponse
  }
}

export interface Web3AuthProvider {
  requestOtp: (data: AuthRequestWithOtp) => Promise<AuthResponse | undefined>
  loginWithOtp: (data: AuthWithOtp) => Promise<AuthResponse<Session>>
  loginWithWallet: (data: AuthWithWallet) => Promise<AuthResponse<Session>>
  refreshSession: (data: AuthSession) => Promise<AuthResponse<Session>>
  register: (data: AuthRegisterData) => Promise<AuthResponse>
  logout: () => Promise<void>
}

export type { AuthRequestWithOtp, AuthWithOtp, AuthWithWallet, AuthSession, AuthRegisterData }
export { AuthResponseStatus }
