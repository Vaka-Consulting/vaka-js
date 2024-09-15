import React from 'react'
import { ExperienceChain } from '@vaka-tech/common'
import { Controller, useForm } from 'react-hook-form'
import { array, string, object, ObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import FormButtons from './_internal/FormButtons'
import FormErrorsNotification from './_internal/FormErrorsNotification'
import { FormProps } from './types'

interface FormSubmitData {
  experienceChains: string[]
  experienceChainsOther?: string
}

const otherVal = 'OTHER'
const experienceChains = [...Object.values(ExperienceChain), otherVal]

export const validationSchema: ObjectSchema<FormSubmitData> = object().shape({
  experienceChains: array()
    .of(string().required())
    .min(1, 'Please select at least one blockchain you previously had experience with.')
    .required('Please select at least one blockchain you previously had experience with.'),
  experienceChainsOther: string().when('experienceChains', {
    is: (val: FormSubmitData['experienceChains']) => val?.includes(otherVal),
    then: () => string().required('Please specify your other blockchain experience'),
  }),
})

function ExperienceChainsForm({ defaultValues, onPrevious, onSubmit }: FormProps<FormSubmitData>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...validationSchema.getDefault(),
      ...defaultValues,
    },
    resolver: yupResolver(validationSchema),
  })

  const handleFormSubmit = (data: FormSubmitData) => {
    const { experienceChains, experienceChainsOther } = data

    if (experienceChains.includes(otherVal) && experienceChainsOther) {
      experienceChains.push(experienceChainsOther)

      const otherIndex = experienceChains.indexOf(otherVal)
      experienceChains.splice(otherIndex, 1)
    }

    onSubmit({ experienceChains: experienceChains })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={3}>
        <Box mb={1}>
          <Typography component={'h1'} variant={'h6'}>
            Your Experience with Blockchain
          </Typography>

          <Typography component={'h2'} variant={'body1'}>
            What blockchains have you previously had experience with (select all that apply)
          </Typography>
        </Box>

        <FormControl>
          <FormGroup>
            <Controller
              name="experienceChains"
              control={control}
              defaultValue={defaultValues?.experienceChains}
              render={({ field }) => (
                <>
                  {experienceChains.map((experience) => (
                    <FormControlLabel
                      key={`experienceChains-${experience}`}
                      label={experience[0].toUpperCase() + experience.substring(1).toLowerCase()}
                      control={
                        <Checkbox
                          {...field}
                          value={experience}
                          defaultChecked={!!defaultValues?.experienceChains?.find((value) => value === experience)}
                          onChange={(event, checked) => {
                            const value = checked
                              ? [...field.value, event.target.value]
                              : field.value.filter((value: string) => event.target.value !== value)

                            field.onChange(value)
                          }}
                        />
                      }
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
        </FormControl>
        {watch('experienceChains').includes(otherVal) && (
          <Controller
            name="experienceChainsOther"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ display: 'flex', mt: 1 }}>
                <TextField
                  {...field}
                  type={'text'}
                  label={'Other Blockchain Experience'}
                  placeholder={'Please specify your other blockchain experience'}
                  size={'small'}
                  error={Boolean(errors.experienceChainsOther)}
                  helperText={
                    Boolean(errors.experienceChainsOther) ? <>{errors.experienceChainsOther?.message}</> : <></>
                  }
                  fullWidth
                />
              </FormControl>
            )}
          />
        )}
      </Box>

      {Object.keys(errors).length > 0 && <FormErrorsNotification errors={errors} />}

      <FormButtons onPrevious={onPrevious} />
    </form>
  )
}

export default ExperienceChainsForm
