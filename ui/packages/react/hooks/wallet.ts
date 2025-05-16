import { useContext } from 'react'
import { WalletExtended, WalletExtendedContext } from '../context'

export const useWalletExtended = (): WalletExtended => {
  return useContext(WalletExtendedContext)
}
