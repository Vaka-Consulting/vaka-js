import { AxiosRequestConfig } from 'axios'
import { AuthRegisterData } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createRegisterRequest = (apiEndpoint: string, data: Partial<AuthRegisterData>): AxiosRequestConfig => {
  const { email, stakeAddress, walletSignature, userData: surveyItems } = data

  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        mutation Register($email: String, $key: String, $signature: String, $stake_address: String, $survey_items: String) {
          register(email: $email, key: $key, signature: $signature, stake_address: $stake_address, survey_items: $survey_items) {
            status
          }
        }
      `,
      variables: {
        email,
        stake_address: stakeAddress,
        signature: walletSignature?.signature,
        key: walletSignature?.key,
        survey_items: JSON.stringify(surveyItems),
      },
    },
  }
}
