export const otp = '123456'

export const session = (expiryInHours: number) => {
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() + 1)

  return {
    sessionId: 'ac1615ff-9c59-4684-8e3f-411342c326a8',
    sessionIdExpiry: currentDate,
  }
}
