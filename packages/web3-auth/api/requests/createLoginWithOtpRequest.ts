import { AxiosRequestConfig } from 'axios'
import { AuthWithOtp } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createLoginWithOtpRequest = (apiEndpoint: string, data: AuthWithOtp): AxiosRequestConfig => {
  const { otp: code } = data

  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        mutation LoginOtp($code: String!) {
          loginOtp: verify_code(code: $code) {
            accessToken: access_token
          }
        }
      `,
      variables: {
        code,
      },
    },
  }
}
