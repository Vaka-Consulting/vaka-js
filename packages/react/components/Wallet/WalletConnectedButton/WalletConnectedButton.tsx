import React, { MouseEvent, useCallback, useEffect } from 'react'
import { Wallet } from '@meshsdk/core'
import { useWallet, useWalletList } from '@meshsdk/react'
import { Box, Button, ButtonProps } from '@mui/material'
import WalletBalance from '../WalletBalance/WalletBalance'

export type WalletConnectedProps = ButtonProps & {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function WalletConnectedButton({ onClick, sx, ...props }: WalletConnectedProps) {
  const { name, connected, disconnect } = useWallet()
  const walletList = useWalletList()

  const [connectedWallet, setConnectedWallet] = React.useState<Wallet | undefined>(undefined)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick(event)
  }

  const handleClickOnFailed = useCallback(() => disconnect(), [])

  useEffect(() => {
    if (connected && walletList.length) {
      const connectedWallet = walletList.find((wallet) => wallet.name.toLowerCase() === name.toLowerCase())

      setConnectedWallet(connectedWallet)
    }
  }, [connected, walletList])

  if (connectedWallet) {
    return (
      <Button
        color={'info'}
        variant={'outlined'}
        onClick={handleClick}
        sx={{ textTransform: 'none', display: 'flex', alignItems: 'center', ...sx }}
        {...props}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Box mr={1} sx={{ position: 'relative', top: 4 }}>
            <img src={connectedWallet.icon} width={24} height={24} alt={'wallet icon'} />
          </Box>
          <WalletBalance />
        </Box>
      </Button>
    )
  }

  return <Button onClick={handleClickOnFailed}>Failed...</Button>
}

export default WalletConnectedButton
