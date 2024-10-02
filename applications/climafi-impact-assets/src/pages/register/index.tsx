import { Layout } from '@/components'
import { web3AuthProvider } from '@/providers/web3auth'
import { AuthRegisterContextProvider, AuthRegister } from '@vaka-tech/react'
import Container from '@mui/material/Container'

const config = {
  connectWallet: true,
  createWallet: false,
  survey: false,
}

export default function Register() {
  return (
    <Layout>
      <AuthRegisterContextProvider config={config} provider={web3AuthProvider}>
        <Container maxWidth={'lg'}>
          <AuthRegister />
        </Container>
      </AuthRegisterContextProvider>
    </Layout>
  )
}
