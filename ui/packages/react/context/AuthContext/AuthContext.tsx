import React, { createContext, Dispatch, useEffect, useReducer } from 'react'
import type { Web3AuthProvider } from '@vaka-tech/web3-auth'
import cookie from 'js-cookie'

interface AuthState {
  authenticated: boolean
  authenticating: boolean
  error: Error | undefined
  email: string | undefined
  accessToken: string | undefined
}

type AuthDispatchActionPayload = Partial<AuthState>

enum AuthDispatchActionType {
  Login = 'LOGIN',
  RequestOtp = 'REQUEST_OTP',
  Logout = 'LOGOUT',
  Error = 'ERROR',
}

interface AuthDispatchAction {
  payload: AuthDispatchActionPayload
  type: AuthDispatchActionType
}

interface Props {
  children: React.ReactNode
  provider: Web3AuthProvider
}

const defaultState = {
  email: '',
  authenticated: false,
  authenticating: false,
  error: undefined,
  accessToken: undefined,
}

const reducer = (state: AuthState, action: AuthDispatchAction) => {
  switch (action.type) {
    case AuthDispatchActionType.RequestOtp:
      const { email } = action.payload
      return { ...state, email }
    case AuthDispatchActionType.Login:
      const { accessToken } = action.payload
      return { ...state, authenticated: true, accessToken }
    case AuthDispatchActionType.Logout:
      return { ...state, authenticated: false, accessToken: undefined }
    case AuthDispatchActionType.Error:
      const { error } = action.payload
      return { ...state, error }
    default:
      throw new Error()
  }
}

const AuthContext = createContext<{
  state: AuthState
  dispatch: Dispatch<AuthDispatchAction>
  provider: Web3AuthProvider
}>({
  state: defaultState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: (): void => {},
  provider: {} as Web3AuthProvider,
})

function AuthContextProvider({ children, provider }: Props) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const handleLoginWithSessionFromCookie = async () => {
    const accessToken = cookie.get('access_token')

    if (accessToken) {
      void dispatch({ type: AuthDispatchActionType.Login, payload: { accessToken } })
    }
  }

  useEffect(() => {
    void handleLoginWithSessionFromCookie()
  }, [])

  return <AuthContext.Provider value={{ state, dispatch, provider }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider, AuthDispatchActionType }
export type { AuthState }
