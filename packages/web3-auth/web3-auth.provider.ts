import { fetchWeb3Auth } from './api'
import {
  createLoginWithOtpRequest,
  createLoginWithWalletRequest,
  createRequestLoginWithOtpRequest,
  createRefreshSessionRequest,
  createRegisterRequest,
} from './api/requests'
import * as model from './web3-auth.model'
import { AuthResponse, Session } from './web3-auth.model'

/**
 * Web3AuthProvider
 * Provider to handle authentication with Web3 & Web2
 * Web3: Wallet, Wallet Signature
 * Web2: Email, OTP (One Time Password)
 * @class Web3AuthProvider
 * @exports @class Web3AuthProvider
 */
class Web3AuthProvider implements model.Web3AuthProvider {
  constructor(private apiEndpoint: string) {}

  private validateStatus(status: model.AuthResponseStatus, message: string) {
    if (status !== model.AuthResponseStatus.Success) throw new Error(message)
  }

  private validatePayload(payload: model.Session) {
    const { sessionId, sessionIdExpiry } = payload

    if (!sessionId) throw new Error('Invalid Session ID')
    if (!sessionIdExpiry) throw new Error('Invalid Session Expire Time')
  }

  private handleError(error: unknown, fallbackMessage: string) {
    if (error instanceof Error) {
      throw error as Error
    }

    throw new Error(`${fallbackMessage}${error && `: ${error}`}`)
  }

  public async requestOtp(data: model.AuthRequestWithOtp) {
    try {
      const request = createRequestLoginWithOtpRequest(this.apiEndpoint, data)
      const apiData = await fetchWeb3Auth<model.ApiResponse<AuthResponse>>(request)
        .then((res) => res.data)
        .then((resData) => resData.data.requestOtp)

      const { status, message } = apiData

      this.validateStatus(status, message)

      return apiData
    } catch (error) {
      this.handleError(error, `Error requesting OTP: ${error}`)
    }
  }

  public async loginWithOtp(data: model.AuthWithOtp) {
    try {
      const request = createLoginWithOtpRequest(this.apiEndpoint, data)
      const apiData = await fetchWeb3Auth<model.ApiResponse<AuthResponse<Session>>>(request)
        .then((res) => res.data)
        .then((resData) => resData.data.loginOtp)

      const { status, message, payload } = apiData

      this.validateStatus(status, message)
      this.validatePayload(payload)

      return apiData
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async loginWithWallet(data: model.AuthWithWallet) {
    try {
      const request = createLoginWithWalletRequest(this.apiEndpoint, data)
      const apiData = await fetchWeb3Auth<model.ApiResponse<AuthResponse<Session>>>(request)
        .then((res) => res.data)
        .then((resData) => resData.data.loginWallet)

      const { status, message, payload } = apiData

      this.validateStatus(status, message)
      this.validatePayload(payload)

      return apiData
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async refreshSession(data: model.AuthSession) {
    try {
      const request = createRefreshSessionRequest(this.apiEndpoint, data)
      const apiData = await fetchWeb3Auth<model.ApiResponse<AuthResponse<Session>>>(request)
        .then((res) => res.data)
        .then((resData) => resData.data.refreshSession)

      const { status, message, payload } = apiData

      this.validateStatus(status, message)
      this.validatePayload(payload)

      return apiData
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async register(data: Partial<model.AuthRegisterData>) {
    try {
      const request = createRegisterRequest(this.apiEndpoint, data)
      const apiData = await fetchWeb3Auth<model.ApiResponse<AuthResponse>>(request)
        .then((res) => res.data)
        .then((resData) => resData.data.register)

      const { status, message } = apiData

      this.validateStatus(status, message)

      return apiData
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async logout() {
    try {
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging out: ${error}`)
    }
  }
}

export default Web3AuthProvider
