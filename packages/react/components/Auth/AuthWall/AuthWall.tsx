import React from 'react'
import { useAuth } from '../../../hooks'

function AuthWall() {
  const { authenticated } = useAuth()

  if (!authenticated) return <>Please login to continue</>

  return null
}

export default AuthWall
