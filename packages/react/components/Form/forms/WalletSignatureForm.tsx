import React from 'react'
import { useForm } from 'react-hook-form'
import { useWallet } from '@meshsdk/react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Button, ButtonGroup, Menu, MenuItem } from '@mui/material'
import { WalletSignature, WalletSignAuthType } from '../../../../common'
import { WalletDisconnectButton } from '../../Wallet'
import WalletAddress from '../../Wallet/WalletAddress'
import { FormProps } from '../types'

interface FormData {
  stakeAddress: string
  walletSignature: WalletSignature
  authType?: WalletSignAuthType
}

const walletSignatureMessage = 'Hello'

function WalletSignatureForm({ onSubmit }: FormProps<FormData>) {
  const { wallet } = useWallet()
  const { handleSubmit } = useForm()
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleMenuClose = () => setMenuAnchor(null)

  const handleSign = async (authType?: WalletSignAuthType) => {
    const stakeAddress = await wallet.getRewardAddresses().then((addresses) => addresses[0])
    const walletSignature = await wallet.signData(stakeAddress, walletSignatureMessage)
    if (authType) {
      onSubmit({ stakeAddress, walletSignature, authType })
    }else{
      onSubmit({ stakeAddress, walletSignature })
    }
    handleMenuClose()
  }

  return (
    <>
      <Box mb={3}>
        <WalletAddress truncateCharsFrom={40} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <WalletDisconnectButton size="large" sx={{ textTransform: 'none' }} variant="text">
          Disconnect Wallet
        </WalletDisconnectButton>
        <ButtonGroup variant="contained" color="success" size="large">
          <Button sx={{ textTransform: 'none' }} onClick={handleSubmit(() => handleSign())}>
            {'Sign Message'}
          </Button>
          <Button
            sx={{ minWidth: 40, padding: 0 }}
            aria-controls={menuAnchor ? 'wallet-signature-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(menuAnchor) ? 'true' : undefined}
            onClick={handleMenuOpen}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Menu
          id="wallet-signature-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleSubmit(() => handleSign(WalletSignAuthType.POLICY_ID))}>Sign Message Policy ID</MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default WalletSignatureForm
