import { Layout } from '@/components'
import { web3AuthProvider } from '@/providers/web3auth'
import { AuthRegister, AuthRegisterContextProvider } from '@vaka-tech/react'
import Container from '@mui/material/Container'

export default function RegisterSurvey() {
  return (
    <Layout>
      <AuthRegisterContextProvider provider={web3AuthProvider}>
        <Container>
          <AuthRegister
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            type={'SURVEY'}
          />
        </Container>
      </AuthRegisterContextProvider>
    </Layout>
  )
}
