import React, { ReactNode } from 'react'
import { AccountBalanceWallet as AccountBalanceWalletIcon } from '@mui/icons-material'
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import WalletPicker from '../../WalletPicker/WalletPicker'

interface Props {
  children: ReactNode
  disabled?: boolean
}

function Disconnected({ children, disabled }: Props) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        id="connect-wallet-button"
        aria-controls={open ? 'wallet-picker-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        variant={'contained'}
        color={'primary'}
        size={'large'}
        startIcon={<AccountBalanceWalletIcon />}
        sx={{ textTransform: 'none' }}
        disabled={disabled}
      >
        {children}
      </Button>
      <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose}>
        <DialogContent>
          <Box component={'article'}>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogContent>
              <WalletPicker />
            </DialogContent>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Disconnected
