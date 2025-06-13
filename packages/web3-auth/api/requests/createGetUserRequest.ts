import { AxiosRequestConfig } from 'axios'
import { acceptJson } from '../fetch'

export const createGetUserRequest = (apiEndpoint: string, accessToken: string): AxiosRequestConfig => {
  return {
    url: `${apiEndpoint}`,
    method: 'POST',
    headers: {
      ...acceptJson,
      Authorization: `${accessToken}`,
    },
    data: {
      query: `
        query GetUser {
          user {
            email, stakeAddress: stake_address
          }
        }   
      `,
      variables: {},
    },
  }
}
