import React, { createContext, Dispatch, useReducer } from 'react'
import { AuthRegisterCollectedData } from '@vaka-tech/common'
import type { Web3AuthProvider } from '@vaka-tech/web3-auth'
import { AuthRegisterConfig } from '../../types'

interface AuthRegisterState {
  registered: boolean
  registering: boolean
  error: Error | undefined
  data: Partial<AuthRegisterCollectedData>
}

type AuthRegisterDispatchActionPayload = Partial<AuthRegisterState>

enum AuthRegisterDispatchActionType {
  SubmitRegistration = 'SUBMIT_REGISTRATION',
  RegistrationCompleted = 'COMPLETE_REGISTRATION',
  ResetRegistration = 'RESET_REGISTRATION',
  StoreData = 'STORE_DATA',
  Error = 'ERROR_REGISTRATION',
}

interface AuthRegisterDispatchAction {
  payload: AuthRegisterDispatchActionPayload
  type: AuthRegisterDispatchActionType
}

interface AuthRegisterContextProviderProps {
  config?: AuthRegisterConfig
  children: React.ReactNode
  provider: Web3AuthProvider
}

const DEFAULT_STATE: AuthRegisterState = {
  registering: false,
  registered: false,
  error: undefined,
  data: {
    experienceChains: [],
    experienceLevel: undefined,
    walletMethod: undefined,
    email: undefined,
    stakeAddress: undefined,
    walletSignature: undefined,
  },
}

const DEFAULT_CONFIG: AuthRegisterConfig = {
  survey: false,
  connectWallet: true,
  createWallet: true,
}

const reducer = (state: AuthRegisterState, action: AuthRegisterDispatchAction) => {
  switch (action.type) {
    case AuthRegisterDispatchActionType.StoreData:
      const { data } = action.payload
      return { ...state, data: { ...state.data, ...data } }
    case AuthRegisterDispatchActionType.SubmitRegistration:
      return { ...state, registered: false, registering: true, error: undefined }
    case AuthRegisterDispatchActionType.RegistrationCompleted:
      return { ...state, registered: true, registering: false }
    case AuthRegisterDispatchActionType.ResetRegistration:
      return { ...DEFAULT_STATE }
    case AuthRegisterDispatchActionType.Error:
      const { error } = action.payload
      return { ...DEFAULT_STATE, error }
    default:
      throw new Error()
  }
}

const AuthRegisterContext = createContext<{
  state: AuthRegisterState
  dispatch: Dispatch<AuthRegisterDispatchAction>
  config: AuthRegisterConfig
  provider: Web3AuthProvider
}>({
  state: DEFAULT_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: (): void => {},
  config: DEFAULT_CONFIG,
  provider: {} as Web3AuthProvider,
})

function AuthRegisterContextProvider({
  children,
  config = DEFAULT_CONFIG,
  provider,
}: AuthRegisterContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)

  return (
    <AuthRegisterContext.Provider value={{ state, dispatch, config, provider }}>
      <>{children}</>
    </AuthRegisterContext.Provider>
  )
}

export { AuthRegisterContext, AuthRegisterContextProvider, AuthRegisterDispatchActionType }
export type { AuthRegisterState }
