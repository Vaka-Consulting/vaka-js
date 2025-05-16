import React from 'react'
import { AccountBalanceWallet as AccountBalanceWalletIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

function Connecting() {
  return (
    <LoadingButton
      variant={'contained'}
      loading={true}
      loadingPosition={'start'}
      startIcon={<AccountBalanceWalletIcon />}
    >
      Connecting wallet
    </LoadingButton>
  )
}

export default Connecting
