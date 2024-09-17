import React from 'react'
import { Layout, NextLinkComposed } from '@/components'
import { useAuth } from '@vaka-tech/react'
import Head from 'next/head'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function NotAuthenticated() {
  return (
    <Container>
      <Typography component="h1" variant={'h4'} mb={2}>
        No Access
      </Typography>
      <Button component={NextLinkComposed} to={'/login'} variant="contained" sx={{ textTransform: 'none' }}>
        Login
      </Button>
    </Container>
  )
}

function Authenticated() {
  const { sessionId, sessionIdExpiry, logout } = useAuth()

  const handleLogout = () => {
    void logout()
  }

  return (
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
  )
}

export default function Home() {
  const { authenticated } = useAuth()

  return (
    <>
      <Head>
        <title>Web3 Auth on Cardano Demo</title>
        <meta name="description" content="A Cardano dApp powered by VakaJs" />
      </Head>
      <Layout>{authenticated ? <Authenticated /> : <NotAuthenticated />}</Layout>
    </>
  )
}
