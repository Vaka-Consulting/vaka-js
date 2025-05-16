/**
 * Truncate string in the middle
 * Handy for long strings like wallet addresses
 * Gives a preview of the start and end of the string so users can recognize what the string might be
 * @param string
 * @param sliceStart
 * @param sliceEnd
 */
export const truncateStringInMiddle = (string: string, sliceStart = 15, sliceEnd = 3): string => {
  const stringStart = string.slice(0, sliceStart)
  const stringEnd = string.slice(-sliceEnd)

  return `${stringStart}...${stringEnd}`
}
