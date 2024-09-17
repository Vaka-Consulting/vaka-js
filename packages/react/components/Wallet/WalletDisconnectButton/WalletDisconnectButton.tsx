import React from 'react'
import { useWallet } from '@meshsdk/react'
import { Button, ButtonProps } from '@mui/material'

type WalletDisconnectButtonProps = ButtonProps

function WalletDisconnectButton({ children, ...props }: WalletDisconnectButtonProps) {
  const { disconnect } = useWallet()

  const handleDisconnect = () => {
    disconnect()
  }

  return (
    <Button onClick={handleDisconnect} variant="contained" color="error" {...props}>
      {children}
    </Button>
  )
}

export default WalletDisconnectButton
