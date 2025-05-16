import React from 'react'
import { Layout } from '@/components'
import { web3AuthProvider } from '@/providers/web3auth'
import { AuthRegisterContextProvider, AuthRegisterOtpVerification } from '@vaka-tech/react'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container'

export default function Register() {
  const searchParams = useSearchParams()
  const otp = searchParams.get('verification_code') as string

  if (!otp) return <>Getting otp code...</>

  return (
    <>
      <Head>
        <title>Verify Registration | Climafi Impact Assets</title>
      </Head>
      <Layout>
        <Container>
          <AuthRegisterContextProvider provider={web3AuthProvider}>
            <AuthRegisterOtpVerification otp={otp} />
          </AuthRegisterContextProvider>
        </Container>
      </Layout>
    </>
  )
}
