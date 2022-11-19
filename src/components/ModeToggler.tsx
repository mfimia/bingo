import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { AppModesType } from '../types/index'

interface IProps {
  toggleColorMode: () => void
  mode: AppModesType
}

const ModeToggler: FC<IProps> = (props) => {
  const { mode, toggleColorMode } = props
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default ModeToggler
