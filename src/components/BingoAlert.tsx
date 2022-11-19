import { forwardRef, FC } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

interface IProps {
  winAlert: boolean
  handleClose: (_: React.SyntheticEvent | Event, reason?: string) => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const BingoAlert: FC<IProps> = ({ winAlert: bingoFound, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={bingoFound}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{ maxWidth: 200, mx: 'auto' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        BINGO!
      </Alert>
    </Snackbar>
  )
}

export default BingoAlert
