import { AxiosRequestConfig } from 'axios'
import { acceptJson } from '../fetch'
import { AuthWithWallet } from '../../web3-auth.model'

export const createLoginWithWalletRequest = (apiEndpoint: string, data: AuthWithWallet): AxiosRequestConfig => {
  const { stakeAddress, walletSignature } = data
  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        query LoginWallet($stakeAddress: String!, $walletSignature: String!) {
          loginWallet: login_wallet(stake_address: $stakeAddress, walletSignature: $walletSignature) {
            sessionId: session_id
            sessionIdExpiry: session_id_expiry
          }
        }
      `,
      variables: {
        stakeAddress,
        walletSignature,
      },
    },
  }
}
