import { AxiosRequestConfig } from 'axios'
import { acceptJson } from '../fetch'
import { AuthSession } from '../../web3-auth.model'

export const createRefreshSessionRequest = (apiEndpoint: string, data: AuthSession): AxiosRequestConfig => {
  const { sessionId } = data

  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: { ...acceptJson, Authorization: `Bearer ${sessionId}` },
    data: {
      query: `
        query RefreshSession {
          refreshSession: refresh_session {
            sessionId: session_id
            sessionIdExpiry: session_id_expiry
          }
        }
      `,
    },
  }
}
