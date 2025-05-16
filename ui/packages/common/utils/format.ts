import { NUMBER_FORMAT } from '../constants'

/**
 * Format amount to currency
 * En-Us format because it's the widely accepted format for CryptoCurrency
 * @param amount
 * @param decimals
 */
export const toCryptoCurrencyAmount = (amount: number, decimals: number = 2): string => {
  const formatter = new Intl.NumberFormat(NUMBER_FORMAT, {
    minimumFractionDigits: decimals,
  })

  return formatter.format(amount)
}

/**
 * Format amount to get a well-rounded amount
 * @param amount
 */
export const roundAmount = (amount: number): number => {
  return Math.round(amount * 1000) / 1000
}
