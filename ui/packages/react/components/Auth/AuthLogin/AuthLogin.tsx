import React from 'react'
import { useWallet } from '@meshsdk/react'
import { Box, Divider, Typography } from '@mui/material'
import AuthLoginEmail from './AuthLoginEmail'
import AuthLoginWallet from './AuthLoginWallet'
import { useAuth } from '../../../hooks'

function AuthLogin() {
  const { connected } = useWallet()
  const { email } = useAuth()

  if (connected && !email) return <AuthLoginWallet />
  if (!connected && email) return <AuthLoginEmail />

  return (
    <>
      <Box>
        <AuthLoginWallet />
      </Box>

      <Divider variant={'fullWidth'} sx={{ my: 2 }}>
        <Typography>Or</Typography>
      </Divider>

      <Box>
        <AuthLoginEmail />
      </Box>
    </>
  )
}

export default AuthLogin
