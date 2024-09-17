import React from 'react'
import { Layout, NextLinkComposed } from '@/components'
import { AuthLogin } from '@vaka-tech/react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Login() {
  return (
    <Layout>
      <Container sx={{ py: 6 }}>
        <Box sx={{ m: 'auto', maxWidth: '640px', width: '100%' }}>
          <Typography variant="h4" mb={5} textAlign={'center'}>
            Login
          </Typography>
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
        </Box>
      </Container>
    </Layout>
  )
}
