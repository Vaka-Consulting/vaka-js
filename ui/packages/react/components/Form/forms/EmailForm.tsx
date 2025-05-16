import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Email as EmailIcon } from '@mui/icons-material'
import { Button, FormControl, TextField, Stack, Box } from '@mui/material'
import FormErrorsNotification from '../_internal/FormErrorsNotification'
import { FormProps } from '../types'

interface EmailFormData {
  email: string
}

const defaultValues = {
  email: '',
}

const resolver = yupResolver(
  yup.object().shape({
    email: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
  }),
)

function EmailForm({ onSubmit, disabled }: FormProps<EmailFormData>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" alignItems={'flex-start'} spacing={2}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ width: '100%' }}>
              <TextField
                {...field}
                type={'email'}
                label={'Email'}
                placeholder={'Enter your email address'}
                size={'small'}
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) ? errors.email?.message : ''}
                disabled={disabled}
                fullWidth
              />
            </FormControl>
          )}
        />

        <Button
          type="submit"
          startIcon={<EmailIcon />}
          variant={'contained'}
          sx={{ flexShrink: 0, position: 'relative', top: 2, textTransform: 'none' }}
          disabled={disabled}
        >
          Submit
        </Button>
      </Stack>

      {Object.keys(errors).length > 0 && (
        <Box mt={2}>
          <FormErrorsNotification errors={errors} />
        </Box>
      )}
    </form>
  )
}

export default EmailForm
