import { AxiosRequestConfig } from 'axios'
import { AuthRequestWithOtp } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createRequestLoginWithOtpRequest = (apiEndpoint: string, data: AuthRequestWithOtp): AxiosRequestConfig => {
  const { email } = data
  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        query RequestOtp($email: String!) {
          requestOtp: request_code(email: $email) {
            status
          }
        }
      `,
      variables: { email },
    },
  }
}
