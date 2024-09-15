import React, { createContext, Dispatch, useReducer } from 'react'
import { AuthRegisterCollectedData } from '@vaka-tech/common'

interface AuthRegisterState {
  registered: boolean
  registering: boolean
  error: Error | undefined
  data: Partial<AuthRegisterCollectedData>
}

type AuthRegisterDispatchActionPayload = Partial<AuthRegisterState>

enum AuthRegisterDispatchActionType {
  SubmitRegistration = 'START_REGISTRATION',
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
  children: React.ReactNode
}

const defaultState = {
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

const reducer = (state: AuthRegisterState, action: AuthRegisterDispatchAction) => {
  switch (action.type) {
    case AuthRegisterDispatchActionType.StoreData:
      const { data } = action.payload
      return { ...state, data: { ...state.data, ...data } }
    case AuthRegisterDispatchActionType.SubmitRegistration:
      return { ...state, registered: false, registering: false }
    case AuthRegisterDispatchActionType.RegistrationCompleted:
      return { ...state, registered: true, registering: false }
    case AuthRegisterDispatchActionType.ResetRegistration:
      return { ...defaultState }
    case AuthRegisterDispatchActionType.Error:
      return { ...defaultState }
    default:
      throw new Error()
  }
}

const AuthRegisterContext = createContext<{
  state: AuthRegisterState
  dispatch: Dispatch<AuthRegisterDispatchAction>
}>({
  state: defaultState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: (): void => {},
})

function AuthRegisterContextProvider({ children }: AuthRegisterContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <AuthRegisterContext.Provider value={{ state, dispatch }}>
      <>{children}</>
    </AuthRegisterContext.Provider>
  )
}

export { AuthRegisterContext, AuthRegisterContextProvider, AuthRegisterDispatchActionType }
export type { AuthRegisterState }