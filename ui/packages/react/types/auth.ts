export enum AuthRegisterType {
  Wallet = 'WALLET',
  Survey = 'SURVEY',
}

export interface AuthRegisterConfig {
  survey: boolean
  connectWallet: boolean
  createWallet: boolean
}
