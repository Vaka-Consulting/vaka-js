import React from 'react'
import { Box, Typography } from '@mui/material'
import { AuthWithOtp } from '../../../../common'
import { useAuthRegister } from '../../../hooks'

function AuthVerification({ otp }: AuthWithOtp) {
  const { registered, registering, error, verifyOtp } = useAuthRegister()

  React.useEffect(() => {
    void verifyOtp({ otp })
  }, [otp])

  if (registering) {
    return (
      <Box>
        <Typography component={'h1'} variant={'h6'}>
          Validating...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography component={'h1'} variant={'h6'} mb={2}>
          Error
        </Typography>
        <Typography>{error.message}</Typography>
      </Box>
    )
  }

  if (registered) {
    return (
      <Box>
        <Typography component={'h1'} variant={'h6'} mb={2}>
          Email Verified
        </Typography>
        <Typography>You have completed the registration! You are now able to log in with your account.</Typography>
      </Box>
    )
  }

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  )
}

export default AuthVerification
