import React from 'react'
import { Layout, NextLinkComposed } from '@/components'
import { AuthLogin } from '@vaka-tech/react'
import Head from 'next/head'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Login() {
  return (
    <>
      <Head>
        <title>Verify Registration | Climafi Impact Assets</title>
      </Head>
      <Layout>
        <Container maxWidth={'sm'}>
          <Card>
            <CardContent>
              <AuthLogin />
            </CardContent>
          </Card>
          <Typography component={'p'} variant={'body2'} mt={4} textAlign={'right'}>
            Don&apos;t have an account yet? Register{' '}
            <Link component={NextLinkComposed} to={'/register'}>
              here
            </Link>
          </Typography>
        </Container>
      </Layout>
    </>
  )
}
