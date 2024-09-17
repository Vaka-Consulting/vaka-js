import React, { ReactNode } from 'react'
import { useWallet } from '@meshsdk/react'
import Connected from './_internal/Connected'
import Connecting from './_internal/Connecting'
import Disconnected from './_internal/Disconnected'

interface Props {
  children?: ReactNode
  disabled?: boolean
}

function WalletConnector({ children = 'Connect Wallet', disabled = false }: Props) {
  const { connected, connecting } = useWallet()

  if (connecting) return <Connecting />
  if (connected) return <Connected />

  return <Disconnected disabled={disabled}>{children}</Disconnected>
}

export default WalletConnector
