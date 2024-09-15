import { AxiosRequestConfig } from 'axios'
import { AuthWithOtp } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createLoginWithOtpRequest = (apiEndpoint: string, data: AuthWithOtp): AxiosRequestConfig => {
  const { email, otp } = data
  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        query LoginOtp($email: String!, $otp: String!) {
          loginOtp: login_otp(email: $email, otp: $otp) {
            sessionId: session_id
            sessionIdExpiry: session_id_expiry
          }
        }
      `,
      variables: {
        email,
        otp,
      },
    },
  }
}
