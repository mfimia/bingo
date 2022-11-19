import { createTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { AppModesType } from '../types/index'

export const useDarkMode = () => {
  const [mode, setMode] = useState<AppModesType>('light')

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return { theme, mode, toggleColorMode }
}
