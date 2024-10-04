import React from 'react'
import { Layout } from '@/components'
import { useAuth } from '@vaka-tech/react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function NotAuthenticated() {
  return (
    <>
      <Typography>Please login to access the content</Typography>
    </>
  )
}

function Authenticated() {
  return (
    <>
      <Typography mb={2}>You are logged in</Typography>
    </>
  )
}

export default function Home() {
  const { authenticated } = useAuth()

  return (
    <>
      <Head>
        <title>Climafi Impact Assets</title>
      </Head>
      <Layout>
        <Container>
          <Typography component="h1" variant={'h4'} mb={0}>
            Dashboard
          </Typography>
          {authenticated ? <Authenticated /> : <NotAuthenticated />}
        </Container>
      </Layout>
    </>
  )
}
