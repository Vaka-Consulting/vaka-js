import { WalletSignature } from './wallet'

export type SessionID = string

export enum ExperienceLevel {
  Newbie = 'NEWBIE',
  Beginner = 'BEGINNER',
  Confident = 'CONFIDENT',
  Expert = 'EXPERT',
}

export enum ExperienceChain {
  Bitcoin = 'BITCOIN',
  Ethereum = 'ETHEREUM',
  Cardano = 'CARDANO',
  Solana = 'SOLANA',
  Base = 'BASE',
}

export enum WalletMethod {
  Supplied = 'SUPPLIED',
  Created = 'CREATED',
  Connected = 'CONNECTED',
}

export interface AuthSession {
  sessionId: SessionID
}

export interface AuthRequestWithOtp {
  email: string
}

export interface AuthWithOtp {
  email: string
  otp: string
}

export interface AuthWithWallet {
  stakeAddress: string
  walletSignature: WalletSignature
}

export type AuthValues = AuthWithOtp & AuthWithWallet

export interface UserAuthRegisterUserData {
  experienceLevel: ExperienceLevel
  experienceChains: string[]
  walletMethod: WalletMethod
}

/**
 * Minimal values required to register a user
 */
export interface AuthRegisterData {
  // required values for web2 users
  email?: string
  // required values for web3 users
  stakeAddress?: string
  walletSignature?: WalletSignature
  userData?: Partial<UserAuthRegisterUserData>
}

export type AuthRegisterCollectedData = UserAuthRegisterUserData & Omit<AuthRegisterData, 'data'>
