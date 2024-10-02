import { Roboto } from 'next/font/google'
import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Create a theme instance.
const globalTheme = createTheme({
  palette: {
    common: {
      black: '#1c1c1c',
      white: '#fff',
    },
    primary: {
      main: '#76a06a',
    },
    secondary: {
      main: '#f9f5e8',
      light: '#fcfaf3',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

const theme = createTheme(globalTheme, {
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: globalTheme.palette.secondary.light,
          color: globalTheme.palette.common.black,
        },
      },
    },
  },
  globalTheme,
})

export default theme
