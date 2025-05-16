import React from 'react'
import { Box, Button } from '@mui/material'

interface Props {
  onPrevious?: () => void
}

function FormButtons({ onPrevious }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {onPrevious && (
        <Button type="reset" variant={'text'} color={'error'} onClick={onPrevious} sx={{ mr: 5 }}>
          Back
        </Button>
      )}
      <Button type="submit" variant={'contained'}>
        Submit
      </Button>
    </Box>
  )
}

export default FormButtons
