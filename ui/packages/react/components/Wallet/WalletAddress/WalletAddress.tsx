import React, { useMemo } from 'react'
import { useWallet, useAddress, useWalletList } from '@meshsdk/react'
import { AccountBalanceWallet as AccountBalanceWalletIcon } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { truncateStringInMiddle } from '../../../../common'
import { CopyToClipboard } from '../../CopyToClipboard'

interface Props {
  truncateCharsFrom?: number
}

const label = 'Wallet Address'

function WalletAddress({ truncateCharsFrom }: Props) {
  const { connected, name } = useWallet()
  const wallets = useWalletList()
  const address = useAddress()

  const truncatedAddress = useMemo(
    () => (address ? truncateStringInMiddle(address, truncateCharsFrom) : 'Wallet not connected'),
    [address],
  )

  const connectedWalletInfo = useMemo(
    () => wallets.find((wallet) => wallet.name.toUpperCase() === name.toUpperCase()),
    [wallets, name],
  )

  if (!connected) {
    return (
      <TextField
        InputProps={{
          startAdornment: <AccountBalanceWalletIcon sx={{ mr: 1 }} />,
        }}
        label={label}
        value="No connected wallet found"
        fullWidth
        disabled
      />
    )
  }

  return (
    <CopyToClipboard
      label={label}
      startIcon={<img src={connectedWalletInfo?.icon} alt="wallet-icon" height={24} width={24} />}
      copy={address}
    >
      {truncatedAddress}
    </CopyToClipboard>
  )
}

export default WalletAddress
