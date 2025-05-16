import React, { FC, ReactElement, useCallback, useState } from 'react'
import { ContentCopy } from '@mui/icons-material'
import { Box, InputAdornment, TextField, Tooltip } from '@mui/material'

interface IProps {
  children: string
  label: string
  copy?: string
  startIcon?: ReactElement
}

/**
 * CopyToClipboard component
 */
export const CopyToClipboard: FC<IProps> = ({ children, copy, label, startIcon }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  const handleClick = useCallback(async (): Promise<void> => {
    const textToCopy = copy ? copy : children
    await navigator.clipboard.writeText(textToCopy)
    setShowTooltip(true)
  }, [copy, children])

  const handleClose = useCallback((): void => {
    setShowTooltip(false)
  }, [])

  return (
    <Box>
      <Tooltip
        open={showTooltip}
        title={'Copied to clipboard!'}
        leaveDelay={1500}
        onClose={handleClose}
        placement="top-end"
      >
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          label={label}
          value={children}
          disabled
          InputProps={{
            startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : null,
            endAdornment: (
              <InputAdornment position="end">
                <ContentCopy onClick={handleClick} sx={{ cursor: 'pointer' }} fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
    </Box>
  )
}

export default CopyToClipboard
