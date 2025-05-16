import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

const jsonMimeType = 'application/json; charset=utf-8'

export const acceptJson: Readonly<Record<string, string>> = {
  Accept: '*/*',
}

export const authHeader = (apiKey: string): { authorization: string } => ({
  authorization: `Bearer ${apiKey}`,
})

export const postJson: Readonly<Record<string, string>> = {
  'Content-Type': jsonMimeType,
}

export const fetchWeb3Auth = <TData>(config: AxiosRequestConfig): AxiosPromise<TData> => axios(config)
