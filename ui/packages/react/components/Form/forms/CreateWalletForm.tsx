import React from 'react'
import { useForm } from 'react-hook-form'
import { MeshWallet } from '@meshsdk/core'
import { Box, Grid, Typography } from '@mui/material'
import { CopyToClipboard } from '../../CopyToClipboard'
import FormButtons from '../_internal/FormButtons'
import { FormProps } from '../types'

interface FormSubmitData {
  stakeAddress: string
}

function CreateWalletForm({ onPrevious, onSubmit }: FormProps<FormSubmitData>) {
  const mnemonic = MeshWallet.brew() as string[]
  const mnemonicString = mnemonic.join(' ')

  const { handleSubmit } = useForm({
    defaultValues: {
      stakeAddress: '0x1234567890',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} mb={6}>
        {mnemonic.map((word, index) => (
          <Grid xs={6} sm={3} item key={`${word}-${index}`}>
            <Typography sx={{ bgcolor: 'gray', color: 'white', p: 1 }}>
              {index + 1}. {word}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Box mb={4}>
        <CopyToClipboard label="Seed Phrases" copy={mnemonicString}>
          {mnemonicString}
        </CopyToClipboard>
      </Box>

      <FormButtons onPrevious={onPrevious} />
    </form>
  )
}

export default CreateWalletForm
