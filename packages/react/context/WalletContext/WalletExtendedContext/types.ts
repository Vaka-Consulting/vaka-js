import { Asset } from '../../../../common'

export interface WalletExtendedState {
  adaBalance: number
  projectTokenName: string
  projectTokenBalance: number
  projectAssetsInWallet: Asset[]
}

export interface WalletExtendedProps {
  projectPrefix: string
  projectTokenPolicyId: string
  projectAssetsPolicyIds: string[]
  persistConnection?: boolean
}

export interface WalletExtended {
  adaBalance: number
  projectTokenName: string
  projectTokenBalance: number
  projectAssetsInWallet: Asset[]
}
