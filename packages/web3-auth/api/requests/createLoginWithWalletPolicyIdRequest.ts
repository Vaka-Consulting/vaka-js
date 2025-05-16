import { AxiosRequestConfig } from 'axios'
import { AuthWithWalletPolicyId } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createLoginWithWalletPolicyIdRequest = (apiEndpoint: string, data: AuthWithWalletPolicyId): AxiosRequestConfig => {
  const { stakeAddress, walletSignature, authType } = data

  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson },
    data: {
      query: `
        query LoginWalletPolicyId($stakeAddress: String!, $key: String!, $signature: String!, $authType: AssetMatchType!) {
          loginWithWalletPolicyId: login_with_policy_id(stake_address: $stakeAddress, key: $key, signature: $signature, match_type: $authType) {
            accessToken: access_token
          }
        }
      `,
      variables: {
        stakeAddress,
        signature: walletSignature?.signature,
        key: walletSignature?.key,
        authType: authType,
      },
    },
  }
}
