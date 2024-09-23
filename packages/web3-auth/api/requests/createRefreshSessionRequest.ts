import { AxiosRequestConfig } from 'axios'
import { AuthSession } from '../../web3-auth.model'
import { acceptJson } from '../fetch'

export const createRefreshSessionRequest = (apiEndpoint: string, data: AuthSession): AxiosRequestConfig => {
  const { accessToken } = data

  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson, Authorization: `Bearer ${accessToken}` },
    data: {
      query: `
        query RefreshSession {
          refreshSession: refresh_session {
            accessToken: access_token
          }
        }
      `,
    },
  }
}
