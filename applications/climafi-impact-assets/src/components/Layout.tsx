import { ReactNode } from 'react'
import { Header } from '@/components'
import Box from '@mui/material/Box'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <header>
        <Header />
      </header>
      <Box component={'main'} sx={{ py: 5 }}>
        {children}
      </Box>
      <footer />
    </>
  )
}
