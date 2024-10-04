import React from 'react'
import { Layout, NextLinkComposed } from '@/components'
import { useAuth } from '@vaka-tech/react'
import Head from 'next/head'
import { Box, Container, Typography } from '@mui/material'
import Button from '@mui/material/Button'

function NotAuthenticated() {
  return (
    <section>
      <Typography component="h1" variant={'h4'} mb={2}>
        No Access
      </Typography>
      <Button component={NextLinkComposed} to={'/login'} variant="contained" sx={{ textTransform: 'none' }}>
        Login
      </Button>
    </section>
  )
}

function Authenticated() {
  const { accessToken } = useAuth()

  return (
    <section>
      <Box component={'header'}>
        <Typography component="h1" variant={'h4'} mb={0}>
          Profile
        </Typography>
      </Box>
      <Typography mb={2}>You are now logged in and can access the content below</Typography>
      <Typography fontWeight={700}>accessToken</Typography>
      <Typography sx={{ wordBreak: 'break-all' }}>{accessToken}</Typography>
    </section>
  )
}

export default function Profile() {
  const { authenticated } = useAuth()

  return (
    <>
      <Head>
        <title>Profile | Climafi Impact Assets</title>
      </Head>
      <Layout>
        <Container>{authenticated ? <Authenticated /> : <NotAuthenticated />}</Container>
      </Layout>
    </>
  )
}
