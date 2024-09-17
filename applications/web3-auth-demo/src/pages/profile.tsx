import React from 'react'
import { Layout } from '@/components'
import { useAuth } from '@vaka-tech/react'
import Head from 'next/head'
import { Button, Container, Typography } from '@mui/material'

function NotAuthenticated() {
  return (
    <Container>
      <Typography component="h1" variant={'h4'} mb={0}>
        No Access
      </Typography>
    </Container>
  )
}

function Authenticated() {
  const { sessionId, sessionIdExpiry, logout } = useAuth()

  const handleLogout = () => {
    void logout()
  }

  return (
    <>
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
    </>
  )
}

export default function Profile() {
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
