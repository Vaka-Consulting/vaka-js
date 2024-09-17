import React, { useCallback } from 'react'
import { AuthWithOtp, AuthRequestWithOtp } from '@vaka-tech/common'
import { Alert, Box, Link, Typography } from '@mui/material'
import { useAuth } from '../../../hooks'
import EmailForm from '../../Form/EmailForm'
import OtpForm from '../../Form/OtpForm'

function AuthLoginEmail() {
  const { authenticated, email, loginWithEmail, requestOtp, error } = useAuth()

  const handleSubmitOtp = useCallback(
    async (data: AuthWithOtp) => {
      await loginWithEmail(data)
    },
    [loginWithEmail],
  )
  const handleSubmitEmail = useCallback(
    async (data: AuthRequestWithOtp) => {
      await requestOtp(data)
    },
    [requestOtp],
  )

  // OTP FROM EMAIL
  if (email)
    return (
      <>
        <Typography component={'h2'} variant={'h6'}>
          Enter confirmation code
        </Typography>
        <Typography mb={4}>
          An email has been sent to <Link href="#">{email}</Link> with a confirmation code. Please enter the code below
          to continue.
        </Typography>
        <OtpForm email={email} onSubmit={handleSubmitOtp} />

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

  // OTP REQUEST WITH EMAIL
  return (
    <>
      <Typography component={'h2'} variant={'h6'} mb={2}>
        Sign in with your email
      </Typography>

      <EmailForm onSubmit={handleSubmitEmail} />

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

export default AuthLoginEmail
