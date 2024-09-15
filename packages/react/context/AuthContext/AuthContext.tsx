import React, { createContext, Dispatch, useEffect, useReducer } from 'react'
import cookie from 'js-cookie'

interface AuthState {
  authenticated: boolean
  authenticating: boolean
  error: Error | undefined
  email: string | undefined
  sessionId: string | undefined
  sessionIdExpiry: string | undefined
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
}

const defaultState = {
  email: '',
  authenticated: false,
  authenticating: false,
  error: undefined,
  sessionId: undefined,
  sessionIdExpiry: undefined,
}

const reducer = (state: AuthState, action: AuthDispatchAction) => {
  switch (action.type) {
    case AuthDispatchActionType.RequestOtp:
      const { email } = action.payload
      return { ...state, email }
    case AuthDispatchActionType.Login:
      const { sessionId, sessionIdExpiry } = action.payload
      return { ...state, authenticated: true, sessionId, sessionIdExpiry }
    case AuthDispatchActionType.Logout:
      return { ...state, authenticated: false, sessionId: undefined }
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
}>({
  state: defaultState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: (): void => {},
})

function AuthContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const handleLoginWithSessionFromCookie = async () => {
    const sessionId = cookie.get('sessionId')

    if (sessionId) {
      const sessionIdExpiry = cookie.get('sessionIdExpiry')

      if (sessionIdExpiry) {
        void dispatch({ type: AuthDispatchActionType.Login, payload: { sessionId, sessionIdExpiry } })
      }
    }
  }

  useEffect(() => {
    void handleLoginWithSessionFromCookie()
  }, [])

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider, AuthDispatchActionType }
export type { AuthState }
