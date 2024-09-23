import { useEffect } from 'react'
import { useAuth } from '@vaka-tech/react'
import { redirect } from 'next/navigation'

export function useAuthWall() {
  const { authenticated } = useAuth()

  useEffect(() => {
    if (!authenticated) {
      redirect('/login')
    }
  }, [authenticated])
}
