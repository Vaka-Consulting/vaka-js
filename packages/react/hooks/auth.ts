import { useCallback, useContext } from 'react'
import {
  AuthRegisterCollectedData,
  AuthRegisterData,
  AuthRequestWithOtp,
  AuthWithOtp,
  AuthWithWallet,
} from '@vaka-tech/common'
import cookie from 'js-cookie'
import {
  AuthContext,
  AuthDispatchActionType,
  AuthRegisterContext,
  AuthRegisterDispatchActionType,
  AuthRegisterState,
  AuthState,
} from '../context'

interface Auth extends AuthState {
  requestOtp: (data: AuthRequestWithOtp) => Promise<void>
  loginWithEmail: (data: AuthWithOtp) => Promise<void>
  loginWithWallet: (data: AuthWithWallet) => Promise<void>
  refreshSession: () => Promise<void>
  logout: () => Promise<void>
}

interface AuthRegister extends AuthRegisterState {
  register: (data: Partial<AuthRegisterData>) => Promise<void>
  storeData: (data: Partial<AuthRegisterCollectedData>) => void
}

function useAuth(): Auth {
  const { state, dispatch, provider } = useContext(AuthContext)

  const _handleError = (error: Error | string) => {
    let errorObj: Error = new Error(error as string)

    if (error instanceof Error) {
      errorObj = error as Error
    }

    void dispatch({ type: AuthDispatchActionType.Error, payload: { error: errorObj } })
  }

  const _handleLogin = (sessionId: string, sessionIdExpiry: string) => {
    cookie.set('sessionId', sessionId)
    cookie.set('sessionIdExpiry', sessionIdExpiry)

    void dispatch({ type: AuthDispatchActionType.Login, payload: { sessionId, sessionIdExpiry } })
  }

  const _handleLogout = useCallback(() => {
    cookie.remove('sessionId')

    void dispatch({ type: AuthDispatchActionType.Logout, payload: { sessionId: undefined } })
  }, [])

  /**
   * Request OTP
   * @param data
   */
  const requestOtp = async (data: AuthRequestWithOtp) => {
    try {
      const { email } = data
      await provider.requestOtp({ email })
      void dispatch({ type: AuthDispatchActionType.RequestOtp, payload: { email } })
    } catch (error) {
      _handleError(`Error requesting One Time Password: ${error || ''}`)
    }
  }

  /**
   * Login with Email
   * @param data
   */
  const loginWithEmail = async (data: AuthWithOtp) => {
    try {
      const { email, otp } = data
      const {
        payload: { sessionId, sessionIdExpiry },
      } = await provider.loginWithOtp({ email, otp })

      _handleLogin(sessionId, sessionIdExpiry)
    } catch (error) {
      _handleError(`Error logging in with Email: ${error || ''}`)
    }
  }

  const loginWithWallet = async (data: AuthWithWallet) => {
    try {
      const { stakeAddress, walletSignature } = data
      const {
        payload: { sessionId, sessionIdExpiry },
      } = await provider.loginWithWallet({ stakeAddress, walletSignature })

      _handleLogin(sessionId, sessionIdExpiry)
    } catch (error) {
      _handleError(`Error logging in with wallet: ${error || ''}`)
    }
  }

  const refreshSession = useCallback(async () => {
    try {
      if (!state.sessionId) throw new Error('No session ID found')

      const {
        payload: { sessionId, sessionIdExpiry },
      } = await provider.refreshSession({ sessionId: state.sessionId })

      _handleLogin(sessionId, sessionIdExpiry)
    } catch (error) {
      _handleError(`Error refreshing session: ${error || ''}`)
    }
  }, [state.sessionId])

  const logout = useCallback(async () => {
    try {
      await provider.logout()

      _handleLogout()
    } catch (error) {
      _handleError(`Error logging out: ${error || ''}`)
    }
  }, [])

  return {
    ...state,
    requestOtp,
    loginWithEmail,
    loginWithWallet,
    logout,
    refreshSession,
  }
}

const useAuthRegister = (): AuthRegister => {
  const { state, dispatch, provider } = useContext(AuthRegisterContext)

  const register = async (data: Partial<AuthRegisterData>) => {
    try {
      void dispatch({ type: AuthRegisterDispatchActionType.SubmitRegistration, payload: {} })

      await provider.register(data)

      void dispatch({ type: AuthRegisterDispatchActionType.RegistrationCompleted, payload: {} })
    } catch (error) {
      let errorObj: Error = new Error(error as string)

      if (error instanceof Error) {
        errorObj = error as Error
      }

      void dispatch({ type: AuthRegisterDispatchActionType.Error, payload: { error: errorObj } })
    }
  }

  const storeData = (data: Partial<AuthRegisterCollectedData>) => {
    dispatch({ type: AuthRegisterDispatchActionType.StoreData, payload: { data } })
  }

  return {
    ...state,
    register,
    storeData: storeData,
  }
}

export { useAuth, useAuthRegister }
