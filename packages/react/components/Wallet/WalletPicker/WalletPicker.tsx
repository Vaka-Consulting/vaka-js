import React, { MouseEvent } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
import { Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material'

function WalletPicker() {
  const { connect, connecting, name: walletName } = useWallet()
  const walletList = useWalletList()

  const [clickedWalletName, setClickedWalletName] = React.useState<string | null>(null)

  const handleConnect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const name = event.currentTarget.value

    void connect(name)
    setClickedWalletName(name)
  }

  return (
    <List dense={true} disablePadding={true}>
      {walletList.map(({ name, icon }) => (
        <ListItem disableGutters={true} key={`wallet-list-name-${name}`}>
          <Button
            variant={'outlined'}
            color={'primary'}
            value={name}
            key={name}
            fullWidth={true}
            type={'submit'}
            onClick={handleConnect}
            sx={{
              textTransform: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderColor: '#dddddd',
              '&:hover': { borderColor: '#aaaaaa' },
            }}
          >
            <Box mr={2} sx={{ position: 'relative', top: 5 }}>
              <img src={icon} width={24} height={24} alt={'wallet icon'} />
            </Box>{' '}
            <Typography component={'span'} variant={'body2'} fontWeight={500}>
              {name}
            </Typography>
            {connecting && clickedWalletName === name && (
              <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 'auto' }}>
                <CircularProgress size={16} sx={{ color: 'primary.main', mr: 1 }} />
                <Typography component={'span'} variant={'caption'} fontWeight={700}>
                  Connecting
                </Typography>
              </Box>
            )}
            {name === walletName && !connecting && (
              <Typography component={'span'} variant={'caption'} fontWeight={700} sx={{ ml: 'auto' }}>
                Connected
              </Typography>
            )}
          </Button>
        </ListItem>
      ))}
    </List>
  )
}

export default WalletPicker
