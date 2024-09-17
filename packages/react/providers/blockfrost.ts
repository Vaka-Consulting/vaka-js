import { BlockfrostProvider } from '@meshsdk/core'
import { BLOCKFROST_PROJECT_ID } from '../constants'

export const blockfrostProvider = new BlockfrostProvider(BLOCKFROST_PROJECT_ID)
