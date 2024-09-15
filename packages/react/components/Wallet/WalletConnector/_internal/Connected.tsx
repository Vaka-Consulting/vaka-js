import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import WalletConnectedButton from '../../WalletConnectedButton/WalletConnectedButton'
import WalletDisconnectButton from '../../WalletDisconnectButton/WalletDisconnectButton'

function Connected() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <WalletConnectedButton
        id="wallet-menu-button"
        aria-controls={open ? 'wallet-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
      />
      <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose}>
        <DialogTitle>Wallet Information</DialogTitle>
        <DialogContent>
          <WalletDisconnectButton>Disconnect Wallet</WalletDisconnectButton>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Connected
