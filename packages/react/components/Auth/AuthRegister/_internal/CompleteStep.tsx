import React from 'react'
import { Typography } from '@mui/material'
import { useAuthRegister } from '../../../../hooks'

function CompleteStep() {
  const { data } = useAuthRegister()
  const { email, walletSignature } = data

  if (email) {
    return (
      <div>
        <Typography component="h2" variant="h6">
          Thank you for registering
        </Typography>
        <Typography>Please check you inbox to complete the registration.</Typography>
      </div>
    )
  }

  if (walletSignature) {
    return (
      <div>
        <Typography component="h2" variant="h6">
          Success
        </Typography>
        <Typography>Thank you for registering! You are now able to log in.</Typography>
      </div>
    )
  }

  return (
    <div>
      <h2>Something went wrong</h2>
      <p>Please try again.</p>
    </div>
  )
}

export default CompleteStep
