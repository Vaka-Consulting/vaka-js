import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { object, mixed, ObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import FormButtons from './_internal/FormButtons'
import FormErrorsNotification from './_internal/FormErrorsNotification'
import { FormProps } from './types'
import { ExperienceLevel } from '../../../common'

interface FormSubmitData {
  experienceLevel: ExperienceLevel
}

const validationSchema: ObjectSchema<FormSubmitData> = object().shape({
  experienceLevel: mixed<ExperienceLevel>()
    .oneOf(Object.values(ExperienceLevel))
    .required('Please select your experience level.'),
})

function ExperienceLevelForm({ defaultValues, onSubmit }: FormProps<FormSubmitData>) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      ...validationSchema.getDefault(),
      ...defaultValues,
    },
    resolver: yupResolver(validationSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography component={'h1'} variant={'h6'} mb={2}>
        What is your level of experience with blockchain and web3 apps?
      </Typography>

      <Controller
        name="experienceLevel"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ display: 'flex', mb: 2 }}>
            <RadioGroup name="experienceLevel" defaultValue={defaultValues?.experienceLevel}>
              <FormControlLabel
                control={<Radio {...field} value={ExperienceLevel.Newbie} />}
                label="Newbie - I don’t know anything about blockchain and have never used web3 apps before."
              />
              <FormControlLabel
                control={<Radio {...field} value={ExperienceLevel.Beginner} />}
                label="Beginner - I have used some web3 apps, but have limited understanding."
              />
              <FormControlLabel
                control={<Radio {...field} value={ExperienceLevel.Confident} />}
                label="Confident -  I have used several web3 apps and am confident using and managing blockchain wallets."
              />
              <FormControlLabel
                control={<Radio {...field} value={ExperienceLevel.Expert} />}
                label="Expert - I have deep technical knowledge of blockchain and web3 apps."
              />
            </RadioGroup>
          </FormControl>
        )}
      />

      {Object.keys(formState.errors).length > 0 && <FormErrorsNotification errors={formState.errors} />}

      <FormButtons />
    </form>
  )
}

export default ExperienceLevelForm
