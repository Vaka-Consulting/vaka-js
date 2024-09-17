import React, { useCallback } from 'react'
import { AuthWithWallet } from '@vaka-tech/common'
import { useWallet } from '@meshsdk/react'
import { Alert, Box, Typography } from '@mui/material'
import { useAuth } from '../../../hooks'
import WalletSignatureForm from '../../Form/WalletSignatureForm'
import { WalletConnector } from '../../Wallet'

function AuthLoginWithWallet() {
  const { connected } = useWallet()
  const { authenticated, loginWithWallet, error } = useAuth()

  const handleSubmit = useCallback(
    async (data: AuthWithWallet) => {
      await loginWithWallet(data)
    },
    [loginWithWallet],
  )

  return (
    <>
      <Box mb={2}>
        <Typography component={'h2'} variant={'h6'} mb={1}>
          Sign in with your dApp Wallet
        </Typography>

        <WalletConnector />

        {connected && (
          <Box mt={5}>
            <WalletSignatureForm onSubmit={handleSubmit} />
          </Box>
        )}
      </Box>

      {authenticated && (
        <Box mt={3}>
          <Alert severity={'success'}>Success!</Alert>
        </Box>
      )}

      {error && (
        <Box mt={3}>
          <Alert severity={'error'}>{error.message}</Alert>
        </Box>
      )}
    </>
  )
}

export default AuthLoginWithWallet
