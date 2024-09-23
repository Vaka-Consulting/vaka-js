import React from 'react'
import { useForm } from 'react-hook-form'
import { useWallet } from '@meshsdk/react'
import { Box, Button } from '@mui/material'
import { WalletSignature } from '../../../../common'
import { WalletDisconnectButton } from '../../Wallet'
import WalletAddress from '../../Wallet/WalletAddress'
import { FormProps } from '../types'

interface FormData {
  stakeAddress: string
  walletSignature: WalletSignature
}

const walletSignatureMessage = 'Hello'

function WalletSignatureForm({ onSubmit }: FormProps<FormData>) {
  const { wallet } = useWallet()
  const { handleSubmit } = useForm()

  const handleFormSubmit = async () => {
    const stakeAddress = await wallet.getRewardAddresses().then((addresses) => addresses[0])
    const walletSignature = await wallet.signData(stakeAddress, walletSignatureMessage)

    onSubmit({
      stakeAddress,
      walletSignature,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={3}>
        <WalletAddress truncateCharsFrom={40} />
      </Box>
      <Box sx={{ display: 'flex', alignItem: 'center', gap: 2 }}>
        <WalletDisconnectButton size="large" sx={{ textTransform: 'none' }} variant={'text'}>
          Disconnect Wallet
        </WalletDisconnectButton>
        <Button variant={'contained'} color={'success'} size={'large'} type={'submit'} sx={{ textTransform: 'none' }}>
          Sign Wallet
        </Button>
      </Box>
    </form>
  )
}

export default WalletSignatureForm
