import { fetchWeb3Auth } from './api'
import {
  createLoginWithOtpRequest,
  createLoginWithWalletRequest,
  createLoginWithWalletPolicyIdRequest,
  createRequestLoginWithOtpRequest,
  createRefreshSessionRequest,
  createRegisterRequest,
  createVerifyCodeRequest,
  createResendVerificationLinkRequest,
  createGetUserRequest,
} from './api/requests'
import * as model from './web3-auth.model'

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

  private transformErrors(errors: any[]) {
    if (errors?.length) {
      const message = errors.map((error) => error.message).join(', ')

      throw new Error(message)
    }
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
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthStatus>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.requestOtp
    } catch (error) {
      this.handleError(error, `Error requesting OTP: ${error}`)
    }
  }

  public async loginWithOtp(data: model.AuthWithOtp) {
    try {
      const request = createLoginWithOtpRequest(this.apiEndpoint, data)
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthSession>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.loginOtp
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
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthSession>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.loginWallet
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async loginWithWalletPolicyId(data: model.AuthWithWalletPolicyId) {
    try {
      const request = createLoginWithWalletPolicyIdRequest(this.apiEndpoint, data)
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthSession>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.loginWithWalletPolicyId
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
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthSession>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.refreshSession
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
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthStatus>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.register
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async verifyCode(data: model.AuthVerifyCodeData) {
    try {
      const request = createVerifyCodeRequest(this.apiEndpoint, data)
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthSession>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.verifyCode
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error logging in: ${error}`)
    }
  }

  public async resendVerificationLink(data: model.AuthResendVerificationLinkData) {
    try {
      const request = createResendVerificationLinkRequest(this.apiEndpoint, data)
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthStatus>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.resendVerificationLink
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

  public async getUser(accessToken: string) {
    try {
      const request = createGetUserRequest(this.apiEndpoint, accessToken)
      const response = await fetchWeb3Auth<model.ApiResponse<model.AuthUser>>(request).then((res) => res.data)

      this.transformErrors(response.errors)

      return response.data.user
    } catch (error) {
      if (error instanceof Error) {
        throw error as Error
      }

      throw new Error(`Error getting user: ${error}`)
    }
  }
}

export default Web3AuthProvider
