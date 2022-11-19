import { useState } from 'react'

export const useWinAlert = () => {
  const [winAlert, setWinAlert] = useState(false)

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setWinAlert(false)
  }

  return { winAlert, setWinAlert, handleClose }
}
