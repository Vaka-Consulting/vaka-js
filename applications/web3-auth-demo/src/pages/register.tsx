import { Layout } from '@/components'
import { web3AuthProvider } from '@/providers/web3auth'
import { AuthRegisterContextProvider, AuthRegister } from '@vaka-tech/react'
import Container from '@mui/material/Container'

export default function Register() {
  return (
    <Layout>
      <Container>
        <AuthRegisterContextProvider provider={web3AuthProvider}>
          <AuthRegister />
        </AuthRegisterContextProvider>
      </Container>
    </Layout>
  )
}
