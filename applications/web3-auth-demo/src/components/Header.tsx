import { NextLinkComposed } from '@/components/Link'
import { useAuth } from '@vaka-tech/react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export function AuthButton() {
  const { authenticated } = useAuth()

  if (authenticated) {
    return (
      <Button component={NextLinkComposed} to="/profile" color={'inherit'}>
        Profile
      </Button>
    )
  }

  return (
    <Button component={NextLinkComposed} to="/login" color={'inherit'}>
      Login
    </Button>
  )
}

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <NextLinkComposed to={'/'} sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          <Typography variant="h6" component="div">
            Web3 Auth on Cardano Demo
          </Typography>
        </NextLinkComposed>
        <AuthButton />
      </Toolbar>
    </AppBar>
  )
}
