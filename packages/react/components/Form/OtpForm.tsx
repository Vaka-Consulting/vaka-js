import React, { useRef } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText } from '@mui/material'
import { FormProps } from './types'

interface OtpFormData {
  email: string
  otp: string
}

interface OtpFormProps extends FormProps<OtpFormData> {
  email: string
}

const defaultValues = {
  email: '',
  otp: '',
}

const resolver = yupResolver(
  yup.object().shape({
    email: yup.string().email().required('Email Address is required'),
    otp: yup.string().required('OTP is required'),
  }),
)

function OtpForm({ email, onSubmit }: OtpFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues,
      email,
    },
    resolver,
  })

  const handleCompleted = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <Controller
        name="otp"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <MuiOtpInput
              length={6}
              {...field}
              onComplete={handleCompleted}
              autoFocus
              sx={{
                gap: 4,
                '.MuiFormControl-root, .MuiInputBase-root': { width: '100%' },
                '.MuiInputBase-root input': { fontWeight: 300, fontSize: '2rem' },
              }}
            />
            {fieldState.invalid ? <FormHelperText error>OTP invalid</FormHelperText> : null}
          </>
        )}
      />
    </form>
  )
}

export default OtpForm
