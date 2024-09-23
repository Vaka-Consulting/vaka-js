import React from 'react'
import { Typography } from '@mui/material'
import { toCryptoCurrencyAmount } from '@vaka-tech/common'
import { useWalletExtended } from '../../../hooks'

function WalletBalance() {
  const { projectTokenBalance, projectTokenName } = useWalletExtended()

  const formattedCurrency = toCryptoCurrencyAmount(projectTokenBalance || 0)

  return (
    <Typography component={'span'}>
      {formattedCurrency} {projectTokenName}
    </Typography>
  )
}

export default WalletBalance
