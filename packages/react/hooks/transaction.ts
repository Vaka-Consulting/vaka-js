import { useState } from 'react'
import { Transaction } from '@meshsdk/core'
import { useWallet } from '@meshsdk/react'

export { Transaction }

enum TransactionStatus {
  idle = 'IDLE',
  signTransaction = 'SIGN_TRANSACTION',
  signTransactionFailed = 'SIGN_TRANSACTION_FAILED',
  signTransactionSuccess = 'SIGN_TRANSACTION_SUCCESS',
}

export type TransactionHash = string

export interface TransactionHook {
  txHash: TransactionHash | undefined
  loading: boolean
  error: Error | undefined
  status: TransactionStatus
  init: (tx: Transaction, partialSign?: boolean) => Promise<TransactionHash | void>
  signTransaction(tx: Transaction, partialSign?: boolean): Promise<TransactionHash>
}

const useTransaction = (): TransactionHook => {
  const { wallet } = useWallet()
  const [txHash, setTxHash] = useState<TransactionHook['txHash']>(undefined)
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.idle)
  const [loading, setLoading] = useState<TransactionHook['loading']>(false)
  const [error, setError] = useState<TransactionHook['error']>(undefined)

  const signTransaction = async (tx: Transaction, partialSign?: boolean): Promise<TransactionHash> => {
    try {
      if (wallet) {
        const unsignedTx = await tx.build()
        const signedTx = await wallet.signTx(unsignedTx, partialSign)
        return wallet.submitTx(signedTx)
      } else {
        throw new Error('BrowserWallet is not available')
      }
    } catch (error) {
      throw error
    }
  }

  const init = async (tx: Transaction, partialSign?: boolean): Promise<TransactionHash | void> => {
    setError(undefined)
    setTxHash(undefined)
    setLoading(true)

    try {
      if (wallet) {
        setStatus(TransactionStatus.signTransaction)

        const txHash = await signTransaction(tx, partialSign)

        if (txHash) {
          setTxHash(txHash)
          setStatus(TransactionStatus.signTransactionSuccess)

          return txHash
        } else {
          throw new Error('Transaction ID is not valid')
        }
      } else {
        throw new Error('BrowserWallet is not available')
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)

      setStatus(TransactionStatus.signTransactionFailed)
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return {
    txHash,
    status,
    loading,
    error,
    init,
    signTransaction,
  }
}

export { useTransaction, TransactionStatus }
