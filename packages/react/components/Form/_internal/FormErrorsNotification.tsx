import React from 'react'
import { FieldErrors } from 'react-hook-form'
import { Alert } from '@mui/material'

interface FormErrorNotificationProps {
  errors: FieldErrors
}

function FormErrorsNotification({ errors }: FormErrorNotificationProps) {
  return (
    <Alert severity={'error'} sx={{ mb: 5 }}>
      There are errors in the form. Please correct them before continuing.
      <ul>
        {Object.keys(errors).map((key) => (
          <li key={key}>{errors?.[key]?.message ? <>{errors[key]?.message}</> : 'Unknown error'}</li>
        ))}
      </ul>
    </Alert>
  )
}

export default FormErrorsNotification
