import { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { BingoSizes } from '../utils/constants'
import GameContext from '../context/GameContext'
import { GameContextType } from '../types'
import { SxProps, Theme } from '@mui/material'

const label = 'Size'

const containerStyle: SxProps<Theme> = {
  pt: {
    xs: 2,
    sm: 0,
  },
}

const menuItems = [
  { name: 'Small', value: BingoSizes.Small },
  { name: 'Medium', value: BingoSizes.Medium },
  { name: 'Large', value: BingoSizes.Large },
]

const BingoSizeSelect: FC = () => {
  const gameContext = useContext(GameContext) as GameContextType
  const { bingoSize, setBingoSize } = gameContext

  const handleChange = (event: SelectChangeEvent) => {
    setBingoSize(event.target.value as BingoSizes)
  }

  return (
    <Box sx={containerStyle}>
      <FormControl size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={bingoSize} label={label} onChange={handleChange}>
          {menuItems.map(({ name, value }) => (
            <MenuItem key={name} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default BingoSizeSelect
