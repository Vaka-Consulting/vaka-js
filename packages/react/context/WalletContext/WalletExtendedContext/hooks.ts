import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAssets, useLovelace, useWallet } from '@meshsdk/react'
import type { WalletExtended, WalletExtendedProps } from './types'
import { Asset, LOVELACE_AMOUNT } from '../../../../common'

export const useWalletExtendedStore = ({
  projectPrefix,
  projectTokenPolicyId,
  projectAssetsPolicyIds = [],
  persistConnection = true,
}: WalletExtendedProps): WalletExtended => {
  const { connected, connect, name } = useWallet()
  const assets = useAssets() as unknown as Asset[]
  const adaLovelace = useLovelace()

  const [authenticated, setAuthenticated] = useState(false)
  const [adaBalance, setAdaBalance] = useState<number>(0)
  const [projectTokenName, setProjectTokenName] = useState<string>('')
  const [projectTokenBalance, setProjectTokenBalance] = useState<number>(0)
  const [projectAssetsInWallet, setProjectAssetsInWallet] = useState<Asset[]>([])

  const localStorageKey = useMemo(() => `${projectPrefix}:wallet`, [projectPrefix])

  const handleProjectAssets = useCallback(() => {
    const projectAssetsInWallet = assets.filter((asset) => projectAssetsPolicyIds.includes(asset.policyId))
    const projectToken = assets.find((asset) => asset.policyId === projectTokenPolicyId)
    const projectTokenBalance = parseInt(projectToken?.quantity || '0') / LOVELACE_AMOUNT
    const projectTokenName = projectToken?.assetName || ''

    setProjectAssetsInWallet(projectAssetsInWallet)
    setProjectTokenName(projectTokenName)
    setProjectTokenBalance(projectTokenBalance)
  }, [assets])

  const handleAdaBalance = useCallback(
    (adaLovelace: string) => {
      const adaBalance = parseInt(adaLovelace) / LOVELACE_AMOUNT

      setAdaBalance(adaBalance)
    },
    [adaLovelace],
  )

  const handleWalletConnectionIfStored = useCallback((localStorageKey: string) => {
    const nameInLocalStorage = sessionStorage.getItem(localStorageKey)

    if (nameInLocalStorage) {
      void connect(nameInLocalStorage)
    }
  }, [])

  const handleAuthentication = useCallback(
    (connected: boolean, authenticated: boolean, persistConnection: boolean, localStorageKey: string, name: string) => {
      if (connected) {
        setAuthenticated(true)

        if (persistConnection) {
          sessionStorage.setItem(localStorageKey, name)
        }
      } else if (authenticated && !connected) {
        sessionStorage.removeItem(localStorageKey)
        setAuthenticated(false)
      }
    },
    [setAuthenticated],
  )

  useEffect(() => {
    if (assets) {
      handleProjectAssets()
    }
  }, [assets])

  useEffect(() => {
    if (adaLovelace) {
      handleAdaBalance(adaLovelace)
    }
  }, [adaLovelace])

  useEffect(() => {
    handleAuthentication(connected, authenticated, persistConnection, localStorageKey, name)
  }, [connected, authenticated])

  useEffect(() => {
    if (persistConnection) {
      handleWalletConnectionIfStored(localStorageKey)
    }
  }, [persistConnection])

  return {
    adaBalance,
    projectTokenName,
    projectTokenBalance,
    projectAssetsInWallet,
  }
}
