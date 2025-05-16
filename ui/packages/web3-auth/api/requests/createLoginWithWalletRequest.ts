import { AxiosRequestConfig } from 'axios'
import { AuthWithWallet } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createLoginWithWalletRequest = (apiEndpoint: string, data: AuthWithWallet): AxiosRequestConfig => {
  const { stakeAddress, walletSignature } = data

  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        query LoginWallet($stakeAddress: String!, $key: String!, $signature: String!) {
          loginWallet: login_wallet(stake_address: $stakeAddress, key: $key, signature: $signature) {
            accessToken: access_token
          }
        }
      `,
      variables: {
        stakeAddress,
        signature: walletSignature?.signature,
        key: walletSignature?.key,
      },
    },
  }
}
