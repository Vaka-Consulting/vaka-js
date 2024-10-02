import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { string, mixed, object, ObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { resolveRewardAddress } from '@meshsdk/core'
import { useAddress, useWallet } from '@meshsdk/react'
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { WalletMethod } from '../../../../common'
import { WalletConnector } from '../../Wallet'
import FormButtons from '../_internal/FormButtons'
import FormErrorNotification from '../_internal/FormErrorsNotification'
import { FormProps } from '../types'

interface FormSubmitData {
  walletAddress?: string
  stakeAddress?: string
  walletMethod: WalletMethod
}

interface WalletMethodFormProps extends FormProps<FormSubmitData> {
  canCreateWallet: boolean
  canConnectWallet: boolean
}

const validationSchema: ObjectSchema<FormSubmitData> = object().shape({
  stakeAddress: string(),
  walletAddress: string().when('walletMethod', {
    is: (val: WalletMethod) => val === WalletMethod.Supplied,
    then: () => string().required('Please enter your wallet address.'),
  }),
  walletMethod: mixed<WalletMethod>().oneOf(Object.values(WalletMethod)).required('Please provide a wallet method.'),
})

const defaultValues = validationSchema.getDefault()

function WalletMethodForm({ canCreateWallet, canConnectWallet, onPrevious, onSubmit }: WalletMethodFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const { connected } = useWallet()
  const walletAddress = useAddress()

  const handleFormSubmit = (data: FormSubmitData) => {
    const { walletAddress, walletMethod } = data
    let { stakeAddress } = data

    try {
      if (walletAddress) {
        stakeAddress = resolveRewardAddress(walletAddress)
      }

      onSubmit({
        walletMethod,
        walletAddress,
        stakeAddress,
      })
    } catch {
      setError('walletAddress', {
        type: 'manual',
        message: 'Invalid wallet address',
      })
    }
  }

  const handleWalletAddressInput = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    if (value && value !== '') {
      setValue('walletMethod', WalletMethod.Supplied)
    } else {
      setValue('walletMethod', undefined)
    }
  }

  useEffect(() => {
    if (connected) {
      setValue('walletMethod', WalletMethod.Connected)
      setValue('walletAddress', walletAddress)
    } else {
      setValue('walletMethod', undefined)
      setValue('walletAddress', '')
    }
  }, [connected, walletAddress])

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={3}>
        <Box mb={1}>
          <Typography component={'h1'} variant={'h6'}>
            Choose Wallet Method
          </Typography>

          <Typography mb={2}>
            If you already have a Cardano wallet or would like to create your own, please either enter your wallet
            address or connect your wallet to begin.
          </Typography>
        </Box>

        {canConnectWallet && (
          <Box mb={3}>
            <WalletConnector
              disabled={[WalletMethod.Supplied, WalletMethod.Created].some((method) =>
                method.includes(watch('walletMethod')),
              )}
            />
          </Box>
        )}

        <Controller
          name="walletAddress"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ display: 'flex', mb: 2 }}>
              <TextField
                {...field}
                value={field.value || ''}
                type={'text'}
                label={'Wallet Address'}
                placeholder={'Please enter your wallet address'}
                disabled={[WalletMethod.Connected, WalletMethod.Created].some((method) =>
                  method.includes(watch('walletMethod')),
                )}
                onInput={handleWalletAddressInput}
                error={Boolean(errors.walletAddress)}
                helperText={Boolean(errors.walletAddress) ? <>{errors.walletAddress?.message}</> : <></>}
                fullWidth
              />
            </FormControl>
          )}
        />

        {canCreateWallet && (
          <Controller
            name="walletMethod"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ display: 'flex', mb: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        value={WalletMethod.Created}
                        onChange={(event, checked) => {
                          const value = checked ? event.target.value : defaultValues.walletMethod
                          field.onChange(value)
                        }}
                      />
                    }
                    label="I want to create a new wallet"
                    disabled={!!watch('walletAddress')}
                  />
                </FormGroup>
              </FormControl>
            )}
          />
        )}
      </Box>

      {Object.keys(errors).length > 0 && <FormErrorNotification errors={errors} />}

      <FormButtons onPrevious={onPrevious} />
    </form>
  )
}

export default WalletMethodForm
