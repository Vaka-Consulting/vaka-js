import React, { createContext } from 'react'
import { defaultState } from './constants'
import { useWalletExtendedStore } from './hooks'
import { WalletExtendedProps, WalletExtendedState } from './types'

interface Props extends WalletExtendedProps {
  children: React.ReactNode
}

const WalletExtendedContext = createContext<WalletExtendedState>(defaultState)

function WalletExtendedContextProvider({ children, ...props }: Props) {
  const store = useWalletExtendedStore(props)

  return (
    <WalletExtendedContext.Provider value={store}>
      <>{children}</>
    </WalletExtendedContext.Provider>
  )
}

export { WalletExtendedContext, WalletExtendedContextProvider }
