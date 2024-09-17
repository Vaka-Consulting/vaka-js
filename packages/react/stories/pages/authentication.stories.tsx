import React from 'react'
import { Alert, Box, Button, Card, CardContent, Container, Link, Typography } from '@mui/material'
import { linkTo } from '@storybook/addon-links'
import { Meta, StoryFn } from '@storybook/react'
import { AuthLogin as AuthLoginComponent, AuthRegister } from '../../components'
import {
  AuthContextProvider,
  AuthRegisterContextProvider,
  WalletContextProvider,
  WalletExtendedContextProvider,
} from '../../context'
import { useAuth, useAuthRegister } from '../../hooks'
import { AuthRegisterType } from '../../types'

const meta: Meta = {
  title: 'Pages/Authentication',
  decorators: [
    (Story: StoryFn) => (
      <WalletContextProvider>
        <WalletExtendedContextProvider
          projectPrefix={'storybook'}
          projectTokenPolicyId={'171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf'}
          projectAssetsPolicyIds={[]}
        >
          <AuthContextProvider>
            <Story />
          </AuthContextProvider>
        </WalletExtendedContextProvider>
      </WalletContextProvider>
    ),
  ],
}

const Redirect = () => {
  setTimeout(() => linkTo('Pages/Authentication', 'Home')(), 2000)

  return <Alert severity="info">Redirecting...</Alert>
}

const CenteredContent = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'flex', height: '80vh' }}>
    <Box sx={{ m: 'auto', maxWidth: '640px', width: '100%' }}>{children}</Box>
  </Box>
)

const HomeScreen = () => {
  const { sessionId, sessionIdExpiry, authenticated, logout } = useAuth()

  const handleLogout = () => {
    void logout()
  }

  if (!authenticated)
    return (
      <Container>
        <Typography component="h1" variant={'h4'} mb={0}>
          No Access
        </Typography>
        <Typography mb={2}>
          Please{' '}
          <Link sx={{ cursor: 'pointer' }} onClick={linkTo('Pages/Authentication', 'Login')}>
            log in
          </Link>{' '}
          or{' '}
          <Link sx={{ cursor: 'pointer' }} onClick={linkTo('Pages/Authentication', 'Register')}>
            register
          </Link>{' '}
          for a new account first.
        </Typography>
      </Container>
    )

  return (
    <>
      <Container>
        <Typography component="h1" variant={'h4'} mb={0}>
          Home
        </Typography>
        <Typography mb={2}>You are now logged in and can access the content below</Typography>
        <Typography mb={2}>
          <strong>session_id</strong>
          <br />
          {sessionId}
        </Typography>
        <Typography mb={2}>
          <strong>session_id_expiry</strong>
          <br />
          {sessionIdExpiry}
        </Typography>
        <Button variant="contained" color={'error'} onClick={handleLogout} sx={{ textTransform: 'none' }}>
          Logout
        </Button>
      </Container>
    </>
  )
}

const LoginScreen = () => {
  const { authenticated } = useAuth()

  if (authenticated) return <Redirect />

  return (
    <>
      <CenteredContent>
        <Typography component="h1" variant={'h4'} mb={2} textAlign={'center'}>
          Login
        </Typography>
        <Card>
          <CardContent>
            <AuthLoginComponent />
          </CardContent>
        </Card>
        <Typography component={'p'} variant={'body2'} mt={4} textAlign={'right'}>
          Don&apos;t have an account yet? Register{' '}
          <Link href={'/?path=/story/pages-authentication--register'}>here</Link>
        </Typography>
      </CenteredContent>
    </>
  )
}

const RegistrationWithSurveyScreen = () => {
  const { data } = useAuthRegister()
  const { experienceLevel } = data || {}

  return (
    <>
      <Container>
        <Typography component="h1" variant={'h4'} mb={2}>
          Register
        </Typography>
        <AuthRegister type={AuthRegisterType.Survey} />
        {!experienceLevel && (
          <Typography component={'p'} variant={'body2'} mt={4}>
            Already have an account? Log in <Link href={'/?path=/story/pages-authentication--login'}>here</Link>
          </Typography>
        )}
      </Container>
    </>
  )
}

const RegistrationWithWalletWalletScreen = () => {
  const { data, registered } = useAuthRegister()
  const { walletMethod } = data || {}

  return (
    <>
      <Container>
        <Typography component="h1" variant={'h4'} mb={2}>
          Register
        </Typography>
        <AuthRegister type={AuthRegisterType.Wallet} />
        {!walletMethod && (
          <Typography component={'p'} variant={'body2'} mt={4}>
            Already have an account? Log in <Link href={'/?path=/story/pages-authentication--login'}>here</Link>
          </Typography>
        )}
        {registered && (
          <Typography component={'p'} mt={2}>
            Log in <Link href={'/?path=/story/pages-authentication--login'}>here</Link>
          </Typography>
        )}
      </Container>
    </>
  )
}

const ConfirmEmailScreen = () => {
  return (
    <CenteredContent>
      <Typography component="h1" variant={'h4'} mb={2} textAlign={'center'}>
        Email Confirmation
      </Typography>
      <Card>
        <CardContent />
      </Card>
      <Typography component={'p'} variant={'body2'} mt={4}>
        Sign in <Link href={'/?path=/story/pages-authentication--login'}>here</Link>
      </Typography>
    </CenteredContent>
  )
}

export const Home = {
  name: 'Home',
  render: () => <HomeScreen />,
}

export const Login = {
  name: 'Login',
  render: () => <LoginScreen />,
}

export const RegisterWithSurvey = {
  name: 'Register w/ Survey',
  decorators: [
    (Story: StoryFn) => (
      <AuthRegisterContextProvider>
        <Story />
      </AuthRegisterContextProvider>
    ),
  ],
  render: () => <RegistrationWithSurveyScreen />,
}

export const RegisterWithWallet = {
  name: 'Register w/ Wallet',
  decorators: [
    (Story: StoryFn) => (
      <AuthRegisterContextProvider>
        <Story />
      </AuthRegisterContextProvider>
    ),
  ],
  render: () => <RegistrationWithWalletWalletScreen />,
}

export const ConfirmEmail = {
  name: 'Confirm Email',
  decorators: [
    (Story: StoryFn) => (
      <AuthRegisterContextProvider>
        <Story />
      </AuthRegisterContextProvider>
    ),
  ],
  render: () => <ConfirmEmailScreen />,
}

export default meta
