import { useState, MouseEvent } from 'react'
import { NextLinkComposed } from '@/components/Link'
import { useAuth } from '@vaka-tech/react'
import AppBar from '@mui/material/AppBar'
import AvatarIcon from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function ProfileMenu() {
  const { logout } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AvatarIcon sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'authentication-button',
        }}
      >
        <MenuItem component={NextLinkComposed} to="/profile">
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout} color={'error'}>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

function AuthMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick} color={'inherit'}>
        Authentication
      </Button>
      <Menu
        id="authentication-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'authentication-button',
        }}
      >
        <MenuItem component={NextLinkComposed} to="/login">
          Login
        </MenuItem>
        <MenuItem component={NextLinkComposed} to="/register">
          Register
        </MenuItem>
        <MenuItem component={NextLinkComposed} to="/register/survey">
          Register w/ survey
        </MenuItem>
      </Menu>
    </>
  )
}

export function Header() {
  const { authenticated } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <NextLinkComposed to={'/'} sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          <Typography variant="h6" component="div">
            Web3 Auth Demo
          </Typography>
        </NextLinkComposed>
        {authenticated ? <ProfileMenu /> : <AuthMenu />}
      </Toolbar>
    </AppBar>
  )
}
